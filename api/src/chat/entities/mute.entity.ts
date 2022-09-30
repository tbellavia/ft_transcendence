import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Expose, Transform } from "class-transformer";
import { UserEntity } from "src/users/entities/user.entity";
import { ChannelEntity } from "./channel.entity";
import { channel } from "diagnostics_channel";

@Entity('mute')
export class MuteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Expose()
  @Transform(({ value }) => value.map(channel => channel.name))
  @ManyToOne(() => ChannelEntity, channel => channel.muted_users, {
    onDelete: "CASCADE"
  })
  channel: ChannelEntity;

  @Expose()
  @Transform(({ value }) => value.map(user => user.username))
  @ManyToOne(() => UserEntity, user => user.muted_channels, {
    eager: true,
    onDelete: "SET NULL"
  })
  user: UserEntity;

  @Expose()
  @Column({type: 'timestamp'})
  until_date: Date;
};