const PhoneNumber = (number) => {
  const formattedNumber = number.startsWith("+62") ? `${number}` : number;
  return formattedNumber;
};

export default PhoneNumber;
