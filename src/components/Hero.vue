<template>
    <div>
        <section class="hero" :class="{'is-primary':!isAdminSite,'is-info':isAdminSite}">
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
        props:['message', 'title'],
        computed:{
             isAdminSite(){
                  let matchregex=new RegExp(/.*compliance.*/).exec(this.$route.fullPath);
                  if(matchregex==undefined){
                      console.log("do not match");
                      return false;
                  }
                  console.log("matched");
                  return true;

            }
        }
    }
</script>

<style scoped>
      .user-class{
    color:#7957d5;
    font-weight: bolder;
  }
  .user-button{
    background-color:#7957d5;
    color:white;
  }
  .admin-class{
    color:rgb(0,103,158);
    font-weight: bolder;
  }
  .admin-button{
    background-color:rgb(0,103,158);
    color:white;
  }

</style>`