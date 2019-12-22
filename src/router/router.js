export default [
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login')
    },
    {
        path: '/user/1/edit',
        name: 'Edit',
        component: () => import('@/views/users/Edit'),
        children:
            [
                {
                    //子路由的 path 为空值 ''，表示该页面作为默认子路由
                    path: '',
                    name: 'EditProfile',
                    component: () => import('@/views/users/Profile'),
                    //标识当前路由只有登录才能访问
                    //使用 meta 选项配置路由的元信息，其值可以是任意类型的数据，我们可以从路由对象中访问该值
                    meta: {auth: true}
                },
                {
                    path: '/user/1/edit_avatar',
                    name: 'EditAvatar',
                    component: () => import('@/views/users/Avatar'),
                    meta: {auth: true}
                },
                {
                    path: '/user/1/edit_password',
                    name: 'EditPassword',
                    component: () => import('@/views/users/Password'),
                    meta: {auth: true}
                }
            ]
    },
    {
        path: '/articles/create',
        name: 'Create',
        component: () => import('@/views/articles/Create'),
        meta: {auth: true}
    },
    //路径中articleId参数以冒号开头代表它能匹配任何值
    {
        path: '/articles/:articleId/content',
        name: 'Content',
        component: () => import('@/views/articles/Content')
    },
    //edit
    {
        path: '/articles/"articleId/edit',
        name: 'Edit',
        component: () => import('@/views/articles/Content')
    }
]
