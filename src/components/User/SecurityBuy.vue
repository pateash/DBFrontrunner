
<template>
    <div>
        <Hero message="Fill following information to continue" title="Buy Trade"></Hero>
    </div>
</template>

<script>
    import Hero from "@/components/Hero";
    export default {
        name: "SecurityBuy",
        components:{
            Hero
        },
        created(){
            /*
            ¡todo continue from here, wehave to restrict access if not loggedin
             and then have to also make same thing for securitySell
             ask goutham about security api end for showing all security and providing them
             option to buy or sell
             */

            //if not loggedin then go back to login page
            if (!this.$store.getters.isLoggedIn) {
                notification(this,"Please login to continue to trading..");
                //and go to dashboard
                this.$router.push("/");
            } else {
                console.log("Logged in");
            }
        }
    }
</script>

<style scoped>

</style>