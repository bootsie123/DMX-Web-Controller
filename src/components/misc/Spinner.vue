<template>
  <div class="container">
    <div class="spinner"></div>
  </div>
</template>

<script>
  export default {
    name: "Spinner"
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 3em;
  }

  .spinner,
  .spinner:before,
  .spinner:after {
    background: #363636;
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 2em;
  }
  .spinner {
    color: #363636;
    text-indent: -9999em;
    margin: 88px auto;
    position: relative;
    font-size: 11px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .spinner:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .spinner:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 2em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 3em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 2em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 3em;
    }
  }
</style>
