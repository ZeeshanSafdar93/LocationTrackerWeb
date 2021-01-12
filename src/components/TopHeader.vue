<template>
  <div>
      Logged In:
    <span v-if="loggedIn">{{userID}}</span>
    <span v-else>No</span>
    <div v-if="loggedIn">
        <button @click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  components: {
  },
})
export default class Home extends Vue {

    loggedIn = false;
    userID = "";

    //methods...

    created(): void{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.loggedIn = true;
                if(user.email)
                this.userID = user.email?.toString();
                // ...
            } else {
                // User is signed out
                // ...
                this.loggedIn = false;
            }
        });
    }
    
    signOut(): void {

        firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("Signed Out");
        this.$router.replace({name: "Home"});
        }).catch((error) => {
        // An error happened.
        console.log(error);
        });

    }
}
</script>