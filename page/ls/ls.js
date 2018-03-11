(function(){
	'use strict'	
	$(document).ready(function() {	
		$('.sumbit').click(function(){
			//设置禁用防止多次提交
			var that=$(this);
			var text=that.text();
			that.attr('disabled','true').text('提交中...');
			var username=that.siblings('.username').val();
			var password=that.siblings('.password').val();
			var userInfo={
				username:username,
				password:password
			}
			function callback(){
				that.removeAttr('disabled').text(text);
			}
			//先检查正则相关问题，根据返回值进行相应处理
			var result=sys.checkReg(userInfo);
			switch(result){
				case 0:ui.showAlert('用户名及密码不能为空',callback);break;
				case 1:ui.showAlert('用户名及密码均需6-15位以内',callback);break;
				case true:ui.showAlert('用户名需为字母数字组合',callback);break;
				case false:
					if(text=='注册') net.sign(userInfo,callback);
					else net.login(userInfo,callback);
				break;
			}
		});
	})
}())
