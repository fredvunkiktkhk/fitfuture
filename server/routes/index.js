const router = require('express').Router();
const authentication = require('./authentication');
const workouts = require('./workouts');
const exercises = require('./exercises');
const authCheck = require('../middleware/token');

router.post('/login', authentication.doLogin);
router.post('/logout', authentication.doLogout);
router.post('/signup', authentication.doSignup);
router.get('/session', authCheck, authentication.isUserLoggedIn);

router.get('/workouts', authCheck, workouts.getWorkouts); // Get all workouts
router.post('/workouts', authCheck, workouts.addWorkout); // Add new workout
router.put('/workouts/:workoutId', authCheck, workouts.editWorkout); // edit workout
router.delete('/workouts/:workoutId', authCheck, workouts.deleteWorkout); // delete workout

router.get('/workouts/:workoutId', authCheck, exercises.getExercises); // Returns all workout exercises
router.post('/workouts/:workoutId/exercise', authCheck, exercises.addExercise);
router.put('/workouts/:workoutId/exercise/:exerciseId', authCheck, exercises.editExercise); // Saab muuta valitud ID'ga harjutust
router.delete('/workouts/:workoutId/exercise/:exerciseId', authCheck, exercises.deleteExercise); // Saab muuta valitud ID'ga harjutust

module.exports = router;