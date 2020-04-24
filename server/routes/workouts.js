const pool = require('../db');

async function getWorkouts(req, res) {
    try {
        let sql = ('SELECT * FROM workouts'); // WHERE USER_ID = ?
        await pool.query(sql, (err, result) => {
            res.send(result);
        });
    } catch (err) {
        throw err;
    }
}

async function addWorkout(req, res) {
    const {workout_name, muscle_group} = req.body;
    try {
        await pool.query('INSERT INTO workouts (workout_name, muscle_group) VALUES (?,?)',
            [workout_name, muscle_group], (err, results) => {
                console.log(results);
                res.send(results);
            });
    } catch (err) {
        console.log(err);
    }
}

async function editWorkout(req, res) {
    const {workout_name, muscle_group} = req.body;
    try {
        await pool.query('INSERT INTO workouts (workout_name, muscle_group) VALUES (?,?)',
            [workout_name, muscle_group], (err, results) => {
                console.log(results);
                res.send(results);
            });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getWorkouts,
    addWorkout,
    editWorkout,
};