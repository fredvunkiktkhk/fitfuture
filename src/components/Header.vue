<template>
    <v-app-bar absolute dark color="#3C444C">
            <v-tabs color="#FFF" active-class="" centered icons-and-text background-color="none">
                <v-tab href="#home">ÜLEVAADE
                    <v-icon>fa-home</v-icon>
                </v-tab>
                <v-tab href="#workouts">KAVAD
                    <v-icon>fa-folder-open</v-icon>
                </v-tab>
                <v-tab href="#exercise">HARJUTUSED
                    <v-icon>fa-dumbbell</v-icon>
                </v-tab>
                <v-tab href="#logout">LOGI VÄLJA
                    <v-icon>fa-user-cog</v-icon>
                </v-tab>
            </v-tabs>
    </v-app-bar>
</template>

<script>
    export default {

    };
</script>

<style>
.v-tabs-slider {
    background: linear-gradient(to left, #F27A54, #A154F2);
}
    .v-tab--active:active :hover :focus{
        background: transparent;
    }
</style>