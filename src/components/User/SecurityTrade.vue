
<template>
    <div>
        <Hero message="Fill following information to continue" :title="capitalize(tradeType)+' '+security.symbol+' shares'"></Hero>


        <section class="section">
            <div class="columns">
                <div class="column is-two-thirds">
                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            <h1 class="title" style="text-align: left">Trade Information</h1>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-one-fifth is-offset-one-quarter">
                            <b-field label="Quantity">
                                <b-input maxlength="30" type="number" v-model="security.quantity" required></b-input>
                            </b-field>
                        </div>
                        <div class="column is-one-fifth ">
                            <b-field label="Price">
                                <b-input maxlength="30" required type="number" v-model="security.price"></b-input>
                            </b-field>

                        </div>
                    </div>

                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            <h1 class="subtitle" style="text-align: left">Total Amount </h1>
                            <h2 class="title">&#8377; {{totalPrice}} </h2>
                        </div>
                    </div>
                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-6">
                            <button class="button is-primary is-right" autofocus slot="trigger" @click="trade">
                                {{capitalize($route.params.tradeType)}} Now
                            </button>
                        </div>
                    </div>
                </div>
                <div class="column is-one-thirds">
                    <div class="notification is-primary">
                        <p class="subtitle">{{sideBarTitle}}
                            <b><i v-if="sideBarValue=='...'" class="fas fa-spinner fa-spin"></i></b>
                        </p>
                        <h1 class="title" style="text-align: left"> &#8377; {{sideBarValue}}</h1>
                    </div>

                </div>
            </div>
            <!--<div class="columns is-mobile">-->
            <!--<div class="column is-half is-offset-8">-->
            <!--<button class="button is-primary is-right"  autofocus @click="logIn" slot="trigger">Log In</button>-->
            <!--</div>-->
            <!--</div>-->
        </section>
    </div>
</template>

<script>
    import axios from "axios";
    import Hero from "@/components/Hero";
    import notification from "../../services/notification";
    export default {
        name: "SecurityBuy",
        data(){
            return{

                currentPrice:0,
                security:{
                    symbol: this.$route.params.security,
                    quantity:0,

                    price:0,
                    brokerid:this.$store.getters.getUser.id,
                    clientname:this.$store.getters.getUser.name,
                    direction:this.$route.params.tradeType[0].toUpperCase(),
                    isinno:"INEDB2808B"+(parseInt(Math.random()*1000000))
                },
                sideBarTitle:"Current Price",
                sideBarValue:'...',
            }
        },
        computed:{
            tradeType(){
                // console.log(this.$route.params);
                return this.$route.params.tradeType
            },
            totalPrice(){
                return this.security.price*this.security.quantity;
            }
        },
        components:{
            Hero
        },
        methods:{
            capitalize(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            trade(){

                //todo: do this request as soon as goutham changes price attribute it....
                axios.post("/users/orders/execute",this.security)
                    .then(response=>{
                        console.log(response);

                    })
                    .catch(error=>{
                        console.log(error);

                    });
            }
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
            this.sideBarTitle="Updating";
              axios.post("/verify/currentprice",{
                        "securityid":"TCS",
                        "hours":10,
                        "minutes":0
                    })
                        .then(({data})=>{
                            if(data.code==1){
                                this.sideBarTitle="Current Price";
                                this.sideBarValue=data.description;
                            }
                        })
                        .catch(error=>{
                            console.log(error);
                            notification(this,"Error Updating Price");
                        });
        },
        mounted(){
            setInterval(()=>{
                this.sideBarTitle="Updating";
                this.sideBarValue="...";

                setTimeout(()=>{
                    axios.post("/verify/currentprice",{
                        "securityid":"TCS",
                        "hours":10,
                        "minutes":0
                    })
                        .then(({data})=>{
                            if(data.code==1){
                                this.sideBarTitle="Current Price";
                                this.sideBarValue=data.description;
                            }
                        })
                        .catch(error=>{
                            console.log(error);
                            notification(this,"Error Updating Price");
                        });

                },2000);
            },8000);

        }

    }
</script>

<style scoped>

    .section{
        text-align: left;
    }
</style>