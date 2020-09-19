<template>
  <div>
    <h1 class="title has-text-centered">Login</h1>
    <form @submit.prevent="submit">
      <div v-show="status !== 'loading'">
        <BaseFormInput
          ref="username"
          label="Username"
          placeholder="example@example.com"
          icon="ri-user-line"
          success-icon="ri-check-line"
          failure-icon="ri-alert-line"
          v-model="username"
        />
        <BaseFormInput
          ref="password"
          label="Password"
          icon="ri-lock-2-line"
          type="password"
          success-icon="ri-check-line"
          failure-icon="ri-alert-line"
          v-model="password"
        />
        <p v-if="error" class="help is-danger">{{ error.message }}</p>
        <div class="field">
          <p class="control">
            <button type="submit" class="button is-success">Login</button>
          </p>
        </div>
      </div>
      <Spinner v-show="status === 'loading'"></Spinner>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import store from "@/store";

  import BaseFormInput from "@/components/BaseComponents/BaseFormInput";
  import Spinner from "@/components/misc/Spinner";

  export default {
    name: "LoginForm",
    components: {
      BaseFormInput,
      Spinner
    },
    data() {
      return {
        username: "",
        password: "",
        invalidUsername: "Username field is required",
        invalidPassword: "Password field is required",
        error: ""
      };
    },
    computed: {
      ...mapGetters("auth", [ "status" ])
    },
    watch: {
      username(val) {
        this.validateInput(this.$refs.username, val, this.invalidUsername);
      },
      password(val) {
        this.validateInput(this.$refs.password, val, this.invalidPassword);
      }
    },
    methods: {
      submit() {
        const username = this.$refs.username;
        const password = this.$refs.password;

        this.error = "";

        if (username.valid && password.valid) {
          this.login({ username: this.username, password: this.password })
            .then(res => {
              if (res.data.status === 200) {
                this.$router.push("/dashboard");
              }
            })
            .catch(err => {
              this.error = err.error;
            });
        } else {
          if (!username.valid) {
            username.setStatus(false, this.invalidUsername);
          }

          if (!password.valid) {
            password.setStatus(false, this.invalidPassword);
          }
        }
      },
      validateInput(input, val, msg = "") {
        if (val.length < 1) {
          input.setStatus(false, msg);
        } else {
          input.setStatus(true);
        }
      },
      ...mapActions("auth", [ "login" ])
    },
    beforeRouteEnter(to, from, next) {
      if (store.getters["auth/isLoggedIn"]) {
        next("/dashboard");
      } else {
        next();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .field {
    margin-top: 1.75em !important;
  }

  .field .button {
    width: 100%;
    width: stretch;
    margin-left: 3em;
    margin-right: 3em;
  }

  .label {
    font-weight: 400 !important;
  }

  .title {
    margin-bottom: 1em !important;
  }
</style>
