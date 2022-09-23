import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, BaseEntity, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { StatEntity } from "../../stats/entities/stat.entity";
import { BlockedEntity } from "../../blocked/entity/blocked.entity";
import { FriendEntity } from "../../friends/entity/friend.entity";
import { MatchEntity } from "src/matches/entity/match.entity";
import { Expose } from "class-transformer";
import { MessageEntity } from "src/chat/entities/message.entity";
import { ChannelEntity } from "src/chat/entities/channel.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;
    
    @Expose()
    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false, type: "bytea" })
    avatar: Uint8Array;

    // Used to find 42 registered user uppon connection if it change its name in database.
    @Column({ unique: true, nullable: true })
    user42_id?: number;

    @Column({ nullable: true })
    password?: string;

    @Expose()
    @Column({ nullable: true })
    public two_factor_auth_secret?: string;

    @Expose()
    @Column({ default: false })
    public is_two_factor_auth_enabled: boolean;

    @Expose()
    @CreateDateColumn()
    creation_date: Date;

    @OneToOne(() => StatEntity, { cascade: true })
    @JoinColumn({ name: "stat_id" })
    stat: StatEntity;

    /* Join Column, not used */

    // Blocked
    @OneToMany(() => BlockedEntity, (blocked) => blocked.user_1)
    blocked_users: BlockedEntity[];

    @OneToMany(() => BlockedEntity, (blocked) => blocked.user_2)
    blocked_by_users: BlockedEntity[];


    // Friendship
    @OneToMany(() => FriendEntity, (friend) => friend.user_1)
    friends: FriendEntity[];

    @OneToMany(() => FriendEntity, (friend) => friend.user_2)
    friend_of_other: FriendEntity[];

    // Match History
    @OneToMany(() => MatchEntity, (match) => match.user_1)
    matches: MatchEntity[];

    @OneToMany(() => MatchEntity, (match) => match.user_2)
    opponents: MatchEntity[];

    // Message History
    @OneToMany(() => MessageEntity, (message) => message.author, { onDelete: 'CASCADE' })
    messages_author: MessageEntity[];

    @OneToMany(() => MessageEntity, (message) => message.user_target, { onDelete: 'CASCADE' })
    messages_target: MessageEntity[];

    // Channels created, joined, moderated
    @OneToMany(() => ChannelEntity, channel => channel.owner, { cascade: true })
    channels_owned: ChannelEntity[];

    @ManyToMany(() => ChannelEntity, channel => channel.moderators)
    channels_moderated: ChannelEntity[];

    @ManyToMany(() => ChannelEntity, channel_joined => channel_joined.users)
    channels_joined: ChannelEntity[];
}