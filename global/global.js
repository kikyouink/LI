//js封装组件
//ui组件
var ui={
	showAlert:function(text,callback){
		var alert=$('body').putDiv('alert normal',text);
		setTimeout(function(){
			if(callback) callback();
			alert.remove();
		},2000)
	},
	showConfrim:function(text,callback){
		var confrim=$('body').putDiv('confrim',text);
		var buttonGroup=confrim.putDiv('buttonGroup');
		buttonGroup.put('button',['yes','no'],['确认','取消']);
		$('.yes,.no').click(function(){
			confrim.addClass('active');
			if($(this).hasClass('yes')) callback();
			confrim.hide();
		});
	},
};
//系统组件
var sys={
	checkReg:function(obj,mode){
		for (let i in obj) {
			if(obj[i].length==0) return 0;
			if(obj[i].length<6||obj[i].length>15) return 1;
		}
		var reg;
		mode=mode||'';
		switch(mode){
			case 'remix':reg=/[^A-Za-z0-9_\-\u4e00-\u9fa5]+/g;break;//包括汉字
			default:reg=/\W+/g;break;
		}
		return reg.test(obj.username);
	},
};
//网络组件
var net={
	sign:function(obj,callback){
		obj.type='sign';
		this.post(obj,'注册成功',callback);
	},
	login:function(obj,callback){
		obj.type='login';
		this.post(obj,'登录成功',callback);
	},
	post:function(obj,prompt,callback){
		var url="http://localhost/php/ls.php/";
		$.post(url,obj,function(data){
			console.log(data);
			if(data==prompt) callback=function(){
				console.log('ch!');
			};
			ui.showAlert(data,callback);
		},'text');
	},
}
$.fn.extend({
	put: function(type, className, innerHTML,num) {	
		className = className||'';
		innerHTML = innerHTML||'';
		//批量put
		if(Array.isArray(className)&&Array.isArray(innerHTML)){
			var list=[];
			for(var i=0;i<className.length;i++){
				var node = $("<" + type + "></" + type + ">");
				node.addClass(className[i]);
				node.text(innerHTML[i]);
				list.push(node);
			}
			$(this).append(list);
		}
		else if(num){
			var list=[];
			for(var i=0;i<num;i++){
				var node = $("<" + type + "></" + type + ">");
				node.addClass(className);
				node.text(innerHTML);
				list.push(node);
			}
			$(this).append(list);
		}
		else{
			var node = $("<" + type + "></" + type + ">");
			node.addClass(className);
			node.text(innerHTML);
			$(this).append(node);
			return node;
		}
	},
	putDiv: function(className, innerHTML) {
		className = className||'';
		innerHTML = innerHTML||'';	
		if(Array.isArray(className)&&Array.isArray(innerHTML)){
			var list=[];
			for(var i=0;i<className.length;i++){
				var div = $("<div></div>");
				div.addClass(className[i]);
				div.text(innerHTML[i]);
				list.push(div);
			}
			$(this).append(list);
		}
		else if(num){
			var list=[];
			for(var i=0;i<num;i++){
				var node = $("<" + type + "></" + type + ">");
				node.addClass(className);
				node.text(innerHTML);
				list.push(node);
			}
			$(this).append(list);
		}
		else{
			var div = $("<div></div>");
			div.addClass(className);
			div.text(innerHTML);
			$(this).append(div);
			return div;
		}
	},
	getParent: function(num) {
		var parent;
		while(num--) {
			if(parent) parent = parent.parent();
			else parent = $(this).parent();
		}
		return parent;
	},
})
