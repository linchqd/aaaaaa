import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { permission: 'get_dashboard' },
    children: [
      { path: 'accounts/users', redirect: { 'name': 'users_userList' }, meta: { permission: 'user_get_list' } },
      { path: 'accounts/users/userList', name: 'users_userList', component: () => import('../components/accounts/users/UserList.vue'), meta: { permission: 'user_get_list' } },
      { path: 'accounts/users/userEdit/:name', name: 'users_userEdit', component: () => import('../components/accounts/users/UserManage.vue'), meta: { permission: 'user_get_list&user_update_all|user_get_list&user_modify' } },
      { path: 'accounts/users/userInfo/:name', name: 'users_userInfo', component: () => import('../components/accounts/users/UserManage.vue'), meta: { permission: 'user_get_list&user_update_all' } },
      { path: 'accounts/groups', redirect: { 'name': 'groups_groupList' }, meta: { permission: 'group_get_list' } },
      { path: 'accounts/groups/groupList', name: 'groups_groupList', component: () => import('../components/accounts/groups/GroupList.vue'), meta: { permission: 'group_get_list' } },
      { path: 'accounts/groups/groupEdit/:name', name: 'groups_groupEdit', component: () => import('../components/accounts/groups/GroupManage.vue'), meta: { permission: 'group_get_list&group_update|group_get_list&group_modify' } },
      { path: 'accounts/groups/groupInfo/:name', name: 'groups_groupInfo', component: () => import('../components/accounts/groups/GroupManage.vue'), meta: { permission: 'group_get_list&group_update' } },
      { path: 'accounts/roles', redirect: { 'name': 'roles_roleList' }, meta: { permission: 'role_get_list' } },
      { path: 'accounts/roles/roleList', name: 'roles_roleList', component: () => import('../components/accounts/roles/RoleList.vue'), meta: { permission: 'role_get_list' } },
      { path: 'accounts/roles/roleEdit/:name', name: 'roles_roleEdit', component: () => import('../components/accounts/roles/RoleManage.vue'), meta: { permission: 'role_get_list&role_update|role_get_list&role_modify' } },
      { path: 'accounts/roles/roleInfo/:name', name: 'roles_roleInfo', component: () => import('../components/accounts/roles/RoleManage.vue'), meta: { permission: 'role_get_list&role_update' } },
      { path: 'accounts/permissions', name: 'permissions', component: () => import('../components/accounts/permissions/Permissions.vue'), meta: { permission: 'permission_get_list' } }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/deny',
    name: 'deny',
    component: () => import('../views/Deny.vue')
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('../views/404.vue')
  },
  {
    path: '*',
    redirect: { 'name': 'dashboard' }
  }
]

const router = new VueRouter({
  routes
})

export default router
