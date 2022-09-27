import { Expose, Transform } from "class-transformer";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChannelEntity } from "./channel.entity";

@Entity()
export class MessageEntity {
  // identity informations (unique)
  @PrimaryGeneratedColumn()
  id?: number;

  @Expose()
  @Column()
  content: string;

  // author is always a user
  @Expose()
  @Transform(({ value }) => value.username )
  @ManyToOne(() => UserEntity, {
    eager: true
  })
  author: UserEntity;

  // Target is either a channel or a user
  @ManyToOne(() => UserEntity, {
    nullable: true
  })
  user_target?: UserEntity;

  @ManyToOne(() => ChannelEntity, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  channel_target?: ChannelEntity

  @Expose()
  @CreateDateColumn()
  creation_date?: Date;
}