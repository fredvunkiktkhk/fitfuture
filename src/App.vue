<template>
    <div id="app">
        <div class="mobile-header">
            <router-link to="/login" tag="li" class="logout" exact active-class="active">
                <a><span class="icon-container"><font-awesome-icon icon="user-cog" /></span></a>
            </router-link>
        </div>
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

<style lang="scss">
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

    .mobile-header {
        display: none;
    }

    @media screen and (max-width: 767px) {
        .mobile-header {
            height: 39px;
            display: block;
            list-style: none;
            background: #F27A54;

            li {
                width: 39px;
            }

            a:visited, a {
                text-decoration: none;
                color: #FFF;
                display: block;
                padding: 10px;
                background: green;
            }
        }
    }
</style>