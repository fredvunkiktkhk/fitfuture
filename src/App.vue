<template>
    <v-app>
        <v-content>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
            </svg>npm ins
            <Header />
        </v-content>
    </v-app>
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

    #app {

        font-family: 'Montserrat', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: white;
        background-color: #3C444C;
    }
</style>