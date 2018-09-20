require(["../../js/conf/config.js"],function(){
    require(["jquery","template", "ajaxMapping","swiper","cookie"],function($,template,urlmapping,Swiper,cookie){
        
        //导入头部模板
        $("#head").load("http://localhost:8080/pages/templates/head.html",function(){
             //退出登录
            $(".nar-fr .first").on("mouseenter",function(){
                $(".quit111").show();
            })
            $(".nar-fr .first").on("mouseleave",function(){
                $(".quit111").hide();
            })
            $(".nar-fr .first").on("click",".quit111",function(){
                $.cookie('flag',""); 
                window.location.replace("http://localhost:8080");
            })
        });
        //初始化头部
        function inithead(){
            var flag;
            if($.cookie("flag") != ""){
                flag = true;
                var username = JSON.parse($.cookie("user")).username;
            }else {
                flag = false;
            }
            $("#initheadtemplate").load("http://localhost:8080/pages/templates/inithead.html",function(){
            var htmlstr = template("inithead",{
                judge : flag,
                name : username
            });
            $("#head .nar .nar-fr .first").html(htmlstr);
        })
        }
        inithead();

       
        
        //导入右边侧边栏模板
        $("#rightbar").load("http://localhost:8080/pages/templates/rightbar.html");

        //猜你喜欢ajax
        $.ajax({
            url : urlmapping.guesslist,
            dataType : "jsonp",
            success : function(data){
                 var guesss = data.result.Products;
                $("#guesstemplate").load("http://localhost:8080/pages/templates/guess.html",function(){
                    var htmlstr = template("guess",{
                        list : guesss
                    });
                    $("#body .ft .guess-bd .list").html(htmlstr);
                })
            }
        })

        //数量减操作
        $(".product-list-wrap").on("click","span.reduce",function(){
            if($(this).siblings("input").val()<=0){
               $(this).css({cursor:"not-allowed"});
            }else{
                $(this).css({cursor:"pointer"});
                $(this).siblings("input").val(Number($(this).siblings("input").val())-1);
            $(this).parent().parent().siblings(".sum")
             .text(Number($(this).parent().parent().siblings(".sum").text())-Number($(this).parent().parent().siblings(".price").find("p").text()));
            }
            
        })

       //数量加操作
       $(".product-list-wrap").on("click","span.add",function(){
           $(this).siblings("input").val(Number($(this).siblings("input").val())+1);
           $(this).parent().parent().siblings(".sum")
            .text(Number($(this).parent().parent().siblings(".sum").text())+Number($(this).parent().parent().siblings(".price").find("p").text()));
       })

       //删除购物车商品
        $(".product-list-wrap").on("click",".operate",function(){
            $(this).parent().parent().parent().parent().remove();
            
        })



       //选择 ——全选操作
        $("i.hookCheckAllCheckbox").on("click",function(){

                $("i.bi-checkbox").toggleClass("i-selected");
                if(/i-selected/.test($("i.hookCheckAllCheckbox").get(0).className)){
                    var num=0;
                    $("input").each(function(){
                        num+=Number($(this).val());
                    })
                    $("em.num").text(num);
                    var total = 0;
                    $("div.sum").each(function(){
                        total += Number($(this).text());
                    })
                    $("em.total").text(total);
                    $("button.account-btn").addClass("kejiesuan");
                }else{
                    $("em.num").text(0);
                    $("em.total").text(0);
                    $("button.account-btn").removeClass("kejiesuan");
                }
            
        })
        
        //单件商品选择操作
        var isselect = false;
        $(".product-list-wrap").on("click","i.single",function(){
            //存在有已被选中的
            if(isselect){
                //如果此点击对象已被选中
                if(/i-selected/.test($(this).get(0).className)){
                    $("em.num").text(Number($("em.num").eq(1).text())-Number($(this).parent().siblings().find("input").val()));
                    $("em.total").text(Number($("em.total").text())-Number($(this).parent().siblings().find(".sum").text()));
                    if($("em.total").text() == 0){
                        $("button.account-btn").removeClass("kejiesuan");
                    }          
                }else{//如果此点击对象没有被选中
                    $("em.num").text(Number($(this).parent().siblings().find("input").val())+Number($("em.num").eq(1).text()));
                    $("em.total").text(Number($(this).parent().siblings().find(".sum").text())+Number($("em.total").text()));
                }

            }else{//没有被选中的商品
                    $("em.num").text(Number($(this).parent().siblings().find("input").val()));
                    $("em.total").text(Number($(this).parent().siblings().find(".sum").text()));
                    $("button.account-btn").addClass("kejiesuan");
            }
            
            $(this).toggleClass("i-selected");
            //判断是否有已被选中的商品
            $("i.single").each(function(){  
                if(/i-selected/.test(this.className)){ 
                    isselect = true;
                    return false;
                }else{ 
                    isselect = false;
                }
            })
            //如果所有商品被选中那么全选按钮也被选中
            var j;
            $("i.single").each(function(){
                if(!(/i-selected/.test(this.className))){
                    j = false ;return false;
                }else{
                    j = true;
                }
            })
            if(j){
                $("i.hookCheckAllCheckbox").addClass("i-selected");
            }else{
                $("i.hookCheckAllCheckbox").removeClass("i-selected");
            }
        })
        
        //初始化购物车商品列表
        var plist = JSON.parse($.cookie("plist")) ;
        $("#plisttemplate").load("http://localhost:8080/pages/templates/plist.html",function(){
            var htmlstr = template("plist",{
                list : plist
            })
            $(".product-list-wrap").html(htmlstr);
        }) 

        //导入底部模板
        $("#foot").load("http://localhost:8080/pages/templates/foot.html");


        //点击图片生成一个商品详情cookie,跳转到商品详情页面
        $(".ft .guess-bd ul").on("click","li",function(){
            var obj ={
                "productid" : $(this).find("img").attr("proid"),
                "imgsrc" : $(this).find("img").attr("src"),
                "productname" : $(this).find("p.title").text(),
                "productprice" : $(this).find("p.price").find("span").text()
            }
            $.cookie("details",JSON.stringify(obj),{path:'/'});
            window.location.replace("http://localhost:8080/pages/details/details.html");
            
        })
    })
})