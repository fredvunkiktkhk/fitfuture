import Workouts from './components/Workouts.vue';
import Home from './components/Home.vue';
import Login from './components/Auth/Login.vue';
import Signup from './components/Auth/SignUp.vue';
import WorkoutHistory from "./components/WorkoutHistory.vue";

export const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/workouts', name: 'Workouts', component: Workouts},
  {path: '/login', name: 'Login', component: Login},
  {path: '/signup', name: 'Signup', component: Signup},
  {path: '/workout_history', name: 'WorkoutHistory', component: WorkoutHistory},
];
