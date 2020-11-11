<template>
    <div>
		<head-top :head-title='cityname' go-back='true'>
			<router-link to='/home' slot="changecity" class="change_city">切换城市</router-link>
		</head-top>
		<form class="city_form" v-on:submit.prevent>
			<div>
				<input type="search" name="city" placeholder="输入学校,商务楼,地址" class="city_input input_style" required v-model="inputValue" /
			</div>
			<div>
				<input type="submit" name="submit" class="city_submint input_style" @click="postpois" value="提交"  />
			</div>
		</form>
		<header v-if="historytitle" class="pois_search_history">搜索历史</header>
		<ul class="getpois_ul">
			<li v-for="(item, index) in placelist" @click="nextpage(index, item.geohash)" :key="index">
				<h4 class="pois_name ellipsis">{{item.name}}</h4>
				<p class="pois_address ellipsis">{{item.address}}</p>
			</li>
		</ul>
		<footer v-if="historytitle && placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
		<div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>

<script>
	import headTop from '../../components/header/head.vue'
	import {currentcity, searchplace} from '../../service/getData.js'
	import {getStore, setStore, removeStore} from '../../config/mUtils.js'
	
	export default {
		data() {
			return {
				inputValue: '',
				cityid: '',
				cityname: '',
				placelist: [],
				placeHistory: [],
				historytitle: true,
				placeNone: false
			}
		},
		
		mounted() {
			this.cityid = this.$route.params.cityid;
			
			currentcity(this.cityid).then(res => {
				this.cityname = res.name;
			})
			this.initData();
		},
		
		components:{
			headTop
		},
		
		methods: {
			initData() {
				if(getStore('placeHistory')) {
					this.placelist = JSON.parse(getStore('placeHistory'));
				}else{
					this.placelist = [];
				}
			},
			
			postpois() {
				if(this.inputValue) {
					searchplace(this.cityid, this.inputValue).then(res => {
						this.historytitle = false;
						this.placelist = res;
						this.placeNone = res.length ? false : true;
					})
				}
			},
			
			nextpage(index, geohash) {
				let history = getStore('placeHistory');
				let choosePlace = this.placelist[index];
				if(history) {
					let checkrepeat = false;
					this.placeHistory = JSON.parse(history);
					this.placeHistory.forEach(item => {
						if(item.geohash == geohash) {
							checkrepeat = true;
						}
					})
					if(!checkrepeat) {
						this.placeHistory.push(choosePlace);
					}
				}else{
					this.placeHistory.push(choosePlace);
				}
				setStore('placeHistory', this.placeHistory)
				this.$router.push({path:'/msite', query:{geohash}})
			},
			clearAll() {
				removeStore('placeHistory');
				this.initData();
			}
		}
	}
</script>

