import Workouts from './components/Workouts.vue';
import Exercise from './components/Exercise.vue';
import Home from './components/Home.vue';
import LogIn from './components/LogIn.vue';

export const routes  = [
    { path: '', component: Home},
    { path: '/workouts', component: Workouts},
    { path: '/exercise', component: Exercise},
    { path: '/login', component: LogIn},
];
