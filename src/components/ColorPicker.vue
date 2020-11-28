<template>
  <div>
    <h1 class="title">COLOR PICKER</h1>
    <RadialColorPicker
      class="colorPicker"
      :hue="hue"
      @input="update_hue"
      :luminosity="luminosity"
      :saturation="saturation"
      :alpha="alpha"
      variant="persistent"
    />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  import RadialColorPicker from "@radial-color-picker/vue-color-picker";

  export default {
    name: "ColorPicker",
    components: {
      RadialColorPicker
    },
    computed: {
      ...mapGetters("dmx", ["hue", "saturation", "luminosity", "alpha"])
    },
    methods: {
      update_hue(event) {
        this.$store.dispatch("dmx/update_hue", event);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css";

  .title {
    margin-bottom: 4em !important;
    font-size: 1.25em;
    color: #979797ff;
  }

  .colorPicker {
    margin: auto;
  }
</style>

<style lang="scss">
  .rcp__palette.in {
    transform: scale(0.9999) !important;
  }
</style>
