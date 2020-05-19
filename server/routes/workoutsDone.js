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
  const {workoutId} = req.params;
  try {
    const results = await pool.query('SELECT * FROM exercises WHERE workout_done_id = ? AND deleted_at IS NULL', [workoutId]);
    if (!results) {
      return res.status(400).json({error: 'No exercises found'})
    }
    return res.send(results);
  } catch (err) {
    return res.status(400).json(err)
  }
}

async function getWorkoutDoneExercises(req, res) {
  const {exerciseId} = req.params;
  try {
    const results = await pool.query('SELECT * FROM workouts_exercises_done WHERE exercise_done_id = ? AND deleted_at IS NULL', [exerciseId]);
    if (!results) {
      return res.status(400).json({error: 'No exercise found'});
    }
    return res.send(results);
  } catch (err) {
    return res.status(400).json({error: 'No exercise'});
  }
}

// lisa exercises tabelisse harjutus
async function addWorkoutExercise(req, res) {
  let currentUser = res.locals.loggedInUser;
  const {workoutId} = req.params;
  const exercises = req.body;
  try {
    const workouts = await pool.query('SELECT id FROM workouts_done WHERE id = ? AND user_id = ? AND deleted_at IS NULL', [workoutId, currentUser.id]);
    if (!workouts) {
      return res.status(400).json({error: 'Something went wrong, try again'});
    }
    exercises.forEach(exercise => {
      pool.query('INSERT INTO exercises (exercise_name, workouts_done_id) VALUES (?,?)', [exercise.exercise_name, workoutId]);
    });
    if (!exercises) {
      return res.status(400).json({error: 'Couldn\'t update exercise'});
    }
    return res.send(exercises);
/*    const results = await pool.query('INSERT INTO exercises (exercise_name, workouts_done_id) VALUES (?,?)',
      [exercise_name, workoutId]);
    if (!results) {
      return res.status(400).json({error: 'Couldn\'t add exercise'});
    }
    return res.send(results);*/
  } catch (err) {
    res.status(401).json(err)
  }
}

async function addDoneExercise(req, res) {
  const {exerciseId} = req.params;
  const {sets, reps, weight} = req.body;
  try {
    const workouts = await pool.query('SELECT id FROM exercises WHERE id = ? AND deleted_at IS NULL', [exerciseId]);
    if (!workouts) {
      return res.status(400).json({error: 'Something went wrong, try again'});
    }
    const results = await pool.query('INSERT INTO workouts_exercises_done (sets, reps, weight, exercise_done_id) VALUES (?,?,?,?)',
      [sets, reps, weight, exerciseId]);
    if (!results) {
      return res.status(400).json({error: 'Couldn\'t add exercise'});
    }
    return res.send(results);
  } catch (err) {
    res.status(401).json(err)
  }
}

module.exports = {
  getWorkoutsDone,
  addWorkoutsDone,
  getWorkoutExercises,
  addWorkoutExercise,
  getWorkoutDoneExercises,
  addDoneExercise,
};