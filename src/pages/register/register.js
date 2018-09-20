require(["../../js/conf/config.js"],function(){
    //在加载各个模块
    require(["jquery","cookie"],function($,cookie) {
        $("#head .right span").on("mouseover",function(){  
            $(this).find("a").css({"color":"#c33"}).end().siblings().show();
        })
        $("#head .right span").on("mouseout",function(){  
            $(this).find("a").css({"color":"#999"}).end().siblings().hide();
        })
        $(".downlist").on("mouseover",function(){  
            $(this).show();
        })
        $(".downlist").on("mouseout",function(){  
            $(this).hide();
        })

        //表单验证
            $("input:not(:last)").on("focus",function(){
                var index = $(this).parent().index();
                switch (index){
                    case 0 : $(this).siblings("span").text("输入有效的手机号码");break;
                    case 1 : $(this).siblings("span").text("输入有效的验证码");break;
                    case 2 : $(this).siblings("span").text("输入有效的短信验证码");break;
                    case 3 : $(this).siblings("span").text("6~16个字符,请使用英文字母(区分大小写),符号或数字");break;
                    case 4 : $(this).siblings("span").text("确认您上面输入的密码");break;
                    case 5 : $(this).siblings("span").text("4~20个字符,可使用英文、下划线。注册后用户名不能修改");break;
                }
                $(this).siblings("span").css({display:"inline-block",background: " #f2f2f2",color: "#666"});
            })
            $("input").on("blur",function(){
                $(this).siblings("span").css({ background: "#eb5e00",color: "#fff"});
                var index = $(this).parent().index();
                //手机号正则
                var reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
                //密码正则
                var reg2 = /^\S{6,16}$/;
                //用户名正则
                var reg3 = /^[a-zA-Z_]{4,20}$/;
                switch (index){
                    //手机号验证
                    case 0:
                        if($(this).val() == ""){
                            $(this).siblings("span").text("请输入手机号码");
                        } else if(!reg1.test($(this).val())){
                            $(this).siblings("span").text("手机号格式不正确");
                        }else{
                            $(this).siblings("span").hide();
                        }
                        break;
                    //图片验证码
                    case 1:
                        if($(this).val() == ""){
                            $(this).siblings("span").text("请输入验证码");
                        }else {
                            $(this).siblings("span").hide();
                        }
                        break;
                    //短信验证
                    case 2:
                        if($(this).val() == ""){
                            $(this).siblings("span").text("请输入验证码");
                        }else{
                            $(this).siblings("span").hide();
                        }
                        break;
                    //登录密码验证 
                    case 3:
                        if($(this).val() == ""){
                            $(this).siblings("span").text("请输入密码");
                        }else if(!reg2.test($(this).val())){
                            $(this).siblings("span").text("密码格式不正确");
                        }else{
                            $(this).siblings("span").hide();
                        }
                        break;
                    //确认密码验证
                    case 4:
                        if($(this).val() == ""){
                            $(this).siblings("span").text("请输入确认密码");
                        }else if($(this).val() != $(".item").eq(3).find("input").val()){
                            $(this).siblings("span").text("确认密码错误");
                        }else{
                            $(this).siblings("span").hide();
                        }
                        break;
                    case 5: 
                        if($(this).val() == ""){
                            $(this).siblings("span").text("请输入用户名");
                        }else if(!reg3.test($(this).val())){
                            $(this).siblings("span").text("用户名不符合格式");
                        }else{
                            $(this).siblings("span").hide();
                        }
                        break;
                }
            })
    
        //将注册信息保存到cookie中
       $(".btn").on("click",function(){
           //判断是否同意协议
           if(!$("input[type='checkbox']").is(':checked')){
            $("input[type='checkbox']").siblings("span").css({display:"inline-block"});
            return;
           }else{
                $("input[type='checkbox']").siblings("span").hide();
           }
           var obj = {
               "username" : $(".item").eq(5).find("input").val(),
               "password" : $(".item").eq(4).find("input").val(),
               "tel" : $(".item").eq(0).find("input").val()
           }
           //用户信息cookie
           $.cookie("user" , JSON.stringify(obj) ,{path:'/'});
           //是否有登录-cookie
           $.cookie("flag" , JSON.stringify(obj) ,{path:'/'});
           window.location.replace("http://localhost:8080");
       })
        
        //导入底部模板
        $("#foot").load("http://localhost:8080/pages/templates/copywrite.html");
    })
})