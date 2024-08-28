import ApiMethods from "./ApiMethods";

export const generateAccessCode = (teamId: number) => {
  const url = `teams-access-code/${teamId}`;
  return ApiMethods.get(url);
}
