const capitalizeFirstLetter = (str: string | undefined): string => {
  if(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return ''
};

export { capitalizeFirstLetter };
