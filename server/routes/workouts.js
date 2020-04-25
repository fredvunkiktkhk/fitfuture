const pool = require('../db');

async function getWorkouts(req, res) {
    try {
        let sql = ('SELECT * FROM workouts'); // WHERE USER_ID = ?
        await pool.query(sql, (err, result) => {
            console.log(result);
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
                console.log(results.workout_name);
                res.send(results);
            });
    } catch (err) {
        console.log(err);
    }
}

async function editWorkout(req, res) {
    const { workoutId } = req.params;
    const {workout_name, muscle_group} = req.body;
    const newWorkout = {workout_name, muscle_group};
    try {
        await pool.query('UPDATE workouts SET ? WHERE id = ?',
            [newWorkout, workoutId], (err, results) => {
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