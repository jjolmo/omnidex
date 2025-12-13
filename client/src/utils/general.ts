export const getApiServer = (): string => {
  return process.env.REACT_APP_API_ADDRESS || "https://api.dxlegends.com/api";
};
