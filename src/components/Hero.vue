<template>
    <div>
        <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">
                    {{title}}
                </p>
                <p class="subtitle">
                    {{message}}
                </p>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        props:['message', 'title']
    }
</script>

<style scoped>

</style>`