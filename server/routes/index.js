const router = require('express').Router();
const login = require('./login');
const signup = require('./signup');
const workouts = require('./workouts');
const exercises = require('./exercises');

router.post('/login', login.doLogin);

router.post('/signup', signup.doSignup);

router.get('/workouts', workouts.getWorkouts); // Get all workouts
router.post('/workouts', workouts.addWorkout); // Add new workout
router.put('/workouts/:id', workouts.editWorkout); // Edit workout
router.get('/workouts/edit/:id', workouts.editWorkout); // Edit workout

router.get('/workouts/:id', exercises.getExercises); // Returns all workout exercises
router.post('/workouts/:workoutId/exercise/:exerciseId', exercises.editExercise); // Saab muuta valitud ID'ga harjutust

// router.put('/single/:id', editDetails);
/*
app.get('/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
});*/

module.exports = router;