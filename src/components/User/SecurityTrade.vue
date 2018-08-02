
<template>
    <div>
        <Hero message="Fill following information to continue" :title="capitalize(tradeType)+' '+security.symbol+' Shares'"></Hero>


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
                            <b><i v-if="loading" class="fas fa-spinner fa-spin"></i></b>
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
                    isinno:"INEDB2808B"+(parseInt(Math.random()*1000000)),
                    hours:this.$store.getters.getTime[0],
                    minutes:this.$store.getters.getTime[1]
                },
                loading:true,
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
                axios.post("/users/orders/execute",this.security)
                    .then(({data})=>{
                        if(data.code==2){
                            notification(this,"Variance Limit Exceed, Flagged to compliance...","error");
                        }else if(data.code==1){
                            // this.$store.dispatch('updateLimits',data).then((response)=>{
                            // //todo update limits when data comes
                            //     console.log(data);
                            // })
                            //     .catch(error=>{
                            //     console.log(error);
                            // });
                            notification(this,"Order Executed Successfully...");
                        }else{
                            notification(this,"Your Sector Limit exceeded...");
                        }
                    })
                    .catch(error=>{
                        console.log(error);

                    });
            }
        },
        created(){

            if(this.$route.params.security==undefined || this.$route.params.security=="undefined") {
                notification(this, "Please click on Buy or Sell from Dashboard");
                //and go to dashboard
                this.$router.push("/dashboard");
            }

            //if not loggedin then go back to login page
            if (!this.$store.getters.isLoggedIn ) {
                notification(this,"Please login to continue to trading..");
                //and go to dashboard
                this.$router.push("/");
            } else {
                console.log("Logged in");
            }
            this.sideBarTitle="Updating";
            axios.post("/verify/currentprice",{
                "securityid": this.$route.params.security,
                "hours":this.$store.getters.getTime[0],
                "minutes":this.$store.getters.getTime[1]
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
                this.loading=true;
                setTimeout(()=>{
                    axios.post("/verify/currentprice",{
                        "securityid":this.$route.params.security,
                        "hours":this.$store.getters.getTime[0],
                        "minutes":this.$store.getters.getTime[1]
                    })
                        .then(({data})=>{
                            if(data.code==1){
                                this.sideBarTitle="Current Price";
                                this.sideBarValue=data.description;
                                this.loading=false;
                            }
                        })
                        .catch(error=>{
                            console.log(error);
                            notification(this,"Error Updating Price");
                        });

                },2000);
            },6000);

        }

    }
</script>

<style scoped>

    .section{
        text-align: left;
    }
</style>