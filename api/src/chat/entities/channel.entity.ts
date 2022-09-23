import { Expose, Transform, Type } from "class-transformer";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

  // Messages relations
  @OneToMany(() => MessageEntity, message => message.channel_target, {
    eager: true,
    onDelete: 'CASCADE'
  })
  messages: MessageEntity[];
}