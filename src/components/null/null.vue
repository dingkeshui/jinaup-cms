<template>
  <div id="null">
    <div class="imgbox">
      <img src="../../assets/logo.jpg">
    </div>
    <div>
      <span>这里空空如也~</span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'null',
  data () {
    return {

    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  #null{
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #aaa;
    .imgbox{
      text-align: center;
      margin-bottom: 20px;
      img{
        width: 100px;
        border-radius: 5px;
      }
    }
  }
</style>
