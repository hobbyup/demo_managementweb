import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('../src/views/Login/login.vue')), 'login');
const mangen = r => require.ensure([], () => r(require('../src/views/Mangen/mangen.vue')), 'mangen');
const index = r => require.ensure([], () => r(require('../src/views/Index/index.vue')), 'index');
const indentlist = r => require.ensure([], () => r(require('../src/views/Indentlist/indentlist.vue')), 'indentlist');
const userlist = r => require.ensure([], () => r(require('../src/views/UserList/userlist.vue')), 'list');
const articlelist = r => require.ensure([], () => r(require('../src/views/Articlelist/articlelist.vue')), 'articlelist');
const shoplist = r => require.ensure([], () => r(require('../src/views/Shoplist/shoplist.vue')), 'shoplist');
const administratorsettings = r => require.ensure([], () => r(require('../src/views/AdministratorSettings/administratorsettings.vue')), 'administratorsettings');
const userlimit = r => require.ensure([], () => r(require('../src/views/UserLimit/userlimit')), 'userlimit');
const panel = r => require.ensure([], () => r(require('../src/views/Panel/panel')), 'panel');
const rolemanagement = r => require.ensure([], () => r(require('../src/views/RoleManagement/rolemanagement')), 'rolemanagement');
const accessthemenu = r => require.ensure([], () => r(require('../src/views/AccessTheMenu/accessthemenu')), 'accessthemenu');
const informmanagement = r => require.ensure([], () => r(require('../src/views/InformManagement/informmanagement')), 'informmanagement');
const appreleased = r => require.ensure([], () => r(require('../src/views/AppReleased/appreleased')), 'appreleased');


const routes = [
  
  {
    path: '/',
    component: login
  },
  {
    path: '/index',
    component: index,
    children: [
      {
        path: '/mangen',
        component: mangen,
        meta: ['首页'],
      },
      {
        path: '/userlist', 
        component: userlist,
        meta:['用户管理', '用户列表'],
      },
      {
        path: '/userlimit', 
        component: userlimit,
        meta:['用户管理', '用户额度'],
      },
      {
        path: '/panel', 
        component: panel,
        meta:['用户管理', '名单'],
      },
      {
        path: '/indentlist',
        component: indentlist,
        meta: ['订单管理', '订单列表'],
      },
      {
        path: '/articlelist',
        component: articlelist,
        meta: ['文章管理', '文章列表'],
      },
      {
        path: '/shoplist',
        component: shoplist,
        meta: ['商品管理', '商品列表'],
      },
      {
        path: '/administratorsettings',
        component: administratorsettings,
        meta: ['系统管理', '管理员管理'],
      },
      {
        path: '/rolemanagement',
        component: rolemanagement,
        meta: ['系统管理', '角色管理'],
      },
      {
        path: '/accessthemenu',
        component: accessthemenu,
        meta: ['系统管理', '权限菜单'],
      },
      {
        path: '/informmanagement',
        component: informmanagement,
        meta: ['系统管理', '通知管理'],
      },
      {
        path: '/appreleased',
        component: appreleased,
        meta: ['系统管理', 'App发布'],
      }
    ]
  },
  
]
export default new Router({
  routes
})
