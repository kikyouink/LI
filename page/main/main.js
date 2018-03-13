(function(){
	$(document).ready(function(){
		//准备工作
		console.log('Github网速报警系统');

		//媒体组件
		(function(){
			let media={
				status:null,
				statusInfo:null,
				type:'audio',
				playMode:'loop',
				mvList:[
					{	
						singer:'薛之谦',
						song:'演员',
						count:235,
						src:'http://v4.music.126.net/20180313143356/dd49b9aa854147fedc9e2c41ae444340/web/cloudmusic/MTAwMDAiMCQ4ICUgOCFhZg==/mv/420144/9979dc884a5cf23f5b6cf7c72729f7e4.mp4',
						picSrc:'http://p1.music.126.net/pBb_xbVvSxb4-AYOerOiaw==/109951163076398998.jpg?param=260y150',
					},{
						song:'Let me go',
						singer:'Avril Lavigne',
						count:126,
						src:'http://v4.music.126.net/20180313144111/fd632bf0ae93e139e3b75659051e4e6c/web/cloudmusic/ICQiImAxICAhMDFiISYwJQ==/mv/==/193092/20140702161650/120946279121156_720.mp4',
						picSrc:'http://p1.music.126.net/6FLiLzK-oNEI5nu6jSGO9Q==/5968149115568307.jpg?param=260y150',
					},{	
						song:'你要的全拿走',
						singer:'胡彦斌',
						count:87,
						src:'http://v4.music.126.net/20180313144202/3c317a9e3773bfa360b424a023deb0b0/web/cloudmusic/MDAgIDEyIGImICAkMDQwIA==/mv/5779938/efd1c9ae0b810af325b4604cdf94eb1a.mp4',
						picSrc:'http://p1.music.126.net/NGh_kn3yNoCDAvsBQqliTA==/109951163108885378.jpg?param=260y150',
					}
				],
				favoriteList:[
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
					},{	
						song:'你要的全拿走',
						singer:'胡彦斌',
						aublm:'勿好',
						src:'http://music.163.com/song/media/outer/url?id=529668356.mp3',
					}
				],
				playList:[
					{
						name:'致暗恋：陪伴是最怂的告白',
						count:67,
						picSrc:'http://p1.music.126.net/C-j6pDQMLp77xeTxp-DDyg==/109951163174551039.jpg?param=140y140',
					},{
						name:'「古风」错身遇个你，穷尽诗家笔',
						count:12,
						picSrc:'http://p1.music.126.net/pX2lsnYvvVCmykkA6qpdAA==/18930291695999064.jpg?param=140y140',
					},{
						name:'粤语男声 I 我已见过银河 但我只爱一颗星',
						count:463,
						picSrc:'http://p1.music.126.net/_ybcEpYdUVxuCct1yQwpyg==/109951163093420045.jpg?param=140y140',
					},{
						name:'没有过不去的事，只有过不去的心',
						count:32,
						picSrc:'http://p1.music.126.net/lhLM8ZrMuAhTqqMSa22zzg==/109951163179323728.jpg?param=140y140',
					},{
						name:'暖春，寄一首阳光明媚的歌给你',
						count:382,
						picSrc:'http://p1.music.126.net/8UlHDv3_ynDCsz4TC-Raxw==/109951163160241235.jpg?param=140y140',
					}
				],
				showInfo:function(){
					console.log('media.type: '+media.type);
					console.log('media.statusInfo: '+media.statusInfo.singer);
				},
				prepare:function(){
					if(media.type=='audio'){
						media.updateInfo(media.favoriteList[0]);
						media.statusInfo=media.favoriteList[0];
					}
					else{
						media.updateInfo(media.mvList[0]);
						media.statusInfo=media.mvList[0];
					}
				},
				star:function(mediaInfo){
					var src=mediaInfo.src;
					media.new(src).trigger('play');
					if(media.type=='audio'){
						media.vol.slowUp();
					}
					else media.showInterface();
					media.statusInfo=mediaInfo;
				},
				new:function(src){
					var m;
					if(media.status){
						media.status[0].src=src;	
						media.status.trigger('load');
					}
					else{
						if(media.type=='audio'){
						m=$('<audio></audio>');
						m.attr('src',src);
						}
						else{
							//new Video()无法使用，既然有new Audio为什么不能有new Video
							m=$('.videoPlayer').put('video','media')
							m.attr({
								'src':src,
								'type':'video/mp4',
							});
						}
						media.init(m);
						media.status=m;
					}		
					return media.status;
				},
				init:function(m) {
					var obj={
						onloadstart:()=>{
							console.info('开始加载:'+media.statusInfo.singer+' - '+media.statusInfo.song);
							$('.dot').addClass('active');
							media.updateInfo(media.statusInfo);
							media.reset();
						},
						onloadedmetadata:()=>{
							media.updateProgress();
						},
						oncanplay:()=>{
							media.toggle();
							$('.dot').removeClass('active');
						},					
						onerror:()=>{
							console.error('加载出错...');
						},
						onstalled:()=>{
							$('.dot').addClass('active');
							console.info('缓冲中...');
						},
						onended:()=>{
							media.next();
						},
					};
					for(var i in obj){
						m[0][i]=obj[i];
					}
				},
				//从头播放
				continue:function(){
					media.status.trigger('play');
					media.vol.slowUp();
					media.toggle();
				},
				pause:function(){
					media.toggle();
					media.vol.slowDown(function(){
						media.status.trigger('pause');
					});
				},
				next:function(){
					if(media.type=='audio'){
						switch(media.playMode){
							case 'loop1':
							media.star(media.statusInfo);
							;break;
							case 'random':
							media.star(media.favoriteList.findRandom());
							;break;
							default:
								var next=media.favoriteList.findNext(media.statusInfo);
								media.star(next);
							;break;
						}
					}
					else{
						var next=media.mvList.findNext(media.statusInfo);
						media.star(next);
					}
				},
				prev:function(){
					if(media.type=='audio'){
						switch(media.playMode){
							case 'loop1':
							media.star(media.statusInfo);
							;break;
							case 'random':
							media.star(media.favoriteList.findRandom());
							;break;
							default:
								var prev=media.favoriteList.findPrev(media.statusInfo);
								media.star(prev);
							;break;
						}
					}
					else{
						var prev=media.mvList.findPrev(media.statusInfo);
						media.star(prev);
					}
				},
				changePlayMode:function(mode){
					var m=['loop','loop1','random'];
					var index=m.indexOf(mode);
					var next=m[(index+1)%3];
					media.playMode=next;
					$('.PM').removeClass('icon-'+mode).addClass('icon-'+next);
				},
				toggle:function(){
					var play=$('.icon-play');
					var pause=$('.icon-pause');
					play.addClass('icon-pause').removeClass('icon-play');
					pause.addClass('icon-play').removeClass('icon-pause');
					$('.disc').toggleClass('active');
				},
				updateInfo:function(mediaInfo){
					var picSrc=media.loadSingerSrc(mediaInfo);
					//url括号里面还要加引号，好坑
					$('.musicPic').css('background-image',"url('"+picSrc+"')");
					$('.songName').text(mediaInfo.song);
					$('.singer').text(mediaInfo.singer);
				},
				updateProgress:function(){
					var getTime=function(time){
						var min=parseInt(time/60);
						var sec=parseInt(time%60);
						return [min,sec].join(':').replace(/\b(\d)\b/g, "0$1");
					}
					var all=media.status[0].duration;		
					$(".time.r").text(getTime(all));
					setInterval(function(){
						var all=media.status[0].duration;	
						var status=media.status[0].currentTime;
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
				loadSingerSrc:function(mediaInfo){
					var src='assest/img/singer/'+mediaInfo.singer+'.png';
					return src;
				},
				vol:{
					change:(value)=>{
						if(!media.status) return ;
						media.status[0].volume=value;
						$('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
					},
					slowUp:function(){
						media.status[0].volume=0;
						var limit=$('.vc')[0].value;
						var timer=setInterval(function(){
							if(media.status[0].volume<Math.min(limit,0.95)){
								media.status[0].volume+=0.05;
								window.uping=false;
							}
							else{
								clearInterval(timer);
							}
						},60);
					},
					slowDown:function(callback){
						var timer=setInterval(function(){
							if(media.status[0].volume>0.05){
								media.status[0].volume-=0.05;
							}
							else{
								clearInterval(timer);
								callback();
							}
						},60);
					},
					toggle:function(){
						if(media.status[0].volume!=0){
							media.status[0].volume=0;
							$('.icon-vol').removeClass('icon-vol').addClass('icon-mute');
						}
						else{
							media.status[0].volume=$('.vc')[0].value;
							$('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
						}
					}
				},
				showInterface:function(){
					$('#main').hide();
					if(media.type=='audio'){
						$('#musicInterface').fadeIn();
					}
					else $('#videoInterface').fadeIn();
				},
				hideInterface:function(){
					if(media.type=='audio'){
						$('#musicInterface').fadeOut();
					}
					else $('#videoInterface').fadeOut();
					$('#main').show();
				},
			};
			window.media=media;

			media.prepare();
			//为什么这么写？因为.pause是后来添加的类名，在此之前声明的方法无效
			$('.playGroup').on('click','.icon-play',function(){
				if(media.status){
					media.continue();
				}
				else{
					console.log(ui.statusPage);
					if(!ui.statusPage.hasClass('page_video')){
						var mediaInfo=media.favoriteList[0];
						media.type='audio';
						media.star(mediaInfo);
					}
					else{
						var mediaInfo=media.mvList[0];
						media.type='video';
						media.star(mediaInfo);
					}
				}
			})
			$('.playGroup').on('click','.icon-pause',function(){
				media.pause();
			})
			$('.icon-next').click(function(){
				media.next();
			});
			$('.icon-prev').click(function(){
				media.prev();
			});
			//播放模式
			$('.PM').click(function(){
				var mode=$(this).attr('class').split(' ')[3].replace(/icon-/g,'');
				media.changePlayMode(mode);
			});
			//播放界面
			$('.musicPic').click(function(){
				media.showInterface();
			});
			$('.icon-back').click(function(){
				media.hideInterface();
			});
			//调整音量
			$('.vc').on('input propertychange',function(){
			   var value=$(this)[0].value;
			   media.vol.change(value);
			})
			$('.icon-vol').click(function(){
				media.vol.toggle();
			});
			//播放favoriteList
			$('table').on('click','tr',function(){
				var index=$(this).index()-1;
				var mediaInfo=media.favoriteList[index];
				media.star(mediaInfo);
			});
			//播放mvList
			$('.mvList').on('click','.mv',function(){
				var index=$(this).index();
				var mediaInfo=media.mvList[index];
				media.star(mediaInfo);
			});

		}());

		//系统UI
		(function(){
			let ui={
				statusPage:null,
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
						$('#main').addClass('blur');
					},
					hide:function(){
						$('#LSmask').fadeOut();
						$('#main').removeClass('blur');
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
				creatPlayList:function(){
					$('.playList').putDiv('uc','',5);
					for(var i=0;i<media.playList.length;i++){
						var uc=$('.uc').eq(i);
						var tp=uc.putDiv('tp',media.playList[i].count+'万');
						var icon=tp.put('i','iconfont icon-count');
						var bt=uc.putDiv('bt',media.playList[i].name);
						var img=uc.put('img');
						img.attr('src',media.playList[i].picSrc);
					}
				},
				creatFavoriteList:function(){
					var num=media.favoriteList.length;
					$('tbody').put('tr','','',num);
					$('tr').not("tr:first-child").put('td','','',4);
					var th=['song','singer','aublm'];
					for(var i=0;i<num;i++){
						var tr=$('tr').eq(i+1);
						for(var j=0;j<4;j++){
							var td=tr.children().eq(j);
							if(j==0) td.text('0'+(i+1));
							else td.text(media.favoriteList[i][th[j-1]])
						}
					}			
				},
				creatMvList:function(){
					$('.mvList').putDiv('mv','',3);
					// console.log(media.mvList);
					for(var i=0;i<media.mvList.length;i++){
						var mv=$('.mv').eq(i);
						var tp=mv.putDiv('tp',media.mvList[i].count+'万');
						var icon=tp.put('i','iconfont icon-count');
						var bt=mv.putDiv('bt',media.mvList[i].singer+' - '+media.mvList[i].song);
						var img=mv.put('img');
						img.attr('src',media.mvList[i].picSrc);
					}
				},
			}
			window.ui=ui;

			ui.creatFavoriteList();
			ui.creatPlayList();
			ui.creatMvList();

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
				if($(this).getParent(2).index()==1) index+=4;
				var page=$('.page').eq(index);
				page.addClass('active');
				if(page.hasClass('page-video')) media.type='video';
				else media.type='audio';
				ui.statusPage=page;

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