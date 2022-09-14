import { Expose } from "class-transformer";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "./message.entity";

@Entity()
export class ChannelEntity {
  // Identity informations (unique)
  @PrimaryGeneratedColumn()
  id?: number;

  @Expose()
  @Column({ unique: true })
  name: string;

  // Users relations
  @ManyToOne(() => UserEntity, (creator => creator.channels_created), {
    eager: true
  })
  creator: UserEntity;

  @ManyToMany(() => UserEntity, moderator => moderator.channels_moderated, {
    eager: true,
  })
  moderators: UserEntity[]

  @ManyToOne(() => UserEntity, user => user.channels_joined, {
    eager: true
  })
  users: UserEntity[];

  // Messages relations
  @OneToMany(() => MessageEntity, message => message.channel_target, {
    eager: true,
  })
  messages: MessageEntity[];
}