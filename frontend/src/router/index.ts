import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const firebaseConfig = {
  apiKey: "AIzaSyClOAWOszA0Ldqqs6wym4HETDXojifqU6A",
  authDomain: "ts-course-e1637.firebaseapp.com",
  projectId: "ts-course-e1637",
  storageBucket: "ts-course-e1637.appspot.com",
  messagingSenderId: "775940375456",
  appId: "1:775940375456:web:fc4c2c9769b4a9f1109ac5"
};

const app = initializeApp(firebaseConfig);

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await getCurrentUser()){
    next('login');
  }else{
    next();
  }
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = getAuth(app).onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};

export default router
