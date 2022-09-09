interface UserDatas {
  username: string;
  two_factor_auth_secret?: string;
  is_two_factor_auth_enabled: boolean;
  creation_data: Date;
}

export function useUserDatas() {
  const user = useState('userDatas', async () => {
    return await useApiFetch<UserDatas>('/users/user/me');
  });
  console.log(user.value);
  return user;
}