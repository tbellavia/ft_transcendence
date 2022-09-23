import { use } from "h3";
import { $Fetch } from "ohmyfetch";
import { User, UserInfos } from "./User.class";

interface FriendRelation {
  friend_id: string;
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

  /* USER INTERFACE */
  public async updateAvatar() {}

  public async updateUsername(username: string) {}

  public async updateDoubleAuth(enable: boolean) {}


  /* FRIEND INTERFACE */
  public async addFriend(target: User | string) {
    const relation = await this.fetchingMethod(
      `/friends/me/${this.extractUsername(target)}`,
      {method: 'POST'}
    );
    this.pendingFriends.push(new User(relation, this.fetchingMethod));
    return relation;
  }

  public async acceptFriend(target: User | string) {
    const username = this.extractUsername(target);

    const relation: FriendRelation = await this.fetchingMethod(
      `/friends/me/${username}`,
      {
        method: 'PUT',
        body: {
          pending: false
        }
      },
    );

    const id = this.pendingFriends.findIndex(pendingFriend => pendingFriend.username == username);
    if (id != -1) {
      this.pendingFriends.splice(id, 1);
      this.friends.push(new User(relation.user_2.username, this.fetchingMethod));
    }
  }

  // Fetch friends or pending friends
  public async fetchFriends(pending: boolean = false) {
    const friends: FriendRelation[] = await this.fetchingMethod(`/friends/me?pending=${pending}`);
    const friendsUser = friends.map(friend => new User(friend.user_2.username, this.fetchingMethod));
  
    if (pending)
      this.pendingFriends = friendsUser;
    else
      this.friends = friendsUser;
  }

  public async removeFriend(target: User | string) {
    const username = this.extractUsername(target);
    await this.fetchingMethod(
      `/friends/me/${this.extractUsername(target)}`,
      {method: 'DELETE'}
    );
    this.deleteFriend(username);
  }


  /* BLOCK INTERFACE */
  public async blockUser(target: User | string) {
    const username = this.extractUsername(target);
    const relation: BlockRelation = await this.fetchingMethod(
      `/blocked/me/${username}`,
      {method: 'POST'}
    );
    this.blockedUsers.push(new User(relation.user_2.username, this.fetchingMethod));
    this.deleteFriend(username);
  }

  public async fetchBlockedUsers() {
    const blockedRelations: BlockRelation[] = await this.fetchingMethod('/blocked/me');
    const blockedUsers = blockedRelations.map(
      relation => new User(relation.user_2.username, this.fetchingMethod)
    );
    this.blockedUsers = blockedUsers;
  }

  public async unblockUser(target: User | string) {
    const username = this.extractUsername(target);
    await this.fetchingMethod(
      `/blocked/me/${username}`,
      {method: 'DELETE'}
    );

    let id = this.blockedUsers.findIndex(blockedUser => blockedUser.username == username);
    if (id != -1)
      this.blockedUsers.splice(id, 1);
  }

  public async isBlockUser(target: User | string) {
    const booleanString = await this.fetchingMethod(`/blocked/me/${target}`);
    return booleanString === 'true';
  }

  /* UTILS */
  // Extract username if User
  private extractUsername(target: User | string) {
    return typeof(target) == 'string' ? target : target.username;
  }

  private deleteFriend(username: string) {
    let id = this.friends.findIndex(friend => friend.username == username);
    if (id != -1)
      this.friends.splice(id, 1);
    id = this.pendingFriends.findIndex(friend => friend.username == username);
    if (id != -1)
      this.friends.splice(id, 1);
  }
}