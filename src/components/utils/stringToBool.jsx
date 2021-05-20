export const stringToBool = str => {
  switch (str) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      console.log('error!');
  }
};
