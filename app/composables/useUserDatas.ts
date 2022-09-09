export const useUserDatas = () => {
  useState('userDatas', () => {
    const { datas } = useApiFetch('/users/me');
    return datas;
  })
}