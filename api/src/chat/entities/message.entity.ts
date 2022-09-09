import { Exclude, Expose, Transform } from "class-transformer";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Expose()
  @Column()
  content: string;

  @Expose()
  @Transform(({ value }) => value.username )
  @ManyToOne(() => UserEntity, {
    eager: true
  })
  author: UserEntity;

  @ManyToOne(() => UserEntity, {
    eager: true
  })
  target: UserEntity;
}