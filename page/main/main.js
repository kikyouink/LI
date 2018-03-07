(function(){
	$(document).ready(function(){
		
		$('li').click(function() {
			$('.active').removeClass('active');
			$(this).addClass('active');
			
			var index=$(this).index();
			if($(this).getParent(2).hasClass('myMusic')) index+=4;
			$('.page').eq(index).addClass('active');
		});
		//拖动
		$(document).mousemove(function(e) {
			if(!!this.move) {
				var posix = !document.move_target ? {
						'x': 0,
						'y': 0
					} : document.move_target.posix,
					callback = document.call_down || function() {
						$(this.move_target).css({
							'top': e.pageY - posix.y,
							'left': e.pageX - posix.x,
						});
						console.log(e.pageY - posix.y);
						console.log(e.pageX - posix.x);
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
			}
		});
		$('#header').on('mousedown',function(e) {
			var $box = $('#container');
			var position = $box.position();
			$box.posix = {
				'x': e.pageX - position.left,
				'y': e.pageY - position.top
			};
			$.extend(document, {
				'move': true,
				'move_target': $box
			});
		});
	});
}())