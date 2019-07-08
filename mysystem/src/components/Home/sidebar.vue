<template>
    <div class="sidebar">
        <el-menu  class="sidebar-el-menu" :default-active="defaultActive" :collapse="collapse" background-color="#001529"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
                    <el-menu-item index="mangen">
                            <i class="el-icon-menu"></i><span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu  index="index1">
                        <template slot="title">
                            <i class="el-icon-service"></i><span slot="title">用户管理</span>
                        </template>
                        <el-menu-item index="userlist">
                            用户列表
                        </el-menu-item>
                        <el-menu-item index="userlimit">
                            用户额度
                        </el-menu-item>
                        <el-menu-item index="panel">
                            名单
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu  index="index2">
                        <template slot="title">
                            <i class="el-icon-tickets"></i><span slot="title">订单管理</span>
                        </template>
                        <el-menu-item index="indentlist">
                             订单列表
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu  index="index3">
                        <template slot="title">
                            <i  class="el-icon-document"></i><span slot="title">文章管理</span>
                        </template>
                        <el-menu-item index="articlelist">
                            文章列表
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu  index="index4">
                        <template slot="title">
                            <i  class="el-icon-goods"></i><span slot="title">商品管理</span>
                        </template>
                        <el-menu-item index="shoplist">
                             商品列表
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu  index="index5">
                        <template slot="title">
                            <i  class="el-icon-setting"></i><span slot="title">系统管理</span>
                        </template>
                        <el-menu-item index="administratorsettings">
                            管理员设置
                        </el-menu-item>
                        <el-menu-item index="rolemanagement">
                            角色管理
                        </el-menu-item>
                        <el-menu-item index="accessthemenu">
                            权限菜单
                        </el-menu-item>
                        <el-menu-item index="informmanagement">
                            通知管理
                        </el-menu-item>
                        <el-menu-item index="appreleased">
                            App发布
                        </el-menu-item>
                    </el-submenu>
        </el-menu>
    </div> 
</template>

<script>
    import bus from './bus';
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                collapse: false,
            }
        },
        computed: {
			defaultActive: function(){
				return this.$route.path.replace('/');
			}
		},
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
    
</style>
