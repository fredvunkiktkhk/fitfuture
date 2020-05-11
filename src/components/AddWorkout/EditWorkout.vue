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
    </form>
<!--    <div class="exercise-list" v-for="exercise in exercises.data" v-bind:key="exercise.id">
      <div>{{exercise.exercise_name}}</div>
      <div>{{exercise.sets}}</div>
      <div>{{exercise.reps}}</div>
    </div>-->
<!--  <EditExercise
  :workoutId="workoutId"
  />-->
  </div>
</template>

<script>
  import SubmitButton from "../Buttons/SubmitButton";
  // import AddExercise from "../AddExercise/AddExercise";
  // import EditExercise from "../AddExercise/EditExercise";

  export default {
    name: 'EditWorkout',
    components: {
      // EditExercise,
      SubmitButton,
      // AddExercise,
    },
    props: {
      workoutId: {
        type: Number,
      },
    },
    data() {
      return {
        workout_name: '',
        muscle_group: '',
        workouts: [],
        workout: {},
        exercises: [],
        exercise: {},
        exercise_name: '',
        sets: null,
        reps: null,
      }
    },
    methods: {
      async editWorkout() {
        try {
          await this.axios.put('/workouts/' + this.workoutId, {
            workout_name: this.workout_name,
            muscle_group: this.muscle_group
          });
          this.$emit('workoutEdit');
          this.workout_name = '';
          this.muscle_group = '';

        } catch (err) {
          console.log(err);
        }
      },
      async exerciseModified() {

      }
    },
    async created() {
      try {
        const workout = await this.axios.get('/workouts/' + this.workoutId)
        this.workout = workout.data
        this.workout_name = workout.data.workout_name
        this.muscle_group = workout.data.muscle_group
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
    top: -230px;
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
      max-height: 450px
    }
  }

  @media screen and (max-height: 568px) {
    .add-exercise {
      background: #2d2d2d;
      top: -80px;
      box-shadow: none;
    }
  }
</style>