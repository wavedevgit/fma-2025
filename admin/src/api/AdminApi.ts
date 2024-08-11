import ApiMethods from "./ApiMethods"

export const getAdminData = async () => {
  const url = 'admin/informations';
  return ApiMethods.get(url);
}