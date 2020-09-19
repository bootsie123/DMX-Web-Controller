<template>
  <div class="wrap">
    <input
      class="slider"
      :class="{ 'vertical': vertical }"
      :step="step"
      :min="min"
      :max="max"
      v-model="value"
      type="range"
    />
  </div>
</template>

<script>
  export default {
    name: "Slider",
    props: {
      step: {
        type: Number,
        default: 1
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 255
      },
      vertical: Boolean
    },
    data() {
      return {
        value: "0"
      };
    },
    computed: {
      valueNum() {
        return parseInt(this.value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
  }

  .slider {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 8px;
    border-radius: 10px;
    background-color: #DBDBDB;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
  }

  .vertical {
    transform: translate(-50%, -50%) rotate(270deg);
    -moz-transform: translate(-50%, -50%) rotate(270deg);
  }
</style>
