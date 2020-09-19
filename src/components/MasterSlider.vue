<template>
  <div class="has-text-centered">
    <h1 class="title">MASTER</h1>
    <vue-slider
      class="slider"
      v-model="value"
      direction="btt"
      :max="100"
      :tooltip-formatter="formatter"
      height="350px"
    ></vue-slider>
  </div>
</template>

<script>
  export default {
    name: "MasterSlider",
    data() {
      return {
        value: 0,
        formatter: "{value}%"
      };
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    margin-bottom: 2em !important;
    font-size: 1.25em;
    color: #979797ff;
  }

  .slider {
    margin: auto;
  }
</style>
