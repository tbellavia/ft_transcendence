export interface Channel {
  name: string,
  owner: string;
  moderators: string[];
  users: string[];
  banned_users: string[];
}