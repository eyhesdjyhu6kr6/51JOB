<template>
  <div id="login" class="page subpage">

    <header class="header">
      <span class="back iconfont iconjiantou-copy-copy" @click="back"></span>
      <span class="logo" @click="home">
        <img src="../../public/images/home/logo.png" alt="">
        </span>
      <span class="register iconfont" @click="register">快速注册</span>
    </header>

    <div class="picture">
      <span class="iconfont iconUserSecret"></span>
      <p>51Job账号登录</p>
    </div>

    <div class="form">

      <div class="enter">
        <!-- 普通登录 -->
        <div class="common" v-if="isInter">
          <input type="text" placeholder="请输入手机号码/邮箱/用户名" class="user" v-model="user" @blur="hideClear('')">
          <i :class="['clear iconfont', {iconClose:isClearUser}]" @click="clear('')"></i>
        </div>
        <!-- 国际登录 -->
        <div class="inter" v-else>
          <!-- 前缀选择 -->
          <div class="nation">{{nation}}
            <span class=" iconxiangxia iconfont"></span>
          </div>
          <select class="nationlist" v-model="selected">
            <option :value="item.prefix"  v-for="(item,index) in nationlist" :key="index">{{item.cn + '+' +item.prefix}}</option>
          </select>

          <input type="text" placeholder="请输入手机号" class="user" v-model="user"  @blur="hideClear('')">
          <i :class="['clear iconfont', {iconClose:isClearUser}]" @click="clear('')"></i>
        </div>
        <!-- 密码 -->
        <div> 
          <input :type="[isShowPass?'text':'password']" placeholder="请输入密码" class="pass" v-model="pass"  @blur="hideClear('pw')">
          <div :class="['handlepass', {show:isShowPass}]" @click="handlePass"></div>
          <i :class="['clear pw iconfont', {iconClose:isClearPass}]" @click="clear('pw')"></i>
        </div>
      </div>

      <div class="sure">
        <div class="auto">
          <i :class='[{sureBtn:isAuto}]' @click='handleAuto'></i>
          自动登录
        </div>
        <div class="inter" v-if='isInter' @click="LoginStyleHandle">国际手机号登录</div>
        <div class="common" v-else @click="LoginStyleHandle">普通登录</div>
      </div>

      <button @click="submit">登录</button>
    </div>
    
    <div class="other-login">
      <div class="other-head">
        <span>其他登录方式</span>
      </div>
      <div class="other">
        <a href="https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&pt_3rd_aid=101495718&daid=383&pt_skey_valid=0&style=35&s_url=http%3A%2F%2Fconnect.qq.com&refer_cgi=authorize&which=&response_type=code&client_id=101495718&redirect_uri=https%3A%2F%2Flogin.51job.com%2Fopen%2Fqqcallback.php&state=0cfe7524f4aa202882766c3fbe883e4e">
          <img src="../../public/images/home/login_qq.png" alt="qq">
        </a>
        <a href="https://passport.weibo.cn/signin/login?entry=openapi&r=https%3A%2F%2Fapi.weibo.com%2Foauth2%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3D1477796435%26redirect_uri%3Dhttps%253A%252F%252Flogin.51job.com%252Fopen%252Fwbcallback.php%26state%3D0cfe7524f4aa202882766c3fbe883e4e">
          <img src="../../public/images/home/login_wb.png" alt="wb">
        </a>
      </div>
    </div>
    
    <footer class="footer">
      <p>
        <span>关于我们</span> -
        <span>帮助</span> -
        <span>意见</span>
      </p>
      <p>51Job.com(沪ICP备12015550)</p>
    </footer>

  </div>
</template>

<script>
import { Toast } from 'vant';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      isAuto: true,   // 自动登录
      isInter: true,    // 国际登录
      isShowPass: false, // 是否显示密码
      isClearUser: false, // 是否显示清空图标
      isClearPass: false, // 是否显示清空图标
      user: '',
      pass: '',
      selected: '86', // 国际手机号前缀
      nationlist: [
    { prefix: '86', en: 'China', cn: '中国大陆' },
    { prefix: '852', en: 'HK', cn: '中国香港' },
    { prefix: '853', en: 'MO', cn: '中国澳门' },
    { prefix: '886', en: 'TW', cn: '中国台湾' },
    { prefix: '93', en: 'Afghanistan', cn: '阿富汗' },
    { prefix: '376', en: 'Andorra', cn: '安道尔' },
    { prefix: '54', en: 'Argentina', cn: '阿根廷' },
    { prefix: '61', en: 'Australia', cn: '澳大利亚' },
    { prefix: '43', en: 'Austria', cn: '奥地利' },
    { prefix: '1242', en: 'Bahamas', cn: '巴哈马' },
    { prefix: '973', en: 'Bahrain', cn: '巴林' },
    { prefix: '880', en: 'Bangladesh', cn: '孟加拉国' },
    { prefix: '1246', en: 'Barbados', cn: '巴巴多斯' },
    { prefix: '375', en: 'Belarus', cn: '白俄罗斯' },
    { prefix: '32', en: 'Belgium', cn: '比利时' },
    { prefix: '1441', en: 'Bermuda', cn: '百慕大' },
    { prefix: '591', en: 'Bolivia', cn: '玻利维亚' },
    { prefix: '55', en: 'Brazill', cn: '巴西' },
    { prefix: '673', en: 'Brunei', cn: '文莱' },
    { prefix: '359', en: 'Bulgaria', cn: '保加利亚' },
    { prefix: '257', en: 'Burundi', cn: '布隆迪' },
    { prefix: '855', en: 'Cambodia', cn: '柬埔寨' },
    { prefix: '237', en: 'Cameroon', cn: '喀麦隆' },
    { prefix: '1', en: 'Canada', cn: '加拿大' },
    { prefix: '236', en: 'Central African Republic', cn: '中非共和国' },
    { prefix: '235', en: 'Chad', cn: '乍得' },
    { prefix: '56', en: 'Chile', cn: '智利' },
    { prefix: '57', en: 'Colombia', cn: '哥伦比亚' },
    { prefix: '269', en: 'Comoros', cn: '科摩罗' },
    { prefix: '242', en: 'Republic of the Congo', cn: '刚果共和国' },
    { prefix: '682', en: 'Cook Islands', cn: '库克群岛' },
    { prefix: '506', en: 'Costa Rica', cn: '哥斯达黎加' },
    { prefix: '225', en: 'Cote divoire', cn: '科特迪沃' },
    { prefix: '385', en: 'Croatia', cn: '克罗地亚' },
    { prefix: '53', en: 'Cuba', cn: '古巴' },
    { prefix: '357', en: 'Cyprus', cn: '塞浦路斯' },
    { prefix: '420', en: 'Czech Republic', cn: '捷克共和国' },
    { prefix: '45', en: 'Denmark', cn: '丹麦' },
    { prefix: '253', en: 'Djibouti', cn: '吉布提' },
    { prefix: '1767', en: 'Dominica', cn: '多米尼加' },
    { prefix: '1809', en: 'Dominican Republic', cn: '多米尼加共和国' },
    { prefix: '593', en: 'Ecuador', cn: '厄瓜多尔' },
    { prefix: '20', en: 'Egypt', cn: '埃及' },
    { prefix: '251', en: 'Ethiopia', cn: '埃塞俄比亚' },
    { prefix: '298', en: 'Faroe Islands', cn: '法罗群岛' },
    { prefix: '679', en: 'Fiji', cn: '斐济' },
    { prefix: '358', en: 'Finland', cn: '芬兰' },
    { prefix: '33', en: 'France', cn: '法国' },
    { prefix: '241', en: 'Gabon', cn: '加蓬' },
    { prefix: '220', en: 'Gambia', cn: '冈比亚' },
    { prefix: '995', en: 'Georgia', cn: '格鲁吉亚' },
    { prefix: '94', en: 'Germany', cn: '德国' },
    { prefix: '233', en: 'Ghana', cn: '加纳' },
    { prefix: '350', en: 'Gibraltar', cn: '直布罗陀' },
    { prefix: '30', en: 'Greece', cn: '希腊' },
    { prefix: '299', en: 'Greenland', cn: '格陵兰' },
    { prefix: '1473', en: 'Grenada', cn: '格林纳达' },
    { prefix: '590', en: 'Guadeloupe', cn: '瓜德罗普' },
    { prefix: '1671', en: 'Guam', cn: '关岛' },
    { prefix: '502', en: 'Guatemala', cn: '危地马拉' },
    { prefix: '240', en: 'Guinea', cn: '几内亚' },
    { prefix: '44', en: 'Guernsey', cn: '根西' },
    { prefix: '224', en: 'Guinea', cn: '几内亚' },
    { prefix: '592', en: 'Guyana', cn: '圭亚那' },
    { prefix: '509', en: 'Haiti', cn: '海地' },
    { prefix: '504', en: 'Honduras', cn: '洪都拉斯' },
    { prefix: '852', en: 'Hong Kong', cn: '香港' },
    { prefix: '95', en: 'Myanmar', cn: '缅甸' },
    { prefix: '36', en: 'Hungary', cn: '匈牙利' },
    { prefix: '354', en: 'Iceland', cn: '冰岛' },
    { prefix: '91', en: 'Indea', cn: '印度' },
    { prefix: '62', en: 'Indonesia', cn: '印度尼西亚' },
    { prefix: '98', en: 'Iran', cn: '伊朗' },
    { prefix: '964', en: 'Iraq', cn: '伊拉克' },
    { prefix: '353', en: 'Ireland', cn: '爱尔兰' },
    { prefix: '44', en: 'Isle of Man', cn: '马恩岛' },
    { prefix: '972', en: 'Israel', cn: '以色列' },
    { prefix: '93', en: 'Italy', cn: '意大利' },
    { prefix: '1876', en: 'Jamaica', cn: '牙买加' },
    { prefix: '81', en: 'Japan', cn: '日本' },
    { prefix: '44', en: 'Jersey', cn: '泽西岛' },
    { prefix: '962', en: 'Jordan', cn: '约旦' },
    { prefix: '7', en: 'Kazeakhstan', cn: '哈萨克斯坦' },
    { prefix: '254', en: 'Kenya', cn: '肯尼亚' },
    { prefix: '383', en: 'Kosovo', cn: '科索沃' },
    { prefix: '965', en: 'Kuwait', cn: '科威特' },
    { prefix: '996', en: 'Kyrgyzstan', cn: '吉尔吉斯斯坦' },
    { prefix: '856', en: 'Laos', cn: '老挝' },
    { prefix: '371', en: 'Latvia', cn: '拉脱维亚' },
    { prefix: '961', en: 'Lebanon', cn: '黎巴嫩' },
    { prefix: '266', en: 'Lesotho', cn: '莱索托' },
    { prefix: '231', en: 'Liberia', cn: '利比里亚' },
    { prefix: '218', en: 'Libya', cn: '利比亚' },
    { prefix: '423', en: 'Liechtenstein', cn: '列支敦士登' },
    { prefix: '370', en: 'Lithuania', cn: '立陶宛' },
    { prefix: '352', en: 'Luxembourg', cn: '卢森堡' },
    { prefix: '853', en: 'Macao', cn: '澳门' },
    { prefix: '389', en: 'Macedonia', cn: '马其顿' },
    { prefix: '261', en: 'Madagascar', cn: '马达加斯加' },
    { prefix: '265', en: 'Malawi', cn: '马拉维' },
    { prefix: '60', en: 'Malaysia', cn: '马来西亚' },
    { prefix: '960', en: 'Maldives', cn: '马尔代夫' },
    { prefix: '596', en: 'Martinique', cn: '马提尼克' },
    { prefix: '222', en: 'Mauritania', cn: '毛里塔尼亚' },
    { prefix: '230', en: 'Mauritius', cn: '毛里求斯' },
    { prefix: '262', en: 'Mayotte', cn: '马约特' },
    { prefix: '52', en: 'Mexico', cn: '墨西哥' },
    { prefix: '373', en: 'Moldova', cn: '摩尔多瓦' },
    { prefix: '377', en: 'Monaco', cn: '摩纳哥' },
    { prefix: '976', en: 'Mongolia', cn: '蒙古' },
    { prefix: '382', en: 'Montenegro', cn: '黑山' },
    { prefix: '212', en: 'Morocco', cn: '摩洛哥' },
    { prefix: '264', en: 'Namibia', cn: '纳米比亚' },
    { prefix: '977', en: 'Nepal', cn: '尼泊尔' },
    { prefix: '31', en: 'Netherlands', cn: '荷兰' },
    { prefix: '599', en: 'Netherlands Antillse', cn: '荷属安的列斯' },
    { prefix: '687', en: 'New Caledonia', cn: '新喀里多尼亚' },
    { prefix: '64', en: 'NewZealand', cn: '新西兰' },
    { prefix: '505', en: 'Nicaragua', cn: '尼加拉瓜' },
    { prefix: '227', en: 'Niger', cn: '尼日尔' },
    { prefix: '234', en: 'Nigeria', cn: '尼日利亚' },
    { prefix: '47', en: 'Norway', cn: '挪威' },
    { prefix: '968', en: 'Oman', cn: '阿曼' },
    { prefix: '92', en: 'Pakistan', cn: '巴基斯坦' },
    { prefix: '970', en: 'Palestinian', cn: '巴勒斯坦' },
    { prefix: '507', en: 'Panama', cn: '巴拿马' },
    { prefix: '51', en: 'Peru', cn: '秘鲁' },
    { prefix: '63', en: 'Philippines', cn: '菲律宾' },
    { prefix: '48', en: 'Poland', cn: '波兰' },
    { prefix: '351', en: 'Portugal', cn: '葡萄牙' },
    { prefix: '1', en: 'PuertoRico', cn: '波多黎各' },
    { prefix: '974', en: 'Qotar', cn: '库塔' },
    { prefix: '262', en: 'Reunion', cn: '留尼汪' },
    { prefix: '40', en: 'Romania', cn: '罗马尼亚' },
    { prefix: '7', en: 'Russia', cn: '俄罗斯' },
    { prefix: '250', en: 'Rwanda', cn: '卢旺达' },
    { prefix: '684', en: 'Samoa Eastern', cn: '萨摩亚东部' },
    { prefix: '685', en: 'Samoa Western', cn: '萨摩亚西部' },
    { prefix: '378', en: 'San Marino', cn: '圣马力诺' },
    { prefix: '239', en: 'Sao Tome and Principe', cn: '圣多美和普林西比' },
    { prefix: '966', en: 'Saudi Arabia', cn: '沙特阿拉伯' },
    { prefix: '221', en: 'Senegal', cn: '塞内加尔' },
    { prefix: '381', en: 'Serbia', cn: '塞尔维亚' },
    { prefix: '248', en: 'Seychelles', cn: '塞舌尔' },
    { prefix: '232', en: 'Sierra Leone', cn: '塞拉利昂' },
    { prefix: '65', en: 'Singapore', cn: '新加坡' },
    { prefix: '421', en: 'Slovakia', cn: '斯洛伐克' },
    { prefix: '386', en: 'Slovenia', cn: '斯洛文尼亚' },
    { prefix: '27', en: 'South Africa', cn: '南非' },
    { prefix: '82', en: 'Korea', cn: '韩国' },
    { prefix: '34', en: 'Spain', cn: '西班牙' },
    { prefix: '94', en: 'SriLanka', cn: '斯里兰卡' },
    { prefix: '1869', en: 'St Kitts and Nevis', cn: '圣基茨和尼维斯' },
    { prefix: '1758', en: 'St.Lucia', cn: '圣卢西亚' },
    { prefix: '1784', en: 'St.Vincent', cn: '圣文森特' },
    { prefix: '249', en: 'Sudan', cn: '苏丹' },
    { prefix: '597', en: 'Suriname', cn: '苏里南' },
    { prefix: '268', en: 'Swaziland', cn: '斯威士兰' },
    { prefix: '46', en: 'Sweden', cn: '瑞典' },
    { prefix: '41', en: 'Switzerland', cn: '瑞士' },
    { prefix: '963', en: 'Syria', cn: '叙利亚' },
    { prefix: '886', en: 'Taiwan', cn: '台湾' },
    { prefix: '992', en: 'Tajikistan', cn: '塔吉克斯坦' },
    { prefix: '255', en: 'Tanzania', cn: '坦桑尼亚' },
    { prefix: '66', en: 'Thailand', cn: '泰国' },
    { prefix: '670', en: 'Timor Leste', cn: '东帝汶' },
    { prefix: '90', en: 'Turkey', cn: '土耳其' },
    { prefix: '993', en: 'Turkmenistan', cn: '土库曼斯坦' },
    { prefix: '1649', en: 'Turks and Caicos Islands', cn: '特克斯和凯科斯群岛' },
    { prefix: '256', en: 'Uganda', cn: '乌干达' },
    { prefix: '380', en: 'Ukraine', cn: '乌克兰' },
    { prefix: '971', en: 'United Arab Emirates', cn: '阿拉伯联合酋长国' },
    { prefix: '44', en: 'United Kingdom', cn: '英国' },
    { prefix: '1', en: 'USA', cn: '美国' },
    { prefix: '598', en: 'Uruguay', cn: '乌拉圭' },
    { prefix: '998', en: 'Uzbekistan', cn: '乌兹别克斯坦' },
    { prefix: '678', en: 'Vanuatu', cn: '瓦努阿图' },
    { prefix: '58', en: 'Venezuela', cn: '委内瑞拉' },
    { prefix: '84', en: 'Vietnam', cn: '越南' },
    { prefix: '1340', en: 'Virgin Islands', cn: '维尔京群岛' },
    { prefix: '967', en: 'Yemen', cn: '也门' },
    { prefix: '260', en: 'Zambia', cn: '赞比亚' },
    { prefix: '263', en: 'Zimbabwe', cn: '津巴布韦' }
],
    }
  },
  computed: {
    // 手机号前缀
    nation() {
      return '+' + this.selected;
    },
    ...mapState({
      loading: state=>state.loginLoading,
    })
  },
  watch: {
    // 操作clear图标
    user(newval, oldval) {
      if (newval != '' && oldval != ''){
        this.isClearUser = true;
      }
      else{
        this.isClearUser = false;
      }
    },
    pass(newval, oldval) {
      if (newval != '' && oldval != ''){
        this.isClearPass = true;
      }
      else{
        this.isClearPass = false;
      }
    },
    // loading
    loading(newVal){
      console.log(newVal);
      if(newVal){
        Toast.loading({
          message: '登录中...',
          forbidClick: true,
          duration: 0
        });
      }else{
        Toast.clear();
      }
    }
  },
  beforeDestroy(){
    console.log('destroyed....');
    Toast.clear();
  },
  methods: {
    back(){
      this.$router.back();
    },
    home(){
      this.$router.push('/home');
    },
    register(){
      this.$router.push('/register');
    },
    
    // 登录方式
    LoginStyleHandle(){
      this.isInter = !this.isInter;
    },
    
    // 密码的显示隐藏
    handlePass(){
      this.isShowPass = !this.isShowPass;
    },
    
    // clear图标的显示隐藏
    hideClear(opa){
      if(opa == 'pw'){
        this.isClearPass = false;
      }
      else{
        this.isClearUser = false;
      }
    },

    // 清空输入框,隐藏clear图标
    clear(opa){
      // 密码
      if(opa == 'pw'){
        this.pass = '';
        this.isClearPass = false;
      }
      else{
        this.user = '';
        this.isClearUser = false;
      }
    },

    // 自动登录
    handleAuto(){
      this.isAuto = !this.isAuto;
    },

    // 校验
    verify(){
      
      // 密码 
      var reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      var result1 = reg1.test(this.pass);

      // 手机 
      var reg2 = /^\d{11}$/;
      var result2 = reg2.test(this.user);

      // 邮箱 
      var reg3 = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g;
      var result3 = reg3.test(this.user);
      return result1 && (result2 || result3);
    },

    // 提交
    submit(){
      if (this.verify()){
        // 发起请求验证
        this.$axios.post('/api/app/login', {
          username: this.user,
          password: this.pass,
        }).then((res)=>{
          if (res.data.code == 0){
            // Toast.loading({
            //   message: '登录中...',
            //   forbidClick: true,
            //   duration: 500
            // });
            localStorage.setItem('token' , res.data.token);
            localStorage.setItem('isAuto' , res.data.isAuto);
            localStorage.setItem('userinfo',JSON.stringify({user:this.user, pass:this.pass,phone:this.user}));
            this.$store.dispatch('requestLogin', {user:this.user,phone:this.user,password:this.pass});
            console.log(JSON.parse(localStorage.getItem('userinfo')));

            // 自动登录
             if(!this.isAuto){
              this.user = '';
              this.pass = '';
            } 

            setTimeout(()=>{
              this.$router.push('/');
            },1000);
          }
          else{
            Toast.fail('账号或密码错误');
          }
        });
      }
      else{
        Toast.fail('账号或密码错误');
      }
    },

  },

  created() {
    // 获取数据,自动登录
    this.user = this.$store.state.username;
    this.pass = this.$store.state.password;
    this.isAuto = localStorage.getItem('isAuto');
    // console.log(this.$store.state.username);
  },

  // 国际手机号登录

}
</script>

<style lang="scss" scoped>
#login{
  width: 100%;
  height: 100%;
  background-color: #eee;
}
.header{
  padding: 18px 15px 32px;
  height: 33px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  .back{
    color: #ccc;
    font-size: 20px;
  }
  .logo{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 66px;
    height: 27px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .register{
    font-size: 18px;
    color: #ff7e3e;
  }
}
.picture{
  text-align: center;
  height: 92px;
  padding-top: 4px;
  line-height: 36px;
  span{
    font-size: 46px;
    color: #aaa;
  }
  p{
    font-size: 16px;
    color: #3e3e3e;
  }
}
.form{
  margin: 0 15px;
  box-sizing: border-box;
  .enter{
    margin-bottom: 20px;
    &>div{
      position: relative;
    }
    input{
      margin-right: 15px;
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      font-size: 14px;
      border: 1px solid #a0a0a0;
      padding-left: 10px;
    }
    .inter{
      width: 100%;
      height: 50px;
      background-color: #fff;
      border: 1px solid #a0a0a0;
      box-sizing: border-box;
      .nation{
        position: absolute;
        top: 6px;
        left: 2px;
        width: 98px;
        height: 36px;
        line-height: 36px;
        z-index: 2;
        background-color: #fff;
        text-align: center;
        border-right: 1px solid #aaa;
        font-size: 14px;
        color: #333;
        span{
          padding-left: 6px;
          font-size: 12px;
          color: #999;
        }
      }
      .nationlist{
        position: absolute;
        width: 98px;
        height: 30px;
        left: 2px;
        margin: 10px 0;
        padding: 0 10px;
        font-size: 14px;
        border: none;
        outline: none;
        z-index: 3;
        background-color: #fff;
        opacity: 0;
      }
      .user{
        margin-left: 105px;
        width: 50%;
        height: 46px;
        border: none;
      }
    }
    
    .pass{
      border-top: none;
    }
    .handlepass{
      background: url(../../public/images/home/login_icon.png);
      background-size: auto 100px;
      position: absolute;
      width: 55px;
      height: 28px;
      bottom: 12px;
      right: 10px;
      background-position: -1px -53px;
    }
    .show{
      background-position: 0px -23px;
    }
    .clear{
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      right: 0px;
      top: 0px;
      color: #aaa;
    }
    .pw{
      right: 64px;
    }
  }
  .sure{
  height: 38px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
    .auto{
      padding-left: 20px;
      position: relative;
      color: #999;
      i{
        position: absolute;
        top: -1px;
        left: 0px;
        width: 20px;
        height: 20px;
        background: url(../../public/images/home/login_icon.png) no-repeat;
        background-size: auto 100px;
        background-position: 0px 0px;
      }
      .sureBtn{
        background-position: -21px 0px;
      }
    }
    .inter, .common{
      color: #222;
    }
  }
  button{
    width: 100%;
    height: 50px;
    background-color: #ff7e3e;
    border: none;
    color: #fff;
    font-size: 16px;
  }
}
.other-login{
  margin: 100px 15px 0;
  border-top: 1px solid #c1c0c0;
  position: relative;
  .other-head{
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 110px;
    height: 20px;
    background-color: #eee;
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .other{
    height: 50px;
    line-height: 50px;
    margin-top: 25px;
    padding: 0 40px;
    display: flex;
    justify-content: space-around;
    img{
      width: 45px;
      height: 45px;
    }
  }
}
footer{
  margin: 30px 15px 0;
  padding-top: 10px;
  border-top: 1px dotted #ddd;
  font-size: 14px;
  color: #777;
  text-align: center;
  line-height: 26px;
}
</style>