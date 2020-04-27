const pool = require('../db');

async function getWorkouts(req, res) {
  let currentUser = res.locals.loggedInUser.id;
  console.log(currentUser);
  try {
    const results = await pool.query('SELECT * FROM workouts WHERE user_id = ?', [currentUser]);
      res.send(results);
  } catch (err) {
    throw err;
  }
}

async function addWorkout(req, res) {
  let currentUser = res.locals.loggedInUser.id;
  const {workout_name, muscle_group} = req.body;
  try {
    const results = await pool.query('INSERT INTO workouts (workout_name, muscle_group, user_id) VALUES (?,?,?)',
      [workout_name, muscle_group, currentUser]);
        console.log(results);
        res.send(results);
  } catch (err) {
    console.log(err);
  }
}

async function editWorkout(req, res) {
  const currentUser = res.locals.loggedInUser.id;
  const {workoutId} = req.params;
  const {workout_name, muscle_group} = req.body;
  const newWorkout = {workout_name, muscle_group};
  try {
    const results = await pool.query('UPDATE workouts SET ? WHERE id = ? AND user_id = ?',
      [newWorkout, workoutId, currentUser]);
        console.log(results);
        res.send(results);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getWorkouts,
  addWorkout,
  editWorkout,
};