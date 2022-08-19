import { StatEntity } from "../../stats/entities/stat.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { BlockedEntity } from "./blocked.entity";
import { FriendEntity } from "./friend.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: string;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn()
    creation_date: Date;

    @OneToOne(() => StatEntity, { cascade: true })
    @JoinColumn({ name: "stat_id" })
    stat: StatEntity;

    @OneToMany(() => BlockedEntity, (blocked) => blocked.user_1)
    blocked_users: BlockedEntity[];

    @OneToMany(() => BlockedEntity, (blocked) => blocked.user_2)
    blocked_by_users: BlockedEntity[];

    @OneToMany(() => FriendEntity, (friend) => friend.user_1)
    friends: FriendEntity[];

    @OneToMany(() => FriendEntity, (friend) => friend.user_2)
    friend_of_other: FriendEntity[];
}