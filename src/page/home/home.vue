<template>
    <div>
        <head-top signin-up="home">
            <span 
                slot="logo" 
                class="head_logo"
                @click="reload"
            >ele.me</span>
        </head-top>
    </div>
</template>

<script>
import headTop from "../../components/header/head"

export default {
    components: {
        headTop
    },
    methods: {
        reload() {
            window.location.reload();
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
</style>