<template>
  <div class="home">
    <LoginPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginPage from '@/components/LoginPage.vue'; // @ is an alias to /src
import MainPage from '@/components/MainPage.vue';

import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  components: {
    LoginPage,
    MainPage,
  },
})
export default class Home extends Vue {
  loggedIn = false;

    //methods...

    created(): void{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.loggedIn = true;
                this.$router.replace({name: "MainPage"});
                // ...
            } else {
                // User is signed out
                // ...
                this.loggedIn = false;
            }
        });
    }
}
</script>
