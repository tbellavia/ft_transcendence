import { UserEntity } from "../../users/entities/user.entity";
import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";

export enum RankEnum {
    GOLD    = "Gold",
    SILVER  = "Silver",
    BRONZE  = "Bronze",
    WOOD    = "Wood"
}

@Entity("stats")
export class StatEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    stat_id: string;
    
    @Expose()
    @Column({ nullable: true, default: 0 })
    game_total: number;

    @Expose()
    @Column({ nullable: true, default: 0 })
    game_won: number;

    @Expose()
    @Column({ nullable: true, default: 0 })
    game_abandonned: number;

    @Expose()
    @Column({
        type: "enum",
        enum: RankEnum,
        default: RankEnum.WOOD
    })
    rank: RankEnum;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    user: UserEntity;
}