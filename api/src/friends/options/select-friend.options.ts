import { selectUserOption } from "src/users/options/user-select.option";
import { FindOptionsSelect } from "typeorm";
import { FriendEntity } from "../entity/friend.entity";

export const selectFriendOptions: FindOptionsSelect<FriendEntity> = {
    friend_id: true,
    user_2: selectUserOption,
    pending: true
};