import { axios } from '../../utils';

export const getOrganizations = () => {
  return axios.get(`/organization`);
};

export default getOrganizations;
