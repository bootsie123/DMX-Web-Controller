<template>
  <div>
    <h1 class="title">LUMINOSITY</h1>
    <BaseWheelSlider :value="luminosity" @input="update_luminosity" />
    <h1 class="title">SATURATION</h1>
    <BaseWheelSlider :value="saturation" @input="update_saturation" />
    <h1 class="title">ALPHA</h1>
    <BaseWheelSlider :value="alpha" @input="update_alpha" :interval="0.01" :min="0" :max="1" />
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
      ...mapGetters("dmx", ["saturation", "luminosity", "alpha"])
    },
    methods: {
      ...mapActions("dmx", ["update_luminosity", "update_saturation", "update_alpha", "update_rgb"])
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    margin: 1.25em 0;
    font-size: 1.25em;
    color: #979797ff;
  }
</style>
