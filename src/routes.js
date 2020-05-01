import Workouts from './components/Workouts.vue';
import Exercise from './components/Exercise.vue';
import Home from './components/Home.vue';
import Login from './components/Auth/Login.vue';
import Signup from './components/Auth/SignUp.vue';

export const routes  = [
    { path: '/', name: 'Home', component: Home},
    { path: '/workouts', name: 'Workouts', component: Workouts},
    { path: '/exercise', name: 'Exercise', component: Exercise},
    { path: '/login', name: 'Login', component: Login},
    { path: '/signup', name: 'Signup', component: Signup},
];
