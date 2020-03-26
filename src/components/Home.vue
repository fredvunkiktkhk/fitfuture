<template>
    <div class="container">
        <WorkoutDiary @onEdit="showEdit" />
        <WorkoutDiaryDetails v-if="detailsId" />
        <div class="logo1">
        </div>
    </div>
</template>

<script>
    import WorkoutDiary from "./WorkoutDiary/WorkoutDiary.vue";
    import WorkoutDiaryDetails from "./WorkoutDiary/WorkoutDiaryDetails";

    export default {
        name: "Home",
        components: {
            WorkoutDiary, WorkoutDiaryDetails,
        },
        props: {
          id: {
              type: Number,
          },
        },
        data: function () {
            return {
                detailsId: null,
            }
        },
        methods: {
          showEdit(value) {
              this.detailsId = value;
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