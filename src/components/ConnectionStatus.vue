<template>
  <div class="level">
    <div class="dot level-item" :style="{ backgroundColor: statusColor }"></div>
    <div class="subtitle level-item" :style="{ color: status === 'error' ? '#ff2d57' : '#b5b5b5ff' }">
      {{ error || statusText }}
    </div>
  </div>

</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "ConnectionStatus",
    data() {
      return {
        statusText: "Last updated 5 minutes ago",
        statusColors: {
          online: "#00e852",
          offline: "#cccccc",
          warning: "#ffa12d",
          error: "#ff2d57"
        },
        polling: null
      };
    },
    computed: {
      statusColor() {
        return this.statusColors[this.status];
      },
      ...mapGetters("status", [ "status", "lastUpdate", "error" ])
    },
    methods: {
      pollStatus() {
        this.$store.dispatch("status/check_status");

        setInterval(() => {
          this.$store.dispatch("status/check_status");
        }, 5000);
      }
    },
    beforeDestroy() {
      clearInterval(this.polling);
    },
    created() {
      this.pollStatus();
    }
  }
</script>

<style lang="scss" scoped>
  .level {
    padding: 10px;
  }

  .subtitle {
    font-size: 1em;
    font-weight: lighter;
  }

  .dot {
    height: 20px;
    width: 20px;
    margin-right: 1em;
    background-color: black;
    border-radius: 100%;
  }
</style>
