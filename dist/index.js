require(["./js/conf/config"],function(){require(["jquery","template","ajaxMapping","swiper"],function(a,b,c,d){function e(){a.ajax({url:c.guesslist,dataType:"jsonp",success:function(c){var d=c.result.Products;a("#guesstemplate").load("http://localhost:8080/pages/templates/guess.html",function(){var c=b("guess",{list:d});a(".guess-bd .list").html(a(".guess-bd .list").html()+c)})}})}a.ajax({url:c.searchlist,dataType:"jsonp",success:function(c){var d=c.Data.KeywordList;a("#searchtemplate").load("http://localhost:8080/pages/templates/recomsearch.html",function(){var c=b("search",{list:d});a(".search-recomend dl").html(c)})}}),a(".search").on("input",function(){a(".search-recomend").hide(),a.ajax({url:`https://www.ymatou.com/products/api/getPreKeywordList?query=${this.value}`,dataType:"jsonp",success:function(c){a("#suggesttemplate").load("http://localhost:8080/pages/templates/suggest.html",function(){var d=c.result.Keywords;if(null==d)return void a(".suggest").hide();var e=b("suggest",{list:d});a(".suggest").html(e),a(".suggest").show()})}})}),a(".search").on("focus click",function(){a(".search-recomend").show()}),a(".search-recomend").on("mouseleave",function(){a(".search-recomend").hide(),a(".search").blur()}),a(".suggest").on("mouseente","li",function(){a(this).css({background:"#dedede"}).siblings().css({background:"white"})}),a(".suggest").on("mousedown","li",function(){a(".search").val(a(this).text()),a(".suggest").hide()}),a(".suggest").on("mouseleava",function(){a(".suggest").hide(),a(".search").blur()}),a(".search").on("blur",function(){a(".suggest").hide(),a(".search-recomend").hide()}),a.ajax({url:c.categorylist,dataType:"jsonp",success:function(c){var d=c.result;a("#categorytemplate").load("http://localhost:8080/pages/templates/category.html",function(){var c=b("category",{list:d});a(".category-wrapper .category").html(c)})}}),a("#classfiy").on("mouseover",function(){a("#classfiy i").css({background:"url(https://s2.ymatou.com/home/e442d154d1094b967744bfaab48efc37.png)",color:"red"}),a("#classfiy").addClass("select"),a(".category-wrapper").animate({opacity:1},200,function(){a(".category").css({display:"block"})})}),a(".category-wrapper").on("mouseleave",function(){a("#classfiy i").css({background:"url(http://s2.ymatou.com/home/1cb1fe20152e19748e6cc8b52cc8fcbb.png)"}),a("#classfiy").removeClass("select"),a(".category-wrapper").animate({opacity:0},200,function(){a(".category").css({display:"none"})})}),a(".big-images li div").on("mouseenter",function(){a(".big-images li div .btn-left").css({display:"block"}),a(".big-images li div .btn-right").css({display:"block"})}),a(".big-images li div").on("mouseleave",function(){a(".big-images li div .btn-left").css({display:"none"}),a(".big-images li div .btn-right").css({display:"none"})}),a(".item").on("mouseenter",function(){a(".swiper-button-prev").show(),a(".swiper-button-next").show()}),a(".item").on("mouseleave",function(){a(".swiper-button-prev").hide(),a(".swiper-button-next").hide()});new d(".swiper-container",{slidesPerView:1,spaceBetween:30,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});e(),a(".loadingmore").on("click",function(){e()})}),function(){setInterval(function(){var a=new Date,b=59-a.getMinutes(),c=59-a.getSeconds();m1=10>b?"0"+b:b,s1=10>c?"0"+c:c,document.getElementsByClassName("minutes")[0].innerText=m1,document.getElementsByClassName("seconds")[0].innerText=s1},1e3)}()});