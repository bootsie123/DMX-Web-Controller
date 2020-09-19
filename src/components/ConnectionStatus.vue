<template>
  <div class="level">
    <div class="dot level-item" :style="{ backgroundColor: statusColor }"></div>
    <div class="subtitle level-item">
      {{ statusText }}
    </div>
  </div>

</template>

<script>
  export default {
    name: "ConnectionStatus",
    data: () => {
      return {
        statusColor: "#cccccc",
        statusText: "Last updated 5 minutes ago"
      };
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
    color: #b5b5b5ff;
  }

  .dot {
    height: 20px;
    width: 20px;
    margin-right: 1em;
    background-color: black;
    border-radius: 100%;
  }
</style>
