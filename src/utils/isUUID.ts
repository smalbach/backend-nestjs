export const isUUID = (str: string) => {
  const s = '' + str;
  return (
    s.length === 36 &&
    s[8] === '-' &&
    s[13] === '-' &&
    s[18] === '-' &&
    s[23] === '-'
  );
};

//validate UUID v4 format with regex
export const isValidUUIDV4 = (uuid: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(uuid);
};
