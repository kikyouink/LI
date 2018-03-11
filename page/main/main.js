(function(){
	$(document).ready(function(){
		//准备工作
		console.log('Github网速报警系统');
		//音乐组件
		(function(){
			let music={
				status:null,
				playMode:'loop',
				list:[
					{
						singer:'Amy Deasismont',
						name:'Heartbeats',
						src:'http://music.163.com/song/media/outer/url?id=2175282.mp3',
					},{
						singer:'林宥嘉',
						name:'晚安',
						src:'http://music.163.com/song/media/outer/url?id=108301.mp3',
					},{
						singer:'张碧晨',
						name:'凉凉',
						src:'http://www.tingge123.com/mp3/2017-05-22/1495450394.mp3',
					},{
						singer:'许嵩',
						name:'单人旅途',
						src:'http://music.163.com/song/media/outer/url?id=167860.mp3',
					},{
						singer:'大鹏',
						name:'再见理想',
						src:'http://music.163.com/song/media/outer/url?id=512359278.mp3',
					},
				],
				prepare:function(){
					music.updateInfo(music.list[0]);
					music.status=music.list[0];
				},
				init:function(audio) {
					var obj={
						onloadstart:()=>{
							console.info('开始加载:'+this.status.singer+' - '+this.status.name);
							$('.dot').addClass('active');
							music.updateInfo(this.status);
							music.reset();
						},
						onloadedmetadata:()=>{
							music.updateProgress();
						},
						oncanplay:()=>{
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
					switch(this.playMode){
						case 'loop1':
							this.star(this.status);
						;break;
						case 'random':
							this.star(this.list.findRandom());
						;break;
						default:
							var next=this.list.findNext(this.status);
							this.star(next);
						;break;
					}
				},
				prev:function(){
					var prev=this.list.findPrev(this.status);
					this.star(prev);
				},
				changePlayMode:function(mode){
					var m=['loop','loop1','random'];
					var index=m.indexOf(mode);
					var next=m[(index+1)%3];
					this.playMode=next;
					$('.PM').removeClass('icon-'+mode).addClass('icon-'+next);
				},
				toggle:function(){
					var play=$('.icon-play');
					var pause=$('.icon-pause');
					play.addClass('icon-pause').removeClass('icon-play');
					pause.addClass('icon-play').removeClass('icon-pause');
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
					var pause=$('.icon-pause');
					pause.addClass('icon-play').removeClass('icon-pause');
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
			window.music=music;
			music.prepare();
			//为什么这么写？因为.pause是后来添加的类名，在此之前声明的方法无效
			$('.playGroup').on('click','.icon-play',function(){
				if(window.audio){
					music.continue();
				}
				else{
					var songInfo=music.list[0];
					music.star(songInfo);
				}
			})
			$('.playGroup').on('click','.icon-pause',function(){
				music.pause();
			})
			$('.icon-next').click(function(){
				music.next();
			});
			$('.icon-prev').click(function(){
				music.prev();
			});
			$('.PM').click(function(){
				var mode=$(this).attr('class').split(' ')[3].replace(/icon-/g,'');
				music.changePlayMode(mode);
			});
			$('.musicPic').click(function(){
				music.showInterface();
			});
			$('.icon-back').click(function(){
				music.hideInterface();
			});
			//调整音量
			$('.vc').on('input propertychange',function(){
               var value=$(this)[0].value;
			   music.volChange(value);
            })
		}());

		//系统UI
		(function(){
			let ui={
				full:function(){
					$('#container').removeAttr('style').toggleClass('full');
				},
				showAlert:function(text,callback){
					var alert=$('body').putDiv('alert normal',text);
					setTimeout(function(){
						if(callback) callback();
						alert.remove();
					},2000)
				},
				container:{
					move:function(e){
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
					},
				},
				LS:{
					show:function(){
						$('#LSmask').fadeIn();
					},
					hide:function(){
						$('#LSmask').fadeOut();
					},
					preserve:function(){
						$('.front').removeClass('active');
						$('.behind').addClass('active');
					}
				}
			}
			window.ui=ui;
			
			$('.icon-full').click(ui.full);
			$('#header').dblclick(ui.full);
			$('#header').on('mousedown',function(e){
				ui.container.move(e);
			});
			$('#LSmask *').click(function(){
				return false;
			})
			$('#LSmask').click(ui.LS.hide);
			$('.slide').click(function() {
				$('.slide.active,.page.active').removeClass('active');
				$(this).addClass('active');	
				var index=$(this).index();
				if($(this).getParent(2).hasClass('myMusic')) index+=4;
				$('.page').eq(index).addClass('active');
			});
			$('.tab_item').click(function() {
				$(this).addClass('active');
				$(this).siblings().removeClass('active');
				var id = $(this).index(); //当前操作的元素索引值 
				var number1 = 65 + id * 120;
				var number2 = -id * 330;
				$('.slider').animate({
					marginLeft: number1
				});
				$('.formGroup').animate({
					marginLeft: number2
				});
			});
		}());

		//网络
		(function(){
			let net={
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
				sign:function(obj,callback){
					obj.type='sign';
					this.post(obj,'注册成功',callback);
				},
				login:function(obj,callback){
					obj.type='login';
					console.log(this);
					this.post(obj,'登录成功',callback);
				},
				post:function(obj,prompt,callback){
					var url="http://localhost/page/main/main.php/";
					$.post(url,obj,function(result){
						console.log(result);
						if(result==prompt){
							ui.preserve();
						}
						else ui.showAlert(result,callback);
					},'text');
				},
				checkLogin:function(){
					return false;
				},
			}
			window.net=net;
			$('.user').click(function(){
				var bool=net.checkLogin();
				if(!bool){
					ui.LS.show();
				}
			});
			$('.sumbit').click(function(){
				//设置禁用->防止多次提交
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
				var result=net.checkReg(userInfo);
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

		}());

		//存储
		(function(){
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
			window.storage=storage;
		}());

		//主题组件
		(function(){
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
			window.theme=theme;
			theme.init();
			$('.icon-skin').click(function(){
				theme.Next();
			});
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