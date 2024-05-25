export const getRandomNumberElement = (min, max) => {
  const rand = min +
    Math.random() *
    (
      max + 1 - min
    );
  return Math.floor(rand);
};

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
