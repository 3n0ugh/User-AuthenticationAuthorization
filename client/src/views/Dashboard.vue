<template>
  <section>
    <h1>Dashboard</h1>
    <h1>{{ user.username }}</h1>
    <div v-if="logingOut" class="text-center">
      <img src="../assets/pacman_loading.svg" />
    </div>
    <div class="col-2">
      <button v-if="!logingOut" @click="logout()" class="btn btn-primary">
        Logout
      </button>
    </div>
    <div class="mt-2 col-2">
      <button v-if="!logingOut" @click="showForm = !showForm" class="btn btn-info">
        Toggle Form
      </button>
    </div>
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
      <div class="mt-2">
        <button type="submit" class="btn btn-success">
          Add Note
        </button>
      </div>
    </form>
    <section class="row mt-3">
      <div
        class="col-6"
        v-for="note in notes"
        :key="note._id"
      >
        <div
          class="card text-white bg-dark mb-3">
          <div class="card-header"><h2>{{note.title}}</h2></div>
          <div class="card-body">
            <p class="card-text" v-html="renderMarkdown(note.note)"/>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import MarkdownIt from 'markdown-it';
import MDemoji from 'markdown-it-emoji';

const md = new MarkdownIt();
md.use(MDemoji);

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
    notes: [],
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
          this.getNotes();
        } else {
          this.logout();
        }
      });
  },
  methods: {
    renderMarkdown(note) {
      return md.render(note);
    },
    getNotes() {
      fetch(`${API_URL}/api/v1/notes`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((notes) => {
          this.notes = notes;
        });
    },
    addNote() {
      fetch(`${API_URL}/api/v1/notes`, {
        method: 'POST',
        body: JSON.stringify(this.newNote),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((note) => {
          this.notes.push(note);
          this.newNote = {
            title: '',
            note: '',
          };
          this.showForm = false;
        });
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

<style>
.card {
  height: 90%;
}
.card-text img{
  width: 100%;
}
</style>
