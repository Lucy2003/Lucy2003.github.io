FixPos();var prefixGithub="https://lucy2003.github.io/blog/images/",prefixCDN="https://cdn.jsdelivr.net/gh/lucy2003/lucy2003.github.io@master/blog/images/",searching=0,copyBtn=new ClipboardJS("#sharebtn");function recall(){var t=document.getElementById("PopupBox").clientHeight-120;$("#result_ul").css("height",t+"px")}function FixPos(){var t;location.hash&&(1!=(t=$(location.hash)).length||0<(t=t.offset().top-70)&&$("html,body").animate({scrollTop:t},1))}function replaceImg(t,i){console.log($(t).attr("data-original")),$(t).attr("data-original",i)}function FixImg(){$("img[data-original]").each(function(){var t="data-original",i=prefixCDN+$(this).attr(t),a=prefixGithub+$(this).attr(t);$(this).attr(t,i),$(this).attr("errorImg",a)}),$("img:not([data-original])").each(function(){var t="src",i=prefixCDN+$(this).attr(t),a=prefixGithub+$(this).attr(t);$(this).attr(t,i),$(this).attr("errorImg",a)}),$("a.fancybox").each(function(){var t="href",i=prefixCDN+$(this).attr(t),t=prefixGithub+$(this).attr(t);$(this).attr("href",i),$(this).attr("SecondHref",t)}),$(function(){$("img[data-original]").lazyload({placeholder:"https://cdn.jsdelivr.net/gh/lucy2003/lucy2003.github.io@master/blog/images/loading.gif",effect:"fadeIn"})})}window.onresize=function(){recall()},$(document).ready(function(){FixImg(),$("a.fancybox").fancybox()});