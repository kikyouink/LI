//js封装组件
//ui组件
let ui={
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
let sys={
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
//本地存储组件
let storage={
    save:function(key,value){
        localStorage.setItem(key, value);
    },
    get:function(key){
        return localStorage.getItem(key);
    },
    delete:function(key){
        localStorage.removeItem(key);
    },
}
//主题组件
let theme={
	list:['red','purple','glass','star'],
	init:function(){
		var theme=storage.get('theme')||this.list[0];
		this.apply(theme);
	},
	//兼容火狐，火狐不支持disabled
	apply:function(theme){
		var src='lib/theme/'+theme+'.css';
		$('#theme').attr('href',src);
		storage.save('theme',theme);
	},
	change:function(theme){
		this.apply(theme);
	},
	Next:function(){
		var theme=storage.get('theme')||theme.list[0];
		var themeNext=this.list.findNext(theme);
		this.apply(themeNext);
	},
}
//数组方法
Array.prototype.findNext = function (value) {
  var num=this.length;
  var index=this.indexOf(value);
  return (index+1==num)?this[0]:this[index+1];
}
//jq DOM 操作
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
	putDiv: function(className, innerHTML,num) {
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
