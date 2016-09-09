var Message = {
	compareDateError: '结束日期小于开始日期，请重新选择',

	KPbuttonStatus : '打开虚拟键盘',
	KPcloseText : '确定',
	KPcloseStatus : '确定输入',
	KPclearText : '清除',
	KPclearStatus : '清除所有输入',
	KPbackText : '删除',
	KPbackStatus : '删除前一字符',
	KPtabText : 'Tab',
	KPtabStatus: 'Tab键',
	KPusekeyboardText : '使用键盘输入',
	KPusekeyboardStatus : '使用键盘输入并清除所有输入',
	KPshiftText : '大/小写',
	KPshiftStatus : '切换大小写',

	CalCloseText: '关闭',
	CalPrevText: '&#x3c;上月',
	CalNextText: '下月&#x3e;',
	CalCurrentText: '今天',
	CalMonthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
	CalMonthNamesShort: ['&nbsp;&nbsp;1月','&nbsp;&nbsp;2月','&nbsp;&nbsp;3月','&nbsp;&nbsp;4月','&nbsp;&nbsp;5月','&nbsp;&nbsp;6月','&nbsp;&nbsp;7月','&nbsp;&nbsp;8月','&nbsp;&nbsp;9月','10月','11月','12月'],
	CalDayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
	CalDayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
	CalDayNamesMin: ['日','一','二','三','四','五','六'],
	CalWeekHeader: '周',
	CalDateFormat: 'yy-mm-dd',
	CalFirstDay: 1,
	CalYearSuffix: '年',

	MoneyConvertError: '错误',

	RMBCapital0: '零元整',
	RMBCapitalDigits: '零壹贰叁肆伍陆柒捌玖',
	RMBCapitalUnit: '分角元拾佰仟万拾佰仟亿拾佰仟万拾',
	RMBCapitalReplaces: [
     	[/零角零分/g,"整"], [/点零零/g,""], [/(零拾)|(零佰)|(零仟)/g,"零"],
		[/零(零)+/g,"零"], [/零万/g,"万"], [/零亿/g,"亿"],
		[/亿万/g,"亿"], [/零元/g,"元"], [/零角/g,"零"]
	],

	ShareCapital0: '零份',
	ShareCapital1: '零点',
	ShareCapital2: '零点零',
	ShareCapitalDigits: '零壹贰叁肆伍陆柒捌玖',
	ShareCapitalDigitsUnit: '无无点拾佰仟万拾佰仟亿拾佰仟万拾',
	ShareCapitalUnit: '份',
	ShareCapitalReplaceNone: [/无/g, ""],
	ShareCapitalReplaceUnit: [/(零)+份/g,"份"],
	ShareCapitalReplaces: [
	    [/点零零/g,""], [/(零拾)|(零佰)|(零仟)/g,"零"], [/零(零)+/g,"零"],
	    [/零万/g,"万"], [/零亿/g,"亿"], [/亿万/g,"亿"],
	    [/零元/g,"元"], [/零角/g,"零"], [/拾零点/g,"拾点"], [/佰零点/g,"佰点"], [/仟零点/g,"仟点"],
		[/万零点/g,"万点"], [/亿零点/g,"亿点"]
	],

	ErrorMsgTitle: '消息提示',
	ErrorMessage: '抱歉，您浏览的网页暂时不能显示，请稍后再试。如有疑问请联系客服',
	ErrorMessage400: '抱歉，您访问页面过于频繁，请重新访问',
	ErrorMessageNotLogin: '抱歉，您已退出系统，请重新登录',

	ButtonTextConfirm: '确 定',
	ButtonTextCancel: '取 消',

	SelectButtonSelect: '添加 >>',
	SelectButtonCancel: '<< 删除',
	SelectButtonSelectAll: '全  选',
	SelectButtonCancelAll: '全不选',

	ErrorMessageNoChoseConvertIn: '未选择转换入基金!',
	decideBeginMonth: 'yyyy年M月',
	ConvertHasRate: '享受优惠费率',
	ConvertNoRate: '不享受优惠费率'
};

/*var ResourceURL = {
	vKeypadIcon: ctx+'/static/style/' + theme + '/imgs/keypad/keypad.png',
	CalendarIcon: ctx + '/static/style/' + theme + '/imgs/calendar.gif',
	LoginPage: ctx + '/login'
};*/

/*
 * @Depend : Jquery 1.4.4,JqueryUI 1.9
 * @Version : 1.0.0
 * @Desc : 高级选择框，增加反选框，原select上，仅支持将事件写在onchange上面
 */
var AdvSelectController = {
	options : {
		selectBoxClass : "selectBox",
		buttonBoxClass : "buttonBox",
		resultBoxClass : "resultBox",
		minWidth : 70,
		minHeight : 125,
		beforeSelect : function(){return true;}
	},
	_init : function() {
		this._advSelect();
	},
	_advSelect : function() {
		var d = this.options, n = this, e = this.element, a = $;
		var h = a(e).filter("select");
		var p = h.prop("multiple");
		var q = h.attr("selectall");
		/*selectall????????*/
		var l = h.children("option");
		var i = a("<div class='" + d.selectBoxClass + "'></div>");
		var k = a("<div class='" + d.buttonBoxClass + "'></div>");
		var b = a("<div class='" + d.resultBoxClass + "'></div>");
		l.each(function(o) {
			var q = a(this);
			if (!q.prop("selected")) {
				i.append("<span value='" + q.val() + "' optIndex='" + o + "'>" + q.html() + "</span>");
			} else {
				b.append("<span value='" + q.val() + "' optIndex='" + o + "' result='true'>" + q.html() + "</span>");
			}
		});
		k.append("<button type='button' name='_noname' "
					+ (p && q ? "" : "style='display:none;'") + ">"
					+ Message.SelectButtonSelectAll + "</button>");
		k.append("<button type='button' name='_noname'>"
					+ Message.SelectButtonSelect + "</button>");
		k.append("<button type='button' name='_noname'>"
					+ Message.SelectButtonCancel + "</button>");
		k.append("<button type='button' name='_noname' "
					+ (p && q ? "" : "style='display:none;'") + ">"
					+ Message.SelectButtonCancelAll + "</button>");
		var c = function(t) {
			var q = a(t);
			var r = q.val("value");
			var s = parseInt(q.attr("optIndex"));
			if (q.attr("result")) {
				q.removeAttr("result");
				var o = false;
				i.children("span").each(function() {
					if (parseInt(a(this).attr("optIndex")) > s) {
						a(this).before(q);
						o = true;
						return false;
					}
				});
				if (!o) {
					i.append(q);
				}
				h.children("option[value='" + r + "']").prop("selected", false);
				h.change();
			} else {
				if(!d.beforeSelect()){
					return this;
				}
				q.attr("result", true);
				if (!p) {
					k.children("button:eq(3)").click();
				}
				var o = false;
				b.children("span").each(function() {
					if (parseInt(a(this).attr("optIndex")) > s) {
						a(this).before(q);
						o = true;
						return false;
					}
				});
				if (!o) {
					b.append(q);
				}
				h.children("option[value='" + r + "']").prop("selected", true);
				h.change();
			}
			q.removeClass("selected");
		};
		i.children("span").bind("click", function() {
			var o = a(this);
			if (!p) {
				if (!o.hasClass("selected")) {
					i.children("span.selected").removeClass("selected");
				}
			}
			o.toggleClass("selected");
		});
		i.children("span").bind("dblclick", function() {
			c(this);
		});
		b.children("span").bind("click", function() {
			var o = a(this);
			o.toggleClass("selected");
		});
		b.children("span").bind("dblclick", function() {
			c(this);
		});
		k.children("button:eq(0)").bind("click", function() {
			i.children("span").dblclick();
		});
		k.children("button:eq(1)").bind("click", function() {
			if(!d.beforeSelect()){
				return this;
			}
			i.children("span.selected").dblclick();
		});
		k.children("button:eq(2)").bind("click", function() {
			b.children("span.selected").dblclick();
		});
		k.children("button:eq(3)").bind("click", function() {
			b.children("span").dblclick();
		});

		$advBox = a("<div class='advSelect'></div>");
		var g = h.width() > d.minWidth ? h.width() : d.minWidth;
		i.width(g);
		b.width(g);
		var j = h.height() > d.minHeight ? h.height() : d.minHeight;
		i.height(j);
		b.height(j);

		$advBox.append(i);
		$advBox.append(k);
		$advBox.append(b);
		h.after($advBox);
		var f = k.height();
		var m = (j - f) / 2;
		k.css("padding-top", m);
		h.hide();
		return this;
	},
	destroy : function() {
		this.element.show();
		$(this.element).next("div").remove("div");
	}
};
$.widget("ui.advSelect", AdvSelectController);

/**
 * 翻页控件
 */
var ViewPageController ={
	options : {
		fzCols : 0,
		fzWidth : null,
		dataForm : null,
		replaceSelf : false
	},
	_init : function() {
		this._view();
	},
	_pageNo : 1,
	_rollbackPageNo : function() {
		$(".jump input[type='text']").val(this._pageNo);
	},
	_view : function() {
		var g = this.options, b = this, e = this.element, a = $;
		var f = a(".toolbar", e);
		if (a.browser.msie && a.browser.version == 6) {
			a(".navBtn", f).mouseover(function(h) {
				a(this).addClass("navBtnOver");
			});
			a(".navBtn", f).mouseout(function(h) {
				a(this).removeClass("navBtnOver");
			})
		}
		var c = parseInt(a(".jump [name='pageCount']", f).val(), 10);
		a(".first", f).click(
				function(h) {
					var i = parseInt(a(".jump input[type='text']").val(), 10);
					if (i != 1) {
						b._pageNo = a(".jump input[type='text']").val();
						a(".jump input[type='text']").val(1);
						b._submit();
					}
				});
		a(".prev", f).click(
				function(h) {
					var i = parseInt(a(".jump input[type='text']").val(), 10);
					if ((i - 1) >= 1) {
						b._pageNo = a(".jump input[type='text']").val();
						a(".jump input[type='text']").val(i - 1);
						b._submit();
					}
				});
		a(".next", f).click(
				function(h) {
					var i = parseInt(a(".jump input[type='text']").val(), 10);
					if ((i + 1) <= c) {
						b._pageNo = a(".jump input[type='text']").val();
						a(".jump input[type='text']").val(i + 1);
						b._submit();
					}
				});
		a(".last", f).click(
				function(h) {
					var i = parseInt(a(".jump input[type='text']").val(), 10);
					if (i != c) {
						b._pageNo = a(".jump input[type='text']").val();
						a(".jump input[type='text']").val(c);
						b._submit();
					}
				});
		a(".saveAsXls", f).click(
				function(h) {
					b._submitSave();
				});
		a(".jump .to", f).click(
				function(h) {
					var i = parseInt(a(".jump input[type='text']").val(), 10);
					if( !isNaN(i) && i <= c && i > 0 ){
						b._submit();
					}
				});
		a(".jump input[type='text']", f).keydown(
				function(i) {
					var h;
					if (a.browser.msie) {
						h = i.keyCode;
					} else {
						h = i.which;
					}
					if (h == "13") {
						var i = parseInt(a(this).val(), 10);
						if (isNaN(i) || i <= 0) {
							i = 1;
						} else {
							i = (i >= c ? c : i);
						}
						a(this).val(i);
						b._submit();
						return false;
					}
				}).change(
						function(h) {
							var i = parseInt(a(this).val(), 10);
							if (isNaN(i) || i <= 0) {
								i = 1;
							} else {
								i = (i >= c ? c : i);
							}
							a(this).val(i);
						});
	},
	_submit : function() {
		var e = this.options, b = this.element, t = this, a = $;
		var c = a(".toolbar form", b);
		var d = "&" + c.serialize();
		if (e.dataForm && e.dataForm != "") {
			d += "&" + getFormData(e.dataForm, "jsr303JSValidat");
		}
		a.fn.aLoad({
			method : c.attr("method"),
			action : c.attr("action"),
			dataType : "html",
			data : d,
			success : function(f) {
				if (e.replaceSelf) {
					a(b).replaceWith(f);
				} else {
					document.write(f);
				}
			},
			error : function(){
				t._rollbackPageNo();
			}
		})
	},
	_submitSave : function() {
		var g = this.options, c = this.element, a = $;
		var d = a(".toolbar form", c);
		var f = "pageSize=1000&pageIndex=1";
		if (g.dataForm && g.dataForm != "") {
			f += "&" + getFormData(g.dataForm, "jsr303JSValidat");
		}
		var e = a("input[name='saveActionHref']", d).val();
		if (e.indexOf("?") == -1) {
			e += "?" + f;
		} else {
			e += "&" + f;
		}
		$.chinaamc.openWindow({url: encodeURI(e), method: 'GET'});
	},
	destroy : function() {
	}
};
$.widget("ui.view", ViewPageController);

/**
 * 虚拟键盘，jquery.keypad
 * @param keypadClass : 虚拟键盘样式
 * @param keypadOnly  : 只使用键盘输入
 * @param randomiseAll: 随机化所有键
 * @param showOn      : 显示样式（只有为'button'时buttonImageOnly与buttonImage才有效）
 * @param buttonImageOnly :只显示图片，不显示 button的样式
 * @param buttonImage : 图片地址
 *
 */
function KeyPadInitalize(options){
	$.keypad.addKeyDef(
		'USEKEYBOARD',
		'usekeyboard',
		function(inst) {
			$.keypad._clearValue(inst);
			$.keypad._curInst = (inst._inline ? inst : $.keypad._curInst);
			$.keypad._hideKeypad();
		}
	);

	$.keypad.pwdLayout = [
			$.keypad.USEKEYBOARD,
			"123456789" + $.keypad.CLOSE,
			"0abcdefgh" + $.keypad.SHIFT,
			"ijklmnopq" + $.keypad.BACK,
			"rstuvwxyz" + $.keypad.CLEAR
		];
	//default settings
	//randomiseAll : true,
	this.settings = $.extend({
		keypadClass: 'kp',
		keypadOnly: false,
		layout : $.keypad.pwdLayout,
		showOn : 'button',
		buttonImageOnly : true,
		/*buttonImage : ResourceURL.vKeypadIcon,*/
		duration : 'fast',
		zIndex : 10010
	},options || {});

	var kp = this;

	var opts = {
		duration : kp.settings.duration,
		keypadClass: kp.settings.keypadClass,
		keypadOnly: kp.settings.keypadOnly,
		randomiseAlphabetic : true,
		randomiseNumeric : true,
		showOn : kp.settings.showOn,
		buttonImageOnly : kp.settings.buttonImageOnly,
		buttonImage : kp.settings.buttonImage,
		layout : kp.settings.layout,
		buttonStatus : Message.KPbuttonStatus,
		closeText : Message.KPcloseText,
		closeStatus : Message.KPcloseStatus,
		clearText : Message.KPclearText,
		clearStatus : Message.KPclearStatus,
		backText : Message.KPbackText,
		backStatus : Message.KPbackStatus,
		tabText : Message.KPtabText,
		tabStatus: Message.KPtabStatus,
		usekeyboardText : Message.KPusekeyboardText,
		usekeyboardStatus : Message.KPusekeyboardStatus,
		shiftText : Message.KPshiftText,
		shiftStatus : Message.KPshiftStatus
	}

	$(this).each(function(){
		var element = $(this);
		var tmpOpts = opts;
		//If validate,validate after change
		tmpOpts['onClose'] = function(dateText, inst) {
			try{
				$('form').validate().element(element);
			}catch(e){

			}
		};
		if(tmpOpts['layout'] == null){
			//Full key
			if(element.hasClass('keypad')){
				tmpOpts['layout'] = $.keypad.qwertyLayout;
			}else if(element.hasClass('keypadAlphabetic')){ //alphabetic
				tmpOpts['layout'] =	['abcdefghij' + $.keypad.CLOSE, 'klmnopqrst' + $.keypad.CLEAR,'uvwxyz' + $.keypad.SPACE + $.keypad.SPACE + $.keypad.SHIFT + $.keypad.BACK];
			}else {

			}
		}
		element.keypad(tmpOpts);
	});
	//add zIndex
	$('.keypad-popup').css("zIndex",kp.settings.zIndex);
};
$.fn.initKeyPad = KeyPadInitalize;

//取得页面中最大z-index
$.maxZIndex = $.fn.maxZIndex = function(opt) {
    var def = { inc: 10, group: "*" };
    $.extend(def, opt);
    var zmax = 0;
    $(def.group).each(function() {
        var cur = parseInt($(this).css('z-index'));
        zmax = cur > zmax ? cur : zmax;
    });
    if (!this.jquery)
        return zmax;

    return this.each(function() {
        zmax += def.inc;
        $(this).css("z-index", zmax);
    });
}

//日历控件

var CalenderController = {
	//default options
	options : {
		defaultDate : +0,
		changeYear : true,
		changeMonth : true,
		dateFormat : 'yy-mm-dd',
		minDate : null,
		maxDate : null,
		showButtonPanel: false,
		showWeek : false,
		firstDay :	1,
		numberOfMonths : 1,
		showOn : 'button',
		/*buttonImage : ResourceURL.CalendarIcon,*/
		buttonImageOnly : true,
		appendText : '',
		autoSize : true,
		yearRange : 'c-20:c+20',
		maskInput : true,
		hideIfNoPrevNext: true,
		regional : {
			closeText: Message.CalCloseText,
			prevText: Message.CalPrevText,
			nextText: Message.CalNextText,
			currentText: Message.CalCurrentText,
			monthNames: Message.CalMonthNames,
			monthNamesShort: Message.CalMonthNamesShort,
			dayNames: Message.CalDayNames,
			dayNamesShort: Message.CalDayNamesShort,
			dayNamesMin: Message.CalDayNamesMin,
			weekHeader: Message.CalWeekHeader,
			dateFormat: Message.CalDateFormat,
			firstDay: Message.CalFirstDay,
			yearSuffix: Message.CalYearSuffix,
			isRTL: false,
			showMonthAfterYear: true
		},
		onSelect:function(){
			try{
				$(this).trigger("change");
				if(typeof event != undefined)
					event.returnValue = false;
			}catch(e){}
		}
	},
	//init the ui
	_init: function() {
		this._calendar();
	},
	_calendar : function(){
		var o = this.options,self = this,el= this.element;
		$.datepicker.regional['zh-CN'] = o.regional;
		$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
		$(el).each(function(){
			var e = $(this);
			//If validate
			o['onClose'] = function(dateText, inst) {
				try{
					$('form').validate().element(e);
				}catch(e){

				}
			};
			e.datepicker(o);
			//Mask input
			if(o.maskInput){
				e.mask("9999-99-99",{placeholder:"_"});
			}
		});

		return this;
	},
	enable : function(){
		var el = this.element;
		$(el).each(function(){
			var e = $(this);
			e.datepicker("enable");
			if(e.attr('name')){
				e.parent().children(".vaalhaai_calendar_hide[name='"+e.attr("name")+"']").remove();
			}
		});
	},
	disable: function(){
		var el = this.element;
		$(el).each(function(){
			var e = $(this);
			e.datepicker("disable");
			if (e.attr('name')) {
				e.parent().children(".vaalhaai_calendar_hide[name='"+e.attr("name")+"']").remove();
				var ec = e.clone();
				if (ec.attr("id")) {
					ec.attr("id", ec.attr("id") + "_vaalhaai_c");
				}
				ec.addClass("vaalhaai_calendar_hide").removeAttr("disabled");
				ec.appendTo(e.parent());
				ec.hide();
			}
		});
	},
	destroy: function(){
		var el = this.element;
		$(el).each(function(){
			//remove mask
			var e = $(this);
			if (e.maskInput) {
				e.unmask();
			}
			if(e.attr('name')){
				e.parent().children(".vaalhaai_calendar_hide[name='"+e.attr("name")+"']").remove();
			}
			e.datepicker("destroy");
		});
	}
};
$.widget("ui.calendar", CalenderController);

/**
 * form采用Ajax方式进行提交，附加在onSubmit事件上,不要在拟Ajax提交的表单上添加onSubmit事件
 *
 * @param toReplace : 被替换内容区域,默认为'#content'
 * @param action : 提交的地址,若未提供，将采用表单的action地址
 * @param method : 提交方式，若未提供，将采用表单的提交方式
 * @param async  : 是否异步提交
 * @param dataType	 : 返回数据的类型，默认为'html'
 * @param cache  : 是否使用缓存，不使用将装载最新版本
 * @param data   : 提交的参数，若未提供，将使用form中的元素进行序列化
 * @param errorDiv : 错误信息放置地址，如'#errorDiv'，若未提供，将自己生成一个
 * @param errorMsgFn : 判定是否为出错信息的函数，即后台返回的是业务数据还是出错信息，决定是否将指定替换区域的内容替换
 * @param complete : 完成后处理的函数，不管失败或者是成功均会被调用，如:function(XMLHttpRequest, textStatus) {}
 * @param dataFilter : 给Ajax返回的原始数据的进行预处理的函数,如function（data,type){}
 * @param success : Ajax调用成功后的处理函数，未提供，则使用默认的
 * @param error   : Ajax请求失败后的处理函数，未提供，使用默认的
 */


//methods are not found  (validator,)
function AjaxForm(options){
	var aForm = this;
	this.settings = $.extend({
		toReplace : '#content',
		action : null,
		method : null,
		async : false,
		dataType : 'html',
		cache : false,
		data : null,
		errorDiv : null,
		errorMsgFn : function(msg){
			try {
				if(aForm.settings.dataType.toLowerCase() == 'html') {
					return msg.indexOf("json::") == 0;
				}else if(aForm.settings.dataType.toLowerCase() == 'json') {
					return msg.error;
				}else{
					return false;
				}
			}catch(e){
				return false;
			}
		},
		complete : function(XMLHttpRequest, textStatus){},
		dataFilter: function(data, type){
			return data;
		},
		success : null,
		error : null,
		errorConfirm : function(){}
	},options || {});
	var form = $(this).filter('form');
	regButtonEvent();
	form.bind('submit', function(){
		disableButton(form);
	});
	$(this).validator();
	form.bind('submit',function(){
	//validate form
	//验证失败，不提交表单
		if(form.validate().numberOfInvalids() > 0){
			enabledButton(form);
			return false;
		}
		cleanTips(aForm.settings.toReplace);
		var loading = $('<div style="text-align: left; "><span class="waiting">尊敬的客户，您的交易正在提交中。<br>&nbsp;&nbsp;&nbsp;&nbsp;请勿关闭此页面，<font color="#CC0000">10</font>秒后系统自动为您跳转页面。</span></div>');
		loading.dialog({
			modal : true,
			resizable : false,
			width : 400,
			height :120
		});
			//dialogClass : 'loadingDialog'
		encryptFields($(".keypad",form));
		var submitDate = aForm.settings.data ? aForm.settings.data : form.serialize();
		if(typeof(submitDate)=="string"){
			submitDate += "&ajax=true"
		}else{
			if(submitDate==null){
				submitDate = {};
			}
			submitDate.ajax = true;
		}
		$.ajax({
			type : aForm.settings.method ? aForm.settings.method : form.attr('method'),
			url : aForm.settings.action ? aForm.settings.action:form.attr("action"),
			dataType : aForm.settings.dataType,
			async : aForm.settings.async,
			data : submitDate,
			success : function(msg){
				// error message
				if(aForm.settings.errorMsgFn(msg)){
					if(!aForm.settings.errorDiv || $(aForm.settings.errorDiv)[0]){
						aForm.settings.errorDiv = $('<div class="errorMsg"></div>');
					}
					if(aForm.settings.dataType.toLowerCase() == 'html'){
						var ejson = getReturnJson(msg);
						showError({
							title: Message.ErrorMsgTitle + '(' + ejson.errorId + ')',
							msg: ejson.errorMsg,
							okFn: ejson.errorFn || aForm.settings.errorConfirm
						});
					}else if(aForm.settings.dataType.toLowerCase() == 'json'){
						showError({
							title: Message.ErrorMsgTitle + '(' + msg.errorId + ')',
							msg: msg.errorMsg,
							okFn: aForm.settings.errorConfirm
						});
					}else{
						showError({
							msg: msg,
							okFn: aForm.settings.errorConfirm
						});
					}
					if($.isFunction(aForm.settings.error)){
						aForm.settings.error(msg);
					}
				}else{
					if($.isFunction(aForm.settings.success)){
						aForm.settings.success(msg);
					}else{
						$(aForm.settings.toReplace).html(msg);
					}
				}

			},
			error : aForm.settings.error ? aForm.settings.error : function(msg){
				if(!aForm.settings.errorDiv || $(aForm.settings.errorDiv)[0]){
					aForm.settings.errorDiv = $('<div class="errorMsg"></div>');
				}
				if(typeof msg == "string"){
					showError({ msg: msg });
				}else if(typeof msg != "undefined"){
					if(typeof msg.responseText != "undefined"){
						var ejson = getReturnJson(msg.responseText);
						showError({
							title: Message.ErrorMsgTitle + '(' + ejson.errorId + ')',
							msg: ejson.errorMsg,
							okFn: ejson.errorFn || aForm.settings.errorConfirm
						});
					}else{
						showError({
							msg: Message.ErrorMessage,
							okFn: aForm.settings.errorConfirm
						});
					}
				}else{
					showError({
						msg: Message.ErrorMessage,
						okFn: aForm.settings.errorConfirm
					});
				}

			},
			complete : function(XMLHttpRequest, textStatus){
				var element = loading.dialog("destroy");
				$(element).remove();
                //阻塞action的form submit
                enabledButton(form);
				try{
					if(typeof gLastServerAccessTime != "undefined"){
						gLastServerAccessTime = (new Date()).getTime();
					}
					aForm.settings.complete(XMLHttpRequest, textStatus);
				}catch(e){};

			}
		});

		return false;
	});
	return this;
};
$.fn.aForm = AjaxForm;

/**
 * 采用Ajax方式加载内容
 *
 * @param toReplace : 被替换内容区域,默认为'#content'
 * @param action : 提交的地址,必须提供
 * @param method : 提交方式，默认为'post'
 * @param async  : 是否异步提交
 * @param dataType	 : 返回数据的类型，默认为'html'
 * @param cache  : 是否使用缓存，不使用将装载最新版本
 * @param data   : 提交的参数
 * @param errorDiv : 错误信息放置地址，如'#errorDiv'，若未提供，将自己生成一个
 * @param errorMsgFn : 判定是否为出错信息的函数，即后台返回的是业务数据还是出错信息，决定是否将指定替换区域的内容替换
 * @param complete : 完成后处理的函数，不管失败或者是成功均会被调用，如:function(XMLHttpRequest, textStatus) {}
 * @param dataFilter : 给Ajax返回的原始数据的进行预处理的函数,如function（data,type){}
 * @param success : Ajax调用成功后的处理函数，未提供，则使用默认的，如function(msg)
 * @param error   : Ajax请求失败后的处理函数，未提供，使用默认的,如function(msg)
 */

function AjaxLoad(options){
	var aLoad = this;
	this.settings = $.extend({
		toReplace : '#content',
		action : null,
		method : 'post',
		dataType : 'html',
		async : false,
		cache : false,
		data : null,
		errorDiv : null,
		errorMsgFn : function(msg){
			try {
				if(aLoad.settings.dataType.toLowerCase() == 'html') {
					return msg.indexOf("json::") != -1;
				}else if(aLoad.settings.dataType.toLowerCase() == 'json') {
					return msg.error;
				}else{
					return false;
				}
			}catch(e){
				return false;
			}
		},
		complete : function(XMLHttpRequest, textStatus){},
		dataFilter: function(data, type){
			return data;
		},
		success : null,
		error : null,
		errorConfirm : function(){}
	},options || {});

	if(!aLoad.settings.action){
		alert('Action can not be null');
		return;
	}

	var loading = $("<div class='loading'></div>");
	loading.dialog({
		modal : true,
		resizable : false,
		width : 480,
		height :320,
		dialogClass : 'loadingDialog'
	});
	cleanTips(aLoad.settings.toReplace);
	var submitDate = aLoad.settings.data;
	/*if(typeof(submitDate)=="string"){
		submitDate += "&ajax=true"
	}else{
		if(submitDate==null){
			submitDate = {};
		}
		submitDate.ajax = true;
	}*/
	$.ajax({
		type : aLoad.settings.method,
		url : aLoad.settings.action,
		data : submitDate,
		dataType : aLoad.settings.dataType,
		async : aLoad.settings.async,
		cache : aLoad.settings.cache,
		success : function(msg){
			// error message
			if(aLoad.settings.errorMsgFn(msg)){
				if(!aLoad.settings.errorDiv || $(aLoad.settings.errorDiv)[0]){
					aLoad.settings.errorDiv = $('<div class="errorMsg"></div>');
				}
				if(aLoad.settings.dataType.toLowerCase() == 'html'){
					var ejson = getReturnJson(msg);
					showError({
						title: Message.ErrorMsgTitle, //+ '(' + ejson.errorId + ')',
						msg: ejson.errorMsg,
						okFn: ejson.errorFn || aLoad.settings.errorConfirm
					});
				}else if(aLoad.settings.dataType.toLowerCase() == 'json'){
					showError({
						title: Message.ErrorMsgTitle, //+ '(' + msg.errorId + ')',
						msg: msg.errorMsg,
						okFn: aLoad.settings.errorConfirm
					});
				}else{
					showError({
						title: Message.ErrorMsgTitle,
						msg: msg,
						okFn: aLoad.settings.errorConfirm
					});
				}
				if($.isFunction(aLoad.settings.error)){
					aLoad.settings.error(msg);
				}
			}else{
				if($.isFunction(aLoad.settings.success)){
					aLoad.settings.success(msg);
				}else{
					$(aLoad.settings.toReplace).html(msg);
				}
			}
		},
		error : aLoad.settings.error ? aLoad.settings.error : function(msg){
			if(!aLoad.settings.errorDiv || $(aLoad.settings.errorDiv)[0]){
				aLoad.settings.errorDiv = $('<div class="errorMsg"></div>');
			}
			if(typeof msg == "string"){
				showError({ msg: msg });
			}else if(typeof msg != "undefined"){
				if(typeof msg.responseText != "undefined"){
					var ejson = getReturnJson(msg.responseText);
					showError({
						title: Message.ErrorMsgTitle,// + '(' + ejson.errorId + ')',
						msg: ejson.errorMsg,
						okFn: ejson.errorFn || aLoad.settings.errorConfirm
					});
				}else{
					showError({
						msg: Message.ErrorMessage,
						okFn: aLoad.settings.errorConfirm
					});
				}
			}else{
				showError({
					msg: Message.ErrorMessage,
					okFn: aLoad.settings.errorConfirm
				});
			}
			if($.isFunction(aLoad.settings.error)){
				aLoad.settings.error(msg);
			}
		},
		complete : function(XMLHttpRequest, textStatus){
			var element = loading.dialog("destroy");
			$(element).remove();
			try{
				if(gLastServerAccessTime){
					gLastServerAccessTime = (new Date()).getTime();
				}
				aLoad.settings.complete(XMLHttpRequest, textStatus);
			}catch(e){};
		}
	});
	return this;
};
$.fn.aLoad = AjaxLoad;

function getReturnJson(msg){
	var ret = { error:true, errorMsg:'', errorType:'', errorId:'', errorCode:'', errorFn: null };
	if(msg.length > 6){
		var h = msg.substring(0, 6);
		var b = msg.substring(6, msg.length);
		if(h=='json::'){
			b = b.replace(/[\n\r]/ig, '');
			ret = eval("(" + b + ")");
			ret.errorFn = null;
			if(ret.errorType == "RuleException"){
				return ret;
			}else{
				if(ret.errorCode == '400'){
					ret.errorMsg = Message.ErrorMessage400;
				}else if(ret.errorCode == 'notlogin'){
					ret.errorMsg = Message.ErrorMessageNotLogin;
					/*ret.errorFn = function(){
						window.location.href = ResourceURL.LoginPage;
					}*/
				}else{
					ret.errorMsg = Message.ErrorMessage;
				}
			}
		}else{
			ret.errorMsg =  Message.ErrorMessage;
		}
	}else{
		ret.errorMsg =  Message.ErrorMessage;
	}
	return ret;
}

function cleanTips(elementName){
	$(elementName + " form").each(function(){
		destroyTips($(this));
	})
}
function hideTips(){
	$(".invalid").each(function(){
		var e = $(this);
		e.tooltip("close");
	});
}
function destroyTips(form){
	$(".invalid", form).each(function(){
		var e = $(this);
		e.tooltip("destroy");
	});
}

function NewFn(options){
	this.settings = $.extend({}, options || {});
}
$.fn.newFn = NewFn;

function regButtonEvent(form){
	$(form).find("button").each(function(i, item){
		$(item).bind("dblclick", function(){return false;});
	});
}
function disableButton(form){
	$(form).find("button").each(function(i, item){
		$(item).prop("disabled", "true");
	});
}
function enabledButton(form){
	$(form).find("button").each(function(i, item){
		$(item).removeAttr("disabled");
	});
}


function encryptFields(fields){
	var MAX_PASSOWD_LEN=20;
	$(fields).each(function(){
		var field = $(this);
		var val = field.val();
		if(rsaEncrypt=='true'){
			if(val.length<MAX_PASSOWD_LEN){
				field.val(doRSAEncrypt(rsaSeedKey,val));
			}
		}
	})
}

function doRSAEncrypt(key,input){
	if(key == '') return input;

	var rsa = new RSAKey();
	rsa.setPublic(key, "10001");
	var res = rsa.encrypt(input);

	if(res == null) return input;
	return res;
}


/**
 * 以dialog方式弹出信息
 *
 * @param modal 是否生成遮罩层
 * @param element 显示的对象
 * @param keepMsg 是否保留信息，即不从dom中删除
 * @param initFn 生成之后执行的函数
 * @param okBtn 是否显示确认按钮
 * @param cancelBtn 是否显示取消按钮
 * @param okFnAfterClose 确 定执行完后的回调函数
 * @param okFn 点击确 定时候的回调函数
 * @param cancelFn 点击取消时候的回调函数
 * @param cancelFnAfterClose 取消执行完后的回调函数
 * @param width 宽度
 * @param height 高度
 * @param dialogClass 样式
 * @param title 标题
 * @param zIndex zIndex值
 */
function showDialog(options){
	var defaults = {
		modal : true,
		element : "",
		width : 320,
		height : 240,
		dialogClass : 'dig',
		keepMsg : true,
		title: "",
		okBtn : false,
		cancelBtn : false,
		initFn:function(){},
		okFn : function(){},
		okFnAfterClose : function(){},
		cancelFn : function(){},
		cancelFnAfterClose : function(){},
		zIndex : 9990
	}
	var opts = jQuery.extend(defaults,options);
	opts.initFn();
	var btns= {};
	if(opts.okBtn){
		btns[Message.ButtonTextConfirm] = function(){
			opts.okFn.apply(arguments);
			opts.okFnClose = true;
			$(this).dialog('close');
		};
	}
	if(opts.cancelBtn){
		btns[Message.ButtonTextCancel] = function(){
			opts.cancelFn.apply(arguments);
			$(this).dialog('close');
		};
	}

	var dlg = $(opts.element).dialog({
		modal : opts.modal,
		width : opts.width,
		height : opts.height,
		dialogClass : opts.dialogClass,
		buttons : btns,
		resizable: false,
		draggable: false,
		close: function(event, ui) {
			var element = $(this).dialog('destroy');
			if(opts.okFnClose){
				opts.okFnAfterClose.apply(arguments);
				opts.okFnClose = false;
			}else{
				opts.cancelFnAfterClose.apply(arguments);
			}
			if(!opts.keepMsg){
				$(element).remove();
			}
		},
		title: opts.title,
		zIndex : opts.zIndex
	});
	var height = 17;
	opts.element.children().each(function(i, item){
		height += $(item).outerHeight(true);
	})
	opts.element.height(height);
}
/**
 * 显示确认信息
 *
 * @param msg 显示的信息
 * @param okFnAfterClose 确 定执行完后的回调函数
 * @param okFn 点击确 定时候的回调函数
 * @param cancelFn 点击取 消时候的回调函数
 * @param cancelFnAfterClose 取 消执行完后的回调函数
 */
function showConfirm(options){
	var defaults = {
		dialogClass : 'msg confirmMsg',
		buttonType : "confirmAndCancel"
	}
	var opts = jQuery.extend(defaults,options);
	popupDialog(opts);
}
function showMsg(options){
	var defaults = {
		dialogClass : 'msg commonMsg'
	}
	var opts = jQuery.extend(defaults,options);
	popupDialog(opts);
}
function showWarning(options){
	var defaults = {
		dialogClass : 'msg warningMsg'
	}
	var opts = jQuery.extend(defaults,options);
	popupDialog(opts);
}
function showSuccess(options){
	var defaults = {
		dialogClass : 'msg successMsg'
	}
	var opts = jQuery.extend(defaults,options);
	popupDialog(opts);
}
function showError(options){
	var defaults = {
		dialogClass : 'msg errorMsg'
	}
	var opts = jQuery.extend(defaults,options);
	popupDialog(opts);
}
function showInput(options){
	var defaults = {
		dialogClass : 'msg inputMsg',
		buttonType : "confirmAndCancel"
	}
	var opts = jQuery.extend(defaults,options);
	popupDialog(opts);
}
function showConfirmInput(options){
	var defaults = {
		dialogClass : 'msg inputMsg'
	}
	var opts = jQuery.extend(defaults,options);
	popupDialog(opts);
}
/**
 *
 * @param modal 是否生成遮罩层
 * @param msg 显示的信息
 * @param keepMsg 是否保留信息，即不从dom中删除
 * @param okFn 点击确 定时候的回调函数
 * @param okFnAfterClose 确 定执行完后的回调函数
 * @param width 宽度
 * @param height 高度
 * @param dialogClass 样式
 * @param title 标题
 * @param zIndex zIndex值
 */
function popupDialog(options){
	var defHeight = 180, defWidth = 360, opts = {};
	var defaults = {
			modal : true,
			msg : "",
			keepMsg : false,
			width : 360,
			height : 180,
			dialogClass : "",
			title: "",
			initFn : function(){},
			okFn : function(){},
			okFnAfterClose : function(){},
			cancelFn : function(){},
			cancelFnAfterClose : function(){},
			zIndex : 10000,
			resizable: false,
			draggable: false,
			buttonType : "",
			close: function(event, ui) {
				var element = $(this).dialog('destroy');
				if(!opts.keepMsg){
					$(element).remove();
				}
				if(opts.isOkFnClose){
					opts.okFnAfterClose.apply(arguments);
					opts.isOkFnClose = false;
				}else{
					opts.cancelFnAfterClose.apply(arguments);
				}
			},
			open: function(event, ui){
				//$(".errorMsg > div > button").focus();
			}
		}
		opts = jQuery.extend(defaults,options);
		opts.isOkFnClose = false;
		opts.buttons = {};
		if(options.buttonType == "confirmAndCancel"){
			opts.buttons[Message.ButtonTextConfirm] = function(){
					var ret = opts.okFn.apply(arguments);
					if(ret === false){
						return;
					}
					opts.isOkFnClose = true;
					$(this).dialog('close');
			};
			opts.buttons[Message.ButtonTextCancel] = function(){
					opts.cancelFn.apply(arguments);
					opts.isOkFnClose = false;
					$(this).dialog('close');
			};
		}else{
			opts.buttons[Message.ButtonTextConfirm] = function(){
					opts.okFn.apply(arguments);
					opts.isOkFnClose = true;
					$(this).dialog('close');
			};
		}
		if(defHeight == opts.height && defWidth == opts.width){
			if(opts.msg.indexOf('<br') > 0){
				opts.width = 420;
				opts.height = 320;
			}else{
				if(opts.msg.length > 42){
					opts.width = 420;
					opts.height = 320;
				}
			}
		}
		var msgDiv = $('<div><span class="msgContent"></span></div>');
		opts.initFn();
		msgDiv.dialog(opts);
		msgDiv.find(".msgContent").append(opts.msg);
}
/**
 * 显示遮盖层数据
 *
 * @param width 宽度
 * @param height 高度
 * @param dialogClass 样式
 * @param resizable 是否可以拖动改变大小
 * @param closeOnEcape 按esc键是否关 闭弹出层
 * @param zIndex zIndex值
 */
var ModelMsgController = {
	options : {
		width : 500,
		height : 230,
		dialogClass : "modalMsg",
		closeOnEscape: false,
		zIndex : 9999
	},
	_init: function() {
		this._modalPop();
	},
	_modalPop : function(){
		var o = this.options,self = this,el= this.element;
		$(el).dialog({
			modal : true,
			width : o.width,
			height : o.height,
			dialogClass : o.dialogClass,
			closeOnEscape: o.closeOnEscape,
			resizable: false,
			draggable: false,
			zIndex : o.zIndex
		});
	},
	destroy: function(){
		var o = this.options,self = this,el= this.element;
		$(el).dialog("destroy");
	}
};
$.widget("ui.modalMsg", ModelMsgController);
/**
 * 多步骤交互之上一步
 *
 * @param element 当前按钮或者操作所在的步骤中的元素，可以直接是dom元素或者是jquery选择器
 * @param hideAfter 默认为false,即隐藏自己及后置的步骤，否则，将删除
 */
function previouStep(element,hideAfter){
	var step = $(element).parents("div.step");
	step.prev("div.step").show();
	if (hideAfter) {
		step.nextAll().andSelf().hide();
	} else {
		step.nextAll().andSelf().remove();
	}
	$(element).parents("form").resetValidator();
	$(document).scrollTop(0);
}
/**
 * 多步骤交互之下一步
 *
 * @param msg Ajax请求回来的页面
 * @param element 当前按钮或者操作所在的步骤中的元素，可以直接是dom元素或者是jquery选择器
 */
function nextStep(msg,element){
	var step = element.parents('div.step');
	step.hide();
	//If previou step only hide,just display it
	if (step.next("div.step")[0]) {
		step.next("div.step").show();
	} else {
		$(msg).appendTo('#content');
	}
	$(document).scrollTop(0);
	//$(element).parents("form").resetValidator();
}

var HintSelectController = {
    options : {
        groups : null,
        hintClass : 'cityhint',
        buttonClass : 'select-button',
        emptyText : '请选择'
    },
    _init : function(){
        this.el = this.element[0];
        this._initialize();
        this.buildHint();
    },
    _initialize : function(){
        var opts = this.options;
        var $el = $(this.el);
        var t = this;

        var $btnOpen = $('<a href="#"></a>');
        $btnOpen.addClass("cityhint-input se1");
        $btnOpen.prop("hidefocus", true);
        $btnOpen.text(opts.emptyText);
        $btnOpen.bind("click", function(){
            t.showHint();
            opts.buttonClick();
            $el.trigger("click");
            return false;
        });
        $btnOpen.bind("focus", function(){
            $el.trigger("focus");
        });
        $btnOpen.bind("blur", function(){
            $el.trigger("blur");
        });

        var $btnClose = $("<span> </span>");
        $btnClose.addClass("close");

        $btnClose.bind("click", function(){
            t.closeHint();
            return false;
        });
        var $hint = $("<div></div>");
        $hint.addClass(opts.hintClass);
        $hint.append($btnClose);

        this.$hint = $hint;
        this.$btnClose = $btnClose;
        this.$btnOpen = $btnOpen;

        $el.before($hint);
        $el.before($btnOpen)
        $el.hide();
    },
    _groupOptions : function(){
        var opts = this.el.children;
        var groups = this.options.groups;
        var itemGroup = new Array(groups.length);

        for(var i = 0; i < opts.length; i++){
            var $opt = $(opts[i]);
            var text = $opt.text();
            var value = $opt.val("value");
            var selected = $opt.prop("selected");
            for(var j = 0; j < groups.length; j++){
                var group = groups[j];
                var items = itemGroup[j];
                if(!items || items == null){
                    items = {name: group.name, children: []};
                    itemGroup[j] = items;
                }
                if(group.regexp.test(value)){
                    items.children.push({name: text, value: value, selected: selected});
                }
            }
        }
        return itemGroup;
    },
    buildHint : function(){
        var t = this;
        var $el = $(this.el);
        var $hint = this.$hint;
        var opts = this.options;
        var groups = this._groupOptions();

        $hint.find("dl").remove();

        function _itemClick(){
            var value = $(this).val("value");
            t.selectValue(value);
            opts.itemClick(value);
            $el.trigger("change");
            $el.trigger("keyup");
            return false;
        }
        var $dl = $("<dl></dl>");
        for(var i = 0; i < groups.length; i++){
            var group = groups[i];
            if(group.name != ''){
                $dl.append($("<dt></dt>").text(group.name));
            }
            var $dd = $("<dd></dd>");
            for(var j = 0; j < group.children.length; j ++){
                var item = group.children[j];
                var $a = $('<a href="#"></a>');
                $a.val("value", item.value);
                $a.text(item.name);
                $a.bind("click", _itemClick);
                if(item.selected){
                    $a.addClass("current");
                }
                $dd.append($a);
            }
            $dl.append($dd);
        }
        $hint.append($dl);
        this.setValue();
    },
    setValue : function(){
        var $item = this.$hint.find("a.current");
        var opts = this.options;
        if($item.length == 0){
            this.$btnOpen.text(opts.emptyText);
        }else{
            this.$btnOpen.text($item.text());
        }
    },
    selectValue : function(value){
        var $hint = this.$hint;
        $hint.find("a.current").removeClass("current");
        var selected = $hint.find("a[value='" + value + "']");
        selected.addClass("current");
        this.$btnOpen.text(selected.text());
        this.closeHint();
    },
    showHint : function(){
        this.$hint.show();
    },
    closeHint : function(){
        this.$hint.hide();
        $(this.el).trigger("keyup");
    },
    show : function(){
        this.$btnOpen.show();
    },
    hide : function(){
        this.$btnOpen.hide();
        this.closeHint();
    },
    destroy : function(){
        this.$hint.remove();
        this.$btnOpen.remove();
        $(this.el).show();
    }
}
$.widget("ui.HintSelect", HintSelectController);

function BankSelect(name, flag){
    var $bank = $("select[name='" + name + "']");

    function appendImage(a, bankcode){
        a.prepend('<img src="' + ctx + '/static/image/bank_' + bankcode + '.png" />')
    }
    $bank.HintSelect({
        groups: [{name:'', regexp: /./}],
        emptyText: '请选择银行',
        hintClass : 'cityhint bankhint',
        buttonClass : 'select-button bankhint-select',
        buttonClick : function(){
            var $button = $bank.prev();
            if($button.hasClass("button-open")){
                $button.removeClass("button-open");
                $bank.HintSelect("closeHint");
            }else{
                $button.addClass("button-open");
            }
        },
        itemClick : function(value){
            var $opt = $bank.find("option[value='" + value + "']");
            appendImage($bank.prev(), $opt.attr('bankcode'));
            $bank.prev().removeClass("button-open");
            try{
                $opt.prop("selected", true);
            } catch(e){}
            return false;
        }
    })
    $bank.children().each(function(i, item){
        var $item = $(item);
        var value = $item.val("value");
        if(value != ""){
            var $a = $bank.parent().children(".cityhint.bankhint").find("a[value='" + value + "']" );
            appendImage($a, $item.attr('bankcode'));
        }
        if($item.prop("selected")){
            appendImage($bank.prev(), $item.attr('bankcode'));
        }
    });
}

function ProvinceCitySelect(provinceName, cityName, hideMunicipalities){
    var $province = $("select[name='" + provinceName + "']");
    var $city = $("select[name='" + cityName + "']");

    var provinceGroup = [{name: '华北', regexp: /^1/, children: []}, {name: '东北', regexp: /^2/, children: []},
                        {name: '华东', regexp:/^3/, children: []}, {name: '中南', regexp:/^4/, children: []},
                        {name: '西南', regexp:/^5/, children: []}, {name: '西北', regexp:/^6/, children: []},
                        {name: '港澳台', regexp:/^[78]/, children: []}];
    var cityGroup = [{name: '市/县', regexp: /./}]

    $province.HintSelect({
        groups: provinceGroup,
        emptyText: '请选择省',
        buttonClick : function(){
            $city.HintSelect("closeHint");
        },
        itemClick : function(value){
            $province.HintSelect("closeHint");
            var selected = $province.find("option[value='" + value + "']");
            selected.prop("selected", true);
            $city.children().each(function(i, item){
                if($(item).val("value") != ""){
                    $(item).remove();
                }
            });

            if(hideMunicipalities
                && selected.attr("isMunicipalities") == 1){
                $city.HintSelect("hide");
            }else{
                $city.HintSelect("show");
                $.ajax({
                    url:ctx + '/common/findAllCityByProvinceCode',
                    cache:false,
                    type:'POST',
                    dataType:null,
                    data:{'provinceCode':value},
                    success:function(cityData){
                        if(value != $province.val()){
                            return ;
                        }
                        $.each(cityData, function(i, c){
                            $city.append($("<option></option>").val(c.cityCode).text(c.name));
                        });
                        $city.find("option[value='']").remove();
                        $city.HintSelect("buildHint");
                        $city.HintSelect("showHint");
                    }
                });
            }
        }
    });
    $city.HintSelect({
        groups: cityGroup,
        emptyText: '请选择市',
        buttonClick : function(){
            $province.HintSelect("closeHint");
        },
        itemClick : function(value){
            try{
                $city.find("option[value='" + value + "']").prop("selected", true);
            } catch(e){}
            return false;
        }
    });
}

var ProvinceCitySelectController = {
	options : {
		cascadeCityName: "",
		hideMunicipalities: true
	},
	_init: function() {
		var o = this.options,self = this,el= this.element;
		var city = $("select[name='" + o.cascadeCityName + "']");
		var selected = $(el).children("option:selected");
		if(o.hideMunicipalities
				&& selected.attr("isMunicipalities") == 1){
			city.hide();
			city.prop("disabled", "true");
		}
		self.city = city;
		$(el).change(function(){self._onchange.call(self);});
	},
	_onchange: function(){
		var o = this.options,self = this,el= this.element;
		var city = self.city, province = $(el);
		var selected = $(el).children("option:selected");
		city.children().each(function(i, item){
			if($(item).val("value") != ""){
				$(item).remove();
			}
		});
		city.tooltip("destroy");
		if(o.hideMunicipalities
				&& selected.attr("isMunicipalities") == 1){
			city.hide();
			city.prop("disabled", "true");
		}else{
			city.show();
			city.removeAttr("disabled");
			$.ajax({
				url:ctx + '/common/findAllCityByProvinceCode',
				cache:false,
				type:'POST',
				dataType:null,
				data:{'provinceCode':province.val()},
				success:function(cityData){
					$.each(cityData, function(i, c){
						city.append($("<option></option>").val(c.cityCode).text(c.name));
					})
				}
			});
		}
	},
	destroy: function(){
		var o = this.options,self = this,el= this.element;
	}
};
$.widget("ui.ProvinceCitySelect", ProvinceCitySelectController);

// 18.framework/jquery.chinaamc.fn.min.js

var ChinaamcFn = {
	/**
	 * 弹出新窗口
	 *
	 * @param url : 窗口的链接
	 * @param method : 提交方式,默认值为post
	 * @param wname : 窗口的名称
	 * @param toolbar : 是否显示工具栏
	 * @param menubar : 是否显示菜单栏
	 * @param scrollbars : 是否显示滚动条
	 * @param resizable : 是否可以改变大小
	 * @param location :位置否可以改变
	 * @param status : 是否显示状栏
	 * @param width : 宽度
	 * @param height : 高度
	 */
	openWindow : function(options){
		var defaults = {
			url : null,
			method : "post",
			wname : "_blank",
			toolbar : false,
			menubar : false,
			scrollbars : true,
			resizable : true,
			location : false,
			status : true,
			width : '1024',
			height :'768'
		}
		var opts = jQuery.extend(defaults,options);
		if(!opts.url){
			alert('url cannot be empty');
		}
		var o = 'width=' + opts.width + ',' + 'height=' + opts.height + ',' + 'toolbar=' + (opts.toolbar?'yes':'no') + ',' + 'menubar=' + (opts.menubar?'yes':'no') + ',' + 'scrollbars=' + (opts.scrollbars?'yes':'no') + ',' + 'resizable=' + (opts.resizable?'yes':'no') + ',' + 'location=' + (opts.location?'yes':'no') + ',' + 'status=' + (opts.status?'yes':'no');
		if (opts.method.toLowerCase()=="post"){
			var opw = window.open("about:blank",opts.wname,o);
			var opForm = $("<form id='subForm' method='post'></form>");
			opForm.attr("action",opts.url);
			var input = $('<input type="text" name="submitText" value="empty" />');
			var span = $('<span style="display:none;"></span>');
			span.append(input);
			opForm.append(span);
			/*
			opForm.attr("action",opts.url.split("?")[0]);
			$(opts.url.split("?")[1].split("&")).each(function(){
				var input = $("<input type='type' name='"+this.split("=")[0]+"' value='"+this.split("=")[1]+"' />");
				var span = $("<span style='display:none;'></span>");
				span.append(input);
				opForm.append(span);
			});
			*/
			var div = $("<div></div>")
			opForm.appendTo(div);
			opw.document.write(div.html());
			opw.document.getElementById("subForm").submit();
			opw.focus();
		}else{
			return window.open(opts.url,opts.wname,o);
		}


 	},
	/**
	 * 弹出窗口的父页面，与上面的实现方式相关
	 * //TODO 目前在chrome中测试有问题，无法执行父页面中的脚本
	 */
	openWindowParent : function(){
		var father = window.opener;
		return father;
	},

	/**
	 * 转换为中文大写人民币
	 *
	 * @param  s ： 待转换的金额
	 */
	toRMBCapital : function(s){
		if(!s||$.trim(s)==""){
			return Message.RMBCapital0;
		}
		if(isNaN(s) || s.length > 17){
			return Message.MoneyConvertError;
		}
		var cnDigits = Message.RMBCapitalDigits;
		var cnUnits = Message.RMBCapitalUnit;
		//放大100倍
		var numberFloat = parseFloat(s,10);
		if(numberFloat < 0){
			return Message.MoneyConvertError;
		}
		var numberString = Math.round(numberFloat * 100.0) + "" ;
		var l = numberString.length;
		if(l > 16){
			return Message.MoneyConvertError;
		}
		var cnCapital = "";
		var j = 0;
		for(var i = (l-1);i >=0;i--){
			var u = cnUnits.substr(j++,1);
			var d = cnDigits.substr(parseInt(numberString.substr(i,1),10),1);
			cnCapital = d + u + cnCapital;
		}

		for(var i = 0; i < Message.RMBCapitalReplaces.length; i++){
			var t = Message.RMBCapitalReplaces[i];
			cnCapital = cnCapital.replace(t[0],t[1]);
		}
		return cnCapital;
	},
	/**
	 * 转换为中文大写份额
	 * @version 1.1 使用更加自然的展现方式，如3000（叁仟份)
	 * @Date Dec 21,2010
	 *
	 * @param  s ： 待转换的份额
	 */
	toShareCapital : function(s){
		if(!s||$.trim(s)==""){
			return Message.ShareCapital0;
		}
		if(isNaN(s) || s.length > 17){
			return Message.MoneyConvertError;
		}
		var cnDigits = Message.ShareCapitalDigits;
		var cnUnits = Message.ShareCapitalDigitsUnit;
		//放大100倍
		var numberFloat = parseFloat(s,10);
		if(numberFloat < 0){
			return Message.MoneyConvertError;
		}
		var numberString = Math.round(numberFloat * 100.0) + "" ;
		var l = numberString.length;
		if(l > 16){
			return Message.MoneyConvertError;
		}
		var cnCapital = "";
		var j = 0;
		for(var i = (l-1);i >=0;i--){
			var u = cnUnits.substr(j++,1);
			var d = cnDigits.substr(parseInt(numberString.substr(i,1),10),1);
			cnCapital = d + u + cnCapital;
		}

		cnCapital = cnCapital.replace(Message.ShareCapitalReplaceNone[0], Message.ShareCapitalReplaceNone[1]);
		var cl = cnCapital.length;
		switch(cl){
			case 2 :{
				cnCapital = Message.ShareCapital1 + cnCapital;
				break;
			}
			case 1 :{
				cnCapital = Message.ShareCapital2 + cnCapital;
				break;
			}
			default : {
				break;
			}
		}
		for(var i = 0; i < Message.ShareCapitalReplaces.length; i++){
			var t = Message.ShareCapitalReplaces[i];
			cnCapital = cnCapital.replace(t[0],t[1]);
		}

		cnCapital = cnCapital + Message.ShareCapitalUnit;

		var t = Message.ShareCapitalReplaceUnit;
		while(true){
			if(cnCapital.match(t[0])){
				cnCapital = cnCapital.replace(t[0], t[1]);
			}else{
				break;
			}
		}
		return cnCapital;
	}
};
jQuery.chinaamc = ChinaamcFn;

// 19.framework/common.min.js
Date.prototype.pattern=function(fmt) {
    var o = {
    "M+" : this.getMonth()+1, //月份
    "d+" : this.getDate(), //日
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds() //毫秒
    };
    var week = {
    "0" : "\u65e5",
    "1" : "\u4e00",
    "2" : "\u4e8c",
    "3" : "\u4e09",
    "4" : "\u56db",
    "5" : "\u4e94",
    "6" : "\u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
/**
 * 日期的加减
 */
Date.prototype.addDay = function(type, number){
	number = parseInt(number);
	switch (type) {
		case "y" :{
			this.setFullYear(this.getFullYear() + number);
			break;
		}
		case "M" :{
			this.setMonth(this.getMonth() + number);
			break;
		}
		case "d" :{
			this.setDate(this.getDate() + number);
			break;
		}
		case "w" :{
			this.setDate(this.getDate() + 7*number);
			break;
		}
		case "H" :{
			this.setHours(this.getHours() + number);
			break;
		}
		case "m" :{
			this.setMinutes(this.getMinutes() + number);
			break;
		}
		case "s" :{
			this.setSeconds(this.getSeconds() + number);
			break;
		}
		case "S" :{
			this.setMilliseconds(this.getMilliseconds() + number);
			break;
		}
		default:
	}
	return this;
}
/**
 * 将格式为yyyy-MM-dd的字符串日期转为Date类型
 */
String.prototype.todate=function(){
	var r = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	try{
		var d = new Date(r[1], r[3] - 1, r[4]);
		if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
			return d;
		}
	}catch(e){
		throw 'date format error.' ;
	}
}
/**
 * 根据日期Date字符串得到年龄
 * @param str
 * @return
 */
function getAges(str) {
	var d1 = str.todate();
	var d2 = new Date();

	var year1 = d1.getFullYear();
	var month1 = d1.getMonth();
	var date1 = d1.getDate();

	var year2 = d2.getFullYear();
	var month2 = d2.getMonth();
	var date2 = d2.getDate();
	var age = year2-year1;
	if((month1>month2)||(month1==month2&&date1>date2)){
		return age-1;
	}
	return age;
}
function trim(s){
	return s.replace(/(^\s*)|(\s*$)/g, '');
}
function ltrim(s){
	return s.replace(/(^\s*)/g, '');
}
function rtrim(s){
	return s.replace(/(\s*$)/g, '');
}
/**
 * 根据身份证号得到性别
 */
function getSex(certificateNo ) {
	var sex;
	if(certificateNo.length==15){
		sex=parseInt(certificateNo.substr(14)) % 2;
	}else{
		sex=parseInt(certificateNo.substr(16,1)) % 2;
	}
	return sex;
}

/**
 * 根据身份证号得到出生日期 yyyy-MM-dd
 */
function getBirthday(certificateNo ) {
	var year;
	var month;
	var date;
	if(certificateNo.length==15)
	{
		year = "19"+certificateNo.substr(6,2);
		month = certificateNo.substr(8,2);
		date = certificateNo.substr(10,2);
		//birthday="19"+certificateNo.substr(6,2)+"-"+certificateNo.substr(8,2)+"-"+certificateNo.substr(10,2);
	}
	else
	{
		year = certificateNo.substr(6,4);
		month = certificateNo.substr(10,2);
		date = certificateNo.substr(12,2);
		//birthday=certificateNo.substr(6,4)+"-"+certificateNo.substr(10,2)+"-"+certificateNo.substr(12,2);
	}
	if(month<1||month>12)
		return "";
	if(date<1||date>31)
		return "";
	if(month==2 && isLeapYear(year) && date>29)
		return "";
	if(month==2 && !isLeapYear(year) && date > 28)
		return "";
	if((month==4||month==6||month==9||month==11)&&date>30)
		return "";
	return year+'-'+month+'-'+date;
}
function isLeapYear(year) {
	return (year % 4 == 0 && (year % 100 != 0 || year % 400 ==0));
}
/**
 * 有键盘输入时候校验输入的内容是否为数字
 */
function onlyNumber(elementID) {
	var inputText = document.getElementById(elementID);
	var val = inputText.value;
	//如果有输入非数字
	if (!val.match(/^[0-9]*$/)) {
		highLightInputText(elementID,true);
		inputText.value = val.substr(0, val.length - 1);
	} else{
		highLightInputText(elementID,false);
	}
}

/**
 * 输入出错时高亮显示输入框区域
 */
function highLightInputText(elementID,param) {
	var inputText = document.getElementById(elementID);
		if (param) {
			inputText.style.background = '#ffdbbe';
		} else {
			inputText.style.background = 'transparent';
		}
	}

/**
 * 有键盘输入时候校验输入的内容是否为汉字

 */
function onlyChinese(elementID){
	var inputText = document.getElementById(elementID);
	var val = inputText.value;
	var reg=/[u4E00-u9FA5]/g
	if (reg.test(val)){
		highLightInputText(elementID,true);
		inputText.value = val.substr(0, val.length - 1);
	} else{
		highLightInputText(elementID,false);
	}
}



/**
 * CMS生成
 * @param cmsid
 * @param divContainer
 */
function cmsListener(cmsid,divContainer){
	$('body').aLoad({
		action:ctx+'/cmsEditor/getAjaxContentGenerator',
		data:{tagId:cmsid},
		dataType:'json',
		success:function(newContent){
			$('#'+divContainer).empty();
			$('#'+divContainer).html(newContent.a);
		}
	});

}


/**
 * 页面跳转
 */
function goTo(url){
	window.location=url;
}
/**
 * 页面链接后退
 */
function back(){
	window.history.go(-1);
}
/**
 * 打开新窗口
 */
function openWindow(url){
	window.open=url;
}

/**
 * 隐藏错误提示
 */
function moveErrorMsgTip(){
	$("div.errorMsgTip").each(function(i,item){
		$(item).hide();
	});
}

/**
 * 返回此时间字符串的上一个月的日期字符串（yyyy-MM-dd）
 */
function getPreviouDate(dateStr){
	if("" == dateStr || undefined == dateStr || dateStr.indexOf("-") == -1)
		return "";
	var ary = dateStr.split('-');
	var date1_year=ary[0];
	var date1_mon=ary[1];
	var date1_day=ary[2];
	var nextDate = new Date(parseInt(date1_year,10),parseInt(date1_mon,10) - 2,parseInt(date1_day,10));
	return nextDate.pattern("yyyy-MM-dd");
}

/**
 * 将（yyyy-MM-dd）格式字符串转为日期
 */
function stringToDate(dateStr){
	if("" == dateStr || undefined == dateStr || dateStr.indexOf("-") == -1)
		return "";
	var ary = dateStr.split('-');
	var date1_year=ary[0];
	var date1_mon=ary[1];
	var date1_day=ary[2];
	var convertDate = new Date(parseInt(date1_year,10),parseInt(date1_mon,10) - 1,parseInt(date1_day,10));
	return convertDate;
}

/**
 *
 * 比较两个日期字符串的日期大小(yyyy-MM-dd)
 */
function compareDate(options){
	var defaults = {
		startName : "",
		endName : "",
		msg : ""
	}
	var opts = jQuery.extend(defaults,options);
	var startWayDate = $.trim($("input[name='"+opts.startName+"']").val());
	var endWayDate = $.trim($("input[name='"+opts.endName+"']").val());
	var reg = /^([1-3][0-9]{3}-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/;
	if("" != startWayDate && "" != endWayDate && reg.test(startWayDate) && reg.test(endWayDate)){
		var start = stringToDate(startWayDate);
		var end = stringToDate(endWayDate);
		if(end < start){
			showError({
				msg : opts.msg != "" ? opts.msg : Message.compareDateError
			});
			return false;
		}
	}
	return true;
}



/**
 *
 * 取得表单提交值的字符串
 *
 * @param f 必选项 ：jQuery选择器字符串，选择的form
 * @param attributeName 可选项：要剔除的表单属性
 */
function getFormData(f,attributeName){
	var dataStr = $.trim($(f).serialize());
	if("" == dataStr || undefined == attributeName || "" == attributeName || null == attributeName || dataStr.indexOf(attributeName) == -1){
		return dataStr;
	}
	var returnStr,subattStr,attStr;
	var attributeArray = dataStr.split("&");
	for(key in attributeArray){
		attStr = attributeArray[key];
		if(attStr.indexOf(attributeName) != -1){
			subattStr = ((dataStr.indexOf(attStr + "&") != -1) ? attStr + "&" : ((dataStr.indexOf("&" + attStr) != -1) ? "&" + attStr : attStr));
			returnStr = dataStr.replace(subattStr,"");
			break;
		}
	}
	return returnStr;
}


/**
 *
 * 重新加载页面
 *
 */
function reloadWindow(){
	window.location.reload(true);
}
/**
 * 清空form
 */
function formReset(){
	$.each($(":input"), function() {
		if($(this).attr("tagName")=="INPUT" || $(this).attr("tagName")=="SELECT"){
			$(this).val("");
		}
	});
}
/**
*
* 关闭页面
*
*/
function closeWindow(){
	window.close();
}

/**
 * @Date    : 2011.1.15
 * @Desc    : 数字千分位处理
 * @param nb 必填项 表示要格式化的数
 * @param bit 必填项 要保留的位数
 */
function formatNumber(nb,bit){
	var str = "" + nb;
	var zAmount,zLength,zData;
	var xLength,xData;
	var returnStr = "";
	var sign = true;

	if(/^[\s]*$/.test(str)){
		returnStr += "0.";
		for(var i = 0;i<bit;i++){
			returnStr += "0";
		}
		return returnStr;
	}
	// 对负数的处理
	if(str.charAt(0) == "-"){
		str = str.substring(1);
		sign = false;
	}
	var numberArray = str.split(".");
	var arrayLength = numberArray.length;
	// 整数的处理
	if(arrayLength == 1 || arrayLength == 2){
		zData = numberArray[0];
		zLength = zData.length;
		zAmount = "" + (zLength <= 3 ? "0" : (zLength % 3 == 0 ? zLength / 3- 1 : zLength / 3));
		zAmount = parseInt(zAmount.indexOf(".") != -1 ? zAmount.substring(0,zAmount.indexOf(".")) : zAmount,10);
		for(var i=1;i<(zAmount + 1);i++){
			returnStr = "," + zData.substr(zLength-3 * i,3) + returnStr;
		}
		returnStr = zData.substr(0,zLength - zAmount * 3) + returnStr;
		returnStr += ".";
	}
	// 小数处理
	if(arrayLength == 2){
		xData = numberArray[1];
		xLength = xData.length;
		if(xLength < bit){
			var tempStr = "";
			for(var i = 0;i<(bit - xLength);i++){
				tempStr += "0";
			}
			returnStr = returnStr + xData + tempStr;
		}else{
			returnStr = returnStr + xData;
		}
	}else if(arrayLength == 1){
		for(var i = 0;i<bit;i++){
			returnStr += "0";
		}
	}
	return (sign ? returnStr : "-" + returnStr);
}

// 20.nav.min.js
function autoExpand(){
	//根据当前的document的url来获取是哪个菜单,会过滤掉？后面的参数来进行匹配
	var url = document.location.href;

    var t = url.substring((url.indexOf(ctx) + ctx.length + 1), url.length);
    var menu = $("#nav div.subMenu span ul li a[href*='"+ t + "']");
    if(menu.html() != null){
        menu.addClass("current");
        menu.parents("div.subMenu").prev("h3").click();
        return;
    }

	var paramPosition = url.indexOf("\?");
	if(paramPosition == -1){
		paramPosition = url.length;
	}
	var realtiveUrl = url.substring((url.indexOf(ctx) + ctx.length + 1),paramPosition);
	realtiveUrl = mappedUrl(realtiveUrl,url);
	if(realtiveUrl != ''){
		var currentA = $("#nav div.subMenu span ul li a[href*='"+realtiveUrl + "']");
		if(currentA.html() == null){
			$(".defaultExpand").click();
		}else{
			currentA.addClass("current");
			currentA.parents("div.subMenu").prev("h3").click();
		}
	}else{
		$(".defaultExpand").click();
	}
}
/**
 *
 * @param realtiveUrl 屏蔽掉参数之后的URL
 * @param orginalUrl 未做任何处理的原URL,对带参数的访问地址进行特例处理
 * @returns n
 */
function mappedUrl(realtiveUrl,orginalUrl){
	var retUrl = realtiveUrl;
	switch(realtiveUrl) {
		case "main":{
			retUrl = "";
			break;
		}
		//基金申购
		case "fund/buy/buyInput":{
			retUrl = "fund/buy/buyableFundList";
			break;
		}
		//基金转换
		case "fund/switch/convertInput":{
			retUrl = "fund/switch/convertList";
			break;
		}
		//定期定额申购
		case "fund/RSP/add/buyPlanInput":{
			retUrl = "fund/RSP/add/buyPlanFundList";
			break;
		}
		//管理定投协议，定投详细
		case "fund/RSP/manage/buyPlanPayHistory":
		case "fund/RSP/stop/buyPlanStopConfirm":
		case "fund/RSP/modify/buyPlanEdit":
		case "fund/RSP/manage/tradePlanDetail":{
			retUrl = "fund/RSP/manage/tradePlanList";
			break;
		}
		//点击转账、资金明细查询
//		case "trade/capital/transferCapitalDetail":
		case "trade/capital/transferPaymentBank":{
			retUrl = "trade/capital/transferPaymentBalance";
			break;
		}
		//赎回
		case "fund/redemption/redeemInput" :{
			retUrl = "fund/redemption/redeemList";
			break;
		}
		//非货基快速赎回
		case "fund/redemption/equityFundQuickRedeem/input" :{
			retUrl = "fund/redemption/redeemList";
			break;
		}
		//快速赎回
		case "fund/redemption/quickRedeem/input" :{
			retUrl = "fund/redemption/quickRedeemList";
			break;
		}
		//预约赎回
		case "fund/ar/redeemPlanInput":
		case "fund/ar/redeemPlanStop":
		case "fund/ar/redeemPlanHistoryList":
		case "fund/ar/redeemPlanHistoryDetail":
		case "fund/ar/redeemPlanDetail":{
			retUrl = "fund/ar/redeemPlanList";
			break;
		}
		//管理定期转换
		case "fund/rsswitch/add/convertPlanInput":
		case "fund/rsswitch/manage/convertPlanHistory":
		case "fund/rsswitch/stop/convertPlanStopConfirm":
		case "fund/rsswitch/modify/convertPlanEdit":
		case "fund/rsswitch/manage/convertAgreement":
		case "trade/capital/transferCapitalDetail":{
			retUrl = "fund/rsswitch/manage/convertPlanList";
			break;
		}
		//当日交易详细
		case "query/applyments/today/tradeDetail":{
			retUrl = "query/applyments/today/todayApplication";
			break;
		}
		//修改银行卡号、户名、开户行全称
		case "account/payment/modify/paymentNameEdit":
		case "account/payment/modify/paymentBankBranchEdit":
		case "account/payment/modify/paymentNoEdit":{
			retUrl = "account/payment/modify/paymentEditList";
			break;
		}
		//余额理财
		case "fund/balance/manage/balancePlanDetail":
		case "fund/balance/manage/balancePlanPayHistory":
		case "fund/balance/add/balancePlanAdd":{
			retUrl = "fund/balance/add/balancePlanList";
			break;
		}
		//信用卡还款
		case "creditcard/CreditCardMyCard":
		case "creditcard/CreditCardInput":{
			retUrl = "creditcard/CreditCardList";
			break;
		}
		//信用卡自动还款
		case "repayPlan/manage/repayPlanDetail":
		case "repayPlan/manage/repayPlanEdit":
		case "repayPlan/repayPlanInput":{
			retUrl = "repayPlan/repayPlanList";
			break;
		}
		//信用卡预约还款
		case "plan/repayappointment/manage":
		case "plan/repayappointment/add/input/type/true":
		case "plan/repayappointment/add/input/type/false":{
			retUrl = "plan/repayappointment/manage";
			break;
		}
		//活期通取现
		case "fund/redemption/cashFundRedeem":{
			retUrl = "fund/redemption/cashFundRedeemList";
			break;
		}
		//车贷房贷还款
		case "fund/loan/repayLoanList":
		case "fund/loan/repayLoanInput":
		case "fund/loan/repayLoanConfirm":
		case "fund/loan/repayLoanResult":
		case "fund/loan/repayLoanPlanDetail":
		case "fund/loan/modify/loanPlanEditInput":
		case "fund/loan/modify/loanPlanEditConfirm":
		case "fund/loan/modify/loanPlanEditResult":
		case "fund/loan/stop/loanPlanStopConfirm":
		case "fund/loan/stop/loanPlanStopResult":
		case "fund/loan/repayLoanHistory":
		case "fund/loan/repayLoanHistoryResult":{
			retUrl = "fund/loan/repayLoanList";
			break;
		}
		//跨行转账
		case "fund/interbank/transferList":
		case "fund/interbank/transferInput":
		case "fund/interbank/transferConfirm":
		case "fund/interbank/transferResult":
		case "fund/interbank/transferPayOnline":
		case "fund/interbank/transferPayOnlineResult":
		case "fund/interbank/transferHistory":
		case "fund/interbank/transferHistoryResult":{
			retUrl = "fund/interbank/transferList";
			break;
		}
		//活期通预约取现
		case "fund/ar/cashFundRedeemPlanHistoryList":
		case "fund/ar/cashFundRedeemPlanHistoryDetail":
		case "fund/ar/cashFundRedeemPlanDetail":
		case "fund/ar/cashFundRedeemPlanStop":
		case "fund/ar/cashFundRedeemPlanInput":{
			retUrl = "fund/ar/cashFundRedeemPlanList";
			break;
		}
		case "account/autopay/manage/initSignInfo":{
			retUrl = "account/autopay/manage/autoPayAgreementList";
			break;
		}
		//借钱买入
		case "fund/financing/pledgeFinancing/repeat":{
			retUrl = "fund/financier/pledgeFinancingInput";
			break;
		}
		//活期通借出
		case "fund/financing/lendRegisterInput":{
			retUrl = "fund/financing/lendRegister";
			break;
		}
		case "fund/financingQuery/lendItemList":{
			retUrl = "fund/financingQuery/lendRegisterQuery";
			break;
		}
		case "fund/financing/pledgeFinancing/userGuide":{
			retUrl = "fund/financier/pledgeFinancingInput";
			break;
		}
		//盈亏分析
		case "query/income/incomeDetail":{
			retUrl = "fund/dtt/benefit/info";
			break;
		}
		//管理定投(详情,扣款历史)
		case "fund/dtt/manage/tradePlanDetail":
		case "fund/dtt/manage/buyPlanPayHistory":{
			retUrl = "fund/dtt/manage/tradePlanList";
			break;
		}
		case "fund/dtt/buyPlanInputByFundCode": {
			retUrl = "fund/dtt/buyPlanInput";
			break;
		}
		default:
	}
	if (/^plan\/repayappointment\//.test(realtiveUrl)){
		retUrl = "plan/repayappointment/manage";
	}
	return retUrl;
}
// 21.etrading.js
function decideBeginMonth(obj,agreementMonth,startDateObj,currentWorkDay,fundCode,currentDate){
	var workdays = {};
	if (fundCode != "undefined" && null != fundCode && "" != fundCode) {
		workdays = JSON.parse($("#"+fundCode+"_work").val());
	}
	if($.isEmptyObject(workdays)){
		showError({
			msg : Message.ErrorMessageNoChoseConvertIn
		});
		$(obj).children("option[selected]").removeAttr("selected");
		$(obj).advSelect("destroy");
		$(obj).advSelect();
		return false;
	}

	var startDate;
	var nextTradeDate;
	var today = Number(currentDate.split("-")[2]);
	var currentMonth = Number((currentDate.split("-")[1])-1);
	var currentYear = Number(currentDate.split("-")[0]);
	var selDates = new Array();
	var i=0;
	$($(obj).val()).each(function(i,selDay){
		if(Number(selDay) > today){
			selDates[i]= new Date(currentYear,currentMonth,selDay).pattern('yyyyMMdd');
		}else{
			if(currentMonth == 11){
				selDates[i]= new Date(currentYear+1,0,selDay).pattern('yyyyMMdd');
			}else{
				selDates[i]= new Date(currentYear,currentMonth+1,selDay).pattern('yyyyMMdd');
			}

		}
		i++;
	});

	selDates.sort();
	if(null != $(obj).val()){
		outer:
		for(var j=0;j<selDates.length;j++){
			for(key in workdays){
				if(selDates[j] == key){
					//如果选择的日期工作日大于当前工作日
					if(((new Date(workdays[key])).pattern('yyyyMMdd')) > currentWorkDay){
						startDate = (new Date(workdays[key])).pattern(Message.decideBeginMonth);
						break outer;
					}else{
						startDate = (new Date(currentYear,currentMonth+1)).pattern(Message.decideBeginMonth);
					}
				}
			}
		}
	}
	$("#"+agreementMonth).html("");
	$("#"+startDateObj).val("");
	$("#"+agreementMonth).html(startDate);
	$("#"+startDateObj).val(startDate);
}
//获取每月转换工作日${ctx}/fund/rsswitch/add/convertPlanGetWorkDayList
//var workdays = {};
function getConvertWorkDay(url,fundcode){
	workdays = {};
	$("body").aLoad({
		action:url,
		data: {"fundCode":fundcode},
		dataType:"json",
		success:function(data){
			if(null != data && data.workDayList != null){
				var i=0;
				$.each(data.workDayList,function(property,v){
					workdays[property]= v;
					i++;
				});
			}
		}
	});
	return workdays;
}


function openRate(){
	$.chinaamc.openWindow({
		url : "http://www.chinaamc.com/bangzhu/wendang/feilv/index.shtml",
		method : "get"
	});
}

/**
 * 显示转换优惠费率
 * @param shareClass
 * @param convertFundShareClass
 * @param hiddenName
 */
function showConvertRate(shareClass,convertFundShareClass,hiddenName){
	if("" == shareClass || "" == convertFundShareClass){
		return;
	}
	var need = ("c" == shareClass.toLowerCase() && "a" == convertFundShareClass.toLowerCase());
	$("#convertRate").html(need ? '<a href="#" onclick="openRate();return false;">' + Message.ConvertHasRate + "</a>" : Message.ConvertNoRate);
	if(typeof hiddenName == "string"){
		$(hiddenName).val(need ? "1" : "0");
	}
}

function replaceOptions(sourceId, targetId){
	var sourceSelect = document.getElementById(sourceId);
	var targetSelect = document.getElementById(targetId);
	for(var i = targetSelect.options.length; i > 0; i--){
		targetSelect.remove(i-1);
	}
	for(var i = 0; i < sourceSelect.options.length; i++){
		var item = sourceSelect.options.item(i);
		var opt = document.createElement("OPTION");
		opt.text = item.text;
		opt.value = item.value;
		targetSelect.options.add(opt);
	}
}

function FlashImage(m){
	var d = this, a = $;
    this.settings = a.extend({
        secondInterval: 4,
        clickTimeout: 5,
        fadeSpeed: 200,
        imgAsBackground: false
    }, m || {});
    var f = this.settings, k = d.children("a");
    if (f.imgAsBackground) {
        k.each(function(){
            var i = a(this).children("img");
            if (i[0]) {
                a(this).css({
                    background: "url('" + a(i[0]).attr("src") + "') 0 0 no-repeat"
                });
            }
            i.hide()
        })
    }
    var h = k.size();
    var b = (h > 1 ? 1 : 0);
    d.addClass("imgFlash");
    var c = a("<div class='imgChoose'></div>");
    var g = function(){
        k.hide();
        c.children("span").removeClass("current");
        c.children("span:eq(" + b + ")").addClass("current");
        a(k[b]).fadeIn(f.fadeSpeed);
        b = ((b + 1) > (h - 1) ? 0 : b + 1)
    };
    for (var j = 1; j <= h; j++) {
        a("<span>" + j + "</span>").click(function(){
            b = parseInt(a(this).html(), 10) - 1;
            l();
            g();
            setTimeout(e, f.clickTimeout * 1000);
            return false;
        }).appendTo(c);
    }
    d.append(c);
	c.css("top", d.innerHeight() - c.innerHeight());
	c.css("left", d.innerWidth() - c.innerWidth());
    var e = function(){
        if (!f.intervalId) {
            f.intervalId = setInterval(g, f.secondInterval * 1000);
        }
    };
    e();
    var l = function(){
        clearInterval(f.intervalId);
        f.intervalId = null;
    }
}
$.fn.imgFlash = FlashImage;

/**
 * 系统闲置超时提示
 */
var gTimeoutDialogOptions = {
	modal: true,
	width: 340,
	height: 260,
	title: "",
	zIndex: 10000,
	dialogClass: 'msg inputMsg',
	resizable: false,
	draggable: false,
	buttons: {
		'继续操作': function(){
			$(this).dialog('close');
			$(this).remove();
			clearInterval(gCountDownIntervalHandler);
			overtimeSession();
			setTimeout(showSecurityDialog, CONST_SECURITY_DIALOG_TIMER);
		},
		'退出系统': function(){
			$(this).dialog('close');
			logout(false);
		}
	}
};
var gCountDownTimer = 0;
var gCountDownIntervalHandler = null;
var gLastServerAccessTime = (new Date()).getTime();
var CONST_SECURITY_DIALOG_TIMER = 29 * 60 * 1000;
var CONST_LOGOUT_COUNT_DOWN_TIMER = 60;
var CONST_OVERTIME_SESSION_TIMER = 60 * 1000;

function countDown(){
	if(gCountDownTimer <= 0){
		logout(true);
	}
	$('#SecurityDialog').find(".CountDown").text(gCountDownTimer--);

}
function logout(isOvertime){
	var url = ctx + "/logout";
	if(gCountDownIntervalHandler){
		clearInterval(gCountDownIntervalHandler);
		gCountDownIntervalHandler = null;
	}
	if(isOvertime){
		url = url + "?type=overtime";
	}
	window.location.href = url;
}
function overtimeSession(){
	$.ajax({
		type : 'POST',
		url : ctx + '/overtimeSession',
		dataType : 'json',
		data : '',
		success : function(msg){},
		error : function(msg){},
		complete : function(XMLHttpRequest, textStatus){}
	});
}
function showSecurityDialog(){
	var idleTime = (new Date()).getTime() - gLastServerAccessTime;
	if (idleTime >= CONST_SECURITY_DIALOG_TIMER) {
		$('<div id="SecurityDialog"></div>').dialog(gTimeoutDialogOptions);
		$('#SecurityDialog').append($("#SecurityDialogHtml").html());
		$('#SecurityDialog').find(".IdleTime").text(CONST_SECURITY_DIALOG_TIMER / 1000 / 60);
		gCountDownTimer = CONST_LOGOUT_COUNT_DOWN_TIMER;
		gCountDownIntervalHandler = setInterval(countDown, 1000);
	}else{
		setTimeout(showSecurityDialog, CONST_SECURITY_DIALOG_TIMER - idleTime);
	}
}

var CONST_SMS_COUNT_DOWN_SECOND = 120;

//验证码倒计时
var InterValObj;
function captchaCountDown(tipId, buttonId, seqNo, callback) {
    window.clearInterval(InterValObj);
    var curCount = CONST_SMS_COUNT_DOWN_SECOND;
    var tip = $(tipId);
    var btn = $(buttonId);
    tip.html(getCaptchaTip(seqNo,curCount));
    btn.val("再次获取");
    btn.prop('disabled',true);
    InterValObj = window.setInterval(function(){
        if (curCount <= 0) {
            window.clearInterval(InterValObj);
            btn.prop('disabled',false);
            if(callback){
                try{
                    callback.call();
                }catch(e){};
            }
            tip.html("");
        } else {
            curCount--;
            tip.html(getCaptchaTip(seqNo,curCount));
        }
    }, 1000);
}

function getCaptchaTip(seqNo, curCount) {
    if (seqNo == null || seqNo == "") {
        return "验证码已由银行发送至您预留的手机,请在" + curCount + "秒后重新获取,如需帮助,请联系客服查询."
    } else {
        return "验证码已发送,请在" + curCount + "秒后重新获取,序列号:" + seqNo + ",如需帮助,请联系客服查询."
    }
}

function enableNextStep(){
	$('[name="btnNextStep"]').prop('disabled',false);
	$('[name="btnNextStep"]').removeClass('btndisable');
}
function disableNextStep(){
	$('[name="btnNextStep"]').prop('disabled',true);
	$('[name="btnNextStep"]').addClass('btndisable');
}
function resetCaptcha(){
    $("#btnGetCaptcha").val("点击获取");
    $("#btnGetCaptcha").prop('disabled',false);
    $("#captcha").val('');
    $("#captcha").prop('disabled',true);
	$("#captchaTip").html('');
	window.clearInterval(InterValObj);
}
function resetCaptchaB2C(){
    $("#btnGetCaptchaB2C").val("点击获取");
    $("#btnGetCaptchaB2C").prop('disabled',false);
    $("#captchaB2C").val('');
    $("#captchaB2C").prop('disabled',true);
	$("#captchaTip").html('');
	window.clearInterval(InterValObj);
}

function getQueryString(){
    var href = window.location.href;
    var i = href.indexOf("?");
    if(i > 0){
        return href.substring(i + 1);
    }
    return "";
}
function getDomain(){
    return window.location.protocol + "//" + window.location.host + (ctx==""?"":ctx);
}
function createTrend(path,param){
    try{
        var frame = document.createElement("iframe");
        frame.height = 0;
        frame.width = 0;
        frame.frameborder = "no";
        var queryString = getQueryString();
        var url = getDomain() + path + "?" + param;
        if(queryString != ""){
            url = url + "&" + queryString;
        }
        frame.src = url;
        document.body.appendChild(frame);
    }catch(e){

    }
}
function createNewTrend(httpUrl,path,param){
    try{
        var frame = document.createElement("iframe");
        frame.height = 0;
        frame.width = 0;
        frame.frameborder = "no";
        var queryString = getQueryString();
        var url = httpUrl + path + "?" + param;
        if(queryString != ""){
            url = url + "&" + queryString;
        }
        frame.src = url;
        document.body.appendChild(frame);
    }catch(e){

    }
}
function showNavigator(stepNo){
	/**用于导航标签切换 buyConfirm buyInput*/
	try{
		var jspans = $("#span_navigator>span");
		jspans.hide();
		var index=stepNo-1;
		if(index<0){
			index=0;
		}else if(stepNo>jspans.size()){
			index=jspans.size()-1;
		}
		var now=0;
		jspans.each(function(){
			if(now++==index){

				$(this).show();
			}
		});
	}catch(e){}
}
function loadWithoutCache(obj, url, data, success){
	var tmp = function(html){
		obj.html(html);
		if(typeof success==="function"){
			success(html);
		}
	};
	$.ajax({
		url: url,
		cache: false,
		data: data,
		success: tmp
	});
}
function createIncomeHTMLForMain(income){
	var span = "";
	if(income>0){
		span="<span class=\"number_color_red\">+"+formatIncome(income.toFixed(2))+"</span>";
	}else if(income<0){
		span="<span class=\"number_color_green\">"+formatIncome(income.toFixed(2))+"</span>";
	}else{
		span="<span style=\"color:#666666\">0.00</span>";
	}
	return span+"</span><span class=\"fs_12\"> 元</span>";
}
function formatIncome(income){
	return (income+'').replace(/\B(?=(?:\d{3})+\b)/g, ',');
}
function clearHTML(obj){
	$(obj).html("");
}
//过滤节假日,页面必须给出初始化禁止日期数组变量natDays 例:natDays=[[2015,1,23],[2015,8,26]]
function noWeekendsOrHolidays(date) {
	var noWeekend = $.datepicker.noWeekends(date);
	if (noWeekend[0]) {
		return nationalDays(date);
	} else {
		return noWeekend;
	}
}
function nationalDays(date) {
	for (var i = 0; i < natDays.length; i++) {
		if ((date.getMonth() == natDays[i][1] - 1) && (date.getDate() == natDays[i][2]) && (date.getFullYear() == natDays[i][0]))
		{
			return [false];
		}
    }
	return [true];
}
/**
 * CMS生成
 * @param cmsid
 */
function cmsListenerValue(cmsid){
	var ret = "";
	$('body').aLoad({
		action:ctx+'/cmsEditor/getAjaxContentGenerator',
		data:{tagId:cmsid},
		dataType:'json',
		success:function(newContent){
			ret = newContent.a;
		}
	});
	return ret;
}

/**
 * 普通number转化为千分位数字字符串，s：number;n:保留几位小数点
 */
function toThousandPrice(s,n){
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
   var l = s.split(".")[0].split("").reverse(),
   r = s.split(".")[1];
   t = "";
   for(i = 0; i < l.length; i ++ ){
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
   }
   return t.split("").reverse().join("") + "." + r;
}
