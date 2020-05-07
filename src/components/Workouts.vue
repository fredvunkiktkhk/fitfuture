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
        <div class="workouts-item">{{workout.workout_name}}</div>
        <div class="edit-buttons">
          <button @click="workoutId = workout.id" class="icon-button">
            <font-awesome-icon class="icon" icon="pencil-alt"/>
          </button>
          <button class="icon-button">
            <font-awesome-icon class="icon" icon="trash-alt"/>
          </button>
        </div>
      </div>
      <AddWorkout
        v-if="isActive"
        @childClick="isActive = false"
        @workoutAdded="getWorkouts()"
      />
    <EditWorkout
      v-if="workoutId"
      @closeModal="isActive = false"
      :workoutId="workoutId"
      @workoutEdit="getWorkouts()"
    />
      {{workoutId}}
    </div>
  </div>
</template>

<script>
  import AddWorkout from './AddWorkout/AddWorkout';
  import EditWorkout from "./AddWorkout/EditWorkout";

  export default {
    name: "Workouts",
    components: {
      EditWorkout,
      AddWorkout,
    },
    data() {
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
      /*     async editWorkout(workoutId) {
             try {
               this.workouts = await this.axios.get('/workouts');
               await this.axios.put('/workouts/'+workoutId, {
                 workout_name: this.workout_name,
                 muscle_group: this.muscle_group
               });
               this.isActive =true
               console.log(workoutId);
             } catch (err) {
               console.log(err);
             }
           },*/
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
      border: 1px solid black;
      min-width: 100px;
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
</style>