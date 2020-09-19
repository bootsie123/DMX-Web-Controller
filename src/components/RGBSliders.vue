<template>
  <div>
    <h1 class="title">COLOR PROPERTIES</h1>
    <BaseRGBSlider label="R" v-model="red" color="#ff4c70"></BaseRGBSlider>
    <BaseRGBSlider label="G" v-model="green" color="#3edb34"></BaseRGBSlider>
    <BaseRGBSlider label="B" v-model="blue"></BaseRGBSlider>
  </div>
</template>

<script>
  import BaseRGBSlider from "@/components/BaseComponents/BaseRGBSlider";

  export default {
    name: "RGBSliders",
    components: {
      BaseRGBSlider
    },
    data() {
      return {
        red: 0,
        green: 0,
        blue: 0
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
</style>
