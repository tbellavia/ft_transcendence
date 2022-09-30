import { Expose, Transform, Type } from "class-transformer";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "./message.entity";
import { MuteEntity } from "./mute.entity";

@Entity("channels")
export class ChannelEntity {
  // Identity informations (unique)
  @PrimaryGeneratedColumn()
  id?: number;

  @Expose()
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Expose()
  @Column()
  private: boolean
  @Type(() => UserEntity)

  // Users relations
  @Expose()
  @Transform(({ value }) => value.username )
  @ManyToOne(() => UserEntity, (owner => owner.channels_owned), {
    eager: true
  })
  owner: UserEntity;

  @Expose()
  @Type(() => UserEntity)
  @Transform(({ value }) => value.map(user => user.username))
  @ManyToMany(() => UserEntity, moderator => moderator.channels_moderated, {
    eager: true
  })
  @JoinTable()
  moderators?: UserEntity[]

  @Expose()
  @Type(() => UserEntity)
  @Transform(({ value }) => value.map(user => user.username))
  @ManyToMany(() => UserEntity, user => user.channels_joined, {
    eager: true
  })
  @JoinTable()
  users: UserEntity[];

  @Expose()
  @Type(() => UserEntity)
  @Transform(({ value }) => value.map(user => user.username))
  @ManyToMany(() => UserEntity, user => user.channels_banned, {
    eager: true
  })
  @JoinTable()
  banned_users: UserEntity[];

  @ManyToMany(() => UserEntity, invited_user => invited_user.channels_invited, {
    eager: true
  })
  @JoinTable()
  invited_users: UserEntity[];

  // Messages relations
  @OneToMany(() => MessageEntity, message => message.channel_target, {
    eager: true,
    onDelete: 'CASCADE'
  })
  messages: MessageEntity[];

  @OneToMany(() => MuteEntity, muted_user => muted_user.channel, {
    eager: true
  })
  muted_users: MuteEntity[];
}