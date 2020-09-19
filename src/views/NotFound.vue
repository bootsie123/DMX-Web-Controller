<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">404</h1>
        <h2 class="subtitle">Sorry, the page you were looking for was not found</h2>
        <button class="button is-medium" @click="goBack">Back</button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "NotFound",
    methods: {
      goBack: function() {
        window.history.length > 2 ? this.$router.back() : this.$router.push("/")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    margin-bottom: .75em !important;
    color: #363636ff;
    font-size: 6em;
    font-weight: bold;
  }

  .subtitle {
    color: #656565;
  }

  .button {
    width: 20%;
    max-width: 250px;
    min-width: 100px;
    margin-top: 1em !important;
  }

  .hero {
    background-color: #f8faffff;
  }
</style>
