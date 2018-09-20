//先加载config配置文件
require(["../../js/conf/config"],function(){
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

        //更换验证码
        $(".change").on("click",function(){
            $(".input img").attr("src","http://d.mizhe.com/checkcode/show2.html");
        })
        $(".change").on("mouseover",function(){
            $(".change").css({"cursor":"pointer"});
        });

        var obj = {
            "username" : JSON.parse($.cookie("user")).username,
            "password" : JSON.parse($.cookie("user")).password,
            "tel" : JSON.parse($.cookie("user")).tel
        }

        //登录验证
        $("input").eq(4).on("click",function(){
            if($("input").eq(0).val()==JSON.parse($.cookie("user")).tel && $("input").eq(1).val()==JSON.parse($.cookie("user")).password){
                if($("input[type='checkbox']").is(':checked')){
                     //用户信息cookie
                    $.cookie("user" , JSON.stringify(obj) ,{expires: 14,path:'/'});
                    //是否有登录-cookie
                    $.cookie("flag" , JSON.stringify(obj) ,{expires: 14,path:'/'});
                    window.location.replace("http://localhost:8080");
                }else{
                      $.cookie("flag" , JSON.stringify(obj) ,{path:'/'});
                      window.location.replace("http://localhost:8080");
                }
                
            }
            else {
                alert("手机号或密码错误！")
            }
        })


        //导入底部模板
        $("#foot").load("http://localhost:8080/pages/templates/copywrite.html");


        //放大镜效果
        
    })
})