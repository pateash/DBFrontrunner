<template>
    <div>
        <Hero message="Page Not Found" title="404: Not Found"></Hero>
        <section class="section">
            <div class="columns is-mobile">

            </div>
        </section>
    </div>
</template>

<script>
    import Hero from "./Hero"
    export default {
        name: "Error404",
        components:{
            Hero
        }
    }
</script>

<style scoped>

</style>