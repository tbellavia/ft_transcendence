import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum MatchOutcomeEnum {
    WON         = "Won",
    LOST        = "Lost",
    ABANDONNED  = "Abandonned"
}

@Entity("matches")
export class MatchEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    match_id: string;

    @ManyToOne(() => UserEntity, (user) => user.matches)
    @JoinColumn({ name: "user_1" })
    user_1: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.opponents)
    @JoinColumn({ name: "user_2" })
    user_2: UserEntity;

    @Column()
    player_1_point: number;

    @Column()
    player_2_point: number;

    @Column({
        type: "enum",
        enum: MatchOutcomeEnum,
        nullable: false
    })
    player_1_outcome: MatchOutcomeEnum;

    @Column({
        type: "enum",
        enum: MatchOutcomeEnum,
        nullable: false
    })
    player_2_outcome: MatchOutcomeEnum;

    @Column()
    begin_date: Date;

    @Column()
    end_date: Date;

    @CreateDateColumn()
    creation_date: Date;
}