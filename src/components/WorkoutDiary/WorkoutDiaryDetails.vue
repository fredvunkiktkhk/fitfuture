<template>
  <div class="workout-details">
    <div class="header" v-for="exercise in exercises" :key="exercise.id">{{ exercise.exercise_name }}</div>
    <form id="details">
      <div class="numbers">Raskus<input v-model="exercises.weight" type="number"/></div>
      <div class="numbers">Kordused<input v-model="exercises.reps" type="number"/></div>
      <div class="action-buttons">
        <SubmitButton name="Salvesta" form="details" @click="addExerciseDone()"/>
        <SubmitButton name="Kustuta"/>
      </div>
    </form>
    <button class="button-close" @click="$emit('childClose')">
      <font-awesome-icon class="icon" icon="times-circle"/>
    </button>
    <div class="table-position">
      <table>
        <thead>
        <tr>
          <th>Seeria</th>
          <th>Kordused</th>
          <th>Raskus</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="exercise in doneExercises" :key="exercise.id">
          <td>{{exercise.sets}}</td>
          <td>{{exercise.reps}}</td>
          <td>{{exercise.weight}}</td>
          <td class="img">
            <button>
              <font-awesome-icon class="icon" icon="pencil-alt"/>
            </button>
            <button>
              <font-awesome-icon class="icon" icon="trash-alt"/>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import SubmitButton from "../Buttons/SubmitButton";

  export default {
    components: {
      SubmitButton,
    },
    props: {
      workoutId: {
        type: Number,
      },
      exerciseId: {
        type: Number,
      },

    },
    data() {
      return {
        exercises: [],
        doneExercises: [],
        counter: 0,
        // exercise_name: '',
        // sets: 0,
        // reps: 0,
        // weight: 0,

      }
    },
    methods: {
      async getExercise() {
        try {
          await this.axios.get('/api/workouts/' + this.workoutId + '/exercises/' + this.exerciseId);
        } catch (err) {
          console.log(err.response);
        }
      },
      async addExerciseDone() {
        console.log(this.exercises)
        try {
          await this.axios.post('/api/workouts-done/' + this.workoutId + '/exercises/', {
          });
          await this.getExercisesDone();
        } catch (err) {
          console.log(err.response);
        }
      },
      async addWorkoutDone() {

      },
/*      async insertExercises() {
        const exercises = this.exercises;
        try {
          await this.axios.post('/workout-done/' + this.workoutId + '/exercises/' + this.exerciseId, {
            exercise_name: exercises.exercise_name,
            sets: exercises.sets,
            reps: exercises.reps,
            weight: exercises.weight
          });
          console.log(this.exercises);
          console.log(exercises.exercise_name);
          console.log(exercises.weight);
        } catch (err) {
          console.log(err.response);
        }
      },*/
      async getExercises() {
        try {
          const exercises = await this.axios.get('/api/workouts/' + this.workoutId + '/exercises')
          this.exercises = exercises.data
        } catch (err) {
          console.log(err.response);
        }
      },
      async getExercisesDone() {
        try {
          await this.axios.get('/api/workouts-done/' + this.workoutId + '/exercises')
        } catch (err) {
          console.log(err.response);
        }
      },
    },
    async created() {
      await this.getExercise();
      await this.getExercises()
    }
  }
</script>

<style scoped lang="scss">
  .workout-details {
    width: 290px;
    height: 300px;
    margin-top: 40px;
    background: #3C444C;
    overflow: auto;
    text-align: center;
    border: 1px solid #EEE;
    box-shadow: 0 2px 3px #CCC;
  }

  .header {
    margin-top: 5px;
    padding: 0 25px;
    overflow-wrap: break-word;
  }

  .button-close {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    color: #FFF;
    background: none;
    font-size: 18px;
    padding: 6px;
    cursor: pointer;
    outline-color: #F27A54;

    .icon:hover {
      color: #F27A54;
      transition: color ease-in-out 300ms;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  .numbers {
    display: flex;
    justify-content: space-between;
    padding: 2px 25px;

    .exercise-name {
      padding-left: 10px;
    }

    input {
      width: 60px;
      margin-left: 25px;
      background: transparent;
      border-bottom: 1px solid #F27A54;
      border-right: 0;
      border-left: 0;
      border-top: 0;
      outline: none;
      color: #FFF;
      text-align: center;
    }
  }

  .table-position {
    display: flex;
    justify-content: center;
    margin: 5px 0 0 20px;
  }

  table {
    border-collapse: collapse;

    input {
      width: 50px;
      background: transparent;
      border-bottom: 0;
      border-right: 0;
      border-left: 0;
      border-top: 0;
      padding: 5px;
      margin: 0;
      color: #F27A54;
      font-size: 12px;
      outline: none;
      text-align: center;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &::after {
        content: '';
        border-bottom: 1px solid #F27A54;
        width: 50%;
        height: 1px;
        position: absolute;
      }
    }

    th {
      padding: 0 5px;
    }
  }

  thead {
    font-size: 12px;
  }

  td:first-child, td:nth-child(2), td:nth-child(3) {
    border-right: 1px solid #5F6265;
  }

  td:first-child {
    border-left: 1px solid #5F6265;
  }

  .action-buttons {
    display: flex;
    justify-content: space-evenly;

    & button {
      width: 90px;
      margin-top: 5px;
    }
  }

  .img {
    display: flex;
    font-size: 10px;

    button {
      background: transparent;
      border: 0;
      color: #FFF;
      cursor: pointer;
      padding: 8px 5px;

      &:first-child:hover {
        transition: color 300ms;
        color: #00a917;
      }

      &:last-child:hover {
        transition: color 300ms;
        color: #FF000D;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .container {
      max-width: 310px;
    }
  }
</style>