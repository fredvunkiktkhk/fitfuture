<template>
    <div class="workout-details">
        <div class="workout-details-header">Kava nimi</div>
        <div>Raskus<input type="number"></div>
        <div>Kordused<input type="number"></div>
        <div>Harjutus{{ exerciseName }}</div>
        <div class="action-buttons">
            <SubmitButton name="Salvesta" />
            <SubmitButton name="Kustuta" />
        </div>
        <div class="table-position">
            <table>
                <thead>
                <tr>
                    <th>Seeriad</th>
                    <th>Kordused</th>
                    <th>Raskus</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input></td>
                    <td><input></td>
                    <td><input></td>
                    <td class="img">
                        <font-awesome-icon class="icon" icon="pencil-alt" />
                        <font-awesome-icon class="icon" icon="trash-alt" />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import SubmitButton from "../SubmitButton/SubmitButton";

    export default {
        components: {
          SubmitButton,
        },
        props: {
            heading: {
                type: String,
                default: '',
            },
            exerciseName: {
                type: String,
                default: 'Test',
            },
            sets: {
                type: Number,
                default:  0,
            },
            reps: {
                type: Number,
                default: 0,
            },
            weight: {
                type: Number,
                default: 0,
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    .workout-details {
        width: 290px;
        height: 300px;
        background: green;
        overflow: auto;
    }

    .table-position {
        display: flex;
        justify-content: center;
    }

    table {
        border-collapse: collapse;
    }

    thead {
        font-size: 12px;
    }

    td {
        border-right: 1px solid #5F6265;
        border-left: 1px solid #5F6265;
    }

    input {
        width: 50px;
        background: transparent;
        border-bottom: 1px solid #F27A54;
        border-right: 0;
        border-left: 0;
        border-top: 0;
        padding: 5px;
        margin: 0;
        color: #FFF;
        font-size: 12px;
        outline: none;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    }

    .action-buttons {
        display: flex;
        justify-content: space-evenly;

        & button {
            width: 90px;
            margin-top: 5px;
        }
    }

    .img {
        display: flex;
        font-size: 10px;


        .icon {
            padding: 0 2px;
        }
    }

    @media screen and (max-width: 767px) {
        .container {
            max-width: 310px;
        }
    }
</style>