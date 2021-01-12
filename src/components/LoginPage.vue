<template>
  <div id="loginpage">
    <Main>
        <form @submit.prevent="pressed">
            <div class="username-box">
                <label>Username</label>
                <input 
                type="text" 
                class="username-bar" 
                placeholder="Username"
                v-model="email" 
                />
            </div>

            <div class="password-box">
                <label>Password</label>
                <input 
                type="password" 
                class="password-bar" 
                placeholder="Password" 
                v-model="password"
                />
            </div>
            <div class="action-box">
                <button type="submit">Login</button>
            </div>

        </form>
        <div class="register-box">
            <router-link to="/register">Register</router-link>
        </div>
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
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        // Signed in 
        // ...
        console.log(user);

        //let token: string = res.user?.ma;
        // let userId: string = res.user?.uid;
      this.$router.replace({name: "MainPage"});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
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
.register-box {
  padding: 30px;
}

#register-box a {
  font-weight: bold;
  color: #2c3e50;
}

#register-box a.router-link-exact-active {
  color: #42b983;
}
</style>
