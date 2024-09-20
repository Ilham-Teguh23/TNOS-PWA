const bankCode = (code) => {
  switch (code) {
    case "MANDIRI":
      return "BANK MANDIRI";
    case "BRI":
      return "BANK BRI";
    case "BCA":
      return "BANK BCA";
    case "BNI":
      return "BANK BNI";
    case "PERMATA":
      return "BANK PERMATA";
    case "SAHABAT_SAMPOERNA":
      return "BANK SAHABAT SAMPOERNA";
    case "BSI":
      return "BANK BSI";
    default:
      return "ERROR";
  }
};

export { bankCode };
