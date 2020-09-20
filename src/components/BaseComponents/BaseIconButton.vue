<template>
  <span
    class="icon"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="clicked"
  >
    <i :class="classes" />
  </span>
</template>

<script>
  export default {
    name: "BaseIconButton",
    props: {
      icon: String,
      iconHover: String,
      iconToggle: String,
      iconToggleHover: String
    },
    data() {
      return {
        hover: false,
        toggled: false
      };
    },
    computed: {
      classes() {
        if (this.toggled) {
          return [ this.hover ? this.iconToggleHover : this.iconToggle ];
        } else {
          return [ this.hover ? this.iconHover : this.icon ];
        }
      }
    },
    methods: {
      clicked(event) {
        this.toggled = !this.toggled;

        this.$emit('click', event.target);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
