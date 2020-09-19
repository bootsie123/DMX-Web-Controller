<template>
  <vue-slider
    class="slider"
    :value="value"
    @change="$emit('input', $event)"
    v-bind="$attrs"
    :processStyle="{ backgroundColor: color }"
    :tooltipStyle="{ backgroundColor: color, borderColor: color }"
  >
  </vue-slider>
</template>

<script>
  export default {
    name: "BaseWheelSlider",
    props: {
      value: Number
    },
    data() {
      return {
        color: "#676767"
      };
    }
  }
</script>

<style lang="scss" scoped>
  .slider {
    width: 100%;
  }
</style>
