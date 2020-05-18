<template>
  <div class="container">
    <WorkoutDiary @onEdit="showEdit"/>
    <WorkoutDiaryDetails
      v-if="exerciseId || exerciseId === 0"
      @childClose="closeDetails"
      :workoutId="workoutId"
      :exerciseId="exerciseId"
    />
  </div>
</template>

<script>
  import WorkoutDiary from "./WorkoutDiary/WorkoutDiary.vue";
  import WorkoutDiaryDetails from "./WorkoutDiary/WorkoutDiaryDetails";

  export default {
    name: "Home",
    components: {
      WorkoutDiary,
      WorkoutDiaryDetails,
    },
    data() {
      return {
        exerciseId: null,
        workoutId: null,
        isOpen: false,
      }
    },
    methods: {
      showEdit(exerciseId, workoutId) {
        console.log(exerciseId);
        console.log(workoutId);
        this.workoutId = workoutId;
        this.exerciseId = exerciseId;
      },
      closeDetails() {
        this.exerciseId = null;
      },
    },
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    overflow-y: auto;
  }

  .workout-details {
    position: fixed;
  }
</style>