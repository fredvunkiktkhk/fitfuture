<template>
  <div class="exercise-container">
    <div class="add-exercise">
      <div class="heading">
        <label for="name">Kava nimi</label>
        <input
          id="name"
          type="text"
          v-model="workout_name"
        />
        <label for="day">Lihasgrupp</label>
        <input
          id="day"
          type="text"
          v-model="muscle_group"
        />
      </div>
      <form id="exerciseForm" @submit="submitExercise()">
        <label class="exercise-label" for="exercise">Harjutus</label>
        <input
          class="exercise-data"
          id="exercise"
          type="text"
          v-model="exercise_name"
        />
        <label class="exercise-label" for="sets">Seeriad</label>
        <input
          class="exercise-data"
          id="sets"
          type="number"
          v-model="sets"
        />
        <label class="exercise-label" for="reps">Kordused</label>
        <input
          class="exercise-data"
          id="reps"
          type=number
          v-model="reps"
        />
      </form>
      <SubmitButton type="submit" form="exerciseForm" name="Lisa harjutus" @click="submitExercise()" />
      <button class="button-close" @click="$emit('close')">
        <font-awesome-icon class="icon" icon="times-circle"/>
      </button>
      <div class="exercise-heading">
        <div>Harjutus</div>
        <div>Seeriad</div>
        <div>Kordused</div>
      </div>
      <div class="exercise-list">
        <div v-for="exercise in exercises.data" v-bind:key="exercise.id" class="exercise-block">
          <div>{{exercise.exercise_name}}</div>
          <div class="exercise-item">{{exercise.sets}}</div>
          <div class="exercise-item">{{exercise.reps}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SubmitButton from "../Buttons/SubmitButton";

  export default {
    name: "AddExercise",
    components: {
      SubmitButton,
    },
    props: {
      exerciseId: {
        type: Number,
      }
    },
    data() {
      return {
        exercises: [],
        exercise_name: '',
        sets: null,
        reps: null,
        isOpen: false,
        workout_name: '',
        muscle_group: '',
      }
    },
    methods: {
      async submitExercise() {
        try {
          await this.axios.post('/workouts/' + this.exerciseId + '/exercise', {
            exercise_name: this.exercise_name,
            sets: this.sets,
            reps: this.reps,
          });
          await this.getExercises();
        } catch (err) {
          console.log(err);
        }
      },
      async getExercises() {
        try {
          this.exercises = await this.axios.get('/exercises/' + this.exerciseId)
          console.log(this.exercises);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async created() {
      try {
        const workout = await this.axios.get('/workouts/' + this.exerciseId)
        this.workout = workout.data
        this.workout_name = workout.data.workout_name
        this.muscle_group = workout.data.muscle_group
      } catch (err) {
        console.log(err);
      }
      await this.getExercises();
    }
  }
</script>

<style scoped lang="scss">
  .exercise-container {
    max-width: 445px;
    border: 1px solid #FFF;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 130px;
    background: #3C444C;

    form {
      display: grid;
      grid-template-columns: 1fr 6fr;
      grid-column-gap: 20px;
      padding: 0 20px 5px 0;
    }
  }

  .submit {
    margin: 5px 0;
  }

  .exercise-heading {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  .exercise-list {
    height: 147px;
    overflow: auto;

    .exercise-item {
      color: #F27A54;
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #3C444C;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #5F6265;
  }

  .exercise-block {
    margin: 5px 10px 5px 0;
    padding: 5px 0;
    border-top: 1px solid #5F6265;
    font-size: 14px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    &:first-child {
      border-top: 0;
    }
  }

  .exercise-label {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    text-align: justify;
  }

  input {
    padding: 5px 0;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-bottom: 1px solid #F27A54;
    background: transparent;
    outline: none;

    &:hover, :active {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .name {
    background: transparent;
    color: #FFF;
    text-align: center;
  }

  .exercise-data {
    background: transparent;
    color: #F27A54;
    text-align: center;
  }

  .exercise-block .div1:last-child .exercise-data {
    border: 0;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .add-exercise {
    min-width: 300px;
    height: 100%;
    padding: 10px;
    position: relative;

    .heading {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-gap: 10px;
      padding: 20px 20px 20px 0;
      margin-bottom: 5px;
      text-align: justify;
      white-space: nowrap;
      border-bottom: 1px solid #5F6265;

      input {
        background: transparent;
        border-bottom: 1px solid #F27A54;
        border-right: 0;
        border-left: 0;
        border-top: 0;
        padding: 5px;
        margin: 0;
        color: #FFF;
        font-size: 12px;
        outline: none;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
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
  }

  @media screen and (max-width: 767px) {
    .add-exercise {
      max-width: 300px;
    }
    .exercise-list {
      height: 300px;
    }
  }

  @media screen and (max-height: 568px) {
    .exercise-container {
      max-height: 100px;
    }

    .add-exercise {
      background: #3C444C;
      top: -80px;
      box-shadow: none;
    }
  }

  @media screen and (max-height: 668px) {
    .exercise-container {
      border: 0;
    }

    .add-exercise {
      max-height: 420px;
    }

    .exercise-list {
      height: 200px;
    }
  }
</style>