<template>
  <section>
    <h1>Signup</h1>
    <div v-if="signingUp" class="text-center">
      <img src="../assets/pacman_loading.svg"/>
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form v-if="!signingUp"  @submit.prevent="signup">
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
          Username must be longer than 2 and shorter than 30. Username can only
          contain alphanumeric characters.
        </h5>
      </div>
      <div clas="form-row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Password"
            required
          />
          <h5 id="passwordHelp" class="form-text text-muted">
            Password must be longer than 10.
          </h5>
        </div>

        <div class="form-group col-md-6">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="user.confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword"
            aria-describedby="confirmPasswordHelp"
            placeholder="Password"
            required
          />
          <h5 id="confirmPasswordHelp" class="form-text text-muted">
            Please confirm your password.
          </h5>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Signup</button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';

const SIGNUP_URL = 'http://localhost:5000/auth/signup';

const schema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{10,30}$')).trim(),
  confirmPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{10,30}$')).trim(),
});

export default {
  data: () => ({
    signingUp: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.signingUp = true;
        fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
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
            this.signingUp = false;
            this.$router.push('/dashboard');
          }, 1000);
        }).catch((err) => {
          setTimeout(() => {
            this.signingUp = false;
            this.errorMessage = err.message;
          }, 1000);
        });
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Passwords must match.';
        return false;
      }
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
