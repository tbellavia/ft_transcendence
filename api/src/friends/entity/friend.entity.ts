import { Expose } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity"

@Entity("friends")
export class FriendEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    friend_id: string;

    @ManyToOne(() => UserEntity, (user) => user.friends)
    @JoinColumn({ name: "user_1" })
    user_1: UserEntity;

    @Expose()
    @ManyToOne(() => UserEntity, (user) => user.friend_of_other)
    @JoinColumn({ name: "user_2" })
    user_2: UserEntity;

    @Expose()
    @Column({ default: true })
    pending: boolean;
}