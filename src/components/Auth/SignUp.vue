<template>
  <div class="signup">
    <div class="signup-form">
      <form @submit.prevent="onSignUp">
        <div class="input">
          <label for="email">E-mail</label>
          <input
            type="email"
            id="email"
            @blur="$v.email.$touch()"
            v-model="email"
            autocomplete="off"
            maxlength="40"
            required="required"
          >
          <span class="error" v-if="!$v.email.email">Please provide a valid email address.</span>
        </div>
        <div class="input">
          <label for="password">Parool</label>
          <input
            type="password"
            id="password"
            @blur="$v.password.$touch()"
            v-model="password"
            autocomplete="off"
            maxlength="60"
            required="required"
          >
          <span class="error" v-if="!$v.password.minLength">
            Password must have at least 6 letters.
          </span>
        </div>
        <div class="submit">
          <button type="submit">Registreeri</button>
        </div>
      </form>
    </div>
    <div class="container-svg">
      <img src="../../../public/img/group21.svg" alt="logo" class="signup-logo">
    </div>
  </div>
</template>

<script>
  import {required, email, minLength} from 'vuelidate/lib/validators';

  export default {
    name: "SignUp",
    data() {
      return {
        email: '',
        password: '',
        windowWidth: 0,
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    methods: {
      async onSignUp() {
        try {
          await this.axios.post('/api/signup', {
            email: this.email,
            password: this.password
          });
          await this.$router.push({name: 'Login'});
        } catch (err) {
          console.log(err.response);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .signup {
    position: relative;

    .container-svg {
      margin-top: -18%;
      overflow: hidden;
    }

    &-logo {
      width: 100%;
      transform: scale(0.7);
    }

    .signup-form {
      width: 250px;
      margin: 30px auto;
      border: 1px solid #eee;
      box-shadow: 0 2px 3px #ccc;
      padding: 20px;
      position: relative;
      z-index: 50;
    }

    .input {
      margin: 10px auto;
      background: transparent;
    }

    .error {
      color: #FF000D;
      font-size: 12px;
    }

    .box1 {
      width: 400px;
      height: 150px;
    }

    .box2 {
      width: 400px;
      height: 150px;
    }

    .svg-right {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);

    }

    .svg-left {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);

    }

    .input label {
      display: block;
      color: #FFF;
      margin-bottom: 6px;
    }

    .input.inline label {
      display: inline;
    }

    .input input {
      font: inherit;
      width: 100%;
      padding: 6px 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #F27A54;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      background: transparent;
      color: #FFF;
    }

    .input.inline input {
      width: auto;
    }

    .input input:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.1);
    }

    .input select {
      border: 1px solid #ccc;
    }

    .submit {
      text-align: center;

      button {
        border: 0;
        border-radius: 20px;
        color: #FFF;
        padding: 10px 20px;
        cursor: pointer;
        margin: 0 auto;
        background: linear-gradient(to left, #F27A54, #A154F2);
        box-shadow: 0 0 10px 0 #00000075;
        font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      }
    }

    .submit button:hover,
    .submit button:active {
      background-color: #521751;
      color: white;
    }

    .submit button[disabled],
    .submit button[disabled]:hover,
    .submit button[disabled]:active {
      border: 1px solid #ccc;
      background-color: transparent;
      color: #CCC;
      cursor: not-allowed;
    }
  }

  /*  @media screen and (min-width: 2560px) {

      .signup {
        .container-svg {
          margin-top: -400px;
        }
      }
    }*/

  @media screen and (max-width: 840px) {

    .signup {

      .container-svg {
        width: 100%;
        margin-top: -50px;
      }

      &-logo {
        transform: none;
      }
    }
  }


  @media screen and (max-height: 480px) {
    .container-svg {
      display: none;
    }
  }
</style>