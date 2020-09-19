<template>
  <div>
    <h1 class="title">COLOR PICKER</h1>
    <RadialColorPicker class="colorPicker" variant="persistent"></RadialColorPicker>
  </div>
</template>

<script>
  import RadialColorPicker from "@radial-color-picker/vue-color-picker";

  export default {
    name: "ColorPicker",
    components: {
      RadialColorPicker
    }
  }
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
    transform: scale(.9999) !important;
  }
</style>
