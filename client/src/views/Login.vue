<template>
  <section>
    <h1>Login</h1>
    <div v-if="logingIn" class="text-center">
      <img src="../assets/pacman_loading.svg"/>
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form v-if="!logingIn" @submit.prevent="login()">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter a username"
          required
        />
        <h5 id="usernameHelp" class="form-text text-muted">
        Enter a username to login.
        </h5>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordHelp"
          placeholder="Enter a password"
          required
        />
        <h5 id="passwordHelp" class="form-text text-muted">
        Enter a password to login.
        </h5>
      </div>
      <div class="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
        <div class="col">
          <button type="submit" class="btn btn-primary btn-lg">Login</button>
        </div>
        <div class="col">
          <router-link
            to="/signup"
            class="btn btn-primary btn-lg "
            role="button"
          >
            Signup
          </router-link>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';

const LOGIN_URL = 'http://localhost:5000/auth/login';
const schema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{10,30}$')).trim(),
});

export default {
  data: () => ({
    errorMessage: '',
    logingIn: false,
    user: {
      username: '',
      password: '',
    },
  }),
  methods: {
    login() {
      this.errorMessage = '';
      if (this.validUser()) {
        this.logingIn = true;
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }).then((result) => {
          localStorage.token = result.token;
          setTimeout(() => {
            this.logingIn = false;
            this.$router.push('/dashboard');
          }, 1000);
        }).catch((err) => {
          setTimeout(() => {
            this.logingIn = false;
            this.errorMessage = err.message;
          }, 1000);
        });
      }
    },
    validUser() {
      const result = schema.validate(this.user);
      if (!Object.prototype.hasOwnProperty.call(result, 'error')) {
        return true;
      }
      if (result.error.message.includes('username')) {
        this.errorMessage = 'Username is invalid.';
      } else {
        this.errorMessage = 'Password is invalid.';
      }

      return false;
    },
  },
};
</script>
