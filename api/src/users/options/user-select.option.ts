import { FindOptionsSelect } from "typeorm";
import { UserEntity } from "../entities/user.entity";

export const selectUserOption: FindOptionsSelect<UserEntity> = {
    user_id: true,
    username: true,
    creation_date: true
};