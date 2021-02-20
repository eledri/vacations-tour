const dal = require("../data-access-layer/dal");
const uuid = require("uuid");

//get all vacations
async function getAllVacationsAsync() {
  const sql = `select vacations.vacationId, destination,description,fromDate,toDate,price,imageFileName,
               COUNT(userId) as 'followers' from follows right JOIN  vacations on vacations.vacationId = follows.vacationId
               GROUP by destination order by followers desc`;
  const vacations = await dal.executeAsync(sql);
  return vacations;
}

//delete vacation
async function deleteVacation(id) {
  const sql = `delete from Vacations where vacationId = ${id}`;
  await dal.executeAsync(sql);
}

//add vacation
async function addVacationAsync(vacation, image) {
  let newFileName = null;
  if (image) {
    newFileName = image.name;
    await image.mv("./images/" + newFileName);
  }
  const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;
  const info = await dal.executeAsync(sql, [
    vacation.destination,
    vacation.description,
    vacation.fromDate,
    vacation.toDate,
    vacation.price,
    newFileName,
  ]);
  vacation.vacationId = info.insertId;
  vacation.followers = 0
//   vacation.ImageFileName = newFileName;
  return vacation;
}

// edit full vacation
async function updateFullVacation(vacation, image) {

  let newFileName = null;
  if (image) {
    newFileName = image.name;
    await image.mv("./images/" + newFileName);
  } else {
    newFileName = vacation.imageFileName;
  }
  const sql = `UPDATE vacations SET
    destination = ?,
    description = ?,
    fromDate = ?,
    toDate = ?,
    price = ?,
    imageFileName = ?
    WHERE vacationId = ${vacation.vacationId}`;
  const info = await dal.executeAsync(sql, [
    vacation.destination,
    vacation.description,
    vacation.fromDate,
    vacation.toDate,
    vacation.price,
    newFileName,
  ]);
  return info.affectedRows === 0 ? null : vacation;
}

module.exports = {
  getAllVacationsAsync,
  addVacationAsync,
  deleteVacation,
  updateFullVacation,
};
