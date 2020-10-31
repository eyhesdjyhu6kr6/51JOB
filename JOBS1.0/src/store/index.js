import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: (JSON.parse(localStorage.getItem('userinfo'))) || {},
    // 是否登录
    isLogin: (!!localStorage.getItem('token')) || false,
    loginLoading:false,
    destPath: null,
    // 注册页码
    num:1,
    // 简历信息
    infoResume:[],
    // 用户名密码
    mailbox:'',
    // pass:'',
    // 定位
    city:localStorage.getItem('city')?localStorage.getItem('city'):"深圳市"
  },
  getters:{
    city(state){
      return state.city
    }
  },
  mutations: {
    setLogin(state, payload){
      state.isLogin = payload;
    },
    setLoginLoading(state, payload){
      state.loginLoading = payload;
    },
    setDestPath(state, payload){
      state.destPath = payload;
    },
    setUserInfo(state,payload){
      state.userinfo = payload;
    },
    change(state,c){
      state.city=c
    },
  },
  actions: {
    change(context,c){
      context.commit('change',c)
    },
    requestLogin(context, payload){
      context.commit('setLoginLoading', true);
      //登录成功，获得token。
      // 存在localStorage中
      const token = localStorage.getItem('token');
      context.commit('setLogin', true);
      context.commit('setUserInfo', payload);
      context.commit('setLoginLoading', false);

    }
  },
  modules: {
    home
  }
})
