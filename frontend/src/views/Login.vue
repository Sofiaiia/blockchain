<template>
  <div class="about">
    <h1>Login</h1>
    <button @click="googleSignIn" class="googleButton">
        Sign in with google
    </button>
  </div>
</template>

<script lang="ts">

import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Options, Vue } from 'vue-class-component';
import { getAuth, signInWithPopup} from "firebase/auth";

export default class Login extends Vue{
  firebaseConfig = {
    apiKey: "AIzaSyClOAWOszA0Ldqqs6wym4HETDXojifqU6A",
    authDomain: "ts-course-e1637.firebaseapp.com",
    projectId: "ts-course-e1637",
    storageBucket: "ts-course-e1637.appspot.com",
    messagingSenderId: "775940375456",
    appId: "1:775940375456:web:fc4c2c9769b4a9f1109ac5"
  };

  app = initializeApp(this.firebaseConfig);
  provider = new GoogleAuthProvider();
  auth = getAuth();

  googleSignIn(){
    signInWithPopup(this.auth, this.provider)
    .then((result) => {
      //alert('Successfully logged in');
      this.$router.push('/');
    }).catch((error) => {
      alert(error.message);
    });
  }

}
</script>
