<template>
    <div>
        <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">
                    Welcome to DB Compliance service
                </p>
                <p class="subtitle">
                    Please <b>Login</b> for continuing seeing your <b>trade history</b> and manage your clients ...
                </p>
            </div>
        </section>
        <Login></Login>
    </div>
</template>

<script>
    import Login from "./Login";
    export default {
        name: "Body",
        components:{
            Login
        }
    }
</script>

<style scoped>

</style>`