(function () {
	$(document).ready(function () {
		//准备工作
		console.log('Github网速报警系统');

		//媒体组件
		(function () {
			let media = {
				status: null,
				statusInfo: null,
				type: 'audio',
				playMode: 'loop',
				mvList: [
					{
						singer: '薛之谦',
						song: '演员',
						count: 235,
						src: 'http://sh.yinyuetai.com/uploads/videos/common/B9CD014DD1060714F702921E08C0A8CF.mp4?sc=ec3101a9f08d9589&br=6180&vid=2305739&aid=215&area=ML&vst=0',
						picSrc: 'http://p1.music.126.net/pBb_xbVvSxb4-AYOerOiaw==/109951163076398998.jpg?param=260y150',
					}, {
						song: 'Let me go',
						singer: 'Avril Lavigne',
						count: 126,
						src: 'http://he.yinyuetai.com/uploads/videos/common/85340141C7225CFAFAE0258145AFDC53.flv?sc=ab1ac2019e77e358&br=3130&vid=788335&aid=165&area=US&vst=0',
						picSrc: 'http://p1.music.126.net/6FLiLzK-oNEI5nu6jSGO9Q==/5968149115568307.jpg?param=260y150',
					}, {
						song: '你要的全拿走',
						singer: '胡彦斌',
						count: 87,
						src: 'http://sh.yinyuetai.com/uploads/videos/common/E1710160F7875B0E2438D9DB016E92B8.mp4?sc=8498b9b85e73730f&br=6165&vid=3134671&aid=84&area=ML&vst=0',
						picSrc: 'http://p1.music.126.net/NGh_kn3yNoCDAvsBQqliTA==/109951163108885378.jpg?param=260y150',
					}, {
						song: 'Faded',
						singer: 'Alan Walker',
						count: 1615,
						src: 'http://sh.yinyuetai.com/uploads/videos/common/F9EC015C4E0DC769FC7480ABFEA8B8C3.mp4?sc=8a25e482d49010a0&br=6166&vid=2873483&aid=39583&area=US&vst=4',
						picSrc: 'http://p1.music.126.net/Ty1U14s4cfK3FyIJCyPoyQ==/3264450030324198.jpg?param=260y150',
					}, {
						song: 'Good Time',
						singer: 'Carly Rae Jepsen',
						count: 518,
						src: 'http://sh.yinyuetai.com/uploads/videos/common/2FC401536A5F8F55D6510E1B91A4DE47.mp4?sc=c554508e9dbb6001&br=5381&vid=468772&aid=2749&area=US&vst=0',
						picSrc: 'http://p1.music.126.net/7QhXNnVwQTedm_cdINJkfw==/6011030069051409.jpg?param=260y150',
					}, {
						song: 'We are young',
						singer: 'Fun./Janelle Monáe',
						count: 765,
						src: 'http://he.yinyuetai.com/uploads/videos/common/6F4A013D1778B80B1C5C9593762E807A.flv?sc=d8e26461313b6d4a&br=2401&vid=615490&aid=19846&area=US&vst=4',
						picSrc: 'http://p1.music.126.net/7I1umlwhYaFPoeHuSXFbJA==/6068204673695852.jpg?param=260y150',
					},

				],
				favoriteList: [
					{
						song: 'Heartbeats',
						singer: 'Amy Deasismont',
						aublm: 'Swings & Roundabouts',
						src: 'http://music.163.com/song/media/outer/url?id=2175282.mp3',
					}, {
						song: '晚安',
						singer: '林宥嘉',
						aublm: '2011年度百首最佳单曲',
						src: 'http://music.163.com/song/media/outer/url?id=108301.mp3',
					}, {
						song: '凉凉',
						singer: '张碧晨',
						aublm: '三生三世十里桃花',
						src: 'http://www.tingge123.com/mp3/2017-05-22/1495450394.mp3',
					}, {
						song: '单人旅途',
						singer: '许嵩',
						aublm: '寻雾启示',
						src: 'http://music.163.com/song/media/outer/url?id=167860.mp3',
					}, {
						song: '再见理想',
						singer: '大鹏',
						aublm: '缝纫机乐队',
						src: 'http://music.163.com/song/media/outer/url?id=512359278.mp3',
					}, {
						song: 'Wonderful U',
						singer: 'AGA',
						aublm: 'Ginadoll',
						src: 'http://music.163.com/song/media/outer/url?id=406475394.mp3',
					}, {
						song: 'I Realy Like You',
						singer: 'Carly Rae Jepsen',
						aublm: 'Love Me Like You Do',
						src: 'http://music.163.com/song/media/outer/url?id=30841076.mp3',
					}, {
						song: '你要的全拿走',
						singer: '胡彦斌',
						aublm: '勿好',
						src: 'http://music.163.com/song/media/outer/url?id=529668356.mp3',
					}
				],
				playList: [
					{
						name: '致暗恋：陪伴是最怂的告白',
						count: 67,
						picSrc: 'http://p1.music.126.net/C-j6pDQMLp77xeTxp-DDyg==/109951163174551039.jpg?param=140y140',
					}, {
						name: '「古风」错身遇个你，穷尽诗家笔',
						count: 12,
						picSrc: 'http://p1.music.126.net/pX2lsnYvvVCmykkA6qpdAA==/18930291695999064.jpg?param=140y140',
					}, {
						name: '粤语男声 I 我已见过银河 但我只爱一颗星',
						count: 463,
						picSrc: 'http://p1.music.126.net/_ybcEpYdUVxuCct1yQwpyg==/109951163093420045.jpg?param=140y140',
					}, {
						name: '没有过不去的事，只有过不去的心',
						count: 32,
						picSrc: 'http://p1.music.126.net/lhLM8ZrMuAhTqqMSa22zzg==/109951163179323728.jpg?param=140y140',
					}, {
						name: '暖春，寄一首阳光明媚的歌给你',
						count: 382,
						picSrc: 'http://p1.music.126.net/8UlHDv3_ynDCsz4TC-Raxw==/109951163160241235.jpg?param=140y140',
					}
				],
				commentList:[
					{
						user:'Cielle_',
						content:'这前奏一响起就想起了高中晚自习结束的时候。那年每天晚上广播都放着这首歌陪我们从教室走回寝室。下课铃响的喧嚣，想着找谁一起回去，前桌的扯着嗓子喊后排的哥们，去寝室楼下的小卖部买点零食，有暗恋对象的人又琢磨着怎么过去说句话... 高三枯燥却也难忘。你要问我想不想重来一次？？？不想',
						time:'2015-07-11 22:53',
						picSrc:'http://p1.music.126.net/uMUWnY0aXRxgzPTckR78XA==/109951163154305781.jpg?param=50y50',
					},
					{
						user:'小Q',
						content:'感谢这首歌陪伴了我在英国读书期间多个濒临绝望的夜晚，学习、生活的压力加上思乡之情让我多次想要放弃，但最后还是坚持下来了。。。别人听这首歌可能是舒缓的，对我来说却是励志的，虽然现在每每听到还是会想落泪，但总算熬到了可以忆苦思甜的阶段了',
						time:'2015-07-27 12:47',
						picSrc:'http://p1.music.126.net/sfzSrdDxXb8tDuHnUJFWdQ==/2544269909009311.jpg?param=50y50',
					},
					{
						user:'雪见',
						content:'晚上不戴耳塞睡不好觉的人真是伤不起，听好听的歌还会越听越精神',
						time:'2017-11-26 22:53',
						picSrc:'http://p1.music.126.net/67vp_JAzs3TGRl70XipU5g==/3236962232949237.jpg?param=50y50',
					},
					{
						user:'Alex',
						content:'好优雅，适合睡觉听',
						time:'2017-11-26 22:53',
						picSrc:'http://p1.music.126.net/F2qnZ-pTNCxNGI_4-ILIbA==/109951163187367138.jpg?param=50y50',
					},
					{
						user:'有你的将来',
						content:'感觉其他歌别人都能唱，晚安只有林宥嘉能唱出那种味道，他声线很温暖很华丽',
						time:'2017-11-26 22:53',
						picSrc:'http://p1.music.126.net/SxZcj3hvuOi8sRUEVnLNew==/109951163140992704.jpg?param=50y50',
					},
				],
				showInfo: function () {
					console.log('media.type: ' + media.type);
					console.log('media.statusInfo: ' + media.statusInfo.singer);
				},
				prepare: function () {
					if (media.type == 'audio') {
						media.updateInfo(media.favoriteList[0]);
						media.statusInfo = media.favoriteList[0];
					}
					else {
						media.updateInfo(media.mvList[0]);
						media.statusInfo = media.mvList[0];
					}
				},
				star: function (mediaInfo) {
					var src = mediaInfo.src;
					media.new(src).trigger('play');
					if (media.type == 'video') {
						media.showInterface();
					}
					media.vol.slowUp();
					media.statusInfo = mediaInfo;
				},
				new: function (src) {
					var m;
					if (media.status && media.status[0].tagName.toLocaleLowerCase() == media.type) {
						media.status[0].src = src;
						media.status.trigger('load');
					}
					else {
						if (media.status) media.status.remove();
						if (media.type == 'audio') {
							m = $('<audio></audio>');
							m.attr('src', src);
							$('#mask').append(m);
						}
						else {
							//new Video()无法使用，既然有new Audio为什么不能有new Video
							m = $('.videoPlayer').put('video', 'media')
							m.attr({
								'src': src,
								'type': 'video/mp4',
							});
						}
						media.init(m);
						media.status = m;
					}
					return media.status;
				},
				init: function (m) {
					var obj = {
						onloadstart: () => {
							console.info('开始加载:' + media.statusInfo.singer + ' - ' + media.statusInfo.song);
							$('.dot').addClass('active');
							media.updateInfo(media.statusInfo);
							media.reset();
						},
						onloadedmetadata: () => {
							media.updateProgressAuto();
						},
						oncanplay: () => {
							media.toggle();
							$('.dot').removeClass('active');
						},
						onerror: () => {
							console.error('加载出错...');
							this.next();
						},
						onstalled: () => {
							$('.dot').addClass('active');
							console.info('缓冲中...');
						},
						onended: () => {
							media.next();
						},
					};
					for (var i in obj) {
						m[0][i] = obj[i];
					}
				},
				//从头播放
				continue: function () {
					media.status.trigger('play');
					media.vol.slowUp();
					media.toggle();
				},
				pause: function () {
					media.toggle();
					media.vol.slowDown(function () {
						media.status.trigger('pause');
					});
				},
				next: function () {
					if (media.type == 'audio') {
						switch (media.playMode) {
							case 'loop1':
								media.star(media.statusInfo);
								; break;
							case 'random':
								media.star(media.favoriteList.findRandom());
								; break;
							default:
								var next = media.favoriteList.findNext(media.statusInfo);
								media.star(next);
								; break;
						}
					}
					else {
						var next = media.mvList.findNext(media.statusInfo);
						media.star(next);
					}
				},
				prev: function () {
					if (media.type == 'audio') {
						switch (media.playMode) {
							case 'loop1':
								media.star(media.statusInfo);
								; break;
							case 'random':
								media.star(media.favoriteList.findRandom());
								; break;
							default:
								var prev = media.favoriteList.findPrev(media.statusInfo);
								media.star(prev);
								; break;
						}
					}
					else {
						var prev = media.mvList.findPrev(media.statusInfo);
						media.star(prev);
					}
				},
				changePlayMode: function (mode) {
					var m = ['loop', 'loop1', 'random'];
					var index = m.indexOf(mode);
					var next = m[(index + 1) % 3];
					media.playMode = next;
					$('.PM').removeClass('icon-' + mode).addClass('icon-' + next);
				},
				toggle: function () {
					var play = $('.icon-play');
					var pause = $('.icon-pause');
					play.addClass('icon-pause').removeClass('icon-play');
					pause.addClass('icon-play').removeClass('icon-pause');
					$('.disc').toggleClass('active');
				},
				updateInfo: function (mediaInfo) {
					var picSrc = media.loadSingerSrc(mediaInfo);
					//url括号里面还要加引号，好坑
					$('.musicPic').css('background-image', "url('" + picSrc + "')");
					$('.songName').text(mediaInfo.song);
					$('.singer').text(mediaInfo.singer);
				},
				updateProgress: function (e) {
					var width = e.pageX - $('.progress').offset().left;
					var all = media.status[0].duration;
					media.status[0].currentTime = width * all / $('.progress').width();
					$('.progress_active').css('width', width);
				},
				updateProgressAuto: function (e) {
					var getTime = function (time) {
						var min = parseInt(time / 60);
						var sec = parseInt(time % 60);
						return [min, sec].join(':').replace(/\b(\d)\b/g, "0$1");
					}
					var all = media.status[0].duration;
					var length = $('.progress').width();
					$(".time.r").text(getTime(all));
					setInterval(function () {
						var all = media.status[0].duration;
						var status = media.status[0].currentTime;
						var precent = status / all;
						var width = length * precent;
						$('.progress_active').css('width', width);
						$(".time.l").text(getTime(status));
					}, 500);
				},

				reset: function () {
					$('.progress_active').removeAttr('style');
					var pause = $('.icon-pause');
					pause.addClass('icon-play').removeClass('icon-pause');
					$('.disc').removeClass('active');

				},
				loadSingerSrc: function (mediaInfo) {
					var src = 'assest/img/singer/' + mediaInfo.singer + '.png';
					return src;
				},
				vol: {
					change: (value) => {
						if (!media.status) return;
						media.status[0].volume = value;
						$('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
					},
					slowUp: function () {
						media.status[0].volume = 0;
						var limit = $('.vc')[0].value;
						var timer = setInterval(function () {
							if (media.status[0].volume < Math.min(limit, 0.95)) {
								media.status[0].volume += 0.05;
								window.uping = false;
							}
							else {
								clearInterval(timer);
							}
						}, 60);
					},
					slowDown: function (callback) {
						var timer = setInterval(function () {
							if (media.status[0].volume > 0.05) {
								media.status[0].volume -= 0.05;
							}
							else {
								clearInterval(timer);
								callback();
							}
						}, 60);
					},
					toggle: function () {
						if (media.status[0].volume != 0) {
							media.status[0].volume = 0;
							$('.icon-vol').removeClass('icon-vol').addClass('icon-mute');
						}
						else {
							media.status[0].volume = $('.vc')[0].value;
							$('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
						}
					}
				},
				showInterface: function () {
					$('#main').hide();
					if (media.type == 'audio') {
						$('#musicInterface').fadeIn();
					}
					else $('#videoInterface').fadeIn();
				},
				hideInterface: function () {
					if (media.type == 'audio') {
						$('#musicInterface').fadeOut();
					}
					else $('#videoInterface').fadeOut();
					$('#main').show();
				},
			};
			window.media = media;

			media.prepare();
			//为什么这么写？因为.pause是后来添加的类名，在此之前声明的方法无效
			$('.playGroup').on('click', '.icon-play', function () {
				if (media.status) {
					media.continue();
				}
				else {
					if (media.type == 'audio') {
						var mediaInfo = media.favoriteList[0];
						media.type = 'audio';
						media.star(mediaInfo);
					}
					else {
						var mediaInfo = media.mvList[0];
						media.type = 'video';
						media.star(mediaInfo);
					}
				}
			})
			$('.playGroup').on('click', '.icon-pause', function () {
				media.pause();
			})
			$('.icon-next').click(function () {
				media.next();
			});
			$('.icon-prev').click(function () {
				media.prev();
			});
			//播放模式
			$('.PM').click(function () {
				var mode = $(this).attr('class').split(' ')[3].replace(/icon-/g, '');
				media.changePlayMode(mode);
			});
			//播放界面
			$('.musicPic').click(function () {
				media.showInterface();
			});
			$('.icon-back').click(function () {
				media.hideInterface();
			});
			$('.progress').click(function (e) {
				media.updateProgress(e);
			});
			//调整音量
			$('.vc').on('input propertychange', function () {
				var value = $(this)[0].value;
				media.vol.change(value);
			})
			$('.icon-vol').click(function () {
				media.vol.toggle();
			});
			//播放favoriteList
			$('table').on('click', 'tr', function () {
				media.type = 'audio';
				var index = $(this).index() - 1;
				var mediaInfo = media.favoriteList[index];
				media.star(mediaInfo);
			});
			//播放mvList
			$('.mvList').on('click', '.mv', function () {
				media.type = 'video';
				var index = $(this).index();
				var mediaInfo = media.mvList[index];
				media.star(mediaInfo);
			});

		}());

		//系统UI
		(function () {
			let ui = {
				full: function () {
					$('#container').removeAttr('style').toggleClass('full');
				},
				showAlert: function (text, callback) {
					var alert = $('body').putDiv('alert normal', text);
					setTimeout(function () {
						if (callback) callback();
						alert.remove();
					}, 2000)
				},
				container: {
					move: function (e) {
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
				LS: {
					show: function () {
						$('#LSmask').fadeIn();
						$('#main,#mask').addClass('blur');
					},
					hide: function () {
						$('#LSmask').fadeOut();
						$('#main,#mask').removeClass('blur');
					},
					preserve: function (callback) {
						$('.front').toggleClass('active');
						$('.behind').toggleClass('active');
						if (callback) {
							setTimeout(function () {
								callback();

							}, 2000);
						}

					}
				},
				creatPlayList: function () {
					$('.playList').putDiv('uc', '', 5);
					for (var i = 0; i < media.playList.length; i++) {
						var uc = $('.uc').eq(i);
						var tp = uc.putDiv('tp', media.playList[i].count + '万');
						var icon = tp.put('i', 'iconfont icon-count');
						var bt = uc.putDiv('bt', media.playList[i].name);
						var img = uc.put('img');
						img.attr('src', media.playList[i].picSrc);
					}
				},
				creatFavoriteList: function () {
					var num = media.favoriteList.length;
					$('tbody').put('tr', '', '', num);
					$('tr').not("tr:first-child").put('td', '', '', 4);
					var th = ['song', 'singer', 'aublm'];
					for (var i = 0; i < num; i++) {
						var tr = $('tr').eq(i + 1);
						for (var j = 0; j < 4; j++) {
							var td = tr.children().eq(j);
							if (j == 0) td.text('0' + (i + 1));
							else td.text(media.favoriteList[i][th[j - 1]])
						}
					}
				},
				creatMvList: function () {
					$('.mvList').putDiv('mv', '', media.mvList.length);
					// console.log(media.mvList);
					for (var i = 0; i < media.mvList.length; i++) {
						var mv = $('.mv').eq(i);
						var tp = mv.putDiv('tp', media.mvList[i].count + '万');
						var icon = tp.put('i', 'iconfont icon-count');
						var bt = mv.putDiv('bt', media.mvList[i].singer + ' - ' + media.mvList[i].song);
						var img = mv.put('img');
						img.attr('src', media.mvList[i].picSrc);
					}
				},
				creatCommentList:function(){
					$('.commentList').putDiv('comment', '', media.commentList.length);
					// console.log(media.mvList);
					for (var i = 0; i < media.commentList.length; i++) {
						var comment = $('.comment').eq(i);
						var avatar=comment.putDiv('avatar');
						var img = avatar.put('img');
						img.attr('src', media.commentList[i].picSrc);
						var content=comment.putDiv('content');
						var username=content.put('strong','cname',media.commentList[i].user+':');
						var p=content.put('p','',media.commentList[i].content);
						var time=content.put('span','',media.commentList[i].time);
					}
				}
			}
			window.ui = ui;

			ui.creatFavoriteList();
			ui.creatPlayList();
			ui.creatMvList();
			ui.creatCommentList();

			$('.icon-full').click(ui.full);
			$('#header').dblclick(ui.full);
			$('#LSmask').click(ui.LS.hide);

			$('#header').on('mousedown', function (e) {
				ui.container.move(e);
			});
			$('#LSmask *').click(function () {
				return false;
			})
			$('.slide').click(function () {
				$('.slide.active,.page.active').removeClass('active');
				$(this).addClass('active');
				var index = $(this).index();
				if ($(this).getParent(2).index() == 1) index += 4;
				var page = $('.page').eq(index);
				page.addClass('active');
				ui.statusPage = page;

			});
			$('.segment a').click(function () {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
			});
			$('.tab_item').click(function () {
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
		(function () {
			let net = {
				checkReg: function (obj, mode) {
					for (let i in obj) {
						if (obj[i].length == 0) return 0;
						if (obj[i].length < 6 || obj[i].length > 15) return 1;
					}
					var reg;
					mode = mode || '';
					console.log(mode);
					switch (mode) {
						case 'remix': reg = /[^A-Za-z0-9_\-\u4e00-\u9fa5]+/g; break;//包括汉字
						default: reg = /\W+/g; break;
					}
					return reg.test(obj.username);
				},
				sign: function (obj, callback) {
					obj.type = 'sign';
					this.post(obj, '注册成功', callback);
				},
				login: function (obj, callback) {
					obj.type = 'login';
					console.log(this);
					this.post(obj, '登录成功', callback);
				},
				post: function (obj, prompt, callback) {
					// var url="http://localhost/page/main/main.php/";
					// $.post(url,obj,function(result){
					// 	console.log(result);
					// 	if(result==prompt){
					// 		ui.LS.preserve();
					// 	}
					// 	else ui.showAlert(result,callback);
					// },'text');
					ui.LS.preserve(function () {
						ui.LS.hide();
						$('.user_name').text(obj.username);
					});
				},
				checkLogin: function () {
					return false;
				},
			}
			window.net = net;
			$('.user').click(function () {
				var bool = net.checkLogin();
				if (!bool) {
					ui.LS.show();
				}
			});
			$('.sumbit').click(function () {
				//设置禁用->防止多次提交
				var that = $(this);
				var text = that.text();
				that.attr('disabled', 'true').text('提交中...');
				var username = that.siblings('.username').val();
				var password = that.siblings('.password').val();
				var userInfo = {
					username: username,
					password: password
				}
				function callback() {
					that.removeAttr('disabled').text(text);
				}
				//先检查正则相关问题，根据返回值进行相应处理
				var result = net.checkReg(userInfo, 'remix');
				switch (result) {
					case 0: ui.showAlert('用户名及密码不能为空', callback); break;
					case 1: ui.showAlert('用户名及密码均需6-15位以内', callback); break;
					case true: ui.showAlert('用户名需为字母数字组合', callback); break;
					case false:
						if (text == '注册') net.sign(userInfo, callback);
						else net.login(userInfo, callback);
						break;
				}
			});

		}());

		//存储
		(function () {
			let storage = {
				save: function (key, value) {
					localStorage.setItem(key, value);
				},
				get: function (key) {
					return localStorage.getItem(key);
				},
				delete: function (key) {
					localStorage.removeItem(key);
				},
			}
			window.storage = storage;
		}());

		//主题组件
		(function () {
			let theme = {
				list: ['red', 'purple', 'glass', 'star'],
				init: function () {
					var theme = storage.get('theme') || 'red';
					this.apply(theme);
				},
				//兼容火狐，火狐不支持disabled
				apply: function (theme) {
					var mode;
					if (theme == 'red' || theme == 'purple') mode = 'light'
					else mode = 'dark';
					var msrc = 'lib/theme/' + mode + '/' + mode + '.css';
					var tsrc = 'lib/theme/' + mode + '/' + theme + '.css';
					$('#mode').attr('href', msrc);
					$('#theme').attr('href', tsrc);
					storage.save('theme', theme);
				},
				change: function (theme) {
					this.apply(theme);
				},
				Next: function () {
					var theme = storage.get('theme') || 'red';
					var themeNext = this.list.findNext(theme);
					this.apply(themeNext);
				},
			}
			window.theme = theme;
			theme.init();
			$('.icon-skin').click(function () {
				theme.Next();
			});
		}());

		//轮播组件
		(function () {
			let flash = {
				init: function () {

				},
				next: function (time) {
					var index = 0;
					var li = ["p5", "p4", "p3", "p2", "p1"];
					setInterval(function () {
						index++;
						li.push(li[0]);
						li.shift();
						$('.pic').each(function (i, e) {
							$(e).removeClass().addClass('pic ' + li[i]);
						})
						var active = $('.buttons').children().eq(index);
						active.addClass('blue').siblings().removeClass('blue');
						if (index > 3) index = -1;
					}, time);
				},
			};
			flash.init();
			flash.next(3000);
		}());

	});
}())
