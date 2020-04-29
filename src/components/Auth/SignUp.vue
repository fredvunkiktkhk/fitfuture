<template>
    <div class="signup">
        <div class="signup-form">
            <form @submit.prevent="onSubmit">
                <div class="input">
                    <label for="email">E-mail</label>
                    <input
                            type="email"
                            id="email"
                            v-model="email"
                            autocomplete="off"
                    >
                </div>
                <div class="input">
                    <label for="password">Password</label>
                    <input
                            type="password"
                            id="password"
                            v-model="password"
                            autocomplete="off"
                    >
                </div>
                <div class="submit">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "SignUp",
        data  () {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            onSubmit() {
                axios.post('http://localhost:3300/signup', {
                  email: this.email,
                  password: this.password
                }
                ).then((res) => {
                  this.$router.push({ name: 'Workouts'});
                  console.log(res);
                }).catch((err) => {
                  console.log(err);
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .signup-form {
        width: 250px;
        margin: 30px auto;
        border: 1px solid #eee;
        box-shadow: 0 2px 3px #ccc;
        padding: 20px;
    }

    .input {
        margin: 10px auto;
        background: transparent;
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
            background:  linear-gradient(to left, #F27A54, #A154F2);
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
        color: #ccc;
        cursor: not-allowed;
    }
</style>