<template>
  <div>
    <h1 class="title">
      <span class="text">COLOR PROPERTIES</span>
      <div class="buttonGroup">
        <BaseIconButton
          class="iconButton"
          icon="ri-eye-line"
          iconHover="ri-eye-fill"
          iconToggle="ri-eye-off-line"
          iconToggleHover="ri-eye-off-fill"
          toggle
          @click="toggleTooltip"
        />
        <BaseIconButton class="iconButton" icon="ri-refresh-line" iconHover="ri-refresh-fill" @click="refresh" />
      </div>
    </h1>
    <BaseRGBSlider label="R" :value="red" :tooltip="tooltip" @input="updateHSLA('red', $event)" color="#ff4c70" />
    <BaseRGBSlider label="G" :value="green" :tooltip="tooltip" @input="updateHSLA('green', $event)" color="#3edb34" />
    <BaseRGBSlider label="B" :value="blue" :tooltip="tooltip" @input="updateHSLA('blue', $event)" />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  import BaseRGBSlider from "@/components/BaseComponents/BaseRGBSlider";
  import BaseIconButton from "@/components/BaseComponents/BaseIconButton";

  export default {
    name: "RGBSliders",
    components: {
      BaseRGBSlider,
      BaseIconButton
    },
    data() {
      return {
        tooltip: "active"
      };
    },
    computed: {
      ...mapGetters("dmx", ["red", "green", "blue"])
    },
    methods: {
      updateHSLA(color, val) {
        const obj = {
          red: this.red,
          green: this.green,
          blue: this.blue
        };

        obj[color] = val;

        this.$store.dispatch("dmx/RGB_to_HSLA", obj);
      },
      toggleTooltip() {
        this.tooltip = this.tooltip === "active" ? "always" : "active";
      },
      refresh() {
        this.$socket.emit("status");
        this.$socket.emit("get_dmx");
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

  .text {
    margin-right: 0.5em;
  }

  .buttonGroup {
    display: inline-block;
    margin: 0.5em;
    margin-left: 0em;
  }

  .iconButton {
    margin: 0 0.1em;
    font-weight: normal !important;
    vertical-align: text-bottom;
  }
</style>
