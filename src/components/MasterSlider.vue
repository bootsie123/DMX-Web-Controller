<template>
  <div class="has-text-centered">
    <h1 class="title">MASTER</h1>
    <vue-slider
      class="slider"
      :value="value"
      @change="update_master"
      direction="btt"
      :max="255"
      tooltip="always"
      :tooltip-formatter="formatter"
      height="350px"
    />
  </div>
</template>

<script>
  export default {
    name: "MasterSlider",
    data() {
      return {
        formatter: val => {
          return Math.floor((val / 255) * 100) + "%";
        }
      };
    },
    computed: {
      value() {
        return this.$store.state.dmx.master;
      }
    },
    methods: {
      update_master(event) {
        this.$store.dispatch("dmx/update_master", event);
      }
    }
  };
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
