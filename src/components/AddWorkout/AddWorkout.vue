<template>
  <div class="add-workout">
    <form @submit.prevent="submitWorkout">
      <div class="heading">
        <label for="name">Kava nimi</label>
        <input
          id="name"
          type="text"
          v-model="workout_name"
          autocomplete="off"
        />
        <label for="day">Lihasgrupp</label>
        <input
          id="day"
          type="text"
          v-model="muscle_group"
          autocomplete="off"
        />
      </div>
      <button class="button-close" @click="$emit('close')">
        <font-awesome-icon class="icon" icon="times-circle"/>
      </button>
      <SubmitButton name="Lisa kava"/>
    </form>
  </div>
</template>

<script>
  import SubmitButton from "../Buttons/SubmitButton";

  export default {
    name: 'AddWorkout',
    components: {
      SubmitButton,
    },
    props: {
      workoutId: {
        type: Number,
      }
    },
    data () {
      return {
        workout_name: '',
        muscle_group: '',
      }
    },
    methods: {
      async submitWorkout() {
        try {
          await this.axios.post('/api/workouts', {
            workout_name: this.workout_name,
            muscle_group: this.muscle_group
          });
          this.$emit('workoutAdded');
          this.workout_name = '';
          this.muscle_group = '';
        } catch (err) {
          console.log(err.response);
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .add-workout {
    min-width: 300px;
    height: 100%;
    padding: 10px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
    border-top: 1px solid #FFF;
    border-bottom: 1px solid #FFF;
    background: #3C444C;

    .heading {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-gap: 10px;
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

  @media screen and (min-width: 322px) {
    .add-workout {
      border: 1px solid #FFF;
    }
  }

  @media screen and (max-width: 767px) {
    .add-workout {
      max-width: 300px;
      max-height: 450px
    }
  }

  @media screen and (max-height: 568px) {
    .add-workout {
      background: #3C444C;
      top: -130px;
      box-shadow: none;
    }
  }

  @media screen and (max-height: 668px) {
    .add-workout {
      background: #3C444C;
      top: -220px;
      box-shadow: none;
    }
  }
</style>