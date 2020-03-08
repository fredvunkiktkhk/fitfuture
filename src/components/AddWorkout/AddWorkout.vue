<template>
    <div class="add-exercise">
        <form>
            <div class="heading">
                <label for="name">Minu kava</label>
                <input
                   id="name"
                   type="text"
                   v-model="workoutName"
                />
                <label for="day">Jalapäev</label>
                <input
                    id="day"
                    type="text"
                    v-model="workoutDay"
                />
            </div>
            <button class="button-close" @click="$emit('childClick')"><font-awesome-icon class="icon" icon="times-circle" /></button>
            <WorkoutTable />
            <SubmitButton />
        </form>
    </div>
</template>

<script>
    import WorkoutTable from "./WorkoutTable";
    import SubmitButton from "../SubmitButton/SubmitButton";

    export default {
        name: 'AddWorkout',
        components: {
            WorkoutTable,
            SubmitButton,
        },
        props: {
            label: String,
            nameOfWorkout: String,
            nameOfWorkoutDay: String,
        },
        data: function () {
            return {
                workoutName: '',
                workoutDay: '',
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    .add-exercise {
        min-width: 300px;
        min-height: 350px;
        box-shadow: 0 5px 10px #000;
        padding: 10px;
        position: relative;
        transition: transform ease-in 400ms;
        transform: translateY(0);

        .expand {
            transform: translateY(-555px);
            transition: transform ease-in 400ms;
        }

        .heading {
            display: grid;
            grid-template-columns: 1fr 3fr;
            grid-gap: 10px;
            width: 70%;
            padding: 20px;
            text-align: justify;
            white-space: nowrap;

            input {
                width: 50%;
                background: transparent;
                border-bottom: 1px solid #F27A54;
                border-right: 0;
                border-left: 0;
                border-top: 0;
                padding: 5px;
                margin: 0;
                color: #FFF;
                font-size: 12px;
                outline-color: #F27A54;
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
    @media screen and (max-width: 767px) {
        .add-exercise {
            max-width: 300px;
        }
    }
</style>