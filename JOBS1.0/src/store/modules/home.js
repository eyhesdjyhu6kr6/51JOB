import http from '../../api/http';
import {
    BANNER_API
} from '../../api/url';

export default{
    namespaced: true,
    state:{
        banner: {},
        bannerLoadding: false,
        cityList: [],
        cityListLoading: false,
    },
    getters: {
        loadding(state){
            return state.bannerLoadding || state.cityListLoadding;
            // return state.bannerLoadding;
        }
    },
    mutations: {
        // 设置状态
        setBannerLoadding(state, payload){
            state.bannerLoadding = payload;
        },
        setBanner(state, payload){
            state.banner = payload;
        },
        setCityListLoadding(state, payload){
            state.cityListLoadding = payload;
        },
        setCityList(state, payload){
            state.cityList = payload;
        },
    },
    actions: {
        async requestBanner(context){
            context.commit('setBannerLoadding',true);
            const {data:{data}} = await http.get(BANNER_API);
            const newData = data.cityList.cityList;
            // console.log(newData);
            context.commit('setBanner', data);
            context.commit('setBannerLoadding', false);
            context.commit('setCityList', newData);
            context.commit('setCityListLoadding', false);
        },
        // async requestLogin(context){
        //     context.commit('setLoginLoading', true);
        // }
    }
}
