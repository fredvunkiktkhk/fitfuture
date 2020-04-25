const router = require('express').Router();
const login = require('./login');
const signup = require('./signup');
const workouts = require('./workouts');
const exercises = require('./exercises');

router.post('/login', login.doLogin);

router.post('/signup', signup.doSignup);

router.get('/workouts', workouts.getWorkouts); // Get all workouts
router.post('/workouts', workouts.addWorkout); // Add new workout
router.put('/workouts/edit/:id', workouts.editWorkout); // edit workout
router.delete('/workouts/del/:id', workouts.editWorkout); // delete workout

router.get('/workouts/:id', exercises.getExercises); // Returns all workout exercises
router.put('/workouts/:workoutId/exercise/:exerciseId', exercises.editExercise); // Saab muuta valitud ID'ga harjutust
// router.delete('/workouts/:workoutId/exercise/:exerciseId', exercises.editExercise); // Saab muuta valitud ID'ga harjutust


/*
app.get('/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
});*/

module.exports = router;