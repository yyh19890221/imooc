//存放主要的交互逻辑js代码
//javascript模块化（package,类，方法）
var seckill = {

    URL: {
        now: function () {
            return '/seckill/time/now';
        },
        exposer: function (seckillId) {
            return '/seckill/' + seckillId + '/exposer';
        },
        execution: function (seckillId, md5) {
            return '/seckill/' + seckillId + '/' + md5 + '/execution';
        }
    },
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
            if (!seckill.validatePhone(userPhone)) {

                //绑定手机 控制输出
                var killPhoneModal = $('#killPhoneModal');
                killPhoneModal.modal({
                    show: true, //显示弹出层
                    backdrop: 'static', //禁止位置关闭
                    keyboard: false //关闭键盘事件
                });

                $('#killPhoneBtn').click(function () {
                    var inputPhone = $('#killPhoneKey').val();
                    console.log('inputPhone:' + inputPhone);
                    if (seckill.validatePhone(inputPhone)) {
                        //电话写入cookie(7天过期)
                        $.cookie('killPhone', inputPhone, {expires: 7, path: '/seckill'});
                        //验证通过　　刷新页面
                        window.location.reload();
                    } else {
                        $('#killPhoneMessage').hide().html('<label class="label label-danger">手机号错误！</label>').show(300);
                    }

                });
            }

            //已经登录
            //计时交互
            var startTime = params('startTime');
            var endTime = params('endTime');
            var seckillId = params('seckillId');
            $.get(seckill.URL.now(), {}, function (result) {
                if (result && result['success']) {
                    var nowTime = result['data'];
                    seckill.countDown(seckillId, nowTime, startTime, endTime);
                } else {
                    console.log('result' + result);
                }
            });
        }
    },

    countDown: function (sekillId, nowTime, startTime, endTime) {
        var sekillBox = $('#seckill-box');
        //事件判断
        if (nowTime > endTime) {
            //秒杀结束
            sekillBox.html('秒杀结束');
        } else if(nowTime < startTimeTime) {
            //秒杀未开始，计时事件绑定
            var killTime = new Date(startTime+1000);
            sekillBox.countdown(killTime,function(event){
                //时间格式
                var format = event.strftime('秒杀倒计时： D%天 H%时 M%分 %S秒');
                sekillBox.html(format);
            }).on('finish-countdown',function () {
                seckill.handlerSeckill(seckillId,sekillBox);
            });
        }else {
            //秒杀开始
            seckill.handlerSeckill(sekillId,sekillBox);
        }
    },

    handlerSekill:function (sekillId,node) {

    }


}