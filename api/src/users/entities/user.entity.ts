import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { StatEntity } from "../../stats/entities/stat.entity";
import { BlockedEntity } from "../../blocked/entity/blocked.entity";
import { FriendEntity } from "../../friends/entity/friend.entity";
import { MatchEntity } from "src/matches/entity/match.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: string;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: true })
    two_factor_auth_secret: string;

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
}