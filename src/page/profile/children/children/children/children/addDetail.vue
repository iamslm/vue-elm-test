<template>
  <div class="rating_page">
    <head-top head-title="搜索地址" go-back='true'></head-top>
    <section>
      <div class="add-detail">
        <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAdress" />
        <button @click="iputThing">确认</button>
      </div>
      <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
      <div class="point" v-show="warning">
        <p>找不到地址？</p>
        <p>请尝试输入小区，写字楼或学校名</p>
        <p>详细地址（如门牌号）可稍后输入哦。</p>
      </div>
    </section>
    <section class="poisearch-container" v-show="addressList">
      <ul>
        <li v-for="(item, index) in addressList" @click="listClick(index)">
          <p>{{item.name}}</p>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import headTop from '../../../../../../components/header/head.vue'
  import {getImgPath} from '../../../../../../components/common/mixin'
  import {searchNearby} from '../../../../../../service/getData.js'
  import {mapMutations, mapState} from 'vuex'
  export default {
    
  }
  
</script>

<style>
</style>
