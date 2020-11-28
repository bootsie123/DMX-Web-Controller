<template>
  <div class="level">
    <div class="dot level-item" :style="{ backgroundColor: statusColor }"></div>
    <div class="subtitle level-item" :style="{ color: status === 'error' ? '#ff2d57' : '#b5b5b5ff' }">
      {{ status === "error" ? error.message : statusText }}
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "ConnectionStatus",
    data() {
      return {
        timeLapsed: 0,
        statusColors: {
          online: "#00e852",
          offline: "#cccccc",
          warning: "#ffa12d",
          error: "#ff2d57"
        }
      };
    },
    computed: {
      statusColor() {
        return this.statusColors[this.status];
      },
      statusText() {
        let time;
        let label;

        if (this.timeLapsed < 60000) {
          return "Last updated now";
        } else if (this.timeLapsed < 60 * 60000) {
          time = Math.floor(this.timeLapsed / 60000);
          label = time > 1 ? "minutes" : "minute";
        } else {
          time = Math.floor((this.timeLapsed / 60) * 60000);
          label = time > 1 ? "hours" : "hour";
        }

        return `Last updated ${time} ${label} ago`;
      },
      ...mapGetters("status", ["status", "lastUpdate", "error"])
    },
    methods: {
      ...mapActions("status", ["set_error"])
    },
    sockets: {
      authenticated() {
        this.$socket.emit("status");
      },
      connect_error(err) {
        this.set_error(err);
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.timeLapsed = Date.now() - this.lastUpdate;
        this.$socket.emit("status");
      }, 10000);
    },
    destroyed() {
      clearInterval(this.interval);
    }
  };
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
