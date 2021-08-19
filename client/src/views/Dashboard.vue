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
    <br/>
    <br/>
    <button v-if="!logingOut" @click="showForm = !showForm" class="btn btn-info">
      Toggle Form
    </button>
    <form v-if="!logingOut && showForm" @submit.prevent="addNote()">
      <div class="mb-3">
        <br/>
        <label for="title" class="form-label">Title</label>
        <input
          v-model="newNote.title"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="titleHelp"
          placeholder="Enter a title." required
        />
        <div id="titleHelp" class="form-text text-muted">
          Enter a descriptive title for your note.
        </div>
      </div>
      <div class="form-group">
        <label for="note" class="form-label">Note</label>
        <textarea
          v-model="newNote.note"
          class="form-control"
          id="note"
          rows="3"
          placeholder="Enter your note here." required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-success">
        Add Note
      </button>
    </form>
  </section>
</template>

<script>
const API_URL = 'http://localhost:5000';
export default {
  data: () => ({
    showForm: false,
    logingOut: false,
    user: {},
    newNote: {
      title: '',
      note: '',
    },
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
    addNote() {
      fetch(`${API_URL}api/v1/notes`, {
        method: 'post',
        body: JSON.stringify(this.newNote),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((note) => console.log(note));
    },
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
