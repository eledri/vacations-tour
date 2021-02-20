const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");

async function registerAsync(user) {
  user.password = cryptoHelper.hash(user.password);
  const sql = "INSERT INTO users VALUES(default ,?, ?, ?, ?, default)";
  const info = await dal.executeAsync(sql, [user.firstName,user.lastName,user.username,user.password,  user.isAdmin]);
  user.userId = info.insertId;
  delete user.password;
  user.token = jwtHelper.getNewToken({ user });
  return user;
}

async function loginAsync(credentials) {
  credentials.password = cryptoHelper.hash(credentials.password);
  const sql = `SELECT userId,firstName,lastName,username,isAdmin FROM users WHERE username = ? AND password = ?`;
  const users = await dal.executeAsync(sql, [
    credentials.username,
    credentials.password,
  ]);
  if (users.length === 0) return null;
  const user = users[0];
  user.token = jwtHelper.getNewToken({ user });
  return user;
}

module.exports = {
  registerAsync,
  loginAsync,
};
