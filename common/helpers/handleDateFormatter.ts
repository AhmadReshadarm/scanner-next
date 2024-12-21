export const handleDateFormatter = (date: string): string => {
    const dateArr: string[] = date?.split('T')[0].split('-');
    const newDateArr: string[] = [];
    for (let i = dateArr?.length - 1; i >= 0; i--) {
      newDateArr.push(dateArr[i]);
    }
    const newDate = newDateArr?.join('.') + ' г.';
    return newDate;
  };