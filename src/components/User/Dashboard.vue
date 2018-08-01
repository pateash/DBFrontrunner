<template>
    <div>
        <Hero message="Following table contains trade information" title="Trader Dashboard"></Hero>
        <!--SECURITIES-->
        <section class="container" style="margin-top: 2em">
                        <h1 class="title" style="text-align: left">Place Order</h1>
            <b-table :data="securityData" :columns="securityColumns"></b-table>
        </section>


        <!--ORDERS-->
        <section class="container" style="margin-top: 2em">
            <h1 class="title" style="text-align: left">Trade History</h1>
            <b-table :data="orderData" :columns="orderColumns"></b-table>
        </section>
    </div>
</template>

<script>
    import Hero from "../Hero";
    import notification from "../../services/notification";
    export default {
        components:{Hero},
        data() {
            return {
                user:{},
                orderData: [],
                orderColumns: [
                    {
                        field: "clientname",
                        label: 'Client Name',
                    },
                    {
                        field: 'security',
                        label: 'Security Name',
                    },
                    {
                        field: 'isinno',
                        label: 'ISIN no.',
                    },
                    {
                        field: 'tradedate',
                        label: 'Trading Data',
                    },
                    {
                        field: 'quantity',
                        label: 'Quantity',
                        centered: true
                    },
                    {
                        field: 'tradetype',
                        label: 'Trade Type',
                    },
                    {
                        field: 'limitprice',
                        label: 'Limit Price',
                    },
                    {
                        field: 'direction',
                        label: "Direction",
                    },
                    {
                        field: 'value',
                        label: "Value",
                    },

                ],
                securityData:[],
                securityColumns:[]
            }
        },

        methods: {
            /*
             * Load async data
             */
            loadAsyncData() {
                notification(this,"Fetching data...");


                //todo: start from here by asking goutham about the end points of getting securities
                this.$store.dispatch('getSecurities',this.$store.getters.getUser)
                    .then(data=>{
                        console.log(data);
                        this.orderData=data;
                    })
                    .catch(error=>{

                    });

                this.$store.dispatch('getOrders',this.$store.getters.getUser)
                    .then(data=>{
                        console.log(data);
                        this.orderData=data;
                    })
                    .catch(error=>{

                    });


            },
            /*
             * Handle page-change event
             */
            onPageChange(page) {
                this.page = page
                this.loadAsyncData();
            },
            /*
             * Handle sort event
             */
            onSort(field, order) {
                this.sortField = field
                this.sortOrder = order
                this.loadAsyncData()
            },
            /*
             * Type style in relation to the value
             */
            type(value) {
                const number = parseFloat(value)
                if (number < 6) {
                    return 'is-danger'
                } else if (number >= 6 && number < 8) {
                    return 'is-warning'
                } else if (number >= 8) {
                    return 'is-success'
                }
            }
        },
        filters: {
            /**
             * Filter to truncate string, accepts a length parameter
             */
            truncate(value, length) {
                return value.length > length
                    ? value.substr(0, length) + '...'
                    : value
            },
        },

        created() {
            this.loadAsyncData();
            //if not loggedin then go back to login page
            if (!this.$store.getters.isLoggedIn) {
                notification(this,"Please login to continue to dashboard..");
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