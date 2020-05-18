const router = require('express').Router();
const authentication = require('./authentication');
const workouts = require('./workouts');
const exercises = require('./exercises');
const workoutsDone = require('./workoutsDone');
const authCheck = require('../middleware/token');

router.post('/login', authentication.doLogin);
router.post('/logout', authentication.doLogout);
router.post('/signup', authentication.doSignup);
router.get('/session', authCheck, authentication.isUserLoggedIn); // check if user has session

router.get('/workouts', authCheck, workouts.getWorkouts); // Get all workouts
router.get('/workouts/:workoutId', authCheck, workouts.getWorkout); //Get single workout
router.post('/workouts', authCheck, workouts.addWorkout); // Add new workout
router.put('/workouts/:workoutId', authCheck, workouts.editWorkout); // edit workout
router.delete('/workouts/:workoutId', authCheck, workouts.deleteWorkout); // delete workout

router.get('/workouts/:workoutId/exercises', authCheck, exercises.getExercises); // Returns all exercises
router.get('/workouts/:workoutId/exercises/:exerciseId', authCheck, exercises.getExercise); // Returns single exercises
router.post('/workouts/:workoutId/exercises', authCheck, exercises.addExercise); // add exercise
router.put('/workouts/:workoutId/exercises', authCheck, exercises.editExercise); // edit multiple exercise
router.delete('/workouts/:workoutId/exercises/:exerciseId', authCheck, exercises.deleteExercise); // delete exercise

router.get('/workouts-done', authCheck, workoutsDone.getWorkoutsDone); // Get all done workouts
router.post('/workouts-done', authCheck, workoutsDone.addWorkoutsDone); // Post done workout to history
router.get('/workouts-done/:workoutId/exercises', authCheck, workoutsDone.getWorkoutExercises); // Get done workout exercises
router.post('/workouts-done/:workoutId/exercises', authCheck, workoutsDone.addWorkoutExercise); // Post exercises
router.post('/workouts-done/:workoutId/exercises/:exerciseId/exercises-done', authCheck, workoutsDone.doneExercises) // Post exercises

module.exports = router;