<template>
  <section>
    <h1>Dashboard</h1>
    <h1>{{ user.username }}</h1>
    <div v-if="logingOut" class="text-center">
      <img src="../assets/pacman_loading.svg" />
    </div>
    <button v-if="!logingOut" @click="logout()" class="btn btn-primary">
      Logout
    </button>
    <button v-if="!logingOut" @click="logout()" class="btn btn-info">
      Toggle Form
    </button>
    <form v-if="!logingOut">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="titleHelp"
          placeholder="Enter a title."
        />
        <div id="titleHelp" class="form-text text-muted">
          Enter a descriptive title for your note.
        </div>
      </div>
      <div class="form-group">
        <label for="description" class="form-label">Note</label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          placeholder="Enter your note here."
        ></textarea>
      </div>
      <button @click="addNote()" class="btn btn-success">
        Add Note
      </button>
    </form>
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
    })
      .then((res) => res.json())
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
