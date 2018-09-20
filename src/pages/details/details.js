//先加载配置文件
require(["../../js/conf/config"],function(){
    //在加载各个模块
    require(["jquery","template","ajaxMapping","swiper","cookie"],function($,template,urlmapping,Swiper,cookie){
        //导入头部
        $("#head").load("http://localhost:8080/pages/templates/head.html",function(){
             //头部退出
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
        //导入右部侧边栏
        $("#rightbar").load("http://localhost:8080/pages/templates/rightbar.html");

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


        //扫码
        $(".product-wrap").on("mouseenter",".code" ,function(){
            $(".scan-code").show();
        })
        $(".product-wrap").on("mouseleave",".code",function(){
            $(".scan-code").hide();
        })

        //推荐搜索ajax
        $.ajax({
            url: urlmapping.searchlist,
            dataType: "jsonp",
            success: function(data) {
                var searches = data.Data.KeywordList;
                $("#searchtemplate").load("http://localhost:8080/pages/templates/recomsearch.html",function() {
                    var htmlstr = template("search", {
                    list: searches
                    });
                    $(".search-recomend dl").html(htmlstr);
                }
                );
            }
        });

        //搜索提示ajax
        $(".search").on("input", function() {
            $(".search-recomend").hide();
            $.ajax({
            url: `https://www.ymatou.com/products/api/getPreKeywordList?query=${this.value}`,
            dataType: "jsonp",
            success: function(data) {
                console.log(data);
                $("#suggesttemplate").load("http://localhost:8080/pages/templates/suggest.html",function() {
                    var suggests = data.result.Keywords;
                    if (suggests == undefined) {
                    $(".suggest").hide();
                    return;
                    }
                    var htmlstr = template("suggest", {
                    list: suggests
                    });
                    $(".suggest").html(htmlstr);
                    $(".suggest").show();
                }
                );
            }
            });
        });
  
        $(".search").on("focus click", function() {
            $(".search-recomend").show();
        });
        $(".search-recomend").on("mouseleave", function() {
            $(".search-recomend").hide();
            $(".search").blur();
        });
        $(".suggest").on("mouseente", "li", function() {
            $(this)
            .css({ background: "#dedede" })
            .siblings()
            .css({ background: "white" });
        });
        $(".suggest").on("mousedown","li",function(){
            $(".search").val($(this).text());
            $(".suggest").hide();
        })
        $(".suggest").on("mouseleava",function(){
            $(".suggest").hide();
            $(".search").blur();
        })
        
        $(".search").on("blur",function(){
            $(".suggest").hide();
            $(".search-recomend").hide();
        })
  
        //分类ajax
        $.ajax({
            url :urlmapping.categorylist,
            dataType: "jsonp",
            success : function(data){
                var categorys = data.result;
                $("#categorytemplate").load("http://localhost:8080/pages/templates/category.html",function(){
                    var htmlstr = template("category",{
                        list:categorys
                    })
                    $(".category-wrapper .category").html(htmlstr);
                })
            }
        })
  
        //鼠标滑入分类菜单项
        $("#classfiy").on("mouseover",function(){
            $("#classfiy i").css({
                background:"url(https://s2.ymatou.com/home/e442d154d1094b967744bfaab48efc37.png)",
                color :"red",
            });
            $("#classfiy").addClass("select");
            $(".category-wrapper").animate({opacity :1},200,function(){
                $(".category").css({display:"block"});
            });
        });
        //鼠标划出分类菜单项
        $(".category-wrapper").on("mouseleave",function(){
            $("#classfiy i").css({background:"url(http://s2.ymatou.com/home/1cb1fe20152e19748e6cc8b52cc8fcbb.png)"});
            $("#classfiy").removeClass("select");
            $(".category-wrapper").animate({opacity :0},200,function(){
                $(".category").css({display:"none"});
            });
        });

        // //买手热销ajax
        // var sellerid = 7785476 ;
        // var start1 = 1 ;
        // function sellerhot(){
        //     $.ajax({
        //         url : "http://localhost:8080/proxy/ymatou.com/product/api/GetSellerWellList?sellerid=7785476&pageindex=1&pagesize=5&_=1537243941001",
        //         dataType : "json",
        //         success : function(data){
        //             console.log(data);
        //             console.log(1);
        //         }
        //     })
        //     console.log(urlmapping.sellerhot+"?sellerid="+sellerid+"&pageindex="+start1+"&pagesize=5");
        // }
        // sellerhot();

        //相关推荐ajax
        // var productid = "be4b2b49-d86b-4f78-8307-e0d1f9c56858";
        // var start2 = 1 ;
        // function recommend(){
        //     $.ajax({
        //         url : "https://www.ymatou.com/product/api/GetSellerWellList?sellerid=7785476&pageindex=1&pagesize=5&_=1537318362081",
        //         dataType : "jsonp",
        //         success : function(data){
        //             console.log(data);
        //         }
        //     })
        //     console.log(urlmapping.recommend+"?productid="+productid+"&pageindex="+start2+"&pagesize=5");
        // }
        // recommend();


        //数量加操作
        $(".product-wrap").on("click","span.add",function(){
            if(Number($(this).siblings("input").val())>=Number($(this).parent().siblings(".stack").text())){
                $(this).css({cursor:"not-allowed"});
            }else{
                $(this).css({cursor:"pointer"});
                $(this).siblings("input").val(Number($(this).siblings("input").val())+1);
            }
            
        })
        //数量减操作
        $(".product-wrap").on("click","span.reduce",function(){
            if($(this).siblings("input").val()<=0){
                $(this).css({cursor:"not-allowed"});
            }else{
                $(this).css({cursor:"pointer"});
                $(this).siblings("input").val(Number($(this).siblings("input").val())-1);
            }
            
        })



        //加入购物车
        $(".basket").on("click",function(){
            $("#success").show();
            setTimeout(function(){
                $("#success").fadeOut();
            },1000)
            
        })


        //初始化商品详情
        function initdetails(){
            var obj = JSON.parse($.cookie("details"));
            $("#initdetailstemplate").load("http://localhost:8080/pages/templates/initdetails.html",function(){
                var htmlstr = template("initdetails",{
                    obj : obj
                });
                $("#body .product-wrap").html(htmlstr);
                //放大镜效果
                $(".shade").hover(function(){
                    $(".move").show();
                    $(".bimg").show();
                    },function(){
                    $(".move").hide();
                    $(".bimg").hide();
                });
                $(".shade").mousemove(function(e){
                    var l=e.clientX + $(document).scrollLeft();
                    var t=e.clientY + $(document).scrollTop() ;

                    var _top=t-$(".big-img").offset().top-$(".move").height()/2+"px";
                    var _left=l-$(".big-img").offset().left-$(".move").width()/2+"px";
                    //不让从上面和下面出去
                    if(parseInt(_top)<0){
                        _top=0+'px';
                        }else if(parseInt(_top)>parseInt($(".big-img").height()-$(".move").height())){
                            _top=parseInt($(".big-img").height()-$(".move").height())+"px";
                            }
                            
                    //不让从两边出去
                    if(parseInt(_left)<0){
                        _left=0+"px";
                        }else if(parseInt(_left)>parseInt($(".big-img").width()-$(".move").width())){_left=parseInt($(".big-img").width()-$(".move").width())+'px';}
                    
                    $(".move").css({top:_top,left:_left});
                    
                    //小图可滑动的比例
                    var hd_x=parseInt(_left)/parseInt($(".big-img").width()-$(".move").width());
                    var hd_y=parseInt(_top)/parseInt($(".big-img").height()-$(".move").height());
                    
                    //大图对应的top left
                    var bm_left=($(".bimg img").width()-$(".bimg").width())*hd_x;
                    var bm_top=($(".bimg img").height()-$(".bimg").height())*hd_y;
                    $(".bimg img").css({top:-bm_top,left:-bm_left});
                    
                    
                });        
            })
        }
        initdetails();

        //加入购物车
        var details = JSON.parse($.cookie("details")) ;
        $(".product-wrap").on("click",".basket",function(){
            
            var product = {
                imgsrc : $(".middle-details .left .big-img img").attr("src"),
                productid : $(".middle-details .left .big-img img").attr("proid"),
                count : Number($(".middle-details .select-panel input").val()),
                singleprice : details.productprice,
                sumprice :$(".middle-details .select-panel input").val()*details.productprice,
                productname : details.productname
            }
            var plist_value = $.cookie("plist");
            var plist = null;
            if(plist_value == undefined){
                plist=[];
            }else{
                plist = JSON.parse(plist_value);
            }
            var isExist=plist.some(function(item){   //判断cookie里是否存在这个商品
                var res=item.productid==product.productid;
                console.log(res);
                if(res) item.count++;                 //如果存在,则数量+1
                return res;
            })
            if(!isExist){                            //如果不存在,将获取的对象存进数组里
                plist.push(product);
            }
            $.cookie("plist",JSON.stringify(plist),{path:"/"});
            $("#success").show();
            setTimeout(function(){
                $("#success").fadeOut();
            },1000)
            
        })

        //导入底部模板
        $("#foot").load("http://localhost:8080/pages/templates/foot.html")

    })
})