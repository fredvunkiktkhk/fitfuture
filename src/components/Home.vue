<template>
    <div class="container">
        <WorkoutDiary v-show="showEdit === true" @onEdit="showEdit" />
        <WorkoutDiaryDetails />
        <div class="logo1">

        </div>
    </div>
</template>

<script>
    import WorkoutDiary from "./WorkoutDiary/WorkoutDiary.vue";
    import WorkoutDiaryDetails from "./WorkoutDiary/WorkoutDiaryDetails";

    export default {
        name: "Home",
        props: {
          id: {
              type: Number,
          }
        },
        components: {
            WorkoutDiary, WorkoutDiaryDetails,
        },
        methods: {
          showEdit(value) {
              console.log(value);
          }
        },
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;
        justify-content: center;
    }
</style>