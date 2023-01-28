function randomInt() {
  return Math.floor(Math.random() * 4);
}

export const randomSpy = () => {
  const spyArray = [
    "text-pink-900 text-9xl",
    "text-pink-500 text-9xl",
    "text-myBlack text-9xl",
    "text-gray-500 text-9xl",
  ];
  const x = randomInt();
  return spyArray[x];
};

export const randomSpy2 = () => {
  const spyArray = [
    "text-pink-900 text-3xl",
    "text-pink-500 text-3xl",
    "text-myBlack text-3xl",
    "text-gray-500 text-3xl",
  ];
  const x = randomInt();
  return spyArray[x];
};
