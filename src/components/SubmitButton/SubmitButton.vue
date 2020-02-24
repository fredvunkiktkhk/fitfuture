<template>
    <button type="submit" class="submit">{{text}}</button>
</template>

<script>
    export default {
        name: "SubmitButton",
        data: function () {
            return {
                text: 'Lisa kavasse'
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    .submit {
        height: 30px;
        width: 150px;
        margin-top: 25px;
        border-radius: 20px;
        border: 0;
        color: #FFF;
        font-weight: 600;
        cursor: pointer;
        background:  linear-gradient(to left, #F27A54, #A154F2);
    }
</style>