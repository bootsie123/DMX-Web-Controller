<template>
  <div class="background">
    <nav class="navbar2" role="navigation" aria-label="main navigation">
      <div class="container2">
        <h1 class="brandName">DMX Web Controller</h1>
      </div>
      <div class="container2">
        <ConnectionStatus></ConnectionStatus>
      </div>
    </nav>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container3">
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
    </section>
  </div>
</template>

<script>
  import ConnectionStatus from "@/components/ConnectionStatus";
  import ColorPicker from "@/components/ColorPicker";
  import RGBSliders from "@/components/RGBSliders";
  import MasterSlider from "@/components/MasterSlider";
  import WheelSliders from "@/components/WheelSliders";

  export default {
    name: "Dashboard",
    components: {
      ConnectionStatus,
      ColorPicker,
      RGBSliders,
      MasterSlider,
      WheelSliders
    }
  };
</script>

<style lang="scss" scoped>
  .brandName {
    margin-left: .5em;
    border-bottom: 1px solid #4a4a4a;
    line-height: 2em;
    font-size: 1.5em;
    font-weight: lighter;
  }

  .navbar2 {
    display: flex;
    min-height: 3.25rem;
  }

  .container2 {
    display: flex;
    width: 100%;
    align-items: stretch;
  }

  .container3 {
    width: 100%;
    margin: auto;
  }

  .background {
    background-color: #f8faffff;
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
</style>
