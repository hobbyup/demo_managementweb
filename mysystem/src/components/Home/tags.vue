<template>
        <div class="header_container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/mangen' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

</template>

<script>
    import bus from './bus';
    import {mapActions, mapState} from 'vuex'
    export default {
        data() {
            return {
            }
        },
    }

</script>


<style>
	.header_container{
		background-color: #fff;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
</style>
