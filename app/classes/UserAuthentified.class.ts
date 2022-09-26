import { $Fetch } from "ohmyfetch";
import { User, UserInfos } from "./User.class";

interface FriendRelation {
  friend_id: string;
  user_1: UserInfos;
  user_2: UserInfos;
  pending: boolean;
}

interface BlockRelation {
  blocked_id: string;
  user_1: UserInfos;
  user_2: UserInfos;
}

export class UserAuthentified extends User {
  public friends: User[] = [];
  public pendingFriends: User[] = [];
  public blockedUsers: User[] = [];

  constructor(username: string, fetchingMethod: $Fetch) {
    super(username, fetchingMethod);
  }

  /* Overload method */
  public async fetchAll() {
    await super.fetchAll();
    this.pendingFriends.forEach(friend => friend.fetchAll());
    this.friends.forEach(friend => friend.fetchAll());
    this.blockedUsers.forEach(user => user.fetchAll());
    return this;
  }

  /* USER INTERFACE */
  /* -------------------------------------------------------------- */
  public async updateAvatar() {}

  public async updateUsername(username: string) {}

  public async updateDoubleAuth(enable: boolean) {}


  /* FRIEND INTERFACE */
  /* -------------------------------------------------------------- */
  public async addFriend(target: User | string) {
    await this.fetchingMethod(
      `/friends/me/${this.extractUsername(target)}`,
      {method: 'POST'}
    );
  }

  public async acceptFriend(target: User | string) {
    await this.fetchingMethod(
      `/friends/me/${this.extractUsername(target)}`, { 
        method: 'PUT',
        body: {
          pending: false
        }
      }
    );
  }

  public async deleteFriend(username: User | string) {
		await this.fetchingMethod(
      `/friends/me/${this.extractUsername(username)}`,
      {method: 'DELETE'}
    );
	}

  public async getFriends(pending: boolean = false) {
    return await this.fetchingMethod(`/friends/me?pending=${pending}`);
  }

  public async getFriendsRequest() {
    return await this.fetchingMethod(`/friends/me/request`);
  }


  /* BLOCK INTERFACE */
  /* -------------------------------------------------------------- */
  public async blockUser(target: User | string) {
    await this.fetchingMethod(
      `/blocked/me/${this.extractUsername(target)}`,
      {method: 'POST'}
    );
  }

  public async unblockUser(target: User | string) {
    await this.fetchingMethod(
      `/blocked/me/${this.extractUsername(target)}`,
      {method: 'DELETE'}
    );
  }

  public async isBlockUser(target: User | string) {
    const booleanString = await this.fetchingMethod(`/blocked/me/${this.extractUsername(target)}`);
    return booleanString === 'true';
  }

  /* UTILS */
  /* -------------------------------------------------------------- */
  // Extract username if User
  private extractUsername(target: User | string) {
    return typeof(target) == 'string' ? target : target.username;
  }

  public  extractFriend(relation: FriendRelation) {
    return relation.user_2.username != this.username ? relation.user_2 : relation.user_1;
  }
}