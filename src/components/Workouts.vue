<template>
  <div class="content">
    <div class="workouts">
      <h3>Kavad</h3>
      <button
        @click="isActive = !isActive"
        :class="{'active': isActive}"
        class="workouts-button"
      >
        <font-awesome-icon class="icon" icon="plus-circle"/>
      </button>
      <SuccessMessage name="Kava muudetud" v-if="savingSuccessful"/>
      <div class="workouts-list" v-for="workout in workouts.data" :key="workout.id">
        <div class="workouts-item" @click="setView(workout.id, 'addExercise')">{{workout.workout_name}}</div>
        <div class="edit-buttons">
          <button @click="setView(workout.id, 'editExercise')"
                  class="icon-button">
            <font-awesome-icon class="icon" icon="pencil-alt"/>
          </button>
          <button @click="deleteWorkout(workout.id)" class="icon-button">
            <font-awesome-icon class="icon" icon="trash-alt"/>
          </button>
        </div>
      </div>
      <AddWorkout
        v-if="isActive"
        @close="isActive = false"
        @workoutAdded="getWorkouts"
      />
      <EditWorkout
        v-if="workoutId && mode === 'editExercise'"
        @close="closeEdit"
        @workoutEdit="workoutModified"
        :workoutId="workoutId"
      />
      <AddExercise
        v-if="workoutId && mode === 'addExercise'"
        :exerciseId="exerciseId"
        :workoutId="workoutId"
        @close="workoutId = null"
      />
    </div>
  </div>
</template>

<script>
  import AddWorkout from './AddWorkout/AddWorkout';
  import EditWorkout from "./AddWorkout/EditWorkout";
  import SuccessMessage from "./Buttons/SuccessMessage";
  import AddExercise from "./AddExercise/AddExercise";

  export default {
    name: "Workouts",
    components: {
      AddExercise,
      EditWorkout,
      AddWorkout,
      SuccessMessage,
    },
    data() {
      return {
        workouts: [],
        isActive: false,
        workoutId: null,
        closeModal: null,
        savingSuccessful: false,
        exerciseId: null,
        mode: '',
      }
    },
    methods: {
      async getWorkouts() {
        try {
          this.workouts = await this.axios.get('/api/workouts');
        } catch (err) {
          await this.$router.push({name: 'Signup'});
        }
      },
      async workoutModified() {
        try {
          this.workouts = await this.axios.get('/api/workouts');
          this.workoutId = null;

          this.showSuccessMessage();
        } catch (err) {
          await this.$router.push({name: 'Signup'});
        }
      },
      setView(workoutId, mode) {
        this.mode = mode;
        this.workoutId = workoutId;
      },
      async deleteWorkout(workoutId) {
        try {
          //TODO korralik confirm message
          if (confirm('Oled kindel, et soovid kava kustutada?'))
            await this.axios.delete('/api/workouts/' +workoutId);
            await this.getWorkouts();
        } catch (err) {
          await this.$router.push({name: 'Signup'});
        }
      },
      closeEdit() {
        this.workoutId = null;
      },
      showSuccessMessage() {
        this.savingSuccessful = true;

        setTimeout(() => {
          this.savingSuccessful = false;
        }, 1000);
      },
    },
    created() {
      this.getWorkouts();
    },
  }
</script>

<style scoped lang="scss">
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .workouts {
    text-align: center;

    h3 {
      margin-bottom: 0;
    }

    &-list {
      display: flex;
      justify-content: center;
    }

    &-item {
      padding: 5px;
      cursor: pointer;
      border-bottom: 1px solid #5F6265;
      min-width: 100px;
    }

    &-button {
      cursor: pointer;
      background: transparent;
      border: 0;
      color: #FFF;
      padding: 10px;
      margin-bottom: 5px;
      font-size: 20px;
      outline: 0;

      .icon:hover {
        color: #F27A54;
        transition: 300ms;
      }
    }
  }

  .edit-buttons {

    .icon-button {
      background: transparent;
      border: 0;
      color: #FFF;
      cursor: pointer;
      padding: 8px 5px;

      &:first-child:hover {
        transition: color 300ms;
        color: #00A917;
      }

      &:last-child:hover {
        transition: color 300ms;
        color: #FF000D;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>