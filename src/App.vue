<template>
    <div id="app">
        <Header />
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from './components/Header';

    export default {
        name: 'App',

        components: {
            Header,
        },

        data: () => ({
            //
        }),
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

    body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;

    }

    #app {
        display: flex;
        flex-direction: column;
        height: 100vh;
        font-family: 'Montserrat', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: white;
        background-color: #3C444C;
    }
</style>