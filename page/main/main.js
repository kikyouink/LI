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
		//视频组件
		//音乐组件
		(function(){
			let music={
				init:function(src){
					var audio=$('<audio></audio>');
					var source=audio.put('source');
					source.attr({
						src:src,
						type:'audio/mp3'
					});
					window.audio=audio[0];
					music.updateProgress();
					return audio[0];
				},
				loadData:function(songInfo){
					let src='assest/music/'+songInfo.singer+'/'+songInfo.name+'.mp3';
					return src;
				},
				play:function(src){
					if(window.audio){
						window.audio.play();
					}
					else{
						music.init(src).play();
					}
					music.volSlowUp();
				},
				pause:function(src){
					var pa=function(){
						window.audio.pause();
					}
					music.volSlowDown(pa);
				},
				volSlowUp:function(){
					window.audio.volume=0;
					var timer=setInterval(function(){
						window.audio.volume+=0.05;
						if(window.audio.volume>=0.95){
							clearInterval(timer);
						}
					},60);
				},
				volSlowDown:function(callback){
					var timer=setInterval(function(){
						window.audio.volume-=0.05;
						if(window.audio.volume<=0.05){
							clearInterval(timer);
							callback();
						}
					},60);
				},
				loop:function(){
					window.audio.loop=true;
				},
				updateProgress:function(){
					var getTime=function(time){
						var min=parseInt(time/60);
						var sec=parseInt(time%60);
						return [min,sec].join(':').replace(/\b(\d)\b/g, "0$1");
					}
					setInterval(function(){
						var all=window.audio.duration;
						var status=window.audio.currentTime;
						var precent=status/all;
						var width=500*precent;
						$('.progress.active').css('width',width);
						$(".time.l").text(getTime(status));
						$(".time.r").text(getTime(all));
					},1000);
				}
				
				
			}
			$('.play').click(function(){
				let songInfo={
					singer:'linjunjie',
					name:'zuichibi',
				}
				var src=music.loadData(songInfo);
				$(this).toggleClass('active');
				if($(this).hasClass('active')){
					$(this).css('background','url(assest/img/icon/pause.png)');
					music.play(src);
				}
				else{
					$(this).css('background','url(assest/img/icon/play.png)');
					music.pause();
				}
			});
		}());
		//轮播组件
		(function(){
			var flash={
				init:function(){
					
				},
				next:function(time){
					var index=0;
					var li=["p5","p4","p3","p2","p1"];
					setInterval(function(){
						index++;
						li.push(li[0]);
						li.shift();
						$('.pic').each(function(i,e){
							$(e).removeClass().addClass('pic '+li[i]);
						})
						var active=$('.buttons').children().eq(index);
						active.addClass('blue').siblings().removeClass('blue');
						if (index>3) index=-1;
					},time);
				},
			};
			flash.init();
			flash.next(2000);
		}());
	});
}())