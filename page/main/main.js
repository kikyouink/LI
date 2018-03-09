(function(){
	$(document).ready(function(){
		//准备工作
		theme.init();
		//杂项
		$('.slide').click(function() {
			$('.slide.active,.page.active').removeClass('active');
			$(this).addClass('active');	
			var index=$(this).index();
			if($(this).getParent(2).hasClass('myMusic')) index+=4;
			$('.page').eq(index).addClass('active');
		});
		$('.skin').click(function(){
			theme.Next();
		});
		//ui
		(function(){
			let ui={
				full:function(){
					$('#container').removeAttr('style').toggleClass('full');
				},
				
			}
			$('.full').click(ui.full);
			$('#header').dblclick(ui.full);
		}());
		
		//拖动组件
		(function(){
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
		}());
		//音乐&播放组件
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
					return audio[0];
				},
				loadSongSrc:function(songInfo){
					var name=songInfo.singer+' - '+songInfo.name;
					var src='assest/music/'+songInfo.singer+'/'+name+'.mp3';
					return src;
				},
				loadSingerSrc:function(songInfo){
					var src='assest/img/singer/'+songInfo.singer+'.png';
					return src;
				},
				star:function(songInfo){
					var songSrc=music.loadSongSrc(songInfo);
					music.play(songSrc);
					window.audio.onloadedmetadata=function(){
						console.log('元数据加载');
						music.updateInfo(songInfo);
					}
					window.audio.oncanplay=function(){
						console.log('可以播放');
						music.toggle();
						music.updateProgress();
					}
				},

				play:function(src){
					music.init(src).play();
					music.loop();
					music.volSlowUp();
				},
				continue:function(){
					window.audio.play();
					music.volSlowUp();
				},
				pause:function(src){
					music.volSlowDown(function(){
						window.audio.pause();
					});
				},
				volChange:function(value){
					if(!window.audio) return ;
					window.audio.volume=value;
				},
				volSlowUp:function(){
					window.audio.volume=0;
					var limit=$('.vc')[0].value;
					var timer=setInterval(function(){
						if(window.audio.volume<Math.min(limit,0.95)){
							window.audio.volume+=0.05;
							window.uping=false;
						}
						else{
							clearInterval(timer);
						}
					},60);
				},
				volSlowDown:function(callback){
					var timer=setInterval(function(){
						if(window.audio.volume>0.05){
							window.audio.volume-=0.05;
						}
						else{
							clearInterval(timer);
							callback();
						}
					},60);
				},
				loop:function(){
					window.audio.loop=true;
				},
				toggle:function(){
					var play=$('.play');
					var pause=$('.pause');
					play.addClass('pause').removeClass('play');
					pause.addClass('play').removeClass('pause');
					$('.disc').toggleClass('active');
					$('.dot').toggleClass('active');
				},
				updateInfo:function(songInfo){
					var picSrc=music.loadSingerSrc(songInfo);
					//url括号里面还要加引号，好坑
					$('.musicPic').css('background-image',"url("+"'"+picSrc+"'"+")");
					$('.songName').text(songInfo.name);
					$('.singer').text(songInfo.singer);
				},
				updateProgress:function(){
					var getTime=function(time){
						var min=parseInt(time/60);
						var sec=parseInt(time%60);
						return [min,sec].join(':').replace(/\b(\d)\b/g, "0$1");
					}
					//HTML5读取音频有延迟，故不能一开始就获取总时间
					var all=window.audio.duration;		
					$(".time.r").text(getTime(all));
					setInterval(function(){
						var all=window.audio.duration;	
						var status=window.audio.currentTime;
						var precent=status/all;
						var width=500*precent;
						$('.progress_active').css('width',width);
						
						$(".time.l").text(getTime(status));
					},500);
				},
				showInterface:function(){
					$('#playInterface').fadeIn();
				},
				hideInterface:function(){
					$('#playInterface').fadeOut();
				},
			};
			//播放
			//为什么这么写？因为.pause是后来添加的类名，在此之前声明的方法无效
			$('.playGroup').on('click','.play',function(){
				if(window.audio){
					music.continue();
					music.toggle();
				}
				else{
					let songInfo={
						singer:'Amy Deasismont',
						name:'Heartbeats',
					}		
					music.star(songInfo);
				}
			})
			$('.playGroup').on('click','.pause',function(){
				music.toggle();
				music.pause();
			})
			$('.musicPic').click(function(){
				$('#main').hide();
				music.showInterface();
			});
			$('.back').click(function(){
				$('#main').show();
				music.hideInterface();
			});
			//调整音量
			$('.vc').on('input propertychange',function(){
               var value=$(this)[0].value;
			   music.volChange(value);
            })
		}());
		//轮播组件
		(function(){
			let flash={
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
			flash.next(3000);
		}());
	});
}())