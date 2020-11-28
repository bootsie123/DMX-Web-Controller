<template>
  <button class="button" :style="cssStyles" @click="click" @mouseover="mouseover" @mouseleave="mouseleave">
    <span v-if="running && hover" class="icon" :style="{ color: style.iconColor }">
      <i class="ri-stop-fill" />
    </span>
    <template v-else>
      <Spinner v-if="status === 'loading' || (!statusIcon && running)" traditional />
      <template v-else>
        <span v-if="statusIcon || style.icon" class="icon" :style="{ color: style.iconColor }">
          <i :class="statusIcon || style.icon" />
        </span>
        <span v-else>
          {{ action.name }}
        </span>
      </template>
    </template>
  </button>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  import Spinner from "@/components/misc/Spinner";

  export default {
    name: "ActionItem",
    components: {
      Spinner
    },
    props: {
      action: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        status: "",
        hover: false
      };
    },
    computed: {
      style() {
        return this.action.style || {};
      },
      cssStyles() {
        const actionStyles = this.style;
        const styles = {};

        if (actionStyles) {
          if (actionStyles.background) {
            styles.backgroundColor = actionStyles.background;
            styles.border = "none";
          }

          if (actionStyles.fontColor) {
            styles.color = actionStyles.fontColor;
          }
        }

        return styles;
      },
      statusIcon() {
        let icon = "";

        if (this.status === "success") {
          icon = "ri-check-line";
        } else if (this.status === "error") {
          icon = "ri-error-warning-line";
        }

        return icon;
      },
      running() {
        return this.runningAction.id === this.action.id;
      },
      ...mapGetters("actions", ["runningAction"])
    },
    methods: {
      click() {
        if (this.running) {
          this.stop_action(this.action.id)
            .then(() => {
              this.status = "";
            })
            .catch(err => {
              this.status = "error";
              this.statusTimeout("", 3000);

              console.error(err);
            });
        } else {
          this.status = "loading";

          this.run_action(this.action.id)
            .then(() => {
              this.status = "success";
              this.statusTimeout("", 3000);
            })
            .catch(err => {
              this.status = "error";
              this.statusTimeout("", 3000);

              console.error(err);
            });
        }
      },
      statusTimeout(status, time) {
        setTimeout(() => {
          this.status = status;
        }, time);
      },
      mouseover() {
        this.hover = true;
      },
      mouseleave() {
        this.hover = false;
      },
      ...mapActions("actions", ["run_action", "stop_action"])
    }
  };
</script>

<style lang="scss" scoped>
  .button {
    width: 65px !important;
    height: 65px !important;
    border-radius: 6px !important;
    white-space: normal !important;
  }

  .icon {
    font-size: 1.5em;
  }
</style>
