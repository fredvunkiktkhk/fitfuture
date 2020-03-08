<template>
    <div class="container">
        <WorkoutDiary />
        <div class="logo1">

        </div>
    </div>
</template>

<script>
    import WorkoutDiary from "./WorkoutDiary/WorkoutDiary.vue";

    export default {
        name: "Home",
        components: {
            WorkoutDiary,
        },
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;
        justify-content: center;
    }
</style>