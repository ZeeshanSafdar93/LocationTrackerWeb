<template>
  <div id="register-page">
    <Main>
      <form @submit.prevent="pressed">
        <div>
            <label>Username</label>
            <input type="email" placeholder="Email" v-model="email"/>
        </div>
        <div>
            <label>Password</label>
            <input type="password" placeholder="Password" v-model="password"/>
        </div>
        <div>
            <button @click="registerNewUser">Register</button>
        </div>
      </form>
    </Main>
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
export default class App extends Vue {
    email = "";
    password = "";

    pressed(): void {
      alert('Submitted');
    }

    registerNewUser(): void {

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(res => {
                // Signed in 
                // ...
                console.log(res);

                //let token: string = res.user?.ma;
               // let userId: string = res.user?.uid;
               this.$router.replace({name: "MainPage"});

                //localStorage.setItem();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });

    }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
