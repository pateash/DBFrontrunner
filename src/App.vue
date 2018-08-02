<template>
  <div id="app">
    <Header></Header>
    {{$store.getters.getTime}}

      <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
    import Header from './components/Header'
    import Body from './components/Hero'
    import Footer from './components/Footer'

    export default {
        name: 'app',
        components: {
            Header,
            Body,
            Footer
        },
        mounted(){
            setInterval(()=>{
                this.$store.dispatch("updateTime");
            },5000)
        }
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
