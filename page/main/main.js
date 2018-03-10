(function(){
	$(document).ready(function(){
		//准备工作
		theme.init();
		console.log('Github网速报警系统');
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
				status:null,
				list:[
					{
						singer:'Amy Deasismont',
						name:'Heartbeats',
						src:'http://music.163.com/song/media/outer/url?id=2175282.mp3',
					},
					{
						singer:'林宥嘉',
						name:'晚安',
						src:'http://music.163.com/song/media/outer/url?id=108301.mp3',
					},
					{
						singer:'张碧晨',
						name:'凉凉',
						src:'http://www.tingge123.com/mp3/2017-05-22/1495450394.mp3',
					},
					{
						singer:'许嵩',
						name:'单人旅途',
						src:'http://music.163.com/song/media/outer/url?id=167860.mp3',
					},
					{
						singer:'米白',
						name:'樱花樱花想见你',
						src:'http://music.163.com/song/media/outer/url?id=438903219.mp3',
					},

				],
				init:function(audio) {
					var obj={
						onloadstart:()=>{
							console.info('开始加载:'+this.status.singer+' - '+this.status.name);
							$('.dot').addClass('active');
							music.updateInfo(this.status);
							music.reset();
						},
						onloadedmetadata:()=>{
							// console.log('元数据加载');
							music.updateProgress();
						},
						oncanplay:()=>{
							// console.log('可以播放');
							music.toggle();
							$('.dot').removeClass('active');
						},					
						onerror:()=>{
							console.error('加载出错...');
							setTimeout(this.next,2000);
						},
						onstalled:()=>{
							$('.dot').addClass('active');
							console.info('缓冲中...');
						},
						onended:()=>{
							this.next();
						},
					}
					for(var i in obj){
						audio[i]=obj[i];
					}
				},
				new:function(src){
					if(window.audio){
						window.audio.src=src;	
						window.audio.load();
					}
					else{
						var audio=new Audio(src);
						music.init(audio);
						window.audio=audio;
					}			
					return window.audio;
				},
				//从头播放
				star:function(songInfo){
					this.status=songInfo;
					var src=songInfo.src;
					music.new(src).play();
					music.volSlowUp();
				},
				continue:function(){
					window.audio.play();
					music.volSlowUp();
					music.toggle();
				},
				pause:function(){
					music.toggle();
					music.volSlowDown(function(){
						window.audio.pause();
					});
				},
				next:function(){
					//避免一些奇怪的问题，例如刚开始就点next而没有播放
					var index;
					if(this.list.indexOf(this.status)==-1) index=0;
					else index=this.list.indexOf(this.status);
					var nextIndex=this.list[(index+1)%5];
					this.star(nextIndex);
				},
				prev:function(){
					var index=this.list.indexOf(this.status);
					var prevIndex=this.list[(index-1)<0?4:(index-1)];
					this.star(prevIndex);
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
				},
				updateInfo:function(songInfo){
					var picSrc=music.loadSingerSrc(songInfo);
					//url括号里面还要加引号，好坑
					$('.musicPic').css('background-image',"url('"+picSrc+"')");
					$('.songName').text(songInfo.name);
					$('.singer').text(songInfo.singer);
				},
				updateProgress:function(){
					var getTime=function(time){
						var min=parseInt(time/60);
						var sec=parseInt(time%60);
						return [min,sec].join(':').replace(/\b(\d)\b/g, "0$1");
					}
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
				reset:function(){					
					$('.progress_active').removeAttr('style');
					var pause=$('.pause');
					pause.addClass('play').removeClass('pause');
					$('.disc').removeClass('active');

				},
				loadSingerSrc:function(songInfo){
					var src='assest/img/singer/'+songInfo.singer+'.png';
					return src;
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
				showInterface:function(){
					$('#main').hide();
					$('#playInterface').fadeIn();
				},
				hideInterface:function(){
					$('#playInterface').fadeOut();
					$('#main').show();
				},
			};
			//播放
			music.updateInfo(music.list[0]);
			//为什么这么写？因为.pause是后来添加的类名，在此之前声明的方法无效
			$('.playGroup').on('click','.play',function(){
				if(window.audio){
					music.continue();
				}
				else{
					var songInfo=music.list[0];
					music.star(songInfo);
				}
			})
			$('.playGroup').on('click','.pause',function(){
				music.pause();
			})
			$('.next').click(function(){
				music.next();
			});
			$('.prev').click(function(){
				music.prev();
			});
			$('.musicPic').click(function(){
				music.showInterface();
			});
			$('.back').click(function(){
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