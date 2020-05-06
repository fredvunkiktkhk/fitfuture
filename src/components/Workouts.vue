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
      <div class="workouts-list" v-for="workout in workouts.data" v-bind:key="workout.id">
        <div class="workouts-item" @click="editWorkout(workout.id)">{{workout.workout_name}}</div>
      </div>
      <AddWorkout
        v-if="isActive"
        @childClick="isActive = false"
        @workoutAdded="getWorkouts()"
        ref="addWorkout"
      />
    </div>
  </div>
</template>

<script>
  import AddWorkout from './AddWorkout/AddWorkout';

  export default {
    name: "Workouts",
    components: {
      AddWorkout,
    },
    props: {
      id: {
        type: Number,
      }
    },
    data () {
      return {
        workouts: [],
        isActive: false,
        workoutId: null,
      }
    },
    methods: {
      async getWorkouts() {
        try {
          this.workouts = await this.axios.get('/workouts');
        } catch (err) {
          await this.$router.push({name: 'Login'});
        }
      },
/*      editWorkout(value) {
        this.workoutId = value;
        console.log(value)
        // let element = this.$refs.addWorkout
        this.isActive = true;
      },*/
      async editWorkout(value) {
        try {
          this.workoutId = value
          await this.axios.put('/workouts/workoutId', {
            workout_name: this.workout_name,
            muscle_group: this.muscle_group
          });
          console.log(this.workout_name)
        } catch (err) {
          console.log(err);
        }
      },
    },
    created() {
      this.getWorkouts();
    }
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

    &-item {
      padding: 5px;
      cursor: pointer;
    }

    &-button {
      cursor: pointer;
      background: transparent;
      border: 0;
      color: #FFF;
      padding: 10px;
      font-size: 20px;
      outline: 0;

      .icon:hover {
        color: #F27A54;
        transition: 300ms;
      }
    }
  }
</style>