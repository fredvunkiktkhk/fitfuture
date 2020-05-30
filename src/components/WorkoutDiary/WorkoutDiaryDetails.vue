<template>
  <div class="workout-details" v-if="exercise">
    <div class="header">{{ exercise.exercise_name }}</div>
    <form id="details" @submit.prevent="addExercise()">
      <div class="numbers">Raskus<input v-model="weight" min="0" max="9999" type="number"/></div>
      <div class="numbers">Kordused<input v-model="reps" min="0" max="999" type="number"/></div>
      <div class="action-buttons">
        <SubmitButton name="Salvesta" form="details" type="submit"/>
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
        <tr
          v-for="(doneExercise, index) in this.doneExercises[this.exerciseId]"
          :key="doneExercise.id"
          :class="{'active': exerciseId === index}"
          @click="exerciseId === index"

        >
          <td>{{doneExercise.sets}}</td>
          <td>{{doneExercise.reps}}</td>
          <td>{{doneExercise.weight}}kg</td>
          <td class="img">
            <button>
              <font-awesome-icon class="icon" icon="pencil-alt"/>
            </button>
            <button @click="removeExercise(index)">
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
        doneExercises: {},
        counter: 0,
        exercise: null,
        sets: null,
        reps: null,
        weight: null,
      }
    },
    created() {
      if (localStorage.getItem('exercises')) {
        try {
          this.exercises = JSON.parse(localStorage.getItem('exercises'));
          const exercises = this.exercises
          this.exercise_name = this.exercises.exercise_name

          this.exercise = exercises.find(exercise => exercise.id === this.exerciseId)


        } catch (err) {
          // localStorage.removeFromLs('exercises');
          console.log(err);
        }
      }

      if (localStorage.getItem('doneExercises')) {
        try {
          this.doneExercises = JSON.parse(localStorage.getItem('doneExercises'));
        } catch (err) {
          console.log(err)
        }
      }
    },
    methods: {
      addExercise() {
        this.sets = this.counter += 1;

        if (!this.doneExercises[this.exerciseId]) {
          this.doneExercises[this.exerciseId] = []
        }

        this.doneExercises[this.exerciseId].push({sets: this.sets, reps: this.reps, weight: this.weight})
        this.saveExercises();
      },
      saveExercises() {
        const parsed = JSON.stringify(this.doneExercises);
        localStorage.setItem('doneExercises', parsed)
      },
      removeExercise(index) {
        // after removal loop through the array and update set w/ index value + 1

        let exercise = this.doneExercises[this.exerciseId];

        // Remove set.
        exercise.splice(index, 1);

      // reset array indexes
        exercise = exercise.filter(function () {
          return true;
        })

        //reset sets values.
        exercise.map(function (set, index) {
          set.sets = index + 1
          return set;
        })

        // replace with updated value.
        this.doneExercises.splice(this.exerciseId, 1, exercise);

        if (confirm('Oled kindel, et soovid harjutuse kustutada?'))
          localStorage.removeItem(this.doneExercises[this.exerciseId].splice(index, 1));
        this.saveExercises();
      },
    },
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
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 50%;
    transform: translateX(50%);
    z-index: 100;
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

  .active {
    background: #F27A5487;
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