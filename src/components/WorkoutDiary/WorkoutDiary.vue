<template>
    <div class="container">
        <div class="heading">Kava nimi</div>
        <div class="heading">Päeva nimi</div>
        <div class="data">
            <ul v-for="item in data" v-bind:key="item.name">
                <li class="name">{{item.name}}</li>
                <li class="sets">{{item.sets}}</li>x<li class="reps">{{item.reps}}</li>
                <li class="border"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WorkoutDiary",
        props: {
            heading: String,
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
        }
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        top: 50%;
        width: 350px;
        min-height: 350px;
        box-shadow: 0 10px 10px #000;
        padding: 20px;
    }

    .heading {
        padding: 5px;

    }

    ul {
        padding: 0;
        margin: 0;

        a {
            display: flex;
            text-align: end;
        }
    }

    .border {
        border-bottom: 1px solid #5F6265;
    }

    li {
        list-style: none;
        color: #FFF;
    }

    .data {
        width: 100%;
        height: 100%;
    }

    .name {
        display: flex;
        align-items: flex-start;
    }

    .sets {
        color: #F27A54;
    }

    .reps {
        color: #F27A54;
    }
</style>