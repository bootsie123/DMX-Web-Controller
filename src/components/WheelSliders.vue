<template>
  <div>
    <h1 class="title">LUMINOSITY</h1>
    <BaseWheelSlider v-model="luminosity"></BaseWheelSlider>
    <h1 class="title">SATURATION</h1>
    <BaseWheelSlider v-model="saturation"></BaseWheelSlider>
    <h1 class="title">ALPHA</h1>
    <BaseWheelSlider v-model="alpha" :interval="0.01" :min="0" :max="1"></BaseWheelSlider>
  </div>
</template>

<script>
  import BaseWheelSlider from "@/components/BaseComponents/BaseWheelSlider";

  export default {
    name: "WheelSliders",
    components: {
      BaseWheelSlider
    },
    data() {
      return {
        luminosity: 50,
        saturation: 100,
        alpha: 1
      };
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    margin: 1.25em 0;
    font-size: 1.25em;
    color: #979797ff;
  }
</style>
