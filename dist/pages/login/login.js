require(["../../js/conf/config"],function(){require(["jquery","cookie"],function(a){a("#head .right span").on("mouseover",function(){a(this).find("a").css({color:"#c33"}).end().siblings().show()}),a("#head .right span").on("mouseout",function(){a(this).find("a").css({color:"#999"}).end().siblings().hide()}),a(".downlist").on("mouseover",function(){a(this).show()}),a(".downlist").on("mouseout",function(){a(this).hide()}),a(".change").on("click",function(){a(".input img").attr("src","http://d.mizhe.com/checkcode/show2.html")}),a(".change").on("mouseover",function(){a(".change").css({cursor:"pointer"})});var b={username:JSON.parse(a.cookie("user")).username,password:JSON.parse(a.cookie("user")).password,tel:JSON.parse(a.cookie("user")).tel};a("input").eq(4).on("click",function(){a("input").eq(0).val()==JSON.parse(a.cookie("user")).tel&&a("input").eq(1).val()==JSON.parse(a.cookie("user")).password?a("input[type='checkbox']").is(":checked")?(a.cookie("user",JSON.stringify(b),{expires:14,path:"/"}),a.cookie("flag",JSON.stringify(b),{expires:14,path:"/"}),window.location.replace("http://localhost:8080")):(a.cookie("flag",JSON.stringify(b),{path:"/"}),window.location.replace("http://localhost:8080")):alert("\u624B\u673A\u53F7\u6216\u5BC6\u7801\u9519\u8BEF\uFF01")}),a("#foot").load("http://localhost:8080/pages/templates/copywrite.html")})});