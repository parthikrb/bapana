import { axios } from '../../utils';

export interface IJoinEmployeePayload {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  invitationCode: string;
}

export const joinEmployee = (data: IJoinEmployeePayload) => {
  return axios.post(`join/`, data);
};

export default joinEmployee;
