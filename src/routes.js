import Workouts from './components/Workouts.vue';
import Exercise from './components/Exercise.vue';
import Home from './components/Home.vue';
import LogIn from './components/LogIn.vue';
import Signup from './components/Auth/SignUp.vue';

export const routes  = [
    { path: '/', component: Home},
    { path: '/workouts', name: Workouts, component: Workouts},
    { path: '/exercise', component: Exercise},
    { path: '/login', component: LogIn},
    { path: '/signup', component: Signup},
];
