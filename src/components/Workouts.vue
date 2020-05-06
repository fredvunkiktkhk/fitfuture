<template>
    <div class="content">
        <div class="workouts">
            <h3>Kavad</h3>
            <button
                @click="isActive = !isActive"
                :class="{'active': isActive}"
                class="workouts-button"
            >
            <font-awesome-icon class="icon" icon="plus-circle" />
            </button>
            <div class="workouts-list" v-for="workout in workouts.data" v-bind:key="workout.id">
                <div>{{workout.workout_name}}</div>
            </div>
            <AddWorkout
                v-if="isActive"
                @childClick="isActive = false"
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
        data: function () {
            return {
                workouts: [],
                isActive: false,
            }
        },
        methods: {
            async getWorkouts()  {
                try {
                    this.workouts = await this.axios.get('/workouts');
                } catch (err) {
                    await this.$router.push({name: 'Login'});
                }
            }
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