<template>
  <div>
    <h1 class="title">LUMINOSITY</h1>
    <BaseWheelSlider :value="luminosity" @input="update_luminosity"></BaseWheelSlider>
    <h1 class="title">SATURATION</h1>
    <BaseWheelSlider :value="saturation" @input="update_saturation"></BaseWheelSlider>
    <h1 class="title">ALPHA</h1>
    <BaseWheelSlider :value="alpha" @input="update_alpha" :interval="0.01" :min="0" :max="1"></BaseWheelSlider>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";

  import BaseWheelSlider from "@/components/BaseComponents/BaseWheelSlider";

  export default {
    name: "WheelSliders",
    components: {
      BaseWheelSlider
    },
    computed: {
      ...mapGetters("settings", [ "saturation", "luminosity", "alpha" ])
    },
    methods: {
      ...mapActions("settings", [ "update_luminosity", "update_saturation", "update_alpha", "update_rgb" ])
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
