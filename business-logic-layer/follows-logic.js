const dal = require("../data-access-layer/dal");

//get all follows by user id
async function getAllFollowsAsync(userId) {
  const sql = `select vacationId from follows WHERE userId = ${userId}`;
  const follows = await dal.executeAsync(sql);
  return follows;
}

//add new follow
async function addFollowAsync(followToAdd) {
  const sql = `insert into follows values ('${followToAdd.userId}','${followToAdd.vacationId}')`;
  await dal.executeAsync(sql);
  return followToAdd;
}

//delete follow
async function deleteVacatioFollow(userId, vacationId) {
  const sql = `delete from follows where userId = ${userId} and vacationId = ${vacationId}`;
  await dal.executeAsync(sql);
}

module.exports = {
  addFollowAsync,
  getAllFollowsAsync,
  deleteVacatioFollow,
};
