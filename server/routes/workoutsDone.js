const pool = require('../db');


async function getWorkoutsDone(req, res) {
  let currentUser = res.locals.loggedInUser;
  try {
    const results = await pool.query('SELECT * FROM workouts_done WHERE user_id = ? AND deleted_at IS NULL', [currentUser.id]);
    if (!results) {
      return res.status(400).json({error: 'No workouts found'})
    }
    return res.send(results);
  } catch (err) {
    res.status(400).send(err)
  }
}

async function addWorkoutsDone(req, res) {
  let currentUser = res.locals.loggedInUser;
  const {workout_name, muscle_group} = req.body;
  try {
    const results = await pool.query('INSERT INTO workouts_done (workout_name, muscle_group, user_id) VALUES (?,?,?)',
      [workout_name, muscle_group, currentUser.id]);
    if (!results) {
      return res.status(400).json({error: 'Something went wrong, try again!'});
    }
    return res.send(results);
  } catch (err) {
    res.status(401).send(err);
  }
}

async function getWorkoutExercises(req, res) {
  const {workoutDoneId} = req.params;
  try {
    const results = await pool.query('SELECT * FROM workout_details_done WHERE workout_done_id = ? AND deleted_at IS NULL', [workoutDoneId]);
    if (!results) {
      return res.status(400).json({error: 'No exercises found'})
    }
    return res.send(results);
  } catch (err) {
    res.status(400).json(err)
  }
}

async function addWorkoutExercises(req, res) {
  let currentUser = res.locals.loggedInUser;
  const {workoutDoneId} = req.params;
  const exercises = req.body;
  try {
    const workouts = await pool.query('SELECT id FROM workouts_done WHERE id = ? AND user_id = ? AND deleted_at IS NULL',
      [workoutDoneId, currentUser.id]);
    if (!workouts) {
      return res.status(400).json({error: 'Something went wrong, try again'});
    }
    exercises.forEach(exercise => {
      pool.query('INSERT INTO workout_details_done (exercise_name, sets, reps, weight, workout_done_id) VALUES (?,?,?,?,?)',
        [exercise.exercise_name, exercise.sets, exercise.reps, exercise.id, exercise.weight, workoutDoneId]);
    });
    if (!exercises) {
      return res.status(400).json({error: 'Couldn\'t update exercise'});
    }
    return res.send(exercises);
  } catch (err) {
    res.status(401).json(err)
  }
}

module.exports = {
  getWorkoutsDone,
  addWorkoutsDone,
  getWorkoutExercises,
  addWorkoutExercises
};