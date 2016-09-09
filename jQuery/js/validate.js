var ValidateMessage = {
		holderTelephoneNocheck: '不能为空',
		holderNamecheck: '不能为空',
		Range: '请保证范围', 
		NotEmpty: '请保证不为空', 
		Length: '请保证长度正确', 
		Email: '请保证符合邮件地址', 
		Past: '请保证时间正确', 
		Future: '请保证时间正确',
		Pattern: '请保证符合正则表达式',
		Null: '请保证是空',
		NotNull: '请保证不为空',
		Min: '请保证最小值正确',
		Max: '请保证最大值正确', 
		Size: '请保证长度正确',
		AssertFalse: '必须是否',
		AssertTrue: '必须是真',
		DecimalMax: '请保证最大值正确',
		DecimalMain: '请保证最小值正确',
		Digits: '请保证是数字',
		checkPassWordEq: '两次输入密码不一致', 
		checkPassWordRepeat: '密码不允许是重复的字符',
		accountCityCodeCheck: '请选择市！',
		bankAccountNoCheckForCOMM: '交行卡号必须不少于8位!', 
		bankAccountNoCheck: '农行卡号不能为16位!', 
		postcode: '请正确填写邮编', 
		earlyThanCurrent: '不能小于当前日期',
		mobile: '请正确填写您的手机号码',
		holderpostcodecheck: '不能为空',
		representativePrivilegecheck: '不能为空',
		holderAddresscheck: '不能为空', 
		representativeRelationcheck: '不能为空',
		representativeReasoncheck: '不能为空',
		idCardCheck: '请输入合法的身份证号码!', 
		Dictionary: '输入错误！',
		checkGdbCardNo: '新银行账号必须是银联标准理财通卡（以"622568"开头）!', 
		checkRefundmentVolumn: '转账资金账户退款金额不能小于20元!', 
		checkRefundment: '转账资金账户退款金额不能大于转账资金账户余额!', 
		wayDateCheck: '交易日期输入不合法!', 
		tradeDateCheck: '预约赎回日期只能从下一工作日开始，且小于一个月（30个自然日）', 
		checkVolume: '转换份额不允许超出可用份额',
		checkCapitalChannel: '请选择支付方式',
		birthDateModify: '出生日期必须小于当前日期'
};


//jsr303js.min.js
var globalErrorsId = (typeof tlGlobalErrorsId != "undefined") ? tlGlobalErrorsId : "global_errors";
var fieldErrorIdSuffix = (typeof tlFieldErrorIdSuffix != "undefined") ? tlFieldErrorIdSuffix : "_error";
if (!Array.prototype.push) {
    Array.prototype.push = function(){
        var b = this.length;
        for (var a = 0; a < arguments.length; a++) {
            this[b + a] = arguments[a]
        }
        return this.length
    }
}
if (!Function.prototype.apply) {
    Function.prototype.apply = function(object, parameters){
        var parameterStrings = new Array();
        if (!object) {
            object = window
        }
        if (!parameters) {
            parameters = new Array()
        }
        for (var i = 0; i < parameters.length; i++) {
            parameterStrings[i] = "parameters[" + i + "]"
        }
        object.__apply__ = this;
        var result = eval("object.__apply__(" + parameterStrings.join(", ") + ")");
        object.__apply__ = null;
        return result
    }
}
var JSR303JSValidator = function(b, c, a, d){
    this.name = b;
    this.config = a;
    this.rules = d;
    this.form = this._findForm(b);
    if (c) {
        this._installSelfWithForm()
    }
};
JSR303JSValidator.prototype = {
    validate: function(){
        return this._validateAndReturnFailedRules().length > 0
    },
    validateAndShowFeedback: function(){
        var a = this._validateAndReturnFailedRules();
        if (a.length > 0) {
            this.showValidationFeedback(a)
        }
        return a.length === 0
    },
    showValidationFeedback: function(e){
        var b = new Array();
        for (var d = 0; d < e.length; d++) {
            var a = e[d].field + fieldErrorIdSuffix;
            var h = document.getElementById(a);
            if (h != null) {
                h.innerHTML = e[d].getErrorMessage()
            }
            else {
                b.push(e[d])
            }
        }
        if (b != null && b.length != 0) {
            var c = document.getElementById(globalErrorsId);
            if (c != null) {
                var g = document.createElement("ul");
                for (var d = 0; d < b.length; d++) {
                    var k = document.createElement("li");
                    k.innerHTML = b[d].getErrorMessage();
                    g.appendChild(k)
                }
                c.appendChild(g)
            }
            else {
                var j = "";
                for (var d = 0; d < b.length; d++) {
                    j = j + b[d].getErrorMessage() + "\n"
                }
            }
        }
        var f = this.form.getFieldsWithName(e[0].field);
        if (f.length > 0) {
            f[0].activate()
        }
    },
    _findForm: function(a){
        var c = document.getElementById(a + "JSR303JSValidator");
        var b = c;
        while (c && c.tagName.toLowerCase() != "form") {
            c = c.parentNode
        }
        if (!c) {
            throw "unable to find FORM element enclosing element with ID '" + b.id + "'"
        }
        return new JSR303JSValidator.Form(c)
    },
    _installSelfWithForm: function(){
        var c = window.onload;
        var b = this.form.formElement.onsubmit;
        var a = this;
        window.onload = function(){
            JSR303JSValidator.Logger.log("Installing JSR303JSValidator '" + a.name + "' as onsubmit handler");
            try {
                if (c) {
                    c()
                }
            } 
            catch (d) {
                alert(d)
            }
            finally {
                a.form.formElement.onsubmit = function(){
                    if (!b || b()) {
                        return a.validateAndShowFeedback()
                    }
                }
            }
        }
    },
    _validateAndReturnFailedRules: function(){
        this._clearGlobalErrors();
        JSR303JSValidator.Logger.push("Starting validation");
        var a = new Array();
        for (var b = 0; b < this.rules.length; b++) {
            var c = this.rules[b];
            this._clearErrorIfExists(c.field);
            JSR303JSValidator.Logger.push("Evaluating rule for field [" + c.field + "]");
            c.form = this.form;
            if (!c.validate(this)) {
                JSR303JSValidator.Logger.pop("Failed");
                a.push(c)
            }
            else {
                JSR303JSValidator.Logger.pop("Passed")
            }
        }
        JSR303JSValidator.Logger.pop("Finshed - " + a.length + " failed rules");
        return this._giveRulesSameOrderAsFormFields(a)
    },
    _clearErrorIfExists: function(b){
        var a = document.getElementById(b + fieldErrorIdSuffix);
        if (a != null) {
            a.innerHTML = ""
        }
    },
    _clearGlobalErrors: function(){
        var a = document.getElementById(globalErrorsId);
        if (a != null) {
            a.innerHTML = ""
        }
    },
    _giveRulesSameOrderAsFormFields: function(c){
        var e = new Array();
        var a = this.form.getFields();
        for (var d = 0; d < a.length; d++) {
            var f = a[d].name;
            for (var b = 0; b < c.length; b++) {
                if (c[b] && c[b].field == f) {
                    e.push(c[b]);
                    c[b] = null
                }
            }
        }
        for (var d = 0; d < c.length; d++) {
            if (c[d]) {
                e.push(c[d])
            }
        }
        return e
    }
};
JSR303JSValidator.Logger = {
    log: function(c){
        var a = document.getElementById("jsr303jsLogDiv");
        if (a) {
            var b = a.innerHTML;
            a.innerHTML = this._indentString("&nbsp;") + c + (b.length > 0 ? "<br>" + b : "")
        }
    },
    push: function(a){
        this.log(a);
        this._indent++
    },
    pop: function(a){
        this._indent--;
        this.log(a)
    },
    logFunctionCalls: function(b){
        for (var a in b) {
            var c = b[a];
            if (typeof c == "function") {
                b[a] = this._wrapFunctionCallWithLog(a, c)
            }
        }
    },
    _indent: 0,
    _indentString: function(c){
        var a = "";
        for (var b = 0; b < this._indent * 5; b++) {
            a += c
        }
        return a
    },
    _wrapFunctionCallWithLog: function(a, b){
        return function(){
            JSR303JSValidator.Logger.push("calling " + a + "(" + arguments[0] + ", " + arguments[1] + ")");
            try {
                var c = b.apply(this, arguments)
            } 
            catch (d) {
                JSR303JSValidator.Logger.pop("threw " + d);
                throw d
            }
            JSR303JSValidator.Logger.pop("result = " + c);
            return c
        }
    }
};
JSR303JSValidator.Form = function(a){
    this.formElement = a
};
JSR303JSValidator.Form.prototype = {
    getValue: function(d){
        var a = this.getFieldsWithName(d);
        var c = new Array();
        for (var b = 0; b < a.length; b++) {
            if (a[b].getValue()) {
                c.push(a[b].getValue())
            }
        }
        if (c.length == 1) {
            return c[0]
        }
        else {
            if (c.length > 1) {
                return c
            }
        }
    },
    getFieldsWithName: function(e){
        var d = new Array();
        var a = this.getFields();
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (c.name == e) {
                d.push(c)
            }
        }
        return d
    },
    getFields: function(){
        var a = new Array();
        var c = this.formElement.elements;
        for (var b = 0; b < c.length; b++) {
            if (c[b].tagName.toLowerCase() != "fieldset"
            		&& !c[b].disabled) {
                a.push(new JSR303JSValidator.Field(c[b]))
            }
        }
        return a
    },
    disable: function(){
        var a = this.getFields();
        for (var b = 0; b < a.length; b++) {
            a[b].disable()
        }
    },
    enable: function(){
        var a = this.getFields();
        for (var b = 0; b < a.length; b++) {
            a[b].enable()
        }
    },
    focusFirstElement: function(c){
        var a = this.getFields();
        for (var b = 0; b < a.length; b++) {
            var d = a[b];
            if (d.type != "hidden" && !d.isDisabled()) {
                d.activate();
                break
            }
        }
    }
};
JSR303JSValidator.Field = function(a){
    this.id = a.id;
    this.name = a.name;
    this.type = a.type.toLowerCase();
    this.tagName = a.tagName.toLowerCase();
    this.fieldElement = a;
    if (JSR303JSValidator.Field.ValueGetters[this.tagName]) {
        this.getValue = JSR303JSValidator.Field.ValueGetters[this.tagName]
    }
    else {
        if (this.tagName == "input") {
            switch (this.type) {
                case "submit":
                case "hidden":
                case "password":
                case "text":
                    this.getValue = JSR303JSValidator.Field.ValueGetters.textarea;
                    break;
                case "checkbox":
                case "radio":
                    this.getValue = JSR303JSValidator.Field.ValueGetters.inputSelector;
                    break
            }
        }
    }
};
JSR303JSValidator.Field.prototype = {
    clear: function(){
        this.fieldElement.value = ""
    },
    focus: function(){
		try{
			this.fieldElement.focus();	
		}catch(e){}
    },
    select: function(){
        if (this.fieldElement.select) {
            this.fieldElement.select()
        }
    },
    activate: function(){
        this.focus();
        this.select()
    },
    isDisabled: function(){
        return element.disabled
    },
    disable: function(){
        element.blur();
        element.disabled = "true"
    },
    enable: function(){
        element.disabled = ""
    }
};
JSR303JSValidator.Field.ValueGetters = {
    inputSelector: function(){
        if (this.fieldElement.checked) {
            return this.fieldElement.value
        }
    },
    textarea: function(){
        return this.fieldElement.value
    },
    select: function(){
        var d = "";
        if (this.fieldElement.type == "select-one") {
            var a = this.fieldElement.selectedIndex;
            if (a >= 0) {
                d = this.fieldElement.options[a].value
            }
        }
        else {
            d = new Array();
            for (var b = 0; b < element.length; b++) {
                var c = this.fieldElement.options[b];
                if (c.selected) {
                    d.push(c.value)
                }
            }
        }
        return d
    }
};
JSR303JSValidator.Rule = function(b, a, c){
    this.field = b;
    this.params = c;
    this.validationFunction = a
};
JSR303JSValidator.Rule.prototype = {
    validate: function(a){
        var b = this[this.validationFunction];
        if (!b || typeof b != "function") {
            return false
        }
        return b(this.getPropertyValue(this.field), this.params, this.field, a.config)
    },
    getErrorMessage: function(){
        return (this.params.message || "Invalid value for " + this.field)
    },
    getPropertyValue: function(a, b){
        return this.form.getValue(a)
    },
    _assertHasLength: function(a){
        if (!a.length) {
            throw "value '" + a + "' does not have length"
        }
    },
    _assertLength: function(b, a){
        this._assertHasLength(b);
        if (b.length != a) {
            throw "value's length != '" + a + "'"
        }
    },
    _throwError: function(a){
        throw a
    },
    _makeCompatible: function(a, e){
        try {
            this._forceNumber(e);
            return this._forceNumber(a)
        } 
        catch (b) {
        }
        var c = typeof a;
        var d = typeof e;
        if (c == d) {
            return a
        }
        else {
            if (c == "number" || d == "number") {
                return this._forceNumber(a)
            }
            else {
                throw "unable to convert [" + a + "] and [" + e + "] to compatible types"
            }
        }
    },
    _forceNumber: function(value){
        if (typeof value != "number") {
            try {
                var newValue = eval(value.toString())
            } 
            catch (ex) {
            }
            if (newValue && typeof newValue == "number") {
                return newValue
            }
            throw "unable to convert value [" + value + "] to number"
        }
        return value
    },
    AssertFalse: function(a, b){
        return (a == "false")
    },
    AssertTrue: function(a, b){
        return (a == "true")
    },
    DecimalMax: function(c, d){
        var b = true;
        if (c) {
            var a = new Number(c).valueOf();
            if (isNaN(a)) {
                b = false
            }
            else {
                b = a <= new Number(d.value).valueOf()
            }
        }
        return b
    },
    DecimalMin: function(c, d){
        var b = true;
        if (c) {
            var a = new Number(c).valueOf();
            if (isNaN(a)) {
                b = false
            }
            else {
                b = a >= new Number(d.value).valueOf()
            }
        }
        return b
    },
    Digits: function(d, e){
        var c = true;
        if (d) {
            var b = new Number(d).valueOf();
            if (isNaN(b)) {
                c = false
            }
            else {
                var a = b.toString();
                var f = a.split(".");
                if (e.integer && f[0].length > e.integer) {
                    c = false
                }
                if (c && e.fraction && f.length > 1 && f[1].length > e.fraction) {
                    c = false
                }
            }
        }
        return c
    },
    Max: function(c, d){
        var b = true;
        if (c) {
            var a = new Number(c).valueOf();
            if (isNaN(a)) {
                b = false
            }
            else {
                b = a <= new Number(d.value).valueOf()
            }
        }
        return b
    },
    Min: function(c, d){
        var b = true;
        if (c) {
            var a = new Number(c).valueOf();
            if (isNaN(a)) {
                b = false
            }
            else {
                b = a >= new Number(d.value).valueOf()
            }
        }
        return b
    },
    NotNull: function(a, b){
        return (a && a.toString().length > 0)
    },
    Null: function(a, b){
        return (!a || a.toString().length == 0)
    },
    Pattern: function(e, f){
        var d = true;
        if (e) {
            var b = false;
            if (f.flag && f.flag.length > 0) {
                for (var c = 0; c < f.flag.length; c++) {
                    if (f.flag[c] == "CASE_INSENSITIVE") {
                        b = true;
                        break
                    }
                }
            }
            var a = b ? new RegExp(f.regexp, "i") : new RegExp(f.regexp);
            d = e.search(a) > -1
        }
        return d
    },
    Size: function(c, d){
        var b = true;
        if (c) {
            var a = c.toString().length;
            if (d.min && a < d.min) {
                b = false
            }
            if (b && d.max && a > d.max) {
                b = false
            }
        }
        return b
    },
    Future: function(f, h, i, b){
        var d = true;
        if (f) {
            var a = (b[i] && b[i].dateFormat ? b[i].dateFormat : JSR303JSValidator.DateParser.defaultFormat);
            try {
                var c = JSR303JSValidator.DateParser.parseDate(a, f);
                d = c && c.getTime() > new Date().getTime()
            } 
            catch (g) {
                JSR303JSValidator.Logger.log(g)
            }
        }
        return d
    },
    Past: function(f, h, i, b){
        var d = true;
        if (f) {
            var a = (b[i] && b[i].dateFormat ? b[i].dateFormat : JSR303JSValidator.DateParser.defaultFormat);
            try {
                var c = JSR303JSValidator.DateParser.parseDate(a, f);
                d = c && c.getTime() < new Date().getTime()
            } 
            catch (g) {
                JSR303JSValidator.Logger.log(g)
            }
        }
        return d
    },
    Email: function(a, b){
        return (!a || a.search(JSR303JSValidator.Rule.emailPattern) > -1)
    },
    Length: function(c, d){
        var b = true;
        if (c) {
            var a = c.toString().length;
            if (d.min && a < d.min) {
                b = false
            }
            if (b && d.max && a > d.max) {
                b = false
            }
        }
        return b
    },
    NotEmpty: function(a, b){
        return (a && a.toString().search(/\w+/) > -1)
    },
    Range: function(c, d){
        var b = true;
        if (c) {
            var a = new Number(c).valueOf();
            if (isNaN(a)) {
                b = false
            }
            else {
                if (d.min && a < d.min) {
                    b = false
                }
                if (b && d.max && a > d.max) {
                    b = false
                }
            }
        }
        return b
    }
};
JSR303JSValidator.Rule.emailPatternAtom = '[^\x00-\x1F^\\(^\\)^\\<^\\>^\\@^\\,^\\;^\\:^\\^"^\\.^\\[^\\]^\\s]';
JSR303JSValidator.Rule.emailPatternDomain = JSR303JSValidator.Rule.emailPatternAtom + "+(\\." + JSR303JSValidator.Rule.emailPatternAtom + "+)*";
JSR303JSValidator.Rule.emailPatternIPDomain = "\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\]";
JSR303JSValidator.Rule.emailPattern = new RegExp("^" + JSR303JSValidator.Rule.emailPatternAtom + "+(\\." + JSR303JSValidator.Rule.emailPatternAtom + "+)*@(" + JSR303JSValidator.Rule.emailPatternDomain + "|" + JSR303JSValidator.Rule.emailPatternIPDomain + ")$", "i");
JSR303JSValidator.DateParser = {
    defaultFormat: "M/d/y",
    formatChars: {
        d: {
            regexp: "\\d{1,2}"
        },
        m: {
            regexp: "\\d{1,2}"
        },
        M: {
            regexp: "\\d{1,2}"
        },
        a: {
            regexp: "[aApP][mM]+"
        },
        y: {
            regexp: "\\d{1,4}"
        },
        h: {
            regexp: "\\d{1,2}"
        },
        H: {
            regexp: "\\d{1,2}"
        },
        s: {
            regexp: "\\d{1,2}"
        }
    },
    parseDate: function(p, t){
        var m = null;
        if (!p || p.search(/\w/) < 0) {
            throw ("date format must not be blank")
        }
        if (p.search(/y/) < 0) {
            throw ('date format must at least contain year character ("y")')
        }
        if (p.indexOf("h") > -1 && p.indexOf("a") < 0) {
            throw ('date format must contain AM/PM ("a") if using 12-hour hours ("h")')
        }
        if (p.indexOf("H") > -1 && p.indexOf("a") > -1) {
            throw ('date format must not contain AM/PM ("a") if using 24-hour hours ("H")')
        }
        if (!t || t.search(/\w/) < 0) {
            throw ("date value must not be blank")
        }
        var j;
        var d = {};
        var o = 1;
        for (var q = 0; q < p.length; q++) {
            var e = p.charAt(q);
            for (j in this.formatChars) {
                if (e == j) {
                    if (d[j]) {
                        throw ("date format must not contain more than one of the same format character")
                    }
                    d[j] = o++
                }
            }
        }
        var c = p;
        for (j in this.formatChars) {
            c = c.replace(j, "(" + this.formatChars[j].regexp + ")")
        }
        c = new RegExp(c);
        var b = t.match(c);
        if (!b) {
            return null
        }
        var g = Math.max(0, b[d.y] || 0);
        var l = Math.max(0, (b[d.M] || 0) - 1);
        var a = Math.max(1, b[d.d] || 0);
        var f = b[d.h];
        var n = b[d.a];
        var s = b[d.H];
        var r;
        if (f) {
            r = f % 12;
            if (n.toLowerCase().indexOf("p") > -1) {
                r += 12
            }
        }
        else {
            r = s || 0
        }
        r = Math.max(0, r);
        var k = Math.max(0, b[d.m] || 0);
        var h = Math.max(0, b[d.s] || 0);
        m = new Date(g, l, a, r, k, h);
        return m
    }
};

//jquery.validate.min.js
(function(a) {
	a.extend(a.fn,
		{
			validate : function(b) {
				if (!this.length) {
					b && b.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
				return
			}
			var c = a.data(this[0], "validator");
			if (c) {
				return c
			}
			c = new a.validator(b, this[0]);
			a.data(this[0], "validator", c);
			if (c.settings.onsubmit) {
				this.find("input, button").filter(".cancel")
						.click(function() {
							c.cancelSubmit = true
						});
				if (c.settings.submitHandler) {
					this.find("input, button")
							.filter(":submit").click(
									function() {
										c.submitButton = this
									})
				}
				this.submit(function(d) {
						if (c.settings.debug) {
							d.preventDefault()
						}
						function e() {
							if (c.settings.submitHandler) {
								if (c.submitButton) {
									var f = a("<input type='hidden'/>")
											.attr("name", c.submitButton.name)
											.val(c.submitButton.value)
											.appendTo(c.currentForm)
								}
								c.settings.submitHandler
										.call(c, c.currentForm);
								if (c.submitButton) {
									f.remove()
								}
								return false
							}
							return true
						}
						if (c.cancelSubmit) {
							c.cancelSubmit = false;
							return e()
						}
						if (c.form()) {
							if (c.pendingRequest) {
								c.formSubmitted = true;
								return false
							}
							return e()
						} else {
							c.focusInvalid();
							return false
						}
					})
			}
			return c
		},
		valid : function() {
			if (a(this[0]).is("form")) {
				return this.validate().form()
			} else {
				var c = true;
				var b = a(this[0].form).validate();
				this.each(function() {
					c &= b.element(this)
				});
				return c
			}
		},
		removeAttrs : function(d) {
			var b = {}, c = this;
			a.each(d.split(/\s/), function(e, f) {
				b[f] = c.attr(f);
				c.removeAttr(f)
			});
			return b
		},
		rules : function(e, b) {
			var g = this[0];
			if (e) {
				var d = a.data(g.form, "validator").settings;
				var i = d.rules;
				var j = a.validator.staticRules(g);
				switch (e) {
				case "add":
					a.extend(j, a.validator.normalizeRule(b));
					i[g.name] = j;
					if (b.messages) {
						d.messages[g.name] = a.extend(d.messages[g.name], b.messages)
					}
					break;
				case "remove":
					if (!b) {
						delete i[g.name];
						return j
					}
					var h = {};
					a.each(b.split(/\s/), function(k, l) {
						h[l] = j[l];
						delete j[l];
					});
					return h
				}
			}
			var f = a.validator.normalizeRules(a.extend({},
					a.validator.metadataRules(g), a.validator
							.classRules(g), a.validator
							.attributeRules(g), a.validator
							.staticRules(g)), g);
			if (f.required) {
				var c = f.required;
				delete f.required;
				f = a.extend({
					required : c
				}, f)
			}
			return f
		}
	});
	a.extend(a.expr[":"], {
		blank : function(b) {
			return !a.trim("" + b.value)
		},
		filled : function(b) {
			return !!a.trim("" + b.value)
		},
		unchecked : function(b) {
			return !b.checked
		}
	});
	a.validator = function(b, c) {
		this.settings = a.extend(true, {}, a.validator.defaults, b);
		this.currentForm = c;
		this.init()
	};
	a.validator.format = function(b, c) {
		if (arguments.length == 1) {
			return function() {
				var d = a.makeArray(arguments);
				d.unshift(b);
				return a.validator.format.apply(this, d)
			}
		}
		if (arguments.length > 2 && c.constructor != Array) {
			c = a.makeArray(arguments).slice(1)
		}
		if (c.constructor != Array) {
			c = [ c ]
		}
		a.each(c, function(d, e) {
			b = b.replace(new RegExp("\\{" + d + "\\}", "g"), e)
		});
		return b
	};
	a.extend(a.validator,
		{
			defaults : {
				messages : {},
				groups : {},
				rules : {},
				errorClass : "error",
			validClass : "valid",
			errorElement : "label",
			focusInvalid : true,
			errorContainer : a([]),
			errorLabelContainer : a([]),
			onsubmit : true,
			ignore : [],
			ignoreTitle : false,
			onfocusin : function(b) {
				this.lastActive = b;
				if (this.settings.focusCleanup
						&& !this.blockFocusCleanup) {
					this.settings.unhighlight
							&& this.settings.unhighlight.call(
									this, b,
									this.settings.errorClass,
									this.settings.validClass);
					this.errorsFor(b).hide();
				}
			},
			onfocusout : function(b) {
				if (!this.checkable(b) && 
						(b.name in this.submitted || !this.optional(b))) {
					this.element(b)
				}
			},
			onkeyup : function(b) {
				if (b.name in this.submitted || b == this.lastElement) {
					this.element(b)
				}
			},
			onclick : function(b) {
				if (b.name in this.submitted) {
					this.element(b)
				} else {
					if (b.parentNode.name in this.submitted) {
						this.element(b.parentNode)
					}
				}
			},
			onblur : function(b) {
				if (b.name in this.submitted || b == this.lastElement) {
					this.element(b)
				}
			},
			highlight : function(d, b, c) {
				a(d).addClass(b).removeClass(c)
			},
			unhighlight : function(d, b, c) {
				a(d).removeClass(b).addClass(c)
			}
		},
		setDefaults : function(b) {
			a.extend(a.validator.defaults, b)
		},
		messages : {
			required : "This field is required.",
			remote : "Please fix this field.",
			email : "Please enter a valid email address.",
			url : "Please enter a valid URL.",
			date : "Please enter a valid date.",
			dateISO : "Please enter a valid date (ISO).",
			number : "Please enter a valid number.",
			digits : "Please enter only digits.",
			creditcard : "Please enter a valid credit card number.",
			equalTo : "Please enter the same value again.",
			accept : "Please enter a value with a valid extension.",
			maxlength : a.validator.format("Please enter no more than {0} characters."),
			minlength : a.validator.format("Please enter at least {0} characters."),
			rangelength : a.validator.format("Please enter a value between {0} and {1} characters long."),
			range : a.validator.format("Please enter a value between {0} and {1}."),
			max : a.validator.format("Please enter a value less than or equal to {0}."),
			min : a.validator.format("Please enter a value greater than or equal to {0}.")
		},
		autoCreateRanges : false,
		prototype : {
			init : function() {
				this.labelContainer = a(this.settings.errorLabelContainer);
				this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm);
				this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer);
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();
				var b = (this.groups = {});
				a.each(this.settings.groups, function(e, f) {
					a.each(f.split(/\s/), function(h, g) {
						b[g] = e
					})
				});
				var d = this.settings.rules;
				a.each(d, function(e, f) {
					d[e] = a.validator.normalizeRule(f)
				});
				function c(h) {
					var g = a.data(this[0].form, "validator"), f = "on" + h.type.replace(/^validate/, "");
					try {
						g.settings[f] && g.settings[f].call(g, this[0])
					} catch (i) {
					}
				}
				a(this.currentForm)
						.validateDelegate(
								":text, :password, :file, select, textarea",
								"focusin focusout keyup", c)
						.validateDelegate(
								":radio, :checkbox, select, option",
								"click", c);
				if (this.settings.invalidHandler) {
					a(this.currentForm).bind(
							"invalid-form.validate",
							this.settings.invalidHandler)
				}
			},
			form : function() {
				this.checkForm();
				a.extend(this.submitted, this.errorMap);
				this.invalid = a.extend({}, this.errorMap);
				if (!this.valid()) {
					a(this.currentForm).triggerHandler("invalid-form", [ this ])
				}
				this.showErrors();
				if(this.errorList[0]){
					var b = this.errorList[0];
					try{
						var top = a(b.element).offset().top;
						if(top > 50)
							top = top - 50;
						else
							top = 0;
						a(document).scrollTop(top);
					}catch(e){}
				}
				return this.valid();
			},
			checkForm : function() {
				this.prepareForm();
				for ( var b = 0, c = (this.currentElements = this.elements()); c[b]; b++) {
					this.check(c[b]);
				}
				return this.valid();
			},
			element : function(c) {
				c = this.clean(c);
				this.lastElement = c;
				this.prepareElement(c);
				this.currentElements = a(c);
				var b = this.check(c);
				if (b) {
					delete this.invalid[c.name];
				} else {
					this.invalid[c.name] = true;
				}
				if (!this.numberOfInvalids()) {
					this.toHide = this.toHide.add(this.containers);
				}
				this.showErrors();
				return b;
			},
			showErrors : function(c) {
				if (c) {
					a.extend(this.errorMap, c);
					this.errorList = [];
					for ( var b in c) {
						this.errorList.push({
							message : c[b],
							element : this.findByName(b)[0]
						});
					}
					this.successList = a.grep(this.successList,
							function(d) {
								return !(d.name in c);
							});
				}
				this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList)
						: this.defaultShowErrors();
			},
			resetForm : function() {
				if (a.fn.resetForm) {
					a(this.currentForm).resetForm();
				}
				this.submitted = {};
				this.prepareForm();
				this.hideErrors();
				this.elements().removeClass(this.settings.errorClass);
			},
			numberOfInvalids : function() {
				return this.objectLength(this.invalid);
			},
			objectLength : function(d) {
				var c = 0;
				for ( var b in d) {
					c++;
				}
				return c;
			},
			hideErrors : function() {
				this.addWrapper(this.toHide).hide();
			},
			valid : function() {
				return this.size() == 0;
			},
			size : function() {
				return this.errorList.length;
			},
			focusInvalid : function() {
				if (this.settings.focusInvalid) {
					try {
						a(this.findLastActive() || this.errorList.length
							&& this.errorList[0].element || [])
								.filter(":visible").focus().trigger("focusin")
					} catch (b) {
					}
				}
			},
			findLastActive : function() {
				var b = this.lastActive;
				return b && a.grep(this.errorList, function(c) {
					return c.element.name == b.name
				}).length == 1 && b
			},
			elements : function() {
				var c = this, b = {};
				return a([])
						.add(this.currentForm.elements)
						.filter(":input")
						.not(":submit, :reset, :image, [disabled]")
						.not(this.settings.ignore)
						.filter(
								function() {
									!this.name && c.settings.debug && window.console && console.error("%o has no name assigned", this);
									if (this.name in b || !c.objectLength(a(this).rules())) {
										return false;
									}
									b[this.name] = true;
									return true;
								})
			},
			clean : function(b) {
				return a(b)[0];
			},
			errors : function() {
				return a(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext);
			},
			reset : function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = a([]);
				this.toHide = a([]);
				this.currentElements = a([])
			},
			prepareForm : function() {
				this.reset();
				this.toHide = this.errors().add(this.containers)
			},
			prepareElement : function(b) {
				this.reset();
				this.toHide = this.errorsFor(b)
			},
			check : function(c) {
				c = this.clean(c);
				if (this.checkable(c)) {
					c = this.findByName(c.name)[0]
				}
				var h = a(c).rules();
				var d = false;
				for (method in h) {
					var g = {
						method : method,
						parameters : h[method]
					};
					try {
						var b = a.validator.methods[method]
								.call(this, c.value.replace(/\r/g, ""), c, g.parameters);
						if (b == "dependency-mismatch") {
							d = true;
							continue;
						}
						d = false;
						if (b == "pending") {
							this.toHide = this.toHide.not(this.errorsFor(c));
							return;
						}
						if (!b) {
							this.formatAndAdd(c, g);
							return false;
						}
					} catch (f) {
						this.settings.debug && window.console 
							&& console.log("exception occured when checking element "
											+ c.id + ", check the '" + g.method + "' method", f);
						throw f;
					}
				}
				if (d) {
					return;
				}
				if (this.objectLength(h)) {
					this.successList.push(c);
				}
				return true;
			},
			customMetaMessage : function(b, d) {
				if (!a.metadata) {
					return;
				}
				var c = this.settings.meta ? a(b).metadata()[this.settings.meta] : a(b).metadata();
				return c && c.messages && c.messages[d];
			},
			customMessage : function(c, d) {
				var b = this.settings.messages[c];
				return b && (b.constructor == String ? b : b[d])
			},
			findDefined : function() {
				for ( var b = 0; b < arguments.length; b++) {
					if (arguments[b] !== undefined) {
						return arguments[b];
					}
				}
				return undefined;
			},
			defaultMessage : function(b, c) {
				return this.findDefined(this.customMessage(b.name, c), 
										this.customMetaMessage(b, c),
										!this.settings.ignoreTitle && b.title || undefined,
										a.validator.messages[c],
										"<strong>Warning: No message defined for "+ b.name + "</strong>");
			},
			formatAndAdd : function(c, e) {
				var d = this.defaultMessage(c, e.method), b = /\$?\{(\d+)\}/g;
				if (typeof d == "function") {
					d = d.call(this, e.parameters, c)
				} else {
					if (b.test(d)) {
						d = jQuery.format(d.replace(b, "{$1}"), e.parameters)
					}
				}
				this.errorList.push({
					message : d,
					element : c
				});
				this.errorMap[c.name] = d;
				this.submitted[c.name] = d;
			},
			addWrapper : function(b) {
				if (this.settings.wrapper) {
					b = b.add(b.parent(this.settings.wrapper));
				}
				return b;
			},
			defaultShowErrors : function() {
				for ( var c = 0; this.errorList[c]; c++) {
					var b = this.errorList[c];
					this.settings.highlight 
						&& this.settings.highlight.call(
									this, b.element,
									this.settings.errorClass,
									this.settings.validClass);
					this.showLabel(b.element, b.message);
				}
				if (this.errorList.length) {
					this.toShow = this.toShow.add(this.containers)
				}
				if (this.settings.success) {
					for ( var c = 0; this.successList[c]; c++) {
						this.showLabel(this.successList[c])
					}
				}
				if (this.settings.unhighlight) {
					for ( var c = 0, d = this.validElements(); d[c]; c++) {
						this.settings.unhighlight.call(this,
								d[c], this.settings.errorClass,
								this.settings.validClass);
					}
				}
				this.toHide = this.toHide.not(this.toShow);
				this.hideErrors();
				this.addWrapper(this.toShow).show();
			},
			validElements : function() {
				return this.currentElements.not(this.invalidElements());
			},
			invalidElements : function() {
				return a(this.errorList).map(function() {
					return this.element;
				});
			},
			showLabel : function(c, d) {
				var b = this.errorsFor(c);
				if (b.length) {
					b.removeClass().addClass(this.settings.errorClass);
					b.attr("generated") && b.html(d);
				} else {
					b = a("<" + this.settings.errorElement + "/>").attr({
														"for" : this.idOrName(c),
														generated : true
												}).addClass(this.settings.errorClass).html(d || "");
					if (this.settings.wrapper) {
						b = b.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
					}
					if (!this.labelContainer.append(b).length) {
						this.settings.errorPlacement ? this.settings.errorPlacement(b, a(c))
								: b.insertAfter(c);
					}
				}
				if (!d && this.settings.success) {
					b.text("");
					typeof this.settings.success == "string" ? b.addClass(this.settings.success)
							: this.settings.success(b);
				}
				this.toShow = this.toShow.add(b);
			},
			errorsFor : function(c) {
				var b = this.idOrName(c);
				return this.errors().filter(function() {
					return a(this).attr("for") == b;
				})
			},
			idOrName : function(b) {
				return this.groups[b.name] || (this.checkable(b) ? b.name : b.id || b.name);
			},
			checkable : function(b) {
				return /radio|checkbox/i.test(b.type);
			},
			findByName : function(b) {
				var c = this.currentForm;
				return a(document.getElementsByName(b)).map(
						function(d, e) {
							return e.form == c && e.name == b && e || null;
						})
			},
			getLength : function(c, b) {
				switch (b.nodeName.toLowerCase()) {
				case "select":
					return a("option:selected", b).length;
				case "input":
					if (this.checkable(b)) {
						return this.findByName(b.name).filter(":checked").length;
					}
				}
				return c.length;
			},
			depend : function(c, b) {
				return this.dependTypes[typeof c] ? this.dependTypes[typeof c](c, b) : true;
			},
			dependTypes : {
				"boolean" : function(c, b) {
					return c;
				},
				string : function(c, b) {
					return !!a(c, b.form).length;
				},
				"function" : function(c, b) {
					return c(b);
				}
			},
			optional : function(b) {
				return !a.validator.methods.required.call(this,a.trim(b.value), b)
						&& "dependency-mismatch";
			},
			startRequest : function(b) {
				if (!this.pending[b.name]) {
					this.pendingRequest++;
					this.pending[b.name] = true;
				}
			},
			stopRequest : function(b, c) {
				this.pendingRequest--;
				if (this.pendingRequest < 0) {
					this.pendingRequest = 0;
				}
				delete this.pending[b.name];
				if (c && this.pendingRequest == 0
						&& this.formSubmitted && this.form()) {
					a(this.currentForm).submit();
					this.formSubmitted = false;
				} else {
					if (!c && this.pendingRequest == 0
							&& this.formSubmitted) {
						a(this.currentForm).triggerHandler("invalid-form", [ this ]);
						this.formSubmitted = false;
					}
				}
			},
			previousValue : function(b) {
				return a.data(b, "previousValue")
						|| a.data(b, "previousValue", {
							old : null,
							valid : true,
							message : this.defaultMessage(b, "remote")
						})
			}
		},
		classRuleSettings : {
			required : {
				required : true
			},
			email : {
				email : true
			},
			url : {
				url : true
			},
			date : {
				date : true
			},
			dateISO : {
				dateISO : true
			},
			dateDE : {
				dateDE : true
			},
			number : {
				number : true
			},
			numberDE : {
				numberDE : true
			},
			digits : {
				digits : true
			},
			creditcard : {
				creditcard : true
			}
		},
		addClassRules : function(b, c) {
			b.constructor == String ? this.classRuleSettings[b] = c
					: a.extend(this.classRuleSettings, b)
		},
		classRules : function(c) {
			var d = {};
			var b = a(c).attr("class");
			b && a.each(b.split(" "),
						function() {
							if (this in a.validator.classRuleSettings) {
								a.extend(d, a.validator.classRuleSettings[this]);
							}
						});
			return d;
		},
		attributeRules : function(c) {
			var e = {};
			var b = a(c);
			for (method in a.validator.methods) {
				var d = b.attr(method);
				if (d) {
					e[method] = d;
				}
			}
			if (e.maxlength && /-1|2147483647|524288/.test(e.maxlength)) {
				delete e.maxlength;
			}
			return e;
		},
		metadataRules : function(b) {
			if (!a.metadata) {
				return {};
			}
			var c = a.data(b.form, "validator").settings.meta;
			return c ? a(b).metadata()[c] : a(b).metadata();
		},
		staticRules : function(c) {
			var d = {};
			if(typeof c == undefined){
				return d;
			}
			if(c == null){
				return d;
			}
			var b = a.data(c.form, "validator");
			if (b.settings.rules) {
				d = a.validator.normalizeRule(b.settings.rules[c.name]) || {};
			}
			return d;
		},
		normalizeRules : function(c, b) {
			a.each(c, function(f, e) {
				if (e === false) {
					delete c[f];
					return;
				}
				if (e.param || e.depends) {
					var d = true;
					switch (typeof e.depends) {
					case "string":
						d = !!a(e.depends, b.form).length;
						break;
					case "function":
						d = e.depends.call(b, b);
						break;
					}
					if (d) {
						c[f] = e.param !== undefined ? e.param : true;
					} else {
						delete c[f];
					}
				}
			});
			a.each(c, function(d, e) {
				c[d] = a.isFunction(e) ? e(b) : e;
			});
			a.each([ "minlength", "maxlength", "min", "max" ],
					function() {
						if (c[this]) {
							c[this] = Number(c[this]);
						}
					});
			a.each([ "rangelength", "range" ], function() {
				if (c[this]) {
					c[this] = [ Number(c[this][0]), Number(c[this][1]) ];
				}
			});
			if (a.validator.autoCreateRanges) {
				if (c.min && c.max) {
					c.range = [ c.min, c.max ];
					delete c.min;
					delete c.max;
				}
				if (c.minlength && c.maxlength) {
					c.rangelength = [ c.minlength, c.maxlength ];
					delete c.minlength;
					delete c.maxlength;
				}
			}
			if (c.messages) {
				delete c.messages;
			}
			return c;
		},
		normalizeRule : function(c) {
			if (typeof c == "string") {
				var b = {};
				a.each(c.split(/\s/), function() {
					b[this] = true;
				});
				c = b;
			}
			return c;
		},
		addMethod : function(b, d, c) {
			a.validator.methods[b] = d;
			a.validator.messages[b] = c != undefined ? c: a.validator.messages[b];
			if (d.length < 3) {
				a.validator.addClassRules(b, a.validator.normalizeRule(b));
			}
		},
		methods : {
			required : function(c, b, e) {
				if (!this.depend(e, b)) {
					return "dependency-mismatch";
				}
				switch (b.nodeName.toLowerCase()) {
				case "select":
					var d = a(b).val();
					return d && d.length > 0;
				case "input":
					if (this.checkable(b)) {
						return this.getLength(c, b) > 0
					}
				default:
					return a.trim(c).length > 0;
				}
			},
			remote : function(f, c, g) {
				if (this.optional(c)) {
					return "dependency-mismatch";
				}
				var d = this.previousValue(c);
				if (!this.settings.messages[c.name]) {
					this.settings.messages[c.name] = {};
				}
				d.originalMessage = this.settings.messages[c.name].remote;
				this.settings.messages[c.name].remote = d.message;
				g = typeof g == "string" && {url : g} || g;
				if (d.old !== f) {
					d.old = f;
					var b = this;
					this.startRequest(c);
					var e = {};
					e[c.name] = f;
					a.ajax(a.extend(true,
									{
										url : g,
										mode : "abort",
										port : "validate" + c.name,
										dataType : "json",
										data : e,
										success : function(i) {
											b.settings.messages[c.name].remote = d.originalMessage;
											var k = i === true;
											if (k) {
												var h = b.formSubmitted;
												b.prepareElement(c);
												b.formSubmitted = h;
												b.successList.push(c);
												b.showErrors();
											} else {
												var l = {};
												var j = (d.message = i || b.defaultMessage(c,"remote"));
												l[c.name] = a.isFunction(j) ? j(f) : j;
												b.showErrors(l);
											}
											d.valid = k;
											b.stopRequest(c, k);
										}
									}, g));
					return "pending";
				} else {
					if (this.pending[c.name]) {
						return "pending";
					}
				}
				return d.valid;
			},
			minlength : function(c, b, d) {
				return this.optional(b) || this.getLength(a.trim(c), b) >= d;
			},
			maxlength : function(c, b, d) {
				return this.optional(b) || this.getLength(a.trim(c), b) <= d;
			},
			rangelength : function(d, b, e) {
				var c = this.getLength(a.trim(d), b);
				return this.optional(b) || (c >= e[0] && c <= e[1]);
			},
			min : function(c, b, d) {
				return this.optional(b) || c >= d;
			},
			max : function(c, b, d) {
				return this.optional(b) || c <= d;
			},
			range : function(c, b, d) {
				return this.optional(b) || (c >= d[0] && c <= d[1]);
			},
			email : function(c, b) {
				return this.optional(b)
						|| /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
								.test(c);
			},
			url : function(c, b) {
				return this.optional(b)
						|| /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
								.test(c);
			},
			date : function(c, b) {
				return this.optional(b) || !/Invalid|NaN/.test(new Date(c));
			},
			dateISO : function(c, b) {
				return this.optional(b) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(c);
			},
			number : function(c, b) {
				return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(c);
			},
			digits : function(c, b) {
				return this.optional(b) || /^\d+$/.test(c);
			},
			creditcard : function(f, c) {
				if (this.optional(c)) {
					return "dependency-mismatch";
				}
				if (/[^0-9-]+/.test(f)) {
					return false;
				}
				var g = 0, e = 0, b = false;
				f = f.replace(/\D/g, "");
				for ( var h = f.length - 1; h >= 0; h--) {
					var d = f.charAt(h);
					var e = parseInt(d, 10);
					if (b) {
						if ((e *= 2) > 9) {
							e -= 9;
						}
					}
					g += e;
					b = !b;
				}
				return (g % 10) == 0;
			},
			accept : function(c, b, d) {
				d = typeof d == "string" ? d.replace(/,/g, "|") : "png|jpe?g|gif";
				return this.optional(b) || c.match(new RegExp(".(" + d + ")$", "i"));
			},
			equalTo : function(c, b, e) {
				var d = a(e).unbind(".validate-equalTo").bind(
						"blur.validate-equalTo", function() {
							a(b).valid();
						});
				return c == d.val();
			}
		}
	});
	a.format = a.validator.format;
})(jQuery);
(function(c) {
	var b = c.ajax;
	var a = {};
	c.ajax = function(e) {
		e = c.extend(e, c.extend({}, c.ajaxSettings, e));
		var d = e.port;
		if (e.mode == "abort") {
			if (a[d]) {
				a[d].abort();
			}
			return (a[d] = b.apply(this, arguments));
		}
		return b.apply(this, arguments);
	}
})(jQuery);
(function(a) {
	if (!jQuery.event.special.focusin 
			&& !jQuery.event.special.focusout
			&& document.addEventListener) {
		a.each({
			focus : "focusin",
			blur : "focusout"
		}, function(c, b) {
			a.event.special[b] = {
				setup : function() {
					this.addEventListener(c, d, true);
				},
				teardown : function() {
					this.removeEventListener(c, d, true);
				},
				handler : function(f) {
					arguments[0] = a.event.fix(f);
					arguments[0].type = b;
					return a.event.handle.apply(this, arguments);
				}
			};
			function d(f) {
				f = a.event.fix(f);
				f.type = b;
				return a.event.handle.call(this, f);
			}
		})
	}
	a.extend(a.fn, {
		validateDelegate : function(d, c, b) {
			return this.bind(c, function(e) {
				var f = a(e.target);
				if (f.is(d)) {
					return b.apply(f, arguments);
				}
			})
		}
	})
})(jQuery);

// validate.min.js
(function($) {
	$.fn.validator = function(options) {
		var validator = this;
		this.settings = $.extend({
			event : "onblur",
			errorClass : "invalid",
			errorLabelContainer : null,
			requiredFlag : true,
			onfocusout : false,
			focusInvalid : false
		}, options || {});
		var opts = {
			errorClass : validator.settings.errorClass,
			errorLabelContainer : validator.settings.errorLabelContainer,
			onfocusout : validator.settings.onfocusout,
			focusInvalid : validator.settings.focusInvalid
		};
		opts.wrapper = validator.settings.errorLabelContainer ? "li" : null;
		var tipStyle = validator.settings.errorLabelContainer ? false : true;
		if (tipStyle) {
			opts.errorPlacement = function(error, element) {
				if(element.attr("type")=="radio" || element.attr("type")=="checkbox"){
					var tspan = element.next("span");
					if(tspan.html()!=null){
						element = tspan;
					}
				}
				element.tooltip("destroy");
				if (error.html() != "") {
					element.attr("errorMsg", error.html());
					element.tooltip({
						position : {offset : "10 0"},
						tooltipClass : "errorMsgTip",
						content : function() {
							return element.attr("errorMsg")
						}
					});
					element.tooltip("open");
				} else {
					element.removeAttr("errorMsg");
					element.tooltip("destroy");
				}
			};
			opts.success = function(label) {};
		}
		$(this)
			.each(function() {
					var form = $(this);
					if (!form.attr("v_valid")) {
						form.validate(opts);
						form.attr("v_valid");
					}
					$("[validator]", form)
						.each(function() {
								var element = $(this);
								var vDes = element.attr("validator");
								if (vDes && vDes != "") {
									var rules = eval(vDes);
									$.each(rules,
										function(i, n) {
											var vMethod = i;
											var rule = {};
											rule[i] = n.param;
											if (n.msg) {
												var msgs = {};
												msgs[i] = n.msg;
												rule.messages = msgs;
											}
											element.bind(validator.settings.event,
															function() {
																form.validate().element(element);
															});
											element.error(function() {});
											element.rules("add", rule);
											if (validator.settings.requiredFlag) {
												if (vMethod.toLowerCase() == "required"
														|| vMethod.toLowerCase() == "notnull"
														|| vMethod.toLowerCase() == "notempty") {
													var prevLabel = element.parents("div")
																		.children("label");
													if (!prevLabel.hasClass("v_requiredField")) {
														prevLabel.addClass("v_requiredField");
														prevLabel.prepend('<span class="requiredField">*</span>');
													}
												}
											}
										})
								}
							})
					});
		$(this)
			.each(function() {
					var form = $(this);
					if (!form.attr("v_valid")) {
						form.validate(opts);
						form.attr("v_valid");
					}
					var jsrElement = form.children(
							"[name='jsr303JSValidator']", form);
					if (jsrElement != null) {
						var jsr303JSValidator = eval(jsrElement.attr("value"));
						if (typeof (jsr303JSValidator) != "undefined") {
							var rules = jsr303JSValidator.rules;
							for ( var i = 0; i < rules.length; i++) {
								var rule = rules[i];
								var element = form.find("[name='" + rule.field + "']");
								if (element.length > 0) {
									var ruleMethod = rule.validationFunction;
									var message = rule.getErrorMessage();
									var ruleValid = {};
									ruleValid[ruleMethod] = rule.params;
									if (message) {
										var messages = {};
										messages[ruleMethod] = message;
										ruleValid.messages = messages;
									}
									element.bind(validator.settings.event,
												function() {
													form.validate().element(element);
												});
									element.error(function() {});
									element.rules("add", ruleValid);
									if (validator.settings.requiredFlag) {
										if (ruleMethod.toLowerCase() == "required"
												|| ruleMethod.toLowerCase() == "notnull"
												|| ruleMethod.toLowerCase() == "notempty") {
											var prevLabel = element.parents("div").children("label");
											if (!prevLabel.hasClass("v_requiredField")) {
												prevLabel.addClass("v_requiredField");
												prevLabel.prepend('<span class="requiredField">*</span>');
											}
										}
									}
								}
							}
						}
					}
				});
		return this;
	}
})(jQuery);
(function(a) {
	a.fn.resetValidator = function(b) {
		a(this).each(function() {
			var c = a(this);
			a(".invalid", c).each(function() {
				var d = a(this).attr("aria-describedby");
				a("#" + d).remove();
				a(this).removeAttr("aria-describedby");
				a(this).removeClass("invalid");
			})
		})
	}
})(jQuery);

//validate.method.min.js
var jsr303JSValidatorRule=new JSR303JSValidator.Rule('','','');
/**
* JSR303 Size
*/
jQuery.validator.addMethod("Size", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Size(value,params);       
}, ValidateMessage.Size);
/**
* JSR303 AssertFalse
*/
jQuery.validator.addMethod("AssertFalse", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.AssertFalse(value,params);       
}, ValidateMessage.AssertFalse);
/**
* JSR303 AssertTrue
*/
jQuery.validator.addMethod("AssertTrue", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.AssertTrue(value,params);       
}, ValidateMessage.AssertTrue);
/**
* JSR303 DecimalMax
*/
jQuery.validator.addMethod("DecimalMax", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.DecimalMax(value,params);       
}, ValidateMessage.DecimalMax);
/**
* JSR303 DecimalMin
*/
jQuery.validator.addMethod("DecimalMin", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.DecimalMin(value,params);       
}, ValidateMessage.DecimalMain);
/**
* JSR303 Digits
*/
jQuery.validator.addMethod("Digits", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Digits(value,params);       
}, ValidateMessage.Digits);
/**
* JSR303 Max
*/
jQuery.validator.addMethod("Max", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Max(value,params);       
}, ValidateMessage.Max);
/**
* JSR303 Min
*/
jQuery.validator.addMethod("Min", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Min(value,params);       
}, ValidateMessage.Min);
/**
* JSR303 NotNull
*/
jQuery.validator.addMethod("NotNull", function(value, element,params) {
	if($(element).is(":hidden")||$(element).is(':disabled')||$(element).attr('readonly')){
		return true;
	}
	//return this.optional(element)||jsr303JSValidatorRule.NotNull(value,params);
	return this.optional(element)||$(element).is(":hidden")||jsr303JSValidatorRule.NotNull(value,params);       
}, ValidateMessage.NotNull);
/**
* JSR303 Null
*/
jQuery.validator.addMethod("Null", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Null(value,params);       
}, ValidateMessage.Null);
/**
* JSR303 Pattern
*/
jQuery.validator.addMethod("Pattern", function(value, element,params) {
    if($(element).is(":hidden")||$(element).is(':disabled')||$(element).attr('readonly')){
        return true;
    }
	if(params.regexp !=null && params.regexp.indexOf("^") != 0){
		params.regexp= "^" + params.regexp + "$";
	}  
	return this.optional(element)||jsr303JSValidatorRule.Pattern(value,params);       
}, ValidateMessage.Pattern);
/**
* JSR303 Future
*/
jQuery.validator.addMethod("Future", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Future(value,params);       
}, ValidateMessage.Future);
/**
* JSR303 Past
*/
jQuery.validator.addMethod("Past", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Past(value,params);       
}, ValidateMessage.Past);
/**
* JSR303 Email
*/
jQuery.validator.addMethod("Email", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Email(value,params);       
}, ValidateMessage.Email);
/**
* JSR303 Length
*/
jQuery.validator.addMethod("Length", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Length(value,params);       
}, ValidateMessage.Length);
/**
* JSR303 NotEmpty
*/
jQuery.validator.addMethod("NotEmpty", function(value, element,params) {
	if($(element).is(":hidden")||$(element).is(':disabled')||$(element).attr('readonly')){
		return true;
	}
	return this.optional(element)||value==null?false:value.length>0;//jsr303JSValidatorRule.NotEmpty((typeof(value)!='undefined'?value:''),params);       
}, ValidateMessage.NotEmpty);
/**
* JSR303 Range
*/
jQuery.validator.addMethod("Range", function(value, element,params) {
	return this.optional(element)||jsr303JSValidatorRule.Range(value,params);       
}, ValidateMessage.Range);
//给代办人添加验证规则
jQuery.validator.addMethod('holderNamecheck',function(value,element,birth) {
	if($(birth).val()=='')
		return true;
	var p = getAges($(birth).val());
	if(p<18){
		return $('#holderName').val()!='';
	}else{
		return true;
	}
}, ValidateMessage.holderNamecheck);
//给联系电话添加验证规则
jQuery.validator.addMethod('holderTelephoneNocheck',function(value,element,birth) {
	if($(birth).val()=='')
		return true;
	var p = getAges($(birth).val());
	if(p<18){
		return $('#holderTelephoneNo').val()!='';
	}else{
		return true;
	}
}, ValidateMessage.holderTelephoneNocheck);
//给代办理由添加验证规则
jQuery.validator.addMethod('representativeReasoncheck',function(value,element,birth) {
	if($(birth).val()=='')
		return true;
	var p = getAges($(birth).val());
	if(p<18){
		return $('#stakeholder\\.representativeReason').val()!='';
	}else{
		return true;
	}
}, ValidateMessage.representativeReasoncheck);

//给与申请人关系添加验证规则
jQuery.validator.addMethod('representativeRelationcheck',function(value,element,birth) {
	if($(birth).val()=='')
		return true;
	var p = getAges($(birth).val());
	if(p<18){
		return $('#stakeholder\\.representativeRelation').val()!='';
	}else{
		return true;
	}
}, ValidateMessage.representativeRelationcheck);
//给地址添加验证规则
jQuery.validator.addMethod('holderAddresscheck',function(value,element,birth) {
	if($(birth).val()=='')
		return true;
	var p = getAges($(birth).val());
	if(p<18){
		return $('#holderAddress').val()!='';
	}else{
		return true;
	}
}, ValidateMessage.holderAddresscheck);
//给代办权限添加验证规则
jQuery.validator.addMethod('representativePrivilegecheck',function(value,element,birth) {
	if($(birth).val()=='')
		return true;
	var p = getAges($(birth).val());
	if(p<18){
		return $('#stakeholder\\.representativePrivilege').val()!='';
	}else{
		return true;
	}
}, ValidateMessage.representativePrivilegecheck);

//给邮编添加验证规则
jQuery.validator.addMethod('holderpostcodecheck',function(value,element,birth) {
	if($(birth).val()=='')
		return true;
	var p = getAges($(birth).val());
	if(p<18){
		return $('#holderpostcode').val()!='';
	}else{
		return true;
	}
}, ValidateMessage.holderpostcodecheck);

/**
 * 手机号码验证
 */
jQuery.validator.addMethod("mobile", function(value, element) {
	var length = value.length;
	var mobile = /^1+\d{10}$/;   
	return this.optional(element) || (length == 11 && mobile.test(value));
}, ValidateMessage.mobile);
/**
 * 某日期不能小于当前日期 日期格式为yyyy-MM-dd
 */
jQuery.validator.addMethod('earlyThanCurrent',function(value, element) {
	var ary = value.split('-');
	var date1_year=ary[0];
	var date1_mon=ary[1];
	var date1_day=ary[2];
	if(new Date()>=new Date(parseInt(date1_year,10),parseInt(date1_mon,10)-1,parseInt(date1_day,10)))
		return false;
	else
		return true;
}, ValidateMessage.earlyThanCurrent);

/**
 * 邮编验证
 */
jQuery.validator.addMethod('postcode',function(value, element) {
	var nn = /^\d{6}$/;
	return this.optional(element)||nn.test(value);       
}, ValidateMessage.postcode);
/**
 * 验证农业银行卡号
 */
$.validator.addMethod("bankAccountNoCheck", function(value, element) { 
	var bankCode = $.trim($("input[name='bankCode']").val());
	var bankAccountNo = $.trim(value);
	if ("003" == bankCode && bankCode!= "") {
		var regx = /^[0-9]*$/;
	    if (regx.test(bankAccountNo) && bankAccountNo.length == 16) {
	       return false;
	    }
	}
	return true;
}, ValidateMessage.bankAccountNoCheck);  

/**
 * 验证交行银行卡号
 */
$.validator.addMethod("bankAccountNoCheckForCOMM", function(value, element) { 
	var bankCode = $.trim($("input[name='bankCode']").val());
	var bankAccountNo = $.trim(value);
	if ("006" == bankCode && bankCode!= "") {
		var regx = /^[0-9]*$/;
	    if (regx.test(bankAccountNo) && "" != bankAccountNo && bankAccountNo.length < 8) {
	       return false;
	    }
	}
	return true;
}, ValidateMessage.bankAccountNoCheckForCOMM);  

//验证市是否选择
$.validator.addMethod("accountCityCodeCheck", function(value, element,params) { 
	var isMunicipalities = $.trim($("[name='"+params+"']").find("option:selected").attr("name"));
	if(isMunicipalities != '1' && value==""){
		return false;
	}
	return true;
}, ValidateMessage.accountCityCodeCheck); 
//验证密码重复
jQuery.validator.addMethod('checkPassWordRepeat',function(value,element) {
	if(value.length<=6 || value.length>=8){
		return true;
	}
	var t = value.charAt(0);
	for(var i=1;i<value.length;i++){
		if(t!=value.charAt(i))
			return true;
	}
	return false;; 
}, ValidateMessage.checkPassWordRepeat);
//验证密码不一致
jQuery.validator.addMethod('checkPassWordEq',function(value,element,params) {
	if(value==$("[name='"+params+"']").val()){
		return true;
	}
	return false;; 
}, ValidateMessage.checkPassWordEq);
//验证份额
jQuery.validator.addMethod('checkVolume',function(value,element,params) {
	var currentVolume = $.trim($("#"+params).val());
	if("" != currentVolume && parseFloat(value)>parseFloat(currentVolume)){
		return false;
	}
	return true;; 
}, ValidateMessage.checkVolume);
 
//验证支付方式
jQuery.validator.addMethod('checkCapitalChannel',function(value,element,params) {
	$("[name='"+params+"']").each(function(){
		//alert(this);
	});
	return false;; 
}, ValidateMessage.checkCapitalChannel);

/**
 * 预约日期不能小于或等于T日，且最长设置期限为一个月（30个自然日） 日期格式为yyyy-MM-dd
 */
jQuery.validator.addMethod('tradeDateCheck',function(value, element) {
	if($.trim(value) != "" && /^([1-3][0-9]{3}-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/.test(value)){
		var ary = value.split('-');
		var date1_year=ary[0];
		var date1_mon=ary[1];
		var date1_day=ary[2];
		var tradeDate = new Date(parseInt(date1_year,10),parseInt(date1_mon,10) - 1,parseInt(date1_day,10));
		var currentStr = $(element).attr("currentDate");
		var afterStr = $(element).attr("afterDate"); 
		var currentDate,afterDate;
		if("" == currentStr || "" == afterStr){
			var clientCurDate = new Date();
			clientCurDate.setDate(clientCurDate.getDate() + 1);
			currentDate = clientCurDate;
			var clientAftDate = new Date();
			clientAftDate.setDate(clientAftDate.getDate() + 30);
			afterDate = clientAftDate;
		}else{
			ary = currentStr.split('-');
			date1_year=ary[0];
			date1_mon=ary[1];
			date1_day=ary[2];
			currentDate = new Date(parseInt(date1_year,10),parseInt(date1_mon,10) - 1,parseInt(date1_day,10));
			ary = afterStr.split('-');
			date1_year=ary[0];
			date1_mon=ary[1];
			date1_day=ary[2];
			afterDate = new Date(parseInt(date1_year,10),parseInt(date1_mon,10) - 1,parseInt(date1_day,10));
		}
		if(currentDate > tradeDate){
			return false;
		}
		if(afterDate < tradeDate){
			return false;
		}
	}
	return true;
},ValidateMessage.tradeDateCheck);

/**
 * 起始日期和结束日期的格式验证
 */
jQuery.validator.addMethod('wayDateCheck',function(value, element) {
	if($.trim(value) != "" 
		&& !/([_]+)/.test(value) 
		&& !/^([1-3][0-9]{3}-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/.test(value)){
		return false;
	}
	return true;
}, ValidateMessage.wayDateCheck);

/**
 * 退款金额超出验证
 */
jQuery.validator.addMethod('checkRefundment',function(value, element,param) {
	if(parseFloat(value) > parseFloat($(param).val())){
		return false;
	}
	return true;
}, ValidateMessage.checkRefundment);
/**
 * 退款金额超出验证
 */
jQuery.validator.addMethod('checkRefundmentVolumn',function(value, element,param) {
	if(parseFloat(value)<20){
		return false;
	}
	return true;
}, ValidateMessage.checkRefundmentVolumn);

/**
 * 广发卡验证
 */
jQuery.validator.addMethod('checkGdbCardNo',function(value, element,param) {
	if(value.length<6 || '622568'!=value.substring(0,6)){
		return false;
	}
	return true;
}, ValidateMessage.checkGdbCardNo);

jQuery.validator.addMethod('Dictionary',function(value, element, param) {
	return true;
}, ValidateMessage.Dictionary);

/**
 * 身份证验证
 */
jQuery.validator.addMethod('idCardCheck',function(value, element,params) {
	if ($("#bankAccountCertificateType").val()=='0' && !(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value)))  
    {
        return false;
   } 
	return true;
}, ValidateMessage.idCardCheck);

jQuery.validator.addMethod('birthDateModify',function(value, element,params) {
	var birth = $("input[name=openTradeAccountDto.birthday]").val();
	if(birth==""){
		return true;
	}
	try{
		if(birth.todate()>=new Date()){
			return false;
		}
	}catch(e){
		return false;
	}
	return true;
}, ValidateMessage.birthDateModify);
