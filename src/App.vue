<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  // async created() {
  //   try {
  //     const res = await fetch(
  //       'https://coachapp-d1c10-default-rtdb.europe-west1.firebasedatabase.app/requests/W3.json',{
  //         method:'POST',
  //         body:JSON.stringify({name:'Ahmed'}),
  //       }
  //     );
  //      if (!res.ok) {
  //       const error = new Error('hello my friend');
  //       throw error;
  //     }
  //     // const resData = await res.json();
  //     // console.log('response details :',resData, this.$store.getters['request/requests'])
  //     // this.$store.dispatch('requests/contactCoach',{message:'hhhhhhh' , email:'jdjdj@ahaah'} );
     
  //   } catch (error) {
  //     console.log(error.message, ' my friend');
  //   }
  // },
  created(){
    this.$store.dispatch('autoLogin');
  },
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
