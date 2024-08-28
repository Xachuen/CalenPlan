export const shortenEmail = (email) => {
  if (email.length > 20) {
    return email.slice(0, 20) + "...";
  }
  return email;
};
