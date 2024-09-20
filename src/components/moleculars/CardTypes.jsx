import React from "react";
// import creditCardType from "credit-card-type";
import visa from "../../assets/images/logo_kartu_kredit/Credit Card_VISA.png";
import master_card from "../../assets/images/logo_kartu_kredit/Credit Card_Mastercard.png";
import american_express from "../../assets/images/logo_kartu_kredit/Credit Card_American Express.png";
import jcb from "../../assets/images/logo_kartu_kredit/Credit Card_JCB.png";

function CardTypes({ cardNumber }) {
  // const checkCreditCardType = (creditCardNumber) => {
  //   const cardTypes = creditCardType(creditCardNumber);
  //   const cardTypeNames = cardTypes.map((cardType) => cardType.niceType);
  //   return cardTypeNames;
  // };

  // const cardType = checkCreditCardType(cardNumber);

  const getCardType = (cardNumber) => {
    // Remove any non-digit characters from the card number
    var cleanedCardNumber = cardNumber.replace(/\D/g, "");

    // Check if the card number passes the Luhn algorithm validation
    if (!isLuhnValid(cleanedCardNumber)) {
      return "Invalid";
    }

    // Define card type patterns
    var cardTypes = [
      {
        type: "Visa",
        pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
      },
      {
        type: "Mastercard",
        pattern: /^5[1-5][0-9]{14}$/,
      },
      {
        type: "American Express",
        pattern: /^3[47][0-9]{13}$/,
      },
      {
        type: "JCB",
        pattern: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
      },
      // Add more card types as needed
    ];

    // Check card type patterns against the card number
    for (var i = 0; i < cardTypes.length; i++) {
      if (cardTypes[i].pattern.test(cleanedCardNumber)) {
        return cardTypes[i].type;
      }
    }

    return "Unknown";
  };

  const isLuhnValid = (cardNumber) => {
    var sum = 0;
    var shouldDouble = false;

    // Iterate through each digit from right to left
    for (var i = cardNumber.length - 1; i >= 0; i--) {
      var digit = parseInt(cardNumber.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };
  var cardType = getCardType(cardNumber);

  const renderCardType = (type) => {
    switch (type) {
      case "Visa":
        return <img src={visa} alt={visa} />;
      case "Mastercard":
        return <img src={master_card} alt={master_card} />;
      case "American Express":
        return <img src={american_express} alt={american_express} />;
      case "JCB":
        return <img src={jcb} alt={jcb} />;
      default:
        return "";
    }
  };
  return <div className="container-type-card">{renderCardType(cardType)}</div>;
}

export default CardTypes;
