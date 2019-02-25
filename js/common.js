var nozUrl = "http://admin.caixin.jinjifuweng.com/";

// var nozUrl = "http://www.liule.online/gupiao/index.php/";

$.ajaxSetup({
	timeout:"5000",
	error:function(){
		_closeLoading();
		_msg("请求失败");
		clearInterval(window.t0);
		clearInterval(window.t1);
	}
});
function getAssets(){
	var assets={};
	if(!sessionStorage.getItem("uinfo")){
		window.location.href="login.html";
	}else{		
		$.ajax({
			type: "post",
			dataType: "json",
			url: `${nozUrl}Api/users/myAssets`,
			async:false,
			data: {
				userId: JSON.parse(sessionStorage.getItem("uinfo")).id,
			},
			success: function(res) {
				assets = res.data;
			}
		})
	}
	return assets;
}
var w = $("body").width();
// 主菜单切换
function setMainNav(i) {
	$(".com_header_menu ul>li").eq(i).find("a").addClass("a_active");
}
// 个人中心nav
function setnav(i) {
	$(".left_nav ul li").eq(i).find("a").addClass("a_active");
}
// 移动端主菜单
$(".yes_login .iconfont").on("click", function() {
	if($(".com_header_menu").css("display") == "none") {
		$(".com_header_menu").css("display", "block");
		$(".com_header_menu").animate({
			"marginRight": "0"
		}, 300)
	} else {
		$(".com_header_menu").animate({
			"marginRight": "-100%"
		}, 300, function() {
			$(".com_header_menu").css("display", "none");
		})
	}
})
// 跳转个人中心
function toMine() {
	if(w > 768) {
		window.location.href = "user_center.html";
	} else {
		window.location.href = "mobile_nav.html";
	}
}
// 个人中心菜单切换
function setMineNav(i, j) {
	$(".mine_menu .d_uls>div").eq(i).find("ul").show();
	$(".mine_menu .d_uls>div").eq(i).find("li").eq(j).addClass("li_active");
}
// 打开加载动画
function _loading() {
	layer.load(3, {
		shade: [0.4, '#fff']
	});
}

function _loading1() {
	layer.load(1, {
		shade: [0.1, '#fff'] //0.1透明度的白色背景
	});
}
// 关闭加载动画
function _closeLoading() {
	layer.closeAll('loading');
}
// 接口返回信息提示
function _msg(msg) {
	layer.msg(msg, {
		time: 2000
	})
}
// 退出登录
function exit() {
	window.location.href = "login.html";
}
//函数节流
function throttle(handle, wait) {
	var lasttime = 0;
	return function(e) {
		var nowtime = new Date().getTime();
		if((nowtime - lasttime) > wait) {
			handle.apply(this, arguments);
			lasttime = nowtime;
		}
	}
}

//获取url参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return r[2];
	return '';
}
//时间戳转化
function  timestampToTime(timestamp) {        
	var  date =  new  Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000     
	Y = date.getFullYear() +  '-';        
	M = (date.getMonth() + 1 < 10 ?  '0' + (date.getMonth() + 1) : date.getMonth() + 1) +  '-';        
	D = date.getDate() +  ' ';        
	h = date.getHours() +  ':';      
	if(h.toString().length==1){
		h = "0"+h
	}
	m = date.getMinutes() +  ':';
	if(m.toString().length==1){
		m = "0"+m
	}     
	s = date.getSeconds();        
	if(s.toString().length==1){
		s = "0"+s
	}
	return  Y + M + D + h + m + s;    
}
$(function() {
	// 弹窗
	$(".modal_title .icon-quxiao").on("click", function() {
		$(this).parents(".modal").modal("hide");
	})
	//输入框监听 
	$(".d_input input").on("focus", function() {
		$(this).parents(".d_input").addClass("d_input_active");
	})
	$(".d_input input").on("blur", function() {
		$(this).parents(".d_input").removeClass("d_input_active");
	})
	$(".d_select select").on("focus", function() {
		$(this).parents(".d_select").addClass("d_select_active");
	})
	$(".d_select select").on("blur", function() {
		$(this).parents(".d_select").removeClass("d_select_active");
	})
	$("input").on("input", function() {
		//币单位(10位小数)
		if($(this).hasClass("limit_coin")) {
			$(this).val($(this).val().match(/\d+\.?\d{0,10}/))
		}
		if($(this).hasClass("limit_cny")) {
			$(this).val($(this).val().match(/\d+\.?\d{0,2}/))
		}
		//仅数字 
		if($(this).hasClass("limit_num")) {
			$(this).val($(this).val().replace(/[^\d]/g, ''))
			if($(this).val() == 0) {
				$(this).val("");
			}
		}
		if($(this).hasClass("limit_num1")) {
			$(this).val($(this).val().replace(/[^\d]/g, ''))
		}
	})
})