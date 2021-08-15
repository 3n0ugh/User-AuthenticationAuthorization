<template>
  <section>
    <div class="home text-center">
      <div class="jumbotron">
        <h1 class="display-3">Authentication Test Site</h1>
        <p class="lead">
          Javascript is giving me pain but, it's also fun.
        </p>
        <hr class="my-4" />
        <p>Another hard-to-understand Node.js project.</p>
        <p class="lead">
          <router-link
            :to="{ name: 'signup' }"
            class="btn btn-primary btn-lg"
            role="button"
          >
            Sign Up
          </router-link>
        </p>
      </div>
    </div>
  </section>
</template>
