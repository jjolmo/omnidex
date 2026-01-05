export const getApiServer = (): string => {
  return process.env.REACT_APP_API_ADDRESS || "https://api.dxlegends.com/api";
};

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
