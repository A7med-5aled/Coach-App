<template>
  <base-dialog :show="isLoading" fixed="true" title="Loading">
    <base-spinner></base-spinner>
  </base-dialog>
  <base-dialog :show="!!error" title="An Error Has Occurred" @close="tryClose">
    <p>{{ error }}</p>
  </base-dialog>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!formIsValid" :class="{ error: !formIsValid }">
        Please Enter A Valid Email And Password (Should be 6 Char Long )
      </p>
      <base-button>{{ firstBtn }}</base-button>
      <base-button type="button" mode="flat" @click="switchMode">{{
        secondBtn
      }}</base-button>
    </form></base-card
  >
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    firstBtn() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    secondBtn() {
      if (this.mode == 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    tryClose() {
      this.error = null;
    },
    async submitForm() {
      this.formIsValid = true;
      this.isLoading = true;

      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password == '' ||
        this.email.length < 6 ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        this.isLoading = false;

        return;
      }
      try {
        if (this.mode === 'signup') {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });

          this.switchMode();
        } else {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
          const redirect = '/' + (this.$route.query.redirect || 'coaches');
          this.$router.replace(redirect);
        }
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
    switchMode() {
      if (this.mode == 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.error {
  color: red;
}
</style>
