const pool = require('../db');

async function getExercises() {
    return [];
}

async function editExercise(req, res) {
    const {workoutId, exerciseId} = req.params; // kuhu see panna
    const {exercise_name, sets, reps} = req.body;
    const newDetails = {exercise_name, sets, reps};
    try {
        const workouts = await pool.query('SELECT id FROM workouts WHERE id  = ?', [workoutId]);
        if (!workouts.length) {
            return res.status(404).send({msg: 'Workout not found'});
        }
        let row2 = await pool.query('UPDATE workout_details SET ? WHERE workouts_id = ?', [newDetails, exerciseId]);
        console.log(newDetails);
        console.log(workoutId);
        res.send(row2);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getExercises,
    editExercise,
};