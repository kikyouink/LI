(function(){
	$(document).ready(function(){
		
		$('.slide').click(function() {
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
		let music={
			audio:null,
			init:function(src){
				var audio=$('<audio></audio>');
				var source=audio.put('source');
				source.attr({
					src:src,
					type:'audio/mp3'
				});
				music.audio=audio;
				return audio;
			},
			play:function(src){
				music.init(src).trigger('play');
			},
			pause:function(src){
				music.audio.trigger('pause');
			}
			
		}
		function play(src){
			audio.trigger('play');
		}
		let songInfo={
			singer:'linjunjie',
			name:'zuichibi',
		}
		let src='assest/music/'+songInfo.singer+'/'+songInfo.name+'.mp3';
		$('.play').click(function(){
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				music.play(src);
			}
			else music.pause();
		});
		
		//上一张
		var cArr=["p5","p4","p3","p2","p1"];
		var index=0;
		//下一张
		function nextimg(){
			cArr.push(cArr[0]);
			cArr.shift();
			$('.pic').each(function(i,e){
				$(e).removeClass().addClass('pic '+cArr[i]);
			})
			index++;
			var active=$('.buttons').children().eq(index);
			active.addClass('blue').siblings().removeClass('blue');
			if (index>3) index=-1;
		}
		setInterval(function(){
			nextimg();
		},2000)
	});
}())