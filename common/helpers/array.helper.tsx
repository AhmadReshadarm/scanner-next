const generateArrayOfNumbers = (number: number) => {
  return Array.apply(null, { length: number } as any).map<Number>(
    Number.call,
    Number,
  );
};

export { generateArrayOfNumbers };
