<template>
    <div class="location">
        <van-nav-bar
            title="地区选择"
            left-arrow
            @click-left="onClickLeft"
            fixed
        />
            
        <van-index-bar  highlight-color="#ff7e3e">
            <!-- <van-index-anchor index="1">标题1</van-index-anchor> -->
            <van-index-anchor index="A" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />

            <van-index-anchor index="B" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />

            <van-index-anchor index="C" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />

            <van-index-anchor index="D" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />

            <van-index-anchor index="E" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />

            <van-index-anchor index="F" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />

            <van-index-anchor index="G" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />
        </van-index-bar>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    props: {
        cityList: Array,
    },
    data() {
        return {
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
    },
    computed: {
    },
}
</script>

<style lang="scss">
.location{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    z-index: 100;
    padding-top: 46px;
}
.content{
    width: 100%;
    height: 100%;
}
.van-nav-bar {
    box-shadow: 0 0 3px 2px #ccc;
    z-index: 10;
}
.van-nav-bar .van-icon {
    color: #ccc;
    font-size: 22px;
}

</style>