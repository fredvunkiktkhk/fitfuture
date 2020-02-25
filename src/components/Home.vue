<template>
    <div>
        <WorkoutDiary />
    </div>
</template>

<script>
    import WorkoutDiary from "./WorkoutDiary/WorkoutDiary.vue";

    export default {
        name: "Home",
        components: {
            WorkoutDiary,
        }
    }
</script>

<style scoped lang="scss">
    div {
        display: flex;
        justify-content: center;
    }
</style>