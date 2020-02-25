<template>
    <table>
        <thead>
            <tr>
                <th>Harjutus</th>
                <th class="number-heading">Seeriad</th>
                <th class="number-heading">Kordused</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" v-bind:key="item.name">
                <td><input class="name" :value="item.name"></td>
                <td><input class="numbers" :value="item.sets"></td>
                <td><input class="numbers" :value="item.reps"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "WorkoutTable",
        props: {
          name: String,
          sets: Number,
          reps: Number,
        },
        data: function () {
            return {
                data: [
                    {name: 'Kükk', sets: '5', reps: '8'},
                    {name: 'Kükke', sets: '5', reps: '8'},
                    {name: 'Kükka', sets: '5', reps: '8'},
                    {name: 'Kükki', sets: '5', reps: '8'},
                ],
            }
        },
    }
</script>

<style scoped lang="scss">
    table {
        width: 445px;
    }

   thead {
       text-align: justify;

       th:first-child {
           padding-left: 5px;
       }

       .number-heading {
           text-align: center;
       }
   }

    input {
        padding: 5px;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
        }
    }

    .name {
        background: transparent;
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid #5F6265;
        color: #FFF;
    }

    .numbers {
        width: 50%;
        background: transparent;
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid #5F6265;
        color: #F27A54;
        text-align: center;
    }
</style>