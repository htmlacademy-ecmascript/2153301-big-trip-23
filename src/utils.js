let getRandomArrayElement = (items, count) => {
  let result = [];
  if (count) {
    for (let i = 0; i < count; i++) {
      result.push(items[Math.floor(Math.random() * items.length)]);
    }
    return result;
  } else {
    return items[Math.floor(Math.random() * items.length)];
  }
}

export {getRandomArrayElement};
