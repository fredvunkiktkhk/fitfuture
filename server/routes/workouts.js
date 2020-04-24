const express = require("express");
const router = express.Router();
/*const bcrypt = require('bcrypt');
const pool = require('../db');*/
// const authCheck = require('../middleware/token');
const { getWorkouts, addWorkouts, editWorkoutsDetails, addSingleWorkout, editDetails } = require('../controllers/workouts.controller');

// Must use authCheck
// Routes
router.get('/', getWorkouts); // Get all workouts
router.post('/add', addWorkouts);
router.post('/add/single', addSingleWorkout); // Add workout
router.get('/edit/:id'); // Edit workout
router.get('/workouts/:id/exercises'); // Lisades exercise võtab workouts ID, mis hetkel aktiivne
// router.get('/workouts/delete/:id');
// router.get('/workouts/edit/:id');
router.put('/edit/:id/exercise/:id', editDetails); // Saab muuta valitud ID'ga harjutust
router.put('/edit/:id', editWorkoutsDetails);
// router.put('/single/:id', editDetails);

module.exports = router;