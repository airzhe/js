/**	
 *===============
 * 移动层插件
 *===============
 */

 $.fn.extend({
 	drag:function(options){
		//默认配置
		var _default={drag:'.drag'}
		var opt = $.extend(_default, options);
		//
		var self=$(this);
		var title=self.find(opt.drag);
		//更改标题样式为小手
		title.css({'cursor':'move','user-select':'none'});
		/* 绑定鼠标左键按住事件 */
		title.on('mousedown',function(e){
			/* 获取需要拖动节点的left、top */
		var o_d_l=self.offset().left;//left
		var o_d_t=self.offset().top;//top
		/* 获取当前鼠标的坐标 */
		var o_m_l=e.pageX;
		var o_m_t=e.pageY;
		/* 绑定拖动事件 */
		/* 由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素 */
		$(document).on('mousemove',function(e){
			/* 获取当前鼠标的坐标 */
			var n_m_l=e.pageX;
			var n_m_t=e.pageY;
			/* 计算鼠标移动了的位置 */
			var d_l=n_m_l-o_m_l;
			var d_t=n_m_t-o_m_t;
			/* 设置移动后的元素坐标 */
			self.offset({left:o_d_l + d_l,top:o_d_t + d_t});
		})
		/* 当鼠标左键松开，解除事件绑定 */
		$(document).on('mouseup',function(){
			$(this).off('mousemove');
		})
		// title[0].onselectstart = function(){ 
		// 	return false;
		// }
	})
	}
});

/**	
 *===============
 * modal弹出框插件
 *===============
 */

 $.extend({
 	"modal": function (options) {
 		var _default = {
 			top:'',
 			width: 400, 
 			height:'',
 			title: '提示', 
 			body: '加载中...', 
 			footer: '<button>确定</button> <button>取消</button>',
 			c_type:1,
 			callback: function (){}
 		};
 		var opt = $.extend(_default, options);

 		$("div.modal").remove();

			//创建弹出框
			var div='';
			div+='<div class="modal">';
			div+='<div class="modal_title"><h2>'+ opt['title'] +'</h2><i class="close">×</i></div>';
			div+='<div class="modal_body">'+ opt['body'] +'</div>';
			if(opt.footer){
				div+='<div class="modal_footer">'+ opt['footer'] +'</div>';
			}
			div+='</div>';
			div+='<div class="modal_bg"></div>';
			$(div).appendTo("body");

			//设置弹出框和背景遮照样式
			var modal=$('div.modal');
			modal.css({width:opt['width'],height:opt['height']});
			var modal_bg=$('.modal_bg');
			//回调函数
			opt.callback(modal);
			//关闭弹出框
			var close_btn=modal.find('.close'); 
			close_btn.on('click',function(){
				modal.fadeOut('fast',function(){
					$(this).remove();
					$(".modal_bg").remove();
				})
			})
			//关闭的方式
			if(opt.c_type==0){
				$(document).on('keydown',function(e){
					if(e.which===27)
						close_btn.trigger('click');
				})
				modal_bg.on('click',function(){
					close_btn.trigger('click')
				})
			}
			position();
			//改变窗口大小触发事件
			window.onresize=function(){
				position();
			}
		//设置弹出框的位置
		function position(){
			var pos=get_pos(modal);
			modal.css(
			{
				left: pos[0],
				top: pos[1]
			});
			modal_bg.width($(document).width()).height($(document).height());
		}
		//获得对象在页面中心的位置
		function get_pos(obj){
		 var pos = [];//位置
		 pos[0] = ($(window).width() - obj.width()) / 2;
		 pos[1] = opt['top']?opt['top']:($(window).height() - obj.height()) / 2 - 50;
		 return pos;
		}
	}
});


/**
 * 提示框（用于提示操作成功，或操作失败）
 * 位置位于点击按钮的附近位置。
 * 动画展示，默认1秒后移除提示框
 * 可用来替代js默认的alert
 */
 $.fn.extend({
 	"tips": function(options){
 		var _default = {
 			type:'success',
 			text:'操作成功!',
 			v_type:1,
 			timeout:1,
 		};
 		var opt = $.extend(_default, options);
 		$('.tips').remove();
		//获取对象的坐标，并设置提示框坐标
		var _w=$(this).width();
		var _h=$(this).height();
		var _offsetY=opt.v_type?(60-_h)/2:58;
		var _x=$(this).offset().left-((136-_w)/2);
		var _y=$(this).offset().top-_offsetY;

		//创建提示框，显示后移除。
		var _class='tips '+opt.type;
		var _html='<p><i></i>'+opt.text+'</p>'
		$('body').append($('<div/>',{class:_class,html:_html}))
		$('.tips').css({left:_x,top:_y});
		$('.tips').children('p').animate({top:0}).delay(opt.timeout*1000).animate({top:60},function(){
			$(this).parent().remove();
		});
	}
})

/**	
 *===============
 * dialog对话框
 *===============
 */
 
/*
 $.extend({
 	"dialog": function (options) {
 		var _default={
			//0为error 1为success
			type:1,
			width:240,
			text:'loading...',
			//关闭倒计时
			timeout:1,
			//关闭按钮
			close:0
		}
		var opt=$.extend(_default,options);
		var _class
		if(opt.type==1){
			_type='success';
		}else{
			_type='error';
		}
		//删除所有提示框
		$("div.dialog").remove();
		var div='';
		div+='<div class="dialog '+ _type +'">';
		div+='<p">'+ opt.text +'</p>';
		if(opt.close){
			div+='<i class="close">×</i>';
		}
		div+='</div>';
		$(div).appendTo("body");
		var dialog=$('.dialog');
		var _x=($(window).width()-opt.width)/2;
		var _y=($(window).height()-dialog.height())/2-50;
		console.log($(window).width())
		dialog.css({width:opt.width,left:_x,top:_y});
		//自动关闭
		var timer=setTimeout(function(){
			close();
		},opt.timeout * 1000)
		//点击关闭
		if(opt.close){
			dialog.find('.close').click(function(){
				close();
			})
		}
		//关闭函数
		function close(){
			dialog.fadeOut(function(){
				dialog.remove();
			})
		}
	}
});
*/

/*------------------
 * //modal弹出层样式
 *------------------
/

/*
.modal{position:absolute;box-shadow:0 0 10px #333;background:#fff;z-index:10000;position:fixed;}
.modal_title{border-bottom: 1px solid #e5e5e5;height:46px;line-height:46px;position: relative;background-color:#f7f7f7;}
.modal_title h2{font-size:16px;font-weight: 700;padding-left:20px;font-family: "microsoft yahei"}
.modal_title i.close{position: absolute;right:15px;top:0px;cursor: pointer;color:#ccc;font-size: 30px;}
.modal_title i.close:hover{color:#999;}
.modal_body{padding:20px;font-size:14px;}
.modal_footer{padding:15px;border-top: 1px solid #e5e5e5;text-align: right;}
.modal_bg{position:absolute;background:#000;opacity:0.5;z-index:9999;left:0;top:0;}
.modal input[type=submit],.modal button{padding:7px 13px;border:1px solid #e4e4e4;outline:none;background: none;cursor:pointer;color:#333;}
*/


/*---------------------------------
 * //tips提示框可取代系统的alert
 *---------------------------------
/
// .tips{height:46px;width:122px;padding:7px;overflow: hidden;position: absolute;z-index:1000;}
// .tips p{border:1px solid #ccc;box-shadow: 0 0 6px rgba(0, 0, 0, 0.31);width:122px;height:46px;line-height:46px;text-align: center;border-radius: 2px;background: #fff;color:#808080;position:relative;top:60px;}
// .tips p i{display: inline-block;width:16px;height: 16px;background: url(ico_warn.png) 0 0;margin-right:3px;vertical-align: middle;}
// .tips.error i{background-position: 0 -250px;}



/*------------------
 * //dialog对话框样式
 *------------------
/

/*
.dialog{padding:20px;font-weight: bold;min-width: 200px;text-align: center;box-shadow: 2px 3px 3px #6B6B6B;position: absolute;}
.dialog.success{color: #fff;background-color: #3F973F;border: 5px solid #fff;}
.dialog.error{color: #b94a48;background-color: #f2dede;border: 5px solid #E45F73;}
.dialog .close{position: absolute;right: 10px;top: 5px;font-size: 24px;cursor:pointer;}
.dialog.success .close{color: #fff;}
.dialog.success .error{color: #F39A9A;}
*/