import { axios } from '../../utils';

export interface IInviteEmployeePayload {
  email: string;
  organization: number;
}

export const inviteEmployee = (data: IInviteEmployeePayload) => {
  return axios.post(`invite-employee/`, data);
};

export default inviteEmployee;
