<template>
    <section class="section">

        <div class="columns is-mobile" >
            <div class="column is-half is-offset-one-quarter" >
                <h1 class="title" style="text-align: left">Trader Log In</h1>


                <b-field label="TraderId"
                         type="is-success"
                         message="This username is available">
                    <b-input value="" maxlength="30"></b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password"
                             value="iwantmytreasure"
                             password-reveal>
                    </b-input>
                </b-field>
            </div>

        </div>
        <div class="columns is-mobile">
             <div class="column is-half is-offset-8">
                <button class="button is-primary is-right" slot="trigger">Log In</button>

            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                name: 'John Silver'
            }
        }
    }
</script>

<style scoped>
    .section{
        text-align: left;
    }

</style>