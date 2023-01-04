import { axios } from '../../utils';

export const getMe = () => {
  return axios.get(`me/`);
};

export default getMe;
