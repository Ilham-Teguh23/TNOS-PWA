const generate = (nameValue) => {
  const name = nameValue;
  let value = "";

  // Split the name into an array of words
  const words = name.split(" ");

  // Iterate over each word
  words.forEach((word) => {
    // Add the first character of each word to the value
    if (value.length < 2) {
      value += word.charAt(0);
    }
  });

  // Convert the value to uppercase
  value = value.toUpperCase();

  return value;
};

export { generate };
