<template>
  <div class="pullout" :class="{ expand: expanded }">
    <BaseIconButton
      class="pulloutToggle"
      icon="ri-arrow-left-s-line"
      iconToggle="ri-arrow-right-s-line"
      toggle
      round
      @click="togglePullout"
    />
    <div class="pulloutContainer container">
      <h1 class="title">ACTION LIBRARY</h1>
      <div class="actionContainer">
        <ActionItem v-for="action in actions" :key="action.id" :action="action" />
      </div>
      <div class="container has-text-centered">
        <h2 v-if="actions.length < 1" class="subtitle">No Actions Found</h2>
        <h2 v-if="error" class="subtitle error">Error With Actions: {{ error.message || error }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  import BaseIconButton from "@/components/BaseComponents/BaseIconButton";
  import ActionItem from "@/components/ActionItem";

  export default {
    name: "ActionPanel",
    components: {
      BaseIconButton,
      ActionItem
    },
    data() {
      return {
        expanded: false
      };
    },
    computed: {
      ...mapGetters("actions", ["actions", "error"])
    },
    methods: {
      togglePullout() {
        this.expanded = !this.expanded;
      }
    },
    created() {
      this.$store.dispatch("actions/get_actions").catch(console.error);
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    font-size: 1.25em;
    text-align: center;
    color: #979797ff;
  }

  .subtitle {
    margin-top: 1em;
    color: #b5b5b5;
    font-size: 1em;
    font-weight: lighter;
  }

  .error {
    color: #ff2d57;
  }

  .pullout {
    position: fixed;
    display: flex;
    height: 100%;
    min-width: 300px;
    max-width: 500px;
    top: 0;
    right: 0;
    align-items: center;
    justify-content: flex-end;
    transition: all 0.8s ease;
    -webkit-animation: all 0.8s ease;
    transform: translateX(calc(100% - 1.5rem - 0.5em));
    -webkit-transform: translateX(calc(100% - 1.5rem - 0.5em));
    -ms-transform: translateX(calc(100% - 1.5rem - 0.5em));
    z-index: 100;
  }

  .pullout.expand {
    transform: translateX(0%);
    -webkit-transform: translateX(0%);
    -ms-transform: translateX(0%);
  }

  .pulloutToggle {
    box-shadow: 0 0 10px 0px #8a8a8a57;
    margin-right: 0.5em;
    z-index: 105;
  }

  .pulloutToggle:hover {
    background-color: #f1f1f1;
  }

  .pulloutContainer {
    height: 100%;
    width: 25vw;
    padding: 1em;
    overflow: auto;
    background-color: #fff;
    box-shadow: 0 0 20px 0px #8a8a8a2b;
  }

  .actionContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(65px, max-content));
    justify-content: center;
    gap: 1em;
  }
</style>
