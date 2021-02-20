const crypto = require("crypto"); // no need to install

const salt = "MakeThingsGoRight";

function hash(plainText) {
  return crypto.createHmac("sha512", salt).update(plainText).digest("hex")
}

module.exports = {
  hash,
};
