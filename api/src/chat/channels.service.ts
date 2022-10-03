import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WsException } from "@nestjs/websockets";
import { PostgresErrorCode } from "src/database/postgresErrorCode.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { JoinChannel } from "./classes/joinChannel.class";
import { LeaveChannel } from "./classes/leaveChannel.class";
import { JoinChannelDTO } from "./dto/joinChannel.dto";
import { ChannelEntity } from "./entities/channel.entity";
import { WsChannelNotFoundException } from "./exceptions/channel/wsChannelNotFound.exception";
import { WsUserAlreadyInChannelException } from "./exceptions/channel/wsUserAlreadyInChannel.exception";
import { WsUserNotInChannelException } from "./exceptions/channel/wsUserNotInChannel.exception";
import * as bcrypt from 'bcrypt';
import { CreateChannelDTO } from "./dto/createChannel.dto";
import { WsPasswordMissingException } from "./exceptions/channel/wsPasswordMissing.exception";
import { WsInvalidCredentials } from "./exceptions/channel/wsInvalidCredentials.exception";
import { WsUserUnauthorizeException } from "./exceptions/channel/wsUserNotInvited.exception";
import { InviteUserDTO } from "./dto/inviteUser.dto";
import { UsersService } from "src/users/users.service";
import { UserNotFoundException } from "src/users/exceptions/userNotFound.exception";
import { WsUserNotFoundException } from "src/socket/exceptions/wsUserNotFound";
import { WsInternalError } from "src/socket/exceptions/bases/wsInternalError";
import { WsUserHasNotModPermissionsException } from "./exceptions/channel/wsUserHasNoModPermissions.exception";
import { UpdateChannelDto } from "./dto/updateChannel.dto";
import { WsUserNotChannelOwnerException } from "./exceptions/channel/wsUserNotChannelOwner.exception";
import { ChannelUserTargetDTO } from "./dto/channelUserTarget.dto";
import { SocketService } from "src/socket/socket.service";
import { WsUserIsAlreadyModeratorException } from "./exceptions/channel/wsUserIsAlreadyModerator.exception";
import { WsUserIsNotModeratorException } from "./exceptions/channel/wsUserIsNotModerator.exception";
import { WsUserIsOwnerException } from "./exceptions/channel/wsUserIsOwner.exception";
import { WsUserIsAlreadyBannedException } from "./exceptions/channel/wsUserIsAlreadyBanned.exception";
import { WsUserIsBannedOfChannel } from "./exceptions/channel/wsUserIsBanOfChannel.exception";
import { WsBanHimselfException } from "./exceptions/channel/wsBanHimself.exception";
import { WsUserIsNotBanned } from "./exceptions/channel/wsUserIsNotBannedexception";
import { MuteUserOnChannelDTO } from "./dto/muteUserOnChannel.dto";
import { WsMuteHimselfException } from "./exceptions/channel/wsMuteHimself.exception";
import { MuteService } from "./mute.service";
import { WsUserIsAlreadyMutedOnChannelException } from "./exceptions/channel/wsUserIsAlreadyMutedOnChannel.exception";
import { WsUserIsNotMuteOnChannelException } from "./exceptions/channel/wsUserIsNotMuteOnChannel.excpetion";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepository: Repository<ChannelEntity>,
    private readonly userService: UsersService,
    private readonly socketService: SocketService,
    private readonly muteService: MuteService
  ) {}

  // Create, Join and Leave channel

  async createChannel(owner: UserEntity, channelRegister: CreateChannelDTO) {
    try {
      let hashedPassword: string | null = null;
      if (channelRegister.password) {
        hashedPassword = await bcrypt.hash(channelRegister.password, 10);
      }  

      const newChannel = this.channelRepository.create({
        ...channelRegister,
        password: hashedPassword,
        owner,
        users: [owner]
      })
      await this.channelRepository.save(newChannel);
      const channel = await this.getChannel(channelRegister.name);
      return new JoinChannel(owner.username, channel.name);
    }
    catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation)
        throw new WsException(`channel ${channelRegister.name} already exists`);
      throw error;
    }
  }

  async joinChannel(user: UserEntity, joinChannelDto: JoinChannelDTO) {
    const channel = await this.getChannel(joinChannelDto.name);

    if (channel.users.findIndex(chanUser => user.username == chanUser.username) != -1)
      throw new WsUserAlreadyInChannelException(user.username, joinChannelDto.name);
    if (channel.banned_users.find(bannedUser => bannedUser.username == user.username))
      throw new WsUserIsBannedOfChannel(user.username, channel.name);
    const inviteIndex = channel.invited_users.findIndex(chanUser => user.username == chanUser.username);
    if (channel.private && inviteIndex == -1)
      throw new WsUserUnauthorizeException(user.username, channel.name);
    if (channel.password) {
      if (!joinChannelDto.password)
        throw new WsPasswordMissingException(channel.name);
      const isValidPassword: boolean = await bcrypt.compare(joinChannelDto.password, channel.password);
      if (!isValidPassword)
        throw new WsInvalidCredentials(channel.name);
    }

    // Delete user of list of invites when joining
    if (inviteIndex != -1)
      channel.invited_users.splice(inviteIndex, 1);

    channel.users.push(user);
    await this.channelRepository.save(channel);
    return new JoinChannel(user.username, channel.name);
  }

  async inviteUserInChannel(user: UserEntity, inviteUser: InviteUserDTO) {
    const channel = await this.getChannel(inviteUser.channelName);

    if (!this.isUserInChannel(user, channel))
      throw new WsUserNotInChannelException(user.username, channel.name);
    if (!this.hasModeratorRights(user, channel))
      throw new WsUserHasNotModPermissionsException(user.username, channel.name);
    try {
      const target = await this.userService.findOneByName(inviteUser.username);
      if (await this.isUserInChannel(target, channel))
        throw new WsUserAlreadyInChannelException(target.username, channel.name);
      if (channel.invited_users.find(invited => invited.username == target.username))
        return null;

      channel.invited_users.push(target);
      await this.channelRepository.save(channel);
      return target;
    } catch (error) {
      if (error instanceof UserNotFoundException)
        throw new WsUserNotFoundException(inviteUser.username);
      else if (error instanceof WsUserAlreadyInChannelException)
        throw error;
      throw new WsInternalError();
    }
  }

  async leaveChannel(user: UserEntity, channel_name: string) {
    let channel = await this.getChannel(channel_name);
    
    const index = channel.users.findIndex(chanUser => chanUser.username == user.username);
    if (index == -1)
      throw new WsUserNotInChannelException(user.username, channel_name);
    channel.users.splice(index, 1);
    if (channel.owner.username == user.username) {
      //If user is creator transfer ownership if not the last user
      if (channel.users.length)
        this.transferOwnership(channel);
      //Or if last user destroy the channel
      else {
        await this.destroyChannel(channel);
        return new LeaveChannel(user.username, channel_name);
      }
    }

    await this.channelRepository.save(channel);
    return new LeaveChannel(user.username, channel_name);
  }

  private async destroyChannel(channel: ChannelEntity) {
    await this.channelRepository.remove(channel);
  }

  // Channel Moderators and ownership

  private async transferOwnership(channel: ChannelEntity) {
    channel.owner = channel.moderators[0] || channel.users[0];
    await this.channelRepository.save(channel);
  }

  // Getters

  async getAllChannelsJoined(user: UserEntity) {
    const channels = await this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect(
        'channel.users', 
        'users',
      )
      .where('users.user_id = :user_id', { user_id: user.user_id })
      .leftJoinAndSelect('channel.moderators', 'moderators')
      .leftJoinAndSelect('channel.owner', 'owner')
      .getMany();
    return channels;
  }

  async getAllChannelsInvited(user: UserEntity) {
    const channels = await this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect(
        'channel.invited_users', 
        'users',
      )
      .where('users.user_id = :user_id', { user_id: user.user_id })
      .leftJoinAndSelect('channel.moderators', 'moderators')
      .leftJoinAndSelect('channel.owner', 'owner')
      .getMany();
    return channels;
  }

  async getChannel(name: string) {
    const channel = await this.channelRepository.findOneBy({ name });
    if (!channel)
      throw new WsChannelNotFoundException(name);
    return channel;
  }

  // Checker
  isUserInChannel(user: UserEntity, channel: ChannelEntity) {
    return channel.users.findIndex(chanUser => chanUser.username == user.username) != -1;
  }

  hasModeratorRights(user: UserEntity, channel: ChannelEntity) {
    return user.username == channel.owner.username ||
      channel.moderators.find(moderator => moderator.username == user.username)
  }

  // Parameters
  async updateChannel(user: UserEntity, updateParams: UpdateChannelDto) {
    const channel = await this.getChannel(updateParams.name);
    if (channel.owner.username != user.username)
      throw new WsUserNotChannelOwnerException(user.username, channel.name);

    const hashedPassword = updateParams.password ? await bcrypt.hash(updateParams.password, 10) : null;
    channel.password = hashedPassword
    await this.channelRepository.save(channel);
  }

  async addChannelModerator(user: UserEntity, addChannelModeratorDto: ChannelUserTargetDTO) {
    const channel = await this.getChannel(addChannelModeratorDto.name);
    if (channel.owner.username != user.username)
      throw new WsUserNotChannelOwnerException(user.username, channel.name);

    const target = await this.socketService.getUserByName(addChannelModeratorDto.username);
    if (!channel.users.find(chanUser => chanUser.username == target.username)) {
      throw new WsUserNotInChannelException(target.username, channel.name);
    }
    if (this.hasModeratorRights(target, channel))
      throw new WsUserIsAlreadyModeratorException(target.username, channel.name);
    channel.moderators.push(target);
    await this.channelRepository.save(channel);
  }

  async removeChannelModerator(user: UserEntity, removeModerator: ChannelUserTargetDTO) {
    const channel = await this.getChannel(removeModerator.name);
    if (channel.owner.username != user.username)
      throw new WsUserNotChannelOwnerException(user.username, channel.name);

    const target = await this.socketService.getUserByName(removeModerator.username);
    const index = channel.moderators.findIndex(moderator => moderator.username == target.username);
    if (index == -1)
      throw new WsUserIsNotModeratorException(target.username, channel.name);
    if (target.username == channel.owner.username)
      throw new WsUserIsOwnerException(target.username, channel.name);
    channel.moderators.splice(index, 1);
    await this.channelRepository.save(channel);
  }

  async banChannelUser(user: UserEntity, banUser: ChannelUserTargetDTO) {
    const channel = await this.getChannel(banUser.name);
    if (!this.hasModeratorRights(user, channel))
      throw new WsUserHasNotModPermissionsException(user.username, channel.name);

    const target = await this.socketService.getUserByName(banUser.username);
    if (target.username == channel.owner.username)
      throw new WsUserIsOwnerException(target.username, channel.name);
    if (target.username == user.username)
      throw new WsBanHimselfException(target.username, channel.name);
    if (channel.banned_users.find(chanUser => chanUser.username == target.username))
      throw new WsUserIsAlreadyBannedException(target.username, channel.name);

    let index = channel.users.findIndex(chanUser => chanUser.username == target.username);
    if (index != -1)
      channel.users.splice(index, 1);
    index = channel.moderators.findIndex(chanUser => chanUser.username == target.username);
    if (index != -1)
      channel.moderators.splice(index, 1);
    index = channel.invited_users.findIndex(chanUser => chanUser.username == target.username);
    if (index != -1)
      channel.invited_users.splice(index, 1);
    
    channel.banned_users.push(target);
    await this.channelRepository.save(channel);
  }

  async unbanChannelUser(user: UserEntity, unbanUser: ChannelUserTargetDTO) {
    const channel = await this.getChannel(unbanUser.name);
    if (!this.hasModeratorRights(user, channel))
      throw new WsUserHasNotModPermissionsException(user.username, channel.name);

    const target = await this.socketService.getUserByName(unbanUser.username);
    const index = channel.banned_users.findIndex(chanUser => chanUser.username == target.username);
    if (index == -1)
      throw new WsUserIsNotBanned(target.username, channel.name);
    
    channel.banned_users.splice(index, 1);
    await this.channelRepository.save(channel);
  }

  async muteChannelUser(user: UserEntity, muteUser: MuteUserOnChannelDTO) {
    const channel = await this.getChannel(muteUser.name);
    if (!this.hasModeratorRights(user, channel))
      throw new WsUserHasNotModPermissionsException(user.username, channel.name);

    const target = await this.socketService.getUserByName(muteUser.username);
    if (!channel.users.find(chanUser => chanUser.username == target.username))
      throw new WsUserNotInChannelException(target.username, channel.name);
    if (target.username == user.username)
      throw new WsMuteHimselfException(target.username, channel.name);
    if (target.username == channel.owner.username)
      throw new WsUserIsOwnerException(target.username, channel.name);
    if (await this.muteService.isUserMutedOnChannel(target, channel))
      throw new WsUserIsAlreadyMutedOnChannelException(target.username, channel.name);

    await this.muteService.muteUserOnChannel(target, channel, muteUser.durationMs);
  }

  async unmuteChannelUser(user: UserEntity, unmuteUser: ChannelUserTargetDTO) {
    const channel = await this.getChannel(unmuteUser.name);
    if (!this.hasModeratorRights(user, channel))
      throw new WsUserHasNotModPermissionsException(user.username, channel.name);

    const target = await this.socketService.getUserByName(unmuteUser.username);
    if (!(await this.muteService.isUserMutedOnChannel(target, channel)))
      throw new WsUserIsNotMuteOnChannelException(target.username, channel.name);
    await this.muteService.unmuteUserOnChannel(target, channel);
  }

  async isMutedChannelUser(user: UserEntity, isMutedUser: ChannelUserTargetDTO) {
    const channel = await this.getChannel(isMutedUser.name);
    const target = await this.socketService.getUserByName(isMutedUser.username);
    if (!channel.users.find(chanUser => chanUser.username == target.username))
      throw new WsUserNotInChannelException(target.username, channel.name);
    return await this.muteService.isUserMutedOnChannel(target, channel);
  }
}