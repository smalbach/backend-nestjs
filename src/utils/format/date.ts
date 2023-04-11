export const formatYmd1 = (date) => {
  try {
    return date.toISOString().slice(0, 10);
  } catch (error) {
    return null;
  }
};
