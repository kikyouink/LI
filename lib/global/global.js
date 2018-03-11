//数组方法
Array.prototype.findNext = function (value) {
  var num=this.length;
  var index=this.indexOf(value);
  return (index+1==num)?this[0]:this[index+1];
}
Array.prototype.findPrev = function (value) {
	var num=this.length;
	var index=this.indexOf(value);
	return (index-1<0)?this[num-1]:this[index-1];
}
Array.prototype.findRandom = function () {
	var num=this.length;
	var item=parseInt(Math.random()*num);
	return this[item];
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

//拖动
$(document).mousemove(function(e) {
	if(!!this.move) {
		var posix = !document.move_target ? {
				'x': 0,
				'y': 0
			} : document.move_target.posix,
			callback = document.call_down || function() {
				//及时屏蔽transition，否则会一直不停触发，别忘了，拖动也是会改变top和left的
				$('#container').css('transition','none');
				$(this.move_target).css({
					'top': e.pageY - posix.y,
					'left': e.pageX - posix.x,
				});
			};

		callback.call(this, e, posix);
		return false;
	}

}).mouseup(function(e) {
	if(!!this.move) {
		var callback = document.call_up || function() {};
		callback.call(this, e);
		$.extend(this, {
			'move': false,
			'move_target': null,
			'call_down': false,
			'call_up': false
		});
		//恢复之
		$('#container').css('transition','all 0.5s');
	}
})
