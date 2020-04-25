const pool = require('../db');

async function getExercises() {
    return [];
}

async function editExercise(req, res) {
    const {workoutId, exerciseId, user_id} = req.params; // kuhu see panna
    const {exercise_name, sets, reps} = req.body;
    const newDetails = {exercise_name, sets, reps};
    console.log(user_id);
    try {
        const workouts = await pool.query('SELECT id FROM workouts WHERE id = ? AND user_id = ?', [workoutId, user_id]);
        if (!workouts.length) {
            return res.status(404).send({msg: 'Workout not found'});
        }
        let exercise = await pool.query('UPDATE workout_details SET ? WHERE id = ?', [newDetails, exerciseId]);
        console.log(newDetails);
        console.log(workoutId);
        res.send(exercise);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getExercises,
    editExercise,
};