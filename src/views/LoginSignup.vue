<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "LoginSignup"
  };
</script>

<style lang="scss" scoped>
  .hero {
    background-image: radial-gradient(#a7a7a73b 7%, #ffffff00 0%), linear-gradient(#f8faffff 0%, #f8faffff 100%);
    background-repeat: repeat, no-repeat;
    background-size: 50px 50px, cover;
  }

  .box {
    padding: 2.5em;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 20px 0px #bfbfbf8c;
  }
</style>
