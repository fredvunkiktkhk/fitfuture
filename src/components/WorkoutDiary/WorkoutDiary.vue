<template>
    <div class="container">
        <div class="heading">Kava nimi</div>
        <div class="heading">Päeva nimi</div>
        <div class="data">
            <ul v-for="item in data" v-bind:key="item.name">
                <li class="name">{{item.name}}</li>
                <li class="numbers">{{item.sets}}<p>x</p>{{item.reps}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WorkoutDiary",
        props: {
            heading: {
                type: String,
                default: '',
            },
            name: {
                type: String,
                default: '',
            },
            sets: {
                type: Number,
                default:  0,
            },
            reps: {
                type: Number,
                default: 0,
            },
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
        width: 350px;
        min-height: 350px;
        box-shadow: 0 10px 10px #000;
        padding: 20px;
    }

    .heading {
        padding: 5px;
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
            max-width: 300px;
        }
    }
</style>