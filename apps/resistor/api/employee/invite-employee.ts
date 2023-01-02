import { axios } from '../../utils';

export interface IInviteEmployeePayload {
  email: string;
  organization: number;
}

export const inviteEmployee = (data) => {
  return axios.post(`invite-employee/`, data);
};

export default inviteEmployee;
