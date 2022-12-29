import { axios } from '../../utils';

export const getTeams = () => {
  return axios.get(`/team`);
};

export default getTeams;
