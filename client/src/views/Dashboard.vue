<template>
  <section>
    <h1>Dashboard</h1>
    <h1>{{user.username}}</h1>
    <div v-if="logingOut" class="text-center">
      <img src="../assets/pacman_loading.svg"/>
    </div>
    <button v-if="!logingOut" @click="logout()" class="btn btn-primary">Logout</button>
  </section>
</template>

<script>
const API_URL = 'http://localhost:5000';
export default {
  data: () => ({
    logingOut: false,
    user: {},
  }),
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        if (result.user) {
          this.user = result.user;
        } else {
          this.logout();
        }
      });
  },
  methods: {
    logout() {
      this.logingOut = true;
      setTimeout(() => {
        localStorage.removeItem('token');
        this.$router.push('/login');
      }, 1000);
    },
  },
};
</script>
