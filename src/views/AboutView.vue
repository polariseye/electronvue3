<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="helloWorld">设置标题</button>
  </div>
</template>
<script lang="ts">
export default{
  data(){

  },
  methods:{
    helloWorld(){
      (window as any).testMain.helloWorld("haha");
    }
  }
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
