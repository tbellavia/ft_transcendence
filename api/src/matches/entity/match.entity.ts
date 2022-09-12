import { Expose } from "class-transformer";
import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum MatchOutcomeEnum {
    WON         = "Won",
    LOST        = "Lost",
    ABANDONNED  = "Abandonned"
}

@Entity("matches")
export class MatchEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    match_id: string;

    @Expose()
    @ManyToOne(() => UserEntity, (user) => user.matches)
    @JoinColumn({ name: "user_1" })
    user_1: UserEntity;

    @Expose()
    @ManyToOne(() => UserEntity, (user) => user.opponents)
    @JoinColumn({ name: "user_2" })
    user_2: UserEntity;

    @Expose()
    @Column({ nullable: true })
    player_1_point: number;

    @Expose()
    @Column({ nullable: true })
    player_2_point: number;

    @Expose()
    @Column({
        type: "enum",
        enum: MatchOutcomeEnum,
        nullable: true
    })
    player_1_outcome: MatchOutcomeEnum;

    @Expose()
    @Column({
        type: "enum",
        enum: MatchOutcomeEnum,
        nullable: true
    })
    player_2_outcome: MatchOutcomeEnum;

    @Expose()
    @Column()
    begin_date: Date;

    @Expose()
    @Column({ nullable: true })
    end_date: Date;

    @Expose()
    @CreateDateColumn()
    creation_date: Date;
}