$(function ($) {
    $('#container').fullpage({
        // 设置每个切屏的背景颜色
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        // 取消竖直居中
        verticalCentered: false,
        navigation: true,
        // 滚动到某屏后触发
        afterLoad: function (link,index) {
            // console.log(index.index);
            // 为什么这个index不是参数，而是对象
            $('.section').eq(index.index).addClass('now');
        },
        // 离开某个页面时触发
        onLeave: function(origin, destination, direction){
           var currentIndex = $('.section').eq(origin.index);
           if(origin.index ==1 && destination.index == 2 ){
               currentIndex.addClass('leaved');
           }else if(origin.index ==2 && destination.index == 3 ){
                currentIndex.addClass('leaved');
           }else if (origin.index ==4 && destination.index == 5){
               currentIndex.addClass('leaved');
               // 保证与沙发与箱子同步
               $('.screen06 .box').addClass('show');
           }else if (origin.index ==5 && destination.index == 6){
               // $('.screen07 .star img')
               $('.screen07 .star').addClass('show');
               $('.screen07 .text').addClass('show');
               $('.screen07 .star img').each(function (i, item) {
                   // img opacity:0
                   // $(this).css('transition-delay', i*.4+'s');
               //    img display:none(没有过渡效果，只能用这个方法)
                   $(this).delay(i*.4*1000).fadeIn();
               })
           }
        },
        // 点击 more 进入下一页，插件完全渲染过后再调用方法
        afterRender: function(){
            //注册点击事件
            $('.more').on('click',function(){
                $.fn.fullpage.moveSectionDown();
            });
            $('.screen04 .cart').on('transitionend', function(){
                // find(),:last选择器都是新接触的
                $('.screen04 .address').show().find('img:last').fadeIn(2000);
                $('.screen04').addClass('show');
            });
            $('.screen08').on('mousemove', function (e) {
                // 手跟着鼠标一起动
                $('.screen08 .hand').css({
                    top: e.clientY-20,
                    left: e.clientX-180
                })
            }).find('.again').on('click', function () {
                // 清除前面加的类
                $('.now').removeClass('now');
                $('.leaved').removeClass('leaved');
                $('.show').removeClass('show');
                // 清除前面加的样式 []属性选择器，之前很陌生
                $('.content [style]').removeAttr('style');
                // 回到第一页
                $.fn.fullpage.moveTo(1);
            });
        },
        // 页面切换的时间，默认是700毫秒，没有单位的
        scrollingSpeed: 1000
    });
});