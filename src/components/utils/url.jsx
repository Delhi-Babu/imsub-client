const host = process.env.REACT_APP_HOST;
const base = process.env.REACT_APP_BASE;

export const url = route => {
  return `${host}/${base}/${route}`;
};
