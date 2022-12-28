import { axios } from '../../utils';

export const getOrganizationById = ({ queryKey }) => {
  const [, id] = queryKey;
  return axios.get(`/organization/${id}`);
};

export default getOrganizationById;
