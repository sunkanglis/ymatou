//先加载config配置文件
require(["./js/conf/config"], function() {
    //再加载各个模块
    require(["jquery", "template", "ajaxMapping","swiper"], function($,template,urlmapping,Swiper) {
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

    //鼠标滑入angelababay
    $(".big-images li div").on("mouseenter",function(){
        $(".big-images li div .btn-left").css({display:"block"});
        $(".big-images li div .btn-right").css({display:"block"});
    })
    //鼠标划出angelababay
    $(".big-images li div").on("mouseleave",function(){
        $(".big-images li div .btn-left").css({display:"none"});
        $(".big-images li div .btn-right").css({display:"none"});
    })

    //鼠标滑入品牌item
    $(".item").on("mouseenter",function(){
        $(".swiper-button-prev").show();
        $(".swiper-button-next").show();
    })
    //鼠标划出品牌item
    $(".item").on("mouseleave",function(){
        $(".swiper-button-prev").hide();
        $(".swiper-button-next").hide();
    })

    //品牌轮播
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

    //猜你喜欢ajax
    function guessAjax(){
        $.ajax({
            url : urlmapping.guesslist,
            dataType : "jsonp",
            success : function(data){
                var guesss = data.result.Products;
                $("#guesstemplate").load("http://localhost:8080/pages/templates/guess.html",function(){
                    var htmlstr = template("guess",{
                        list: guesss
                    })
                    $(".guess-bd .list").html($(".guess-bd .list").html()+htmlstr);
                })
                
            }
        })
    }
    guessAjax();
    
    $(".loadingmore").on("click",function(){
        guessAjax();
    })

  });
  //今日限时抢——倒计时
(function(){
    setInterval(function(){
        var data = new Date;
        var m = 59-data.getMinutes();
        var s = 59-data.getSeconds();
        m1=m<10?"0"+m:m;
        s1=s<10?"0"+s:s;
        document.getElementsByClassName("minutes")[0].innerText=m1;
        document.getElementsByClassName("seconds")[0].innerText=s1;
    },1000)
    
})();
});
