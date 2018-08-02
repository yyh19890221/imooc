//存放主要的交互逻辑js代码
//javascript模块化（package,类，方法）
var seckill = {

    URL: {},
    //验证手机号
    validatePhone: function (phone) {
        if (phone && phone.length == 11 && !isNaN(phone)) {
            return true;
        } else {
            return false;
        }
    },
    //详情页初始化
    detail: {
        //详情页初始化
        init: function (params) {
            //手机验证和登录,计时交互
            //规划我们的交互流程
            //在cookie中查找手机号
            var userPhone = $.cookie('killPhone');
            //验证手机号
            var killPhoneModal = $('#killPhoneModal');
            killPhoneModal.modal({
                show: true, //显示弹出层
                backdrop: 'static', //禁止位置关闭
                keyboard: false //关闭键盘事件
            });

            $('#killPhoneBtn').click(function () {
                var inputPhone = $('#killPhoneKey').val();
                console.log('inputPhone:' + inputPhone);
                if(seckill.validatePhone(inputPhone)){
                    //电话写入cookie(7天过期)
                    $.cookie('killPhone',inputPhone,{expires:7,path:'/seckill'});
                    //验证通过　　刷新页面
                    window.location.reload();
                }else{
                    $('#killPhoneMessage').hide().html('<label class="label label-danger">手机号错误！</label>').show();
                }

            });

        }
    }

}