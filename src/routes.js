import Workouts from './components/Workouts.vue';
import Exercise from './components/Exercise.vue';
import Home from './components/Home.vue';
import LogIn from './components/LogIn.vue';
import Signup from './components/Auth/SignUp.vue';
import Logout from './components/Auth/Logout.vue';

export const routes  = [
    { path: '/', name: 'Home', component: Home},
    { path: '/workouts', name: 'Workouts', component: Workouts},
    { path: '/exercise', name: 'Exercise', component: Exercise},
    { path: '/login', name: 'LogIn', component: LogIn},
    { path: '/signup', component: Signup},
    { path: '/logout', name: 'Logout', component: Logout},
];
