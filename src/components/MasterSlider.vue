<template>
  <div class="has-text-centered">
    <h1 class="title">MASTER</h1>
    <vue-slider
      class="slider"
      :value="value"
      @change="update_master"
      direction="btt"
      :max="100"
      tooltip="always"
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

        formatter: "{value}%"
      };
    },
    computed: {
      value() {
        return this.$store.state.settings.master;
      }
    },
    methods: {
      update_master(event) {
        this.$store.dispatch("settings/update_master", event);
      }
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
