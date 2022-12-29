import { axios } from '../../utils';

export const getTeamById = ({ queryKey }) => {
  const [, id] = queryKey;
  return axios.get(`/team/${id}`);
};

export default getTeamById;
