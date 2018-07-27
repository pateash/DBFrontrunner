<template>
    <section class="hero footer"  style="margin-top: 5em;">
  <div class="hero-body" style="padding-bottom: 1em">
    <div class="container">
      <h2 class="subtitle">
      Copyright&copy;2018. <b>Deutsche Bank AG</b>. All rights reserved.
      </h2>
    </div>
  </div>
</section>
</template>

<script>
    import Hero from "./Hero";
    export default {
        name: "Footer",
        components:{
            Hero
        }
    }
</script>

<style scoped>
.footer{
  /*position: absolute;*/
  right:0px;
  bottom: -5em;
}
</style>