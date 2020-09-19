<template>
  <div class="columns is-gapless is-vcentered is-mobile">
    <div class="column is-2">
      <h1 class="name has-text-left" :style="{ color }">{{ label }}</h1>
    </div>
    <div class="column">
      <vue-slider
        class="slider"
        :value="value"
        @change="$emit('input', $event)"
        :max="255"
        v-bind="$attrs"
        :processStyle="{ backgroundColor: color }"
        :tooltipStyle="{ backgroundColor: color, borderColor: color }"
      >
      </vue-slider>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseRGBSlider",
    props: {
      label: String,
      color: {
        type: String,
        default: "#3398DB"
      },
      value: Number
    }
  }
</script>

<style lang="scss" scoped>
  .name {
    text-align: left;
    font-size: 2em;
    font-weight: bold;
  }

  .slider {
    width: 100%;
  }
</style>
