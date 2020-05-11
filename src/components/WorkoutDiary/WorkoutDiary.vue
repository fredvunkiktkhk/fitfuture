<template>
  <div class="container">
    <div v-for="workout in workouts" v-bind:key="workout.id">
      <div class="heading">{{workout.workout_name}}</div>
      <div class="heading">{{workout.muscle_group}}</div>
    </div>
    <div class="data">
      <ul v-for="item in data" v-bind:key="item.id" @click="onEdit(item.id)">
        <li class="name">{{item.name}}</li>
        <li class="numbers">{{item.sets}}<p>x</p>{{item.reps}}</li>
      </ul>
    </div>
    <div class="date">25.03.2020</div>
  </div>
</template>

<script>

  export default {
    name: "WorkoutDiary",
    components: {

    },
    props: {
      id: {
        type: Number,
      },
      workoutDate: {
        type: Date,
        default: function () {
          new Date()
        },
      },
    },
    data() {
      return {
        data: [{id: 0, name: 'Kükk', sets: '5', reps: '8'},],
        isActive: false,
        workouts: [],
        workoutId: 50,
        exercises: [],
      }
    },
    methods: {
      onEdit(id) {
        this.$emit('onEdit', id)
      },
      // Peaks tulema kontroll, kas on tänane kuupäev siis näita seda kava.
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
  .container {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    width: 350px;
    min-height: 350px;
    border: 1px solid #EEE;
    box-shadow: 0 2px 3px #CCC;
    padding: 20px;
    margin-top: 50px;
  }

  .heading {
    padding: 5px;
    border-bottom: 1px solid #F27A54;
  }

  .data {
    width: 100%;
    height: 100%;
    padding: 15px;
  }

  ul {
    display: flex;
    padding: 10px 0;
    margin: 0;
    border-bottom: 1px solid #5F6265;
    cursor: pointer;

    &:hover {
      background: #5F6265;
    }
  }

  li {
    list-style: none;
    color: #FFF;
    display: flex;
  }

  .name {
    display: flex;
    align-items: flex-start;
  }

  .numbers {
    color: #F27A54;
    margin-left: auto;

    p {
      margin: 0;
      color: #FFF;
    }
  }

  @media screen and (max-width: 767px) {
    .container {
      max-width: 310px;
    }
  }
</style>