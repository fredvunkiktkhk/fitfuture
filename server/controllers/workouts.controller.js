const workoutCtrl = {};
const pool = require('../db');

workoutCtrl.getWorkouts = async (req, res) => {
    try {
        let sql = ('SELECT * FROM workouts');
        await pool.query(sql, (err, result) => {
            res.send(result);
        });
    } catch (err) {
        throw err;
    }
};

workoutCtrl.addWorkouts = (req, res) => {

    const {workout_name, muscle_group, values} = req.body;


// töötav
    pool.getConnection(function (err, connection) {
        connection.beginTransaction(function(err) {
            if(err) {
                connection.rollback(function() {
                    console.log(err);
                    connection.release();
                });
            } else {
                connection.query('INSERT INTO workouts (workout_name, muscle_group) VALUES (?,?)',
                    [workout_name, muscle_group], function (error, results) {
                    console.log(results);
                    if (error) {
                        connection.rollback(function() {
                            console.log(error, '1');
                            connection.release()
                        });
                    } else {
                        connection.query('SELECT LAST_INSERT_ID() as last_id', function(error, results) {
                            const workouts_id = results[0].last_id;
                            console.log(workouts_id);
                            const exerciseArray = [];
                            values.forEach(exercise => {
                                exerciseArray.push([exercise.exercise_name, exercise.sets, exercise.reps, workouts_id]);
                            });
                            console.log(exerciseArray);
                            connection.query('INSERT INTO workout_details (exercise_name, sets, reps, workouts_id) VALUES ?',
                            [exerciseArray],  function(error, results) {
                            console.log(results);
                            if (error) {
                                console.log(error, '2');
                                connection.rollback(function() {
                                    connection.release();
                                });
                            } else {
                                connection.commit(function(err) {
                                    if (err) {
                                        connection.rollback(function() {
                                            console.log(err, '3');
                                            connection.release();
                                        });
                                    } else {
                                        connection.release();
                                        res.send(results)
                                    }
                                });
                            }
                        });
                        });
                    }
                });
            }
        });
    });
// SELECT id as workouts_id FROM workouts where id = ?
    // Siis results[0].workouts_id
    // Kas peab lisama user_id ??

};

// workoutCtrl.editWorkouts = async (req, res) => {
//     const { id } = req.params;
//     const { workout_name, muscle_group } = req.body;
//
//     const edit = await pool.query
// };

workoutCtrl.addSingleWorkout = async (req, res) => {
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
};

workoutCtrl.editDetails = async (req, res) => {
  const {id} = req.params;
    const {exercise_name, sets, reps} = req.body;
    const newDetails = {exercise_name, sets, reps};
  try {
      const workouts = await pool.query('SELECT id FROM workouts WHERE id  = ?', [id]);
      const workoutId = workouts[0].id;
      console.log(workoutId);
      let row2 = await pool.query('UPDATE workout_details SET ? WHERE workouts_id = ?', [newDetails, workoutId]);
      console.log(newDetails);
      console.log(workoutId);
      res.send(row2);
  } catch (err) {
      console.log(err);
  }
};

workoutCtrl.editWorkoutsDetails = async (req, res) => {
    const { id } = req.params;
    const {exercise_name, sets, reps} = req.body;
    const newDetails = {exercise_name, sets, reps};
    try {
        await pool.query('UPDATE workout_details SET ? WHERE id = ?',
            [newDetails, id], (err, results) => {
            // if (!err) {
            //     if (results.length === 0) {
            //         return res.status(403).send({msg: 'Invalid'});
            //     }
                console.log(newDetails);
                console.log(id);
                res.send(results);
            // }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }


};

module.exports = workoutCtrl;