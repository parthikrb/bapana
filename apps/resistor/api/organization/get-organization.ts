import { axios } from '../../utils';

export const getOrganization = () => {
  return axios.get(`/organization`);
};

export default getOrganization;
