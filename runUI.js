/**	
*=========
* 移动层插件
*=========
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
*=========
* 弹出框插件
*=========
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


/*
------------------
 弹出层样式
------------------
*/

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