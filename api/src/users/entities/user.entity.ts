import { StatEntity } from "../../stats/entities/stat.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, BaseEntity } from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: string;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn()
    creation_date: Date;

    @OneToOne(() => StatEntity)
    @JoinColumn({ name: "stat_id" })
    stat: StatEntity;
}