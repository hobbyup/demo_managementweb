<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div
         v-loading="HomeLoading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(250, 205, 221, 0.5)"
         class="content-box" :class="{'content-collapse':collapse}">
            <div class="content_wrapper">
                <v-tags></v-tags> 
                <div class="content" style="flex:1;">
                    <div class="content_inner">
                        <transition name="move" mode="out-in">
                        <keep-alive>
                            <router-view 
                            
                             v-if="isRouterAlive"></router-view>
                        </keep-alive>
                    </transition>
                    </div>
                    
                </div>
                <v-footer></v-footer>
            </div>

        </div>
    </div>
</template>

<style scoped>
    .content_wrapper{
       display: flex;
       flex-direction: column;
       height:100%;
    }
    
</style>

<script>
import vHead from './head.vue';
import vSidebar from './sidebar.vue';
import vTags from './tags.vue'; 
import vFooter from './footer.vue';
import bus from './bus';
export default {
    provide () {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            collapse: false,
            isRouterAlive: true,
            HomeLoading: false
        }
    },
    components: {
        vHead, vSidebar, vTags, vFooter
    },
    created() {
        bus.$on('collapse', msg => {
            this.collapse = msg;
        })
    },
    methods: {
        reload () {
            this.isRouterAlive = false
            setTimeout(() => {
                this.HomeLoading = false
            }, 1.5 * 1000)
            this.$nextTick(function() {
                this.isRouterAlive = true
                this.HomeLoading = true
            })
            
        }
    }
}
</script>
