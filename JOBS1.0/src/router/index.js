import Router from 'vue-router'
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(Router)

const routes =[
    {
        path:'/home',
        name: 'home',
        component:()=>import('../views/Home')
    },
    {
        path:'/resume',
        name: 'resume',
        component:()=>import('../views/Resume'),
        children:[
            // {
            //     path:'preview',
            //     name:'preview',
            //     component:()=>import('../components/resume/preview'),
            // },
            {
                path:'modify',
                name:'modify',
                component:()=>import('../components/resume/modify'),
            }
        ]
    },
    {
        path:'/search',
        name: 'search',
        component:()=>import('../views/Search'),
        children:[
            {
                path: '/search',
                redirect: 'search_job'
            },
            {
                path:'search_job',
                name:'search_job',
                component:()=>import('../components/search/searchJob'),
            },
            {
                path:'search_nearby',
                name:'search_nearby',
                component:()=>import('../components/search/searchNearby'),
            },
            {
                path:'search_applicat',
                name:'search_applicat',
                component:()=>import('../components/search/searchApplicat'),
            },
            {
                path:'hot_position',
                name:'hot_position',
                component:()=>import('../components/search/hot-position'),
            },
            {
                path:'result',
                name:'result',
                component:()=>import('../components/search/result')
            },
            {
                path:'location',
                name:'location',
                component:()=>import('../components/search/location')
            }
        ]
    },
    {
        path:'/mine',
        name: 'mine',
        component:()=>import('../views/Mine'),
        children:[
            {
                path: 'account',
                name: 'account',
                component:()=>import('../components/mine/account'),
            },
            {
                path: 'favorite',
                name: 'favorite',
                component:()=>import('../components/mine/favorite'),
            },
            {
                path: 'apply',
                name: 'apply',
                component:()=>import('../components/mine/apply'),
            },
        ]
    },
    {
        path:'/download',
        name:'download',
        component:()=>import('../views/Download')
    },
    // {
    //     path:'/location',
    //     name:'location',
    //     component:()=>import('../views/Location')
    // },
    {
        path: '/login',
        name: 'login',
        component: ()=>import('../views/Login')
    },
    {
        path:'/register',
        component:()=>import('../views/Register'),
    },
    {
        // 创建简历
        path:'/step',
        name:'step',
        component:()=>import('../components/register/step'),
        children:[
            {
                path: '/step',
                redirect: 'one'
            },
            {
            path:'one',
            name:1,
            component:()=>import('../components/register/one'),
        },
        {
            path:'two',
            name:2,
            component:()=>import('../components/register/two'),
        },
        {
            path:'three',
            name:3,
            component:()=>import('../components/register/three'),
        }
        ]
    },
    {
        // 职位信息
        path: '/position/:id',
        name: 'position',
        component: ()=>import('../views/Position')
    },
    {
        // 公司信息
        path: '/company/:id',
        name: 'company',
        component: ()=>import('../views/Company')
    },
    {
        path: '**',
        redirect: '/home'
    }
]
const router = new Router({
    routes,
    mode:'history'
})

// 2.路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path=='/register'||to.path=='/login'||to.path=='/home'||to.path=='/download'||to.path=='/step/one'||to.path=='/step/two'||to.path=='/step/three'||to.path=='/search/search_job'||to.path=='/search/result'||to.path=='/search/search_nearby'){
        next()
    }else{
        axios.get('/api/app/info').then((res)=>{
            if(res.data.code == 0){
            localStorage.setItem("info", res.data.username);
              next();
            }
            else{
              next('/login');
            }
          }).catch(()=>{
            next('/login');
          });
    }
})

//全局前置守卫，所有的路由都会走到这里
// router.beforeEach((to, from, next) => {
//     //to : 从哪里来的url
//     if( store.state.islogin && ( to.path == '/login' || to.path == '/register' || to.path == '/home' ) ){
//         next();
//     }
//     else{
//         var token = localStorage.getItem('token');
//         if(!token){
                // 需要进入，但是现在没登录，没有权限
                // 先把路径保存下来
                // store.commit('setDestPath', to.path);
//             next('/login');
//         }
//         else{
//             next();
//         }
  
//         axios.get('/api/app/info').then((res)=>{
//             // console.log(res);
//             if(res.data.code == 0){
//                 store.commit('SET_USERNAME',res.data.username);
//                 store.commit('SET_PASSWORD',res.data.password);
//                 store.commit('SET_LOGINLOADING', true);
//                 next();
//             }
//             else{
//                 next('/login');
//             }
//         }).catch(()=>{
//             next('/login');
//         });
//     }
// })

export default router