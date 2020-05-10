<template>
  <div class="exercise-container">
    <button type="submit">Add exercise</button>
    <form @submit.prevent="submitExercise()">
      <div v-for="exercise in exercises" v-bind:key="exercise.id" class="exercise-block"></div>
      <label class="exercise-label" for="exercise">Harjutus</label>
      <input
        class="exercise-data"
        id="exercise"
        type="text"
        v-model="exerciseName"
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
  </div>
</template>

<script>
  export default {
    name: "AddExercise",
    props: {
      workoutId: {
        type: Number,
      }
    },
    data() {
      return {
        exercises: [],
        exerciseName: '',
        sets: null,
        reps: null,
      }
    },
    methods: {
      async submitExercise() {
        try {
          await this.axios.post('/workouts/'+this.workoutId+'/exercise', {
            exerciseName: this.exerciseName,
            sets: this.sets,
            reps: this.reps,
          });
          console.log(this.exerciseName);
          console.log(this.sets);
          console.log(this.reps);
          this.$emit('exerciseAdded');
        } catch (err) {
          console.log(err);
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .exercise-container {
    max-width: 445px;
    max-height: 385px;
    overflow: auto;
    border: 1px solid #FFF;

    form {
      display: grid;
      grid-template-columns: 1fr 6fr;
      grid-column-gap: 20px;
      padding: 0 20px 5px 0;
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

    &:hover {
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

  @media screen and (max-width: 767px) {
    .container {
      max-width: 300px;
      max-height: 290px;
    }
  }
</style>