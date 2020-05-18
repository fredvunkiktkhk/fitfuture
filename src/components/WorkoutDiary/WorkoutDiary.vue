<template>
  <div class="container">
    <div class="heading">{{workout_name}}</div>
    <div class="exercise-data">
      <ul v-for="exercise in exercises" :key="exercise.id" @click="onEdit(exercise.id, workoutId)">
        <li class="name">{{exercise.exercise_name}}</li>
        <li class="numbers">{{exercise.sets}}<p>x</p>{{exercise.reps}}</li>
      </ul>
    </div>
    <div class="workout-container" v-if="activeWorkout">
      <div class="workouts-list" v-for="workout in workouts.data" :key="workout.id">
        <div class="workouts-item" @click="chooseWorkout(workout.id)">{{workout.workout_name}}</div>
      </div>
    </div>
    <SubmitButton type="button" name="Vali tänane kava" @click="openWorkoutList"/>
    <div class="date">25.03.2020</div>
  </div>
</template>

<script>
  import SubmitButton from "../Buttons/SubmitButton";

  export default {

    name: "WorkoutDiary",
    components: {
      SubmitButton,
    },
    props: {
      workoutDate: {
        type: Date,
        default: function () {
          new Date()
        },
      },
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
          const test = await this.axios.post('/api/workouts-done', {
            workout_name: this.workout_name,
            muscle_group: this.muscle_group
          });
          console.log(test);
          this.activeWorkout = false;
        } catch (err) {
          console.log(err.response);
        }
      },
      async getWorkouts() {
        try {
          this.workouts = await this.axios.get('/api/workouts');
        } catch (err) {
          await this.$router.push({name: 'Login'});
        }
      },
      async getExercises() {
        try {
          this.exercises = await this.axios.get('/api/workouts/' + this.workoutId + '/exercises')
        } catch (err) {
          console.log(err.response);
        }
      },
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
  }

  .heading {
    padding: 5px;
    border-bottom: 1px solid #F27A54;
    text-align: center;
  }

  .exercise-data {
    width: 100%;
    padding: 15px;
  }

  .workout-container {
    position: absolute;
    background: #3C444C;
    height: 200px;
    width: 200px;
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
    position: absolute;
    bottom: 20px;
  }

  @media screen and (max-width: 767px) {
    .container {
      max-width: 310px;
    }
  }
</style>