<template>
  <div class="container">
    <h2>This is under maintenance</h2>
    <h3>partly working</h3>
    <div class="heading">{{workout_name}}</div>
    <div class="exercise-data">
      <ul v-for="exercise in exercises" :key="exercise.id" @click="onEdit(exercise.id, workoutId)">
        <li class="name">{{exercise_name}}</li>
        <li class="numbers">{{sets}}<p>x</p>{{reps}}</li>
      </ul>
    </div>
    <div class="workout-container" v-if="activeWorkout">
      <div class="workouts-list" v-for="workout in workouts.data" :key="workout.id">
        <div
          class="workouts-item"
          @click="workoutId = workout.id"
          :class="{'active': workoutId === workout.id}">
          {{workout.workout_name}}
        </div>
      </div>
      <div class="confirm" v-if="workoutId">
        <button @click="chooseWorkout(workoutId)" class="confirm-button">
          Kinnita
        </button>
      </div>
    </div>

    <SubmitButton type="button" name="Vali tänane kava" @click="openWorkoutList"/>
  </div>
</template>

<script>
  import SubmitButton from "../Buttons/SubmitButton";

  export default {

    name: "WorkoutDiary",
    components: {
      SubmitButton,
    },
    data() {
      return {
        isActive: false,
        exercises: [],
        workoutId: null,
        exerciseId: null,
        activeWorkout: false,
        workout_name: '',
        muscle_group: '',
        exercise_name: '',
        sets: null,
        reps: null,
        newData: null,
      }
    },
    mounted() {
      if (localStorage.getItem('exercises')) {
        try {
          this.exercises = JSON.parse(localStorage.getItem('exercises'));

            this.exercises.forEach(exercise => {
              this.exercise_name = exercise.exercise_name
              this.sets = exercise.sets
              this.reps = exercise.reps
            })

        } catch (err) {
          // localStorage.removeFromLs('exercises');
          console.log(err);
        }
      }
      if (localStorage.workout_name) {
        this.workout_name = localStorage.workout_name;
      }
      if (localStorage.exercise_name) {
        this.exercise_name = localStorage.exercise_name;
      }
    },
    methods: {
      onEdit(exerciseId, workoutId) {
        this.$emit('onEdit', exerciseId, workoutId)
      },
      openWorkoutList() {
        this.activeWorkout = !this.activeWorkout;
      },
      async chooseWorkout(workoutId) {
        this.workoutId = workoutId
        try {
          const workout = await this.axios.get('/api/workouts/' + this.workoutId);
          this.workout = workout.data
          this.workout_name = workout.data.workout_name
          this.muscle_group = workout.data.muscle_group

          const exercises = await this.axios.get('/api/workouts/'+ this.workoutId + '/exercises');
          this.exercises = exercises.data

          localStorage.workout_name = this.workout_name
          const parsed = JSON.stringify(this.exercises);
          localStorage.setItem('exercises', parsed);

          this.activeWorkout = false;
        } catch (err) {
          console.log(err.response);
        }
      },
      async getWorkouts() {
        try {
          this.workouts = await this.axios.get('/api/workouts');
        } catch (err) {
          await this.$router.push({name: 'Signup'});
        }
      },
      async getExercises() {
        try {
          this.exercises = await this.axios.get('/api/workouts/' + this.workoutId + '/exercises')
        } catch (err) {
          console.log(err.response);
        }
      },
/*      async addAllExercises() {
        const exercises = this.exercises
        const result = exercises.map(exercise =>
          exercise.exercise_name
        )
        try {
          await this.axios.post('api/workouts-done/'+ this.workoutId +'/exercises/', result)
        } catch (err) {
          console.log(err.response);
        }
      },*/
      // Peaks tulema kontroll, kas on tänane kuupäev siis näita seda kava.
    },
    created() {
      this.getExercises();
      this.getWorkouts();
    },
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    width: 350px;
    min-height: 350px;
    border: 1px solid #EEE;
    box-shadow: 0 2px 3px #CCC;
    padding: 20px;
    margin: 50px auto;
    background: #3C444C;
  }

  .heading {
    padding: 5px;
    border-bottom: 1px solid #F27A54;
    text-align: center;
  }

  .exercise-data {
    width: 100%;
    padding: 15px;
    max-height: 290px;
    overflow-y: auto;
  }

  .workout-container {
    position: absolute;
    background: #3C444C;
    height: 300px;
    max-height: 300px;
    width: 200px;
    padding: 20px;
    border: 1px solid #FFF;
    overflow-y: auto;
  }

  .workouts-item {
    padding: 5px;
    cursor: pointer;
    border-bottom: 1px solid #5F6265;
    text-align: center;

    &:hover {
      background: #5F6265;
    }
  }

  .active {
    background: #5F6265;
  }

  ul {
    display: flex;
    padding: 10px 0;
    margin: 0;
    border-bottom: 1px solid #5F6265;
    cursor: pointer;

    &:hover {
      background: #5F6265;
    }
  }

  li {
    list-style: none;
    color: #FFF;
    display: flex;
  }

  .name {
    display: flex;
    align-items: flex-start;
  }

  .numbers {
    color: #F27A54;
    margin-left: auto;

    p {
      margin: 0;
      color: #FFF;
    }
  }

  .submit {
    position: fixed;
    bottom: 40%;
  }

  .confirm {
    text-align: center;

    &-button {
      height: 30px;
      width: 150px;
      margin-top: 25px;
      border-radius: 20px;
      border: 0;
      color: #FFF;
      font-weight: 600;
      cursor: pointer;
      background: linear-gradient(to left, #F27A54, #A154F2);
      box-shadow: 0 0 10px 0 #00000075;

      &:hover {
        box-shadow: 0 0 10px 0 #ffffff3d;
      }
    }
  }

  @media screen and (max-height: 569px) {
    .submit {
      bottom: 80px;
    }
  }


  @media screen and (max-width: 767px) {
    .container {
      max-width: 310px;
    }
  }
</style>