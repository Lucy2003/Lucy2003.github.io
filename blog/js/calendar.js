!function(P){function a(t,e,a){var n,l=new Date,r=l.getDate(),F=l.getMonth(),O=l.getFullYear(),j=r,A=F,S=O,W=a,s=null,o=null,E={posts:[],prev:null,next:null},p="en";(n=t)&&"undefined"!=typeof calLanguages&&calLanguages[n]&&(p=n);var R=P.extend({},P.fn.aCalendar.defaults,"undefined"==typeof calLanguages?{}:calLanguages[p],e);function J(){A<11?A++:(A=0,S++),d()}function U(){0<A?A--:(A=11,S--),d()}function Y(t){t&&(S=t.getFullYear(),A=t.getMonth(),d())}function $(){R.single?null!=R.url&&""!=R.url&&(null===s&&P.ajax({url:R.url,async:!1,success:function(t){s=t,u(Object.keys(s))}}),null!==s&&i()&&(E.posts=s[S+"-"+(A+1)])):function(){null===o&&P.ajax({url:R.root+"list.json",async:!1,success:function(t){u(t)}});i()&&P.ajax({url:R.root+S+"-"+(A+1)+".json",async:!1,success:function(t){E.posts=t}})}()}function u(t){o=t.map(function(t){var e=t.split("-");return new Date(Date.UTC(+e[0],e[1]-1))})}function i(){var t=Date.UTC(S,A);if(null!==o&&0!==o.length&&(0!==E.posts.length||!(null===E.prev&&null!==E.next&&E.next.getTime()>t||null===E.next&&null!==E.prev&&E.prev.getTime()<t))){E.posts=[];for(var e=0;e<o.length;e++){var a=o[e].getTime();if(t===a)return E.prev=0===e?null:o[e-1],E.next=e===o.length-1?null:o[e+1],1;if(t<a){E.prev=0===e?null:o[e-1],E.next=o[e];break}E.prev=o[e],E.next=null}}}function N(t,e){var a={"LMM+":R.months[t.getMonth()],"MM+":t.getMonth()+1};for(var n in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,"LMM+"===n?a[n]:("00"+a[n]).substr((""+a[n]).length)));return e}function d(){$();var t=new Date(S,A,1).getDay()-R.weekOffset;t<=0&&(t=6- -1*(t+1));var e=new Date(S,A+1,0).getDate(),a=new Date(S,A,0).getDate()-t+1,n=P("<div/>").addClass("cal-head"),l=P("<div/>"),r=P("<div/>"),s=P("<div/>").addClass("cal-title");r.html(R.headArrows.previous),l.html(R.headArrows.next),curDate=new Date(Date.UTC(S,A)),0===E.posts.length?s.html(N(curDate,R.titleFormat)):(cTitleLink=P("<a/>").attr("href","/blog"+N(curDate,R.titleLinkFormat)).attr("title",N(curDate,R.postsMonthTip)).html(N(curDate,R.titleFormat)),s.html(cTitleLink)),r.on("click",U),l.on("click",J),n.append(r),n.append(s),n.append(l);for(var o=P("<table/>").addClass("cal"),p=R.weekOffset,u=P("<thead/>"),i=P("<tr/>"),d=0;d<7;d++){6<p&&(p=0);var c=P("<th/>").attr("scope","col").attr("title",R.dayOfWeek[p]);c.html(R.dayOfWeekShort[p]),i.append(c),p++}u.append(i),o.append(u);var f=P("<tfoot/>"),h=P("<tr/>"),g=P("<td/>").attr("colspan",3),y=P("<td/>").html("&nbsp;"),v=P("<td/>").attr("colspan",3);E.prev&&g.html(R.footArrows.previous+R.months[E.prev.getMonth()]).addClass("cal-foot").attr("title",N(E.prev,R.postsMonthTip)),E.next&&v.html(R.months[E.next.getMonth()]+R.footArrows.next).addClass("cal-foot").attr("title",N(E.next,R.postsMonthTip)),g.on("click",function(){Y(E.prev)}),v.on("click",function(){Y(E.next)}),h.append(g),h.append(y),h.append(v),f.append(h);for(var m=P("<tbody/>"),M=1,x=1,d=0;d<6;d++){for(var D=P("<tr/>"),k=0;k<7;k++){var w=P("<td/>");if(7*d+k<t)w.addClass("cal-gray"),w.html(a++);else if(M<=e){M==j&&F==A&&O==S&&w.addClass("cal-today");for(var T,b,C={num:0,keys:[]},L=0;L<E.posts.length;L++){new Date(Date.parse(E.posts[L].date)).getDate()==M&&(C.keys[C.num++]=L)}0!==C.num?(T=C.keys[0],b=P("<a>").attr("href",E.posts[T].link).attr("title",E.posts[T].title).html(M++),w.append(b)):w.html(M++)}else w.addClass("cal-gray"),w.html(x++);D.append(w)}m.append(D)}o.append(u),o.append(f),o.append(m),P(W).html(n),P(W).append(o)}return"/"!==R.root[0]&&(R.root="/"+R.root),"/"!==R.root[R.root.length-1]&&(R.root+="/"),d()}P.fn.aCalendar=function(t,e){return this.each(function(){return a(t,e,P(this))})},P.fn.aCalendar.defaults={months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeekShort:["S","M","T","W","T","F","S"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],postsMonthTip:"Posts published in LMM yyyy",titleFormat:"yyyy LMM",titleLinkFormat:"/archives/yyyy/MM/",headArrows:{previous:'<span class="cal-prev"></span>',next:'<span class="cal-next"></span>'},footArrows:{previous:"« ",next:" »"},weekOffset:0,single:!0,root:"/calendar/",url:"/calendar.json"}}(jQuery);