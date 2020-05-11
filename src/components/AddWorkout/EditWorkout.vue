<template>
  <div class="edit-exercise">
    <form @submit.prevent="editWorkout()">
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
        <div v-for="exercise in exercises.data" v-bind:key="exercise.id" class="exercise-block">
          {{exercise}}
          <input
            class="exercise-data"
            id="exercise"
            type="text"
            :value="exercise.exercise_name"
          />
          <input
            class="exercise-data"
            id="sets"
            type="number"
            :value="exercise.sets"
          />
          <input
            class="exercise-data"
            id="reps"
            type=number
            :value="exercise.reps"
          />
          <!--          <div>{{exercise.exercise_name}}</div>
                    <div class="exercise-item">{{exercise.sets}}</div>
                    <div class="exercise-item">{{exercise.reps}}</div>-->
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
      exerciseId: {
        type: Number,
      }
    },
    data() {
      return {
        workout_name: '',
        muscle_group: '',
        workouts: [],
        workout: {},
        exercises: [],
        exerciseList: {},
        exercise_name: '',
        sets: null,
        reps: null,
        // exerciseId: null,
      }
    },
    methods: {
      async editWorkout() {
        try {
          await this.axios.put('/workouts/' + this.workoutId, {
            workout_name: this.workout_name,
            muscle_group: this.muscle_group
          });
          await this.exerciseModified();
          this.$emit('workoutEdit');
          this.workout_name = '';
          this.muscle_group = '';

        } catch (err) {
          console.log(err);
        }
      },
      async getExercises() {
        try {
          this.exercises = await this.axios.get('/exercises/' + this.workoutId)
          console.log(this.exercises);
        } catch (err) {
          console.log(err);
        }
      },
      async exerciseModified() {
        try {
          await this.axios.put('/workouts/' + this.workoutId + '/exercise/' + this.exerciseId, {
            exercise_name: this.exercise_name,
            sets: this.sets,
            reps: this.reps,
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    async created() {
      try {
        const workout = await this.axios.get('/workouts/' + this.workoutId)
        this.workout = workout.data
        this.workout_name = workout.data.workout_name
        this.muscle_group = workout.data.muscle_group

        const exerciseList = await this.axios.get('/workouts/' + this.workoutId + '/exercise/' + this.exerciseId);
        this.exerciseList = exerciseList.data
        this.exercise_name = exerciseList.data.exercise_name
        this.sets = exerciseList.data.sets
        this.reps = exerciseList.data.reps
        console.log(exerciseList.data);
      } catch (err) {
        console.log(err);
      }
    },
  }
</script>

<style scoped lang="scss">
  .edit-exercise {
    min-width: 300px;
    height: 100%;
    padding: 10px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: -200px;
    border: 1px solid #FFF;
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

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }

    .exercise-data {
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

  .exercise-heading {
    display: flex;
    justify-content: space-around;
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

  @media screen and (max-width: 767px) {
    .edit-exercise {
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

    .edit-exercise {
      background: #3C444C;
      box-shadow: none;
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