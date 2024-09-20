export const generateChiperBasic = (length) => {
  // console.log(formError);
  let token_arr = [
    "tG7B/pyPW0H/ARi.EMqBQwrS$9fHv9",
    "V5fnr7nuGp4.OpTmAMHMI/YjHG1/4s",
    "P/42VLSzsx/FENsyinKds0s0O/V40h",
    "KmM$/O2GdD6SG/GuW/LBvQszI/VDWw",
    "1uV/nOvjkpTr/LzxrgS.G.HaVFG0Jd",
    "z8$b2RJAl/oFNf7Iw/M$qXyrX.EaPv",
    "4n1rxAB$b2W/S.EwOi4RkcbQ/Pjtf4",
    "MjGgCA/OMkLhB$jVX4YpbV3WBSR/n7",
    "cj/RS1/PcoqyUKUq.$CFwBdI/GX/rw",
    "A7tz8z.rq5/4O/aKOxC4Ycm$xoNdEW",
  ];
  let firstId = makeToken(length);
  let lastId = makeToken(length);
  let tokenKey = token_arr[Math.floor(Math.random() * 10)];
  let cipherBasic = "LYRAPP " + firstId + ":" + tokenKey + ":" + lastId;
  return cipherBasic;
};

export const makeToken = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJK/LMNOPQRSTU.VWXYZabc/defghi.jklmno/pqrstuvwxyz012/3456789$";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
