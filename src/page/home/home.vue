<template>
    <div>
        <head-top signin-up="home">
            <span 
                slot="logo" 
                class="head_logo"
                @click="reload"
            >ele.me</span>
        </head-top>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link :to="'/city/' + guessCityid" class="guess_city">
                <span>{{guessCity}}</span>
                <svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </router-link>
        </nav>
        <section id="hot_city_container">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter_classify">
                <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">
                    <h4 class="city_title">{{key}}
                        <span v-if="index == 0">(按字母排序)</span>
                    </h4>
                    <ul class="groupcity_name_container citylistul clear">
                        <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                        {{item.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import headTop from "../../components/header/head"
import {cityGuess, hotcity, groupcity} from '../../service/getData'

export default {
    data() {
        return {
            guessCity: '',
            guessCityid: '',
            hotcity: [],
            groupcity: {}
        }
    },
    components: {
        headTop
    },
    mounted() {
        cityGuess().then(res => {
            this.guessCity = res.name;
            this.guessCityid = res.id;
        })

        hotcity().then(res => {
            this.hotcity = res;
        })

        groupcity().then(res => {
            this.groupcity = res;
        })
    },
    methods: {
        reload() {
            window.location.reload();
        }
    },
    computed: {
        sortgroupcity() {
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.groupcity[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                }
            }
            return sortobj;
        }
    }
}
</script>

<style lang='stylus' scoped>
@import '../../style/mixin'
.head_logo 
    left 0.4rem
    font-weight 400
    sc(0.7rem, #ffffff)
    wh(2.3rem, 0.7rem)
    ct();
.city_nav
    padding-top 2.35rem
    border-top 1px solid $bc
    background-color #ffffff
    margin-bottom 0.4rem
.city_tip
    fj();
    line-height 1.45rem
    padding 0 0.45rem
    span nth-of-type(1)
        sc(0.55rem, #666);
    span nth-of-type(2)
        font-weight 900
        sc(0.475rem, #9f9f9f);
    
.guess_city
    fj();
    align-items center
    height 1.8rem
    padding 0 0.45rem
    border-top 1px solid $bc
    border-bottom 2px solid $bc
    font(0.75rem, 1.8rem);
    span nth-of-type(1){
        color $blue
    }
.arrow_right
    wh(0.6rem, 0.6rem);
    fill #999
    
.citylistul
    li
        float: left;
        text-align: center;
        color: $blue;
        border-bottom: 0.025rem solid $bc;
        border-right: 0.025rem solid $bc;
        wh(25%, 1.75rem);
        font(0.6rem, 1.75rem);
        
    li nth-of-type(4n)
        border-right: none;
        
    
.city_title
    color: #666;
    font-weight: 400;
    text-indent: 0.45rem;
    border-top: 2px solid $bc;
    border-bottom: 1px solid $bc;
    font(0.55rem, 1.45rem, "Helvetica Neue");
    span
        sc(0.475rem, #999);
        
    

.letter_classify_li
    margin-bottom: 0.4rem;
    background-color: #fff;
    border-bottom: 1px solid $bc;
    .groupcity_name_container
        li
            color: #666;
            
        
    

        

</style>