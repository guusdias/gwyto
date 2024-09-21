export const getDateFormatter = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
