import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity"

@Entity("friends")
export class FriendEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    friend_id: string;

    @ManyToOne(() => UserEntity, (user) => user.friends)
    @JoinColumn({ name: "user_1" })
    user_1: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.friend_of_other)
    @JoinColumn({ name: "user_2" })
    user_2: UserEntity;

    @Column()
    pending: boolean;
}