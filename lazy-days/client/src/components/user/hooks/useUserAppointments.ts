import dayjs from 'dayjs';
import { useQuery } from 'react-query';

import type { Appointment, User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from './useUser';

// for when we need a query function for useQuery
async function getUserAppointments(
  user: User | null,
): Promise<Appointment[] | null> {
  if (!user) return null;
  const { data } = await axiosInstance.get(`/user/${user.id}/appointments`, {
    headers: getJWTHeader(user),
  });
  return data.appointments;
}

//! 구문 -> !!user : user가 있을경우만
//! fallback type 설정가능
export function useUserAppointments(): Appointment[] {

  const {user} = useUser(); 

  const fallback :Appointment[]= []; 
  const {data :useUserAppointments =fallback} = useQuery(
  [queryKeys.appointments, queryKeys.user, user?.id], 
  ()=>getUserAppointments(user),{
    enabled: !!user
  }
  )
  return useUserAppointments;
}
