const pool = require('../db');

async function getWorkouts(req, res) {
  let currentUser = res.locals.loggedInUser;
  try {
    const results = await pool.query('SELECT * FROM workouts WHERE user_id = ?', [currentUser.id]);
    if (!results) {
      res.status(400).json({error: 'No workouts found'})
    }
    res.send(results);
  } catch (err) {
    res.status(400).send(err, {msg: 'Something went wrong'})
  }
}

async function addWorkout(req, res) {
  let currentUser = res.locals.loggedInUser;
  const {workout_name, muscle_group} = req.body;
  try {
    const results = await pool.query('INSERT INTO workouts (workout_name, muscle_group, user_id) VALUES (?,?,?)',
      [workout_name, muscle_group, currentUser.id]);
    if (!results) {
      res.status(400).json({error: 'Something went wrong, try again!'})
    }
    res.send(results);
  } catch (err) {
    res.status(401).send(err, {msg: 'Something went wrong'})
  }
}

async function editWorkout(req, res) {
  let currentUser = res.locals.loggedInUser;
  const {workoutId} = req.params;
  const {workout_name, muscle_group} = req.body;
  const newWorkout = {workout_name, muscle_group};
  try {
    const results = await pool.query('UPDATE workouts SET ? WHERE id = ? AND user_id = ?',
      [newWorkout, workoutId, currentUser.id]);
    if (!results) {
      res.status(400).json({error: 'Something went wrong, try again!'})
    }
    res.send(results);
  } catch (err) {
    res.status(401).send(err, {msg: 'Something went wrong'})
  }
}

module.exports = {
  getWorkouts,
  addWorkout,
  editWorkout,
};