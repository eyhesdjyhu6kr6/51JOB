
<template>
  <div class="position-list">
    <div class="list">
        <router-link :to="'/position/'+item._id" class="list-item" v-for="item in list" :key="item._id">
            <div class="tit">
                <p class="name"><span>{{item.work_name}}</span></p>
                <p class="pay"><span>{{item.month_pay}}</span></p>
            </div>
            <div class="need">
                <p>
                    <span>{{item.type}}</span>|
                    <span>{{item.edu}}</span>
                </p>
                <em class="area">{{item.area}}</em>
            </div>
            <div class="opa" @click="indexapply(this);return false;">
                <p class="company">{{item.company}}</p>
                <button class="apply">申请</button>
            </div>
        </router-link>
        <router-link to="/position/123" class="more" v-if="data" >
            <i>更多推荐职位</i>
            <span class="iconfont iconjiantou-copy"></span>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        data: Boolean,
    },
    data() {
        return {
            id: 1,
            list: [
                // {id: 1, company: '金蝶软件（中国）有限公司', month_pay: '1-1.5万/月', work_name: '技术支持-财务（深圳)的撒的撒打算的萨达杀手大的飒飒', area: '深圳', type: '民营公司', edu: '本科'},
                // {id: 2, company: '金蝶软件（中国）有限公司', month_pay: '1-1.5万/月', work_name: '技术支持-财务（深圳)', area: '深圳', type: '民营公司', edu: '本科'},
                // {id: 3, company: '金蝶软件（中国）有限公司', month_pay: '1-1.5万/月', work_name: '技术支持-财务（深圳)', area: '深圳', type: '民营公司', edu: '本科'},
            ]
        }
    },
    methods: {
        // apply(){
        //     console.log(111)
        // }
    },
    created() {
        this.$axios.get('/api/app/workall?page_index='+1).then((res)=>{
            if(res.data.code == 0){
                this.list = res.data.data
                console.log(this.list);
                // this.id = this.list
            }
            else{

            }
            // console.log(res.data.data);
        })
    },
}
</script>

<style lang="scss" scoped>
.position-list{

}
.list{
    width: 100%;
    background-color: #fff;
    margin-bottom: 8px;
    .list-item{
        position: relative;
        margin: 0 16px;
        padding: 14px 0;
        border-top: 1px solid #f0f0f0;
        display: flex;
        flex-direction: column;
        align-items:flex-start;
        justify-content: center;
        line-height: 20px;
        .tit{
            width: 100%;
            font-weight: 700;
            font-size: 16px;
            color: #222;
            display: flex;
            justify-content: space-between;
            .name{
                width: 65%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .pay{
                font-weight: 700;
                font-size: 14px;
                color: #ff7e3e;
                width: 26%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span{
                    float: right;
                }
            }
        }
        .need{
            width: 100%;
            margin: 8px 0;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #868686;
            p>span{
                padding-right: 4px;
            }
        }
        .opa{
            width: 100%;
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            font-size: 14px;
            .company{
                color: #222;
            }
            .apply{
                width: 70px;
                height: 30px;
                border: none;
                color: #ff7e3e;
                font-size: 14px;
                font-weight: 700;
                background-color: #ffe8dc;
                border-radius: 30px;
            }
        }
    }
    .list-item:first-child{
        border-top: none;
    }
    .more{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 48px;
            margin: 0 16px;
            border-top: 1px solid #f0f0f0;
            font-size: 14px;
            color: #666;
            span{
                font-size: 12px;
                padding-left: 5px;
                color: #ccc;
            }
        }
}
</style>
