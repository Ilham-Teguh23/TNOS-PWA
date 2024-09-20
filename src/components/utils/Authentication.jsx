import aes from "crypto-js/aes";
import encHex from "crypto-js/enc-hex";
import padZeroPadding from "crypto-js/pad-zeropadding";

export const getAuth = (value) => {
  // message to encrypt
  let msg = value;

  // the key and iv should be 32 hex digits each, any hex digits you want, but it needs to be 32 on length each
  let key = encHex.parse("29ff6eefffdb9618b39d277991028912");
  let iv = encHex.parse("9a82bccd31890e7765e18011fbf3f8c5");

  // encrypt the message
  let encrypted = aes
    .encrypt(msg, key, { iv: iv, padding: padZeroPadding })
    .toString();
  return encrypted;
};
