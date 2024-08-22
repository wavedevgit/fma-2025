import ApiMethods from "./ApiMethods";

export const getAllTeams = () => {
  const url = 'teams';
  return ApiMethods.get(url);
}

export const getTeamById = (teamId: number) => {
  const url = `teams/${teamId}`;
  return ApiMethods.get(url);
}

export const createTeam = (team: any) => {
  const url = 'teams';
  const body = {...team};
  return ApiMethods.post(url, body);
}

export const updateTeam = (teamId: number, partialTeam: any) => {
  const url = `teams/${teamId}`;
  const body = {...partialTeam};
  return ApiMethods.put(url, body);
}

export const addUser = (teamId: number) => {
  const url = `teams/join/${teamId}`;
  return ApiMethods.put(url);
}

export const removeUser = (teamId: number) => {
  const url = `teams/unjoin/${teamId}`;
  return ApiMethods.put(url);
}

// export const deleteTeam = (teamId: number) => {
//   const url = `teams/${teamId}`;
//   return ApiMethods.delete(url);
// }