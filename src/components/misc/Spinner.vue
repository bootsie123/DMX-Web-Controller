<template>
  <div class="container">
    <div v-if="traditional" class="spinner2">
      <span class="icon">
        <i class="ri-loader-4-line" />
      </span>
    </div>
    <div v-else class="spinner"></div>
  </div>
</template>

<script>
  export default {
    name: "Spinner",
    props: {
      traditional: Boolean
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    height: 3em;
  }

  .spinner2 {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    -webkit-animation: load2 2s linear infinite;
    animation: load2 2s linear infinite;
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
    content: "";
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

  @-webkit-keyframes load2 {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes load2 {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
