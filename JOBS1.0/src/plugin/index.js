import AppScroll from "../components/common/app-scroll";
import HomeFriend from '../components/common/home-friend';
import HomeFooter from '../components/common/home-footer';
import PositionList from '../components/common/position-list';
import SearchTop from '../components/common/search-top';


export default{
    install(Vue){

        // 滚动组件
        Vue.component("app-scroll", AppScroll);
        Vue.component('home-friend', HomeFriend);
        Vue.component('home-footer', HomeFooter);
        Vue.component('position-list', PositionList);
        Vue.component('search-top', SearchTop);

    }
}
