<template>
    <div>
        <SignUp />
        <SignIn />
    </div>
</template>

<script>
    import SignIn from "./Auth/SignIn";
    import SignUp from "./Auth/SignUp";

    export default {
        name: "LogIn",
        components: {
            SignUp, SignIn,
        }
    }
</script>

<style scoped lang="scss">

</style>