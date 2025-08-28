<template>
  <li>
    <div>
      <a :href="link">{{ email }} </a>
      <!-- <h1>hello</h1> -->
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
    props:['message','email'],
    computed:{
        link(){
            return `mailto:${this.email}`
        }
    }
}
</script>

<style>
</style>