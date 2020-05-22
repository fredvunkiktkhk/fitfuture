<template>
  <div class="edit-exercise" v-if="workout">
    <form @submit.prevent="editWorkout()">
      <div class="heading">
        <label for="name">Kava nimi</label>
        <input
          id="name"
          type="text"
          v-model="workout.workout_name"
        />
        <label for="day">Lihasgrupp</label>
        <input
          id="day"
          type="text"
          v-model="workout.muscle_group"
        />
      </div>
      <button type="button" class="button-close" @click="$emit('close')">
        <font-awesome-icon class="icon" icon="times-circle"/>
      </button>
      <SubmitButton name="Salvesta muudatus"/>
      <div class="exercise-heading">
        <div>Harjutus</div>
        <div>Seeriad</div>
        <div>Kordused</div>
      </div>
      <div class="exercise-list">
        <div v-for="exercise in exercises" :key="exercise.id" class="exercise-block">
          <div class="textarea">
          <textarea
            class="exercise-text"
            id="exercise"
            name="exercise"
            rows="4"
            v-model="exercise.exercise_name"
          />
          </div>
          <div class="control">
            <input
              class="exercise-data"
              id="sets"
              name="sets"
              v-model="exercise.sets"
            />
          </div>
          <div class="control">
            <input
              class="exercise-data"
              id="reps"
              name="sets"
              v-model="exercise.reps"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import SubmitButton from "../Buttons/SubmitButton";

  export default {
    name: 'EditWorkout',
    components: {
      SubmitButton,
    },
    props: {
      workoutId: {
        type: Number,
      },
    },
    data() {
      return {
        exercises: [],
        workout: null,
      }
    },
    methods: {
      async editWorkout() {
        try {
          await this.axios.put('/api/workouts/' + this.workoutId, {
            workout_name: this.workout.workout_name,
            muscle_group: this.workout.muscle_group
          });
          await this.exerciseModified();
          this.$emit('workoutEdit');
        } catch (err) {
          console.log(err.response);
        }
      },
      async exerciseModified() {
        const exercises = this.exercises;
        try {
          await this.axios.put('/api/workouts/' + this.workoutId + '/exercises/', exercises);
        } catch (err) {
          console.log(err.response);
        }
      },
    },
    async created() {
      try {
        const workout = await this.axios.get('/api/workouts/' + this.workoutId)
        this.workout = workout.data
        this.workout_name = this.workout.workout_name
        this.muscle_group = this.workout.muscle_group

        const exercises = await this.axios.get('/api/workouts/' + this.workoutId + '/exercises');
        this.exercises = exercises.data
      } catch (err) {
        console.log(err.response);
      }
    },
  }
</script>

<style scoped lang="scss">
  .edit-exercise {
    min-width: 300px;
    height: 500px;
    width: 350px;
    padding: 10px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: -161px;
    border-top: 1px solid #FFF;
    border-bottom: 1px solid #FFF;
    background: #3C444C;

    .heading {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-gap: 10px;
      width: 70%;
      padding: 20px 20px 20px 0;
      text-align: justify;
      white-space: nowrap;

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

        &:hover, :active {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }

    .exercise-data {
      padding: 5px 0;
      border: 0;
      background: transparent;
      outline: none;
    }

    .submit {
      margin: 5px 0;
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

  .exercise-block {
    margin: 5px 10px 5px 0;
    padding: 5px 0;
    border-top: 1px solid #5F6265;
    font-size: 14px;
    display: flex;

    & textarea, .exercise-data {
      border: 0;
      color: #F27A54;
      text-align: center;
      resize: none;
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      overflow: hidden;
      flex: 1;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      background: transparent;
      outline: 0;
    }

    & .control {
      display: flex;
      flex: 1;
      align-items: baseline;
    }

    &:first-child {
      border-top: 0;
    }
  }

  .exercise-heading {
    display: flex;
    padding: 0 10px;

    & div:first-child {
      display: flex;
      flex: 2;
      padding-left: 33px;
    }

    & div:nth-child(2), div:last-child {
      display: flex;
      flex: 1;
      justify-content: space-between;
      padding-right: 3px;
    }
  }

  .exercise-list {
    height: 340px;
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

  @media screen and (max-width: 767px) {
    .edit-exercise {
      max-width: 300px;
    }
    .exercise-list {
      height: 300px;
    }
  }

  @media screen and (min-width: 322px) {
    .edit-exercise {
      border: 1px solid #FFF;
    }
  }

  @media screen and (max-height: 721px) {
    .exercise-container {
      max-height: 100px;
    }

    .edit-exercise {
      background: #3C444C;
      box-shadow: none;
      top: -183px;
    }
  }

  @media screen and (max-height: 668px) {
    .exercise-container {
      border: 0;
    }

    .edit-exercise {
      max-height: 420px;
    }

    .exercise-list {
      height: 200px;
    }
  }
</style>