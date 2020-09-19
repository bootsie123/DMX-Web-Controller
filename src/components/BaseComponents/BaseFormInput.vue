<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control" :class="{ 'has-icons-left': icon, 'has-icons-right': successIcon || failureIcon }">
      <input
        class="input"
        :class="status"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :type="type"
        :placeholder="placeholder"
      />
      <span v-if="icon" class="icon is-left">
        <i :class="icon" />
      </span>
      <span v-if="valid && successIcon" class="icon is-right">
        <i :class="successIcon" />
      </span>
      <span v-else-if="valid === false && failureIcon" class="icon is-right">
        <i :class="failureIcon" />
      </span>
    </div>
    <p v-if="help || statusMsg" class="help" :class="status">{{ help || statusMsg }}</p>
  </div>
</template>

<script>
  export default {
    name: "BaseFormInput",
    props: {
      label: String,
      placeholder: String,
      help: String,
      icon: String,
      successIcon: String,
      failureIcon: String,
      type: {
        type: String,
        default: "text"
      },
      value: String
    },
    data() {
      return {
        valid: null,
        statusMsg: ""
      };
    },
    computed: {
      status() {
        return {
          "is-success": this.valid,
          "is-danger": this.valid === false
        };
      }
    },
    methods: {
      setStatus(status, msg = "") {
        this.valid = status;
        this.statusMsg = msg;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .field {
    margin-top: 1.5em !important;
  }

  .label {
    font-weight: 400 !important;
  }
</style>
