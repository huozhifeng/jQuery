(function (E, B) {
    function ka(a, b, d) {
        if (d === B && a.nodeType === 1) {
            d = a.getAttribute("data-" + b);
            if (typeof d === "string") {
                try {
                    d = d === "true" ? true : d === "false" ? false : d === "null" ? null : !c.isNaN(d) ? parseFloat(d) : Ja.test(d) ? c.parseJSON(d) : d
                } catch (e) {
                }
                c.data(a, b, d)
            } else d = B
        }
        return d
    }

    function U() {
        return false
    }

    function ca() {
        return true
    }

    function la(a, b, d) {
        d[0].type = a;
        return c.event.handle.apply(b, d)
    }

    function Ka(a) {
        var b, d, e, f, h, l, k, o, x, r, A, C = [];
        f = [];
        h = c.data(this, this.nodeType ? "events" : "__events__");
        if (typeof h === "function")h =
            h.events;
        if (!(a.liveFired === this || !h || !h.live || a.button && a.type === "click")) {
            if (a.namespace)A = RegExp("(^|\\.)" + a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
            a.liveFired = this;
            var J = h.live.slice(0);
            for (k = 0; k < J.length; k++) {
                h = J[k];
                h.origType.replace(X, "") === a.type ? f.push(h.selector) : J.splice(k--, 1)
            }
            f = c(a.target).closest(f, a.currentTarget);
            o = 0;
            for (x = f.length; o < x; o++) {
                r = f[o];
                for (k = 0; k < J.length; k++) {
                    h = J[k];
                    if (r.selector === h.selector && (!A || A.test(h.namespace))) {
                        l = r.elem;
                        e = null;
                        if (h.preType === "mouseenter" ||
                            h.preType === "mouseleave") {
                            a.type = h.preType;
                            e = c(a.relatedTarget).closest(h.selector)[0]
                        }
                        if (!e || e !== l)C.push({elem: l, handleObj: h, level: r.level})
                    }
                }
            }
            o = 0;
            for (x = C.length; o < x; o++) {
                f = C[o];
                if (d && f.level > d)break;
                a.currentTarget = f.elem;
                a.data = f.handleObj.data;
                a.handleObj = f.handleObj;
                A = f.handleObj.origHandler.apply(f.elem, arguments);
                if (A === false || a.isPropagationStopped()) {
                    d = f.level;
                    if (A === false)b = false;
                    if (a.isImmediatePropagationStopped())break
                }
            }
            return b
        }
    }

    function Y(a, b) {
        return (a && a !== "*" ? a + "." : "") + b.replace(La,
                "`").replace(Ma, "&")
    }

    function ma(a, b, d) {
        if (c.isFunction(b))return c.grep(a, function (f, h) {
            return !!b.call(f, h, f) === d
        }); else if (b.nodeType)return c.grep(a, function (f) {
            return f === b === d
        }); else if (typeof b === "string") {
            var e = c.grep(a, function (f) {
                return f.nodeType === 1
            });
            if (Na.test(b))return c.filter(b, e, !d); else b = c.filter(b, e)
        }
        return c.grep(a, function (f) {
            return c.inArray(f, b) >= 0 === d
        })
    }

    function na(a, b) {
        var d = 0;
        b.each(function () {
            if (this.nodeName === (a[d] && a[d].nodeName)) {
                var e = c.data(a[d++]), f = c.data(this,
                    e);
                if (e = e && e.events) {
                    delete f.handle;
                    f.events = {};
                    for (var h in e)for (var l in e[h])c.event.add(this, h, e[h][l], e[h][l].data)
                }
            }
        })
    }

    function Oa(a, b) {
        b.src ? c.ajax({
            url: b.src,
            async: false,
            dataType: "script"
        }) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
        b.parentNode && b.parentNode.removeChild(b)
    }

    function oa(a, b, d) {
        var e = b === "width" ? a.offsetWidth : a.offsetHeight;
        if (d === "border")return e;
        c.each(b === "width" ? Pa : Qa, function () {
            d || (e -= parseFloat(c.css(a, "padding" + this)) || 0);
            if (d === "margin")e += parseFloat(c.css(a,
                    "margin" + this)) || 0; else e -= parseFloat(c.css(a, "border" + this + "Width")) || 0
        });
        return e
    }

    function da(a, b, d, e) {
        if (c.isArray(b) && b.length)c.each(b, function (f, h) {
            d || Ra.test(a) ? e(a, h) : da(a + "[" + (typeof h === "object" || c.isArray(h) ? f : "") + "]", h, d, e)
        }); else if (!d && b != null && typeof b === "object")c.isEmptyObject(b) ? e(a, "") : c.each(b, function (f, h) {
            da(a + "[" + f + "]", h, d, e)
        }); else e(a, b)
    }

    function S(a, b) {
        var d = {};
        c.each(pa.concat.apply([], pa.slice(0, b)), function () {
            d[this] = a
        });
        return d
    }

    function qa(a) {
        if (!ea[a]) {
            var b = c("<" +
                a + ">").appendTo("body"), d = b.css("display");
            b.remove();
            if (d === "none" || d === "")d = "block";
            ea[a] = d
        }
        return ea[a]
    }

    function fa(a) {
        return c.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
    }

    var t = E.document, c = function () {
        function a() {
            if (!b.isReady) {
                try {
                    t.documentElement.doScroll("left")
                } catch (j) {
                    setTimeout(a, 1);
                    return
                }
                b.ready()
            }
        }

        var b = function (j, s) {
                return new b.fn.init(j, s)
            }, d = E.jQuery, e = E.$, f, h = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/, l = /\S/, k = /^\s+/, o = /\s+$/, x = /\W/, r = /\d/, A = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
            C = /^[\],:{}\s]*$/, J = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, w = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, I = /(?:^|:|,)(?:\s*\[)+/g, L = /(webkit)[ \/]([\w.]+)/, g = /(opera)(?:.*version)?[ \/]([\w.]+)/, i = /(msie) ([\w.]+)/, n = /(mozilla)(?:.*? rv:([\w.]+))?/, m = navigator.userAgent, p = false, q = [], u, y = Object.prototype.toString, F = Object.prototype.hasOwnProperty, M = Array.prototype.push, N = Array.prototype.slice, O = String.prototype.trim, D = Array.prototype.indexOf, R = {};
        b.fn = b.prototype = {
            init: function (j,
                            s) {
                var v, z, H;
                if (!j)return this;
                if (j.nodeType) {
                    this.context = this[0] = j;
                    this.length = 1;
                    return this
                }
                if (j === "body" && !s && t.body) {
                    this.context = t;
                    this[0] = t.body;
                    this.selector = "body";
                    this.length = 1;
                    return this
                }
                if (typeof j === "string")if ((v = h.exec(j)) && (v[1] || !s))if (v[1]) {
                    H = s ? s.ownerDocument || s : t;
                    if (z = A.exec(j))if (b.isPlainObject(s)) {
                        j = [t.createElement(z[1])];
                        b.fn.attr.call(j, s, true)
                    } else j = [H.createElement(z[1])]; else {
                        z = b.buildFragment([v[1]], [H]);
                        j = (z.cacheable ? z.fragment.cloneNode(true) : z.fragment).childNodes
                    }
                    return b.merge(this,
                        j)
                } else {
                    if ((z = t.getElementById(v[2])) && z.parentNode) {
                        if (z.id !== v[2])return f.find(j);
                        this.length = 1;
                        this[0] = z
                    }
                    this.context = t;
                    this.selector = j;
                    return this
                } else if (!s && !x.test(j)) {
                    this.selector = j;
                    this.context = t;
                    j = t.getElementsByTagName(j);
                    return b.merge(this, j)
                } else return !s || s.jquery ? (s || f).find(j) : b(s).find(j); else if (b.isFunction(j))return f.ready(j);
                if (j.selector !== B) {
                    this.selector = j.selector;
                    this.context = j.context
                }
                return b.makeArray(j, this)
            }, selector: "", jquery: "1.4.4", length: 0, size: function () {
                return this.length
            },
            toArray: function () {
                return N.call(this, 0)
            }, get: function (j) {
                return j == null ? this.toArray() : j < 0 ? this.slice(j)[0] : this[j]
            }, pushStack: function (j, s, v) {
                var z = b();
                b.isArray(j) ? M.apply(z, j) : b.merge(z, j);
                z.prevObject = this;
                z.context = this.context;
                if (s === "find")z.selector = this.selector + (this.selector ? " " : "") + v; else if (s)z.selector = this.selector + "." + s + "(" + v + ")";
                return z
            }, each: function (j, s) {
                return b.each(this, j, s)
            }, ready: function (j) {
                b.bindReady();
                if (b.isReady)j.call(t, b); else q && q.push(j);
                return this
            }, eq: function (j) {
                return j === -1 ? this.slice(j) : this.slice(j, +j + 1)
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, slice: function () {
                return this.pushStack(N.apply(this, arguments), "slice", N.call(arguments).join(","))
            }, map: function (j) {
                return this.pushStack(b.map(this, function (s, v) {
                    return j.call(s, v, s)
                }))
            }, end: function () {
                return this.prevObject || b(null)
            }, push: M, sort: [].sort, splice: [].splice
        };
        b.fn.init.prototype = b.fn;
        b.extend = b.fn.extend = function () {
            var j, s, v, z, H, G = arguments[0] || {}, K = 1, Q = arguments.length, ga = false;
            if (typeof G === "boolean") {
                ga = G;
                G = arguments[1] || {};
                K = 2
            }
            if (typeof G !== "object" && !b.isFunction(G))G = {};
            if (Q === K) {
                G = this;
                --K
            }
            for (; K < Q; K++)if ((j = arguments[K]) != null)for (s in j) {
                v = G[s];
                z = j[s];
                if (G !== z)if (ga && z && (b.isPlainObject(z) || (H = b.isArray(z)))) {
                    if (H) {
                        H = false;
                        v = v && b.isArray(v) ? v : []
                    } else v = v && b.isPlainObject(v) ? v : {};
                    G[s] = b.extend(ga, v, z)
                } else if (z !== B)G[s] = z
            }
            return G
        };
        b.extend({
            noConflict: function (j) {
                E.$ = e;
                if (j)E.jQuery = d;
                return b
                 },
            isReady: false,
            readyWait: 1,
            ready: function (j) {
                j === true && b.readyWait--;
                if (!b.readyWait || j !== true && !b.isReady) {
                    if (!t.body)return setTimeout(b.ready, 1);
                    b.isReady = true;
                    if (!(j !== true && --b.readyWait > 0))if (q) {
                        var s = 0, v = q;
                        for (q = null; j = v[s++];)j.call(t, b);
                        b.fn.trigger && b(t).trigger("ready").unbind("ready")
                    }
                }
            },
            bindReady: function () {
                if (!p) {
                    p = true;
                    if (t.readyState === "complete")return setTimeout(b.ready, 1);
                    if (t.addEventListener) {
                        t.addEventListener("DOMContentLoaded", u, false);
                        E.addEventListener("load", b.ready, false)
                    } else if (t.attachEvent) {
                        t.attachEvent("onreadystatechange", u);
                        E.attachEvent("onload",
                            b.ready);
                        var j = false;
                        try {
                            j = E.frameElement == null
                        } catch (s) {
                        }
                        t.documentElement.doScroll && j && a()
                    }
                }
            },
            isFunction: function (j) {
                return b.type(j) === "function"
            },
            isArray: Array.isArray || function (j) {
                return b.type(j) === "array"
            },
            isWindow: function (j) {
                return j && typeof j === "object" && "setInterval" in j
            },
            isNaN: function (j) {
                return j == null || !r.test(j) || isNaN(j)
            },
            type: function (j) {
                return j == null ? String(j) : R[y.call(j)] || "object"
            },
            isPlainObject: function (j) {
                if (!j || b.type(j) !== "object" || j.nodeType || b.isWindow(j))return false;
                if (j.constructor && !F.call(j, "constructor") && !F.call(j.constructor.prototype, "isPrototypeOf"))return false;
                for (var s in j);
                return s === B || F.call(j, s)
            }, isEmptyObject: function (j) {
                for (var s in j)return false;
                return true
            }, error: function (j) {
                throw j;
            }, parseJSON: function (j) {
                if (typeof j !== "string" || !j)return null;
                j = b.trim(j);
                if (C.test(j.replace(J, "@").replace(w, "]").replace(I, "")))return E.JSON && E.JSON.parse ? E.JSON.parse(j) : (new Function("return " + j))(); else b.error("Invalid JSON: " + j)
            }, noop: function () {
            }, globalEval: function (j) {
                if (j &&
                    l.test(j)) {
                    var s = t.getElementsByTagName("head")[0] || t.documentElement, v = t.createElement("script");
                    v.type = "text/javascript";
                    if (b.support.scriptEval)v.appendChild(t.createTextNode(j)); else v.text = j;
                    s.insertBefore(v, s.firstChild);
                    s.removeChild(v)
                }
            }, nodeName: function (j, s) {
                return j.nodeName && j.nodeName.toUpperCase() === s.toUpperCase()
            }, each: function (j, s, v) {
                var z, H = 0, G = j.length, K = G === B || b.isFunction(j);
                if (v)if (K)for (z in j) {
                    if (s.apply(j[z], v) === false)break
                } else for (; H < G;) {
                    if (s.apply(j[H++], v) === false)break
                } else if (K)for (z in j) {
                    if (s.call(j[z],
                            z, j[z]) === false)break
                } else for (v = j[0]; H < G && s.call(v, H, v) !== false; v = j[++H]);
                return j
            }, trim: O ? function (j) {
                return j == null ? "" : O.call(j)
            } : function (j) {
                return j == null ? "" : j.toString().replace(k, "").replace(o, "")
            }, makeArray: function (j, s) {
                var v = s || [];
                if (j != null) {
                    var z = b.type(j);
                    j.length == null || z === "string" || z === "function" || z === "regexp" || b.isWindow(j) ? M.call(v, j) : b.merge(v, j)
                }
                return v
            }, inArray: function (j, s) {
                if (s.indexOf)return s.indexOf(j);
                for (var v = 0, z = s.length; v < z; v++)if (s[v] === j)return v;
                return -1
            }, merge: function (j,
                                s) {
                var v = j.length, z = 0;
                if (typeof s.length === "number")for (var H = s.length; z < H; z++)j[v++] = s[z]; else for (; s[z] !== B;)j[v++] = s[z++];
                j.length = v;
                return j
            }, grep: function (j, s, v) {
                var z = [], H;
                v = !!v;
                for (var G = 0, K = j.length; G < K; G++) {
                    H = !!s(j[G], G);
                    v !== H && z.push(j[G])
                }
                return z
            }, map: function (j, s, v) {
                for (var z = [], H, G = 0, K = j.length; G < K; G++) {
                    H = s(j[G], G, v);
                    if (H != null)z[z.length] = H
                }
                return z.concat.apply([], z)
            }, guid: 1, proxy: function (j, s, v) {
                if (arguments.length === 2)if (typeof s === "string") {
                    v = j;
                    j = v[s];
                    s = B
                } else if (s && !b.isFunction(s)) {
                    v =
                        s;
                    s = B
                }
                if (!s && j)s = function () {
                    return j.apply(v || this, arguments)
                };
                if (j)s.guid = j.guid = j.guid || s.guid || b.guid++;
                return s
            }, access: function (j, s, v, z, H, G) {
                var K = j.length;
                if (typeof s === "object") {
                    for (var Q in s)b.access(j, Q, s[Q], z, H, v);
                    return j
                }
                if (v !== B) {
                    z = !G && z && b.isFunction(v);
                    for (Q = 0; Q < K; Q++)H(j[Q], s, z ? v.call(j[Q], Q, H(j[Q], s)) : v, G);
                    return j
                }
                return K ? H(j[0], s) : B
            }, now: function () {
                return (new Date).getTime()
            },
            uaMatch: function (j) {
                j = j.toLowerCase();
                j = L.exec(j) || g.exec(j) || i.exec(j) || j.indexOf("compatible") < 0 && n.exec(j) ||
                    [];
                return {browser: j[1] || "", version: j[2] || "0"}
            }, browser: {}
        });
        b.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (j, s) {
            R["[object " + s + "]"] = s.toLowerCase()
        });
        m = b.uaMatch(m);
        if (m.browser) {
            b.browser[m.browser] = true;
            b.browser.version = m.version
        }
        if (b.browser.webkit)b.browser.safari = true;
        if (D)b.inArray = function (j, s) {
            return D.call(s, j)
        };
        if (!/\s/.test("\u00a0")) {
            k = /^[\s\xA0]+/;
            o = /[\s\xA0]+$/
        }
        f = b(t);
        if (t.addEventListener)u = function () {
            t.removeEventListener("DOMContentLoaded", u,
                false);
            b.ready()
        }; else if (t.attachEvent)u = function () {
            if (t.readyState === "complete") {
                t.detachEvent("onreadystatechange", u);
                b.ready()
            }
        };
        return E.jQuery = E.$ = b
    }();
    (function () {
        c.support = {};
        var a = t.documentElement, b = t.createElement("script"), d = t.createElement("div"), e = "script" + c.now();
        d.style.display = "none";
        d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var f = d.getElementsByTagName("*"), h = d.getElementsByTagName("a")[0], l = t.createElement("select"),
            k = l.appendChild(t.createElement("option"));
        if (!(!f || !f.length || !h)) {
            c.support = {
                leadingWhitespace: d.firstChild.nodeType === 3,
                tbody: !d.getElementsByTagName("tbody").length,
                htmlSerialize: !!d.getElementsByTagName("link").length,
                style: /red/.test(h.getAttribute("style")),
                hrefNormalized: h.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(h.style.opacity),
                cssFloat: !!h.style.cssFloat,
                checkOn: d.getElementsByTagName("input")[0].value === "on",
                optSelected: k.selected,
                deleteExpando: true,
                optDisabled: false,
                checkClone: false,
                scriptEval: false,
                noCloneEvent: true,
                boxModel: null,
                inlineBlockNeedsLayout: false,
                shrinkWrapBlocks: false,
                reliableHiddenOffsets: true
            };
            l.disabled = true;
            c.support.optDisabled = !k.disabled;
            b.type = "text/javascript";
            try {
                b.appendChild(t.createTextNode("window." + e + "=1;"))
            } catch (o) {
            }
            a.insertBefore(b, a.firstChild);
            if (E[e]) {
                c.support.scriptEval = true;
                delete E[e]
            }
            try {
                delete b.test
            } catch (x) {
                c.support.deleteExpando = false
            }
            a.removeChild(b);
            if (d.attachEvent && d.fireEvent) {
                d.attachEvent("onclick", function r() {
                    c.support.noCloneEvent =
                        false;
                    d.detachEvent("onclick", r)
                });
                d.cloneNode(true).fireEvent("onclick")
            }
            d = t.createElement("div");
            d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            a = t.createDocumentFragment();
            a.appendChild(d.firstChild);
            c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
            c(function () {
                var r = t.createElement("div");
                r.style.width = r.style.paddingLeft = "1px";
                t.body.appendChild(r);
                c.boxModel = c.support.boxModel = r.offsetWidth === 2;
                if ("zoom" in r.style) {
                    r.style.display = "inline";
                    r.style.zoom =
                        1;
                    c.support.inlineBlockNeedsLayout = r.offsetWidth === 2;
                    r.style.display = "";
                    r.innerHTML = "<div style='width:4px;'></div>";
                    c.support.shrinkWrapBlocks = r.offsetWidth !== 2
                }
                r.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
                var A = r.getElementsByTagName("td");
                c.support.reliableHiddenOffsets = A[0].offsetHeight === 0;
                A[0].style.display = "";
                A[1].style.display = "none";
                c.support.reliableHiddenOffsets = c.support.reliableHiddenOffsets && A[0].offsetHeight === 0;
                r.innerHTML = "";
                t.body.removeChild(r).style.display =
                    "none"
            });
            a = function (r) {
                var A = t.createElement("div");
                r = "on" + r;
                var C = r in A;
                if (!C) {
                    A.setAttribute(r, "return;");
                    C = typeof A[r] === "function"
                }
                return C
            };
            c.support.submitBubbles = a("submit");
            c.support.changeBubbles = a("change");
            a = b = d = f = h = null
        }
    })();
    var ra = {}, Ja = /^(?:\{.*\}|\[.*\])$/;
    c.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + c.now(),
        noData: {embed: true, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: true},
        data: function (a, b, d) {
            if (c.acceptData(a)) {
                a = a == E ? ra : a;
                var e = a.nodeType, f = e ? a[c.expando] : null, h =
                    c.cache;
                if (!(e && !f && typeof b === "string" && d === B)) {
                    if (e)f || (a[c.expando] = f = ++c.uuid); else h = a;
                    if (typeof b === "object")if (e)h[f] = c.extend(h[f], b); else c.extend(h, b); else if (e && !h[f])h[f] = {};
                    a = e ? h[f] : h;
                    if (d !== B)a[b] = d;
                    return typeof b === "string" ? a[b] : a
                }
            }
        },
        removeData: function (a, b) {
            if (c.acceptData(a)) {
                a = a == E ? ra : a;
                var d = a.nodeType, e = d ? a[c.expando] : a, f = c.cache, h = d ? f[e] : e;
                if (b) {
                    if (h) {
                        delete h[b];
                        d && c.isEmptyObject(h) && c.removeData(a)
                    }
                } else if (d && c.support.deleteExpando)delete a[c.expando]; else if (a.removeAttribute)a.removeAttribute(c.expando);
                else if (d)delete f[e]; else for (var l in a)delete a[l]
            }
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = c.noData[a.nodeName.toLowerCase()];
                if (b)return !(b === true || a.getAttribute("classid") !== b)
            }
            return true
        }
    });
    c.fn.extend({
        data: function (a, b) {
            var d = null;
            if (typeof a === "undefined") {
                if (this.length) {
                    var e = this[0].attributes, f;
                    d = c.data(this[0]);
                    for (var h = 0, l = e.length; h < l; h++) {
                        f = e[h].name;
                        if (f.indexOf("data-") === 0) {
                            f = f.substr(5);
                            ka(this[0], f, d[f])
                        }
                    }
                }
                return d
            } else if (typeof a === "object")return this.each(function () {
                c.data(this,
                    a)
            });
            var k = a.split(".");
            k[1] = k[1] ? "." + k[1] : "";
            if (b === B) {
                d = this.triggerHandler("getData" + k[1] + "!", [k[0]]);
                if (d === B && this.length) {
                    d = c.data(this[0], a);
                    d = ka(this[0], a, d)
                }
                return d === B && k[1] ? this.data(k[0]) : d
            } else return this.each(function () {
                var o = c(this), x = [k[0], b];
                o.triggerHandler("setData" + k[1] + "!", x);
                c.data(this, a, b);
                o.triggerHandler("changeData" + k[1] + "!", x)
            })
        }, removeData: function (a) {
            return this.each(function () {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function (a, b, d) {
            if (a) {
                b = (b || "fx") + "queue";
                var e =
                    c.data(a, b);
                if (!d)return e || [];
                if (!e || c.isArray(d))e = c.data(a, b, c.makeArray(d)); else e.push(d);
                return e
            }
        }, dequeue: function (a, b) {
            b = b || "fx";
            var d = c.queue(a, b), e = d.shift();
            if (e === "inprogress")e = d.shift();
            if (e) {
                b === "fx" && d.unshift("inprogress");
                e.call(a, function () {
                    c.dequeue(a, b)
                })
            }
        }
    });
    c.fn.extend({
        queue: function (a, b) {
            if (typeof a !== "string") {
                b = a;
                a = "fx"
            }
            if (b === B)return c.queue(this[0], a);
            return this.each(function () {
                var d = c.queue(this, a, b);
                a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                c.dequeue(this,
                    a)
            })
        }, delay: function (a, b) {
            a = c.fx ? c.fx.speeds[a] || a : a;
            b = b || "fx";
            return this.queue(b, function () {
                var d = this;
                setTimeout(function () {
                    c.dequeue(d, b)
                }, a)
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }
    });
    var sa = /[\n\t]/g, ha = /\s+/, Sa = /\r/g, Ta = /^(?:href|src|style)$/, Ua = /^(?:button|input)$/i, Va = /^(?:button|input|object|select|textarea)$/i, Wa = /^a(?:rea)?$/i, ta = /^(?:radio|checkbox)$/i;
    c.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    c.fn.extend({
        attr: function (a, b) {
            return c.access(this, a, b, true, c.attr)
        }, removeAttr: function (a) {
            return this.each(function () {
                c.attr(this, a, "");
                this.nodeType === 1 && this.removeAttribute(a)
            })
        }, addClass: function (a) {
            if (c.isFunction(a))return this.each(function (x) {
                var r = c(this);
                r.addClass(a.call(this, x, r.attr("class")))
            });
            if (a && typeof a === "string")for (var b = (a || "").split(ha), d = 0, e = this.length; d < e; d++) {
                var f = this[d];
                if (f.nodeType ===
                    1)if (f.className) {
                    for (var h = " " + f.className + " ", l = f.className, k = 0, o = b.length; k < o; k++)if (h.indexOf(" " + b[k] + " ") < 0)l += " " + b[k];
                    f.className = c.trim(l)
                } else f.className = a
            }
            return this
        }, removeClass: function (a) {
            if (c.isFunction(a))return this.each(function (o) {
                var x = c(this);
                x.removeClass(a.call(this, o, x.attr("class")))
            });
            if (a && typeof a === "string" || a === B)for (var b = (a || "").split(ha), d = 0, e = this.length; d < e; d++) {
                var f = this[d];
                if (f.nodeType === 1 && f.className)if (a) {
                    for (var h = (" " + f.className + " ").replace(sa, " "),
                             l = 0, k = b.length; l < k; l++)h = h.replace(" " + b[l] + " ", " ");
                    f.className = c.trim(h)
                } else f.className = ""
            }
            return this
        }, toggleClass: function (a, b) {
            var d = typeof a, e = typeof b === "boolean";
            if (c.isFunction(a))return this.each(function (f) {
                var h = c(this);
                h.toggleClass(a.call(this, f, h.attr("class"), b), b)
            });
            return this.each(function () {
                if (d === "string")for (var f, h = 0, l = c(this), k = b, o = a.split(ha); f = o[h++];) {
                    k = e ? k : !l.hasClass(f);
                    l[k ? "addClass" : "removeClass"](f)
                } else if (d === "undefined" || d === "boolean") {
                    this.className && c.data(this,
                        "__className__", this.className);
                    this.className = this.className || a === false ? "" : c.data(this, "__className__") || ""
                }
            })
        }, hasClass: function (a) {
            a = " " + a + " ";
            for (var b = 0, d = this.length; b < d; b++)if ((" " + this[b].className + " ").replace(sa, " ").indexOf(a) > -1)return true;
            return false
        }, val: function (a) {
            if (!arguments.length) {
                var b = this[0];
                if (b) {
                    if (c.nodeName(b, "option")) {
                        var d = b.attributes.value;
                        return !d || d.specified ? b.value : b.text
                    }
                    if (c.nodeName(b, "select")) {
                        var e = b.selectedIndex;
                        d = [];
                        var f = b.options;
                        b = b.type === "select-one";
                        if (e < 0)return null;
                        var h = b ? e : 0;
                        for (e = b ? e + 1 : f.length; h < e; h++) {
                            var l = f[h];
                            if (l.selected && (c.support.optDisabled ? !l.disabled : l.getAttribute("disabled") === null) && (!l.parentNode.disabled || !c.nodeName(l.parentNode, "optgroup"))) {
                                a = c(l).val();
                                if (b)return a;
                                d.push(a)
                            }
                        }
                        return d
                    }
                    if (ta.test(b.type) && !c.support.checkOn)return b.getAttribute("value") === null ? "on" : b.value;
                    return (b.value || "").replace(Sa, "")
                }
                return B
            }
            var k = c.isFunction(a);
            return this.each(function (o) {
                var x = c(this), r = a;
                if (this.nodeType === 1) {
                    if (k)r =
                        a.call(this, o, x.val());
                    if (r == null)r = ""; else if (typeof r === "number")r += ""; else if (c.isArray(r))r = c.map(r, function (C) {
                        return C == null ? "" : C + ""
                    });
                    if (c.isArray(r) && ta.test(this.type))this.checked = c.inArray(x.val(), r) >= 0; else if (c.nodeName(this, "select")) {
                        var A = c.makeArray(r);
                        c("option", this).each(function () {
                            this.selected = c.inArray(c(this).val(), A) >= 0
                        });
                        if (!A.length)this.selectedIndex = -1
                    } else this.value = r
                }
            })
        }
    });
    c.extend({
        attrFn: {val: true, css: true, html: true, text: true, data: true, width: true, height: true, offset: true},
        attr: function (a, b, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8)return B;
            if (e && b in c.attrFn)return c(a)[b](d);
            e = a.nodeType !== 1 || !c.isXMLDoc(a);
            var f = d !== B;
            b = e && c.props[b] || b;
            var h = Ta.test(b);
            if ((b in a || a[b] !== B) && e && !h) {
                if (f) {
                    b === "type" && Ua.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
                    if (d === null)a.nodeType === 1 && a.removeAttribute(b); else a[b] = d
                }
                if (c.nodeName(a, "form") && a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;
                if (b === "tabIndex")return (b = a.getAttributeNode("tabIndex")) &&
                b.specified ? b.value : Va.test(a.nodeName) || Wa.test(a.nodeName) && a.href ? 0 : B;
                return a[b]
            }
            if (!c.support.style && e && b === "style") {
                if (f)a.style.cssText = "" + d;
                return a.style.cssText
            }
            f && a.setAttribute(b, "" + d);
            if (!a.attributes[b] && a.hasAttribute && !a.hasAttribute(b))return B;
            a = !c.support.hrefNormalized && e && h ? a.getAttribute(b, 2) : a.getAttribute(b);
            return a === null ? B : a
        }
    });
    var X = /\.(.*)$/, ia = /^(?:textarea|input|select)$/i, La = /\./g, Ma = / /g, Xa = /[^\w\s.|`]/g, Ya = function (a) {
        return a.replace(Xa, "\\$&")
    }, ua = {focusin: 0, focusout: 0};
    c.event = {
        add: function (a, b, d, e) {
            if (!(a.nodeType === 3 || a.nodeType === 8)) {
                if (c.isWindow(a) && a !== E && !a.frameElement)a = E;
                if (d === false)d = U; else if (!d)return;
                var f, h;
                if (d.handler) {
                    f = d;
                    d = f.handler
                }
                if (!d.guid)d.guid = c.guid++;
                if (h = c.data(a)) {
                    var l = a.nodeType ? "events" : "__events__", k = h[l], o = h.handle;
                    if (typeof k === "function") {
                        o = k.handle;
                        k = k.events
                    } else if (!k) {
                        a.nodeType || (h[l] = h = function () {
                        });
                        h.events = k = {}
                    }
                    if (!o)h.handle = o = function () {
                        return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(o.elem,
                            arguments) : B
                    };
                    o.elem = a;
                    b = b.split(" ");
                    for (var x = 0, r; l = b[x++];) {
                        h = f ? c.extend({}, f) : {handler: d, data: e};
                        if (l.indexOf(".") > -1) {
                            r = l.split(".");
                            l = r.shift();
                            h.namespace = r.slice(0).sort().join(".")
                        } else {
                            r = [];
                            h.namespace = ""
                        }
                        h.type = l;
                        if (!h.guid)h.guid = d.guid;
                        var A = k[l], C = c.event.special[l] || {};
                        if (!A) {
                            A = k[l] = [];
                            if (!C.setup || C.setup.call(a, e, r, o) === false)if (a.addEventListener)a.addEventListener(l, o, false); else a.attachEvent && a.attachEvent("on" + l, o)
                        }
                        if (C.add) {
                            C.add.call(a, h);
                            if (!h.handler.guid)h.handler.guid =
                                d.guid
                        }
                        A.push(h);
                        c.event.global[l] = true
                    }
                    a = null
                }
            }
        },
        global: {},
        remove: function (a, b, d, e) {
            if (!(a.nodeType === 3 || a.nodeType === 8)) {
                if (d === false)d = U;
                var f, h, l = 0, k, o, x, r, A, C, J = a.nodeType ? "events" : "__events__", w = c.data(a), I = w && w[J];
                if (w && I) {
                    if (typeof I === "function") {
                        w = I;
                        I = I.events
                    }
                    if (b && b.type) {
                        d = b.handler;
                        b = b.type
                    }
                    if (!b || typeof b === "string" && b.charAt(0) === ".") {
                        b = b || "";
                        for (f in I)c.event.remove(a, f + b)
                    } else {
                        for (b = b.split(" "); f = b[l++];) {
                            r = f;
                            k = f.indexOf(".") < 0;
                            o = [];
                            if (!k) {
                                o = f.split(".");
                                f = o.shift();
                                x = RegExp("(^|\\.)" +
                                    c.map(o.slice(0).sort(), Ya).join("\\.(?:.*\\.)?") + "(\\.|$)")
                            }
                            if (A = I[f])if (d) {
                                r = c.event.special[f] || {};
                                for (h = e || 0; h < A.length; h++) {
                                    C = A[h];
                                    if (d.guid === C.guid) {
                                        if (k || x.test(C.namespace)) {
                                            e == null && A.splice(h--, 1);
                                            r.remove && r.remove.call(a, C)
                                        }
                                        if (e != null)break
                                    }
                                }
                                if (A.length === 0 || e != null && A.length === 1) {
                                    if (!r.teardown || r.teardown.call(a, o) === false)c.removeEvent(a, f, w.handle);
                                    delete I[f]
                                }
                            } else for (h = 0; h < A.length; h++) {
                                C = A[h];
                                if (k || x.test(C.namespace)) {
                                    c.event.remove(a, r, C.handler, h);
                                    A.splice(h--, 1)
                                }
                            }
                        }
                        if (c.isEmptyObject(I)) {
                            if (b =
                                    w.handle)b.elem = null;
                            delete w.events;
                            delete w.handle;
                            if (typeof w === "function")c.removeData(a, J); else c.isEmptyObject(w) && c.removeData(a)
                        }
                    }
                }
            }
        },
        trigger: function (a, b, d, e) {
            var f = a.type || a;
            if (!e) {
                a = typeof a === "object" ? a[c.expando] ? a : c.extend(c.Event(f), a) : c.Event(f);
                if (f.indexOf("!") >= 0) {
                    a.type = f = f.slice(0, -1);
                    a.exclusive = true
                }
                if (!d) {
                    a.stopPropagation();
                    c.event.global[f] && c.each(c.cache, function () {
                        this.events && this.events[f] && c.event.trigger(a, b, this.handle.elem)
                    })
                }
                if (!d || d.nodeType === 3 || d.nodeType ===
                    8)return B;
                a.result = B;
                a.target = d;
                b = c.makeArray(b);
                b.unshift(a)
            }
            a.currentTarget = d;
            (e = d.nodeType ? c.data(d, "handle") : (c.data(d, "__events__") || {}).handle) && e.apply(d, b);
            e = d.parentNode || d.ownerDocument;
            try {
                if (!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()]))if (d["on" + f] && d["on" + f].apply(d, b) === false) {
                    a.result = false;
                    a.preventDefault()
                }
            } catch (h) {
            }
            if (!a.isPropagationStopped() && e)c.event.trigger(a, b, e, true); else if (!a.isDefaultPrevented()) {
                var l;
                e = a.target;
                var k = f.replace(X, ""), o = c.nodeName(e, "a") && k ===
                    "click", x = c.event.special[k] || {};
                if ((!x._default || x._default.call(d, a) === false) && !o && !(e && e.nodeName && c.noData[e.nodeName.toLowerCase()])) {
                    try {
                        if (e[k]) {
                            if (l = e["on" + k])e["on" + k] = null;
                            c.event.triggered = true;
                            e[k]()
                        }
                    } catch (r) {
                    }
                    if (l)e["on" + k] = l;
                    c.event.triggered = false
                }
            }
        },
        handle: function (a) {
            var b, d, e, f;
            d = [];
            var h = c.makeArray(arguments);
            a = h[0] = c.event.fix(a || E.event);
            a.currentTarget = this;
            b = a.type.indexOf(".") < 0 && !a.exclusive;
            if (!b) {
                e = a.type.split(".");
                a.type = e.shift();
                d = e.slice(0).sort();
                e = RegExp("(^|\\.)" +
                    d.join("\\.(?:.*\\.)?") + "(\\.|$)")
            }
            a.namespace = a.namespace || d.join(".");
            f = c.data(this, this.nodeType ? "events" : "__events__");
            if (typeof f === "function")f = f.events;
            d = (f || {})[a.type];
            if (f && d) {
                d = d.slice(0);
                f = 0;
                for (var l = d.length; f < l; f++) {
                    var k = d[f];
                    if (b || e.test(k.namespace)) {
                        a.handler = k.handler;
                        a.data = k.data;
                        a.handleObj = k;
                        k = k.handler.apply(this, h);
                        if (k !== B) {
                            a.result = k;
                            if (k === false) {
                                a.preventDefault();
                                a.stopPropagation()
                            }
                        }
                        if (a.isImmediatePropagationStopped())break
                    }
                }
            }
            return a.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (a) {
            if (a[c.expando])return a;
            var b = a;
            a = c.Event(b);
            for (var d = this.props.length, e; d;) {
                e = this.props[--d];
                a[e] = b[e]
            }
            if (!a.target)a.target = a.srcElement || t;
            if (a.target.nodeType === 3)a.target = a.target.parentNode;
            if (!a.relatedTarget && a.fromElement)a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
            if (a.pageX == null && a.clientX != null) {
                b = t.documentElement;
                d = t.body;
                a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0);
                a.pageY = a.clientY + (b && b.scrollTop ||
                    d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
            }
            if (a.which == null && (a.charCode != null || a.keyCode != null))a.which = a.charCode != null ? a.charCode : a.keyCode;
            if (!a.metaKey && a.ctrlKey)a.metaKey = a.ctrlKey;
            if (!a.which && a.button !== B)a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
            return a
        },
        guid: 1E8,
        proxy: c.proxy,
        special: {
            ready: {setup: c.bindReady, teardown: c.noop}, live: {
                add: function (a) {
                    c.event.add(this, Y(a.origType, a.selector), c.extend({}, a, {handler: Ka, guid: a.handler.guid}))
                }, remove: function (a) {
                    c.event.remove(this,
                        Y(a.origType, a.selector), a)
                }
            }, beforeunload: {
                setup: function (a, b, d) {
                    if (c.isWindow(this))this.onbeforeunload = d
                }, teardown: function (a, b) {
                    if (this.onbeforeunload === b)this.onbeforeunload = null
                }
            }
        }
    };
    c.removeEvent = t.removeEventListener ? function (a, b, d) {
        a.removeEventListener && a.removeEventListener(b, d, false)
    } : function (a, b, d) {
        a.detachEvent && a.detachEvent("on" + b, d)
    };
    c.Event = function (a) {
        if (!this.preventDefault)return new c.Event(a);
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type
        } else this.type = a;
        this.timeStamp =
            c.now();
        this[c.expando] = true
    };
    c.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = ca;
            var a = this.originalEvent;
            if (a)if (a.preventDefault)a.preventDefault(); else a.returnValue = false
        }, stopPropagation: function () {
            this.isPropagationStopped = ca;
            var a = this.originalEvent;
            if (a) {
                a.stopPropagation && a.stopPropagation();
                a.cancelBubble = true
            }
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = ca;
            this.stopPropagation()
        }, isDefaultPrevented: U, isPropagationStopped: U, isImmediatePropagationStopped: U
    };
    var va = function (a) {
        var b = a.relatedTarget;
        try {
            for (; b && b !== this;)b = b.parentNode;
            if (b !== this) {
                a.type = a.data;
                c.event.handle.apply(this, arguments)
            }
        } catch (d) {
        }
    }, wa = function (a) {
        a.type = a.data;
        c.event.handle.apply(this, arguments)
    };
    c.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        c.event.special[a] = {
            setup: function (d) {
                c.event.add(this, b, d && d.selector ? wa : va, a)
            }, teardown: function (d) {
                c.event.remove(this, b, d && d.selector ? wa : va)
            }
        }
    });
    if (!c.support.submitBubbles)c.event.special.submit = {
        setup: function () {
            if (this.nodeName.toLowerCase() !==
                "form") {
                c.event.add(this, "click.specialSubmit", function (a) {
                    var b = a.target, d = b.type;
                    if ((d === "submit" || d === "image") && c(b).closest("form").length) {
                        a.liveFired = B;
                        return la("submit", this, arguments)
                    }
                });
                c.event.add(this, "keypress.specialSubmit", function (a) {
                    var b = a.target, d = b.type;
                    if ((d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13) {
                        a.liveFired = B;
                        return la("submit", this, arguments)
                    }
                })
            } else return false
        }, teardown: function () {
            c.event.remove(this, ".specialSubmit")
        }
    };
    if (!c.support.changeBubbles) {
        var V,
            xa = function (a) {
                var b = a.type, d = a.value;
                if (b === "radio" || b === "checkbox")d = a.checked; else if (b === "select-multiple")d = a.selectedIndex > -1 ? c.map(a.options, function (e) {
                    return e.selected
                }).join("-") : ""; else if (a.nodeName.toLowerCase() === "select")d = a.selectedIndex;
                return d
            }, Z = function (a, b) {
                var d = a.target, e, f;
                if (!(!ia.test(d.nodeName) || d.readOnly)) {
                    e = c.data(d, "_change_data");
                    f = xa(d);
                    if (a.type !== "focusout" || d.type !== "radio")c.data(d, "_change_data", f);
                    if (!(e === B || f === e))if (e != null || f) {
                        a.type = "change";
                        a.liveFired =
                            B;
                        return c.event.trigger(a, b, d)
                    }
                }
            };
        c.event.special.change = {
            filters: {
                focusout: Z, beforedeactivate: Z, click: function (a) {
                    var b = a.target, d = b.type;
                    if (d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select")return Z.call(this, a)
                }, keydown: function (a) {
                    var b = a.target, d = b.type;
                    if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple")return Z.call(this, a)
                }, beforeactivate: function (a) {
                    a = a.target;
                    c.data(a, "_change_data", xa(a))
                }
            }, setup: function () {
                if (this.type ===
                    "file")return false;
                for (var a in V)c.event.add(this, a + ".specialChange", V[a]);
                return ia.test(this.nodeName)
            }, teardown: function () {
                c.event.remove(this, ".specialChange");
                return ia.test(this.nodeName)
            }
        };
        V = c.event.special.change.filters;
        V.focus = V.beforeactivate
    }
    t.addEventListener && c.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        function d(e) {
            e = c.event.fix(e);
            e.type = b;
            return c.event.trigger(e, null, e.target)
        }

        c.event.special[b] = {
            setup: function () {
                ua[b]++ === 0 && t.addEventListener(a, d, true)
            }, teardown: function () {
                --ua[b] ===
                0 && t.removeEventListener(a, d, true)
            }
        }
    });
    c.each(["bind", "one"], function (a, b) {
        c.fn[b] = function (d, e, f) {
            if (typeof d === "object") {
                for (var h in d)this[b](h, e, d[h], f);
                return this
            }
            if (c.isFunction(e) || e === false) {
                f = e;
                e = B
            }
            var l = b === "one" ? c.proxy(f, function (o) {
                c(this).unbind(o, l);
                return f.apply(this, arguments)
            }) : f;
            if (d === "unload" && b !== "one")this.one(d, e, f); else {
                h = 0;
                for (var k = this.length; h < k; h++)c.event.add(this[h], d, l, e)
            }
            return this
        }
    });
    c.fn.extend({
        unbind: function (a, b) {
            if (typeof a === "object" && !a.preventDefault)for (var d in a)this.unbind(d,
                a[d]); else {
                d = 0;
                for (var e = this.length; d < e; d++)c.event.remove(this[d], a, b)
            }
            return this
        }, delegate: function (a, b, d, e) {
            return this.live(b, d, e, a)
        }, undelegate: function (a, b, d) {
            return arguments.length === 0 ? this.unbind("live") : this.die(b, null, d, a)
        }, trigger: function (a, b) {
            return this.each(function () {
                c.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            if (this[0]) {
                var d = c.Event(a);
                d.preventDefault();
                d.stopPropagation();
                c.event.trigger(d, b, this[0]);
                return d.result
            }
        }, toggle: function (a) {
            for (var b = arguments, d =
                1; d < b.length;)c.proxy(a, b[d++]);
            return this.click(c.proxy(a, function (e) {
                var f = (c.data(this, "lastToggle" + a.guid) || 0) % d;
                c.data(this, "lastToggle" + a.guid, f + 1);
                e.preventDefault();
                return b[f].apply(this, arguments) || false
            }))
        }, hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    var ya = {focus: "focusin", blur: "focusout", mouseenter: "mouseover", mouseleave: "mouseout"};
    c.each(["live", "die"], function (a, b) {
        c.fn[b] = function (d, e, f, h) {
            var l, k = 0, o, x, r = h || this.selector;
            h = h ? this : c(this.context);
            if (typeof d ===
                "object" && !d.preventDefault) {
                for (l in d)h[b](l, e, d[l], r);
                return this
            }
            if (c.isFunction(e)) {
                f = e;
                e = B
            }
            for (d = (d || "").split(" "); (l = d[k++]) != null;) {
                o = X.exec(l);
                x = "";
                if (o) {
                    x = o[0];
                    l = l.replace(X, "")
                }
                if (l === "hover")d.push("mouseenter" + x, "mouseleave" + x); else {
                    o = l;
                    if (l === "focus" || l === "blur") {
                        d.push(ya[l] + x);
                        l += x
                    } else l = (ya[l] || l) + x;
                    if (b === "live") {
                        x = 0;
                        for (var A = h.length; x < A; x++)c.event.add(h[x], "live." + Y(l, r), {
                            data: e,
                            selector: r,
                            handler: f,
                            origType: l,
                            origHandler: f,
                            preType: o
                        })
                    } else h.unbind("live." + Y(l, r), f)
                }
            }
            return this
        }
    });
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (a, b) {
        c.fn[b] = function (d, e) {
            if (e == null) {
                e = d;
                d = null
            }
            return arguments.length > 0 ? this.bind(b, d, e) : this.trigger(b)
        };
        if (c.attrFn)c.attrFn[b] = true
    });
    E.attachEvent && !E.addEventListener && c(E).bind("unload", function () {
        for (var a in c.cache)if (c.cache[a].handle)try {
            c.event.remove(c.cache[a].handle.elem)
        } catch (b) {
        }
    });
    (function () {
        function a(g, i, n, m, p, q) {
            p = 0;
            for (var u = m.length; p < u; p++) {
                var y = m[p];
                if (y) {
                    var F = false;
                    for (y = y[g]; y;) {
                        if (y.sizcache === n) {
                            F = m[y.sizset];
                            break
                        }
                        if (y.nodeType === 1 && !q) {
                            y.sizcache = n;
                            y.sizset = p
                        }
                        if (y.nodeName.toLowerCase() === i) {
                            F = y;
                            break
                        }
                        y = y[g]
                    }
                    m[p] = F
                }
            }
        }

        function b(g, i, n, m, p, q) {
            p = 0;
            for (var u = m.length; p < u; p++) {
                var y = m[p];
                if (y) {
                    var F = false;
                    for (y = y[g]; y;) {
                        if (y.sizcache === n) {
                            F = m[y.sizset];
                            break
                        }
                        if (y.nodeType === 1) {
                            if (!q) {
                                y.sizcache = n;
                                y.sizset = p
                            }
                            if (typeof i !== "string") {
                                if (y === i) {
                                    F = true;
                                    break
                                }
                            } else if (k.filter(i,
                                    [y]).length > 0) {
                                F = y;
                                break
                            }
                        }
                        y = y[g]
                    }
                    m[p] = F
                }
            }
        }

        var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, e = 0, f = Object.prototype.toString, h = false, l = true;
        [0, 0].sort(function () {
            l = false;
            return 0
        });
        var k = function (g, i, n, m) {
            n = n || [];
            var p = i = i || t;
            if (i.nodeType !== 1 && i.nodeType !== 9)return [];
            if (!g || typeof g !== "string")return n;
            var q, u, y, F, M, N = true, O = k.isXML(i), D = [], R = g;
            do {
                d.exec("");
                if (q = d.exec(R)) {
                    R = q[3];
                    D.push(q[1]);
                    if (q[2]) {
                        F = q[3];
                        break
                    }
                }
            } while (q);
            if (D.length > 1 && x.exec(g))if (D.length === 2 && o.relative[D[0]])u = L(D[0] + D[1], i); else for (u = o.relative[D[0]] ? [i] : k(D.shift(), i); D.length;) {
                g = D.shift();
                if (o.relative[g])g += D.shift();
                u = L(g, u)
            } else {
                if (!m && D.length > 1 && i.nodeType === 9 && !O && o.match.ID.test(D[0]) && !o.match.ID.test(D[D.length - 1])) {
                    q = k.find(D.shift(), i, O);
                    i = q.expr ? k.filter(q.expr, q.set)[0] : q.set[0]
                }
                if (i) {
                    q = m ? {
                        expr: D.pop(),
                        set: C(m)
                    } : k.find(D.pop(), D.length === 1 && (D[0] === "~" || D[0] === "+") && i.parentNode ? i.parentNode : i, O);
                    u = q.expr ? k.filter(q.expr,
                        q.set) : q.set;
                    if (D.length > 0)y = C(u); else N = false;
                    for (; D.length;) {
                        q = M = D.pop();
                        if (o.relative[M])q = D.pop(); else M = "";
                        if (q == null)q = i;
                        o.relative[M](y, q, O)
                    }
                } else y = []
            }
            y || (y = u);
            y || k.error(M || g);
            if (f.call(y) === "[object Array]")if (N)if (i && i.nodeType === 1)for (g = 0; y[g] != null; g++) {
                if (y[g] && (y[g] === true || y[g].nodeType === 1 && k.contains(i, y[g])))n.push(u[g])
            } else for (g = 0; y[g] != null; g++)y[g] && y[g].nodeType === 1 && n.push(u[g]); else n.push.apply(n, y); else C(y, n);
            if (F) {
                k(F, p, n, m);
                k.uniqueSort(n)
            }
            return n
        };
        k.uniqueSort = function (g) {
            if (w) {
                h =
                    l;
                g.sort(w);
                if (h)for (var i = 1; i < g.length; i++)g[i] === g[i - 1] && g.splice(i--, 1)
            }
            return g
        };
        k.matches = function (g, i) {
            return k(g, null, null, i)
        };
        k.matchesSelector = function (g, i) {
            return k(i, null, null, [g]).length > 0
        };
        k.find = function (g, i, n) {
            var m;
            if (!g)return [];
            for (var p = 0, q = o.order.length; p < q; p++) {
                var u, y = o.order[p];
                if (u = o.leftMatch[y].exec(g)) {
                    var F = u[1];
                    u.splice(1, 1);
                    if (F.substr(F.length - 1) !== "\\") {
                        u[1] = (u[1] || "").replace(/\\/g, "");
                        m = o.find[y](u, i, n);
                        if (m != null) {
                            g = g.replace(o.match[y], "");
                            break
                        }
                    }
                }
            }
            m || (m = i.getElementsByTagName("*"));
            return {set: m, expr: g}
        };
        k.filter = function (g, i, n, m) {
            for (var p, q, u = g, y = [], F = i, M = i && i[0] && k.isXML(i[0]); g && i.length;) {
                for (var N in o.filter)if ((p = o.leftMatch[N].exec(g)) != null && p[2]) {
                    var O, D, R = o.filter[N];
                    D = p[1];
                    q = false;
                    p.splice(1, 1);
                    if (D.substr(D.length - 1) !== "\\") {
                        if (F === y)y = [];
                        if (o.preFilter[N])if (p = o.preFilter[N](p, F, n, y, m, M)) {
                            if (p === true)continue
                        } else q = O = true;
                        if (p)for (var j = 0; (D = F[j]) != null; j++)if (D) {
                            O = R(D, p, j, F);
                            var s = m ^ !!O;
                            if (n && O != null)if (s)q = true; else F[j] = false; else if (s) {
                                y.push(D);
                                q = true
                            }
                        }
                        if (O !==
                            B) {
                            n || (F = y);
                            g = g.replace(o.match[N], "");
                            if (!q)return [];
                            break
                        }
                    }
                }
                if (g === u)if (q == null)k.error(g); else break;
                u = g
            }
            return F
        };
        k.error = function (g) {
            throw"Syntax error, unrecognized expression: " + g;
        };
        var o = k.selectors = {
            order: ["ID", "NAME", "TAG"], match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            }, leftMatch: {}, attrMap: {"class": "className", "for": "htmlFor"}, attrHandle: {
                href: function (g) {
                    return g.getAttribute("href")
                }
            }, relative: {
                "+": function (g, i) {
                    var n = typeof i === "string", m = n && !/\W/.test(i);
                    n = n && !m;
                    if (m)i = i.toLowerCase();
                    m = 0;
                    for (var p = g.length, q; m < p; m++)if (q = g[m]) {
                        for (; (q = q.previousSibling) && q.nodeType !== 1;);
                        g[m] = n || q && q.nodeName.toLowerCase() ===
                        i ? q || false : q === i
                    }
                    n && k.filter(i, g, true)
                }, ">": function (g, i) {
                    var n, m = typeof i === "string", p = 0, q = g.length;
                    if (m && !/\W/.test(i))for (i = i.toLowerCase(); p < q; p++) {
                        if (n = g[p]) {
                            n = n.parentNode;
                            g[p] = n.nodeName.toLowerCase() === i ? n : false
                        }
                    } else {
                        for (; p < q; p++)if (n = g[p])g[p] = m ? n.parentNode : n.parentNode === i;
                        m && k.filter(i, g, true)
                    }
                }, "": function (g, i, n) {
                    var m, p = e++, q = b;
                    if (typeof i === "string" && !/\W/.test(i)) {
                        m = i = i.toLowerCase();
                        q = a
                    }
                    q("parentNode", i, p, g, m, n)
                }, "~": function (g, i, n) {
                    var m, p = e++, q = b;
                    if (typeof i === "string" && !/\W/.test(i)) {
                        m =
                            i = i.toLowerCase();
                        q = a
                    }
                    q("previousSibling", i, p, g, m, n)
                }
            }, find: {
                ID: function (g, i, n) {
                    if (typeof i.getElementById !== "undefined" && !n)return (g = i.getElementById(g[1])) && g.parentNode ? [g] : []
                }, NAME: function (g, i) {
                    if (typeof i.getElementsByName !== "undefined") {
                        for (var n = [], m = i.getElementsByName(g[1]), p = 0, q = m.length; p < q; p++)m[p].getAttribute("name") === g[1] && n.push(m[p]);
                        return n.length === 0 ? null : n
                    }
                }, TAG: function (g, i) {
                    return i.getElementsByTagName(g[1])
                }
            }, preFilter: {
                CLASS: function (g, i, n, m, p, q) {
                    g = " " + g[1].replace(/\\/g,
                            "") + " ";
                    if (q)return g;
                    q = 0;
                    for (var u; (u = i[q]) != null; q++)if (u)if (p ^ (u.className && (" " + u.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0))n || m.push(u); else if (n)i[q] = false;
                    return false
                }, ID: function (g) {
                    return g[1].replace(/\\/g, "")
                }, TAG: function (g) {
                    return g[1].toLowerCase()
                }, CHILD: function (g) {
                    if (g[1] === "nth") {
                        var i = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]);
                        g[2] = i[1] + (i[2] || 1) - 0;
                        g[3] = i[3] - 0
                    }
                    g[0] = e++;
                    return g
                }, ATTR: function (g, i, n,
                                   m, p, q) {
                    i = g[1].replace(/\\/g, "");
                    if (!q && o.attrMap[i])g[1] = o.attrMap[i];
                    if (g[2] === "~=")g[4] = " " + g[4] + " ";
                    return g
                }, PSEUDO: function (g, i, n, m, p) {
                    if (g[1] === "not")if ((d.exec(g[3]) || "").length > 1 || /^\w/.test(g[3]))g[3] = k(g[3], null, null, i); else {
                        g = k.filter(g[3], i, n, true ^ p);
                        n || m.push.apply(m, g);
                        return false
                    } else if (o.match.POS.test(g[0]) || o.match.CHILD.test(g[0]))return true;
                    return g
                }, POS: function (g) {
                    g.unshift(true);
                    return g
                }
            }, filters: {
                enabled: function (g) {
                    return g.disabled === false && g.type !== "hidden"
                }, disabled: function (g) {
                    return g.disabled ===
                        true
                }, checked: function (g) {
                    return g.checked === true
                }, selected: function (g) {
                    return g.selected === true
                }, parent: function (g) {
                    return !!g.firstChild
                }, empty: function (g) {
                    return !g.firstChild
                }, has: function (g, i, n) {
                    return !!k(n[3], g).length
                }, header: function (g) {
                    return /h\d/i.test(g.nodeName)
                }, text: function (g) {
                    return "text" === g.type
                }, radio: function (g) {
                    return "radio" === g.type
                }, checkbox: function (g) {
                    return "checkbox" === g.type
                }, file: function (g) {
                    return "file" === g.type
                }, password: function (g) {
                    return "password" === g.type
                }, submit: function (g) {
                    return "submit" ===
                        g.type
                }, image: function (g) {
                    return "image" === g.type
                }, reset: function (g) {
                    return "reset" === g.type
                }, button: function (g) {
                    return "button" === g.type || g.nodeName.toLowerCase() === "button"
                }, input: function (g) {
                    return /input|select|textarea|button/i.test(g.nodeName)
                }
            }, setFilters: {
                first: function (g, i) {
                    return i === 0
                }, last: function (g, i, n, m) {
                    return i === m.length - 1
                }, even: function (g, i) {
                    return i % 2 === 0
                }, odd: function (g, i) {
                    return i % 2 === 1
                }, lt: function (g, i, n) {
                    return i < n[3] - 0
                }, gt: function (g, i, n) {
                    return i > n[3] - 0
                }, nth: function (g, i, n) {
                    return n[3] -
                        0 === i
                }, eq: function (g, i, n) {
                    return n[3] - 0 === i
                }
            }, filter: {
                PSEUDO: function (g, i, n, m) {
                    var p = i[1], q = o.filters[p];
                    if (q)return q(g, n, i, m); else if (p === "contains")return (g.textContent || g.innerText || k.getText([g]) || "").indexOf(i[3]) >= 0; else if (p === "not") {
                        i = i[3];
                        n = 0;
                        for (m = i.length; n < m; n++)if (i[n] === g)return false;
                        return true
                    } else k.error("Syntax error, unrecognized expression: " + p)
                }, CHILD: function (g, i) {
                    var n = i[1], m = g;
                    switch (n) {
                        case "only":
                        case "first":
                            for (; m = m.previousSibling;)if (m.nodeType === 1)return false;
                            if (n ===
                                "first")return true;
                            m = g;
                        case "last":
                            for (; m = m.nextSibling;)if (m.nodeType === 1)return false;
                            return true;
                        case "nth":
                            n = i[2];
                            var p = i[3];
                            if (n === 1 && p === 0)return true;
                            var q = i[0], u = g.parentNode;
                            if (u && (u.sizcache !== q || !g.nodeIndex)) {
                                var y = 0;
                                for (m = u.firstChild; m; m = m.nextSibling)if (m.nodeType === 1)m.nodeIndex = ++y;
                                u.sizcache = q
                            }
                            m = g.nodeIndex - p;
                            return n === 0 ? m === 0 : m % n === 0 && m / n >= 0
                    }
                }, ID: function (g, i) {
                    return g.nodeType === 1 && g.getAttribute("id") === i
                }, TAG: function (g, i) {
                    return i === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() ===
                        i
                }, CLASS: function (g, i) {
                    return (" " + (g.className || g.getAttribute("class")) + " ").indexOf(i) > -1
                }, ATTR: function (g, i) {
                    var n = i[1];
                    n = o.attrHandle[n] ? o.attrHandle[n](g) : g[n] != null ? g[n] : g.getAttribute(n);
                    var m = n + "", p = i[2], q = i[4];
                    return n == null ? p === "!=" : p === "=" ? m === q : p === "*=" ? m.indexOf(q) >= 0 : p === "~=" ? (" " + m + " ").indexOf(q) >= 0 : !q ? m && n !== false : p === "!=" ? m !== q : p === "^=" ? m.indexOf(q) === 0 : p === "$=" ? m.substr(m.length - q.length) === q : p === "|=" ? m === q || m.substr(0, q.length + 1) === q + "-" : false
                }, POS: function (g, i, n, m) {
                    var p = o.setFilters[i[2]];
                    if (p)return p(g, n, i, m)
                }
            }
        }, x = o.match.POS, r = function (g, i) {
            return "\\" + (i - 0 + 1)
        }, A;
        for (A in o.match) {
            o.match[A] = RegExp(o.match[A].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            o.leftMatch[A] = RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[A].source.replace(/\\(\d+)/g, r))
        }
        var C = function (g, i) {
            g = Array.prototype.slice.call(g, 0);
            if (i) {
                i.push.apply(i, g);
                return i
            }
            return g
        };
        try {
            Array.prototype.slice.call(t.documentElement.childNodes, 0)
        } catch (J) {
            C = function (g, i) {
                var n = 0, m = i || [];
                if (f.call(g) === "[object Array]")Array.prototype.push.apply(m,
                    g); else if (typeof g.length === "number")for (var p = g.length; n < p; n++)m.push(g[n]); else for (; g[n]; n++)m.push(g[n]);
                return m
            }
        }
        var w, I;
        if (t.documentElement.compareDocumentPosition)w = function (g, i) {
            if (g === i) {
                h = true;
                return 0
            }
            if (!g.compareDocumentPosition || !i.compareDocumentPosition)return g.compareDocumentPosition ? -1 : 1;
            return g.compareDocumentPosition(i) & 4 ? -1 : 1
        }; else {
            w = function (g, i) {
                var n, m, p = [], q = [];
                n = g.parentNode;
                m = i.parentNode;
                var u = n;
                if (g === i) {
                    h = true;
                    return 0
                } else if (n === m)return I(g, i); else if (n) {
                    if (!m)return 1
                } else return -1;
                for (; u;) {
                    p.unshift(u);
                    u = u.parentNode
                }
                for (u = m; u;) {
                    q.unshift(u);
                    u = u.parentNode
                }
                n = p.length;
                m = q.length;
                for (u = 0; u < n && u < m; u++)if (p[u] !== q[u])return I(p[u], q[u]);
                return u === n ? I(g, q[u], -1) : I(p[u], i, 1)
            };
            I = function (g, i, n) {
                if (g === i)return n;
                for (g = g.nextSibling; g;) {
                    if (g === i)return -1;
                    g = g.nextSibling
                }
                return 1
            }
        }
        k.getText = function (g) {
            for (var i = "", n, m = 0; g[m]; m++) {
                n = g[m];
                if (n.nodeType === 3 || n.nodeType === 4)i += n.nodeValue; else if (n.nodeType !== 8)i += k.getText(n.childNodes)
            }
            return i
        };
        (function () {
            var g = t.createElement("div"),
                i = "script" + (new Date).getTime(), n = t.documentElement;
            g.innerHTML = "<a name='" + i + "'/>";
            n.insertBefore(g, n.firstChild);
            if (t.getElementById(i)) {
                o.find.ID = function (m, p, q) {
                    if (typeof p.getElementById !== "undefined" && !q)return (p = p.getElementById(m[1])) ? p.id === m[1] || typeof p.getAttributeNode !== "undefined" && p.getAttributeNode("id").nodeValue === m[1] ? [p] : B : []
                };
                o.filter.ID = function (m, p) {
                    var q = typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id");
                    return m.nodeType === 1 && q && q.nodeValue === p
                }
            }
            n.removeChild(g);
            n = g = null
        })();
        (function () {
            var g = t.createElement("div");
            g.appendChild(t.createComment(""));
            if (g.getElementsByTagName("*").length > 0)o.find.TAG = function (i, n) {
                var m = n.getElementsByTagName(i[1]);
                if (i[1] === "*") {
                    for (var p = [], q = 0; m[q]; q++)m[q].nodeType === 1 && p.push(m[q]);
                    m = p
                }
                return m
            };
            g.innerHTML = "<a href='#'></a>";
            if (g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#")o.attrHandle.href = function (i) {
                return i.getAttribute("href", 2)
            };
            g = null
        })();
        t.querySelectorAll &&
        function () {
            var g = k, i = t.createElement("div");
            i.innerHTML = "<p class='TEST'></p>";
            if (!(i.querySelectorAll && i.querySelectorAll(".TEST").length === 0)) {
                k = function (m, p, q, u) {
                    p = p || t;
                    m = m.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!u && !k.isXML(p))if (p.nodeType === 9)try {
                        return C(p.querySelectorAll(m), q)
                    } catch (y) {
                    } else if (p.nodeType === 1 && p.nodeName.toLowerCase() !== "object") {
                        var F = p.getAttribute("id"), M = F || "__sizzle__";
                        F || p.setAttribute("id", M);
                        try {
                            return C(p.querySelectorAll("#" + M + " " + m), q)
                        } catch (N) {
                        } finally {
                            F ||
                            p.removeAttribute("id")
                        }
                    }
                    return g(m, p, q, u)
                };
                for (var n in g)k[n] = g[n];
                i = null
            }
        }();
        (function () {
            var g = t.documentElement, i = g.matchesSelector || g.mozMatchesSelector || g.webkitMatchesSelector || g.msMatchesSelector, n = false;
            try {
                i.call(t.documentElement, "[test!='']:sizzle")
            } catch (m) {
                n = true
            }
            if (i)k.matchesSelector = function (p, q) {
                q = q.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                if (!k.isXML(p))try {
                    if (n || !o.match.PSEUDO.test(q) && !/!=/.test(q))return i.call(p, q)
                } catch (u) {
                }
                return k(q, null, null, [p]).length > 0
            }
        })();
        (function () {
            var g =
                t.createElement("div");
            g.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) {
                g.lastChild.className = "e";
                if (g.getElementsByClassName("e").length !== 1) {
                    o.order.splice(1, 0, "CLASS");
                    o.find.CLASS = function (i, n, m) {
                        if (typeof n.getElementsByClassName !== "undefined" && !m)return n.getElementsByClassName(i[1])
                    };
                    g = null
                }
            }
        })();
        k.contains = t.documentElement.contains ? function (g, i) {
            return g !== i && (g.contains ? g.contains(i) : true)
        } : t.documentElement.compareDocumentPosition ?
            function (g, i) {
                return !!(g.compareDocumentPosition(i) & 16)
            } : function () {
            return false
        };
        k.isXML = function (g) {
            return (g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false
        };
        var L = function (g, i) {
            for (var n, m = [], p = "", q = i.nodeType ? [i] : i; n = o.match.PSEUDO.exec(g);) {
                p += n[0];
                g = g.replace(o.match.PSEUDO, "")
            }
            g = o.relative[g] ? g + "*" : g;
            n = 0;
            for (var u = q.length; n < u; n++)k(g, q[n], m);
            return k.filter(p, m)
        };
        c.find = k;
        c.expr = k.selectors;
        c.expr[":"] = c.expr.filters;
        c.unique = k.uniqueSort;
        c.text = k.getText;
        c.isXMLDoc = k.isXML;
        c.contains = k.contains
    })();
    var Za = /Until$/, $a = /^(?:parents|prevUntil|prevAll)/, ab = /,/, Na = /^.[^:#\[\.,]*$/, bb = Array.prototype.slice, cb = c.expr.match.POS;
    c.fn.extend({
        find: function (a) {
            for (var b = this.pushStack("", "find", a), d = 0, e = 0, f = this.length; e < f; e++) {
                d = b.length;
                c.find(a, this[e], b);
                if (e > 0)for (var h = d; h < b.length; h++)for (var l = 0; l < d; l++)if (b[l] === b[h]) {
                    b.splice(h--, 1);
                    break
                }
            }
            return b
        }, has: function (a) {
            var b = c(a);
            return this.filter(function () {
                for (var d = 0, e = b.length; d < e; d++)if (c.contains(this, b[d]))return true
            })
        },
        not: function (a) {
            return this.pushStack(ma(this, a, false), "not", a)
        }, filter: function (a) {
            return this.pushStack(ma(this, a, true), "filter", a)
        }, is: function (a) {
            return !!a && c.filter(a, this).length > 0
        }, closest: function (a, b) {
            var d = [], e, f, h = this[0];
            if (c.isArray(a)) {
                var l, k = {}, o = 1;
                if (h && a.length) {
                    e = 0;
                    for (f = a.length; e < f; e++) {
                        l = a[e];
                        k[l] || (k[l] = c.expr.match.POS.test(l) ? c(l, b || this.context) : l)
                    }
                    for (; h && h.ownerDocument && h !== b;) {
                        for (l in k) {
                            e = k[l];
                            if (e.jquery ? e.index(h) > -1 : c(h).is(e))d.push({selector: l, elem: h, level: o})
                        }
                        h =
                            h.parentNode;
                        o++
                    }
                }
                return d
            }
            l = cb.test(a) ? c(a, b || this.context) : null;
            e = 0;
            for (f = this.length; e < f; e++)for (h = this[e]; h;)if (l ? l.index(h) > -1 : c.find.matchesSelector(h, a)) {
                d.push(h);
                break
            } else {
                h = h.parentNode;
                if (!h || !h.ownerDocument || h === b)break
            }
            d = d.length > 1 ? c.unique(d) : d;
            return this.pushStack(d, "closest", a)
        }, index: function (a) {
            if (!a || typeof a === "string")return c.inArray(this[0], a ? c(a) : this.parent().children());
            return c.inArray(a.jquery ? a[0] : a, this)
        }, add: function (a, b) {
            var d = typeof a === "string" ? c(a, b || this.context) :
                c.makeArray(a), e = c.merge(this.get(), d);
            return this.pushStack(!d[0] || !d[0].parentNode || d[0].parentNode.nodeType === 11 || !e[0] || !e[0].parentNode || e[0].parentNode.nodeType === 11 ? e : c.unique(e))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    });
    c.each({
        parent: function (a) {
            return (a = a.parentNode) && a.nodeType !== 11 ? a : null
        }, parents: function (a) {
            return c.dir(a, "parentNode")
        }, parentsUntil: function (a, b, d) {
            return c.dir(a, "parentNode", d)
        }, next: function (a) {
            return c.nth(a, 2, "nextSibling")
        }, prev: function (a) {
            return c.nth(a,
                2, "previousSibling")
        }, nextAll: function (a) {
            return c.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return c.dir(a, "previousSibling")
        }, nextUntil: function (a, b, d) {
            return c.dir(a, "nextSibling", d)
        }, prevUntil: function (a, b, d) {
            return c.dir(a, "previousSibling", d)
        }, siblings: function (a) {
            return c.sibling(a.parentNode.firstChild, a)
        }, children: function (a) {
            return c.sibling(a.firstChild)
        }, contents: function (a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
        }
    }, function (a,
                 b) {
        c.fn[a] = function (d, e) {
            var f = c.map(this, b, d);
            Za.test(a) || (e = d);
            if (e && typeof e === "string")f = c.filter(e, f);
            f = this.length > 1 ? c.unique(f) : f;
            if ((this.length > 1 || ab.test(e)) && $a.test(a))f = f.reverse();
            return this.pushStack(f, a, bb.call(arguments).join(","))
        }
    });
    c.extend({
        filter: function (a, b, d) {
            if (d)a = ":not(" + a + ")";
            return b.length === 1 ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b)
        }, dir: function (a, b, d) {
            var e = [];
            for (a = a[b]; a && a.nodeType !== 9 && (d === B || a.nodeType !== 1 || !c(a).is(d));) {
                a.nodeType === 1 &&
                e.push(a);
                a = a[b]
            }
            return e
        }, nth: function (a, b, d) {
            b = b || 1;
            for (var e = 0; a; a = a[d])if (a.nodeType === 1 && ++e === b)break;
            return a
        }, sibling: function (a, b) {
            for (var d = []; a; a = a.nextSibling)a.nodeType === 1 && a !== b && d.push(a);
            return d
        }
    });
    var za = / jQuery\d+="(?:\d+|null)"/g, $ = /^\s+/, Aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Ba = /<([\w:]+)/, db = /<tbody/i, eb = /<|&#?\w+;/, Ca = /<(?:script|object|embed|option|style)/i, Da = /checked\s*(?:[^=]|=\s*.checked.)/i, fb = /\=([^="'>\s]+\/)>/g, P = {
        option: [1,
            "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    };
    P.optgroup = P.option;
    P.tbody = P.tfoot = P.colgroup = P.caption = P.thead;
    P.th = P.td;
    if (!c.support.htmlSerialize)P._default = [1, "div<div>", "</div>"];
    c.fn.extend({
        text: function (a) {
            if (c.isFunction(a))return this.each(function (b) {
                var d =
                    c(this);
                d.text(a.call(this, b, d.text()))
            });
            if (typeof a !== "object" && a !== B)return this.empty().append((this[0] && this[0].ownerDocument || t).createTextNode(a));
            return c.text(this)
        }, wrapAll: function (a) {
            if (c.isFunction(a))return this.each(function (d) {
                c(this).wrapAll(a.call(this, d))
            });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(true);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function () {
                    for (var d = this; d.firstChild && d.firstChild.nodeType === 1;)d = d.firstChild;
                    return d
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            if (c.isFunction(a))return this.each(function (b) {
                c(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = c(this), d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            return this.each(function () {
                c(this).wrapAll(a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, true, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function () {
            return this.domManip(arguments, true, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, false, function (b) {
                this.parentNode.insertBefore(b, this)
            }); else if (arguments.length) {
                var a = c(arguments[0]);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, false, function (b) {
                this.parentNode.insertBefore(b,
                    this.nextSibling)
            }); else if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, c(arguments[0]).toArray());
                return a
            }
        }, remove: function (a, b) {
            for (var d = 0, e; (e = this[d]) != null; d++)if (!a || c.filter(a, [e]).length) {
                if (!b && e.nodeType === 1) {
                    c.cleanData(e.getElementsByTagName("*"));
                    c.cleanData([e])
                }
                e.parentNode && e.parentNode.removeChild(e)
            }
            return this
        }, empty: function () {
            for (var a = 0, b; (b = this[a]) != null; a++)for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild;)b.removeChild(b.firstChild);
            return this
        }, clone: function (a) {
            var b = this.map(function () {
                if (!c.support.noCloneEvent && !c.isXMLDoc(this)) {
                    var d = this.outerHTML, e = this.ownerDocument;
                    if (!d) {
                        d = e.createElement("div");
                        d.appendChild(this.cloneNode(true));
                        d = d.innerHTML
                    }
                    return c.clean([d.replace(za, "").replace(fb, '="$1">').replace($, "")], e)[0]
                } else return this.cloneNode(true)
            });
            if (a === true) {
                na(this, b);
                na(this.find("*"), b.find("*"))
            }
            return b
        }, html: function (a) {
            if (a === B)return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(za, "") : null;
            else if (typeof a === "string" && !Ca.test(a) && (c.support.leadingWhitespace || !$.test(a)) && !P[(Ba.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Aa, "<$1></$2>");
                try {
                    for (var b = 0, d = this.length; b < d; b++)if (this[b].nodeType === 1) {
                        c.cleanData(this[b].getElementsByTagName("*"));
                        this[b].innerHTML = a
                    }
                } catch (e) {
                    this.empty().append(a)
                }
            } else c.isFunction(a) ? this.each(function (f) {
                var h = c(this);
                h.html(a.call(this, f, h.html()))
            }) : this.empty().append(a);
            return this
        }, replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (c.isFunction(a))return this.each(function (b) {
                    var d =
                        c(this), e = d.html();
                    d.replaceWith(a.call(this, b, e))
                });
                if (typeof a !== "string")a = c(a).detach();
                return this.each(function () {
                    var b = this.nextSibling, d = this.parentNode;
                    c(this).remove();
                    b ? c(b).before(a) : c(d).append(a)
                })
            } else return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
        }, detach: function (a) {
            return this.remove(a, true)
        }, domManip: function (a, b, d) {
            var e, f, h, l = a[0], k = [];
            if (!c.support.checkClone && arguments.length === 3 && typeof l === "string" && Da.test(l))return this.each(function () {
                c(this).domManip(a,
                    b, d, true)
            });
            if (c.isFunction(l))return this.each(function (x) {
                var r = c(this);
                a[0] = l.call(this, x, b ? r.html() : B);
                r.domManip(a, b, d)
            });
            if (this[0]) {
                e = l && l.parentNode;
                e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? {fragment: e} : c.buildFragment(a, this, k);
                h = e.fragment;
                if (f = h.childNodes.length === 1 ? h = h.firstChild : h.firstChild) {
                    b = b && c.nodeName(f, "tr");
                    f = 0;
                    for (var o = this.length; f < o; f++)d.call(b ? c.nodeName(this[f], "table") ? this[f].getElementsByTagName("tbody")[0] || this[f].appendChild(this[f].ownerDocument.createElement("tbody")) :
                        this[f] : this[f], f > 0 || e.cacheable || this.length > 1 ? h.cloneNode(true) : h)
                }
                k.length && c.each(k, Oa)
            }
            return this
        }
    });
    c.buildFragment = function (a, b, d) {
        var e, f, h;
        b = b && b[0] ? b[0].ownerDocument || b[0] : t;
        if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && b === t && !Ca.test(a[0]) && (c.support.checkClone || !Da.test(a[0]))) {
            f = true;
            if (h = c.fragments[a[0]])if (h !== 1)e = h
        }
        if (!e) {
            e = b.createDocumentFragment();
            c.clean(a, b, e, d)
        }
        if (f)c.fragments[a[0]] = h ? e : 1;
        return {fragment: e, cacheable: f}
    };
    c.fragments = {};
    c.each({
        appendTo: "append",
        prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"
    }, function (a, b) {
        c.fn[a] = function (d) {
            var e = [];
            d = c(d);
            var f = this.length === 1 && this[0].parentNode;
            if (f && f.nodeType === 11 && f.childNodes.length === 1 && d.length === 1) {
                d[b](this[0]);
                return this
            } else {
                f = 0;
                for (var h = d.length; f < h; f++) {
                    var l = (f > 0 ? this.clone(true) : this).get();
                    c(d[f])[b](l);
                    e = e.concat(l)
                }
                return this.pushStack(e, a, d.selector)
            }
        }
    });
    c.extend({
        clean: function (a, b, d, e) {
            b = b || t;
            if (typeof b.createElement === "undefined")b = b.ownerDocument ||
                b[0] && b[0].ownerDocument || t;
            for (var f = [], h = 0, l; (l = a[h]) != null; h++) {
                if (typeof l === "number")l += "";
                if (l) {
                    if (typeof l === "string" && !eb.test(l))l = b.createTextNode(l); else if (typeof l === "string") {
                        l = l.replace(Aa, "<$1></$2>");
                        var k = (Ba.exec(l) || ["", ""])[1].toLowerCase(), o = P[k] || P._default, x = o[0], r = b.createElement("div");
                        for (r.innerHTML = o[1] + l + o[2]; x--;)r = r.lastChild;
                        if (!c.support.tbody) {
                            x = db.test(l);
                            k = k === "table" && !x ? r.firstChild && r.firstChild.childNodes : o[1] === "<table>" && !x ? r.childNodes : [];
                            for (o = k.length -
                                1; o >= 0; --o)c.nodeName(k[o], "tbody") && !k[o].childNodes.length && k[o].parentNode.removeChild(k[o])
                        }
                        !c.support.leadingWhitespace && $.test(l) && r.insertBefore(b.createTextNode($.exec(l)[0]), r.firstChild);
                        l = r.childNodes
                    }
                    if (l.nodeType)f.push(l); else f = c.merge(f, l)
                }
            }
            if (d)for (h = 0; f[h]; h++)if (e && c.nodeName(f[h], "script") && (!f[h].type || f[h].type.toLowerCase() === "text/javascript"))e.push(f[h].parentNode ? f[h].parentNode.removeChild(f[h]) : f[h]); else {
                f[h].nodeType === 1 && f.splice.apply(f, [h + 1, 0].concat(c.makeArray(f[h].getElementsByTagName("script"))));
                d.appendChild(f[h])
            }
            return f
        }, cleanData: function (a) {
            for (var b, d, e = c.cache, f = c.event.special, h = c.support.deleteExpando, l = 0, k; (k = a[l]) != null; l++)if (!(k.nodeName && c.noData[k.nodeName.toLowerCase()]))if (d = k[c.expando]) {
                if ((b = e[d]) && b.events)for (var o in b.events)f[o] ? c.event.remove(k, o) : c.removeEvent(k, o, b.handle);
                if (h)delete k[c.expando]; else k.removeAttribute && k.removeAttribute(c.expando);
                delete e[d]
            }
        }
    });
    var Ea = /alpha\([^)]*\)/i, gb = /opacity=([^)]*)/, hb = /-([a-z])/ig, ib = /([A-Z])/g, Fa = /^-?\d+(?:px)?$/i,
        jb = /^-?\d/, kb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, Pa = ["Left", "Right"], Qa = ["Top", "Bottom"], W, Ga, aa, lb = function (a, b) {
            return b.toUpperCase()
        };
    c.fn.css = function (a, b) {
        if (arguments.length === 2 && b === B)return this;
        return c.access(this, a, b, true, function (d, e, f) {
            return f !== B ? c.style(d, e, f) : c.css(d, e)
        })
    };
    c.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var d = W(a, "opacity", "opacity");
                        return d === "" ? "1" : d
                    } else return a.style.opacity
                }
            }
        }, cssNumber: {
            zIndex: true, fontWeight: true, opacity: true,
            zoom: true, lineHeight: true
        }, cssProps: {"float": c.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (a, b, d, e) {
            if (!(!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
                var f, h = c.camelCase(b), l = a.style, k = c.cssHooks[h];
                b = c.cssProps[h] || h;
                if (d !== B) {
                    if (!(typeof d === "number" && isNaN(d) || d == null)) {
                        if (typeof d === "number" && !c.cssNumber[h])d += "px";
                        if (!k || !("set" in k) || (d = k.set(a, d)) !== B)try {
                            l[b] = d
                        } catch (o) {
                        }
                    }
                } else {
                    if (k && "get" in k && (f = k.get(a, false, e)) !== B)return f;
                    return l[b]
                }
            }
        }, css: function (a, b, d) {
            var e, f = c.camelCase(b),
                h = c.cssHooks[f];
            b = c.cssProps[f] || f;
            if (h && "get" in h && (e = h.get(a, true, d)) !== B)return e; else if (W)return W(a, b, f)
        }, swap: function (a, b, d) {
            var e = {}, f;
            for (f in b) {
                e[f] = a.style[f];
                a.style[f] = b[f]
            }
            d.call(a);
            for (f in b)a.style[f] = e[f]
        }, camelCase: function (a) {
            return a.replace(hb, lb)
        }
    });
    c.curCSS = c.css;
    c.each(["height", "width"], function (a, b) {
        c.cssHooks[b] = {
            get: function (d, e, f) {
                var h;
                if (e) {
                    if (d.offsetWidth !== 0)h = oa(d, b, f); else c.swap(d, kb, function () {
                        h = oa(d, b, f)
                    });
                    if (h <= 0) {
                        h = W(d, b, b);
                        if (h === "0px" && aa)h = aa(d, b, b);
                        if (h != null)return h === "" || h === "auto" ? "0px" : h
                    }
                    if (h < 0 || h == null) {
                        h = d.style[b];
                        return h === "" || h === "auto" ? "0px" : h
                    }
                    return typeof h === "string" ? h : h + "px"
                }
            }, set: function (d, e) {
                if (Fa.test(e)) {
                    e = parseFloat(e);
                    if (e >= 0)return e + "px"
                } else return e
            }
        }
    });
    if (!c.support.opacity)c.cssHooks.opacity = {
        get: function (a, b) {
            return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        }, set: function (a, b) {
            var d = a.style;
            d.zoom = 1;
            var e = c.isNaN(b) ? "" : "alpha(opacity=" + b * 100 + ")", f =
                d.filter || "";
            d.filter = Ea.test(f) ? f.replace(Ea, e) : d.filter + " " + e
        }
    };
    if (t.defaultView && t.defaultView.getComputedStyle)Ga = function (a, b, d) {
        var e;
        d = d.replace(ib, "-$1").toLowerCase();
        if (!(b = a.ownerDocument.defaultView))return B;
        if (b = b.getComputedStyle(a, null)) {
            e = b.getPropertyValue(d);
            if (e === "" && !c.contains(a.ownerDocument.documentElement, a))e = c.style(a, d)
        }
        return e
    };
    if (t.documentElement.currentStyle)aa = function (a, b) {
        var d, e, f = a.currentStyle && a.currentStyle[b], h = a.style;
        if (!Fa.test(f) && jb.test(f)) {
            d = h.left;
            e = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left;
            h.left = b === "fontSize" ? "1em" : f || 0;
            f = h.pixelLeft + "px";
            h.left = d;
            a.runtimeStyle.left = e
        }
        return f === "" ? "auto" : f
    };
    W = Ga || aa;
    if (c.expr && c.expr.filters) {
        c.expr.filters.hidden = function (a) {
            var b = a.offsetHeight;
            return a.offsetWidth === 0 && b === 0 || !c.support.reliableHiddenOffsets && (a.style.display || c.css(a, "display")) === "none"
        };
        c.expr.filters.visible = function (a) {
            return !c.expr.filters.hidden(a)
        }
    }
    var mb = c.now(), nb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ob = /^(?:select|textarea)/i, pb = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, qb = /^(?:GET|HEAD)$/, Ra = /\[\]$/, T = /\=\?(&|$)/, ja = /\?/, rb = /([?&])_=[^&]*/, sb = /^(\w+:)?\/\/([^\/?#]+)/, tb = /%20/g, ub = /#.*$/, Ha = c.fn.load;
    c.fn.extend({
        load: function (a, b, d) {
            if (typeof a !== "string" && Ha)return Ha.apply(this, arguments); else if (!this.length)return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var f = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            e = "GET";
            if (b)if (c.isFunction(b)) {
                d = b;
                b = null
            } else if (typeof b ===
                "object") {
                b = c.param(b, c.ajaxSettings.traditional);
                e = "POST"
            }
            var h = this;
            c.ajax({
                url: a, type: e, dataType: "html", data: b, complete: function (l, k) {
                    if (k === "success" || k === "notmodified")h.html(f ? c("<div>").append(l.responseText.replace(nb, "")).find(f) : l.responseText);
                    d && h.each(d, [l.responseText, k, l])
                }
            });
            return this
        }, serialize: function () {
            return c.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? c.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || ob.test(this.nodeName) || pb.test(this.type))
            }).map(function (a, b) {
                var d = c(this).val();
                return d == null ? null : c.isArray(d) ? c.map(d, function (e) {
                    return {name: b.name, value: e}
                }) : {name: b.name, value: d}
            }).get()
        }
    });
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        c.fn[b] = function (d) {
            return this.bind(b, d)
        }
    });
    c.extend({
        get: function (a, b, d, e) {
            if (c.isFunction(b)) {
                e = e || d;
                d = b;
                b = null
            }
            return c.ajax({type: "GET", url: a, data: b, success: d, dataType: e})
        },
        getScript: function (a, b) {
            return c.get(a, null, b, "script")
        }, getJSON: function (a, b, d) {
            return c.get(a, b, d, "json")
        }, post: function (a, b, d, e) {
            if (c.isFunction(b)) {
                e = e || d;
                d = b;
                b = {}
            }
            return c.ajax({type: "POST", url: a, data: b, success: d, dataType: e})
        }, ajaxSetup: function (a) {
            c.extend(c.ajaxSettings, a)
        }, ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function () {
                return new E.XMLHttpRequest
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        }, ajax: function (a) {
            var b = c.extend(true, {}, c.ajaxSettings, a), d, e, f, h = b.type.toUpperCase(), l = qb.test(h);
            b.url = b.url.replace(ub, "");
            b.context = a && a.context != null ? a.context : b;
            if (b.data && b.processData && typeof b.data !== "string")b.data = c.param(b.data, b.traditional);
            if (b.dataType === "jsonp") {
                if (h === "GET")T.test(b.url) || (b.url += (ja.test(b.url) ? "&" : "?") + (b.jsonp || "callback") + "=?"); else if (!b.data || !T.test(b.data))b.data = (b.data ? b.data + "&" : "") + (b.jsonp || "callback") + "=?";
                b.dataType = "json"
            }
            if (b.dataType === "json" && (b.data && T.test(b.data) || T.test(b.url))) {
                d = b.jsonpCallback || "jsonp" + mb++;
                if (b.data)b.data = (b.data + "").replace(T, "=" + d + "$1");
                b.url = b.url.replace(T, "=" + d + "$1");
                b.dataType = "script";
                var k = E[d];
                E[d] = function (m) {
                    if (c.isFunction(k))k(m); else {
                        E[d] = B;
                        try {
                            delete E[d]
                        } catch (p) {
                        }
                    }
                    f = m;
                    c.handleSuccess(b, w, e, f);
                    c.handleComplete(b, w, e, f);
                    r && r.removeChild(A)
                }
            }
            if (b.dataType === "script" && b.cache === null)b.cache =
                false;
            if (b.cache === false && l) {
                var o = c.now(), x = b.url.replace(rb, "$1_=" + o);
                b.url = x + (x === b.url ? (ja.test(b.url) ? "&" : "?") + "_=" + o : "")
            }
            if (b.data && l)b.url += (ja.test(b.url) ? "&" : "?") + b.data;
            b.global && c.active++ === 0 && c.event.trigger("ajaxStart");
            o = (o = sb.exec(b.url)) && (o[1] && o[1].toLowerCase() !== location.protocol || o[2].toLowerCase() !== location.host);
            if (b.dataType === "script" && h === "GET" && o) {
                var r = t.getElementsByTagName("head")[0] || t.documentElement, A = t.createElement("script");
                if (b.scriptCharset)A.charset = b.scriptCharset;
                A.src = b.url;
                if (!d) {
                    var C = false;
                    A.onload = A.onreadystatechange = function () {
                        if (!C && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            C = true;
                            c.handleSuccess(b, w, e, f);
                            c.handleComplete(b, w, e, f);
                            A.onload = A.onreadystatechange = null;
                            r && A.parentNode && r.removeChild(A)
                        }
                    }
                }
                r.insertBefore(A, r.firstChild);
                return B
            }
            var J = false, w = b.xhr();
            if (w) {
                b.username ? w.open(h, b.url, b.async, b.username, b.password) : w.open(h, b.url, b.async);
                try {
                    if (b.data != null && !l || a && a.contentType)w.setRequestHeader("Content-Type",
                        b.contentType);
                    if (b.ifModified) {
                        c.lastModified[b.url] && w.setRequestHeader("If-Modified-Since", c.lastModified[b.url]);
                        c.etag[b.url] && w.setRequestHeader("If-None-Match", c.etag[b.url])
                    }
                    o || w.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    w.setRequestHeader("Accept", b.dataType && b.accepts[b.dataType] ? b.accepts[b.dataType] + ", */*; q=0.01" : b.accepts._default)
                } catch (I) {
                }
                if (b.beforeSend && b.beforeSend.call(b.context, w, b) === false) {
                    b.global && c.active-- === 1 && c.event.trigger("ajaxStop");
                    w.abort();
                    return false
                }
                b.global &&
                c.triggerGlobal(b, "ajaxSend", [w, b]);
                var L = w.onreadystatechange = function (m) {
                    if (!w || w.readyState === 0 || m === "abort") {
                        J || c.handleComplete(b, w, e, f);
                        J = true;
                        if (w)w.onreadystatechange = c.noop
                    } else if (!J && w && (w.readyState === 4 || m === "timeout")) {
                        J = true;
                        w.onreadystatechange = c.noop;
                        e = m === "timeout" ? "timeout" : !c.httpSuccess(w) ? "error" : b.ifModified && c.httpNotModified(w, b.url) ? "notmodified" : "success";
                        var p;
                        if (e === "success")try {
                            f = c.httpData(w, b.dataType, b)
                        } catch (q) {
                            e = "parsererror";
                            p = q
                        }
                        if (e === "success" || e === "notmodified")d ||
                        c.handleSuccess(b, w, e, f); else c.handleError(b, w, e, p);
                        d || c.handleComplete(b, w, e, f);
                        m === "timeout" && w.abort();
                        if (b.async)w = null
                    }
                };
                try {
                    var g = w.abort;
                    w.abort = function () {
                        w && Function.prototype.call.call(g, w);
                        L("abort")
                    }
                } catch (i) {
                }
                b.async && b.timeout > 0 && setTimeout(function () {
                    w && !J && L("timeout")
                }, b.timeout);
                try {
                    w.send(l || b.data == null ? null : b.data)
                } catch (n) {
                    c.handleError(b, w, null, n);
                    c.handleComplete(b, w, e, f)
                }
                b.async || L();
                return w
            }
        }, param: function (a, b) {
            var d = [], e = function (h, l) {
                l = c.isFunction(l) ? l() : l;
                d[d.length] =
                    encodeURIComponent(h) + "=" + encodeURIComponent(l)
            };
            if (b === B)b = c.ajaxSettings.traditional;
            if (c.isArray(a) || a.jquery)c.each(a, function () {
                e(this.name, this.value)
            }); else for (var f in a)da(f, a[f], b, e);
            return d.join("&").replace(tb, "+")
        }
    });
    c.extend({
        active: 0, lastModified: {}, etag: {}, handleError: function (a, b, d, e) {
            a.error && a.error.call(a.context, b, d, e);
            a.global && c.triggerGlobal(a, "ajaxError", [b, a, e])
        }, handleSuccess: function (a, b, d, e) {
            a.success && a.success.call(a.context, e, d, b);
            a.global && c.triggerGlobal(a, "ajaxSuccess",
                [b, a])
        }, handleComplete: function (a, b, d) {
            a.complete && a.complete.call(a.context, b, d);
            a.global && c.triggerGlobal(a, "ajaxComplete", [b, a]);
            a.global && c.active-- === 1 && c.event.trigger("ajaxStop")
        }, triggerGlobal: function (a, b, d) {
            (a.context && a.context.url == null ? c(a.context) : c.event).trigger(b, d)
        }, httpSuccess: function (a) {
            try {
                return !a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status === 1223
            } catch (b) {
            }
            return false
        }, httpNotModified: function (a, b) {
            var d = a.getResponseHeader("Last-Modified"),
                e = a.getResponseHeader("Etag");
            if (d)c.lastModified[b] = d;
            if (e)c.etag[b] = e;
            return a.status === 304
        }, httpData: function (a, b, d) {
            var e = a.getResponseHeader("content-type") || "", f = b === "xml" || !b && e.indexOf("xml") >= 0;
            a = f ? a.responseXML : a.responseText;
            f && a.documentElement.nodeName === "parsererror" && c.error("parsererror");
            if (d && d.dataFilter)a = d.dataFilter(a, b);
            if (typeof a === "string")if (b === "json" || !b && e.indexOf("json") >= 0)a = c.parseJSON(a); else if (b === "script" || !b && e.indexOf("javascript") >= 0)c.globalEval(a);
            return a
        }
    });
    if (E.ActiveXObject)c.ajaxSettings.xhr = function () {
        if (E.location.protocol !== "file:")try {
            return new E.XMLHttpRequest
        } catch (a) {
        }
        try {
            return new E.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    };
    c.support.ajax = !!c.ajaxSettings.xhr();
    var ea = {}, vb = /^(?:toggle|show|hide)$/, wb = /^([+\-]=)?([\d+.\-]+)(.*)$/, ba, pa = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    c.fn.extend({
        show: function (a, b, d) {
            if (a || a === 0)return this.animate(S("show",
                3), a, b, d); else {
                d = 0;
                for (var e = this.length; d < e; d++) {
                    a = this[d];
                    b = a.style.display;
                    if (!c.data(a, "olddisplay") && b === "none")b = a.style.display = "";
                    b === "" && c.css(a, "display") === "none" && c.data(a, "olddisplay", qa(a.nodeName))
                }
                for (d = 0; d < e; d++) {
                    a = this[d];
                    b = a.style.display;
                    if (b === "" || b === "none")a.style.display = c.data(a, "olddisplay") || ""
                }
                return this
            }
        }, hide: function (a, b, d) {
            if (a || a === 0)return this.animate(S("hide", 3), a, b, d); else {
                a = 0;
                for (b = this.length; a < b; a++) {
                    d = c.css(this[a], "display");
                    d !== "none" && c.data(this[a], "olddisplay",
                        d)
                }
                for (a = 0; a < b; a++)this[a].style.display = "none";
                return this
            }
        }, _toggle: c.fn.toggle, toggle: function (a, b, d) {
            var e = typeof a === "boolean";
            if (c.isFunction(a) && c.isFunction(b))this._toggle.apply(this, arguments); else a == null || e ? this.each(function () {
                var f = e ? a : c(this).is(":hidden");
                c(this)[f ? "show" : "hide"]()
            }) : this.animate(S("toggle", 3), a, b, d);
            return this
        }, fadeTo: function (a, b, d, e) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, d, e)
        }, animate: function (a, b, d, e) {
            var f = c.speed(b,
                d, e);
            if (c.isEmptyObject(a))return this.each(f.complete);
            return this[f.queue === false ? "each" : "queue"](function () {
                var h = c.extend({}, f), l, k = this.nodeType === 1, o = k && c(this).is(":hidden"), x = this;
                for (l in a) {
                    var r = c.camelCase(l);
                    if (l !== r) {
                        a[r] = a[l];
                        delete a[l];
                        l = r
                    }
                    if (a[l] === "hide" && o || a[l] === "show" && !o)return h.complete.call(this);
                    if (k && (l === "height" || l === "width")) {
                        h.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (c.css(this, "display") === "inline" && c.css(this, "float") === "none")if (c.support.inlineBlockNeedsLayout)if (qa(this.nodeName) ===
                            "inline")this.style.display = "inline-block"; else {
                            this.style.display = "inline";
                            this.style.zoom = 1
                        } else this.style.display = "inline-block"
                    }
                    if (c.isArray(a[l])) {
                        (h.specialEasing = h.specialEasing || {})[l] = a[l][1];
                        a[l] = a[l][0]
                    }
                }
                if (h.overflow != null)this.style.overflow = "hidden";
                h.curAnim = c.extend({}, a);
                c.each(a, function (A, C) {
                    var J = new c.fx(x, h, A);
                    if (vb.test(C))J[C === "toggle" ? o ? "show" : "hide" : C](a); else {
                        var w = wb.exec(C), I = J.cur() || 0;
                        if (w) {
                            var L = parseFloat(w[2]), g = w[3] || "px";
                            if (g !== "px") {
                                c.style(x, A, (L || 1) + g);
                                I = (L ||
                                    1) / J.cur() * I;
                                c.style(x, A, I + g)
                            }
                            if (w[1])L = (w[1] === "-=" ? -1 : 1) * L + I;
                            J.custom(I, L, g)
                        } else J.custom(I, C, "")
                    }
                });
                return true
            })
        }, stop: function (a, b) {
            var d = c.timers;
            a && this.queue([]);
            this.each(function () {
                for (var e = d.length - 1; e >= 0; e--)if (d[e].elem === this) {
                    b && d[e](true);
                    d.splice(e, 1)
                }
            });
            b || this.dequeue();
            return this
        }
    });
    c.each({
        slideDown: S("show", 1),
        slideUp: S("hide", 1),
        slideToggle: S("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        c.fn[a] = function (d, e, f) {
            return this.animate(b,
                d, e, f)
        }
    });
    c.extend({
        speed: function (a, b, d) {
            var e = a && typeof a === "object" ? c.extend({}, a) : {
                complete: d || !d && b || c.isFunction(a) && a,
                duration: a,
                easing: d && b || b && !c.isFunction(b) && b
            };
            e.duration = c.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in c.fx.speeds ? c.fx.speeds[e.duration] : c.fx.speeds._default;
            e.old = e.complete;
            e.complete = function () {
                e.queue !== false && c(this).dequeue();
                c.isFunction(e.old) && e.old.call(this)
            };
            return e
        }, easing: {
            linear: function (a, b, d, e) {
                return d + e * a
            }, swing: function (a, b, d, e) {
                return (-Math.cos(a *
                        Math.PI) / 2 + 0.5) * e + d
            }
        }, timers: [], fx: function (a, b, d) {
            this.options = b;
            this.elem = a;
            this.prop = d;
            if (!b.orig)b.orig = {}
        }
    });
    c.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this);
            (c.fx.step[this.prop] || c.fx.step._default)(this)
        }, cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
            var a = parseFloat(c.css(this.elem, this.prop));
            return a && a > -1E4 ? a : 0
        }, custom: function (a, b, d) {
            function e(l) {
                return f.step(l)
            }

            var f = this, h = c.fx;
            this.startTime = c.now();
            this.start = a;
            this.end = b;
            this.unit = d || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            e.elem = this.elem;
            if (e() && c.timers.push(e) && !ba)ba = setInterval(h.tick, h.interval)
        }, show: function () {
            this.options.orig[this.prop] = c.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            c(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = c.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        }, step: function (a) {
            var b = c.now(), d = true;
            if (a || b >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                for (var e in this.options.curAnim)if (this.options.curAnim[e] !== true)d = false;
                if (d) {
                    if (this.options.overflow != null && !c.support.shrinkWrapBlocks) {
                        var f = this.elem, h = this.options;
                        c.each(["", "X", "Y"], function (k, o) {
                            f.style["overflow" + o] = h.overflow[k]
                        })
                    }
                    this.options.hide && c(this.elem).hide();
                    if (this.options.hide ||
                        this.options.show)for (var l in this.options.curAnim)c.style(this.elem, l, this.options.orig[l]);
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                a = b - this.startTime;
                this.state = a / this.options.duration;
                b = this.options.easing || (c.easing.swing ? "swing" : "linear");
                this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || b](this.state, a, 0, 1, this.options.duration);
                this.now = this.start + (this.end - this.start) * this.pos;
                this.update()
            }
            return true
        }
    };
    c.extend(c.fx, {
        tick: function () {
            for (var a =
                c.timers, b = 0; b < a.length; b++)a[b]() || a.splice(b--, 1);
            a.length || c.fx.stop()
        }, interval: 13, stop: function () {
            clearInterval(ba);
            ba = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (a) {
                c.style(a.elem, "opacity", a.now)
            }, _default: function (a) {
                if (a.elem.style && a.elem.style[a.prop] != null)a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit; else a.elem[a.prop] = a.now
            }
        }
    });
    if (c.expr && c.expr.filters)c.expr.filters.animated = function (a) {
        return c.grep(c.timers, function (b) {
            return a ===
                b.elem
        }).length
    };
    var xb = /^t(?:able|d|h)$/i, Ia = /^(?:body|html)$/i;
    c.fn.offset = "getBoundingClientRect" in t.documentElement ? function (a) {
        var b = this[0], d;
        if (a)return this.each(function (l) {
            c.offset.setOffset(this, a, l)
        });
        if (!b || !b.ownerDocument)return null;
        if (b === b.ownerDocument.body)return c.offset.bodyOffset(b);
        try {
            d = b.getBoundingClientRect()
        } catch (e) {
        }
        var f = b.ownerDocument, h = f.documentElement;
        if (!d || !c.contains(h, b))return d || {top: 0, left: 0};
        b = f.body;
        f = fa(f);
        return {
            top: d.top + (f.pageYOffset || c.support.boxModel &&
            h.scrollTop || b.scrollTop) - (h.clientTop || b.clientTop || 0),
            left: d.left + (f.pageXOffset || c.support.boxModel && h.scrollLeft || b.scrollLeft) - (h.clientLeft || b.clientLeft || 0)
        }
    } : function (a) {
        var b = this[0];
        if (a)return this.each(function (x) {
            c.offset.setOffset(this, a, x)
        });
        if (!b || !b.ownerDocument)return null;
        if (b === b.ownerDocument.body)return c.offset.bodyOffset(b);
        c.offset.initialize();
        var d, e = b.offsetParent, f = b.ownerDocument, h = f.documentElement, l = f.body;
        d = (f = f.defaultView) ? f.getComputedStyle(b, null) : b.currentStyle;
        for (var k = b.offsetTop, o = b.offsetLeft; (b = b.parentNode) && b !== l && b !== h;) {
            if (c.offset.supportsFixedPosition && d.position === "fixed")break;
            d = f ? f.getComputedStyle(b, null) : b.currentStyle;
            k -= b.scrollTop;
            o -= b.scrollLeft;
            if (b === e) {
                k += b.offsetTop;
                o += b.offsetLeft;
                if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && xb.test(b.nodeName))) {
                    k += parseFloat(d.borderTopWidth) || 0;
                    o += parseFloat(d.borderLeftWidth) || 0
                }
                e = b.offsetParent
            }
            if (c.offset.subtractsBorderForOverflowNotVisible && d.overflow !== "visible") {
                k +=
                    parseFloat(d.borderTopWidth) || 0;
                o += parseFloat(d.borderLeftWidth) || 0
            }
            d = d
        }
        if (d.position === "relative" || d.position === "static") {
            k += l.offsetTop;
            o += l.offsetLeft
        }
        if (c.offset.supportsFixedPosition && d.position === "fixed") {
            k += Math.max(h.scrollTop, l.scrollTop);
            o += Math.max(h.scrollLeft, l.scrollLeft)
        }
        return {top: k, left: o}
    };
    c.offset = {
        initialize: function () {
            var a = t.body, b = t.createElement("div"), d, e, f, h = parseFloat(c.css(a, "marginTop")) || 0;
            c.extend(b.style, {
                position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px",
                height: "1px", visibility: "hidden"
            });
            b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            a.insertBefore(b, a.firstChild);
            d = b.firstChild;
            e = d.firstChild;
            f = d.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = e.offsetTop !== 5;
            this.doesAddBorderForTableAndCells =
                f.offsetTop === 5;
            e.style.position = "fixed";
            e.style.top = "20px";
            this.supportsFixedPosition = e.offsetTop === 20 || e.offsetTop === 15;
            e.style.position = e.style.top = "";
            d.style.overflow = "hidden";
            d.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = e.offsetTop === -5;
            this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== h;
            a.removeChild(b);
            c.offset.initialize = c.noop
        }, bodyOffset: function (a) {
            var b = a.offsetTop, d = a.offsetLeft;
            c.offset.initialize();
            if (c.offset.doesNotIncludeMarginInBodyOffset) {
                b += parseFloat(c.css(a,
                        "marginTop")) || 0;
                d += parseFloat(c.css(a, "marginLeft")) || 0
            }
            return {top: b, left: d}
        }, setOffset: function (a, b, d) {
            var e = c.css(a, "position");
            if (e === "static")a.style.position = "relative";
            var f = c(a), h = f.offset(), l = c.css(a, "top"), k = c.css(a, "left"), o = e === "absolute" && c.inArray("auto", [l, k]) > -1;
            e = {};
            var x = {};
            if (o)x = f.position();
            l = o ? x.top : parseInt(l, 10) || 0;
            k = o ? x.left : parseInt(k, 10) || 0;
            if (c.isFunction(b))b = b.call(a, d, h);
            if (b.top != null)e.top = b.top - h.top + l;
            if (b.left != null)e.left = b.left - h.left + k;
            "using" in b ? b.using.call(a,
                e) : f.css(e)
        }
    };
    c.fn.extend({
        position: function () {
            if (!this[0])return null;
            var a = this[0], b = this.offsetParent(), d = this.offset(), e = Ia.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            d.top -= parseFloat(c.css(a, "marginTop")) || 0;
            d.left -= parseFloat(c.css(a, "marginLeft")) || 0;
            e.top += parseFloat(c.css(b[0], "borderTopWidth")) || 0;
            e.left += parseFloat(c.css(b[0], "borderLeftWidth")) || 0;
            return {top: d.top - e.top, left: d.left - e.left}
        }, offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || t.body; a && !Ia.test(a.nodeName) &&
                c.css(a, "position") === "static";)a = a.offsetParent;
                return a
            })
        }
    });
    c.each(["Left", "Top"], function (a, b) {
        var d = "scroll" + b;
        c.fn[d] = function (e) {
            var f = this[0], h;
            if (!f)return null;
            if (e !== B)return this.each(function () {
                if (h = fa(this))h.scrollTo(!a ? e : c(h).scrollLeft(), a ? e : c(h).scrollTop()); else this[d] = e
            }); else return (h = fa(f)) ? "pageXOffset" in h ? h[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && h.document.documentElement[d] || h.document.body[d] : f[d]
        }
    });
    c.each(["Height", "Width"], function (a, b) {
        var d = b.toLowerCase();
        c.fn["inner" + b] = function () {
            return this[0] ? parseFloat(c.css(this[0], d, "padding")) : null
        };
        c.fn["outer" + b] = function (e) {
            return this[0] ? parseFloat(c.css(this[0], d, e ? "margin" : "border")) : null
        };
        c.fn[d] = function (e) {
            var f = this[0];
            if (!f)return e == null ? null : this;
            if (c.isFunction(e))return this.each(function (l) {
                var k = c(this);
                k[d](e.call(this, l, k[d]()))
            });
            if (c.isWindow(f))return f.document.compatMode === "CSS1Compat" && f.document.documentElement["client" + b] || f.document.body["client" + b]; else if (f.nodeType === 9)return Math.max(f.documentElement["client" +
            b], f.body["scroll" + b], f.documentElement["scroll" + b], f.body["offset" + b], f.documentElement["offset" + b]); else if (e === B) {
                f = c.css(f, d);
                var h = parseFloat(f);
                return c.isNaN(h) ? f : h
            } else return this.css(d, typeof e === "string" ? e : e + "px")
        }
    })
})(window);


//jQuery UI 1.9m2
(function (a) {
    a.ui = a.ui || {};
    if (a.ui.version) {
        return
    }
    a.extend(a.ui, {
        version: "1.9m2",
        plugin: {
            add: function (c, d, f) {
                var e = a.ui[c].prototype;
                for (var b in f) {
                    e.plugins[b] = e.plugins[b] || [];
                    e.plugins[b].push([d, f[b]])
                }
            }, call: function (b, d, c) {
                var f = b.plugins[d];
                if (!f || !b.element[0].parentNode) {
                    return
                }
                for (var e = 0; e < f.length; e++) {
                    if (b.options[f[e][0]]) {
                        f[e][1].apply(b.element, c)
                    }
                }
            }
        },
        contains: function (d, c) {
            return document.compareDocumentPosition ? d.compareDocumentPosition(c) & 16 : d !== c && d.contains(c)
        },
        hasScroll: function (e, c) {
            if (a(e).css("overflow") == "hidden") {
                return false
            }
            var b = (c && c == "left") ? "scrollLeft" : "scrollTop", d = false;
            if (e[b] > 0) {
                return true
            }
            e[b] = 1;
            d = (e[b] > 0);
            e[b] = 0;
            return d
        },
        isOverAxis: function (c, b, d) {
            return (c > b) && (c < (b + d))
        },
        isOver: function (g, c, f, e, b, d) {
            return a.ui.isOverAxis(g, f, b) && a.ui.isOverAxis(c, e, d)
        },
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    });
    a.fn.extend({
        _focus: a.fn.focus, focus: function (b, c) {
            return typeof b === "number" ? this.each(function () {
                var d = this;
                setTimeout(function () {
                    a(d).focus();
                    (c && c.call(d))
                }, b)
            }) : this._focus.apply(this, arguments)
        }, enableSelection: function () {
            return this.attr("unselectable", "off").css("MozUserSelect", "")
        }, disableSelection: function () {
            return this.attr("unselectable", "on").css("MozUserSelect", "none")
        }, scrollParent: function () {
            var b;
            if ((a.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                b = this.parents().filter(function () {
                    return (/(relative|absolute|fixed)/).test(a.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                }).eq(0)
            } else {
                b = this.parents().filter(function () {
                    return (/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !b.length ? a(document) : b
        }, zIndex: function (e) {
            if (e !== undefined) {
                return this.css("zIndex", e)
            }
            if (this.length) {
                var c = a(this[0]), b, d;
                while (c.length && c[0] !== document) {
                    b = c.css("position");
                    if (b == "absolute" || b == "relative" || b == "fixed") {
                        d = parseInt(c.css("zIndex"));
                        if (!isNaN(d) && d != 0) {
                            return d
                        }
                    }
                    c = c.parent()
                }
            }
            return 0
        }
    });
    a.extend(a.expr[":"], {
        data: function (d, c, b) {
            return !!a.data(d, b[3])
        }, focusable: function (c) {
            var d = c.nodeName.toLowerCase(), b = a.attr(c, "tabindex");
            return (/input|select|textarea|button|object/.test(d) ? !c.disabled : "a" == d || "area" == d ? c.href || !isNaN(b) : !isNaN(b)) && !a(c)["area" == d ? "parents" : "closest"](":hidden").length
        }, tabbable: function (c) {
            var b = a.attr(c, "tabindex");
            return (isNaN(b) || b >= 0) && a(c).is(":focusable")
        }
    })
})(jQuery);
//jQuery UI Widget 1.9m2
(function (b) {
    var a = b.fn.remove;
    b.fn.remove = function (c, d) {
        return this.each(function () {
            if (!d) {
                if (!c || b.filter(c, [this]).length) {
                    b("*", this).add(this).each(function () {
                        b(this).triggerHandler("remove")
                    })
                }
            }
            return a.call(b(this), c, d)
        })
    };
    b.widget = function (d, f, c) {
        var e = d.split(".")[0], h;
        d = d.split(".")[1];
        h = e + "-" + d;
        if (!c) {
            c = f;
            f = b.Widget
        }
        b.expr[":"][h] = function (i) {
            return !!b.data(i, d)
        };
        b[e] = b[e] || {};
        b[e][d] = function (i, j) {
            if (arguments.length) {
                this._createWidget(i, j)
            }
        };
        var g = new f();
        g.options = b.extend({}, g.options);
        b[e][d].prototype = b.extend(true, g, {
            namespace: e,
            widgetName: d,
            widgetEventPrefix: b[e][d].prototype.widgetEventPrefix || d,
            widgetBaseClass: h,
            base: f.prototype
        }, c);
        b.widget.bridge(d, b[e][d])
    };
    b.widget.bridge = function (d, c) {
        b.fn[d] = function (g) {
            var e = typeof g === "string", f = Array.prototype.slice.call(arguments, 1), h = this;
            g = !e && f.length ? b.extend.apply(null, [true, g].concat(f)) : g;
            if (e && g.substring(0, 1) === "_") {
                return h
            }
            if (e) {
                this.each(function () {
                    var i = b.data(this, d), j = i && b.isFunction(i[g]) ? i[g].apply(i, f) : i;
                    if (j !== i && j !== undefined) {
                        h = j;
                        return false
                    }
                })
            } else {
                this.each(function () {
                    var i = b.data(this, d);
                    if (i) {
                        if (g) {
                            i.option(g)
                        }
                        i._init()
                    } else {
                        b.data(this, d, new c(g, this))
                    }
                })
            }
            return h
        }
    };
    b.Widget = function (c, d) {
        if (arguments.length) {
            this._createWidget(c, d)
        }
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {disabled: false},
        _createWidget: function (d, e) {
            this.element = b(e).data(this.widgetName, this);
            this.options = b.extend(true, {}, this.options, b.metadata && b.metadata.get(e)[this.widgetName], d);
            var c = this;
            this.element.bind("remove." + this.widgetName, function () {
                c.destroy()
            });
            this._create();
            this._init()
        },
        _create: function () {
        },
        _init: function () {
        },
        _super: function (c) {
            return this.base[c].apply(this, Array.prototype.slice.call(arguments, 1))
        },
        _superApply: function (d, c) {
            return this.base[d].apply(this, c)
        },
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (e, f) {
            var d = e, c = this;
            if (arguments.length === 0) {
                return b.extend({}, c.options)
            }
            if (typeof e === "string") {
                if (f === undefined) {
                    return this.options[e]
                }
                d = {};
                d[e] = f
            }
            b.each(d, function (g, h) {
                c._setOption(g, h)
            });
            return c
        },
        _setOption: function (c, d) {
            this.options[c] = d;
            if (c === "disabled") {
                this.widget()[d ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", d)
            }
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (d, e, f) {
            var h = this.options[d];
            e = b.Event(e);
            e.type = (d === this.widgetEventPrefix ? d : this.widgetEventPrefix + d).toLowerCase();
            f = f || {};
            if (e.originalEvent) {
                for (var c = b.event.props.length, g; c;) {
                    g = b.event.props[--c];
                    e[g] = e.originalEvent[g]
                }
            }
            this.element.trigger(e, f);
            return !(b.isFunction(h) && h.call(this.element[0], e, f) === false || e.isDefaultPrevented())
        }
    }
})(jQuery);
//jQuery UI Mouse 1.9m2
(function (a) {
    a.widget("ui.mouse", {
        options: {cancel: ":input,option", distance: 1, delay: 0}, _mouseInit: function () {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function (c) {
                return b._mouseDown(c)
            }).bind("click." + this.widgetName, function (c) {
                if (b._preventClickEvent) {
                    b._preventClickEvent = false;
                    c.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        }, _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        }, _mouseDown: function (d) {
            d.originalEvent = d.originalEvent || {};
            if (d.originalEvent.mouseHandled) {
                return
            }
            (this._mouseStarted && this._mouseUp(d));
            this._mouseDownEvent = d;
            var c = this, e = (d.which == 1), b = (typeof this.options.cancel == "string" ? a(d.target).parents().add(d.target).filter(this.options.cancel).length : false);
            if (!e || b || !this._mouseCapture(d)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    c.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(d) && this._mouseDelayMet(d)) {
                this._mouseStarted = (this._mouseStart(d) !== false);
                if (!this._mouseStarted) {
                    d.preventDefault();
                    return true
                }
            }
            this._mouseMoveDelegate = function (f) {
                return c._mouseMove(f)
            };
            this._mouseUpDelegate = function (f) {
                return c._mouseUp(f)
            };
            a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            (a.browser.safari || d.preventDefault());
            d.originalEvent.mouseHandled = true;
            return true
        }, _mouseMove: function (b) {
            if (a.browser.msie && !b.button) {
                return this._mouseUp(b)
            }
            if (this._mouseStarted) {
                this._mouseDrag(b);
                return b.preventDefault()
            }
            if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, b) !== false);
                (this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b))
            }
            return !this._mouseStarted
        }, _mouseUp: function (b) {
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = (b.target == this._mouseDownEvent.target);
                this._mouseStop(b)
            }
            return false
        }, _mouseDistanceMet: function (b) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - b.pageX), Math.abs(this._mouseDownEvent.pageY - b.pageY)) >= this.options.distance)
        }, _mouseDelayMet: function (b) {
            return this.mouseDelayMet
        }, _mouseStart: function (b) {
        }, _mouseDrag: function (b) {
        }, _mouseStop: function (b) {
        }, _mouseCapture: function (b) {
            return true
        }
    })
})(jQuery);
(function (a) {
    a.widget("ui.draggable", a.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function () {
            if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            (this.options.addClasses && this.element.addClass("ui-draggable"));
            (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
            this._mouseInit()
        },
        destroy: function () {
            if (!this.element.data("draggable")) {
                return
            }
            this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (b) {
            var c = this.options;
            if (this.helper || c.disabled || a(b.target).is(".ui-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(b);
            if (!this.handle) {
                return false
            }
            return true
        },
        _mouseStart: function (b) {
            var c = this.options;
            this.helper = this._createHelper(b);
            this._cacheHelperProportions();
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
            a.extend(this.offset, {
                click: {left: b.pageX - this.offset.left, top: b.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(b);
            this.originalPageX = b.pageX;
            this.originalPageY = b.pageY;
            (c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt));
            if (c.containment) {
                this._setContainment()
            }
            if (this._trigger("start", b) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (a.ui.ddmanager && !c.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(b, true);
            return true
        },
        _mouseDrag: function (b, d) {
            this.position = this._generatePosition(b);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!d) {
                var c = this._uiHash();
                if (this._trigger("drag", b, c) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = c.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, b)
            }
            return false
        },
        _mouseStop: function (c) {
            var d = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                d = a.ui.ddmanager.drop(this, c)
            }
            if (this.dropped) {
                d = this.dropped;
                this.dropped = false
            }
            if (!this.element[0] || !this.element[0].parentNode) {
                return false
            }
            if ((this.options.revert == "invalid" && !d) || (this.options.revert == "valid" && d) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, d))) {
                var b = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    if (b._trigger("stop", c) !== false) {
                        b._clear()
                    }
                })
            } else {
                if (this._trigger("stop", c) !== false) {
                    this._clear()
                }
            }
            return false
        },
        cancel: function () {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function (b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == b.target) {
                    c = true
                }
            });
            return c
        },
        _createHelper: function (c) {
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c])) : (d.helper == "clone" ? this.element.clone() : this.element);
            if (!b.parents("body").length) {
                b.appendTo((d.appendTo == "parent" ? this.element[0].parentNode : d.appendTo))
            }
            if (b[0] != this.element[0] && !(/(fixed|absolute)/).test(b.css("position"))) {
                b.css("position", "absolute")
            }
            return b
        },
        _adjustOffsetFromHelper: function (b) {
            if (typeof b == "string") {
                b = b.split(" ")
            }
            if (a.isArray(b)) {
                b = {left: +b[0], top: +b[1] || 0}
            }
            if ("left" in b) {
                this.offset.click.left = b.left + this.margins.left
            }
            if ("right" in b) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if ("top" in b) {
                this.offset.click.top = b.top + this.margins.top
            }
            if ("bottom" in b) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {top: 0, left: 0}
            }
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var b = this.element.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {top: 0, left: 0}
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment) && e.containment.constructor != Array) {
                var c = a(e.containment)[0];
                if (!c) {
                    return
                }
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            } else {
                if (e.containment.constructor == Array) {
                    this.containment = e.containment
                }
            }
        },
        _convertPositionTo: function (f, h) {
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
            return {
                top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),
                left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))
            }
        },
        _generatePosition: function (e) {
            var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {
                top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),
                left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (b, c, d) {
            d = d || this._uiHash();
            a.ui.plugin.call(this, b, [c, d]);
            if (b == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return a.Widget.prototype._trigger.call(this, b, c, d)
        },
        plugins: {},
        _uiHash: function (b) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    a.extend(a.ui.draggable, {version: "1.9m2"});
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function (c, e) {
            var d = a(this).data("draggable"), f = d.options, b = a.extend({}, e, {item: d.element});
            d.sortables = [];
            a(f.connectToSortable).each(function () {
                var g = a.data(this, "sortable");
                if (g && !g.options.disabled) {
                    d.sortables.push({instance: g, shouldRevert: g.options.revert});
                    g._refreshItems();
                    g._trigger("activate", c, b)
                }
            })
        }, stop: function (c, e) {
            var d = a(this).data("draggable"), b = a.extend({}, e, {item: d.element});
            a.each(d.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    d.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(c);
                    this.instance.options.helper = this.instance.options._helper;
                    if (d.options.helper == "original") {
                        this.instance.currentItem.css({top: "auto", left: "auto"})
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", c, b)
                }
            })
        }, drag: function (c, f) {
            var e = a(this).data("draggable"), b = this;
            var d = function (i) {
                var n = this.offset.click.top, m = this.offset.click.left;
                var g = this.positionAbs.top, k = this.positionAbs.left;
                var j = i.height, l = i.width;
                var p = i.top, h = i.left;
                return a.ui.isOver(g + n, k + m, p, h, j, l)
            };
            a.each(e.sortables, function (g) {
                this.instance.positionAbs = e.positionAbs;
                this.instance.helperProportions = e.helperProportions;
                this.instance.offset.click = e.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = a(b).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return f.helper[0]
                        };
                        c.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(c, true);
                        this.instance._mouseStart(c, true, true);
                        this.instance.offset.click.top = e.offset.click.top;
                        this.instance.offset.click.left = e.offset.click.left;
                        this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
                        e._trigger("toSortable", c);
                        e.dropped = this.instance.element;
                        e.currentItem = e.element;
                        this.instance.fromOutside = e
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(c)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", c, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(c, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        e._trigger("fromSortable", c);
                        e.dropped = false
                    }
                }
            })
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function (c, d) {
            var b = a("body"), e = a(this).data("draggable").options;
            if (b.css("cursor")) {
                e._cursor = b.css("cursor")
            }
            b.css("cursor", e.cursor)
        }, stop: function (b, c) {
            var d = a(this).data("draggable").options;
            if (d._cursor) {
                a("body").css("cursor", d._cursor)
            }
        }
    });
    a.ui.plugin.add("draggable", "iframeFix", {
        start: function (b, c) {
            var d = a(this).data("draggable").options;
            a(d.iframeFix === true ? "iframe" : d.iframeFix).each(function () {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(a(this).offset()).appendTo("body")
            })
        }, stop: function (b, c) {
            a("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            })
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function (c, d) {
            var b = a(d.helper), e = a(this).data("draggable").options;
            if (b.css("opacity")) {
                e._opacity = b.css("opacity")
            }
            b.css("opacity", e.opacity)
        }, stop: function (b, c) {
            var d = a(this).data("draggable").options;
            if (d._opacity) {
                a(c.helper).css("opacity", d._opacity)
            }
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function (c, d) {
            var b = a(this).data("draggable");
            if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
                b.overflowOffset = b.scrollParent.offset()
            }
        }, drag: function (d, e) {
            var c = a(this).data("draggable"), f = c.options, b = false;
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
                if (!f.axis || f.axis != "x") {
                    if ((c.overflowOffset.top + c.scrollParent[0].offsetHeight) - d.pageY < f.scrollSensitivity) {
                        c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop + f.scrollSpeed
                    } else {
                        if (d.pageY - c.overflowOffset.top < f.scrollSensitivity) {
                            c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop - f.scrollSpeed
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if ((c.overflowOffset.left + c.scrollParent[0].offsetWidth) - d.pageX < f.scrollSensitivity) {
                        c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft + f.scrollSpeed
                    } else {
                        if (d.pageX - c.overflowOffset.left < f.scrollSensitivity) {
                            c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft - f.scrollSpeed
                        }
                    }
                }
            } else {
                if (!f.axis || f.axis != "x") {
                    if (d.pageY - a(document).scrollTop() < f.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - f.scrollSpeed)
                    } else {
                        if (a(window).height() - (d.pageY - a(document).scrollTop()) < f.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + f.scrollSpeed)
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if (d.pageX - a(document).scrollLeft() < f.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - f.scrollSpeed)
                    } else {
                        if (a(window).width() - (d.pageX - a(document).scrollLeft()) < f.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + f.scrollSpeed)
                        }
                    }
                }
            }
            if (b !== false && a.ui.ddmanager && !f.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(c, d)
            }
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function (c, d) {
            var b = a(this).data("draggable"), e = b.options;
            b.snapElements = [];
            a(e.snap.constructor != String ? (e.snap.items || ":data(draggable)") : e.snap).each(function () {
                var g = a(this);
                var f = g.offset();
                if (this != b.element[0]) {
                    b.snapElements.push({
                        item: this,
                        width: g.outerWidth(),
                        height: g.outerHeight(),
                        top: f.top,
                        left: f.left
                    })
                }
            })
        }, drag: function (u, p) {
            var g = a(this).data("draggable"), q = g.options;
            var y = q.snapTolerance;
            var x = p.offset.left, w = x + g.helperProportions.width, f = p.offset.top, e = f + g.helperProportions.height;
            for (var v = g.snapElements.length - 1; v >= 0; v--) {
                var s = g.snapElements[v].left, n = s + g.snapElements[v].width, m = g.snapElements[v].top, A = m + g.snapElements[v].height;
                if (!((s - y < x && x < n + y && m - y < f && f < A + y) || (s - y < x && x < n + y && m - y < e && e < A + y) || (s - y < w && w < n + y && m - y < f && f < A + y) || (s - y < w && w < n + y && m - y < e && e < A + y))) {
                    if (g.snapElements[v].snapping) {
                        (g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {snapItem: g.snapElements[v].item})))
                    }
                    g.snapElements[v].snapping = false;
                    continue
                }
                if (q.snapMode != "inner") {
                    var c = Math.abs(m - e) <= y;
                    var z = Math.abs(A - f) <= y;
                    var j = Math.abs(s - w) <= y;
                    var k = Math.abs(n - x) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                                top: m - g.helperProportions.height,
                                left: 0
                            }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {top: A, left: 0}).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                                top: 0,
                                left: s - g.helperProportions.width
                            }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {top: 0, left: n}).left - g.margins.left
                    }
                }
                var h = (c || z || j || k);
                if (q.snapMode != "outer") {
                    var c = Math.abs(m - f) <= y;
                    var z = Math.abs(A - e) <= y;
                    var j = Math.abs(s - x) <= y;
                    var k = Math.abs(n - w) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {top: m, left: 0}).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                                top: A - g.helperProportions.height,
                                left: 0
                            }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {top: 0, left: s}).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                                top: 0,
                                left: n - g.helperProportions.width
                            }).left - g.margins.left
                    }
                }
                if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
                    (g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {snapItem: g.snapElements[v].item})))
                }
                g.snapElements[v].snapping = (c || z || j || k || h)
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function (c, d) {
            var f = a(this).data("draggable").options;
            var e = a.makeArray(a(f.stack)).sort(function (h, g) {
                return (parseInt(a(h).css("zIndex"), 10) || 0) - (parseInt(a(g).css("zIndex"), 10) || 0)
            });
            if (!e.length) {
                return
            }
            var b = parseInt(e[0].style.zIndex) || 0;
            a(e).each(function (g) {
                this.style.zIndex = b + g
            });
            this[0].style.zIndex = b + e.length
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function (c, d) {
            var b = a(d.helper), e = a(this).data("draggable").options;
            if (b.css("zIndex")) {
                e._zIndex = b.css("zIndex")
            }
            b.css("zIndex", e.zIndex)
        }, stop: function (b, c) {
            var d = a(this).data("draggable").options;
            if (d._zIndex) {
                a(c.helper).css("zIndex", d._zIndex)
            }
        }
    })
})(jQuery);
(function (a) {
    a.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function () {
            var c = this.options, b = c.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = a.isFunction(b) ? b : function (e) {
                return e.is(b)
            };
            this.proportions = {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight};
            a.ui.ddmanager.droppables[c.scope] = a.ui.ddmanager.droppables[c.scope] || [];
            a.ui.ddmanager.droppables[c.scope].push(this);
            (c.addClasses && this.element.addClass("ui-droppable"))
        },
        destroy: function () {
            var b = a.ui.ddmanager.droppables[this.options.scope];
            for (var c = 0; c < b.length; c++) {
                if (b[c] == this) {
                    b.splice(c, 1)
                }
            }
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function (b, c) {
            if (b == "accept") {
                this.accept = a.isFunction(c) ? c : function (e) {
                    return e.is(c)
                }
            }
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (c) {
            var b = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            (b && this._trigger("activate", c, this.ui(b)))
        },
        _deactivate: function (c) {
            var b = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            (b && this._trigger("deactivate", c, this.ui(b)))
        },
        _over: function (c) {
            var b = a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", c, this.ui(b))
            }
        },
        _out: function (c) {
            var b = a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", c, this.ui(b))
            }
        },
        _drop: function (c, d) {
            var b = d || a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return false
            }
            var e = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                var f = a.data(this, "droppable");
                if (f.options.greedy && !f.options.disabled && f.options.scope == b.options.scope && f.accept.call(f.element[0], (b.currentItem || b.element)) && a.ui.intersect(b, a.extend(f, {offset: f.element.offset()}), f.options.tolerance)) {
                    e = true;
                    return false
                }
            });
            if (e) {
                return false
            }
            if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", c, this.ui(b));
                return this.element
            }
            return false
        },
        ui: function (b) {
            return {
                draggable: (b.currentItem || b.element),
                helper: b.helper,
                position: b.position,
                offset: b.positionAbs
            }
        }
    });
    a.extend(a.ui.droppable, {version: "1.9m2"});
    a.ui.intersect = function (s, j, p) {
        if (!j.offset) {
            return false
        }
        var e = (s.positionAbs || s.position.absolute).left, d = e + s.helperProportions.width, n = (s.positionAbs || s.position.absolute).top, m = n + s.helperProportions.height;
        var g = j.offset.left, c = g + j.proportions.width, q = j.offset.top, k = q + j.proportions.height;
        switch (p) {
            case"fit":
                return (g < e && d < c && q < n && m < k);
                break;
            case"intersect":
                return (g < e + (s.helperProportions.width / 2) && d - (s.helperProportions.width / 2) < c && q < n + (s.helperProportions.height / 2) && m - (s.helperProportions.height / 2) < k);
                break;
            case"pointer":
                var h = ((s.positionAbs || s.position.absolute).left + (s.clickOffset || s.offset.click).left), i = ((s.positionAbs || s.position.absolute).top + (s.clickOffset || s.offset.click).top), f = a.ui.isOver(i, h, q, g, j.proportions.height, j.proportions.width);
                return f;
                break;
            case"touch":
                return ((n >= q && n <= k) || (m >= q && m <= k) || (n < q && m > k)) && ((e >= g && e <= c) || (d >= g && d <= c) || (e < g && d > c));
                break;
            default:
                return false;
                break
        }
    };
    a.ui.ddmanager = {
        current: null, droppables: {"default": []}, prepareOffsets: function (e, g) {
            var b = a.ui.ddmanager.droppables[e.options.scope] || [];
            var f = g ? g.type : null;
            var h = (e.currentItem || e.element).find(":data(droppable)").andSelf();
            droppablesLoop:for (var d = 0; d < b.length; d++) {
                if (b[d].options.disabled || (e && !b[d].accept.call(b[d].element[0], (e.currentItem || e.element)))) {
                    continue
                }
                for (var c = 0; c < h.length; c++) {
                    if (h[c] == b[d].element[0]) {
                        b[d].proportions.height = 0;
                        continue droppablesLoop
                    }
                }
                b[d].visible = b[d].element.css("display") != "none";
                if (!b[d].visible) {
                    continue
                }
                b[d].offset = b[d].element.offset();
                b[d].proportions = {width: b[d].element[0].offsetWidth, height: b[d].element[0].offsetHeight};
                if (f == "mousedown") {
                    b[d]._activate.call(b[d], g)
                }
            }
        }, drop: function (b, c) {
            var d = false;
            a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance)) {
                    d = d || this._drop.call(this, c)
                }
                if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (b.currentItem || b.element))) {
                    this.isout = 1;
                    this.isover = 0;
                    this._deactivate.call(this, c)
                }
            });
            return d
        }, drag: function (b, c) {
            if (b.options.refreshPositions) {
                a.ui.ddmanager.prepareOffsets(b, c)
            }
            a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var e = a.ui.intersect(b, this, this.options.tolerance);
                var g = !e && this.isover == 1 ? "isout" : (e && this.isover == 0 ? "isover" : null);
                if (!g) {
                    return
                }
                var f;
                if (this.options.greedy) {
                    var d = this.element.parents(":data(droppable):eq(0)");
                    if (d.length) {
                        f = a.data(d[0], "droppable");
                        f.greedyChild = (g == "isover" ? 1 : 0)
                    }
                }
                if (f && g == "isover") {
                    f.isover = 0;
                    f.isout = 1;
                    f._out.call(f, c)
                }
                this[g] = 1;
                this[g == "isout" ? "isover" : "isout"] = 0;
                this[g == "isover" ? "_over" : "_out"].call(this, c);
                if (f && g == "isout") {
                    f.isout = 0;
                    f.isover = 1;
                    f._over.call(f, c)
                }
            })
        }
    }
})(jQuery);
(function (c) {
    c.widget("ui.resizable", c.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1000
        },
        _create: function () {
            var e = this, j = this.options;
            this.element.addClass("ui-resizable");
            c.extend(this, {
                _aspectRatio: !!(j.aspectRatio),
                aspectRatio: j.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: j.helper || j.ghost || j.animate ? j.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                if (/relative/.test(this.element.css("position")) && c.browser.opera) {
                    this.element.css({position: "relative", top: "auto", left: "auto"})
                }
                this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({margin: this.originalElement.css("margin")});
                this._proportionallyResize()
            }
            this.handles = j.handles || (!c(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                });
            if (this.handles.constructor == String) {
                if (this.handles == "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                var k = this.handles.split(",");
                this.handles = {};
                for (var f = 0; f < k.length; f++) {
                    var h = c.trim(k[f]), d = "ui-resizable-" + h;
                    var g = c('<div class="ui-resizable-handle ' + d + '"></div>');
                    if (/sw|se|ne|nw/.test(h)) {
                        g.css({zIndex: ++j.zIndex})
                    }
                    if ("se" == h) {
                        g.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[h] = ".ui-resizable-" + h;
                    this.element.append(g)
                }
            }
            this._renderAxis = function (q) {
                q = q || this.element;
                for (var m in this.handles) {
                    if (this.handles[m].constructor == String) {
                        this.handles[m] = c(this.handles[m], this.element).show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var n = c(this.handles[m], this.element), p = 0;
                        p = /sw|ne|nw|se|n|s/.test(m) ? n.outerHeight() : n.outerWidth();
                        var l = ["padding", /ne|nw|n/.test(m) ? "Top" : /se|sw|s/.test(m) ? "Bottom" : /^e$/.test(m) ? "Right" : "Left"].join("");
                        q.css(l, p);
                        this._proportionallyResize()
                    }
                    if (!c(this.handles[m]).length) {
                        continue
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = c(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!e.resizing) {
                    if (this.className) {
                        var i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    e.axis = i && i[1] ? i[1] : "se"
                }
            });
            if (j.autoHide) {
                this._handles.hide();
                c(this.element).addClass("ui-resizable-autohide").hover(function () {
                    c(this).removeClass("ui-resizable-autohide");
                    e._handles.show()
                }, function () {
                    if (!e.resizing) {
                        c(this).addClass("ui-resizable-autohide");
                        e._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function () {
            this._mouseDestroy();
            var d = function (f) {
                c(f).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                d(this.element);
                var e = this.element;
                e.after(this.originalElement.css({
                    position: e.css("position"),
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: e.css("top"),
                    left: e.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            d(this.originalElement);
            return this
        },
        _mouseCapture: function (e) {
            var f = false;
            for (var d in this.handles) {
                if (c(this.handles[d])[0] == e.target) {
                    f = true
                }
            }
            return !this.options.disabled && f
        },
        _mouseStart: function (f) {
            var i = this.options, e = this.element.position(), d = this.element;
            this.resizing = true;
            this.documentScroll = {top: c(document).scrollTop(), left: c(document).scrollLeft()};
            if (d.is(".ui-draggable") || (/absolute/).test(d.css("position"))) {
                d.css({position: "absolute", top: e.top, left: e.left})
            }
            if (c.browser.opera && (/relative/).test(d.css("position"))) {
                d.css({position: "relative", top: "auto", left: "auto"})
            }
            this._renderProxy();
            var j = b(this.helper.css("left")), g = b(this.helper.css("top"));
            if (i.containment) {
                j += c(i.containment).scrollLeft() || 0;
                g += c(i.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {left: j, top: g};
            this.size = this._helper ? {width: d.outerWidth(), height: d.outerHeight()} : {
                width: d.width(),
                height: d.height()
            };
            this.originalSize = this._helper ? {width: d.outerWidth(), height: d.outerHeight()} : {
                width: d.width(),
                height: d.height()
            };
            this.originalPosition = {left: j, top: g};
            this.sizeDiff = {width: d.outerWidth() - d.width(), height: d.outerHeight() - d.height()};
            this.originalMousePosition = {left: f.pageX, top: f.pageY};
            this.aspectRatio = (typeof i.aspectRatio == "number") ? i.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            var h = c(".ui-resizable-" + this.axis).css("cursor");
            c("body").css("cursor", h == "auto" ? this.axis + "-resize" : h);
            d.addClass("ui-resizable-resizing");
            this._propagate("start", f);
            return true
        },
        _mouseDrag: function (d) {
            var g = this.helper, f = this.options, l = {}, p = this, i = this.originalMousePosition, m = this.axis;
            var q = (d.pageX - i.left) || 0, n = (d.pageY - i.top) || 0;
            var h = this._change[m];
            if (!h) {
                return false
            }
            var k = h.apply(this, [d, q, n]), j = c.browser.msie && c.browser.version < 7, e = this.sizeDiff;
            if (this._aspectRatio || d.shiftKey) {
                k = this._updateRatio(k, d)
            }
            k = this._respectSize(k, d);
            this._propagate("resize", d);
            g.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            this._updateCache(k);
            this._trigger("resize", d, this.ui());
            return false
        },
        _mouseStop: function (g) {
            this.resizing = false;
            var h = this.options, l = this;
            if (this._helper) {
                var f = this._proportionallyResizeElements, d = f.length && (/textarea/i).test(f[0].nodeName), e = d && c.ui.hasScroll(f[0], "left") ? 0 : l.sizeDiff.height, j = d ? 0 : l.sizeDiff.width;
                var m = {
                    width: (l.size.width - j),
                    height: (l.size.height - e)
                }, i = (parseInt(l.element.css("left"), 10) + (l.position.left - l.originalPosition.left)) || null, k = (parseInt(l.element.css("top"), 10) + (l.position.top - l.originalPosition.top)) || null;
                if (!h.animate) {
                    this.element.css(c.extend(m, {top: k, left: i}))
                }
                l.helper.height(l.size.height);
                l.helper.width(l.size.width);
                if (this._helper && !h.animate) {
                    this._proportionallyResize()
                }
            }
            c("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", g);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updateCache: function (d) {
            var e = this.options;
            this.offset = this.helper.offset();
            if (a(d.left)) {
                this.position.left = d.left
            }
            if (a(d.top)) {
                this.position.top = d.top
            }
            if (a(d.height)) {
                this.size.height = d.height
            }
            if (a(d.width)) {
                this.size.width = d.width
            }
        },
        _updateRatio: function (g, f) {
            var h = this.options, i = this.position, e = this.size, d = this.axis;
            if (g.height) {
                g.width = (e.height * this.aspectRatio)
            } else {
                if (g.width) {
                    g.height = (e.width / this.aspectRatio)
                }
            }
            if (d == "sw") {
                g.left = i.left + (e.width - g.width);
                g.top = null
            }
            if (d == "nw") {
                g.top = i.top + (e.height - g.height);
                g.left = i.left + (e.width - g.width)
            }
            return g
        },
        _respectSize: function (k, f) {
            var i = this.helper, h = this.options, q = this._aspectRatio || f.shiftKey, p = this.axis, s = a(k.width) && h.maxWidth && (h.maxWidth < k.width), l = a(k.height) && h.maxHeight && (h.maxHeight < k.height), g = a(k.width) && h.minWidth && (h.minWidth > k.width), r = a(k.height) && h.minHeight && (h.minHeight > k.height);
            if (g) {
                k.width = h.minWidth
            }
            if (r) {
                k.height = h.minHeight
            }
            if (s) {
                k.width = h.maxWidth
            }
            if (l) {
                k.height = h.maxHeight
            }
            var e = this.originalPosition.left + this.originalSize.width, n = this.position.top + this.size.height;
            var j = /sw|nw|w/.test(p), d = /nw|ne|n/.test(p);
            if (g && j) {
                k.left = e - h.minWidth
            }
            if (s && j) {
                k.left = e - h.maxWidth
            }
            if (r && d) {
                k.top = n - h.minHeight
            }
            if (l && d) {
                k.top = n - h.maxHeight
            }
            var m = !k.width && !k.height;
            if (m && !k.left && k.top) {
                k.top = null
            } else {
                if (m && !k.top && k.left) {
                    k.left = null
                }
            }
            return k
        },
        _proportionallyResize: function () {
            var j = this.options;
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var f = this.helper || this.element;
            for (var e = 0; e < this._proportionallyResizeElements.length; e++) {
                var g = this._proportionallyResizeElements[e];
                if (!this.borderDif) {
                    var d = [g.css("borderTopWidth"), g.css("borderRightWidth"), g.css("borderBottomWidth"), g.css("borderLeftWidth")], h = [g.css("paddingTop"), g.css("paddingRight"), g.css("paddingBottom"), g.css("paddingLeft")];
                    this.borderDif = c.map(d, function (k, m) {
                        var l = parseInt(k, 10) || 0, n = parseInt(h[m], 10) || 0;
                        return l + n
                    })
                }
                if (c.browser.msie && !(!(c(f).is(":hidden") || c(f).parents(":hidden").length))) {
                    continue
                }
                g.css({
                    height: (f.height() - this.borderDif[0] - this.borderDif[2]) || 0,
                    width: (f.width() - this.borderDif[1] - this.borderDif[3]) || 0
                })
            }
        },
        _renderProxy: function () {
            var e = this.element, h = this.options;
            this.elementOffset = e.offset();
            if (this._helper) {
                this.helper = this.helper || c('<div style="overflow:hidden;"></div>');
                var d = c.browser.msie && c.browser.version < 7, f = (d ? 1 : 0), g = (d ? 2 : -1);
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + g,
                    height: this.element.outerHeight() + g,
                    position: "absolute",
                    left: this.elementOffset.left - f + "px",
                    top: this.elementOffset.top - f + "px",
                    zIndex: ++h.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function (f, e, d) {
                return {width: this.originalSize.width + e}
            }, w: function (g, e, d) {
                var i = this.options, f = this.originalSize, h = this.originalPosition;
                return {left: h.left + e, width: f.width - e}
            }, n: function (g, e, d) {
                var i = this.options, f = this.originalSize, h = this.originalPosition;
                return {top: h.top + d, height: f.height - d}
            }, s: function (f, e, d) {
                return {height: this.originalSize.height + d}
            }, se: function (f, e, d) {
                return c.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [f, e, d]))
            }, sw: function (f, e, d) {
                return c.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [f, e, d]))
            }, ne: function (f, e, d) {
                return c.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [f, e, d]))
            }, nw: function (f, e, d) {
                return c.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [f, e, d]))
            }
        },
        _propagate: function (e, d) {
            c.ui.plugin.call(this, e, [d, this.ui()]);
            (e != "resize" && this._trigger(e, d, this.ui()))
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    c.extend(c.ui.resizable, {version: "1.9m2"});
    c.ui.plugin.add("resizable", "alsoResize", {
        start: function (e, f) {
            var d = c(this).data("resizable"), h = d.options;
            var g = function (i) {
                c(i).each(function () {
                    var j = c(this);
                    j.data("resizable-alsoresize", {
                        width: parseInt(j.width(), 10),
                        height: parseInt(j.height(), 10),
                        left: parseInt(j.css("left"), 10),
                        top: parseInt(j.css("top"), 10),
                        position: j.css("position")
                    })
                })
            };
            if (typeof(h.alsoResize) == "object" && !h.alsoResize.parentNode) {
                if (h.alsoResize.length) {
                    h.alsoResize = h.alsoResize[0];
                    g(h.alsoResize)
                } else {
                    c.each(h.alsoResize, function (i) {
                        g(i)
                    })
                }
            } else {
                g(h.alsoResize)
            }
        }, resize: function (f, h) {
            var e = c(this).data("resizable"), i = e.options, g = e.originalSize, k = e.originalPosition;
            var j = {
                height: (e.size.height - g.height) || 0,
                width: (e.size.width - g.width) || 0,
                top: (e.position.top - k.top) || 0,
                left: (e.position.left - k.left) || 0
            }, d = function (l, m) {
                c(l).each(function () {
                    var q = c(this), r = c(this).data("resizable-alsoresize"), p = {}, n = m && m.length ? m : q.parents(h.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    c.each(n, function (s, v) {
                        var u = (r[v] || 0) + (j[v] || 0);
                        if (u && u >= 0) {
                            p[v] = u || null
                        }
                    });
                    if (c.browser.opera && /relative/.test(q.css("position"))) {
                        e._revertToRelativePosition = true;
                        q.css({position: "absolute", top: "auto", left: "auto"})
                    }
                    q.css(p)
                })
            };
            if (typeof(i.alsoResize) == "object" && !i.alsoResize.nodeType) {
                c.each(i.alsoResize, function (l, m) {
                    d(l, m)
                })
            } else {
                d(i.alsoResize)
            }
        }, stop: function (f, g) {
            var e = c(this).data("resizable");
            var d = function (h) {
                c(h).each(function () {
                    var i = c(this);
                    i.css({position: i.data("resizable-alsoresize").position})
                })
            };
            if (e._revertToRelativePosition) {
                e._revertToRelativePosition = false;
                if (typeof(o.alsoResize) == "object" && !o.alsoResize.nodeType) {
                    c.each(o.alsoResize, function (h) {
                        d(h)
                    })
                } else {
                    d(o.alsoResize)
                }
            }
            c(this).removeData("resizable-alsoresize")
        }
    });
    c.ui.plugin.add("resizable", "animate", {
        stop: function (h, m) {
            var n = c(this).data("resizable"), i = n.options;
            var g = n._proportionallyResizeElements, d = g.length && (/textarea/i).test(g[0].nodeName), e = d && c.ui.hasScroll(g[0], "left") ? 0 : n.sizeDiff.height, k = d ? 0 : n.sizeDiff.width;
            var f = {
                width: (n.size.width - k),
                height: (n.size.height - e)
            }, j = (parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left)) || null, l = (parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top)) || null;
            n.element.animate(c.extend(f, l && j ? {top: l, left: j} : {}), {
                duration: i.animateDuration,
                easing: i.animateEasing,
                step: function () {
                    var p = {
                        width: parseInt(n.element.css("width"), 10),
                        height: parseInt(n.element.css("height"), 10),
                        top: parseInt(n.element.css("top"), 10),
                        left: parseInt(n.element.css("left"), 10)
                    };
                    if (g && g.length) {
                        c(g[0]).css({width: p.width, height: p.height})
                    }
                    n._updateCache(p);
                    n._propagate("resize", h)
                }
            })
        }
    });
    c.ui.plugin.add("resizable", "containment", {
        start: function (e, q) {
            var s = c(this).data("resizable"), i = s.options, k = s.element;
            var f = i.containment, j = (f instanceof c) ? f.get(0) : (/parent/.test(f)) ? k.parent().get(0) : f;
            if (!j) {
                return
            }
            s.containerElement = c(j);
            if (/document/.test(f) || f == document) {
                s.containerOffset = {left: 0, top: 0};
                s.containerPosition = {left: 0, top: 0};
                s.parentData = {
                    element: c(document),
                    left: 0,
                    top: 0,
                    width: c(document).width(),
                    height: c(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                var m = c(j), h = [];
                c(["Top", "Right", "Left", "Bottom"]).each(function (u, p) {
                    h[u] = b(m.css("padding" + p))
                });
                s.containerOffset = m.offset();
                s.containerPosition = m.position();
                s.containerSize = {height: (m.innerHeight() - h[3]), width: (m.innerWidth() - h[1])};
                var n = s.containerOffset, d = s.containerSize.height, l = s.containerSize.width, g = (c.ui.hasScroll(j, "left") ? j.scrollWidth : l), r = (c.ui.hasScroll(j) ? j.scrollHeight : d);
                s.parentData = {element: j, left: n.left, top: n.top, width: g, height: r}
            }
        }, resize: function (f, p) {
            var s = c(this).data("resizable"), h = s.options, e = s.containerSize, n = s.containerOffset, l = s.size, m = s.position, q = s._aspectRatio || f.shiftKey, d = {
                top: 0,
                left: 0
            }, g = s.containerElement;
            if (g[0] != document && (/static/).test(g.css("position"))) {
                d = n
            }
            if (m.left < (s._helper ? n.left : 0)) {
                s.size.width = s.size.width + (s._helper ? (s.position.left - n.left) : (s.position.left - d.left));
                if (q) {
                    s.size.height = s.size.width / h.aspectRatio
                }
                s.position.left = h.helper ? n.left : 0
            }
            if (m.top < (s._helper ? n.top : 0)) {
                s.size.height = s.size.height + (s._helper ? (s.position.top - n.top) : s.position.top);
                if (q) {
                    s.size.width = s.size.height * h.aspectRatio
                }
                s.position.top = s._helper ? n.top : 0
            }
            s.offset.left = s.parentData.left + s.position.left;
            s.offset.top = s.parentData.top + s.position.top;
            var k = Math.abs((s._helper ? s.offset.left - d.left : (s.offset.left - d.left)) + s.sizeDiff.width), r = Math.abs((s._helper ? s.offset.top - d.top : (s.offset.top - n.top)) + s.sizeDiff.height);
            var j = s.containerElement.get(0) == s.element.parent().get(0), i = /relative|absolute/.test(s.containerElement.css("position"));
            if (j && i) {
                k -= s.parentData.left
            }
            if (k + s.size.width >= s.parentData.width) {
                s.size.width = s.parentData.width - k;
                if (q) {
                    s.size.height = s.size.width / s.aspectRatio
                }
            }
            if (r + s.size.height >= s.parentData.height) {
                s.size.height = s.parentData.height - r;
                if (q) {
                    s.size.width = s.size.height * s.aspectRatio
                }
            }
        }, stop: function (e, m) {
            var p = c(this).data("resizable"), f = p.options, k = p.position, l = p.containerOffset, d = p.containerPosition, g = p.containerElement;
            var i = c(p.helper), q = i.offset(), n = i.outerWidth() - p.sizeDiff.width, j = i.outerHeight() - p.sizeDiff.height;
            if (p._helper && !f.animate && (/relative/).test(g.css("position"))) {
                c(this).css({left: q.left - d.left - l.left, width: n, height: j})
            }
            if (p._helper && !f.animate && (/static/).test(g.css("position"))) {
                c(this).css({left: q.left - d.left - l.left, width: n, height: j})
            }
        }
    });
    c.ui.plugin.add("resizable", "ghost", {
        start: function (f, g) {
            var d = c(this).data("resizable"), h = d.options, e = d.size;
            d.ghost = d.originalElement.clone();
            d.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: e.height,
                width: e.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof h.ghost == "string" ? h.ghost : "");
            d.ghost.appendTo(d.helper)
        }, resize: function (e, f) {
            var d = c(this).data("resizable"), g = d.options;
            if (d.ghost) {
                d.ghost.css({position: "relative", height: d.size.height, width: d.size.width})
            }
        }, stop: function (e, f) {
            var d = c(this).data("resizable"), g = d.options;
            if (d.ghost && d.helper) {
                d.helper.get(0).removeChild(d.ghost.get(0))
            }
        }
    });
    c.ui.plugin.add("resizable", "grid", {
        resize: function (d, l) {
            var n = c(this).data("resizable"), g = n.options, j = n.size, h = n.originalSize, i = n.originalPosition, m = n.axis, k = g._aspectRatio || d.shiftKey;
            g.grid = typeof g.grid == "number" ? [g.grid, g.grid] : g.grid;
            var f = Math.round((j.width - h.width) / (g.grid[0] || 1)) * (g.grid[0] || 1), e = Math.round((j.height - h.height) / (g.grid[1] || 1)) * (g.grid[1] || 1);
            if (/^(se|s|e)$/.test(m)) {
                n.size.width = h.width + f;
                n.size.height = h.height + e
            } else {
                if (/^(ne)$/.test(m)) {
                    n.size.width = h.width + f;
                    n.size.height = h.height + e;
                    n.position.top = i.top - e
                } else {
                    if (/^(sw)$/.test(m)) {
                        n.size.width = h.width + f;
                        n.size.height = h.height + e;
                        n.position.left = i.left - f
                    } else {
                        n.size.width = h.width + f;
                        n.size.height = h.height + e;
                        n.position.top = i.top - e;
                        n.position.left = i.left - f
                    }
                }
            }
        }
    });
    var b = function (d) {
        return parseInt(d, 10) || 0
    };
    var a = function (d) {
        return !isNaN(parseInt(d, 10))
    }
})(jQuery);
(function (a) {
    a.widget("ui.selectable", a.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        }, _create: function () {
            var b = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var c;
            this.refresh = function () {
                c = a(b.options.filter, b.element[0]);
                c.each(function () {
                    var d = a(this);
                    var e = d.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: d,
                        left: e.left,
                        top: e.top,
                        right: e.left + d.outerWidth(),
                        bottom: e.top + d.outerHeight(),
                        startselected: false,
                        selected: d.hasClass("ui-selected"),
                        selecting: d.hasClass("ui-selecting"),
                        unselecting: d.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = c.addClass("ui-selectee");
            this._mouseInit();
            this.helper = a("<div class='ui-selectable-helper'></div>")
        }, destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        }, _mouseStart: function (d) {
            var b = this;
            this.opos = [d.pageX, d.pageY];
            if (this.options.disabled) {
                return
            }
            var c = this.options;
            this.selectees = a(c.filter, this.element[0]);
            this._trigger("start", d);
            a(c.appendTo).append(this.helper);
            this.helper.css({left: d.clientX, top: d.clientY, width: 0, height: 0});
            if (c.autoRefresh) {
                this.refresh()
            }
            this.selectees.filter(".ui-selected").each(function () {
                var e = a.data(this, "selectable-item");
                e.startselected = true;
                if (!d.metaKey) {
                    e.$element.removeClass("ui-selected");
                    e.selected = false;
                    e.$element.addClass("ui-unselecting");
                    e.unselecting = true;
                    b._trigger("unselecting", d, {unselecting: e.element})
                }
            });
            a(d.target).parents().andSelf().each(function () {
                var f = a.data(this, "selectable-item");
                if (f) {
                    var e = !d.metaKey || !f.$element.hasClass("ui-selected");
                    f.$element.removeClass(e ? "ui-unselecting" : "ui-selected").addClass(e ? "ui-selecting" : "ui-unselecting");
                    f.unselecting = !e;
                    f.selecting = e;
                    f.selected = e;
                    if (e) {
                        b._trigger("selecting", d, {selecting: f.element})
                    } else {
                        b._trigger("unselecting", d, {unselecting: f.element})
                    }
                    return false
                }
            })
        }, _mouseDrag: function (i) {
            var c = this;
            this.dragged = true;
            if (this.options.disabled) {
                return
            }
            var e = this.options;
            var d = this.opos[0], h = this.opos[1], b = i.pageX, g = i.pageY;
            if (d > b) {
                var f = b;
                b = d;
                d = f
            }
            if (h > g) {
                var f = g;
                g = h;
                h = f
            }
            this.helper.css({left: d, top: h, width: b - d, height: g - h});
            this.selectees.each(function () {
                var j = a.data(this, "selectable-item");
                if (!j || j.element == c.element[0]) {
                    return
                }
                var k = false;
                if (e.tolerance == "touch") {
                    k = (!(j.left > b || j.right < d || j.top > g || j.bottom < h))
                } else {
                    if (e.tolerance == "fit") {
                        k = (j.left > d && j.right < b && j.top > h && j.bottom < g)
                    }
                }
                if (k) {
                    if (j.selected) {
                        j.$element.removeClass("ui-selected");
                        j.selected = false
                    }
                    if (j.unselecting) {
                        j.$element.removeClass("ui-unselecting");
                        j.unselecting = false
                    }
                    if (!j.selecting) {
                        j.$element.addClass("ui-selecting");
                        j.selecting = true;
                        c._trigger("selecting", i, {selecting: j.element})
                    }
                } else {
                    if (j.selecting) {
                        if (i.metaKey && j.startselected) {
                            j.$element.removeClass("ui-selecting");
                            j.selecting = false;
                            j.$element.addClass("ui-selected");
                            j.selected = true
                        } else {
                            j.$element.removeClass("ui-selecting");
                            j.selecting = false;
                            if (j.startselected) {
                                j.$element.addClass("ui-unselecting");
                                j.unselecting = true
                            }
                            c._trigger("unselecting", i, {unselecting: j.element})
                        }
                    }
                    if (j.selected) {
                        if (!i.metaKey && !j.startselected) {
                            j.$element.removeClass("ui-selected");
                            j.selected = false;
                            j.$element.addClass("ui-unselecting");
                            j.unselecting = true;
                            c._trigger("unselecting", i, {unselecting: j.element})
                        }
                    }
                }
            });
            return false
        }, _mouseStop: function (d) {
            var b = this;
            this.dragged = false;
            var c = this.options;
            a(".ui-unselecting", this.element[0]).each(function () {
                var e = a.data(this, "selectable-item");
                e.$element.removeClass("ui-unselecting");
                e.unselecting = false;
                e.startselected = false;
                b._trigger("unselected", d, {unselected: e.element})
            });
            a(".ui-selecting", this.element[0]).each(function () {
                var e = a.data(this, "selectable-item");
                e.$element.removeClass("ui-selecting").addClass("ui-selected");
                e.selecting = false;
                e.selected = true;
                e.startselected = true;
                b._trigger("selected", d, {selected: e.element})
            });
            this._trigger("stop", d);
            this.helper.remove();
            return false
        }
    });
    a.extend(a.ui.selectable, {version: "1.9m2"})
})(jQuery);
(function (a) {
    a.widget("ui.sortable", a.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000
        },
        _create: function () {
            var b = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css("float")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var b = this.items.length - 1; b >= 0; b--) {
                this.items[b].item.removeData("sortable-item")
            }
            return this
        },
        _setOption: function (b, c) {
            if (b === "disabled") {
                this.options[b] = c;
                this.widget()[c ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else {
                this._superApply("_setOption", arguments)
            }
        },
        _mouseCapture: function (e, f) {
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(e);
            var d = null, c = this, b = a(e.target).parents().each(function () {
                if (a.data(this, "sortable-item") == c) {
                    d = a(this);
                    return false
                }
            });
            if (a.data(e.target, "sortable-item") == c) {
                d = a(e.target)
            }
            if (!d) {
                return false
            }
            if (this.options.handle && !f) {
                var g = false;
                a(this.options.handle, d).find("*").andSelf().each(function () {
                    if (this == e.target) {
                        g = true
                    }
                });
                if (!g) {
                    return false
                }
            }
            this.currentItem = d;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (e, f, b) {
            var g = this.options, c = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(e);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            a.extend(this.offset, {
                click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(e);
            this.originalPageX = e.pageX;
            this.originalPageY = e.pageY;
            (g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt));
            this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]};
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (g.containment) {
                this._setContainment()
            }
            if (g.cursor) {
                if (a("body").css("cursor")) {
                    this._storedCursor = a("body").css("cursor")
                }
                a("body").css("cursor", g.cursor)
            }
            if (g.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", g.opacity)
            }
            if (g.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", g.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", e, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!b) {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("activate", e, c._uiHash(this))
                }
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            if (a.ui.ddmanager && !g.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, e)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(e);
            return true
        },
        _mouseDrag: function (f) {
            this.position = this._generatePosition(f);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var g = this.options, b = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - f.pageY < g.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop + g.scrollSpeed
                    } else {
                        if (f.pageY - this.overflowOffset.top < g.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop - g.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - f.pageX < g.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft + g.scrollSpeed
                    } else {
                        if (f.pageX - this.overflowOffset.left < g.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft - g.scrollSpeed
                        }
                    }
                } else {
                    if (f.pageY - a(document).scrollTop() < g.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed)
                    } else {
                        if (a(window).height() - (f.pageY - a(document).scrollTop()) < g.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)
                        }
                    }
                    if (f.pageX - a(document).scrollLeft() < g.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed)
                    } else {
                        if (a(window).width() - (f.pageX - a(document).scrollLeft()) < g.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed)
                        }
                    }
                }
                if (b !== false && a.ui.ddmanager && !g.dropBehaviour) {
                    a.ui.ddmanager.prepareOffsets(this, f)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d], c = e.item[0], h = this._intersectsWithPointer(e);
                if (!h) {
                    continue
                }
                if (c != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != c && !a.ui.contains(this.placeholder[0], c) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], c) : true)) {
                    this.direction = h == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(e)) {
                        this._rearrange(f, e)
                    } else {
                        break
                    }
                    this._trigger("change", f, this._uiHash());
                    break
                }
            }
            this._contactContainers(f);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, f)
            }
            this._trigger("sort", f, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (c, d) {
            if (!c) {
                return
            }
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                a.ui.ddmanager.drop(this, c)
            }
            if (this.options.revert) {
                var b = this;
                var e = b.placeholder.offset();
                b.reverting = true;
                a(this.helper).animate({
                    left: e.left - this.offset.parent.left - b.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                    top: e.top - this.offset.parent.top - b.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                }, parseInt(this.options.revert, 10) || 500, function () {
                    b._clear(c)
                })
            } else {
                this._clear(c, d)
            }
            return false
        },
        cancel: function () {
            var b = this;
            if (this.dragging) {
                this._mouseUp();
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    this.containers[c]._trigger("deactivate", null, b._uiHash(this));
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", null, b._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder[0].parentNode) {
                this.placeholder[0].parentNode.removeChild(this.placeholder[0])
            }
            if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                this.helper.remove()
            }
            a.extend(this, {helper: null, dragging: false, reverting: false, _noFinalSort: null});
            if (this.domPosition.prev) {
                a(this.domPosition.prev).after(this.currentItem)
            } else {
                a(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function (d) {
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            a(b).each(function () {
                var e = (a(d.item || this).attr(d.attribute || "id") || "").match(d.expression || (/(.+)[-=_](.+)/));
                if (e) {
                    c.push((d.key || e[1] + "[]") + "=" + (d.key && d.expression ? e[1] : e[2]))
                }
            });
            return c.join("&")
        },
        toArray: function (d) {
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            b.each(function () {
                c.push(a(d.item || this).attr(d.attribute || "id") || "")
            });
            return c
        },
        _intersectsWith: function (m) {
            var e = this.positionAbs.left, d = e + this.helperProportions.width, k = this.positionAbs.top, j = k + this.helperProportions.height;
            var f = m.left, c = f + m.width, n = m.top, i = n + m.height;
            var p = this.offset.click.top, h = this.offset.click.left;
            var g = (k + p) > n && (k + p) < i && (e + h) > f && (e + h) < c;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"])) {
                return g
            } else {
                return (f < e + (this.helperProportions.width / 2) && d - (this.helperProportions.width / 2) < c && n < k + (this.helperProportions.height / 2) && j - (this.helperProportions.height / 2) < i)
            }
        },
        _intersectsWithPointer: function (d) {
            var e = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height), c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width), g = e && c, b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            if (!g) {
                return false
            }
            return this.floating ? (((f && f == "right") || b == "down") ? 2 : 1) : (b && (b == "down" ? 2 : 1))
        },
        _intersectsWithSides: function (e) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + (e.height / 2), e.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + (e.width / 2), e.width), b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            if (this.floating && f) {
                return ((f == "right" && d) || (f == "left" && !d))
            } else {
                return b && ((b == "down" && c) || (b == "up" && !c))
            }
        },
        _getDragVerticalDirection: function () {
            var b = this.positionAbs.top - this.lastPositionAbs.top;
            return b != 0 && (b > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var b = this.positionAbs.left - this.lastPositionAbs.left;
            return b != 0 && (b > 0 ? "right" : "left")
        },
        refresh: function (b) {
            this._refreshItems(b);
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var b = this.options;
            return b.connectWith.constructor == String ? [b.connectWith] : b.connectWith
        },
        _getItemsAsjQuery: function (b) {
            var l = this;
            var g = [];
            var e = [];
            var h = this._connectWith();
            if (h && b) {
                for (var d = h.length - 1; d >= 0; d--) {
                    var k = a(h[d]);
                    for (var c = k.length - 1; c >= 0; c--) {
                        var f = a.data(k[c], "sortable");
                        if (f && f != this && !f.options.disabled) {
                            e.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), f])
                        }
                    }
                }
            }
            e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var d = e.length - 1; d >= 0; d--) {
                e[d][0].each(function () {
                    g.push(this)
                })
            }
            return a(g)
        },
        _removeCurrentsFromItems: function () {
            var d = this.currentItem.find(":data(sortable-item)");
            for (var c = 0; c < this.items.length; c++) {
                for (var b = 0; b < d.length; b++) {
                    if (d[b] == this.items[c].item[0]) {
                        this.items.splice(c, 1)
                    }
                }
            }
        },
        _refreshItems: function (b) {
            this.items = [];
            this.containers = [this];
            var h = this.items;
            var q = this;
            var f = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item: this.currentItem}) : a(this.options.items, this.element), this]];
            var l = this._connectWith();
            if (l) {
                for (var e = l.length - 1; e >= 0; e--) {
                    var m = a(l[e]);
                    for (var d = m.length - 1; d >= 0; d--) {
                        var g = a.data(m[d], "sortable");
                        if (g && g != this && !g.options.disabled) {
                            f.push([a.isFunction(g.options.items) ? g.options.items.call(g.element[0], b, {item: this.currentItem}) : a(g.options.items, g.element), g]);
                            this.containers.push(g)
                        }
                    }
                }
            }
            for (var e = f.length - 1; e >= 0; e--) {
                var k = f[e][1];
                var c = f[e][0];
                for (var d = 0, n = c.length; d < n; d++) {
                    var p = a(c[d]);
                    p.data("sortable-item", k);
                    h.push({item: p, instance: k, width: 0, height: 0, left: 0, top: 0})
                }
            }
        },
        refreshPositions: function (b) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d];
                var c = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
                if (!b) {
                    e.width = c.outerWidth();
                    e.height = c.outerHeight()
                }
                var f = c.offset();
                e.left = f.left;
                e.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    var f = this.containers[d].element.offset();
                    this.containers[d].containerCache.left = f.left;
                    this.containers[d].containerCache.top = f.top;
                    this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
                    this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function (d) {
            var b = d || this, e = b.options;
            if (!e.placeholder || e.placeholder.constructor == String) {
                var c = e.placeholder;
                e.placeholder = {
                    element: function () {
                        var f = a(document.createElement(b.currentItem[0].nodeName)).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!c) {
                            f.style.visibility = "hidden"
                        }
                        return f
                    }, update: function (f, g) {
                        if (c && !e.forcePlaceholderSize) {
                            return
                        }
                        if (!g.height()) {
                            g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!g.width()) {
                            g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            b.placeholder = a(e.placeholder.element.call(b.element, b.currentItem));
            b.currentItem.after(b.placeholder);
            e.placeholder.update(b, b.placeholder)
        },
        _contactContainers: function (b) {
            var d = null, k = null;
            for (var f = this.containers.length - 1; f >= 0; f--) {
                if (a.ui.contains(this.currentItem[0], this.containers[f].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[f].containerCache)) {
                    if (d && a.ui.contains(this.containers[f].element[0], d.element[0])) {
                        continue
                    }
                    d = this.containers[f];
                    k = f
                } else {
                    if (this.containers[f].containerCache.over) {
                        this.containers[f]._trigger("out", b, this._uiHash(this));
                        this.containers[f].containerCache.over = 0
                    }
                }
            }
            if (!d) {
                return
            }
            if (this.containers.length === 1) {
                this.containers[k]._trigger("over", b, this._uiHash(this));
                this.containers[k].containerCache.over = 1
            } else {
                if (this.currentContainer != this.containers[k]) {
                    var h = 10000;
                    var g = null;
                    var c = this.positionAbs[this.containers[k].floating ? "left" : "top"];
                    for (var e = this.items.length - 1; e >= 0; e--) {
                        if (!a.ui.contains(this.containers[k].element[0], this.items[e].item[0])) {
                            continue
                        }
                        var l = this.items[e][this.containers[k].floating ? "left" : "top"];
                        if (Math.abs(l - c) < h) {
                            h = Math.abs(l - c);
                            g = this.items[e]
                        }
                    }
                    if (!g && !this.options.dropOnEmpty) {
                        return
                    }
                    this.currentContainer = this.containers[k];
                    g ? this._rearrange(b, g, null, true) : this._rearrange(b, null, this.containers[k].element, true);
                    this._trigger("change", b, this._uiHash());
                    this.containers[k]._trigger("change", b, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[k]._trigger("over", b, this._uiHash(this));
                    this.containers[k].containerCache.over = 1
                }
            }
        },
        _createHelper: function (c) {
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c, this.currentItem])) : (d.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!b.parents("body").length) {
                a(d.appendTo != "parent" ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(b[0])
            }
            if (b[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (b[0].style.width == "" || d.forceHelperSize) {
                b.width(this.currentItem.width())
            }
            if (b[0].style.height == "" || d.forceHelperSize) {
                b.height(this.currentItem.height())
            }
            return b
        },
        _adjustOffsetFromHelper: function (b) {
            if (typeof b == "string") {
                b = b.split(" ")
            }
            if (a.isArray(b)) {
                b = {left: +b[0], top: +b[1] || 0}
            }
            if ("left" in b) {
                this.offset.click.left = b.left + this.margins.left
            }
            if ("right" in b) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if ("top" in b) {
                this.offset.click.top = b.top + this.margins.top
            }
            if ("bottom" in b) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {top: 0, left: 0}
            }
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var b = this.currentItem.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {top: 0, left: 0}
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment)) {
                var c = a(e.containment)[0];
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (f, h) {
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
            return {
                top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),
                left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))
            }
        },
        _generatePosition: function (e) {
            var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {
                top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),
                left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))
            }
        },
        _rearrange: function (g, f, c, e) {
            c ? c[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? f.item[0] : f.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var d = this, b = this.counter;
            window.setTimeout(function () {
                if (b == d.counter) {
                    d.refreshPositions(!e)
                }
            }, 0)
        },
        _clear: function (d, e) {
            this.reverting = false;
            var f = [], b = this;
            if (!this._noFinalSort && this.currentItem[0].parentNode) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var c in this._storedCSS) {
                    if (this._storedCSS[c] == "auto" || this._storedCSS[c] == "static") {
                        this._storedCSS[c] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !e) {
                f.push(function (g) {
                    this._trigger("receive", g, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e) {
                f.push(function (g) {
                    this._trigger("update", g, this._uiHash())
                })
            }
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                if (!e) {
                    f.push(function (g) {
                        this._trigger("remove", g, this._uiHash())
                    })
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    if (a.ui.contains(this.containers[c].element[0], this.currentItem[0]) && !e) {
                        f.push((function (g) {
                            return function (h) {
                                g._trigger("receive", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]));
                        f.push((function (g) {
                            return function (h) {
                                g._trigger("update", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]))
                    }
                }
            }
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (!e) {
                    f.push((function (g) {
                        return function (h) {
                            g._trigger("deactivate", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]))
                }
                if (this.containers[c].containerCache.over) {
                    f.push((function (g) {
                        return function (h) {
                            g._trigger("out", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]));
                    this.containers[c].containerCache.over = 0
                }
            }
            if (this._storedCursor) {
                a("body").css("cursor", this._storedCursor)
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!e) {
                    this._trigger("beforeStop", d, this._uiHash());
                    for (var c = 0; c < f.length; c++) {
                        f[c].call(this, d)
                    }
                    this._trigger("stop", d, this._uiHash())
                }
                return false
            }
            if (!e) {
                this._trigger("beforeStop", d, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!e) {
                for (var c = 0; c < f.length; c++) {
                    f[c].call(this, d)
                }
                this._trigger("stop", d, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            if (a.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function (c) {
            var b = c || this;
            return {
                helper: b.helper,
                placeholder: b.placeholder || a([]),
                position: b.position,
                originalPosition: b.originalPosition,
                offset: b.positionAbs,
                item: b.currentItem,
                sender: c ? c.element : null
            }
        }
    });
    a.extend(a.ui.sortable, {version: "1.9m2"})
})(jQuery);
jQuery.effects || (function (g) {
    g.effects = {};
    g.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (l, k) {
        g.fx.step[k] = function (m) {
            if (!m.colorInit) {
                m.start = j(m.elem, k);
                m.end = i(m.end);
                m.colorInit = true
            }
            m.elem.style[k] = "rgb(" + Math.max(Math.min(parseInt((m.pos * (m.end[0] - m.start[0])) + m.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt((m.pos * (m.end[1] - m.start[1])) + m.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt((m.pos * (m.end[2] - m.start[2])) + m.start[2], 10), 255), 0) + ")"
        }
    });
    function i(l) {
        var k;
        if (l && l.constructor == Array && l.length == 3) {
            return l
        }
        if (k = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(l)) {
            return [parseInt(k[1], 10), parseInt(k[2], 10), parseInt(k[3], 10)]
        }
        if (k = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(l)) {
            return [parseFloat(k[1]) * 2.55, parseFloat(k[2]) * 2.55, parseFloat(k[3]) * 2.55]
        }
        if (k = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(l)) {
            return [parseInt(k[1], 16), parseInt(k[2], 16), parseInt(k[3], 16)]
        }
        if (k = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(l)) {
            return [parseInt(k[1] + k[1], 16), parseInt(k[2] + k[2], 16), parseInt(k[3] + k[3], 16)]
        }
        if (k = /rgba\(0, 0, 0, 0\)/.exec(l)) {
            return a.transparent
        }
        return a[g.trim(l).toLowerCase()]
    }

    function j(m, k) {
        var l;
        do {
            l = g.curCSS(m, k);
            if (l != "" && l != "transparent" || g.nodeName(m, "body")) {
                break
            }
            k = "backgroundColor"
        } while (m = m.parentNode);
        return i(l)
    }

    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    var e = ["add", "remove", "toggle"], c = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };

    function f() {
        var n = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, p = {}, l, m;
        if (n && n.length && n[0] && n[n[0]]) {
            var k = n.length;
            while (k--) {
                l = n[k];
                if (typeof n[l] == "string") {
                    m = l.replace(/\-(\w)/g, function (q, r) {
                        return r.toUpperCase()
                    });
                    p[m] = n[l]
                }
            }
        } else {
            for (l in n) {
                if (typeof n[l] === "string") {
                    p[l] = n[l]
                }
            }
        }
        return p
    }

    function b(l) {
        var k, m;
        for (k in l) {
            m = l[k];
            if (m == null || g.isFunction(m) || k in c || (/scrollbar/).test(k) || (!(/color/i).test(k) && isNaN(parseFloat(m)))) {
                delete l[k]
            }
        }
        return l
    }

    function h(k, m) {
        var n = {_: 0}, l;
        for (l in m) {
            if (k[l] != m[l]) {
                n[l] = m[l]
            }
        }
        return n
    }

    g.effects.animateClass = function (k, l, n, m) {
        if (g.isFunction(n)) {
            m = n;
            n = null
        }
        return this.each(function () {
            var s = g(this), p = s.attr("style") || " ", u = b(f.call(this)), r, q = s.attr("className");
            g.each(e, function (v, w) {
                if (k[w]) {
                    s[w + "Class"](k[w])
                }
            });
            r = b(f.call(this));
            s.attr("className", q);
            s.animate(h(u, r), l, n, function () {
                g.each(e, function (v, w) {
                    if (k[w]) {
                        s[w + "Class"](k[w])
                    }
                });
                if (typeof s.attr("style") == "object") {
                    s.attr("style").cssText = "";
                    s.attr("style").cssText = p
                } else {
                    s.attr("style", p)
                }
                if (m) {
                    m.apply(this, arguments)
                }
            })
        })
    };
    g.fn.extend({
        _addClass: g.fn.addClass, addClass: function (l, k, n, m) {
            return k ? g.effects.animateClass.apply(this, [{add: l}, k, n, m]) : this._addClass(l)
        }, _removeClass: g.fn.removeClass, removeClass: function (l, k, n, m) {
            return k ? g.effects.animateClass.apply(this, [{remove: l}, k, n, m]) : this._removeClass(l)
        }, _toggleClass: g.fn.toggleClass, toggleClass: function (m, l, k, p, n) {
            if (typeof l == "boolean" || l === undefined) {
                if (!k) {
                    return this._toggleClass(m, l)
                } else {
                    return g.effects.animateClass.apply(this, [(l ? {add: m} : {remove: m}), k, p, n])
                }
            } else {
                return g.effects.animateClass.apply(this, [{toggle: m}, l, k, p])
            }
        }, switchClass: function (k, m, l, p, n) {
            return g.effects.animateClass.apply(this, [{add: m, remove: k}, l, p, n])
        }
    });
    g.extend(g.effects, {
        version: "1.9m2", save: function (l, m) {
            for (var k = 0; k < m.length; k++) {
                if (m[k] !== null) {
                    l.data("ec.storage." + m[k], l[0].style[m[k]])
                }
            }
        }, restore: function (l, m) {
            for (var k = 0; k < m.length; k++) {
                if (m[k] !== null) {
                    l.css(m[k], l.data("ec.storage." + m[k]))
                }
            }
        }, setMode: function (k, l) {
            if (l == "toggle") {
                l = k.is(":hidden") ? "show" : "hide"
            }
            return l
        }, getBaseline: function (l, m) {
            var n, k;
            switch (l[0]) {
                case"top":
                    n = 0;
                    break;
                case"middle":
                    n = 0.5;
                    break;
                case"bottom":
                    n = 1;
                    break;
                default:
                    n = l[0] / m.height
            }
            switch (l[1]) {
                case"left":
                    k = 0;
                    break;
                case"center":
                    k = 0.5;
                    break;
                case"right":
                    k = 1;
                    break;
                default:
                    k = l[1] / m.width
            }
            return {x: k, y: n}
        }, createWrapper: function (k) {
            if (k.parent().is(".ui-effects-wrapper")) {
                return k.parent()
            }
            var l = {
                width: k.outerWidth(true),
                height: k.outerHeight(true),
                "float": k.css("float")
            }, m = g("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            });
            k.wrap(m);
            m = k.parent();
            if (k.css("position") == "static") {
                m.css({position: "relative"});
                k.css({position: "relative"})
            } else {
                g.extend(l, {position: k.css("position"), zIndex: k.css("z-index")});
                g.each(["top", "left", "bottom", "right"], function (n, p) {
                    l[p] = k.css(p);
                    if (isNaN(parseInt(l[p], 10))) {
                        l[p] = "auto"
                    }
                });
                k.css({position: "relative", top: 0, left: 0})
            }
            return m.css(l).show()
        }, removeWrapper: function (k) {
            if (k.parent().is(".ui-effects-wrapper")) {
                return k.parent().replaceWith(k)
            }
            return k
        }, setTransition: function (l, n, k, m) {
            m = m || {};
            g.each(n, function (q, p) {
                unit = l.cssUnit(p);
                if (unit[0] > 0) {
                    m[p] = unit[0] * k + unit[1]
                }
            });
            return m
        }
    });
    function d(l, k, m, n) {
        if (typeof l == "object") {
            n = k;
            m = null;
            k = l;
            l = k.effect
        }
        if (g.isFunction(k)) {
            n = k;
            m = null;
            k = {}
        }
        if (g.isFunction(m)) {
            n = m;
            m = null
        }
        if (typeof k == "number" || g.fx.speeds[k]) {
            n = m;
            m = k;
            k = {}
        }
        k = k || {};
        m = m || k.duration;
        m = g.fx.off ? 0 : typeof m == "number" ? m : g.fx.speeds[m] || g.fx.speeds._default;
        n = n || k.complete;
        return [l, k, m, n]
    }

    g.fn.extend({
        effect: function (n, m, q, r) {
            var l = d.apply(this, arguments), p = {options: l[1], duration: l[2], callback: l[3]}, k = g.effects[n];
            return k && !g.fx.off ? k.call(this, p) : this
        }, _show: g.fn.show, show: function (l) {
            if (!l || typeof l == "number" || g.fx.speeds[l]) {
                return this._show.apply(this, arguments)
            } else {
                var k = d.apply(this, arguments);
                k[1].mode = "show";
                return this.effect.apply(this, k)
            }
        }, _hide: g.fn.hide, hide: function (l) {
            if (!l || typeof l == "number" || g.fx.speeds[l]) {
                return this._hide.apply(this, arguments)
            } else {
                var k = d.apply(this, arguments);
                k[1].mode = "hide";
                return this.effect.apply(this, k)
            }
        }, __toggle: g.fn.toggle, toggle: function (l) {
            if (!l || typeof l == "number" || g.fx.speeds[l] || typeof l == "boolean" || g.isFunction(l)) {
                return this.__toggle.apply(this, arguments)
            } else {
                var k = d.apply(this, arguments);
                k[1].mode = "toggle";
                return this.effect.apply(this, k)
            }
        }, cssUnit: function (k) {
            var l = this.css(k), m = [];
            g.each(["em", "px", "%", "pt"], function (n, p) {
                if (l.indexOf(p) > 0) {
                    m = [parseFloat(l), p]
                }
            });
            return m
        }
    });
    g.easing.jswing = g.easing.swing;
    g.extend(g.easing, {
        def: "easeOutQuad", swing: function (l, m, k, p, n) {
            return g.easing[g.easing.def](l, m, k, p, n)
        }, easeInQuad: function (l, m, k, p, n) {
            return p * (m /= n) * m + k
        }, easeOutQuad: function (l, m, k, p, n) {
            return -p * (m /= n) * (m - 2) + k
        }, easeInOutQuad: function (l, m, k, p, n) {
            if ((m /= n / 2) < 1) {
                return p / 2 * m * m + k
            }
            return -p / 2 * ((--m) * (m - 2) - 1) + k
        }, easeInCubic: function (l, m, k, p, n) {
            return p * (m /= n) * m * m + k
        }, easeOutCubic: function (l, m, k, p, n) {
            return p * ((m = m / n - 1) * m * m + 1) + k
        }, easeInOutCubic: function (l, m, k, p, n) {
            if ((m /= n / 2) < 1) {
                return p / 2 * m * m * m + k
            }
            return p / 2 * ((m -= 2) * m * m + 2) + k
        }, easeInQuart: function (l, m, k, p, n) {
            return p * (m /= n) * m * m * m + k
        }, easeOutQuart: function (l, m, k, p, n) {
            return -p * ((m = m / n - 1) * m * m * m - 1) + k
        }, easeInOutQuart: function (l, m, k, p, n) {
            if ((m /= n / 2) < 1) {
                return p / 2 * m * m * m * m + k
            }
            return -p / 2 * ((m -= 2) * m * m * m - 2) + k
        }, easeInQuint: function (l, m, k, p, n) {
            return p * (m /= n) * m * m * m * m + k
        }, easeOutQuint: function (l, m, k, p, n) {
            return p * ((m = m / n - 1) * m * m * m * m + 1) + k
        }, easeInOutQuint: function (l, m, k, p, n) {
            if ((m /= n / 2) < 1) {
                return p / 2 * m * m * m * m * m + k
            }
            return p / 2 * ((m -= 2) * m * m * m * m + 2) + k
        }, easeInSine: function (l, m, k, p, n) {
            return -p * Math.cos(m / n * (Math.PI / 2)) + p + k
        }, easeOutSine: function (l, m, k, p, n) {
            return p * Math.sin(m / n * (Math.PI / 2)) + k
        }, easeInOutSine: function (l, m, k, p, n) {
            return -p / 2 * (Math.cos(Math.PI * m / n) - 1) + k
        }, easeInExpo: function (l, m, k, p, n) {
            return (m == 0) ? k : p * Math.pow(2, 10 * (m / n - 1)) + k
        }, easeOutExpo: function (l, m, k, p, n) {
            return (m == n) ? k + p : p * (-Math.pow(2, -10 * m / n) + 1) + k
        }, easeInOutExpo: function (l, m, k, p, n) {
            if (m == 0) {
                return k
            }
            if (m == n) {
                return k + p
            }
            if ((m /= n / 2) < 1) {
                return p / 2 * Math.pow(2, 10 * (m - 1)) + k
            }
            return p / 2 * (-Math.pow(2, -10 * --m) + 2) + k
        }, easeInCirc: function (l, m, k, p, n) {
            return -p * (Math.sqrt(1 - (m /= n) * m) - 1) + k
        }, easeOutCirc: function (l, m, k, p, n) {
            return p * Math.sqrt(1 - (m = m / n - 1) * m) + k
        }, easeInOutCirc: function (l, m, k, p, n) {
            if ((m /= n / 2) < 1) {
                return -p / 2 * (Math.sqrt(1 - m * m) - 1) + k
            }
            return p / 2 * (Math.sqrt(1 - (m -= 2) * m) + 1) + k
        }, easeInElastic: function (l, n, k, v, u) {
            var q = 1.70158;
            var r = 0;
            var m = v;
            if (n == 0) {
                return k
            }
            if ((n /= u) == 1) {
                return k + v
            }
            if (!r) {
                r = u * 0.3
            }
            if (m < Math.abs(v)) {
                m = v;
                var q = r / 4
            } else {
                var q = r / (2 * Math.PI) * Math.asin(v / m)
            }
            return -(m * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * u - q) * (2 * Math.PI) / r)) + k
        }, easeOutElastic: function (l, n, k, v, u) {
            var q = 1.70158;
            var r = 0;
            var m = v;
            if (n == 0) {
                return k
            }
            if ((n /= u) == 1) {
                return k + v
            }
            if (!r) {
                r = u * 0.3
            }
            if (m < Math.abs(v)) {
                m = v;
                var q = r / 4
            } else {
                var q = r / (2 * Math.PI) * Math.asin(v / m)
            }
            return m * Math.pow(2, -10 * n) * Math.sin((n * u - q) * (2 * Math.PI) / r) + v + k
        }, easeInOutElastic: function (l, n, k, v, u) {
            var q = 1.70158;
            var r = 0;
            var m = v;
            if (n == 0) {
                return k
            }
            if ((n /= u / 2) == 2) {
                return k + v
            }
            if (!r) {
                r = u * (0.3 * 1.5)
            }
            if (m < Math.abs(v)) {
                m = v;
                var q = r / 4
            } else {
                var q = r / (2 * Math.PI) * Math.asin(v / m)
            }
            if (n < 1) {
                return -0.5 * (m * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * u - q) * (2 * Math.PI) / r)) + k
            }
            return m * Math.pow(2, -10 * (n -= 1)) * Math.sin((n * u - q) * (2 * Math.PI) / r) * 0.5 + v + k
        }, easeInBack: function (l, m, k, q, p, n) {
            if (n == undefined) {
                n = 1.70158
            }
            return q * (m /= p) * m * ((n + 1) * m - n) + k
        }, easeOutBack: function (l, m, k, q, p, n) {
            if (n == undefined) {
                n = 1.70158
            }
            return q * ((m = m / p - 1) * m * ((n + 1) * m + n) + 1) + k
        }, easeInOutBack: function (l, m, k, q, p, n) {
            if (n == undefined) {
                n = 1.70158
            }
            if ((m /= p / 2) < 1) {
                return q / 2 * (m * m * (((n *= (1.525)) + 1) * m - n)) + k
            }
            return q / 2 * ((m -= 2) * m * (((n *= (1.525)) + 1) * m + n) + 2) + k
        }, easeInBounce: function (l, m, k, p, n) {
            return p - g.easing.easeOutBounce(l, n - m, 0, p, n) + k
        }, easeOutBounce: function (l, m, k, p, n) {
            if ((m /= n) < (1 / 2.75)) {
                return p * (7.5625 * m * m) + k
            } else {
                if (m < (2 / 2.75)) {
                    return p * (7.5625 * (m -= (1.5 / 2.75)) * m + 0.75) + k
                } else {
                    if (m < (2.5 / 2.75)) {
                        return p * (7.5625 * (m -= (2.25 / 2.75)) * m + 0.9375) + k
                    } else {
                        return p * (7.5625 * (m -= (2.625 / 2.75)) * m + 0.984375) + k
                    }
                }
            }
        }, easeInOutBounce: function (l, m, k, p, n) {
            if (m < n / 2) {
                return g.easing.easeInBounce(l, m * 2, 0, p, n) * 0.5 + k
            }
            return g.easing.easeOutBounce(l, m * 2 - n, 0, p, n) * 0.5 + p * 0.5 + k
        }
    })
})(jQuery);
(function (a) {
    a.effects.blind = function (b) {
        return this.queue(function () {
            var d = a(this), c = ["position", "top", "left"];
            var h = a.effects.setMode(d, b.options.mode || "hide");
            var g = b.options.direction || "vertical";
            a.effects.save(d, c);
            d.show();
            var j = a.effects.createWrapper(d).css({overflow: "hidden"});
            var e = (g == "vertical") ? "height" : "width";
            var i = (g == "vertical") ? j.height() : j.width();
            if (h == "show") {
                j.css(e, 0)
            }
            var f = {};
            f[e] = h == "show" ? i : 0;
            j.animate(f, b.duration, b.options.easing, function () {
                if (h == "hide") {
                    d.hide()
                }
                a.effects.restore(d, c);
                a.effects.removeWrapper(d);
                if (b.callback) {
                    b.callback.apply(d[0], arguments)
                }
                d.dequeue()
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.bounce = function (b) {
        return this.queue(function () {
            var e = a(this), l = ["position", "top", "left"];
            var k = a.effects.setMode(e, b.options.mode || "effect");
            var n = b.options.direction || "up";
            var c = b.options.distance || 20;
            var d = b.options.times || 5;
            var g = b.duration || 250;
            if (/show|hide/.test(k)) {
                l.push("opacity")
            }
            a.effects.save(e, l);
            e.show();
            a.effects.createWrapper(e);
            var f = (n == "up" || n == "down") ? "top" : "left";
            var q = (n == "up" || n == "left") ? "pos" : "neg";
            var c = b.options.distance || (f == "top" ? e.outerHeight({margin: true}) / 3 : e.outerWidth({margin: true}) / 3);
            if (k == "show") {
                e.css("opacity", 0).css(f, q == "pos" ? -c : c)
            }
            if (k == "hide") {
                c = c / (d * 2)
            }
            if (k != "hide") {
                d--
            }
            if (k == "show") {
                var h = {opacity: 1};
                h[f] = (q == "pos" ? "+=" : "-=") + c;
                e.animate(h, g / 2, b.options.easing);
                c = c / 2;
                d--
            }
            for (var j = 0; j < d; j++) {
                var p = {}, m = {};
                p[f] = (q == "pos" ? "-=" : "+=") + c;
                m[f] = (q == "pos" ? "+=" : "-=") + c;
                e.animate(p, g / 2, b.options.easing).animate(m, g / 2, b.options.easing);
                c = (k == "hide") ? c * 2 : c / 2
            }
            if (k == "hide") {
                var h = {opacity: 0};
                h[f] = (q == "pos" ? "-=" : "+=") + c;
                e.animate(h, g / 2, b.options.easing, function () {
                    e.hide();
                    a.effects.restore(e, l);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            } else {
                var p = {}, m = {};
                p[f] = (q == "pos" ? "-=" : "+=") + c;
                m[f] = (q == "pos" ? "+=" : "-=") + c;
                e.animate(p, g / 2, b.options.easing).animate(m, g / 2, b.options.easing, function () {
                    a.effects.restore(e, l);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            }
            e.queue("fx", function () {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
(function (a) {
    a.effects.clip = function (b) {
        return this.queue(function () {
            var f = a(this), j = ["position", "top", "left", "height", "width"];
            var i = a.effects.setMode(f, b.options.mode || "hide");
            var k = b.options.direction || "vertical";
            a.effects.save(f, j);
            f.show();
            var c = a.effects.createWrapper(f).css({overflow: "hidden"});
            var e = f[0].tagName == "IMG" ? c : f;
            var g = {size: (k == "vertical") ? "height" : "width", position: (k == "vertical") ? "top" : "left"};
            var d = (k == "vertical") ? e.height() : e.width();
            if (i == "show") {
                e.css(g.size, 0);
                e.css(g.position, d / 2)
            }
            var h = {};
            h[g.size] = i == "show" ? d : 0;
            h[g.position] = i == "show" ? 0 : d / 2;
            e.animate(h, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    if (i == "hide") {
                        f.hide()
                    }
                    a.effects.restore(f, j);
                    a.effects.removeWrapper(f);
                    if (b.callback) {
                        b.callback.apply(f[0], arguments)
                    }
                    f.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.drop = function (b) {
        return this.queue(function () {
            var e = a(this), d = ["position", "top", "left", "opacity"];
            var i = a.effects.setMode(e, b.options.mode || "hide");
            var h = b.options.direction || "left";
            a.effects.save(e, d);
            e.show();
            a.effects.createWrapper(e);
            var f = (h == "up" || h == "down") ? "top" : "left";
            var c = (h == "up" || h == "left") ? "pos" : "neg";
            var j = b.options.distance || (f == "top" ? e.outerHeight({margin: true}) / 2 : e.outerWidth({margin: true}) / 2);
            if (i == "show") {
                e.css("opacity", 0).css(f, c == "pos" ? -j : j)
            }
            var g = {opacity: i == "show" ? 1 : 0};
            g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
            e.animate(g, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    if (i == "hide") {
                        e.hide()
                    }
                    a.effects.restore(e, d);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.explode = function (b) {
        return this.queue(function () {
            var k = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
            var e = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
            b.options.mode = b.options.mode == "toggle" ? (a(this).is(":visible") ? "hide" : "show") : b.options.mode;
            var h = a(this).show().css("visibility", "hidden");
            var l = h.offset();
            l.top -= parseInt(h.css("marginTop"), 10) || 0;
            l.left -= parseInt(h.css("marginLeft"), 10) || 0;
            var g = h.outerWidth(true);
            var c = h.outerHeight(true);
            for (var f = 0; f < k; f++) {
                for (var d = 0; d < e; d++) {
                    h.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -d * (g / e),
                        top: -f * (c / k)
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: g / e,
                        height: c / k,
                        left: l.left + d * (g / e) + (b.options.mode == "show" ? (d - Math.floor(e / 2)) * (g / e) : 0),
                        top: l.top + f * (c / k) + (b.options.mode == "show" ? (f - Math.floor(k / 2)) * (c / k) : 0),
                        opacity: b.options.mode == "show" ? 0 : 1
                    }).animate({
                        left: l.left + d * (g / e) + (b.options.mode == "show" ? 0 : (d - Math.floor(e / 2)) * (g / e)),
                        top: l.top + f * (c / k) + (b.options.mode == "show" ? 0 : (f - Math.floor(k / 2)) * (c / k)),
                        opacity: b.options.mode == "show" ? 1 : 0
                    }, b.duration || 500)
                }
            }
            setTimeout(function () {
                b.options.mode == "show" ? h.css({visibility: "visible"}) : h.css({visibility: "visible"}).hide();
                if (b.callback) {
                    b.callback.apply(h[0])
                }
                h.dequeue();
                a("div.ui-effects-explode").remove()
            }, b.duration || 500)
        })
    }
})(jQuery);
(function (a) {
    a.effects.fade = function (b) {
        return this.queue(function () {
            var c = a(this), d = a.effects.setMode(c, b.options.mode || "hide");
            c.animate({opacity: d}, {
                queue: false,
                duration: b.duration,
                easing: b.options.easing,
                complete: function () {
                    (b.callback && b.callback.apply(this, arguments));
                    c.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.fold = function (b) {
        return this.queue(function () {
            var e = a(this), k = ["position", "top", "left"];
            var h = a.effects.setMode(e, b.options.mode || "hide");
            var p = b.options.size || 15;
            var n = !(!b.options.horizFirst);
            var g = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
            a.effects.save(e, k);
            e.show();
            var d = a.effects.createWrapper(e).css({overflow: "hidden"});
            var i = ((h == "show") != n);
            var f = i ? ["width", "height"] : ["height", "width"];
            var c = i ? [d.width(), d.height()] : [d.height(), d.width()];
            var j = /([0-9]+)%/.exec(p);
            if (j) {
                p = parseInt(j[1], 10) / 100 * c[h == "hide" ? 0 : 1]
            }
            if (h == "show") {
                d.css(n ? {height: 0, width: p} : {height: p, width: 0})
            }
            var m = {}, l = {};
            m[f[0]] = h == "show" ? c[0] : p;
            l[f[1]] = h == "show" ? c[1] : 0;
            d.animate(m, g, b.options.easing).animate(l, g, b.options.easing, function () {
                if (h == "hide") {
                    e.hide()
                }
                a.effects.restore(e, k);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(e[0], arguments)
                }
                e.dequeue()
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.highlight = function (b) {
        return this.queue(function () {
            var d = a(this), c = ["backgroundImage", "backgroundColor", "opacity"], f = a.effects.setMode(d, b.options.mode || "show"), e = {backgroundColor: d.css("backgroundColor")};
            if (f == "hide") {
                e.opacity = 0
            }
            a.effects.save(d, c);
            d.show().css({
                backgroundImage: "none",
                backgroundColor: b.options.color || "#ffff99"
            }).animate(e, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    (f == "hide" && d.hide());
                    a.effects.restore(d, c);
                    (f == "show" && !a.support.opacity && this.style.removeAttribute("filter"));
                    (b.callback && b.callback.apply(this, arguments));
                    d.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.pulsate = function (b) {
        return this.queue(function () {
            var d = a(this), e = a.effects.setMode(d, b.options.mode || "show");
            times = ((b.options.times || 5) * 2) - 1;
            duration = b.duration ? b.duration / 2 : a.fx.speeds._default / 2, isVisible = d.is(":visible"), animateTo = 0;
            if (!isVisible) {
                d.css("opacity", 0).show();
                animateTo = 1
            }
            if ((e == "hide" && isVisible) || (e == "show" && !isVisible)) {
                times--
            }
            for (var c = 0; c < times; c++) {
                d.animate({opacity: animateTo}, duration, b.options.easing);
                animateTo = (animateTo + 1) % 2
            }
            d.animate({opacity: animateTo}, duration, b.options.easing, function () {
                if (animateTo == 0) {
                    d.hide()
                }
                (b.callback && b.callback.apply(this, arguments))
            });
            d.queue("fx", function () {
                d.dequeue()
            }).dequeue()
        })
    }
})(jQuery);
(function (a) {
    a.effects.puff = function (b) {
        return this.queue(function () {
            var f = a(this), g = a.effects.setMode(f, b.options.mode || "hide"), e = parseInt(b.options.percent, 10) || 150, d = e / 100, c = {
                height: f.height(),
                width: f.width()
            };
            a.extend(b.options, {
                fade: true,
                mode: g,
                percent: g == "hide" ? e : 100,
                from: g == "hide" ? c : {height: c.height * d, width: c.width * d}
            });
            f.effect("scale", b.options, b.duration, b.callback);
            f.dequeue()
        })
    };
    a.effects.scale = function (b) {
        return this.queue(function () {
            var g = a(this);
            var d = a.extend(true, {}, b.options);
            var j = a.effects.setMode(g, b.options.mode || "effect");
            var h = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : (j == "hide" ? 0 : 100));
            var i = b.options.direction || "both";
            var c = b.options.origin;
            if (j != "effect") {
                d.origin = c || ["middle", "center"];
                d.restore = true
            }
            var f = {height: g.height(), width: g.width()};
            g.from = b.options.from || (j == "show" ? {height: 0, width: 0} : f);
            var e = {y: i != "horizontal" ? (h / 100) : 1, x: i != "vertical" ? (h / 100) : 1};
            g.to = {height: f.height * e.y, width: f.width * e.x};
            if (b.options.fade) {
                if (j == "show") {
                    g.from.opacity = 0;
                    g.to.opacity = 1
                }
                if (j == "hide") {
                    g.from.opacity = 1;
                    g.to.opacity = 0
                }
            }
            d.from = g.from;
            d.to = g.to;
            d.mode = j;
            g.effect("size", d, b.duration, b.callback);
            g.dequeue()
        })
    };
    a.effects.size = function (b) {
        return this.queue(function () {
            var c = a(this), n = ["position", "top", "left", "width", "height", "overflow", "opacity"];
            var m = ["position", "top", "left", "overflow", "opacity"];
            var j = ["width", "height", "overflow"];
            var q = ["fontSize"];
            var k = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
            var f = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
            var g = a.effects.setMode(c, b.options.mode || "effect");
            var i = b.options.restore || false;
            var e = b.options.scale || "both";
            var p = b.options.origin;
            var d = {height: c.height(), width: c.width()};
            c.from = b.options.from || d;
            c.to = b.options.to || d;
            if (p) {
                var h = a.effects.getBaseline(p, d);
                c.from.top = (d.height - c.from.height) * h.y;
                c.from.left = (d.width - c.from.width) * h.x;
                c.to.top = (d.height - c.to.height) * h.y;
                c.to.left = (d.width - c.to.width) * h.x
            }
            var l = {
                from: {y: c.from.height / d.height, x: c.from.width / d.width},
                to: {y: c.to.height / d.height, x: c.to.width / d.width}
            };
            if (e == "box" || e == "both") {
                if (l.from.y != l.to.y) {
                    n = n.concat(k);
                    c.from = a.effects.setTransition(c, k, l.from.y, c.from);
                    c.to = a.effects.setTransition(c, k, l.to.y, c.to)
                }
                if (l.from.x != l.to.x) {
                    n = n.concat(f);
                    c.from = a.effects.setTransition(c, f, l.from.x, c.from);
                    c.to = a.effects.setTransition(c, f, l.to.x, c.to)
                }
            }
            if (e == "content" || e == "both") {
                if (l.from.y != l.to.y) {
                    n = n.concat(q);
                    c.from = a.effects.setTransition(c, q, l.from.y, c.from);
                    c.to = a.effects.setTransition(c, q, l.to.y, c.to)
                }
            }
            a.effects.save(c, i ? n : m);
            c.show();
            a.effects.createWrapper(c);
            c.css("overflow", "hidden").css(c.from);
            if (e == "content" || e == "both") {
                k = k.concat(["marginTop", "marginBottom"]).concat(q);
                f = f.concat(["marginLeft", "marginRight"]);
                j = n.concat(k).concat(f);
                c.find("*[width]").each(function () {
                    child = a(this);
                    if (i) {
                        a.effects.save(child, j)
                    }
                    var r = {height: child.height(), width: child.width()};
                    child.from = {height: r.height * l.from.y, width: r.width * l.from.x};
                    child.to = {height: r.height * l.to.y, width: r.width * l.to.x};
                    if (l.from.y != l.to.y) {
                        child.from = a.effects.setTransition(child, k, l.from.y, child.from);
                        child.to = a.effects.setTransition(child, k, l.to.y, child.to)
                    }
                    if (l.from.x != l.to.x) {
                        child.from = a.effects.setTransition(child, f, l.from.x, child.from);
                        child.to = a.effects.setTransition(child, f, l.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, b.duration, b.options.easing, function () {
                        if (i) {
                            a.effects.restore(child, j)
                        }
                    })
                })
            }
            c.animate(c.to, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    if (c.to.opacity === 0) {
                        c.css("opacity", c.from.opacity)
                    }
                    if (g == "hide") {
                        c.hide()
                    }
                    a.effects.restore(c, i ? n : m);
                    a.effects.removeWrapper(c);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    c.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.shake = function (b) {
        return this.queue(function () {
            var e = a(this), l = ["position", "top", "left"];
            var k = a.effects.setMode(e, b.options.mode || "effect");
            var n = b.options.direction || "left";
            var c = b.options.distance || 20;
            var d = b.options.times || 3;
            var g = b.duration || b.options.duration || 140;
            a.effects.save(e, l);
            e.show();
            a.effects.createWrapper(e);
            var f = (n == "up" || n == "down") ? "top" : "left";
            var q = (n == "up" || n == "left") ? "pos" : "neg";
            var h = {}, p = {}, m = {};
            h[f] = (q == "pos" ? "-=" : "+=") + c;
            p[f] = (q == "pos" ? "+=" : "-=") + c * 2;
            m[f] = (q == "pos" ? "-=" : "+=") + c * 2;
            e.animate(h, g, b.options.easing);
            for (var j = 1; j < d; j++) {
                e.animate(p, g, b.options.easing).animate(m, g, b.options.easing)
            }
            e.animate(p, g, b.options.easing).animate(h, g / 2, b.options.easing, function () {
                a.effects.restore(e, l);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(this, arguments)
                }
            });
            e.queue("fx", function () {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
(function (a) {
    a.effects.slide = function (b) {
        return this.queue(function () {
            var e = a(this), d = ["position", "top", "left"];
            var i = a.effects.setMode(e, b.options.mode || "show");
            var h = b.options.direction || "left";
            a.effects.save(e, d);
            e.show();
            a.effects.createWrapper(e).css({overflow: "hidden"});
            var f = (h == "up" || h == "down") ? "top" : "left";
            var c = (h == "up" || h == "left") ? "pos" : "neg";
            var j = b.options.distance || (f == "top" ? e.outerHeight({margin: true}) : e.outerWidth({margin: true}));
            if (i == "show") {
                e.css(f, c == "pos" ? -j : j)
            }
            var g = {};
            g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
            e.animate(g, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    if (i == "hide") {
                        e.hide()
                    }
                    a.effects.restore(e, d);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.transfer = function (b) {
        return this.queue(function () {
            var f = a(this), h = a(b.options.to), e = h.offset(), g = {
                top: e.top,
                left: e.left,
                height: h.innerHeight(),
                width: h.innerWidth()
            }, d = f.offset(), c = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({
                top: d.top,
                left: d.left,
                height: f.innerHeight(),
                width: f.innerWidth(),
                position: "absolute"
            }).animate(g, b.duration, b.options.easing, function () {
                c.remove();
                (b.callback && b.callback.apply(f[0], arguments));
                f.dequeue()
            })
        })
    }
})(jQuery);
(function (a) {
    a.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {header: "ui-icon-triangle-1-e", headerSelected: "ui-icon-triangle-1-s"},
            navigation: false,
            navigationFilter: function () {
                return this.href.toLowerCase() == location.href.toLowerCase()
            }
        }, _create: function () {
            var d = this.options, b = this;
            this.running = 0;
            this.element.addClass("ui-accordion ui-widget ui-helper-reset");
            this.element.children("li").addClass("ui-accordion-li-fix");
            this.headers = this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                a(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function () {
                a(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function () {
                a(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function () {
                a(this).removeClass("ui-state-focus")
            });
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (d.navigation) {
                var c = this.element.find("a").filter(d.navigationFilter);
                if (c.length) {
                    var e = c.closest(".ui-accordion-header");
                    if (e.length) {
                        this.active = e
                    } else {
                        this.active = c.closest(".ui-accordion-content").prev()
                    }
                }
            }
            this.active = this._findActive(this.active || d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            this.active.next().addClass("ui-accordion-content-active");
            this._createIcons();
            this.resize();
            this.element.attr("role", "tablist");
            this.headers.attr("role", "tab").bind("keydown", function (f) {
                return b._keydown(f)
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active || "").attr("aria-expanded", "false").attr("tabIndex", "-1").next().hide();
            if (!this.active.length) {
                this.headers.eq(0).attr("tabIndex", "0")
            } else {
                this.active.attr("aria-expanded", "true").attr("tabIndex", "0")
            }
            if (!a.browser.safari) {
                this.headers.find("a").attr("tabIndex", "-1")
            }
            if (d.event) {
                this.headers.bind((d.event) + ".accordion", function (f) {
                    b._clickHandler.call(b, f, this);
                    f.preventDefault()
                })
            }
        }, _createIcons: function () {
            var b = this.options;
            if (b.icons) {
                a("<span/>").addClass("ui-icon " + b.icons.header).prependTo(this.headers);
                this.active.find(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected);
                this.element.addClass("ui-accordion-icons")
            }
        }, _destroyIcons: function () {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons")
        }, destroy: function () {
            var c = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
            this.headers.find("a").removeAttr("tabIndex");
            this._destroyIcons();
            var b = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
            if (c.autoHeight || c.fillHeight) {
                b.css("height", "")
            }
            return this
        }, _setOption: function (b, c) {
            this._superApply("_setOption", arguments);
            if (b == "active") {
                this.activate(c)
            }
            if (b == "icons") {
                this._destroyIcons();
                if (c) {
                    this._createIcons()
                }
            }
        }, _keydown: function (e) {
            var g = this.options, f = a.ui.keyCode;
            if (g.disabled || e.altKey || e.ctrlKey) {
                return
            }
            var d = this.headers.length;
            var b = this.headers.index(e.target);
            var c = false;
            switch (e.keyCode) {
                case f.RIGHT:
                case f.DOWN:
                    c = this.headers[(b + 1) % d];
                    break;
                case f.LEFT:
                case f.UP:
                    c = this.headers[(b - 1 + d) % d];
                    break;
                case f.SPACE:
                case f.ENTER:
                    this._clickHandler({target: e.target}, e.target);
                    e.preventDefault()
            }
            if (c) {
                a(e.target).attr("tabIndex", "-1");
                a(c).attr("tabIndex", "0");
                c.focus();
                return false
            }
            return true
        }, resize: function () {
            var d = this.options, c;
            if (d.fillSpace) {
                if (a.browser.msie) {
                    var b = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                c = this.element.parent().height();
                if (a.browser.msie) {
                    this.element.parent().css("overflow", b)
                }
                this.headers.each(function () {
                    c -= a(this).outerHeight(true)
                });
                this.headers.next().each(function () {
                    a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")
            } else {
                if (d.autoHeight) {
                    c = 0;
                    this.headers.next().each(function () {
                        c = Math.max(c, a(this).height())
                    }).height(c)
                }
            }
            return this
        }, activate: function (b) {
            this.options.active = b;
            var c = this._findActive(b)[0];
            this._clickHandler({target: c}, c);
            return this
        }, _findActive: function (b) {
            return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === false ? a([]) : this.headers.filter(":eq(0)")
        }, _clickHandler: function (b, f) {
            var d = this.options;
            if (d.disabled) {
                return
            }
            if (!b.target) {
                if (!d.collapsible) {
                    return
                }
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var h = this.active.next(), e = {
                    options: d,
                    newHeader: a([]),
                    oldHeader: d.active,
                    newContent: a([]),
                    oldContent: h
                }, c = (this.active = a([]));
                this._toggle(c, h, e);
                return
            }
            var g = a(b.currentTarget || f);
            var i = g[0] == this.active[0];
            d.active = d.collapsible && i ? false : a(".ui-accordion-header", this.element).index(g);
            if (this.running || (!d.collapsible && i)) {
                return
            }
            this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
            if (!i) {
                g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
                g.next().addClass("ui-accordion-content-active")
            }
            var c = g.next(), h = this.active.next(), e = {
                options: d,
                newHeader: i && d.collapsible ? a([]) : g,
                oldHeader: this.active,
                newContent: i && d.collapsible ? a([]) : c,
                oldContent: h
            }, j = this.headers.index(this.active[0]) > this.headers.index(g[0]);
            this.active = i ? a([]) : g;
            this._toggle(c, h, e, i, j);
            return
        }, _toggle: function (b, i, g, j, k) {
            var d = this.options, m = this;
            this.toShow = b;
            this.toHide = i;
            this.data = g;
            var c = function () {
                if (!m) {
                    return
                }
                return m._completed.apply(m, arguments)
            };
            this._trigger("changestart", null, this.data);
            this.running = i.size() === 0 ? b.size() : i.size();
            if (d.animated) {
                var f = {};
                if (d.collapsible && j) {
                    f = {toShow: a([]), toHide: i, complete: c, down: k, autoHeight: d.autoHeight || d.fillSpace}
                } else {
                    f = {toShow: b, toHide: i, complete: c, down: k, autoHeight: d.autoHeight || d.fillSpace}
                }
                if (!d.proxied) {
                    d.proxied = d.animated
                }
                if (!d.proxiedDuration) {
                    d.proxiedDuration = d.duration
                }
                d.animated = a.isFunction(d.proxied) ? d.proxied(f) : d.proxied;
                d.duration = a.isFunction(d.proxiedDuration) ? d.proxiedDuration(f) : d.proxiedDuration;
                var l = a.ui.accordion.animations, e = d.duration, h = d.animated;
                if (h && !l[h] && !a.easing[h]) {
                    h = "slide"
                }
                if (!l[h]) {
                    l[h] = function (n) {
                        this.slide(n, {easing: h, duration: e || 700})
                    }
                }
                l[h](f)
            } else {
                if (d.collapsible && j) {
                    b.toggle()
                } else {
                    i.hide();
                    b.show()
                }
                c(true)
            }
            i.prev().attr("aria-expanded", "false").attr("tabIndex", "-1").blur();
            b.prev().attr("aria-expanded", "true").attr("tabIndex", "0").focus()
        }, _completed: function (b) {
            var c = this.options;
            this.running = b ? 0 : --this.running;
            if (this.running) {
                return
            }
            if (c.clearStyle) {
                this.toShow.add(this.toHide).css({height: "", overflow: ""})
            }
            this.toHide.removeClass("ui-accordion-content-active");
            this._trigger("change", null, this.data)
        }
    });
    a.extend(a.ui.accordion, {
        version: "1.9m2", animations: {
            slide: function (j, h) {
                j = a.extend({easing: "swing", duration: 300}, j, h);
                if (!j.toHide.size()) {
                    j.toShow.animate({height: "show"}, j);
                    return
                }
                if (!j.toShow.size()) {
                    j.toHide.animate({height: "hide"}, j);
                    return
                }
                var c = j.toShow.css("overflow"), g = 0, d = {}, f = {}, e = ["height", "paddingTop", "paddingBottom"], b;
                var i = j.toShow;
                b = i[0].style.width;
                i.width(parseInt(i.parent().width(), 10) - parseInt(i.css("paddingLeft"), 10) - parseInt(i.css("paddingRight"), 10) - (parseInt(i.css("borderLeftWidth"), 10) || 0) - (parseInt(i.css("borderRightWidth"), 10) || 0));
                a.each(e, function (k, m) {
                    f[m] = "hide";
                    var l = ("" + a.css(j.toShow[0], m)).match(/^([\d+-.]+)(.*)$/);
                    d[m] = {value: l[1], unit: l[2] || "px"}
                });
                j.toShow.css({height: 0, overflow: "hidden"}).show();
                j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f, {
                    step: function (k, l) {
                        if (l.prop == "height") {
                            g = (l.end - l.start === 0) ? 0 : (l.now - l.start) / (l.end - l.start)
                        }
                        j.toShow[0].style[l.prop] = (g * d[l.prop].value) + d[l.prop].unit
                    }, duration: j.duration, easing: j.easing, complete: function () {
                        if (!j.autoHeight) {
                            j.toShow.css("height", "")
                        }
                        j.toShow.css("width", b);
                        j.toShow.css({overflow: c});
                        j.complete()
                    }
                })
            }, bounceslide: function (b) {
                this.slide(b, {easing: b.down ? "easeOutBounce" : "swing", duration: b.down ? 1000 : 200})
            }
        }
    })
})(jQuery);
(function (a) {
    a.widget("ui.autocomplete", {
        options: {minLength: 1, delay: 300}, _create: function () {
            var b = this, c = this.element[0].ownerDocument;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function (d) {
                var e = a.ui.keyCode;
                switch (d.keyCode) {
                    case e.PAGE_UP:
                        b._move("previousPage", d);
                        break;
                    case e.PAGE_DOWN:
                        b._move("nextPage", d);
                        break;
                    case e.UP:
                        b._move("previous", d);
                        d.preventDefault();
                        break;
                    case e.DOWN:
                        b._move("next", d);
                        d.preventDefault();
                        break;
                    case e.ENTER:
                    case e.NUMPAD_ENTER:
                        if (b.menu.active) {
                            d.preventDefault()
                        }
                    case e.TAB:
                        if (!b.menu.active) {
                            return
                        }
                        b.menu.select(d);
                        break;
                    case e.ESCAPE:
                        b.element.val(b.term);
                        b.close(d);
                        break;
                    case e.LEFT:
                    case e.RIGHT:
                    case e.SHIFT:
                    case e.CONTROL:
                    case e.ALT:
                    case e.COMMAND:
                    case e.COMMAND_RIGHT:
                    case e.INSERT:
                    case e.CAPS_LOCK:
                    case e.END:
                    case e.HOME:
                        break;
                    default:
                        clearTimeout(b.searching);
                        b.searching = setTimeout(function () {
                            b.search(null, d)
                        }, b.options.delay);
                        break
                }
            }).bind("focus.autocomplete", function () {
                b.selectedItem = null;
                b.previous = b.element.val()
            }).bind("blur.autocomplete", function (d) {
                clearTimeout(b.searching);
                b.closing = setTimeout(function () {
                    b.close(d);
                    b._change(d)
                }, 150)
            });
            this._initSource();
            this.response = function () {
                return b._response.apply(b, arguments)
            };
            this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo("body", c).mousedown(function () {
                setTimeout(function () {
                    clearTimeout(b.closing)
                }, 13)
            }).menu({
                input: a(), focus: function (e, f) {
                    var d = f.item.data("item.autocomplete");
                    if (false !== b._trigger("focus", null, {item: d})) {
                        if (/^key/.test(e.originalEvent.type)) {
                            b.element.val(d.value)
                        }
                    }
                }, select: function (f, g) {
                    var e = g.item.data("item.autocomplete");
                    if (false !== b._trigger("select", f, {item: e})) {
                        b.element.val(e.value)
                    }
                    b.close(f);
                    var d = b.previous;
                    if (b.element[0] !== c.activeElement) {
                        b.element.focus();
                        b.previous = d
                    }
                    b.selectedItem = e
                }, blur: function (d, e) {
                    if (b.menu.element.is(":visible")) {
                        b.element.val(b.term)
                    }
                }
            }).zIndex(this.element.zIndex() + 1).css({top: 0, left: 0}).hide().data("menu");
            if (a.fn.bgiframe) {
                this.menu.element.bgiframe()
            }
        }, destroy: function () {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            this._super("destroy")
        }, _setOption: function (b) {
            this._superApply("_setOption", arguments);
            if (b === "source") {
                this._initSource()
            }
        }, _initSource: function () {
            var c, b;
            if (a.isArray(this.options.source)) {
                c = this.options.source;
                this.source = function (e, d) {
                    d(a.ui.autocomplete.filter(c, e.term))
                }
            } else {
                if (typeof this.options.source === "string") {
                    b = this.options.source;
                    this.source = function (e, d) {
                        a.getJSON(b, e, d)
                    }
                } else {
                    this.source = this.options.source
                }
            }
        }, search: function (c, b) {
            c = c != null ? c : this.element.val();
            if (c.length < this.options.minLength) {
                return this.close(b)
            }
            clearTimeout(this.closing);
            if (this._trigger("search") === false) {
                return
            }
            return this._search(c)
        }, _search: function (b) {
            this.term = this.element.addClass("ui-autocomplete-loading").val();
            this.source({term: b}, this.response)
        }, _response: function (b) {
            if (b.length) {
                b = this._normalize(b);
                this._suggest(b);
                this._trigger("open")
            } else {
                this.close()
            }
            this.element.removeClass("ui-autocomplete-loading")
        }, close: function (b) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this._trigger("close", b);
                this.menu.element.hide();
                this.menu.deactivate()
            }
        }, _change: function (b) {
            if (this.previous !== this.element.val()) {
                this._trigger("change", b, {item: this.selectedItem})
            }
        }, _normalize: function (b) {
            if (b.length && b[0].label && b[0].value) {
                return b
            }
            return a.map(b, function (c) {
                if (typeof c === "string") {
                    return {label: c, value: c}
                }
                return a.extend({label: c.label || c.value, value: c.value || c.label}, c)
            })
        }, _suggest: function (b) {
            var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1), d, e;
            this._renderMenu(c, b);
            this.menu.deactivate();
            this.menu.refresh();
            this.menu.element.show().position({my: "left top", at: "left bottom", of: this.element, collision: "none"});
            d = c.width("").width();
            e = this.element.width();
            c.width(Math.max(d, e))
        }, _renderMenu: function (d, c) {
            var b = this;
            a.each(c, function (e, f) {
                b._renderItem(d, f)
            })
        }, _renderItem: function (b, c) {
            return a("<li></li>").data("item.autocomplete", c).append("<a>" + c.label + "</a>").appendTo(b)
        }, _move: function (c, b) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, b);
                return
            }
            if (this.menu.first() && /^previous/.test(c) || this.menu.last() && /^next/.test(c)) {
                this.element.val(this.term);
                this.menu.deactivate();
                return
            }
            this.menu[c](b)
        }, widget: function () {
            return this.menu.element
        }
    });
    a.extend(a.ui.autocomplete, {
        escapeRegex: function (b) {
            return b.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1")
        }, filter: function (d, b) {
            var c = new RegExp(a.ui.autocomplete.escapeRegex(b), "i");
            return a.grep(d, function (e) {
                return c.test(e.label || e.value || e)
            })
        }
    })
}(jQuery));
(function (e) {
    var c, b = "ui-button ui-widget ui-state-default ui-corner-all", g = "ui-state-hover ui-state-active ", f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", d = function (h) {
        e(":ui-button", h.target.form).each(function () {
            var i = e(this).data("button");
            setTimeout(function () {
                i.refresh()
            }, 1)
        })
    }, a = function (i) {
        var h = i.name, j = i.form, k = e([]);
        if (h) {
            if (j) {
                k = e(j).find("[name='" + h + "']")
            } else {
                k = e("[name='" + h + "']", i.ownerDocument).filter(function () {
                    return !this.form
                })
            }
        }
        return k
    };
    e.widget("ui.button", {
        options: {text: true, label: null, icons: {primary: null, secondary: null}},
        _create: function () {
            this.element.closest("form").unbind("reset.button").bind("reset.button", d);
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var h = this, j = this.options, k = this.type === "checkbox" || this.type === "radio", l = "ui-state-hover" + (!k ? " ui-state-active" : ""), i = "ui-state-focus";
            if (j.label === null) {
                j.label = this.buttonElement.html()
            }
            if (this.element.is(":disabled")) {
                j.disabled = true
            }
            this.buttonElement.addClass(b).attr("role", "button").bind("mouseenter.button", function () {
                if (j.disabled) {
                    return
                }
                e(this).addClass("ui-state-hover");
                if (this === c) {
                    e(this).addClass("ui-state-active")
                }
            }).bind("mouseleave.button", function () {
                if (j.disabled) {
                    return
                }
                e(this).removeClass(l)
            }).bind("focus.button", function () {
                e(this).addClass(i)
            }).bind("blur.button", function () {
                e(this).removeClass(i)
            });
            if (k) {
                this.element.bind("change.button", function () {
                    h.refresh()
                })
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click.button", function () {
                    if (j.disabled) {
                        return false
                    }
                    e(this).toggleClass("ui-state-active");
                    h.buttonElement.attr("aria-pressed", h.element[0].checked)
                })
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click.button", function () {
                        if (j.disabled) {
                            return false
                        }
                        e(this).addClass("ui-state-active");
                        h.buttonElement.attr("aria-pressed", true);
                        var m = h.element[0];
                        a(m).not(m).map(function () {
                            return e(this).button("widget")[0]
                        }).removeClass("ui-state-active").attr("aria-pressed", false)
                    })
                } else {
                    this.buttonElement.bind("mousedown.button", function () {
                        if (j.disabled) {
                            return false
                        }
                        e(this).addClass("ui-state-active");
                        c = this;
                        e(document).one("mouseup", function () {
                            c = null
                        })
                    }).bind("mouseup.button", function () {
                        if (j.disabled) {
                            return false
                        }
                        e(this).removeClass("ui-state-active")
                    }).bind("keydown.button", function (m) {
                        if (j.disabled) {
                            return false
                        }
                        if (m.keyCode == e.ui.keyCode.SPACE || m.keyCode == e.ui.keyCode.ENTER) {
                            e(this).addClass("ui-state-active")
                        }
                    }).bind("keyup.button", function () {
                        e(this).removeClass("ui-state-active")
                    });
                    if (this.buttonElement.is("a")) {
                        this.buttonElement.keyup(function (m) {
                            if (m.keyCode === e.ui.keyCode.SPACE) {
                                e(this).click()
                            }
                        })
                    }
                }
            }
            this._setOption("disabled", j.disabled)
        },
        _determineButtonType: function () {
            if (this.element.is(":checkbox")) {
                this.type = "checkbox"
            } else {
                if (this.element.is(":radio")) {
                    this.type = "radio"
                } else {
                    if (this.element.is("input")) {
                        this.type = "input"
                    } else {
                        this.type = "button"
                    }
                }
            }
            if (this.type === "checkbox" || this.type === "radio") {
                this.buttonElement = this.element.parents().last().find("[for=" + this.element.attr("id") + "]");
                this.element.addClass("ui-helper-hidden-accessible");
                var h = this.element.is(":checked");
                if (h) {
                    this.buttonElement.addClass("ui-state-active")
                }
                this.buttonElement.attr("aria-pressed", h)
            } else {
                this.buttonElement = this.element
            }
        },
        widget: function () {
            return this.buttonElement
        },
        destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(b + " " + g + " " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title")
            }
            this._super("destroy")
        },
        _setOption: function (h, i) {
            this._superApply("_setOption", arguments);
            if (h === "disabled") {
                if (i) {
                    this.element.attr("disabled", true)
                } else {
                    this.element.removeAttr("disabled")
                }
            }
            this._resetButton()
        },
        refresh: function () {
            var h = this.element.is(":disabled");
            if (h !== this.options.disabled) {
                this._setOption("disabled", h)
            }
            if (this.type === "radio") {
                a(this.element[0]).each(function () {
                    if (e(this).is(":checked")) {
                        e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", true)
                    } else {
                        e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", false)
                    }
                })
            } else {
                if (this.type === "checkbox") {
                    if (this.element.is(":checked")) {
                        this.buttonElement.addClass("ui-state-active").attr("aria-pressed", true)
                    } else {
                        this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", false)
                    }
                }
            }
        },
        _resetButton: function () {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label)
                }
                return
            }
            var k = this.buttonElement.removeClass(f), j = e("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(k.empty()).text(), i = this.options.icons, h = i.primary && i.secondary;
            if (i.primary || i.secondary) {
                k.addClass("ui-button-text-icon" + (h ? "s" : (i.primary ? "-primary" : "-secondary")));
                if (i.primary) {
                    k.prepend("<span class='ui-button-icon-primary ui-icon " + i.primary + "'></span>")
                }
                if (i.secondary) {
                    k.append("<span class='ui-button-icon-secondary ui-icon " + i.secondary + "'></span>")
                }
                if (!this.options.text) {
                    k.addClass(h ? "ui-button-icons-only" : "ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary");
                    if (!this.hasTitle) {
                        k.attr("title", j)
                    }
                }
            } else {
                k.addClass("ui-button-text-only")
            }
        }
    });
    e.widget("ui.buttonset", {
        _create: function () {
            this.element.addClass("ui-buttonset");
            this._init()
        }, _init: function () {
            this.refresh()
        }, _setOption: function (h, i) {
            if (h === "disabled") {
                this.buttons.button("option", h, i)
            }
            this._superApply("_setOption", arguments)
        }, refresh: function () {
            this.buttons = this.element.find(":button, :submit, :reset, :checkbox, :radio, a, :data(button)").filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
        }, destroy: function () {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            this._super("destroy")
        }
    })
}(jQuery));
(function ($) {
    $.extend($.ui, {datepicker: {version: "1.9m2"}});
    var PROP_NAME = "datepicker";
    var dpuuid = new Date().getTime();

    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false
        };
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
    }

    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        log: function () {
            if (this.debug) {
                console.log.apply("", arguments)
            }
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _attachDatepicker: function (target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == "div" || nodeName == "span");
            if (!target.id) {
                this.uuid += 1;
                target.id = "dp" + this.uuid
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == "input") {
                this._connectDatepicker(target, inst)
            } else {
                if (inline) {
                    this._inlineDatepicker(target, inst)
                }
            }
        },
        _newInst: function (target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            }
        },
        _connectDatepicker: function (target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(input, inst);
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key)
            });
            this._autoSize(inst);
            $.data(target, PROP_NAME, inst)
        },
        _attachments: function (input, inst) {
            var appendText = this._get(inst, "appendText");
            var isRTL = this._get(inst, "isRTL");
            if (inst.append) {
                inst.append.remove()
            }
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>");
                input[isRTL ? "before" : "after"](inst.append)
            }
            input.unbind("focus", this._showDatepicker);
            if (inst.trigger) {
                inst.trigger.remove()
            }
            var showOn = this._get(inst, "showOn");
            if (showOn == "focus" || showOn == "both") {
                input.focus(this._showDatepicker)
            }
            if (showOn == "button" || showOn == "both") {
                var buttonText = this._get(inst, "buttonText");
                var buttonImage = this._get(inst, "buttonImage");
                inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                })));
                input[isRTL ? "before" : "after"](inst.trigger);
                inst.trigger.click(function () {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0]) {
                        $.datepicker._hideDatepicker()
                    } else {
                        $.datepicker._showDatepicker(input[0])
                    }
                    return false
                })
            }
        },
        _autoSize: function (inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var date = new Date(2009, 12 - 1, 20);
                var dateFormat = this._get(inst, "dateFormat");
                if (dateFormat.match(/[DM]/)) {
                    var findMax = function (names) {
                        var max = 0;
                        var maxI = 0;
                        for (var i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i
                            }
                        }
                        return maxI
                    };
                    date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                    date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - date.getDay())
                }
                inst.input.attr("size", this._formatDate(inst, date).length)
            }
        },
        _inlineDatepicker: function (target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName)) {
                return
            }
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst), true);
            this._updateDatepicker(inst);
            this._updateAlternate(inst)
        },
        _dialogDatepicker: function (input, date, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                this.uuid += 1;
                var id = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst)
            }
            extendRemove(inst.settings, settings || {});
            date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
            this._dialogInput.val(date);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = document.documentElement.clientWidth;
                var browserHeight = document.documentElement.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv)
            }
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this
        },
        _destroyDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == "input") {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    $target.removeClass(this.markerClassName).empty()
                }
            }
        },
        _enableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = false;
                inst.trigger.filter("button").each(function () {
                    this.disabled = false
                }).end().filter("img").css({opacity: "1.0", cursor: ""})
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().removeClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value)
            })
        },
        _disableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = true;
                inst.trigger.filter("button").each(function () {
                    this.disabled = true
                }).end().filter("img").css({opacity: "0.5", cursor: "default"})
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().addClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value)
            });
            this._disabledInputs[this._disabledInputs.length] = target
        },
        _isDisabledDatepicker: function (target) {
            if (!target) {
                return false
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target) {
                    return true
                }
            }
            return false
        },
        _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME)
            } catch (err) {
                throw"Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (target, name, value) {
            var inst = this._getInst(target);
            if (arguments.length == 2 && typeof name == "string") {
                return (name == "defaults" ? $.extend({}, $.datepicker._defaults) : (inst ? (name == "all" ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
            }
            var settings = name || {};
            if (typeof name == "string") {
                settings = {};
                settings[name] = value
            }
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker()
                }
                var date = this._getDateDatepicker(target, true);
                extendRemove(inst.settings, settings);
                this._attachments($(target), inst);
                this._autoSize(inst);
                this._setDateDatepicker(target, date);
                this._updateDatepicker(inst)
            }
        },
        _changeDatepicker: function (target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function (target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst)
            }
        },
        _setDateDatepicker: function (target, date) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date);
                this._updateDatepicker(inst);
                this._updateAlternate(inst)
            }
        },
        _getDateDatepicker: function (target, noDefault) {
            var inst = this._getInst(target);
            if (inst && !inst.inline) {
                this._setDateFromField(inst, noDefault)
            }
            return (inst ? this._getDate(inst) : null)
        },
        _doKeyDown: function (event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing) {
                switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker();
                        handled = false;
                        break;
                    case 13:
                        var sel = $("td." + $.datepicker._dayOverClass, inst.dpDiv).add($("td." + $.datepicker._currentClass, inst.dpDiv));
                        if (sel[0]) {
                            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
                        } else {
                            $.datepicker._hideDatepicker()
                        }
                        return false;
                        break;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 35:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._clearDate(event.target)
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 36:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._gotoToday(event.target)
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 37:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
                        }
                        break;
                    case 38:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, -7, "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 39:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
                        }
                        break;
                    case 40:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, +7, "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    default:
                        handled = false
                }
            } else {
                if (event.keyCode == 36 && event.ctrlKey) {
                    $.datepicker._showDatepicker(this)
                } else {
                    handled = false
                }
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation()
            }
        },
        _doKeyPress: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
            }
        },
        _doKeyUp: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if (inst.input.val() != inst.lastVal) {
                try {
                    var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
                    if (date) {
                        $.datepicker._setDateFromField(inst);
                        $.datepicker._updateAlternate(inst);
                        $.datepicker._updateDatepicker(inst)
                    }
                } catch (event) {
                    $.datepicker.log(event)
                }
            }
            return true
        },
        _showDatepicker: function (input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != "input") {
                input = $("input", input.parentNode)[0]
            }
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
                return
            }
            var inst = $.datepicker._getInst(input);
            if ($.datepicker._curInst && $.datepicker._curInst != inst) {
                $.datepicker._curInst.dpDiv.stop(true, true)
            }
            var beforeShow = $.datepicker._get(inst, "beforeShow");
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            inst.lastVal = null;
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog) {
                input.value = ""
            }
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight
            }
            var isFixed = false;
            $(input).parents().each(function () {
                isFixed |= $(this).css("position") == "fixed";
                return !isFixed
            });
            if (isFixed && $.browser.opera) {
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop
            }
            var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
            $.datepicker._pos = null;
            inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
                display: "none",
                left: offset.left + "px",
                top: offset.top + "px"
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, "showAnim");
                var duration = $.datepicker._get(inst, "duration");
                var postProcess = function () {
                    $.datepicker._datepickerShowing = true;
                    var borders = $.datepicker._getBorders(inst.dpDiv);
                    inst.dpDiv.find("iframe.ui-datepicker-cover").css({
                        left: -borders[0],
                        top: -borders[1],
                        width: inst.dpDiv.outerWidth(),
                        height: inst.dpDiv.outerHeight()
                    })
                };
                inst.dpDiv.zIndex($(input).zIndex() + 1);
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[showAnim || "show"]((showAnim ? duration : null), postProcess)
                }
                if (!showAnim || !duration) {
                    postProcess()
                }
                if (inst.input.is(":visible") && !inst.input.is(":disabled")) {
                    inst.input.focus()
                }
                $.datepicker._curInst = inst
            }
        },
        _updateDatepicker: function (inst) {
            var self = this;
            var borders = $.datepicker._getBorders(inst.dpDiv);
            inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({
                left: -borders[0],
                top: -borders[1],
                width: inst.dpDiv.outerWidth(),
                height: inst.dpDiv.outerHeight()
            }).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
                $(this).removeClass("ui-state-hover");
                if (this.className.indexOf("ui-datepicker-prev") != -1) {
                    $(this).removeClass("ui-datepicker-prev-hover")
                }
                if (this.className.indexOf("ui-datepicker-next") != -1) {
                    $(this).removeClass("ui-datepicker-next-hover")
                }
            }).bind("mouseover", function () {
                if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
                    $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    $(this).addClass("ui-state-hover");
                    if (this.className.indexOf("ui-datepicker-prev") != -1) {
                        $(this).addClass("ui-datepicker-prev-hover")
                    }
                    if (this.className.indexOf("ui-datepicker-next") != -1) {
                        $(this).addClass("ui-datepicker-next-hover")
                    }
                }
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            if (cols > 1) {
                inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
            } else {
                inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")
            }
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled")) {
                inst.input.focus()
            }
        },
        _getBorders: function (elem) {
            var convert = function (value) {
                return {thin: 1, medium: 2, thick: 3}[value] || value
            };
            return [parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width")))]
        },
        _checkOffset: function (inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
            var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();
            offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);
            return offset
        },
        _findPos: function (obj) {
            var inst = this._getInst(obj);
            var isRTL = this._get(inst, "isRTL");
            while (obj && (obj.type == "hidden" || obj.nodeType != 1)) {
                obj = obj[isRTL ? "previousSibling" : "nextSibling"]
            }
            var position = $(obj).offset();
            return [position.left, position.top]
        },
        _hideDatepicker: function (input) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME))) {
                return
            }
            if (this._datepickerShowing) {
                var showAnim = this._get(inst, "showAnim");
                var duration = this._get(inst, "duration");
                var postProcess = function () {
                    $.datepicker._tidyDialog(inst);
                    this._curInst = null
                };
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[(showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess)
                }
                if (!showAnim) {
                    postProcess()
                }
                var onClose = this._get(inst, "onClose");
                if (onClose) {
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
                }
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({position: "absolute", left: "0", top: "-100px"});
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function (inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (event) {
            if (!$.datepicker._curInst) {
                return
            }
            var $target = $(event.target);
            if ($target[0].id != $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
                $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return
            }
            this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
            this._updateDatepicker(inst)
        },
        _gotoToday: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectMonthYear: function (id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = false;
            inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _clickMonthYear: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear && !$.browser.msie) {
                inst.input.focus()
            }
            inst._selectingMonthYear = !inst._selectingMonthYear
        },
        _selectDay: function (id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
        },
        _clearDate: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            this._selectDate(target, "")
        },
        _selectDate: function (id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input) {
                inst.input.val(dateStr)
            }
            this._updateAlternate(inst);
            var onSelect = this._get(inst, "onSelect");
            if (onSelect) {
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
            } else {
                if (inst.input) {
                    inst.input.trigger("change")
                }
            }
            if (inst.inline) {
                this._updateDatepicker(inst)
            } else {
                this._hideDatepicker();
                this._lastInput = inst.input[0];
                if (typeof(inst.input[0]) != "object") {
                    inst.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function (inst) {
            var altField = this._get(inst, "altField");
            if (altField) {
                var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                var date = this._getDate(inst);
                var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function () {
                    $(this).val(dateStr)
                })
            }
        },
        noWeekends: function (date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ""]
        },
        iso8601Week: function (date) {
            var checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
        },
        parseDate: function (format, value, settings) {
            if (format == null || value == null) {
                throw"Invalid arguments"
            }
            value = (typeof value == "object" ? value.toString() : value + "");
            if (value == "") {
                return null
            }
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var getNumber = function (match) {
                lookAhead(match);
                var size = (match == "@" ? 14 : (match == "!" ? 20 : (match == "y" ? 4 : (match == "o" ? 3 : 2))));
                var digits = new RegExp("^\\d{1," + size + "}");
                var num = value.substring(iValue).match(digits);
                if (!num) {
                    throw"Missing number at position " + iValue
                }
                iValue += num[0].length;
                return parseInt(num[0], 10)
            };
            var getName = function (match, shortNames, longNames) {
                var names = (lookAhead(match) ? longNames : shortNames);
                for (var i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length) == names[i]) {
                        iValue += names[i].length;
                        return i + 1
                    }
                }
                throw"Unknown name at position " + iValue
            };
            var checkLiteral = function () {
                if (value.charAt(iValue) != format.charAt(iFormat)) {
                    throw"Unexpected literal at position " + iValue
                }
                iValue++
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        checkLiteral()
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case"d":
                            day = getNumber("d");
                            break;
                        case"D":
                            getName("D", dayNamesShort, dayNames);
                            break;
                        case"o":
                            doy = getNumber("o");
                            break;
                        case"m":
                            month = getNumber("m");
                            break;
                        case"M":
                            month = getName("M", monthNamesShort, monthNames);
                            break;
                        case"y":
                            year = getNumber("y");
                            break;
                        case"@":
                            var date = new Date(getNumber("@"));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case"!":
                            var date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case"'":
                            if (lookAhead("'")) {
                                checkLiteral()
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            checkLiteral()
                    }
                }
            }
            if (year == -1) {
                year = new Date().getFullYear()
            } else {
                if (year < 100) {
                    year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
                }
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) {
                        break
                    }
                    month++;
                    day -= dim
                } while (true)
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
                throw"Invalid date"
            }
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function (format, date, settings) {
            if (!date) {
                return ""
            }
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var formatNumber = function (match, value, len) {
                var num = "" + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = "0" + num
                    }
                }
                return num
            };
            var formatName = function (match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value])
            };
            var output = "";
            var literal = false;
            if (date) {
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                            literal = false
                        } else {
                            output += format.charAt(iFormat)
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                            case"d":
                                output += formatNumber("d", date.getDate(), 2);
                                break;
                            case"D":
                                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                                break;
                            case"o":
                                output += formatNumber("o", (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                                break;
                            case"m":
                                output += formatNumber("m", date.getMonth() + 1, 2);
                                break;
                            case"M":
                                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                                break;
                            case"y":
                                output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
                                break;
                            case"@":
                                output += date.getTime();
                                break;
                            case"!":
                                output += date.getTime() * 10000 + this._ticksTo1970;
                                break;
                            case"'":
                                if (lookAhead("'")) {
                                    output += "'"
                                } else {
                                    literal = true
                                }
                                break;
                            default:
                                output += format.charAt(iFormat)
                        }
                    }
                }
            }
            return output
        },
        _possibleChars: function (format) {
            var chars = "";
            var literal = false;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        chars += format.charAt(iFormat)
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case"d":
                        case"m":
                        case"y":
                        case"@":
                            chars += "0123456789";
                            break;
                        case"D":
                        case"M":
                            return null;
                        case"'":
                            if (lookAhead("'")) {
                                chars += "'"
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            chars += format.charAt(iFormat)
                    }
                }
            }
            return chars
        },
        _get: function (inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function (inst, noDefault) {
            if (inst.input.val() == inst.lastVal) {
                return
            }
            var dateFormat = this._get(inst, "dateFormat");
            var dates = inst.lastVal = inst.input ? inst.input.val() : null;
            var date, defaultDate;
            date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate
            } catch (event) {
                this.log(event);
                dates = (noDefault ? "" : dates)
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst)
        },
        _getDefaultDate: function (inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()))
        },
        _determineDate: function (inst, date, defaultDate) {
            var offsetNumeric = function (offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date
            };
            var offsetString = function (offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
                } catch (e) {
                }
                var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || "d") {
                        case"d":
                        case"D":
                            day += parseInt(matches[1], 10);
                            break;
                        case"w":
                        case"W":
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case"m":
                        case"M":
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break;
                        case"y":
                        case"Y":
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break
                    }
                    matches = pattern.exec(offset)
                }
                return new Date(year, month, day)
            };
            date = (date == null ? defaultDate : (typeof date == "string" ? offsetString(date) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
            date = (date && date.toString() == "Invalid Date" ? defaultDate : date);
            if (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(date)
        },
        _daylightSavingAdjust: function (date) {
            if (!date) {
                return null
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date
        },
        _setDate: function (inst, date, noChange) {
            var clear = !(date);
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            date = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
            inst.selectedDay = inst.currentDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
            if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange) {
                this._notifyChange(inst)
            }
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? "" : this._formatDate(inst))
            }
        },
        _getDate: function (inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate
        },
        _generateHTML: function (inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, "isRTL");
            var showButtonPanel = this._get(inst, "showButtonPanel");
            var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
            var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
            var stepMonths = this._get(inst, "stepMonths");
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, "prevText");
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
            var nextText = this._get(inst, "nextText");
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
            var currentText = this._get(inst, "currentText");
            var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>" : "");
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
            var firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var showWeek = this._get(inst, "showWeek");
            var dayNames = this._get(inst, "dayNames");
            var dayNamesShort = this._get(inst, "dayNamesShort");
            var dayNamesMin = this._get(inst, "dayNamesMin");
            var monthNames = this._get(inst, "monthNames");
            var monthNamesShort = this._get(inst, "monthNamesShort");
            var beforeShowDay = this._get(inst, "beforeShowDay");
            var showOtherMonths = this._get(inst, "showOtherMonths");
            var selectOtherMonths = this._get(inst, "selectOtherMonths");
            var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
            var defaultDate = this._getDefaultDate(inst);
            var html = "";
            for (var row = 0; row < numMonths[0]; row++) {
                var group = "";
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = " ui-corner-all";
                    var calender = "";
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group';
                        if (numMonths[1] > 1) {
                            switch (col) {
                                case 0:
                                    calender += " ui-datepicker-group-first";
                                    cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                    break;
                                case numMonths[1] - 1:
                                    calender += " ui-datepicker-group-last";
                                    cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                    break;
                                default:
                                    calender += " ui-datepicker-group-middle";
                                    cornerClass = "";
                                    break
                            }
                        }
                        calender += '">'
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" : "");
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
                    }
                    calender += thead + "</tr></thead><tbody>";
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
                    }
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
                    var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += "<tr>";
                        var tbody = (!showWeek ? "" : '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>");
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + inst.id + "'," + printDate.getMonth() + "," + printDate.getFullYear() + ', this);return false;"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() == selectedDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate)
                        }
                        calender += tbody + "</tr>"
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++
                    }
                    calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    group += calender
                }
                html += group
            }
            html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            inst._keyEvent = false;
            return html
        },
        _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var changeMonth = this._get(inst, "changeMonth");
            var changeYear = this._get(inst, "changeYear");
            var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = "";
            if (secondary || !changeMonth) {
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>"
            } else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'M');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                        monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
                    }
                }
                monthHtml += "</select>"
            }
            if (!showMonthAfterYear) {
                html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "")
            }
            if (secondary || !changeYear) {
                html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
            } else {
                var years = this._get(inst, "yearRange").split(":");
                var thisYear = new Date().getFullYear();
                var determineYear = function (value) {
                    var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
                    return (isNaN(year) ? thisYear : year)
                };
                var year = determineYear(years[0]);
                var endYear = Math.max(year, determineYear(years[1] || ""));
                year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                html += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (; year <= endYear; year++) {
                    html += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
                }
                html += "</select>"
            }
            html += this._get(inst, "yearSuffix");
            if (showMonthAfterYear) {
                html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml
            }
            html += "</div>";
            return html
        },
        _adjustInstDate: function (inst, offset, period) {
            var year = inst.drawYear + (period == "Y" ? offset : 0);
            var month = inst.drawMonth + (period == "M" ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
            var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == "M" || period == "Y") {
                this._notifyChange(inst)
            }
        },
        _restrictMinMax: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            return date
        },
        _notifyChange: function (inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            if (onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
            }
        },
        _getNumberOfMonths: function (inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths))
        },
        _getMinMaxDate: function (inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
        },
        _getDaysInMonth: function (year, month) {
            return 32 - new Date(year, month, 32).getDate()
        },
        _getFirstDayOfMonth: function (year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function (inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
            if (offset < 0) {
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
            }
            return this._isInRange(inst, date)
        },
        _isInRange: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()))
        },
        _getFormatConfig: function (inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function (inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear
            }
            var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    });
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null || props[name] == undefined) {
                target[name] = props[name]
            }
        }
        return target
    }

    function isArray(a) {
        return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
    }

    $.fn.datepicker = function (options) {
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
            $.datepicker.initialized = true
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string" && (options == "isDisabled" || options == "getDate" || options == "widget")) {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        return this.each(function () {
            typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.9m2";
    window["DP_jQuery_" + dpuuid] = $
})(jQuery);
(function (b) {
    var a = "ui-dialog ui-widget ui-widget-content ui-corner-all ";
    b.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: "center",
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1000
        }, _create: function () {
            this.originalTitle = this.element.attr("title");
            var k = this, l = k.options, i = l.title || k.originalTitle || "&#160;", d = b.ui.dialog.getTitleId(k.element), j = (k.uiDialog = b("<div></div>")).appendTo(document.body).hide().addClass(a + l.dialogClass).css({zIndex: l.zIndex}).attr("tabIndex", -1).css("outline", 0).keydown(function (m) {
                if (l.closeOnEscape && m.keyCode && m.keyCode === b.ui.keyCode.ESCAPE) {
                    k.close(m);
                    m.preventDefault()
                }
            }).attr({role: "dialog", "aria-labelledby": d}).mousedown(function (m) {
                k.moveToTop(false, m)
            }), f = k.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(j), e = (k.uiDialogTitlebar = b("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(j), h = b('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                h.addClass("ui-state-hover")
            }, function () {
                h.removeClass("ui-state-hover")
            }).focus(function () {
                h.addClass("ui-state-focus")
            }).blur(function () {
                h.removeClass("ui-state-focus")
            }).click(function (m) {
                k.close(m);
                return false
            }).appendTo(e), g = (k.uiDialogTitlebarCloseText = b("<span></span>")).addClass("ui-icon ui-icon-closethick").text(l.closeText).appendTo(h), c = b("<span></span>").addClass("ui-dialog-title").attr("id", d).html(i).prependTo(e);
            if (b.isFunction(l.beforeclose) && !b.isFunction(l.beforeClose)) {
                l.beforeClose = l.beforeclose
            }
            e.find("*").add(e).disableSelection();
            if (l.draggable && b.fn.draggable) {
                k._makeDraggable()
            }
            if (l.resizable && b.fn.resizable) {
                k._makeResizable()
            }
            k._createButtons(l.buttons);
            k._isOpen = false;
            if (b.fn.bgiframe) {
                j.bgiframe()
            }
        }, _init: function () {
            if (this.options.autoOpen) {
                this.open()
            }
        }, destroy: function () {
            var c = this;
            if (c.overlay) {
                c.overlay.destroy()
            }
            c.uiDialog.hide();
            c.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            c.uiDialog.remove();
            if (c.originalTitle) {
                c.element.attr("title", c.originalTitle)
            }
            return c
        }, widget: function () {
            return this.uiDialog
        }, close: function (e) {
            var c = this, d;
            if (false === c._trigger("beforeClose", e)) {
                return
            }
            if (c.overlay) {
                c.overlay.destroy()
            }
            c.uiDialog.unbind("keypress.ui-dialog");
            c._isOpen = false;
            if (c.options.hide) {
                c.uiDialog.hide(c.options.hide, function () {
                    c._trigger("close", e)
                })
            } else {
                c.uiDialog.hide();
                c._trigger("close", e)
            }
            b.ui.dialog.overlay.resize();
            if (c.options.modal) {
                d = 0;
                b(".ui-dialog").each(function () {
                    if (this !== c.uiDialog[0]) {
                        d = Math.max(d, b(this).css("z-index"))
                    }
                });
                b.ui.dialog.maxZ = d
            }
            return c
        }, isOpen: function () {
            return this._isOpen
        }, moveToTop: function (g, f) {
            var c = this, e = c.options, d;
            if ((e.modal && !g) || (!e.stack && !e.modal)) {
                return c._trigger("focus", f)
            }
            if (e.zIndex > b.ui.dialog.maxZ) {
                b.ui.dialog.maxZ = e.zIndex
            }
            if (c.overlay) {
                b.ui.dialog.maxZ += 1;
                c.overlay.$el.css("z-index", b.ui.dialog.overlay.maxZ = b.ui.dialog.maxZ)
            }
            d = {scrollTop: c.element.attr("scrollTop"), scrollLeft: c.element.attr("scrollLeft")};
            b.ui.dialog.maxZ += 1;
            c.uiDialog.css("z-index", b.ui.dialog.maxZ);
            c.element.attr(d);
            c._trigger("focus", f);
            return c
        }, open: function () {
            if (this._isOpen) {
                return
            }
            var d = this, e = d.options, c = d.uiDialog;
            d.overlay = e.modal ? new b.ui.dialog.overlay(d) : null;
            if (c.next().length) {
                c.appendTo("body")
            }
            d._size();
            d._position(e.position);
            c.show(e.show);
            d.moveToTop(true);
            if (e.modal) {
                c.bind("keypress.ui-dialog", function (h) {
                    if (h.keyCode !== b.ui.keyCode.TAB) {
                        return
                    }
                    var g = b(":tabbable", this), i = g.filter(":first"), f = g.filter(":last");
                    if (h.target === f[0] && !h.shiftKey) {
                        i.focus(1);
                        return false
                    } else {
                        if (h.target === i[0] && h.shiftKey) {
                            f.focus(1);
                            return false
                        }
                    }
                })
            }
            b([]).add(c.find(".ui-dialog-content :tabbable:first")).add(c.find(".ui-dialog-buttonpane :tabbable:first")).add(c).filter(":first").focus();
            d._trigger("open");
            d._isOpen = true;
            return d
        }, _createButtons: function (f) {
            var e = this, c = false, d = b("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            e.uiDialog.find(".ui-dialog-buttonpane").remove();
            if (typeof f === "object" && f !== null) {
                b.each(f, function () {
                    return !(c = true)
                })
            }
            if (c) {
                b.each(f, function (g, i) {
                    var h = b('<button type="button"></button>').text(g).click(function () {
                        i.apply(e.element[0], arguments)
                    }).appendTo(d);
                    if (b.fn.button) {
                        h.button()
                    }
                });
                d.appendTo(e.uiDialog)
            }
        }, _makeDraggable: function () {
            var c = this, f = c.options, g = b(document), e;

            function d(h) {
                return {position: h.position, offset: h.offset}
            }

            c.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (h, i) {
                    e = f.height === "auto" ? "auto" : b(this).height();
                    b(this).height(b(this).height()).addClass("ui-dialog-dragging");
                    c._trigger("dragStart", h, d(i))
                },
                drag: function (h, i) {
                    c._trigger("drag", h, d(i))
                },
                stop: function (h, i) {
                    f.position = [i.position.left - g.scrollLeft(), i.position.top - g.scrollTop()];
                    b(this).removeClass("ui-dialog-dragging").height(e);
                    c._trigger("dragStop", h, d(i));
                    b.ui.dialog.overlay.resize()
                }
            })
        }, _makeResizable: function (h) {
            h = (h === undefined ? this.options.resizable : h);
            var d = this, g = d.options, c = d.uiDialog.css("position"), f = (typeof h === "string" ? h : "n,e,s,w,se,sw,ne,nw");

            function e(i) {
                return {
                    originalPosition: i.originalPosition,
                    originalSize: i.originalSize,
                    position: i.position,
                    size: i.size
                }
            }

            d.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: d.element,
                maxWidth: g.maxWidth,
                maxHeight: g.maxHeight,
                minWidth: g.minWidth,
                minHeight: d._minHeight(),
                handles: f,
                start: function (i, j) {
                    b(this).addClass("ui-dialog-resizing");
                    d._trigger("resizeStart", i, e(j))
                },
                resize: function (i, j) {
                    d._trigger("resize", i, e(j))
                },
                stop: function (i, j) {
                    b(this).removeClass("ui-dialog-resizing");
                    g.height = b(this).height();
                    g.width = b(this).width();
                    d._trigger("resizeStop", i, e(j));
                    b.ui.dialog.overlay.resize()
                }
            }).css("position", c).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        }, _minHeight: function () {
            var c = this.options;
            if (c.height === "auto") {
                return c.minHeight
            } else {
                return Math.min(c.minHeight, c.height)
            }
        }, _position: function (d) {
            var e = [], f = [0, 0], c;
            d = d || b.ui.dialog.prototype.options.position;
            if (typeof d === "string" || (typeof d === "object" && "0" in d)) {
                e = d.split ? d.split(" ") : [d[0], d[1]];
                if (e.length === 1) {
                    e[1] = e[0]
                }
                b.each(["left", "top"], function (h, g) {
                    if (+e[h] === e[h]) {
                        f[h] = e[h];
                        e[h] = g
                    }
                })
            } else {
                if (typeof d === "object") {
                    if ("left" in d) {
                        e[0] = "left";
                        f[0] = d.left
                    } else {
                        if ("right" in d) {
                            e[0] = "right";
                            f[0] = -d.right
                        }
                    }
                    if ("top" in d) {
                        e[1] = "top";
                        f[1] = d.top
                    } else {
                        if ("bottom" in d) {
                            e[1] = "bottom";
                            f[1] = -d.bottom
                        }
                    }
                }
            }
            c = this.uiDialog.is(":visible");
            if (!c) {
                this.uiDialog.show()
            }
            this.uiDialog.css({top: 0, left: 0}).position({
                my: e.join(" "),
                at: e.join(" "),
                offset: f.join(" "),
                of: window,
                collision: "fit",
                using: function (h) {
                    var g = b(this).css(h).offset().top;
                    if (g < 0) {
                        b(this).css("top", h.top - g)
                    }
                }
            });
            if (!c) {
                this.uiDialog.hide()
            }
        }, _setOption: function (f, g) {
            var d = this, c = d.uiDialog, h = c.is(":data(resizable)"), e = false;
            switch (f) {
                case"beforeclose":
                    f = "beforeClose";
                    break;
                case"buttons":
                    d._createButtons(g);
                    break;
                case"closeText":
                    d.uiDialogTitlebarCloseText.text("" + g);
                    break;
                case"dialogClass":
                    c.removeClass(d.options.dialogClass).addClass(a + g);
                    break;
                case"disabled":
                    if (g) {
                        c.addClass("ui-dialog-disabled")
                    } else {
                        c.removeClass("ui-dialog-disabled")
                    }
                    break;
                case"draggable":
                    if (g) {
                        d._makeDraggable()
                    } else {
                        c.draggable("destroy")
                    }
                    break;
                case"height":
                    e = true;
                    break;
                case"maxHeight":
                    if (h) {
                        c.resizable("option", "maxHeight", g)
                    }
                    e = true;
                    break;
                case"maxWidth":
                    if (h) {
                        c.resizable("option", "maxWidth", g)
                    }
                    e = true;
                    break;
                case"minHeight":
                    if (h) {
                        c.resizable("option", "minHeight", g)
                    }
                    e = true;
                    break;
                case"minWidth":
                    if (h) {
                        c.resizable("option", "minWidth", g)
                    }
                    e = true;
                    break;
                case"position":
                    d._position(g);
                    break;
                case"resizable":
                    if (h && !g) {
                        c.resizable("destroy")
                    }
                    if (h && typeof g === "string") {
                        c.resizable("option", "handles", g)
                    }
                    if (!h && g !== false) {
                        d._makeResizable(g)
                    }
                    break;
                case"title":
                    b(".ui-dialog-title", d.uiDialogTitlebar).html("" + (g || "&#160;"));
                    break;
                case"width":
                    e = true;
                    break
            }
            b.Widget.prototype._setOption.apply(d, arguments);
            if (e) {
                d._size()
            }
        }, _size: function () {
            var d = this.options, c;
            this.element.css({width: "auto", minHeight: 0, height: 0});
            c = this.uiDialog.css({height: "auto", width: d.width}).height();
            this.element.css(d.height === "auto" ? {
                minHeight: Math.max(d.minHeight - c, 0),
                height: "auto"
            } : {minHeight: 0, height: Math.max(d.height - c, 0)}).show();
            if (this.uiDialog.is(":data(resizable)")) {
                this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        }
    });
    b.extend(b.ui.dialog, {
        version: "1.9m2", uuid: 0, maxZ: 0, getTitleId: function (c) {
            var d = c.attr("id");
            if (!d) {
                this.uuid += 1;
                d = this.uuid
            }
            return "ui-dialog-title-" + d
        }, overlay: function (c) {
            this.$el = b.ui.dialog.overlay.create(c)
        }
    });
    b.extend(b.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: b.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (c) {
            return c + ".dialog-overlay"
        }).join(" "),
        create: function (d) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    if (b.ui.dialog.overlay.instances.length) {
                        b(document).bind(b.ui.dialog.overlay.events, function (e) {
                            return (b(e.target).zIndex() >= b.ui.dialog.overlay.maxZ)
                        })
                    }
                }, 1);
                b(document).bind("keydown.dialog-overlay", function (e) {
                    if (d.options.closeOnEscape && e.keyCode && e.keyCode === b.ui.keyCode.ESCAPE) {
                        d.close(e);
                        e.preventDefault()
                    }
                });
                b(window).bind("resize.dialog-overlay", b.ui.dialog.overlay.resize)
            }
            var c = (this.oldInstances.pop() || b("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            if (b.fn.bgiframe) {
                c.bgiframe()
            }
            this.instances.push(c);
            return c
        },
        destroy: function (c) {
            this.oldInstances.push(this.instances.splice(b.inArray(c, this.instances), 1)[0]);
            if (this.instances.length === 0) {
                b([document, window]).unbind(".dialog-overlay")
            }
            c.remove();
            var d = 0;
            b.each(this.instances, function () {
                d = Math.max(d, this.css("z-index"))
            });
            this.maxZ = d
        },
        height: function () {
            var d, c;
            if (b.browser.msie && b.browser.version < 7) {
                d = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                if (d < c) {
                    return b(window).height() + "px"
                } else {
                    return d + "px"
                }
            } else {
                return b(document).height() + "px"
            }
        },
        width: function () {
            var c, d;
            if (b.browser.msie && b.browser.version < 7) {
                c = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                d = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (c < d) {
                    return b(window).width() + "px"
                } else {
                    return c + "px"
                }
            } else {
                return b(document).width() + "px"
            }
        },
        resize: function () {
            var c = b([]);
            b.each(b.ui.dialog.overlay.instances, function () {
                c = c.add(this)
            });
            c.css({width: 0, height: 0}).css({width: b.ui.dialog.overlay.width(), height: b.ui.dialog.overlay.height()})
        }
    });
    b.extend(b.ui.dialog.overlay.prototype, {
        destroy: function () {
            b.ui.dialog.overlay.destroy(this.$el)
        }
    })
}(jQuery));
(function (a) {
    a.widget("ui.menu", {
        _create: function () {
            var b = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).bind("click.menu", function (c) {
                if (b.options.disabled) {
                    return false
                }
                if (!a(c.target).closest(".ui-menu-item a").length) {
                    return
                }
                c.preventDefault();
                b.select(c)
            });
            this.refresh();
            if (!this.options.input) {
                this.options.input = this.element.attr("tabIndex", 0)
            }
            this.options.input.bind("keydown.menu", function (c) {
                if (b.options.disabled) {
                    return
                }
                switch (c.keyCode) {
                    case a.ui.keyCode.PAGE_UP:
                        b.previousPage();
                        c.preventDefault();
                        c.stopImmediatePropagation();
                        break;
                    case a.ui.keyCode.PAGE_DOWN:
                        b.nextPage();
                        c.preventDefault();
                        c.stopImmediatePropagation();
                        break;
                    case a.ui.keyCode.UP:
                        b.previous();
                        c.preventDefault();
                        c.stopImmediatePropagation();
                        break;
                    case a.ui.keyCode.DOWN:
                        b.next();
                        c.preventDefault();
                        c.stopImmediatePropagation();
                        break;
                    case a.ui.keyCode.ENTER:
                        b.select();
                        c.preventDefault();
                        c.stopImmediatePropagation();
                        break
                }
            })
        }, destroy: function () {
            a.Widget.prototype.destroy.apply(this, arguments);
            this.element.removeClass("ui-menu ui-widget ui-widget-content ui-corner-all").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-activedescendant");
            this.element.children(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").children("a").removeClass("ui-corner-all").removeAttr("tabIndex").unbind(".menu")
        }, refresh: function () {
            var c = this;
            var b = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
            b.children("a").addClass("ui-corner-all").attr("tabIndex", -1).bind("mouseenter.menu", function (d) {
                if (c.options.disabled) {
                    return
                }
                c.activate(d, a(this).parent())
            }).bind("mouseleave.menu", function () {
                if (c.options.disabled) {
                    return
                }
                c.deactivate()
            })
        }, activate: function (e, d) {
            this.deactivate();
            if (this._hasScroll()) {
                var f = d.offset().top - this.element.offset().top, b = this.element.attr("scrollTop"), c = this.element.height();
                if (f < 0) {
                    this.element.attr("scrollTop", b + f)
                } else {
                    if (f > c) {
                        this.element.attr("scrollTop", b + f - c + d.height())
                    }
                }
            }
            this.active = d.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", e, {item: d})
        }, deactivate: function () {
            if (!this.active) {
                return
            }
            this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
            this._trigger("blur");
            this.active = null
        }, next: function (b) {
            this._move("next", ".ui-menu-item:first", b)
        }, previous: function (b) {
            this._move("prev", ".ui-menu-item:last", b)
        }, first: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        }, last: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        }, _move: function (e, d, c) {
            if (!this.active) {
                this.activate(c, this.element.children(d));
                return
            }
            var b = this.active[e + "All"](".ui-menu-item").eq(0);
            if (b.length) {
                this.activate(c, b)
            } else {
                this.activate(c, this.element.children(d))
            }
        }, nextPage: function (d) {
            if (this._hasScroll()) {
                if (!this.active || this.last()) {
                    this.activate(d, this.element.children(":first"));
                    return
                }
                var e = this.active.offset().top, c = this.element.height(), b = this.element.children("li").filter(function () {
                    var f = a(this).offset().top - e - c + a(this).height();
                    return f < 10 && f > -10
                });
                if (!b.length) {
                    b = this.element.children(":last")
                }
                this.activate(d, b)
            } else {
                this.activate(d, this.element.children(!this.active || this.last() ? ":first" : ":last"))
            }
        }, previousPage: function (c) {
            if (this._hasScroll()) {
                if (!this.active || this.first()) {
                    this.activate(c, this.element.children(":last"));
                    return
                }
                var d = this.active.offset().top, b = this.element.height();
                result = this.element.children("li").filter(function () {
                    var e = a(this).offset().top - d + b - a(this).height();
                    return e < 10 && e > -10
                });
                if (!result.length) {
                    result = this.element.children(":first")
                }
                this.activate(c, result)
            } else {
                this.activate(c, this.element.children(!this.active || this.first() ? ":last" : ":first"))
            }
        }, _hasScroll: function () {
            return this.element.height() < this.element.attr("scrollHeight")
        }, select: function (b) {
            this._trigger("select", b, {item: this.active})
        }
    })
}(jQuery));
(function (f) {
    f.ui = f.ui || {};
    var c = /left|center|right/, e = "center", d = /top|center|bottom/, g = "center", a = f.fn.position, b = f.fn.offset;
    f.fn.position = function (i) {
        if (!i || !i.of) {
            return a.apply(this, arguments)
        }
        i = f.extend({}, i);
        var l = f(i.of), n = (i.collision || "flip").split(" "), m = i.offset ? i.offset.split(" ") : [0, 0], k, h, j;
        if (i.of.nodeType === 9) {
            k = l.width();
            h = l.height();
            j = {top: 0, left: 0}
        } else {
            if (i.of.scrollTo && i.of.document) {
                k = l.width();
                h = l.height();
                j = {top: l.scrollTop(), left: l.scrollLeft()}
            } else {
                if (i.of.preventDefault) {
                    i.at = "left top";
                    k = h = 0;
                    j = {top: i.of.pageY, left: i.of.pageX}
                } else {
                    k = l.outerWidth();
                    h = l.outerHeight();
                    j = l.offset()
                }
            }
        }
        f.each(["my", "at"], function () {
            var p = (i[this] || "").split(" ");
            if (p.length === 1) {
                p = c.test(p[0]) ? p.concat([g]) : d.test(p[0]) ? [e].concat(p) : [e, g]
            }
            p[0] = c.test(p[0]) ? p[0] : e;
            p[1] = d.test(p[1]) ? p[1] : g;
            i[this] = p
        });
        if (n.length === 1) {
            n[1] = n[0]
        }
        m[0] = parseInt(m[0], 10) || 0;
        if (m.length === 1) {
            m[1] = m[0]
        }
        m[1] = parseInt(m[1], 10) || 0;
        if (i.at[0] === "right") {
            j.left += k
        } else {
            if (i.at[0] === e) {
                j.left += k / 2
            }
        }
        if (i.at[1] === "bottom") {
            j.top += h
        } else {
            if (i.at[1] === g) {
                j.top += h / 2
            }
        }
        j.left += m[0];
        j.top += m[1];
        return this.each(function () {
            var s = f(this), r = s.outerWidth(), q = s.outerHeight(), p = f.extend({}, j);
            if (i.my[0] === "right") {
                p.left -= r
            } else {
                if (i.my[0] === e) {
                    p.left -= r / 2
                }
            }
            if (i.my[1] === "bottom") {
                p.top -= q
            } else {
                if (i.my[1] === g) {
                    p.top -= q / 2
                }
            }
            p.left = parseInt(p.left);
            p.top = parseInt(p.top);
            f.each(["left", "top"], function (v, u) {
                if (f.ui.position[n[v]]) {
                    f.ui.position[n[v]][u](p, {
                        targetWidth: k,
                        targetHeight: h,
                        elemWidth: r,
                        elemHeight: q,
                        offset: m,
                        my: i.my,
                        at: i.at
                    })
                }
            });
            if (f.fn.bgiframe) {
                s.bgiframe()
            }
            s.offset(f.extend(p, {using: i.using}))
        })
    };
    f.ui.position = {
        fit: {
            left: function (h, i) {
                var k = f(window), j = h.left + i.elemWidth - k.width() - k.scrollLeft();
                h.left = j > 0 ? h.left - j : Math.max(0, h.left)
            }, top: function (h, i) {
                var k = f(window), j = h.top + i.elemHeight - k.height() - k.scrollTop();
                h.top = j > 0 ? h.top - j : Math.max(0, h.top)
            }
        }, flip: {
            left: function (i, j) {
                if (j.at[0] === "center") {
                    return
                }
                var l = f(window), k = i.left + j.elemWidth - l.width() - l.scrollLeft(), h = j.my[0] === "left" ? -j.elemWidth : j.my[0] === "right" ? j.elemWidth : 0, m = -2 * j.offset[0];
                i.left += i.left < 0 ? h + j.targetWidth + m : k > 0 ? h - j.targetWidth + m : 0
            }, top: function (i, k) {
                if (k.at[1] === "center") {
                    return
                }
                var m = f(window), l = i.top + k.elemHeight - m.height() - m.scrollTop(), h = k.my[1] === "top" ? -k.elemHeight : k.my[1] === "bottom" ? k.elemHeight : 0, j = k.at[1] === "top" ? k.targetHeight : -k.targetHeight, n = -2 * k.offset[1];
                i.top += i.top < 0 ? h + k.targetHeight + n : l > 0 ? h + j + n : 0
            }
        }
    };
    if (!f.offset.setOffset) {
        f.offset.setOffset = function (l, i) {
            if (/static/.test(f.curCSS(l, "position"))) {
                l.style.position = "relative"
            }
            var k = f(l), n = k.offset(), h = parseInt(f.curCSS(l, "top", true), 10) || 0, m = parseInt(f.curCSS(l, "left", true), 10) || 0, j = {
                top: (i.top - n.top) + h,
                left: (i.left - n.left) + m
            };
            if ("using" in i) {
                i.using.call(l, j)
            } else {
                k.css(j)
            }
        };
        f.fn.offset = function (h) {
            var i = this[0];
            if (!i || !i.ownerDocument) {
                return null
            }
            if (h) {
                return this.each(function () {
                    f.offset.setOffset(this, h)
                })
            }
            return b.call(this)
        }
    }
}(jQuery));
(function (a) {
    a.widget("ui.progressbar", {
        options: {value: 0}, _create: function () {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this._valueMin(),
                "aria-valuemax": this._valueMax(),
                "aria-valuenow": this._value()
            });
            this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this._refreshValue()
        }, destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            this._superApply("destroy", arguments)
        }, value: function (b) {
            if (b === undefined) {
                return this._value()
            }
            this._setOption("value", b);
            return this
        }, _setOption: function (b, c) {
            switch (b) {
                case"value":
                    this.options.value = c;
                    this._refreshValue();
                    this._trigger("change");
                    break
            }
            this._superApply("_setOption", arguments)
        }, _value: function () {
            var b = this.options.value;
            if (typeof b !== "number") {
                b = 0
            }
            if (b < this._valueMin()) {
                b = this._valueMin()
            }
            if (b > this._valueMax()) {
                b = this._valueMax()
            }
            return b
        }, _valueMin: function () {
            return 0
        }, _valueMax: function () {
            return 100
        }, _refreshValue: function () {
            var b = this.value();
            this.valueDiv[b === this._valueMax() ? "addClass" : "removeClass"]("ui-corner-right").width(b + "%");
            this.element.attr("aria-valuenow", b)
        }
    });
    a.extend(a.ui.progressbar, {version: "1.9m2"})
})(jQuery);
(function (b) {
    var a = 5;
    b.widget("ui.slider", b.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var c = this, d = this.options;
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            if (d.disabled) {
                this.element.addClass("ui-slider-disabled ui-disabled")
            }
            this.range = b([]);
            if (d.range) {
                if (d.range === true) {
                    this.range = b("<div></div>");
                    if (!d.values) {
                        d.values = [this._valueMin(), this._valueMin()]
                    }
                    if (d.values.length && d.values.length !== 2) {
                        d.values = [d.values[0], d.values[0]]
                    }
                } else {
                    this.range = b("<div></div>")
                }
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (d.range === "min" || d.range === "max") {
                    this.range.addClass("ui-slider-range-" + d.range)
                }
                this.range.addClass("ui-widget-header")
            }
            if (b(".ui-slider-handle", this.element).length === 0) {
                b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
            }
            if (d.values && d.values.length) {
                while (b(".ui-slider-handle", this.element).length < d.values.length) {
                    b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
                }
            }
            this.handles = b(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function (e) {
                e.preventDefault()
            }).hover(function () {
                if (!d.disabled) {
                    b(this).addClass("ui-state-hover")
                }
            }, function () {
                b(this).removeClass("ui-state-hover")
            }).focus(function () {
                if (!d.disabled) {
                    b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    b(this).addClass("ui-state-focus")
                } else {
                    b(this).blur()
                }
            }).blur(function () {
                b(this).removeClass("ui-state-focus")
            });
            this.handles.each(function (e) {
                b(this).data("index.ui-slider-handle", e)
            });
            this.handles.keydown(function (j) {
                var g = true, f = b(this).data("index.ui-slider-handle"), k, h, e, i;
                if (c.options.disabled) {
                    return
                }
                switch (j.keyCode) {
                    case b.ui.keyCode.HOME:
                    case b.ui.keyCode.END:
                    case b.ui.keyCode.PAGE_UP:
                    case b.ui.keyCode.PAGE_DOWN:
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        g = false;
                        if (!c._keySliding) {
                            c._keySliding = true;
                            b(this).addClass("ui-state-active");
                            k = c._start(j, f);
                            if (k === false) {
                                return
                            }
                        }
                        break
                }
                i = c.options.step;
                if (c.options.values && c.options.values.length) {
                    h = e = c.values(f)
                } else {
                    h = e = c.value()
                }
                switch (j.keyCode) {
                    case b.ui.keyCode.HOME:
                        e = c._valueMin();
                        break;
                    case b.ui.keyCode.END:
                        e = c._valueMax();
                        break;
                    case b.ui.keyCode.PAGE_UP:
                        e = c._trimAlignValue(h + ((c._valueMax() - c._valueMin()) / a));
                        break;
                    case b.ui.keyCode.PAGE_DOWN:
                        e = c._trimAlignValue(h - ((c._valueMax() - c._valueMin()) / a));
                        break;
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                        if (h === c._valueMax()) {
                            return
                        }
                        e = c._trimAlignValue(h + i);
                        break;
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        if (h === c._valueMin()) {
                            return
                        }
                        e = c._trimAlignValue(h - i);
                        break
                }
                c._slide(j, f, e);
                return g
            }).keyup(function (f) {
                var e = b(this).data("index.ui-slider-handle");
                if (c._keySliding) {
                    c._keySliding = false;
                    c._stop(f, e);
                    c._change(f, e);
                    b(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function () {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (e) {
            var f = this.options, i, k, d, g, m, j, l, h, c;
            if (f.disabled) {
                return false
            }
            this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()};
            this.elementOffset = this.element.offset();
            i = {x: e.pageX, y: e.pageY};
            k = this._normValueFromMouse(i);
            d = this._valueMax() - this._valueMin() + 1;
            m = this;
            this.handles.each(function (n) {
                var p = Math.abs(k - m.values(n));
                if (d > p) {
                    d = p;
                    g = b(this);
                    j = n
                }
            });
            if (f.range === true && this.values(1) === f.min) {
                j += 1;
                g = b(this.handles[j])
            }
            l = this._start(e, j);
            if (l === false) {
                return false
            }
            this._mouseSliding = true;
            m._handleIndex = j;
            g.addClass("ui-state-active").focus();
            h = g.offset();
            c = !b(e.target).parents().andSelf().is(".ui-slider-handle");
            this._clickOffset = c ? {left: 0, top: 0} : {
                left: e.pageX - h.left - (g.width() / 2),
                top: e.pageY - h.top - (g.height() / 2) - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
            };
            k = this._normValueFromMouse(i);
            this._slide(e, j, k);
            this._animateOff = true;
            return true
        },
        _mouseStart: function (c) {
            return true
        },
        _mouseDrag: function (e) {
            var c = {x: e.pageX, y: e.pageY}, d = this._normValueFromMouse(c);
            this._slide(e, this._handleIndex, d);
            return false
        },
        _mouseStop: function (c) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(c, this._handleIndex);
            this._change(c, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function () {
            this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (d) {
            var c, g, f, e, h;
            if (this.orientation === "horizontal") {
                c = this.elementSize.width;
                g = d.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                c = this.elementSize.height;
                g = d.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            f = (g / c);
            if (f > 1) {
                f = 1
            }
            if (f < 0) {
                f = 0
            }
            if (this.orientation === "vertical") {
                f = 1 - f
            }
            e = this._valueMax() - this._valueMin();
            h = this._valueMin() + f * e;
            return this._trimAlignValue(h)
        },
        _start: function (e, d) {
            var c = {handle: this.handles[d], value: this.value()};
            if (this.options.values && this.options.values.length) {
                c.value = this.values(d);
                c.values = this.values()
            }
            return this._trigger("start", e, c)
        },
        _slide: function (g, f, e) {
            var c, d, h;
            if (this.options.values && this.options.values.length) {
                c = this.values(f ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((f === 0 && e > c) || (f === 1 && e < c))) {
                    e = c
                }
                if (e !== this.values(f)) {
                    d = this.values();
                    d[f] = e;
                    h = this._trigger("slide", g, {handle: this.handles[f], value: e, values: d});
                    c = this.values(f ? 0 : 1);
                    if (h !== false) {
                        this.values(f, e, true)
                    }
                }
            } else {
                if (e !== this.value()) {
                    h = this._trigger("slide", g, {handle: this.handles[f], value: e});
                    if (h !== false) {
                        this.value(e)
                    }
                }
            }
        },
        _stop: function (e, d) {
            var c = {handle: this.handles[d], value: this.value()};
            if (this.options.values && this.options.values.length) {
                c.value = this.values(d);
                c.values = this.values()
            }
            this._trigger("stop", e, c)
        },
        _change: function (e, d) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {handle: this.handles[d], value: this.value()};
                if (this.options.values && this.options.values.length) {
                    c.value = this.values(d);
                    c.values = this.values()
                }
                this._trigger("change", e, c)
            }
        },
        value: function (c) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(c);
                this._refreshValue();
                this._change(null, 0)
            }
            return this._value()
        },
        values: function (d, g) {
            var f, c, e;
            if (arguments.length > 1) {
                this.options.values[d] = this._trimAlignValue(g);
                this._refreshValue();
                this._change(null, d)
            }
            if (arguments.length) {
                if (b.isArray(arguments[0])) {
                    f = this.options.values;
                    c = arguments[0];
                    for (e = 0; e < f.length; e += 1) {
                        f[e] = this._trimAlignValue(c[e]);
                        this._change(null, e)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(d)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function (d, e) {
            var c, f = 0;
            if (b.isArray(this.options.values)) {
                f = this.options.values.length
            }
            this._superApply("_setOption", arguments);
            switch (d) {
                case"disabled":
                    if (e) {
                        this.handles.filter(".ui-state-focus").blur();
                        this.handles.removeClass("ui-state-hover");
                        this.handles.attr("disabled", "disabled");
                        this.element.addClass("ui-disabled")
                    } else {
                        this.handles.removeAttr("disabled");
                        this.element.removeClass("ui-disabled")
                    }
                    break;
                case"orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case"value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case"values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (c = 0; c < f; c += 1) {
                        this._change(null, c)
                    }
                    this._animateOff = false;
                    break
            }
        },
        _value: function () {
            var c = this.options.value;
            c = this._trimAlignValue(c);
            return c
        },
        _values: function (c) {
            var f, e, d;
            if (arguments.length) {
                f = this.options.values[c];
                f = this._trimAlignValue(f);
                return f
            } else {
                e = this.options.values.slice();
                for (d = 0; d < e.length; d += 1) {
                    e[d] = this._trimAlignValue(e[d])
                }
                return e
            }
        },
        _trimAlignValue: function (f) {
            if (f < this._valueMin()) {
                return this._valueMin()
            }
            if (f > this._valueMax()) {
                return this._valueMax()
            }
            var c = (this.options.step > 0) ? this.options.step : 1, e = f % c, d = f - e;
            if (Math.abs(e) * 2 >= c) {
                d += (e > 0) ? c : (-c)
            }
            return parseFloat(d.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var f = this.options.range, e = this.options, l = this, d = (!this._animateOff) ? e.animate : false, g, c = {}, h, j, i, k;
            if (this.options.values && this.options.values.length) {
                this.handles.each(function (n, m) {
                    g = (l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100;
                    c[l.orientation === "horizontal" ? "left" : "bottom"] = g + "%";
                    b(this).stop(1, 1)[d ? "animate" : "css"](c, e.animate);
                    if (l.options.range === true) {
                        if (l.orientation === "horizontal") {
                            if (n === 0) {
                                l.range.stop(1, 1)[d ? "animate" : "css"]({left: g + "%"}, e.animate)
                            }
                            if (n === 1) {
                                l.range[d ? "animate" : "css"]({width: (g - h) + "%"}, {
                                    queue: false,
                                    duration: e.animate
                                })
                            }
                        } else {
                            if (n === 0) {
                                l.range.stop(1, 1)[d ? "animate" : "css"]({bottom: (g) + "%"}, e.animate)
                            }
                            if (n === 1) {
                                l.range[d ? "animate" : "css"]({height: (g - h) + "%"}, {
                                    queue: false,
                                    duration: e.animate
                                })
                            }
                        }
                    }
                    h = g
                })
            } else {
                j = this.value();
                i = this._valueMin();
                k = this._valueMax();
                g = (k !== i) ? (j - i) / (k - i) * 100 : 0;
                c[l.orientation === "horizontal" ? "left" : "bottom"] = g + "%";
                this.handle.stop(1, 1)[d ? "animate" : "css"](c, e.animate);
                if (f === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[d ? "animate" : "css"]({width: g + "%"}, e.animate)
                }
                if (f === "max" && this.orientation === "horizontal") {
                    this.range[d ? "animate" : "css"]({width: (100 - g) + "%"}, {queue: false, duration: e.animate})
                }
                if (f === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[d ? "animate" : "css"]({height: g + "%"}, e.animate)
                }
                if (f === "max" && this.orientation === "vertical") {
                    this.range[d ? "animate" : "css"]({height: (100 - g) + "%"}, {queue: false, duration: e.animate})
                }
            }
        }
    });
    b.extend(b.ui.slider, {version: "1.9m2"})
}(jQuery));
(function (d) {
    var c = 0, b = 0;

    function e() {
        return ++c
    }

    function a() {
        return ++b
    }

    d.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
        }, _create: function () {
            this._tabify(true)
        }, _setOption: function (f, g) {
            if (f == "selected") {
                if (this.options.collapsible && g == this.options.selected) {
                    return
                }
                this.select(g)
            } else {
                this.options[f] = g;
                this._tabify()
            }
        }, _tabId: function (f) {
            return f.title && f.title.replace(/\s/g, "_").replace(/[^A-Za-z0-9\-_:\.]/g, "") || this.options.idPrefix + e()
        }, _sanitizeSelector: function (f) {
            return f.replace(/:/g, "\\:")
        }, _cookie: function () {
            var f = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + a());
            return d.cookie.apply(null, [f].concat(d.makeArray(arguments)))
        }, _ui: function (g, f) {
            return {tab: g, panel: f, index: this.anchors.index(g)}
        }, _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var f = d(this);
                f.html(f.data("label.tabs")).removeData("label.tabs")
            })
        }, _tabify: function (s) {
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = d("li:has(a[href])", this.list);
            this.anchors = this.lis.map(function () {
                return d("a", this)[0]
            });
            this.panels = d([]);
            var u = this, h = this.options;
            var g = /^#.+/;
            this.anchors.each(function (x, v) {
                var w = d(v).attr("href");
                var y = w.split("#")[0], z;
                if (y && (y === location.toString().split("#")[0] || (z = d("base")[0]) && y === z.href)) {
                    w = v.hash;
                    v.href = w
                }
                if (g.test(w)) {
                    u.panels = u.panels.add(u._sanitizeSelector(w))
                } else {
                    if (w != "#") {
                        d.data(v, "href.tabs", w);
                        d.data(v, "load.tabs", w.replace(/#.*$/, ""));
                        var B = u._tabId(v);
                        v.href = "#" + B;
                        var A = d("#" + B);
                        if (!A.length) {
                            A = d(h.panelTemplate).attr("id", B).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(u.panels[x - 1] || u.list);
                            A.data("destroy.tabs", true)
                        }
                        u.panels = u.panels.add(A)
                    } else {
                        h.disabled.push(x)
                    }
                }
            });
            if (s) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (h.selected === undefined) {
                    if (location.hash) {
                        this.anchors.each(function (w, v) {
                            if (v.hash == location.hash) {
                                h.selected = w;
                                return false
                            }
                        })
                    }
                    if (typeof h.selected != "number" && h.cookie) {
                        h.selected = parseInt(u._cookie(), 10)
                    }
                    if (typeof h.selected != "number" && this.lis.filter(".ui-tabs-selected").length) {
                        h.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
                    }
                    h.selected = h.selected || (this.lis.length ? 0 : -1)
                } else {
                    if (h.selected === null) {
                        h.selected = -1
                    }
                }
                h.selected = ((h.selected >= 0 && this.anchors[h.selected]) || h.selected < 0) ? h.selected : 0;
                h.disabled = d.unique(h.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"), function (w, v) {
                    return u.lis.index(w)
                }))).sort();
                if (d.inArray(h.selected, h.disabled) != -1) {
                    h.disabled.splice(d.inArray(h.selected, h.disabled), 1)
                }
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (h.selected >= 0 && this.anchors.length) {
                    this.panels.eq(h.selected).removeClass("ui-tabs-hide");
                    this.lis.eq(h.selected).addClass("ui-tabs-selected ui-state-active");
                    u.element.queue("tabs", function () {
                        u._trigger("show", null, u._ui(u.anchors[h.selected], u.panels[h.selected]))
                    });
                    this.load(h.selected)
                }
                d(window).bind("unload", function () {
                    u.lis.add(u.anchors).unbind(".tabs");
                    u.lis = u.anchors = u.panels = null
                })
            } else {
                h.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
            }
            this.element[h.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            if (h.cookie) {
                this._cookie(h.selected, h.cookie)
            }
            for (var l = 0, r; (r = this.lis[l]); l++) {
                d(r)[d.inArray(l, h.disabled) != -1 && !d(r).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled")
            }
            if (h.cache === false) {
                this.anchors.removeData("cache.tabs")
            }
            this.lis.add(this.anchors).unbind(".tabs");
            if (h.event != "mouseover") {
                var k = function (v, i) {
                    if (i.is(":not(.ui-state-disabled)")) {
                        i.addClass("ui-state-" + v)
                    }
                };
                var n = function (v, i) {
                    i.removeClass("ui-state-" + v)
                };
                this.lis.bind("mouseover.tabs", function () {
                    k("hover", d(this))
                });
                this.lis.bind("mouseout.tabs", function () {
                    n("hover", d(this))
                });
                this.anchors.bind("focus.tabs", function () {
                    k("focus", d(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function () {
                    n("focus", d(this).closest("li"))
                })
            }
            var f, m;
            if (h.fx) {
                if (d.isArray(h.fx)) {
                    f = h.fx[0];
                    m = h.fx[1]
                } else {
                    f = m = h.fx
                }
            }
            function j(i, v) {
                i.css({display: ""});
                if (!d.support.opacity && v.opacity) {
                    i[0].style.removeAttribute("filter")
                }
            }

            var p = m ? function (i, v) {
                d(i).closest("li").addClass("ui-tabs-selected ui-state-active");
                v.hide().removeClass("ui-tabs-hide").animate(m, m.duration || "normal", function () {
                    j(v, m);
                    u._trigger("show", null, u._ui(i, v[0]))
                })
            } : function (i, v) {
                d(i).closest("li").addClass("ui-tabs-selected ui-state-active");
                v.removeClass("ui-tabs-hide");
                u._trigger("show", null, u._ui(i, v[0]))
            };
            var q = f ? function (v, i) {
                i.animate(f, f.duration || "normal", function () {
                    u.lis.removeClass("ui-tabs-selected ui-state-active");
                    i.addClass("ui-tabs-hide");
                    j(i, f);
                    u.element.dequeue("tabs")
                })
            } : function (v, i, w) {
                u.lis.removeClass("ui-tabs-selected ui-state-active");
                i.addClass("ui-tabs-hide");
                u.element.dequeue("tabs")
            };
            this.anchors.bind(h.event + ".tabs", function () {
                var v = this, x = d(this).closest("li"), i = u.panels.filter(":not(.ui-tabs-hide)"), w = d(u._sanitizeSelector(this.hash));
                if ((x.hasClass("ui-tabs-selected") && !h.collapsible) || x.hasClass("ui-state-disabled") || x.hasClass("ui-state-processing") || u._trigger("select", null, u._ui(this, w[0])) === false) {
                    this.blur();
                    return false
                }
                h.selected = u.anchors.index(this);
                u.abort();
                if (h.collapsible) {
                    if (x.hasClass("ui-tabs-selected")) {
                        h.selected = -1;
                        if (h.cookie) {
                            u._cookie(h.selected, h.cookie)
                        }
                        u.element.queue("tabs", function () {
                            q(v, i)
                        }).dequeue("tabs");
                        this.blur();
                        return false
                    } else {
                        if (!i.length) {
                            if (h.cookie) {
                                u._cookie(h.selected, h.cookie)
                            }
                            u.element.queue("tabs", function () {
                                p(v, w)
                            });
                            u.load(u.anchors.index(this));
                            this.blur();
                            return false
                        }
                    }
                }
                if (h.cookie) {
                    u._cookie(h.selected, h.cookie)
                }
                if (w.length) {
                    if (i.length) {
                        u.element.queue("tabs", function () {
                            q(v, i)
                        })
                    }
                    u.element.queue("tabs", function () {
                        p(v, w)
                    });
                    u.load(u.anchors.index(this))
                } else {
                    throw"jQuery UI Tabs: Mismatching fragment identifier."
                }
                if (d.browser.msie) {
                    this.blur()
                }
            });
            this.anchors.bind("click.tabs", function () {
                return false
            })
        }, destroy: function () {
            var f = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function () {
                var g = d.data(this, "href.tabs");
                if (g) {
                    this.href = g
                }
                var h = d(this).unbind(".tabs");
                d.each(["href", "load", "cache"], function (j, k) {
                    h.removeData(k + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function () {
                if (d.data(this, "destroy.tabs")) {
                    d(this).remove()
                } else {
                    d(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
                }
            });
            if (f.cookie) {
                this._cookie(null, f.cookie)
            }
            return this
        }, add: function (i, h, g) {
            if (g === undefined) {
                g = this.anchors.length
            }
            var f = this, k = this.options, m = d(k.tabTemplate.replace(/#\{href\}/g, i).replace(/#\{label\}/g, h)), l = !i.indexOf("#") ? i.replace("#", "") : this._tabId(d("a", m)[0]);
            m.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var j = d("#" + l);
            if (!j.length) {
                j = d(k.panelTemplate).attr("id", l).data("destroy.tabs", true)
            }
            j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (g >= this.lis.length) {
                m.appendTo(this.list);
                j.appendTo(this.list[0].parentNode)
            } else {
                m.insertBefore(this.lis[g]);
                j.insertBefore(this.panels[g])
            }
            k.disabled = d.map(k.disabled, function (q, p) {
                return q >= g ? ++q : q
            });
            this._tabify();
            if (this.anchors.length == 1) {
                k.selected = 0;
                m.addClass("ui-tabs-selected ui-state-active");
                j.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function () {
                    f._trigger("show", null, f._ui(f.anchors[0], f.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[g], this.panels[g]));
            return this
        }, remove: function (f) {
            var h = this.options, i = this.lis.eq(f).remove(), g = this.panels.eq(f).remove();
            if (i.hasClass("ui-tabs-selected") && this.anchors.length > 1) {
                this.select(f + (f + 1 < this.anchors.length ? 1 : -1))
            }
            h.disabled = d.map(d.grep(h.disabled, function (k, j) {
                return k != f
            }), function (k, j) {
                return k >= f ? --k : k
            });
            this._tabify();
            this._trigger("remove", null, this._ui(i.find("a")[0], g[0]));
            return this
        }, enable: function (f) {
            var g = this.options;
            if (d.inArray(f, g.disabled) == -1) {
                return
            }
            this.lis.eq(f).removeClass("ui-state-disabled");
            g.disabled = d.grep(g.disabled, function (j, h) {
                return j != f
            });
            this._trigger("enable", null, this._ui(this.anchors[f], this.panels[f]));
            return this
        }, disable: function (g) {
            var f = this, h = this.options;
            if (g != h.selected) {
                this.lis.eq(g).addClass("ui-state-disabled");
                h.disabled.push(g);
                h.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[g], this.panels[g]))
            }
            return this
        }, select: function (f) {
            if (typeof f == "string") {
                f = this.anchors.index(this.anchors.filter("[href$=" + f + "]"))
            } else {
                if (f === null) {
                    f = -1
                }
            }
            if (f == -1 && this.options.collapsible) {
                f = this.options.selected
            }
            this.anchors.eq(f).trigger(this.options.event + ".tabs");
            return this
        }, load: function (i) {
            var g = this, k = this.options, f = this.anchors.eq(i)[0], h = d.data(f, "load.tabs");
            this.abort();
            if (!h || this.element.queue("tabs").length !== 0 && d.data(f, "cache.tabs")) {
                this.element.dequeue("tabs");
                return
            }
            this.lis.eq(i).addClass("ui-state-processing");
            if (k.spinner) {
                var j = d("span", f);
                j.data("label.tabs", j.html()).html(k.spinner)
            }
            this.xhr = d.ajax(d.extend({}, k.ajaxOptions, {
                url: h, success: function (m, l) {
                    d(g._sanitizeSelector(f.hash)).html(m);
                    g._cleanup();
                    if (k.cache) {
                        d.data(f, "cache.tabs", true)
                    }
                    g._trigger("load", null, g._ui(g.anchors[i], g.panels[i]));
                    try {
                        k.ajaxOptions.success(m, l)
                    } catch (n) {
                    }
                }, error: function (n, l, m) {
                    g._cleanup();
                    g._trigger("load", null, g._ui(g.anchors[i], g.panels[i]));
                    try {
                        k.ajaxOptions.error(n, l, i, f)
                    } catch (m) {
                    }
                }
            }));
            g.element.dequeue("tabs");
            return this
        }, abort: function () {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        }, url: function (g, f) {
            this.anchors.eq(g).removeData("cache.tabs").data("load.tabs", f);
            return this
        }, length: function () {
            return this.anchors.length
        }
    });
    d.extend(d.ui.tabs, {version: "1.9m2"});
    d.extend(d.ui.tabs.prototype, {
        rotation: null, rotate: function (h, j) {
            var f = this, k = this.options;
            var g = f._rotate || (f._rotate = function (l) {
                    clearTimeout(f.rotation);
                    f.rotation = setTimeout(function () {
                        var m = k.selected;
                        f.select(++m < f.anchors.length ? m : 0)
                    }, h);
                    if (l) {
                        l.stopPropagation()
                    }
                });
            var i = f._unrotate || (f._unrotate = !j ? function (l) {
                    if (l.clientX) {
                        f.rotate(null)
                    }
                } : function (l) {
                    t = k.selected;
                    g()
                });
            if (h) {
                this.element.bind("tabsshow", g);
                this.anchors.bind(k.event + ".tabs", i);
                g()
            } else {
                clearTimeout(f.rotation);
                this.element.unbind("tabsshow", g);
                this.anchors.unbind(k.event + ".tabs", i);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);
(function (b) {
    if (!b(document.body).is("[role]")) {
        b(document.body).attr("role", "application")
    }
    var a = 0;
    b.widget("ui.tooltip", {
        options: {
            tooltipClass: "ui-widget-content", content: function () {
                return b(this).attr("title")
            }, position: {my: "left center", at: "right center", offset: "15 0"}
        }, _init: function () {
            var c = this;
            this.tooltip = b("<div></div>").attr("id", "ui-tooltip-" + a++).attr("role", "tooltip").attr("aria-hidden", "true").addClass("ui-tooltip ui-widget ui-corner-all").addClass(this.options.tooltipClass).appendTo(document.body).hide();
            this.tooltipContent = b("<div></div>").addClass("ui-tooltip-content").appendTo(this.tooltip);
            this.opacity = this.tooltip.css("opacity");
            this.element.bind("focus.tooltip mouseenter.tooltip", function (d) {
                c.open(d)
            }).bind("blur.tooltip mouseleave.tooltip", function (d) {
                c.close(d)
            })
        }, enable: function () {
            this.options.disabled = false
        }, disable: function () {
            this.options.disabled = true
        }, destroy: function () {
            this.tooltip.remove();
            b.Widget.prototype.destroy.apply(this, arguments)
        }, widget: function () {
            return this.tooltip
        }, open: function (e) {
            var f = this.element;
            if (this.current && this.current[0] == f[0]) {
                return
            }
            var c = this;
            this.current = f;
            this.currentTitle = f.attr("title");
            var d = this.options.content.call(f[0], function (g) {
                if (c.current == f) {
                    c._show(e, f, g)
                }
            });
            if (d) {
                c._show(e, f, d)
            }
        }, _show: function (d, e, c) {
            if (!c) {
                return
            }
            e.attr("title", "");
            if (this.options.disabled) {
                return
            }
            this.tooltipContent.html(c);
            this.tooltip.css({top: 0, left: 0}).show().position(b.extend(this.options.position, {of: e})).hide();
            this.tooltip.attr("aria-hidden", "false");
            e.attr("aria-describedby", this.tooltip.attr("id"));
            if (this.tooltip.is(":animated")) {
                this.tooltip.stop().show().fadeTo("normal", this.opacity)
            } else {
                this.tooltip.is(":visible") ? this.tooltip.fadeTo("normal", this.opacity) : this.tooltip.fadeIn()
            }
            this._trigger("open", d)
        }, close: function (c) {
            if (!this.current) {
                return
            }
            var d = this.current.attr("title", this.currentTitle);
            this.current = null;
            if (this.options.disabled) {
                return
            }
            d.removeAttr("aria-describedby");
            this.tooltip.attr("aria-hidden", "true");
            if (this.tooltip.is(":animated")) {
                this.tooltip.stop().fadeTo("normal", 0, function () {
                    b(this).hide().css("opacity", "")
                })
            } else {
                this.tooltip.stop().fadeOut()
            }
            this._trigger("close", c)
        }
    })
})(jQuery);

//jquery.keypad.min.js
(function (c) {
    function q() {
        this._curInst = null;
        this._disabledFields = [];
        this._keypadShowing = !1;
        this._keyCode = 0;
        this._specialKeys = [];
        this.addKeyDef("CLOSE", "close", function (a) {
            c.keypad._curInst = a._inline ? a : c.keypad._curInst;
            c.keypad._hideKeypad()
        });
        this.addKeyDef("CLEAR", "clear", function (a) {
            c.keypad._clearValue(a)
        });
        this.addKeyDef("BACK", "back", function (a) {
            c.keypad._backValue(a)
        });
        this.addKeyDef("SHIFT", "shift", function (a) {
            c.keypad._shiftKeypad(a)
        });
        this.addKeyDef("SPACE_BAR", "spacebar", function (a) {
            c.keypad._selectValue(a,
                " ")
        }, !0);
        this.addKeyDef("SPACE", "space");
        this.addKeyDef("HALF_SPACE", "half-space");
        this.addKeyDef("ENTER", "enter", function (a) {
            c.keypad._selectValue(a, "\r")
        }, !0);
        this.addKeyDef("TAB", "tab", function (a) {
            c.keypad._selectValue(a, "\t")
        }, !0);
        this.qwertyAlphabetic = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
        this.qwertyLayout = ["!@#$%^&*()_=" + this.HALF_SPACE + this.SPACE + this.CLOSE, this.HALF_SPACE + "`~[]{}<>\\|/" + this.SPACE + "789", "qwertyuiop'\"" + this.HALF_SPACE + "456", this.HALF_SPACE + "asdfghjkl;:" + this.SPACE + "123", this.SPACE +
        "zxcvbnm,.?" + this.SPACE + this.HALF_SPACE + "-0+", "" + this.TAB + this.ENTER + this.SPACE_BAR + this.SHIFT + this.HALF_SPACE + this.BACK + this.CLEAR];
        this.regional = [];
        this.regional[""] = {
            buttonText: "...",
            buttonStatus: "Open the keypad",
            closeText: "Close",
            closeStatus: "Close the keypad",
            clearText: "Clear",
            clearStatus: "Erase all the text",
            backText: "Back",
            backStatus: "Erase the previous character",
            spacebarText: "&nbsp;",
            spacebarStatus: "Space",
            enterText: "Enter",
            enterStatus: "Carriage return",
            tabText: "\ufffd\ufffd",
            tabStatus: "Horizontal tab",
            shiftText: "Shift",
            shiftStatus: "Toggle upper/lower case characters",
            alphabeticLayout: this.qwertyAlphabetic,
            fullLayout: this.qwertyLayout,
            isAlphabetic: this.isAlphabetic,
            isNumeric: this.isNumeric,
            isRTL: !1
        };
        this._defaults = {
            showOn: "focus",
            buttonImage: "",
            buttonImageOnly: !1,
            showAnim: "show",
            showOptions: {},
            duration: "normal",
            appendText: "",
            useThemeRoller: !1,
            keypadClass: "",
            prompt: "",
            layout: ["123" + this.CLOSE, "456" + this.CLEAR, "789" + this.BACK, this.SPACE + "0"],
            separator: "",
            target: null,
            keypadOnly: !0,
            randomiseAlphabetic: !1,
            randomiseNumeric: !1,
            randomiseOther: !1,
            randomiseAll: !1,
            beforeShow: null,
            onKeypress: null,
            onClose: null
        };
        c.extend(this._defaults, this.regional[""]);
        this.mainDiv = c('<div class="' + this._mainDivClass + '" style="display: none;"></div>')
    }

    function r(a, b) {
        c.extend(a, b);
        for (var d in b)if (b[d] == null || b[d] == void 0)a[d] = b[d];
        return a
    }

    c.extend(q.prototype, {
        markerClassName: "hasKeypad",
        _mainDivClass: "keypad-popup",
        _inlineClass: "keypad-inline",
        _appendClass: "keypad-append",
        _triggerClass: "keypad-trigger",
        _disableClass: "keypad-disabled",
        _inlineEntryClass: "keypad-keyentry",
        _coverClass: "keypad-cover",
        setDefaults: function (a) {
            r(this._defaults, a || {});
            return this
        },
        addKeyDef: function (a, b, c, e) {
            if (this._keyCode == 32)throw"Only 32 special keys allowed";
            this[a] = String.fromCharCode(this._keyCode++);
            this._specialKeys.push({code: this[a], id: a, name: b, action: c, noHighlight: e});
            return this
        },
        _attachKeypad: function (a, b) {
            var d = a.nodeName.toLowerCase() != "input" && a.nodeName.toLowerCase() != "textarea", e = {
                _inline: d, _mainDiv: d ? c('<div class="' + this._inlineClass +
                    '"></div>') : c.keypad.mainDiv, ucase: !1
            };
            e.settings = c.extend({}, b || {});
            this._setInput(a, e);
            this._connectKeypad(a, e);
            d ? (c(a).append(e._mainDiv).bind("click.keypad", function () {
                e._input.focus()
            }), this._updateKeypad(e)) : c(a).is(":disabled") && this._disableKeypad(a)
        },
        _setInput: function (a, b) {
            b._input = c(!b._inline ? a : this._get(b, "target") || '<input type="text" class="' + this._inlineEntryClass + '" disabled="disabled"/>');
            b._inline && (a = c(a), a.find("input").remove(), this._get(b, "target") || a.append(b._input))
        },
        _connectKeypad: function (a,
                                  b) {
            var d = c(a);
            if (!d.hasClass(this.markerClassName)) {
                var e = this._get(b, "appendText"), f = this._get(b, "isRTL");
                if (e)d[f ? "before" : "after"]('<span class="' + this._appendClass + '">' + e + "</span>");
                if (!b._inline && (e = this._get(b, "showOn"), (e == "focus" || e == "both") && d.focus(this._showKeypad).keydown(this._doKeyDown), e == "button" || e == "both")) {
                    var e = this._get(b, "buttonText"), h = this._get(b, "buttonStatus"), g = this._get(b, "buttonImage"), e = c(this._get(b, "buttonImageOnly") ? c('<img src="' + g + '" alt="' + h + '" title="' + h + '"/>') :
                        c('<button type="button" title="' + h + '"></button>').html(g == "" ? e : c('<img src="' + g + '" alt="' + h + '" title="' + h + '"/>')));
                    d[f ? "before" : "after"](e);
                    e.addClass(this._triggerClass).click(function () {
                        c.keypad._keypadShowing && c.keypad._lastField == a ? c.keypad._hideKeypad() : c.keypad._showKeypad(a);
                        return !1
                    })
                }
                b.saveReadonly = d.attr("readonly");
                d.addClass(this.markerClassName).attr("readonly", this._get(b, "keypadOnly") ? "readonly" : "").bind("setData.keypad", function (a, c, d) {
                    b.settings[c] = d
                }).bind("getData.keypad", function (a,
                                                    c) {
                    return this._get(b, c)
                });
                c.data(a, "keypad", b)
            }
        },
        _destroyKeypad: function (a) {
            var b = c(a);
            if (b.hasClass(this.markerClassName)) {
                var d = c.data(a, "keypad");
                this._curInst == d && this._hideKeypad();
                b.siblings("." + this._appendClass).remove().end().siblings("." + this._triggerClass).remove().end().prev("." + this._inlineEntryClass).remove();
                b.empty().unbind("focus", this._showKeypad).removeClass(this.markerClassName).attr("readonly", d.saveReadonly);
                c.removeData(d._input[0], "keypad");
                c.removeData(a, "keypad")
            }
        },
        _enableKeypad: function (a) {
            var b =
                c(a);
            if (b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                if (d == "input" || d == "textarea")a.disabled = !1, b.siblings("button." + this._triggerClass).each(function () {
                    this.disabled = !1
                }).end().siblings("img." + this._triggerClass).css({
                    opacity: "1.0",
                    cursor: ""
                }); else if (d == "div" || d == "span")b.children("." + this._disableClass).remove(), c.data(a, "keypad")._mainDiv.find("button").attr("disabled", "");
                this._disabledFields = c.map(this._disabledFields, function (b) {
                    return b == a ? null : b
                })
            }
        },
        _disableKeypad: function (a) {
            var b =
                c(a);
            if (b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                if (d == "input" || d == "textarea")a.disabled = !0, b.siblings("button." + this._triggerClass).each(function () {
                    this.disabled = !0
                }).end().siblings("img." + this._triggerClass).css({
                    opacity: "0.5",
                    cursor: "default"
                }); else if (d == "div" || d == "span") {
                    var d = b.children("." + this._inlineClass), e = d.offset(), f = {left: 0, top: 0};
                    d.parents().each(function () {
                        if (c(this).css("position") == "relative")return f = c(this).offset(), !1
                    });
                    b.prepend('<div class="' + this._disableClass +
                        '" style="width: ' + d.outerWidth() + "px; height: " + d.outerHeight() + "px; left: " + (e.left - f.left) + "px; top: " + (e.top - f.top) + 'px;"></div>');
                    c.data(a, "keypad")._mainDiv.find("button").attr("disabled", "disabled")
                }
                this._disabledFields = c.map(this._disabledFields, function (b) {
                    return b == a ? null : b
                });
                this._disabledFields[this._disabledFields.length] = a
            }
        },
        _isDisabledKeypad: function (a) {
            return a && c.inArray(a, this._disabledFields) > -1
        },
        _changeKeypad: function (a, b, d) {
            var e = b || {};
            typeof b == "string" && (e = {}, e[b] = d);
            if (b = c.data(a,
                    "keypad"))this._curInst == b && this._hideKeypad(), r(b.settings, e), this._setInput(c(a), b), this._updateKeypad(b)
        },
        _showKeypad: function (a) {
            a = a.target || a;
            if (!(c.keypad._isDisabledKeypad(a) || c.keypad._lastField == a)) {
                var b = c.data(a, "keypad");
                c.keypad._hideKeypad(null, "");
                c.keypad._lastField = a;
                c.keypad._pos = c.keypad._findPos(a);
                c.keypad._pos[1] += a.offsetHeight;
                var d = !1;
                c(a).parents().each(function () {
                    d |= c(this).css("position") == "fixed";
                    return !d
                });
                d && c.browser.opera && (c.keypad._pos[0] -= document.documentElement.scrollLeft,
                    c.keypad._pos[1] -= document.documentElement.scrollTop);
                a = {left: c.keypad._pos[0], top: c.keypad._pos[1]};
                c.keypad._pos = null;
                b._mainDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px",
                    width: c.browser.opera ? "1000px" : "auto"
                });
                c.keypad._updateKeypad(b);
                a = c.keypad._checkOffset(b, a, d);
                b._mainDiv.css({
                    position: d ? "fixed" : "absolute",
                    display: "none",
                    left: a.left + "px",
                    top: a.top + "px"
                });
                var a = c.keypad._get(b, "showAnim"), e = c.keypad._get(b, "duration"), e = e == "normal" && c.ui && c.ui.version >= "1.8" ? "_default" : e, f = function () {
                    c.keypad._keypadShowing = !0;
                    var a = c.keypad._getBorders(b._mainDiv);
                    b._mainDiv.find("iframe." + c.keypad._coverClass).css({
                        left: -a[0],
                        top: -a[1],
                        width: b._mainDiv.outerWidth(),
                        height: b._mainDiv.outerHeight()
                    })
                };
                if (c.effects && c.effects[a]) {
                    var h = b._mainDiv.data(), g;
                    for (g in h)g.match(/^ec\.storage\./) && (h[g] = b._mainDiv.css(g.replace(/ec\.storage\./, "")));
                    b._mainDiv.data(h).show(a, c.keypad._get(b, "showOptions"), e, f)
                } else b._mainDiv[a || "show"](a ? e : "", f);
                a || f();
                b._input[0].type != "hidden" && b._input[0].focus();
                c.keypad._curInst = b
            }
        },
        _updateKeypad: function (a) {
            var b = this._getBorders(a._mainDiv);
            a._mainDiv.empty().append(this._generateHTML(a)).find("iframe." + this._coverClass).css({
                left: -b[0],
                top: -b[1],
                width: a._mainDiv.outerWidth(),
                height: a._mainDiv.outerHeight()
            });
            a._mainDiv.removeClass().addClass(this._get(a, "keypadClass") + (this._get(a, "useThemeRoller") ? " ui-widget ui-widget-content" : "") + (this._get(a, "isRTL") ? " keypad-rtl" : "") + " " + (a._inline ? this._inlineClass : this._mainDivClass));
            (b = this._get(a, "beforeShow")) && b.apply(a._input ?
                a._input[0] : null, [a._mainDiv, a])
        },
        _getBorders: function (a) {
            var b = function (a) {
                var b = c.browser.msie ? 1 : 0;
                return {thin: 1 + b, medium: 3 + b, thick: 5 + b}[a] || a
            };
            return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
        },
        _checkOffset: function (a, b, d) {
            var e = a._input ? this._findPos(a._input[0]) : null, f = window.innerWidth || document.documentElement.clientWidth || document.documentElement.scrollWidth, h = window.innerHeight || document.documentElement.clientHeight || document.documentElement.scrollHeight,
                g = document.documentElement.scrollLeft || document.body.scrollLeft, j = document.documentElement.scrollTop || document.body.scrollTop;
            if (c.browser.msie && parseInt(c.browser.version, 10) < 7 || c.browser.opera) {
                var k = 0;
                a._mainDiv.find(":not(div,iframe)").each(function () {
                    k = Math.max(k, this.offsetLeft + c(this).outerWidth() + parseInt(c(this).css("margin-right"), 10))
                });
                a._mainDiv.css("width", k)
            }
            this._get(a, "isRTL") || b.left + a._mainDiv.outerWidth() - g > f ? b.left = Math.max(d ? 0 : g, e[0] + (a._input ? a._input.outerWidth() : 0) - (d ? g : 0) -
                a._mainDiv.outerWidth() - (d && c.browser.opera ? document.documentElement.scrollLeft : 0)) : b.left -= d ? g : 0;
            b.top + a._mainDiv.outerHeight() - j > h ? b.top = Math.max(d ? 0 : j, e[1] - (d ? j : 0) - a._mainDiv.outerHeight() - (d && c.browser.opera ? document.documentElement.scrollTop : 0)) : b.top -= d ? j : 0;
            return b
        },
        _findPos: function (a) {
            for (; a && (a.type == "hidden" || a.nodeType != 1);)a = a.nextSibling;
            a = c(a).offset();
            return [a.left, a.top]
        },
        _hideKeypad: function (a, b) {
            var d = this._curInst;
            if (d && !(a && d != c.data(a, "keypad"))) {
                if (this._keypadShowing) {
                    var b =
                        b != null ? b : this._get(d, "duration"), b = b == "normal" && c.ui && c.ui.version >= "1.8" ? "_default" : b, e = this._get(d, "showAnim");
                    if (c.effects && c.effects[e])d._mainDiv.hide(e, this._get(d, "showOptions"), b); else d._mainDiv[e == "slideDown" ? "slideUp" : e == "fadeIn" ? "fadeOut" : "hide"](e ? b : "")
                }
                (e = this._get(d, "onClose")) && e.apply(d._input ? d._input[0] : null, [d._input.val(), d]);
                if (this._keypadShowing)this._keypadShowing = !1, this._lastField = null;
                d._inline && d._input.val("");
                this._curInst = null
            }
        },
        _doKeyDown: function (a) {
            a.keyCode == 9 &&
            (c.keypad.mainDiv.stop(!0, !0), c.keypad._hideKeypad())
        },
        _checkExternalClick: function (a) {
            c.keypad._curInst && (a = c(a.target), !a.parents().andSelf().is("." + c.keypad._mainDivClass) && !a.hasClass(c.keypad.markerClassName) && !a.parents().andSelf().hasClass(c.keypad._triggerClass) && c.keypad._keypadShowing && c.keypad._hideKeypad())
        },
        _shiftKeypad: function (a) {
            a.ucase = !a.ucase;
            this._updateKeypad(a);
            a._input.focus()
        },
        _clearValue: function (a) {
            this._setValue(a, "", 0);
            this._notifyKeypress(a, c.keypad.DEL)
        },
        _backValue: function (a) {
            var b =
                a._input[0], d = a._input.val(), e = [d.length, d.length];
            b.setSelectionRange ? e = a._input.attr("readonly") || a._input.attr("disabled") ? e : [b.selectionStart, b.selectionEnd] : b.createTextRange && (e = a._input.attr("readonly") || a._input.attr("disabled") ? e : this._getIERange(b));
            this._setValue(a, d.length == 0 ? "" : d.substr(0, e[0] - 1) + d.substr(e[1]), e[0] - 1);
            this._notifyKeypress(a, c.keypad.BS)
        },
        _selectValue: function (a, b) {
            this.insertValue(a._input[0], b);
            this._setValue(a, a._input.val());
            this._notifyKeypress(a, b)
        },
        insertValue: function (a,
                               b) {
            var a = a.jquery ? a : c(a), d = a[0], e = a.val(), f = [e.length, e.length];
            d.setSelectionRange ? f = a.attr("readonly") || a.attr("disabled") ? f : [d.selectionStart, d.selectionEnd] : d.createTextRange && (f = a.attr("readonly") || a.attr("disabled") ? f : this._getIERange(d));
            a.val(e.substr(0, f[0]) + b + e.substr(f[1]));
            pos = f[0] + b.length;
            a.is(":visible") && a.focus();
            d.setSelectionRange ? a.is(":visible") && d.setSelectionRange(pos, pos) : d.createTextRange && (f = d.createTextRange(), f.move("character", pos), f.select())
        },
        _getIERange: function (a) {
            a.focus();
            var b = document.selection.createRange().duplicate(), c = this._getIETextRange(a);
            c.setEndPoint("EndToStart", b);
            a = function (a) {
                for (var b = a.text, c = b; ;)if (a.compareEndPoints("StartToEnd", a) == 0)break; else if (a.moveEnd("character", -1), a.text == b)c += "\r\n"; else break;
                return c
            };
            c = a(c);
            b = a(b);
            return [c.length, c.length + b.length]
        },
        _getIETextRange: function (a) {
            var b = a.nodeName.toLowerCase() == "input", c = b ? a.createTextRange() : document.body.createTextRange();
            b || c.moveToElementText(a);
            return c
        },
        _setValue: function (a, b) {
            var c =
                a._input.attr("maxlength");
            c > -1 && (b = b.substr(0, c));
            a._input.val(b);
            this._get(a, "onKeypress") || a._input.trigger("change")
        },
        _notifyKeypress: function (a, b) {
            var c = this._get(a, "onKeypress");
            c && c.apply(a._input ? a._input[0] : null, [b, a._input.val(), a])
        },
        _get: function (a, b) {
            return a.settings[b] !== void 0 ? a.settings[b] : this._defaults[b]
        },
        _generateHTML: function (a) {
            var b = this._get(a, "useThemeRoller");
            this._get(a, "isRTL");
            for (var d = this._get(a, "prompt"), e = this._get(a, "separator"), f = !d ? "" : '<div class="keypad-prompt' +
            (b ? " ui-widget-header ui-corner-all" : "") + '">' + d + "</div>", d = this._randomiseLayout(a), h = 0; h < d.length; h++) {
                f += '<div class="keypad-row">';
                for (var g = d[h].split(e), j = 0; j < g.length; j++) {
                    a.ucase && (g[j] = g[j].toUpperCase());
                    var k = this._specialKeys[g[j].charCodeAt(0)];
                    f += k ? k.action ? '<button type="button" class="keypad-special keypad-' + k.name + (b ? " ui-corner-all ui-state-default" + (k.noHighlight ? "" : " ui-state-highlight") : "") + '" title="' + this._get(a, k.name + "Status") + '">' + (this._get(a, k.name + "Text") || "&nbsp;") + "</button>" :
                    '<div class="keypad-' + k.name + '"></div>' : '<button type="button" class="keypad-key' + (b ? " ui-corner-all ui-state-default" : "") + '">' + (g[j] == " " ? "&nbsp;" : g[j]) + "</button>"
                }
                f += "</div>"
            }
            f += '<div style="clear: both;"></div>' + (!a._inline && c.browser.msie && parseInt(c.browser.version, 10) < 7 ? '<iframe src="javascript:false;" class="' + c.keypad._coverClass + '"></iframe>' : "");
            var f = c(f), n = "keypad-key-down" + (b ? " ui-state-active" : "");
            f.find("button").mousedown(function () {
                c(this).addClass(n)
            }).mouseup(function () {
                c(this).removeClass(n)
            }).mouseout(function () {
                c(this).removeClass(n)
            }).filter(".keypad-key").click(function () {
                c.keypad._selectValue(a,
                    c(this).text())
            });
            c.each(this._specialKeys, function (b, c) {
                f.find(".keypad-" + c.name).click(function () {
                    c.action.apply(a._input, [a])
                })
            });
            return f
        },
        _randomiseLayout: function (a) {
            var b = this._get(a, "randomiseNumeric"), c = this._get(a, "randomiseAlphabetic"), e = this._get(a, "randomiseOther"), f = this._get(a, "randomiseAll"), h = this._get(a, "layout");
            if (!b && !c && !e && !f)return h;
            for (var g = this._get(a, "isNumeric"), j = this._get(a, "isAlphabetic"), a = this._get(a, "separator"), k = [], n = [], o = [], p = [], m = 0; m < h.length; m++) {
                p[m] = "";
                for (var l =
                    h[m].split(a), i = 0; i < l.length; i++)this._isControl(l[i]) || (f ? o.push(l[i]) : g(l[i]) ? k.push(l[i]) : j(l[i]) ? n.push(l[i]) : o.push(l[i]))
            }
            b && this._shuffle(k);
            c && this._shuffle(n);
            (e || f) && this._shuffle(o);
            for (m = e = c = b = 0; m < h.length; m++) {
                l = h[m].split(a);
                for (i = 0; i < l.length; i++)p[m] += (this._isControl(l[i]) ? l[i] : f ? o[e++] : g(l[i]) ? k[b++] : j(l[i]) ? n[c++] : o[e++]) + a
            }
            return p
        },
        _isControl: function (a) {
            return a < " "
        },
        isAlphabetic: function (a) {
            return a >= "A" && a <= "Z" || a >= "a" && a <= "z"
        },
        isNumeric: function (a) {
            return a >= "0" && a <= "9"
        },
        _shuffle: function (a) {
            for (var b = a.length - 1; b > 0; b--) {
                var c = Math.floor(Math.random() * a.length), e = a[b];
                a[b] = a[c];
                a[c] = e
            }
        }
    });
    c.fn.keypad = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return a == "isDisabled" ? c.keypad["_" + a + "Keypad"].apply(c.keypad, [this[0]].concat(b)) : this.each(function () {
            typeof a == "string" ? c.keypad["_" + a + "Keypad"].apply(c.keypad, [this].concat(b)) : c.keypad._attachKeypad(this, a)
        })
    };
    c.keypad = new q;
    c(function () {
        c(document.body).append(c.keypad.mainDiv).mousedown(c.keypad._checkExternalClick)
    })
})(jQuery);

/**
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 **/
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (b) {
        for (var d = "", c, a, f, g, h, e, i = 0, b = Base64._utf8_encode(b); i < b.length;)c = b.charCodeAt(i++), a = b.charCodeAt(i++), f = b.charCodeAt(i++), g = c >> 2, c = (c & 3) << 4 | a >> 4, h = (a & 15) << 2 | f >> 6, e = f & 63, isNaN(a) ? h = e = 64 : isNaN(f) && (e = 64), d = d + this._keyStr.charAt(g) + this._keyStr.charAt(c) + this._keyStr.charAt(h) + this._keyStr.charAt(e);
        return d
    }, decode: function (b) {
        for (var d = "", c, a, f, g, h, e = 0, b = b.replace(/[^A-Za-z0-9\+\/\=]/g, ""); e <
        b.length;)c = this._keyStr.indexOf(b.charAt(e++)), a = this._keyStr.indexOf(b.charAt(e++)), g = this._keyStr.indexOf(b.charAt(e++)), h = this._keyStr.indexOf(b.charAt(e++)), c = c << 2 | a >> 4, a = (a & 15) << 4 | g >> 2, f = (g & 3) << 6 | h, d += String.fromCharCode(c), g != 64 && (d += String.fromCharCode(a)), h != 64 && (d += String.fromCharCode(f));
        return d = Base64._utf8_decode(d)
    }, _utf8_encode: function (b) {
        for (var b = b.replace(/\r\n/g, "\n"), d = "", c = 0; c < b.length; c++) {
            var a = b.charCodeAt(c);
            a < 128 ? d += String.fromCharCode(a) : (a > 127 && a < 2048 ? d += String.fromCharCode(a >>
                6 | 192) : (d += String.fromCharCode(a >> 12 | 224), d += String.fromCharCode(a >> 6 & 63 | 128)), d += String.fromCharCode(a & 63 | 128))
        }
        return d
    }, _utf8_decode: function (b) {
        for (var d = "", c = 0, a = c1 = c2 = 0; c < b.length;)a = b.charCodeAt(c), a < 128 ? (d += String.fromCharCode(a), c++) : a > 191 && a < 224 ? (c2 = b.charCodeAt(c + 1), d += String.fromCharCode((a & 31) << 6 | c2 & 63), c += 2) : (c2 = b.charCodeAt(c + 1), c3 = b.charCodeAt(c + 2), d += String.fromCharCode((a & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3);
        return d
    }
};

//jquery.maskedinput-1.2.2.min.js
(function (c) {
    var a = (c.browser.msie ? "paste" : "input") + ".mask";
    var b = (window.orientation != undefined);
    c.mask = {definitions: {"9": "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]"}};
    c.fn.extend({
        caret: function (f, d) {
            if (this.length == 0) {
                return
            }
            if (typeof f == "number") {
                d = (typeof d == "number") ? d : f;
                return this.each(function () {
                    if (this.setSelectionRange) {
                        this.focus();
                        this.setSelectionRange(f, d)
                    } else {
                        if (this.createTextRange) {
                            var g = this.createTextRange();
                            g.collapse(true);
                            g.moveEnd("character", d);
                            g.moveStart("character", f);
                            g.select()
                        }
                    }
                })
            } else {
                if (this[0].setSelectionRange) {
                    f = this[0].selectionStart;
                    d = this[0].selectionEnd
                } else {
                    if (document.selection && document.selection.createRange) {
                        var e = document.selection.createRange();
                        f = 0 - e.duplicate().moveStart("character", -100000);
                        d = f + e.text.length
                    }
                }
                return {begin: f, end: d}
            }
        }, unmask: function () {
            return this.trigger("unmask")
        }, mask: function (f, j) {
            if (!f && this.length > 0) {
                var g = c(this[0]);
                var i = g.data("tests");
                return c.map(g.data("buffer"), function (m, l) {
                    return i[l] ? m : null
                }).join("")
            }
            j = c.extend({placeholder: "_", completed: null}, j);
            var e = c.mask.definitions;
            var i = [];
            var k = f.length;
            var h = null;
            var d = f.length;
            c.each(f.split(""), function (l, m) {
                if (m == "?") {
                    d--;
                    k = l
                } else {
                    if (e[m]) {
                        i.push(new RegExp(e[m]));
                        if (h == null) {
                            h = i.length - 1
                        }
                    } else {
                        i.push(null)
                    }
                }
            });
            return this.each(function () {
                var u = c(this);
                var p = c.map(f.split(""), function (y, x) {
                    if (y != "?") {
                        return e[y] ? j.placeholder : y
                    }
                });
                var s = false;
                var w = u.val();
                u.data("buffer", p).data("tests", i);
                function t(x) {
                    while (++x <= d && !i[x]) {
                    }
                    return x
                }

                function o(z) {
                    while (!i[z] && --z >= 0) {
                    }
                    for (var y = z; y < d; y++) {
                        if (i[y]) {
                            p[y] = j.placeholder;
                            var x = t(y);
                            if (x < d && i[y].test(p[x])) {
                                p[y] = p[x]
                            } else {
                                break
                            }
                        }
                    }
                    r();
                    u.caret(Math.max(h, z))
                }

                function l(B) {
                    for (var z = B, A = j.placeholder; z < d; z++) {
                        if (i[z]) {
                            var x = t(z);
                            var y = p[z];
                            p[z] = A;
                            if (x < d && i[x].test(y)) {
                                A = y
                            } else {
                                break
                            }
                        }
                    }
                }

                function q(y) {
                    var z = c(this).caret();
                    var x = y.keyCode;
                    s = (x < 16 || (x > 16 && x < 32) || (x > 32 && x < 41));
                    if ((z.begin - z.end) != 0 && (!s || x == 8 || x == 46)) {
                        m(z.begin, z.end)
                    }
                    if (x == 8 || x == 46 || (b && x == 127)) {
                        o(z.begin + (x == 46 ? 0 : -1));
                        return false
                    } else {
                        if (x == 27) {
                            u.val(w);
                            u.caret(0, n());
                            return false
                        }
                    }
                }

                function v(A) {
                    if (s) {
                        s = false;
                        return (A.keyCode == 8) ? false : null
                    }
                    A = A || window.event;
                    var x = A.charCode || A.keyCode || A.which;
                    var C = c(this).caret();
                    if (A.ctrlKey || A.altKey || A.metaKey) {
                        return true
                    } else {
                        if ((x >= 32 && x <= 125) || x > 186) {
                            var z = t(C.begin - 1);
                            if (z < d) {
                                var B = String.fromCharCode(x);
                                if (i[z].test(B)) {
                                    l(z);
                                    p[z] = B;
                                    r();
                                    var y = t(z);
                                    c(this).caret(y);
                                    if (j.completed && y == d) {
                                        j.completed.call(u)
                                    }
                                }
                            }
                        }
                    }
                    return false
                }

                function m(z, x) {
                    for (var y = z; y < x && y < d; y++) {
                        if (i[y]) {
                            p[y] = j.placeholder
                        }
                    }
                }

                function r() {
                    return u.val(p.join("")).val()
                }

                function n(y) {
                    var C = u.val();
                    var B = -1;
                    for (var x = 0, A = 0; x < d; x++) {
                        if (i[x]) {
                            p[x] = j.placeholder;
                            while (A++ < C.length) {
                                var z = C.charAt(A - 1);
                                if (i[x].test(z)) {
                                    p[x] = z;
                                    B = x;
                                    break
                                }
                            }
                            if (A > C.length) {
                                break
                            }
                        } else {
                            if (p[x] == C[A] && x != k) {
                                A++;
                                B = x
                            }
                        }
                    }
                    if (!y && B + 1 < k) {
                        u.val("");
                        m(0, d)
                    } else {
                        if (y || B + 1 >= k) {
                            r();
                            if (!y) {
                                u.val(u.val().substring(0, B + 1))
                            }
                        }
                    }
                    return (k ? x : h)
                }

                if (!u.attr("readonly")) {
                    u.one("unmask", function () {
                        u.unbind(".mask").removeData("buffer").removeData("tests")
                    }).bind("focus.mask", function () {
                        w = u.val();
                        var x = n();
                        r();
                        setTimeout(function () {
                            if (x == f.length) {
                                u.caret(0, x)
                            } else {
                                u.caret(x)
                            }
                        }, 0)
                    }).bind("blur.mask", function () {
                        n();
                        if (u.val() != w) {
                            u.change()
                        }
                    }).bind("keydown.mask", q).bind("keypress.mask", v).bind(a, function () {
                        setTimeout(function () {
                            u.caret(n(true))
                        }, 0)
                    })
                }
                n()
            })
        }
    })
})(jQuery);


//jquery.bgiframe.min.js
var bgiframeController = function (a, b) {
    var d = $(a), c = a.parentNode;
    this.resize = function () {
        var a = {};
        a.top = parseInt(b.top == "auto" ? (parseInt(c.currentStyle.borderTopWidth) || 0) * -1 : b.top);
        a.left = parseInt(b.left == "auto" ? (parseInt(c.currentStyle.borderLeftWidth) || 0) * -1 : b.left);
        a.width = parseInt(b.width == "auto" ? c.offsetWidth : b.width);
        a.height = parseInt(b.height == "auto" ? c.offsetHeight : b.height);
        d.offset(a);
        d.width(a.width);
        d.height(a.height)
    };
    a.parentNode.onresize = this.resize;
    this.resize()
};
(function (a) {
    a.fn.bgiframe = a.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function (b) {
        var b = a.extend({
            top: "auto",
            left: "auto",
            width: "auto",
            height: "auto",
            opacity: !0,
            src: "javascript:document.write('');"
        }, b), d = '<iframe class="bgiframe" frameborder="0" tabindex="-1" src="' + b.src + '"style="display:block;position:absolute;z-index:-1;' + (b.opacity !== !1 ? "filter:Alpha(Opacity='0');" : "") + '" />';
        return this.each(function () {
            if (a(this).children("iframe.bgiframe").length === 0) {
                var c = document.createElement(d);
                this.insertBefore(c,
                    this.firstChild);
                new bgiframeController(c, b)
            }
        })
    } : function () {
        return this
    };
    a.fn.bgIframe = a.fn.bgiframe
})(jQuery);

//json2.min.js
this.JSON || (JSON = {});
(function () {
    function k(b) {
        return b < 10 ? "0" + b : b
    }

    function o(b) {
        p.lastIndex = 0;
        return p.test(b) ? '"' + b.replace(p, function (b) {
            var c = r[b];
            return typeof c === "string" ? c : "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + b + '"'
    }

    function l(b, i) {
        var c, d, h, m, g = e, f, a = i[b];
        a && typeof a === "object" && typeof a.toJSON === "function" && (a = a.toJSON(b));
        typeof j === "function" && (a = j.call(i, b, a));
        switch (typeof a) {
            case "string":
                return o(a);
            case "number":
                return isFinite(a) ? String(a) : "null";
            case "boolean":
            case "null":
                return String(a);
            case "object":
                if (!a)return "null";
                e += n;
                f = [];
                if (Object.prototype.toString.apply(a) === "[object Array]") {
                    m = a.length;
                    for (c = 0; c < m; c += 1)f[c] = l(c, a) || "null";
                    h = f.length === 0 ? "[]" : e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]";
                    e = g;
                    return h
                }
                if (j && typeof j === "object") {
                    m = j.length;
                    for (c = 0; c < m; c += 1)d = j[c], typeof d === "string" && (h = l(d, a)) && f.push(o(d) + (e ? ": " : ":") + h)
                } else for (d in a)Object.hasOwnProperty.call(a, d) && (h = l(d, a)) && f.push(o(d) + (e ? ": " : ":") + h);
                h = f.length === 0 ? "{}" : e ? "{\n" + e + f.join(",\n" + e) + "\n" + g + "}" : "{" + f.join(",") + "}";
                e = g;
                return h
        }
    }

    if (typeof Date.prototype.toJSON !== "function")Date.prototype.toJSON = function () {
        return this.getUTCFullYear() + "-" + k(this.getUTCMonth() + 1) + "-" + k(this.getUTCDate()) + "T" + k(this.getUTCHours()) + ":" + k(this.getUTCMinutes()) + ":" + k(this.getUTCSeconds()) + "Z"
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    };
    var q = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        e, n, r = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, j;
    if (typeof JSON.stringify !== "function")JSON.stringify = function (b, i, c) {
        var d;
        n = e = "";
        if (typeof c === "number")for (d = 0; d < c; d += 1)n += " "; else typeof c === "string" && (n = c);
        if ((j = i) && typeof i !== "function" && (typeof i !== "object" || typeof i.length !== "number"))throw Error("JSON.stringify");
        return l("", {"": b})
    };
    if (typeof JSON.parse !== "function")JSON.parse = function (b, e) {
        function c(b, d) {
            var g, f, a = b[d];
            if (a && typeof a === "object")for (g in a)Object.hasOwnProperty.call(a,
                g) && (f = c(a, g), f !== void 0 ? a[g] = f : delete a[g]);
            return e.call(b, d, a)
        }

        var d;
        q.lastIndex = 0;
        q.test(b) && (b = b.replace(q, function (b) {
            return "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return d = eval("(" + b + ")"), typeof e === "function" ? c({"": d}, "") : d;
        throw new SyntaxError("JSON.parse");
    }
})();
