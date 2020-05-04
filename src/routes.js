import Workouts from './components/Workouts.vue';
import Exercise from './components/Exercise.vue';
import Home from './components/Home.vue';
import Login from './components/Auth/Login.vue';
import Signup from './components/Auth/SignUp.vue';

export const routes  = [
    { path: '/', name: 'Home', component: Home, meta: {
        guest: true
        }},
    { path: '/workouts', name: 'Workouts', component: Workouts, meta: {
        requiresAuth: true
        }},
    { path: '/exercise', name: 'Exercise', component: Exercise, meta: {
        requiresAuth: true
        }},
    { path: '/login', name: 'Login', component: Login, meta: {
        guest: true
        }},
    { path: '/signup', name: 'Signup', component: Signup, meta: {
        guest: true
        }},
];
