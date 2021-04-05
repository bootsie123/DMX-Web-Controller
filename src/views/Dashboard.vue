<template>
  <div class="background">
    <nav class="navbar2" role="navigation" aria-label="main navigation">
      <div class="is-flex">
        <h1 class="brandName">DMX Web Controller</h1>
      </div>
      <div class="is-flex">
        <ConnectionStatus></ConnectionStatus>
      </div>
      <div class="is-flex">
        <a :href="ola" class="OLA navbar-item">OLA</a>
      </div>
    </nav>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container2">
          <div class="columns is-centered is-multiline">
            <div class="column widthLimit">
              <RGBSliders class="RGBSliders"></RGBSliders>
              <WheelSliders></WheelSliders>
            </div>
            <div class="column is-one-third">
              <ColorPicker></ColorPicker>
            </div>
            <div class="column is-narrow">
              <MasterSlider></MasterSlider>
            </div>
          </div>
        </div>
      </div>
      <ActionPanel />
    </section>
  </div>
</template>

<script>
  import ConnectionStatus from "@/components/ConnectionStatus";
  import ColorPicker from "@/components/ColorPicker";
  import RGBSliders from "@/components/RGBSliders";
  import MasterSlider from "@/components/MasterSlider";
  import WheelSliders from "@/components/WheelSliders";
  import ActionPanel from "@/components/ActionPanel";

  export default {
    name: "Dashboard",
    components: {
      ConnectionStatus,
      ColorPicker,
      RGBSliders,
      MasterSlider,
      WheelSliders,
      ActionPanel
    },
    sockets: {
      authenticated() {
        this.$socket.emit("get_dmx");
        this.$socket.emit("get_olaEndpoint");
      }
    },
    computed: {
      ola() {
        const location = window.location;
        const olaEndpoint = this.$store.state.dmx.olaEndpoint;

        return location.protocol + "//" + location.hostname + ":" + olaEndpoint.split(":")[2];
      }
    }
  };
</script>

<style lang="scss" scoped>
  .brandName {
    margin-left: 0.5em;
    border-bottom: 1px solid #4a4a4a;
    line-height: 2em;
    font-size: 1.5em;
    font-weight: lighter;
  }

  .navbar2 {
    display: flex;
    min-height: 3.25rem;
    justify-content: space-between;
  }

  .container2 {
    width: 100%;
    margin: auto;
  }

  .background {
    background-color: #fdfdfd;
  }

  .column {
    margin: 0 auto !important;
    padding: 0 2em 4em 2em !important;
  }

  .RGBSliders {
    margin-bottom: 1.25em;
  }

  .widthLimit {
    max-width: 500px;
  }

  .OLA {
    max-height: 52px;
    padding: 0.5em 1.5em;
  }
</style>
