import { Expose } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";

@Entity("blocked")
export class BlockedEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    blocked_id?: string;

    @Expose()
    @ManyToOne(() => UserEntity, (user) => user.blocked_users)
    @JoinColumn({ name: "user_1" })
    user_1: UserEntity;

    @Expose()
    @ManyToOne(() => UserEntity, (user) => user.blocked_by_users)
    @JoinColumn({ name: "user_2" })
    user_2: UserEntity;
}