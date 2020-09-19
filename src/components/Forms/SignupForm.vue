<template>
  <div>
    <h1 class="title has-text-centered">Signup</h1>
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
        <BaseFormInput
          ref="password2"
          label="Password Confirmation"
          icon="ri-lock-2-line"
          type="password"
          success-icon="ri-check-line"
          failure-icon="ri-alert-line"
          v-model="password2"
        />
        <p v-if="error" class="help is-danger">{{ error.message }}</p>
        <div class="field">
          <p class="control">
            <button type="submit" class="button is-success">Signup</button>
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
    name: "SignupForm",
    components: {
      BaseFormInput,
      Spinner
    },
    data() {
      const required = " field is required";

      return {
        username: "",
        password: "",
        password2: "",
        invalidUsername: "Username" + required,
        invalidPassword: "Password" + required,
        invalidPassword2: "Password Confirmation" + required,
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
      },
      password2(val) {
        this.validateInput(this.$refs.password2, val, this.invalidPassword2);
      }
    },
    methods: {
      submit() {
        const username = this.$refs.username;
        const password = this.$refs.password;
        const password2 = this.$refs.password2;

        this.error = "";

        if (username.valid && password.valid && password2.valid) {
          if (this.password !== this.password2) {
            password2.setStatus(false, "Both passwords must match");
          } else {
            this.signup({ username: this.username, password: this.password, password2: this.password2 })
              .then(res => {
                if (res.data.status === 200) {
                  this.$router.push("/dashboard");
                }
              })
              .catch(err => {
                if (err.error.status === 400) {
                  const errors = err.error.errors;

                  for (let error in errors) {
                    if (this.$refs[error]) {
                      this.$refs[error].setStatus(false, errors[error]);
                    }
                  }
                }

                this.error = err.error;
              });
          }
        } else {
          if (!username.valid) {
            username.setStatus(false, username.statusMsg || this.invalidUsername);
          }

          if (!password.valid) {
            password.setStatus(false, password.statusMsg || this.invalidPassword);
          }

          if (!password2.valid) {
            password2.setStatus(false, username.statusMsg || this.invalidPassword2);
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
      ...mapActions("auth", [ "signup" ])
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
