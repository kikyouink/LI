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
						song:'Heartbeats',
						singer:'Amy Deasismont',
						aublm:'Swings & Roundabouts',
						src:'http://music.163.com/song/media/outer/url?id=2175282.mp3',
					},{
						song:'晚安',
						singer:'林宥嘉',
						aublm:'2011年度百首最佳单曲',
						src:'http://music.163.com/song/media/outer/url?id=108301.mp3',
					},{
						song:'凉凉',
						singer:'张碧晨',
						aublm:'三生三世十里桃花',
						src:'http://www.tingge123.com/mp3/2017-05-22/1495450394.mp3',
					},{
						song:'单人旅途',
						singer:'许嵩',
						aublm:'寻雾启示',
						src:'http://music.163.com/song/media/outer/url?id=167860.mp3',
					},{
						song:'再见理想',
						singer:'大鹏',
						aublm:'缝纫机乐队',
						src:'http://music.163.com/song/media/outer/url?id=512359278.mp3',
					},{
						song:'忘记时间',
						singer:'胡歌',
						aublm:'仙剑奇侠传三',
						src:'http://music.163.com/song/media/outer/url?id=86360.mp3',
					},{
						song:'I Realy Like You',
						singer:'Carly Rae Jepsen',
						aublm:'Love Me Like You Do',
						src:'http://music.163.com/song/media/outer/url?id=30841076.mp3',
					}
				],
				prepare:function(){
					music.updateInfo(music.list[0]);
					music.status=music.list[0];
				},
				init:function(audio) {
					var obj={
						onloadstart:()=>{
							console.info('开始加载:'+this.status.singer+' - '+this.status.song);
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
					music.vol.slowUp();
				},
				continue:function(){
					window.audio.play();
					music.vol.slowUp();
					music.toggle();
				},
				pause:function(){
					music.toggle();
					music.vol.slowDown(function(){
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
					$('.songName').text(songInfo.song);
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
				vol:{
					change:(value)=>{
						if(!window.audio) return ;
						window.audio.volume=value;
						$('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
					},
					slowUp:function(){
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
					slowDown:function(callback){
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
					toggle:function(){
						if(window.audio.volume!=0){
							window.audio.volume=0;
							$('.icon-vol').removeClass('icon-vol').addClass('icon-mute');
						}
						else{
							window.audio.volume=$('.vc')[0].value;
							$('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
						}
					}
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
			//播放模式
			$('.PM').click(function(){
				var mode=$(this).attr('class').split(' ')[3].replace(/icon-/g,'');
				music.changePlayMode(mode);
			});
			//播放界面
			$('.musicPic').click(function(){
				music.showInterface();
			});
			$('.icon-back').click(function(){
				music.hideInterface();
			});
			//调整音量
			$('.vc').on('input propertychange',function(){
			   var value=$(this)[0].value;
			   music.vol.change(value);
			})
			$('.icon-vol').click(function(){
				music.vol.toggle();
			});
			//点击列表播放
			$('table').on('click','tr',function(){
				console.log('click');
				var index=$(this).index()-1;
				var songInfo=music.list[index];
				music.star(songInfo);

			});

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
						$('#main ,#mask').addClass('blur');
					},
					hide:function(){
						$('#LSmask').fadeOut();
						$('#main ,#mask').removeClass('blur');
					},
					preserve:function(callback){
						$('.front').toggleClass('active');
						$('.behind').toggleClass('active');
						if(callback){
							setTimeout(function(){
								callback();

							},2000);
						}
						
					}
				},
				creatFoundList:function(){

				},
				creatFavoriteList:function(){
					var num=music.list.length;
					$('tbody').put('tr','','',num);
					$('tr').not("tr:first-child").put('td','','',4);
					var th=['song','singer','aublm'];
					for(var i=0;i<num;i++){
						var tr=$('tr').eq(i+1);
						for(var j=0;j<4;j++){
							var td=tr.children().eq(j);
							if(j==0) td.text('0'+(i+1));
							else td.text(music.list[i][th[j-1]])
						}
					}			
				},
			}
			window.ui=ui;

			ui.creatFavoriteList();

			$('.icon-full').click(ui.full);
			$('#header').dblclick(ui.full);
			$('#LSmask').click(ui.LS.hide);

			$('#header').on('mousedown',function(e){
				ui.container.move(e);
			});
			$('#LSmask *').click(function(){
				return false;
			})

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
					// var url="http://localhost/page/main/main.php/";
					// $.post(url,obj,function(result){
					// 	console.log(result);
					// 	if(result==prompt){
					// 		ui.LS.preserve();
					// 	}
					// 	else ui.showAlert(result,callback);
					// },'text');
					ui.LS.preserve(function(){
						ui.LS.hide();
						$('.user_name').text(obj.username);
						ui.LS.preserve();
					});
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
				var result=net.checkReg(userInfo,'remix');
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
					var theme=storage.get('theme')||'red';
					this.apply(theme);
				},
				//兼容火狐，火狐不支持disabled
				apply:function(theme){
					var mode;
					if(theme=='red'||theme=='purple') mode='light'
					else mode='dark';
					var tsrc='lib/theme/'+theme+'.css';
					var msrc='lib/theme/'+mode+'.css';
					$('#theme').attr('href',tsrc);
					$('#mode').attr('href',msrc);
					storage.save('theme',theme);
				},
				change:function(theme){
					this.apply(theme);
				},
				Next:function(){
					var theme=storage.get('theme')||'red';
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