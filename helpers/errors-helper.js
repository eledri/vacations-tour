function getError(err) {
  if (config.isProduction) {
    return "Some Error occurred, please try again.";
  }
  return err.message;
}


function duplicateUser(err) {
    return `Username already taken!`;
  }
  

module.exports = {
  getError,
  duplicateUser
};
