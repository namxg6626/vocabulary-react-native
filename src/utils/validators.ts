export const isUUID = (str: string): boolean => {
  const uuidRegex = /^[\w]{8}(-[\w]{4}){3}-[\w]{12}$/;
  return uuidRegex.test(str);
};
