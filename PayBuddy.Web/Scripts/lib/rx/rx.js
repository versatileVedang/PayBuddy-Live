/*
* @version RxJS v5.1.17
*/
function rxLanguageProvider() {
    function n(n, t) {
        for (var r = {}, i = 0; i < n.length; i++) r[n[i][t.propertyColumnName]] = n[i][t.contentColumnName];
        return r
    }

    function t(n) {
        var t = n.replace("@", "");
        return rx.language.pageProperties[t] != undefined ? n = rx.language.pageProperties[t] : rx.language.globalProperties[t] != undefined && (n = rx.language.globalProperties[t]), n
    }
    return {
        toObject: n,
        getPropertyValue: t,
        pageProperties: {},
        globalProperties: {}
    }
}

function rxLogProvider() {
    function t(n) {
        return n instanceof Error && (n.stack ? n = n.message && n.stack.indexOf(n.message) === -1 ? "Error: " + n.message + "\n" + n.stack : n.stack : n.sourceURL && (n = n.message + "\n" + n.sourceURL + ":" + n.line)), n
    }

    function n(n) {
        var i = window.console || {},
            r = i[n] || i.log || noop;
        return r.apply ? function () {
            for (var u = [], n = 0; n < arguments.length; n++) u.push(t(arguments[n]));
            return r.apply(i, u)
        } : function (n, t) {
            r(n, t == null ? "" : t)
        }
    }
    var i = !0,
        r = this;
    return {
        log: n("log"),
        info: n("info"),
        warn: n("warn"),
        error: n("error"),
        debug: function () {
            var t = n("debug");
            return function () {
                i && t.apply(r, arguments)
            }
        }()
    }
}

function toArray(n) {
    return angular.isArray(n) ? n : Object.keys(n).map(function (t) {
        return n[t]
    })
}
var numberChanger, base64, radix, rxLinqQuery;
typeof String.prototype.startsWith != "function" && (String.prototype.startsWith = function (n) {
    return this.indexOf(n) === 0
});
numberChanger = 1;
base64 = {};
base64.PADCHAR = "=";
base64.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
base64.makeDOMException = function () {
    var n;
    try {
        return new DOMException(DOMException.INVALID_CHARACTER_ERR)
    } catch (t) {
        return n = new Error("DOM Exception 5"), n.code = n.number = 5, n.name = n.description = "INVALID_CHARACTER_ERR", n.toString = function () {
            return "Error: " + n.name + ": " + n.message
        }, n
    }
};
base64.getbyte64 = function (n, t) {
    var i = base64.ALPHA.indexOf(n.charAt(t));
    if (i === -1) throw base64.makeDOMException();
    return i
};
base64.decode = function (n) {
    var i, e, t, r, u, f;
    if (n = "" + n, i = base64.getbyte64, u = n.length, u === 0) return n;
    if (u % 4 != 0) throw base64.makeDOMException();
    for (e = 0, n.charAt(u - 1) === base64.PADCHAR && (e = 1, n.charAt(u - 2) === base64.PADCHAR && (e = 2), u -= 4), f = [], t = 0; t < u; t += 4) r = i(n, t) << 18 | i(n, t + 1) << 12 | i(n, t + 2) << 6 | i(n, t + 3), f.push(String.fromCharCode(r >> 16, r >> 8 & 255, r & 255));
    switch (e) {
        case 1:
            r = i(n, t) << 18 | i(n, t + 1) << 12 | i(n, t + 2) << 6;
            f.push(String.fromCharCode(r >> 16, r >> 8 & 255));
            break;
        case 2:
            r = i(n, t) << 18 | i(n, t + 1) << 12;
            f.push(String.fromCharCode(r >> 16))
    }
    return f.join("")
};
base64.getbyte = function (n, t) {
    var i = n.charCodeAt(t);
    if (i > 255) throw base64.makeDOMException();
    return i
};
base64.encode = function (n) {
    var e;
    if (arguments.length !== 1) throw new SyntaxError("Not enough arguments");
    var o = base64.PADCHAR,
        i = base64.ALPHA,
        f = base64.getbyte,
        r, t, u = [];
    if (n = "" + n, e = n.length - n.length % 3, n.length === 0) return n;
    for (r = 0; r < e; r += 3) t = f(n, r) << 16 | f(n, r + 1) << 8 | f(n, r + 2), u.push(i.charAt(t >> 18)), u.push(i.charAt(t >> 12 & 63)), u.push(i.charAt(t >> 6 & 63)), u.push(i.charAt(t & 63));
    switch (n.length - e) {
        case 1:
            t = f(n, r) << 16;
            u.push(i.charAt(t >> 18) + i.charAt(t >> 12 & 63) + o + o);
            break;
        case 2:
            t = f(n, r) << 16 | f(n, r + 1) << 8;
            u.push(i.charAt(t >> 18) + i.charAt(t >> 12 & 63) + i.charAt(t >> 6 & 63) + o)
    }
    return u.join("")
};
radix = angular.module("rx", ["ng", "ngCookies", "ngRoute"]);
radix.directive("rxAdvancetab", function () {
    return {
        restrict: "A",
        scope: {
            advancetabObj: "=",
            activeTab: "=",
            cssConfig: "=",
            rxTabevent: "=",
            changedData: "="
        },
        controller: ["$scope", "$element", function (n) {
            var i = n.panes = [],
                t = 0,
                r;
            n.rxtemptabs = {};
            angular.forEach(n.advancetabObj, function (i) {
                angular.isUndefined(i.icon) ? i.icon = "" : i.title = " " + i.title + " ";
                t == n.activeTab ? (i.selected = !0, n.rxtemptabs = i) : i.selected = !1;
                i.index = t;
                angular.isUndefined(i.iconTitle) && (i.iconTitle = "");
                n.panes.push(i);
                t++
            });
            n.select = function (t) {
                if (angular.forEach(i, function (n) {
                    n.selected = !1
                }), t.selected = !0, n.rxtemptabs = t, !angular.isUndefined(n.rxTabevent)) {
                    var r = n.attrs.rxTabevent + "(" + t.index + ")";
                    n.$parent.$eval(r)
                }
            };
            this.addcls = function (t, i) {
                n.clsname = t;
                n.attrs = i
            };
            r = 0;
            this.activetabchanged = function (t) {
                n.panes[t].selected = !0;
                n.rxtemptabs = n.panes[t]
            };
            this.dataChanged = function () {
                i = n.panes = [];
                angular.forEach(n.advancetabObj, function (i) {
                    angular.isUndefined(i.icon) ? i.icon = "" : i.title = " " + i.title + " ";
                    t == n.activeTab ? (i.selected = !0, n.rxtemptabs = i) : i.selected = !1;
                    i.index = t;
                    angular.isUndefined(i.iconTitle) && (i.iconTitle = "");
                    n.panes.push(i);
                    t++
                })
            }
        }],
        link: function (n, t, i, r) {
            function u(n) {
                angular.isUndefined(n) || r.activetabchanged(n)
            }
            switch (i.rxAdvancetab) {
                case "left":
                    t.addClass("tabs-left");
                    r.addcls("nav-tabs", i);
                    n.positionClass = "tabs-left";
                    break;
                case "right":
                    t.addClass("tabs-right");
                    r.addcls("nav-tabs", i);
                    n.positionClass = "tabs-right";
                    break;
                case "stacked":
                    r.addcls("nav-tabs nav-stacked", i);
                    n.positionClass = "nav-stacked";
                    break;
                case "pils":
                    r.addcls("nav-pills", i);
                    n.positionClass = "nav-pills";
                    break;
                case "stackedpils":
                    r.addcls("nav-pills nav-stacked", i);
                    n.positionClass = "nav-pills nav-stacked";
                    break;
                case "top":
                    r.addcls("nav-tabs", i)
            }
            n.$watch("activeTab", u, !0);
            n.$watch("changedData", function (n) {
                angular.isUndefined(n) || n && r.dataChanged()
            }, !0)
        },
        template: '<div class="tabbable {{cssConfig.headerclass}} {{positionClass}}" ><ul class="nav {{clsname}}"><li ng-repeat="pane in panes" ng-class="{active:pane.selected}"><a href="" ng-click="select(pane)"><i class="{{pane.icon}}" title="{{pane.iconTitle}}"><\/i>{{pane.title}}<\/a><\/li><\/ul><div class="{{cssConfig.contentclass}}"><div class="tab-content"><div class="tab-pane active"><div ng-include src="rxtemptabs.url"><\/div><\/div><\/div><\/div><\/div>',
        replace: !0
    }
});
radix.directive("rxRequired", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (n, t, i, r) {
            function f() {
                angular.isUndefined(i.rxRequiredMessage) ? angular.isUndefined(i.rxMessageScope) || $(t).tooltip("destroy") : $(t).tooltip("destroy");
                e = !0;
                $(t).removeClass("rx-error");
                $(t).addClass("rx-valid")
            }

            function u() {
                e && (angular.isUndefined(i.rxRequiredMessage) ? angular.isUndefined(i.rxMessageScope) || ($(t).tooltip({
                    title: s,
                    html: !0,
                    trigger: "focus",
                    placement: i.rxRequiredPosition,
                    delay: {
                        show: 200,
                        hide: 0
                    }
                }), $(t).tooltip("show")) : ($(t).tooltip({
                    title: i.rxRequiredMessage,
                    html: !0,
                    trigger: "focus",
                    placement: i.rxRequiredPosition,
                    delay: {
                        show: 200,
                        hide: 0
                    }
                }), $(t).tooltip("show")));
                e = !1;
                $(t).addClass("rx-error");
                $(t).removeClass("rx-valid")
            }
            var o = i.ngModel,
                c = i.rxRequiredMessage,
                s = "",
                e;
            if (angular.isUndefined(i.rxRequiredMessage) || ($(t).tooltip("destroy"), $(t).tooltip({
                title: i.rxRequiredMessage,
                html: !0,
                trigger: "focus",
                placement: angular.isUndefined(i.rxRequiredPosition) ? "right" : i.rxRequiredPosition,
                delay: {
                    show: 200,
                    hide: 0
                }
            })), e = !1, angular.isUndefined(i.rxCustomValidation) ? (r.$setValidity(i.ngModel, !1), $(t).addClass("rx-error")) : (n.$watch(i.rxCustomValidation, function (n) {
                angular.isUndefined(n) || (n ? ($(t).addClass("rx-error"), $(t).removeClass("rx-valid"), r.$setValidity(i.ngModel, !1)) : ($(t).removeClass("rx-error"), $(t).addClass("rx-valid"), r.$setValidity(i.ngModel, !0)))
            }), n.$watch(o, function (n) {
                angular.isUndefined(n) || (n != "" ? ($(t).removeClass("rx-error"), $(t).addClass("rx-valid"), r.$setValidity(i.ngModel, !0)) : ($(t).addClass("rx-error"), $(t).removeClass("rx-valid"), r.$setValidity(i.ngModel, !1)))
            }, !0)), angular.isUndefined(i.rxCustomValidation) && n.$watch(o, function (n) {
                var s, o, e, h, t;
                if (angular.isUndefined(n)) {
                    if (i.type == "email" || angular.isUndefined(i.type)) return u(), r.$setValidity(i.ngModel, !1), undefined
                } else if (angular.isUndefined(i.type)) {
                    if (i.$$element[0].localName == "select" || i.$$element[0].localName == "textarea") return n != "" && n != null ? (f(), r.$setValidity(i.ngModel, !0), n) : (u(), r.$setValidity(i.ngModel, !1), undefined)
                } else {
                    s = i.type;
                    switch (s) {
                        case "number":
                            return n != null ? (o = n.toString(), e = !0, angular.isUndefined(i.minDigit) || (e = i.minDigit > o.length ? !1 : !0), e ? (angular.isUndefined(i.maxDigit) || (e = i.maxDigit < o.length ? !1 : !0), e ? (f(), r.$setValidity(i.ngModel, !0), n) : (u(), r.$setValidity(i.ngModel, !1), undefined)) : (u(), r.$setValidity(i.ngModel, !1), undefined)) : (u(), r.$setValidity(i.ngModel, !1), undefined);
                        case "text":
                            return n != null && String(n) != "" ? (t = angular.isUndefined(i.rxRequiredPattern) ? "" : i.rxRequiredPattern, t == "") ? (f(), r.$setValidity(i.ngModel, !0), n) : (h = new RegExp(i.rxRequiredPattern, "g"), h.test(n) ? (f(), r.$setValidity(i.ngModel, !0), n) : (u(), r.$setValidity(i.ngModel, !1), undefined)) : (u(), r.$setValidity(i.ngModel, !1), undefined);
                        case "email":
                            return n != "" && n != null ? (t = angular.isUndefined(i.rxRequiredPattern) ? /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])/ : new RegExp(i.rxRequiredPattern, "g"), t.test(n) ? (f(), r.$setValidity(i.ngModel, !0), n) : (u(), r.$setValidity(i.ngModel, !1), undefined)) : (u(), r.$setValidity(i.ngModel, !1), undefined);
                        case "password":
                            return n != "" && n != null ? (t = angular.isUndefined(i.rxRequiredPattern) ? "" : new RegExp(i.rxRequiredPattern, "g"), t == "") ? (f(), r.$setValidity(i.ngModel, !0), n) : t.test(n) ? (f(), r.$setValidity(i.ngModel, !0), n) : (u(), r.$setValidity(i.ngModel, !1), undefined) : (u(), r.$setValidity(i.ngModel, !1), undefined);
                        case "checkbox":
                            return f(), r.$setValidity(i.ngModel, !0), n
                    }
                }
            }, !0), !angular.isUndefined(i.rxValidate)) {
                function h(n) {
                    angular.isUndefined(n) || (n ? (f(), r.$setValidity(i.ngModel, !0)) : (u(), r.$setValidity(i.ngModel, !0)))
                }
                n.$watch(i.rxValidate, h, !0)
            }
            angular.isUndefined(i.rxMessageScope) || n.$watch(i.rxMessageScope, function (n) {
                angular.isUndefined(n) || (s = n, $(t).tooltip("destroy"), $(t).tooltip({
                    title: n,
                    html: !0,
                    trigger: "focus",
                    placement: angular.isUndefined(i.rxRequiredPosition) ? "right" : i.rxRequiredPosition,
                    delay: {
                        show: 200,
                        hide: 0
                    }
                }))
            }, !0)
        }
    }
});
radix.directive("rxTags", ["$compile", "rxJson", "appConfig", function (n, t, i) {
    return {
        restrict: "A",
        replace: !0,
        scope: {
            rxSelected: "=",
            rxSource: "=",
            rxModel: "=",
            rxTextModel: "=",
            tagRequiredmessage: "=",
            focusSource: "=",
            rxTagrequiredCondition: "="
        },
        link: function (n, r, u) {
            function h(n) {
                r[0].value = r[0].value.indexOf(f) != -1 ? r[0].value.replace(f + n, "") : r[0].value.replace(n, "")
            }
            var f, e, o, s;
            $.fn.select2.defaults.separator = "c2VwYXJhdG";
            angular.isUndefined(u.noRecordsText) || ($.fn.select2.defaults.formatNoMatches = function () {
                return n.$parent[u.noRecordsText] == undefined ? "No Matches Found" : n.$parent[u.noRecordsText]
            });
            f = "c2VwYXJhdG";
            n.validCheck = function (n) {
                if (s != "") {
                    $(n).tooltip("destroy");
                    var t = setTimeout(function () {
                        $(n).tooltip({
                            title: s,
                            html: !0,
                            trigger: "hover",
                            placement: "bottom",
                            delay: {
                                show: 200,
                                hide: 0
                            }
                        })
                    }, 200)
                }
            };
            e = [];
            n.runEvent = !1;
            n.getText = function (i, r) {
                var s = i.split(","),
                    o, f, h;
                if (s.length > 1)
                    for (e = [], o = 0; o < s.length; o++) s[o] != "" && (f = {}, angular.isUndefined(u.rxInit) || (s[o] = parseInt(s[o])), f[u.rxValue] = s[o], h = t.find(n.rxSource, f)[0], e.push(h));
                else f = {}, angular.isUndefined(u.rxInit) ? f[u.rxValue] = angular.isUndefined(u.rxTagDynamic) ? n.isSelectedJson ? n.rxSelected.toLowerCase() : angular.isUndefined(u.rxInit) ? parseInt(n.rxModel) : parseInt(n.rxModel) : n.rxModel : angular.isUndefined(u.rxTagDynamic) ? r == undefined ? n.rxSelected != undefined && n.rxSelected != "" && (f[u.rxValue] = parseInt(n.rxSelected)) : f[u.rxValue] = parseInt(n.rxModel) : f[u.rxValue] = parseInt(n.rxModel), f != undefined && (h = t.find(n.rxSource, f)[0], e.push(h));
                return angular.isUndefined(u.rxTagrequired) || n.requiredClass(), e
            };
            n.addNewItem = function (i) {
                var e = {},
                    o, s;
                e[u.rxText] = i;
                o = t.find(n.rxSource, e)[0];
                o == undefined && (n.$parent.newItemText = i, s = n.$parent.$eval(u.manualEnterEvent + "(newItemText)"), s ? (r[0].value = r[0].value + f + i, n.rxSource.push(e)) : h(i))
            };
            n.isSelectedJson = !0;
            o = 0;
            n.setRxModel = function (s, h) {
                var k, l, p, a, c, y, v, w, b;
                for (n.rxModel = "", angular.isUndefined(u.rxTextModel) || (n.rxTextModel = ""), k = s.length - 1, l = 0; l < s.length; l++)
                    if (p = {}, p[u.rxText] = s[l], a = t.find(n.rxSource, p)[0], l != 1 || angular.isUndefined(u.singleSelect))
                        if (angular.isUndefined(u.singleSelect) && !angular.isUndefined(u.manualEnter)) angular.isUndefined(a) || a[u.rxValue] == undefined || a[u.rxValue] == "" ? (n.addNewItem(s[l]), $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText)
                        })) : (n.setRxModelValue(a, s[l]), e = [], n.isSelectedJson = !1, $(r).select2("destroy"), c = t.convertToArrary(n.getText(n.rxModel, !0), u.rxText), r[0].value = c != null && c.length > 0 ? r[0].value + f + c[0] : r[0].value, $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText)
                        }));
                        else {
                            if (a == undefined && angular.isUndefined(u.singleSelect)) {
                                n.setRxModelValue(a, s[l]);
                                $(r).select2("destroy");
                                n.rxModel != "" ? (c = t.convertToArrary(n.getText(n.rxModel, !0), u.rxText), r[0].value = c != null && c.length > 0 ? c.join(f) : "") : r[0].value = "";
                                b = setTimeout(function () {
                                    $(r).select2({
                                        tags: t.convertToArrary(n.rxSource, u.rxText)
                                    })
                                }, 100);
                                return
                            }
                            n.setRxModelValue(a, s[l])
                        } else {
                        angular.isUndefined(a) ? (r[0].value = [s[l]], $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText)
                        })) : (n.rxModel = String(a[u.rxValue]), e = [], n.isSelectedJson = !1, $(r).select2("destroy"), c = t.convertToArrary(n.getText(n.rxModel, !0), u.rxText), r[0].value = c != null && c.length > 0 ? c.join(f) : "", $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText)
                        }));
                        break
                    }
                if (angular.isUndefined(u.rxTagrequired) || n.requiredClass(), !angular.isUndefined(u.manualEnter)) {
                    if (y = n.rxSource.getSelectedValues(), y != undefined && y.length > 0)
                        for (v = n.rxSource.length - 1; v >= 0; v--) w = n.rxSource[v], w[u.rxValue] == undefined && y.indexOf(w[u.rxText]) == -1 && n.rxSource.splice(v, 1);
                    b = setTimeout(function () {
                        $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText)
                        });
                        !angular.isUndefined(h) && h && $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "") + " .select2-input").focus()
                    }, 100)
                }
                n.$apply();
                (o == 0 || s.length > o) && (angular.isUndefined(u.rxTagselect) || n.$parent.$eval(u.rxTagselect));
                o = s.length;
                n.runEvent && (n.runEvent = !1, angular.isUndefined(u.rxTagevent) || n.$parent.$eval(u.rxTagevent));
                angular.isUndefined(u.generalSetting) || i.generalSettings.standartDescriptionMandatory && n.requiredClass()
            };
            n.setRxModelValue = function (t, i) {
                angular.isUndefined(t) ? (n.rxTextModel = n.rxTextModel == undefined ? "" : n.rxTextModel, n.rxTextModel += i) : n.rxModel += n.rxModel != null && n.rxModel.length > 0 ? "," + t[u.rxValue] : t[u.rxValue]
            };
            n.isRequiredTag = !0;
            n.requiredClass = function () {
                if (n.isRequiredTag)
                    if (n.rxModel != "" && n.rxModel != undefined) n.validRxModel = !0, $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")).removeClass("rx-error").addClass("rx-valid"), $($("." + u.rxModel.replace("[", "").replace("]", "").replace(".", ""))).tooltip("destroy");
                    else if (angular.isUndefined(u.manualEnter)) angular.isUndefined(u.singleSelect) ? (n.validRxModel = !1, $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")).removeClass("rx-valid").addClass("rx-error"), n.validCheck($("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")))) : n.rxTextModel != "" && n.rxTextModel != undefined ? (n.validRxModel = !0, $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")).removeClass("rx-error").addClass("rx-valid"), $($("." + u.rxModel.replace("[", "").replace("]", "").replace(".", ""))).tooltip("destroy")) : (n.validRxModel = !1, $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")).removeClass("rx-valid").addClass("rx-error"), n.validCheck($("." + u.rxModel.replace("[", "").replace("]", "").replace(".", ""))));
                    else {
                        var t = r[0].value;
                        t != null && t != "" ? (n.validRxModel = !0, $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")).removeClass("rx-error").addClass("rx-valid"), $($("." + u.rxModel.replace("[", "").replace("]", "").replace(".", ""))).tooltip("destroy")) : (n.validRxModel = !1, $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")).removeClass("rx-valid").addClass("rx-error"), n.validCheck($("." + u.rxModel.replace("[", "").replace("]", "").replace(".", ""))))
                    } else $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")).removeClass("rx-error").addClass("rx-valid"), $($("." + u.rxModel.replace("[", "").replace("]", "").replace(".", ""))).tooltip("destroy")
            };
            n.setTagFunctions = function () {
                n.rxSource.isTagValid = function () {
                    return n.validRxModel
                };
                n.rxSource.setTabIndex = function (n) {
                    var t = $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")),
                        i = $(t).find(".select2-input");
                    $(i).prop("tabindex", n)
                };
                n.rxSource.resetTagSource = function (i, o) {
                    e = [];
                    $(r).select2("destroy");
                    n.rxSource = i;
                    n.setTagFunctions();
                    var s = setTimeout(function () {
                        if (!angular.isUndefined(o)) {
                            n.rxModel = o;
                            var i = t.convertToArrary(n.getText(n.rxModel), u.rxText);
                            r[0].value = i != null && i.length > 0 ? i.join(f) : ""
                        }
                        $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText)
                        }).on("load", function () {
                            u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                        }).trigger("load");
                        n.$apply()
                    }, 200)
                };
                n.rxSource.selectItem = function (i) {
                    var s, o;
                    e = [];
                    s = t.convertToArrary(n.rxSource, u.rxText);
                    n.rxModel = i;
                    o = t.convertToArrary(n.getText(i), u.rxText);
                    r[0].value = o != null && o.length > 0 ? o.join(f) : "";
                    $(r).select2("destroy");
                    $(r).select2({
                        tags: s
                    }).on("load", function () {
                        u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                    }).trigger("load")
                };
                n.rxSource.selectAll = function () {
                    var i, s, o;
                    for (e = [], i = t.convertToArrary(n.rxSource, u.rxText), s = t.convertToArrary(n.rxSource, u.rxValue), n.rxModel = "", o = 0; o < s.length; o++) n.rxModel += s[o] + ",";
                    r[0].value = i != null && i.length > 0 ? i.join(f) : "";
                    $(r).select2("destroy");
                    $(r).select2({
                        tags: i
                    }).on("load", function () {
                        u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                    }).trigger("load")
                };
                n.rxSource.deSelectAll = function () {
                    e = [];
                    var i = t.convertToArrary(n.rxSource, u.rxText);
                    r[0].value = [];
                    $(r).select2("destroy");
                    $(r).select2({
                        tags: i
                    }).on("load", function () {
                        u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                    }).trigger("load")
                };
                n.rxSource.resetTag = function () {
                    e = [];
                    $(r).select2("val", "");
                    n.rxModel = ""
                };
                n.rxSource.setRequiredTag = function (t) {
                    n.isRequiredTag = t;
                    n.requiredClass()
                };
                n.rxSource.getSelectedValues = function () {
                    return r[0].value != null && r[0].value != "" ? r[0].value.split("c2VwYXJhdG") : ""
                };
                n.rxSource.getManualValues = function () {
                    var r = n.rxSource.getSelectedValues(),
                        f = [],
                        t, i;
                    if (r != undefined && r.length > 0)
                        for (t = n.rxSource.length - 1; t >= 0; t--) i = n.rxSource[t], i[u.rxValue] == undefined && f.push(i[u.rxText]);
                    return f
                }
            };
            n.firstTime = !1;
            s = "";
            u.tagRequiredmessage != undefined && n.$watch("tagRequiredmessage", function (n) {
                n != undefined && (s = n)
            }, !0);
            u.rxTagrequiredCondition != undefined && n.$watch("rxTagrequiredCondition", function (t) {
                n.isRequiredTag = !1;
                t != undefined && t == !0 && (n.isRequiredTag = !0);
                var i = setTimeout(function () {
                    n.requiredClass()
                }, 200)
            });
            n.$watch("focusSource", function (n) {
                if (!angular.isUndefined(n) && n) var t = setTimeout(function () {
                    $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "") + " .select2-input").focus()
                }, 1e3)
            }, !0);
            n.$watch("rxSource", function (e) {
                if (!n.firstTime && !angular.isUndefined(e) && ($(r).select2("destroy"), $(r).addClass(u.rxModel.replace("[", "").replace("]", "").replace(".", "")), angular.isUndefined(u.rxTagrequired) || ($(r).addClass(u.rxModel.replace("[", "").replace("]", "").replace(".", "")), $("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")).addClass("rx-error"), n.validCheck($("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")))), angular.isUndefined(u.rxSelected))) {
                    if (n.firstTime = !0, n.setTagFunctions(), $(r).addClass(u.rxModel.replace("[", "").replace("]", "").replace(".", "")), angular.isUndefined(u.rxTagrequired) || ($(r).addClass(u.rxText), $("." + u.rxText).addClass("rx-error"), n.validCheck($("." + u.rxText))), angular.isUndefined(u.generalSetting) || i.generalSettings.standartDescriptionMandatory && n.requiredClass(), angular.isUndefined(u.rxTagDynamic)) angular.isUndefined(u.maxlength) ? $(r).select2({
                        tags: t.convertToArrary(n.rxSource, u.rxText)
                    }).on("load", function () {
                        u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                    }).trigger("load") : $(r).select2({
                        tags: t.convertToArrary(n.rxSource, u.rxText),
                        maximumInputLength: u.maxlength
                    }).on("load", function () {
                        u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                    }).trigger("load");
                    else if (n.rxModel != "" && n.rxModel != undefined) {
                        var o = t.convertToArrary(n.getText(n.rxModel), u.rxText);
                        r[0].value = o != null && o.length > 0 ? o.join(f) : "";
                        angular.isUndefined(u.maxlength) ? $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText)
                        }).on("load", function () {
                            u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                        }).trigger("load") : $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText),
                            maximumInputLength: u.maxlength
                        }).on("load", function () {
                            u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                        }).trigger("load")
                    } else angular.isUndefined(u.maxlength) ? $(r).select2({
                        tags: t.convertToArrary(n.rxSource, u.rxText)
                    }).on("load", function () {
                        u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                    }).trigger("load") : $(r).select2({
                        tags: t.convertToArrary(n.rxSource, u.rxText),
                        maximumInputLength: u.maxlength
                    }).on("load", function () {
                        u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                    }).trigger("load");
                    angular.isUndefined(u.rxTagrequired) || n.validCheck($("." + u.rxModel.replace("[", "").replace("]", "").replace(".", "")));
                    $(r).on("change", function (t) {
                        n.runEvent = !0;
                        n.setRxModel(t.val, !0);
                        n.$apply()
                    })
                }
            }, !0);
            n.$watch("rxSelected", function (e) {
                var o, h, s;
                if (!n.firstTime && !angular.isUndefined(e) && !angular.isUndefined(u.rxSource)) {
                    if (!angular.isUndefined(u.valueObject)) {
                        var c = u.keyObject,
                            l = u.valueObject,
                            a = String(n.$parent[c]).split(","),
                            v = String(n.$parent[l]).split(",");
                        for (o = 0; o < a.length; o++) h = {}, h[l] = v[o], h[c] = parseInt(a[o]), n.rxSource.push(h)
                    }
                    if (n.firstTime = !0, n.setTagFunctions(), $(r).select2("destroy"), n.rxSelected != "") $(r).addClass(u.rxModel.replace(".", "")), e != null && (angular.isUndefined(u.rxTagrequired) || ($(r).addClass(u.rxModel.replace(".", "")), $("." + u.rxModel.replace(".", "")).addClass("rx-error"), n.validCheck($("." + u.rxModel.replace(".", "")))), s = t.convertToArrary(n.getText(e), u.rxText), n.setRxModel(s), n.rxModel != "" && n.rxModel != undefined && (angular.isUndefined(u.generalSetting) || i.generalSettings.standartDescriptionMandatory && n.requiredClass()), r[0].value = s != null && s.length > 0 ? s.join(f) : ""), angular.isUndefined(u.maxlength) ? $(r).select2({
                        tags: t.convertToArrary(n.rxSource, u.rxText)
                    }) : $(r).select2({
                        tags: t.convertToArrary(n.rxSource, u.rxText),
                        maximumInputLength: u.maxlength
                    }).on("load", function () {
                        u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                    }).trigger("load"), $(r).on("change", function (t) {
                        n.runEvent = !0;
                        n.setRxModel(t.val, !0);
                        n.$apply()
                    }).on("load", function () {
                        u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                    }).trigger("load");
                    else {
                        angular.isUndefined(u.maxlength) ? $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText)
                        }).on("load", function () {
                            u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                        }).trigger("load") : $(r).select2({
                            tags: t.convertToArrary(n.rxSource, u.rxText),
                            maximumInputLength: u.maxlength
                        }).on("load", function () {
                            u.tabindex != undefined && $(this).prop("tabindex", u.tabindex)
                        }).trigger("load");
                        $(r).on("change", function (t) {
                            n.runEvent = !0;
                            n.setRxModel(t.val, !0);
                            n.$apply()
                        })
                    }
                }
            }, !0)
        },
        replace: !0
    }
}]);
radix.directive("rxCompare", function () {
    return {
        require: "ngModel",
        scope: {
            compareModel: "="
        },
        link: function (n, t, i, r) {
            function s(n) {
                if (!angular.isUndefined(n)) {
                    if (n == "") {
                        u = !0;
                        angular.isUndefined(i.validNull) ? (o(), r.$setValidity(i.ngModel, !1)) : (e(), r.$setValidity(i.ngModel, !0));
                        return
                    }
                    var t = n == f ? !0 : !1;
                    t ? (e(), r.$setValidity(i.ngModel, !0)) : f == "" ? (t = n == r.$viewValue ? !0 : !1, t ? (e(), r.$setValidity(i.ngModel, !0)) : (u = !0, o(), r.$setValidity(i.ngModel, !1))) : (u = !0, o(), r.$setValidity(i.ngModel, !1))
                }
            }

            function e() {
                angular.isUndefined(i.rxCompareMessage) || $(t).tooltip("destroy");
                u = !0;
                $(t).removeClass("rx-error");
                $(t).addClass("rx-valid")
            }

            function o() {
                u && (angular.isUndefined(i.rxCompareMessage) || ($(t).tooltip({
                    title: i.rxCompareMessage,
                    html: !0,
                    trigger: "focus",
                    placement: angular.isUndefined(i.rxComparePosition) ? "right" : i.rxComparePosition,
                    delay: {
                        show: 200,
                        hide: 0
                    }
                }), $(t).tooltip("show")));
                u = !1;
                $(t).addClass("rx-error");
                $(t).removeClass("rx-valid")
            }
            var f = "",
                u;
            angular.isUndefined(i.rxCompareMessage) || ($(t).tooltip("destroy"), $(t).tooltip({
                title: i.rxCompareMessage,
                html: !0,
                trigger: "focus",
                placement: angular.isUndefined(i.rxComparePosition) ? "right" : i.rxComparePosition,
                delay: {
                    show: 200,
                    hide: 0
                }
            }));
            $(t).addClass("rx-error");
            u = !1;
            r.$parsers.unshift(function (t) {
                var u = n.compareModel == t ? !0 : !1;
                return u ? (f = t, e(), r.$setValidity(i.ngModel, !0), t) : (f = t, o(), r.$setValidity(i.ngModel, !1), undefined)
            });
            r.$setValidity(i.ngModel, !1);
            n.$watch("compareModel", s, !0)
        }
    }
});
radix.directive("rxBlur", function () {
    return {
        require: "ngModel",
        link: function (n, t, i, r) {
            function u(n) {
                angular.isUndefined(n) || (n ? r.$setValidity(i.ngModel, !0) : ($(t).focus(), r.$setValidity(i.ngModel, !1)))
            }
            t.bind("blur", function () {
                n.$apply(i.rxBlur)
            });
            n.$watch(i.rxValidate, u, !0)
        }
    }
});
radix.directive("rxPlaceholder", function () {
    return {
        require: "ngModel",
        link: function (n, t, i) {
            function r(n) {
                angular.isUndefined(n) || $(t).attr("placeholder", n)
            }
            n.$watch(i.rxPlaceholder, r, !0)
        }
    }
});
radix.directive("rxColor", ["$parse", function (n) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (t, i, r) {
            var u = setTimeout(function () {
                $(i).ace_colorpicker()
            }, 500);
            u = setTimeout(function () {
                angular.isUndefined(r.rxColorRequired) || $(".btn-colorpicker").addClass("rx-error")
            }, 500);
            $(i).on("change", function () {
                angular.isUndefined(r.rxColorRequired) || $(".btn-colorpicker").removeClass("rx-error");
                var u = $(this).find("option:selected");
                $(i).val() != undefined || angular.isUndefined(r.rxColorRequired) || $(".btn-colorpicker").addClass("rx-error");
                parsed = n(r.ngModel);
                t.$apply(function () {
                    parsed.assign(t, $(u).val())
                })
            });
            t.$watch(r.ngModel, function (n) {
                n == undefined ? ($(i).next().find(".btn-colorpicker").css("background-color", "#FFFFFF"), $(i).next().find(".selected").removeClass("selected")) : ($(i).next().find(".btn-colorpicker").css("background-color", i.val().replace("? string:", "").replace(" ?", "")), $(i).next().find(".selected").removeClass("selected"), $(i).next().find("[data-color='" + n + "']").addClass("selected"))
            })
        }
    }
}]);
radix.directive("rxTrim", ["$parse", function (n) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (t, i, r) {
            function f(n) {
                var r, e, f;
                if (n.keyCode != 37 && n.keyCode != 39 && n.keyCode != 16 && n.keyCode != 36 && n.keyCode != 46) {
                    if (r = "", i[0].value != undefined) {
                        e = i[0].value.split("");
                        for (f in e) r += i[0].value.charAt(f) == " " ? "" : i[0].value.charAt(f)
                    }
                    t.$apply(function () {
                        i[0].value = r;
                        u.assign(t, r)
                    })
                }
            }
            var u = n(r.ngModel);
            $(i).keyup(function (n) {
                f(n)
            })
        }
    }
}]);
radix.directive("rxTime", ["$parse", function (n) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (t, i, r, u) {
            function o() {
                t.$apply(function () {
                    function h(n) {
                        return String(n).search(s) != -1
                    }
                    var s = /^\s*\d+\s*$/,
                        c = h(i[0].value.replace(":", "")),
                        n, o, u, e, r;
                    if (c) {
                        if (n = i[0].value.replace(":", ""), n.length == 2 && parseInt(n) > 23) {
                            i[0].value = 23;
                            f.assign(t, "23");
                            return
                        }
                        if (n.length == 4 && (o = i[0].value.split(":"), parseInt(o[1]) > 59)) {
                            i[0].value = i[0].value.replace(o[1], "59");
                            f.assign(t, i[0].value);
                            return
                        }
                        if (u = "", e = 0, n.length > 2)
                            for (r = 0; r < n.length; r++) {
                                if (u += e == 2 ? ":" + n.charAt(r) : n.charAt(r), e == 3) break;
                                e++
                            } else u = i[0].value.replace(":", "");
                        f.assign(t, u)
                    } else i[0].value = "", f.assign(t, "")
                })
            }
            var e, f;
            if (rx.appConfiguration != undefined && rx.appConfiguration.customControl != undefined && rx.appConfiguration.customControl.rxTime != undefined) {
                rx.appConfiguration.customControl.rxTime.link(t, i, r, u, n);
                return
            }
            e = !1;
            t.$watch(r.ngModel, function (n) {
                var o;
                if (!angular.isUndefined(n) && !e) {
                    e = !0;
                    var i = n,
                        r = 0,
                        u = "";
                    for (o in i) r < 5 && (u += i.charAt(o)), r++;
                    f.assign(t, u)
                }
            }, !0);
            f = n(r.ngModel);
            $(i).keydown(function () {
                o()
            });
            $(i).blur(function () {
                var e = i[0].value.split(":"),
                    n = i[0].value.replace(":", ""),
                    r = i[0].value.split(":"),
                    u;
                parseInt(e[0]) > 24 ? (n = "00:00", t.$apply(function () {
                    f.assign(t, n)
                })) : n.length < 4 && (n.length == 1 ? n = "0" + n + ":00" : n.length == 2 ? n = r[0] > 23 ? "23:00" : n + ":00" : n.length == 3 && (r[1] < 6 ? (u = r[0] > 23 ? "23" : r[0], n = u + ":" + r[1] + "0") : n = r[0] + ":00"), t.$apply(function () {
                    f.assign(t, n)
                }))
            });
            $(i).keyup(function () {
                o()
            })
        }
    }
}]);
radix.directive("rxSrc", function () {
    return {
        restrict: "A",
        scope: {
            rxSrc: "="
        },
        link: function (n, t) {
            n.$watch("rxSrc", function (n) {
                angular.isUndefined(n) || n == null || (t[0].src = n)
            }, !0)
        }
    }
});
radix.directive("bckColor", function () {
    return {
        restrict: "A",
        scope: {
            bckSource: "="
        },
        link: function (n, t) {
            n.$watch("bckSource", function (i) {
                angular.isUndefined(i) || $(t).css("background-color", n.bckSource)
            }, !0)
        }
    }
});
radix.directive("rxFocus", function () {
    return {
        restrict: "A",
        scope: {
            focusSource: "="
        },
        link: function (n, t) {
            n.$watch("focusSource", function (n) {
                angular.isUndefined(n) || n && $(t).focus()
            }, !0)
        }
    }
});
radix.directive("rxRemove", function () {
    return {
        restrict: "A",
        link: function (n, t, i) {
            n.$watch(i.rxRemove, function (n) {
                n && $(t).remove()
            }, !0)
        }
    }
});
radix.directive("rxFileupload", ["rxWait", "cookieconfig", function () {
    return {
        restrict: "A",
        scope: {
            url: "=",
            uploadObject: "=",
            uploadData: "="
        },
        link: function (n, t, i) {
            $(t).change(function () {
                rx.progress.show()
            });
            angular.isUndefined(i.acceptFile) ? $(t).fileupload({
                url: i.url,
                maxFileSize: 5e6,
                acceptFileTypes: rx.appConfiguration.fileUpload.acceptFileTypes,
                dataType: "json",
                add: function (t, r) {
                    if (angular.isUndefined(i.uploadData) || (r.formData = n.$parent[i.uploadData]), angular.isUndefined(i.beforeSendEvent)) r.submit();
                    else {
                        n.$parent.fileData = r;
                        var u = n.$parent.$eval(i.beforeSendEvent + "(fileData)");
                        u && r.submit()
                    }
                },
                done: function (t, r) {
                    rx.progress.hide();
                    angular.isUndefined(i.uploadEvent) ? n.$apply(function () {
                        n.uploadObject = r.result
                    }) : n.$apply(function () {
                        n.$parent.uploadFile = r.result;
                        n.$parent.$eval(i.uploadEvent + "(uploadFile)")
                    })
                }
            }) : $(t).fileupload({
                url: i.url,
                maxFileSize: 5e6,
                acceptFileTypes: i.acceptFile,
                dataType: "json",
                add: function (t, r) {
                    if (angular.isUndefined(i.uploadData) || (r.formData = n.$parent[i.uploadData]), angular.isUndefined(i.beforeSendEvent)) r.submit();
                    else {
                        n.$parent.fileData = r;
                        var u = n.$parent.$eval(i.beforeSendEvent + "(fileData)");
                        u && r.submit()
                    }
                },
                done: function (t, r) {
                    rx.progress.hide();
                    angular.isUndefined(i.uploadEvent) ? n.$apply(function () {
                        n.uploadObject = r.result
                    }) : n.$apply(function () {
                        n.$parent.uploadFile = r.result;
                        n.$parent.$eval(i.uploadEvent + "(uploadFile)")
                    })
                }
            })
        }
    }
}]);
radix.directive("rxDisableEnter", [function () {
    return {
        restrict: "A",
        link: function (n, t) {
            $(t).keypress(function (n) {
                var t = t ? t : n ? n : null,
                    i = t.target ? t.target : t.srcElement ? t.srcElement : null;
                if (t.keyCode == 13 && i.type == "text") return !1
            });
            $(t).click(function (n) {
                var t, i, r, u, f, e;
                n.target != null && n.target.id.indexOf("menu") == -1 && $(".sub-menu").hide();
                t = $(n.target).parent().is("[rx-popover]");
                i = $(n.target).parent().closest(".popover").length > 0;
                t || i || $(".popover").popover("hide");
                r = $(n.target).is("[rx-tip]");
                u = $(".tooltip").length > 0;
                !r && u && $(".tooltip").tooltip("hide");
                f = $(n.target).is("[rx-right-click]");
                e = $(".dropdown open").length > 0;
                $(".dropdown").removeClass("open")
            })
        }
    }
}]);
radix.directive("rxHtml", [function () {
    return {
        restrict: "A",
        scope: {
            rxHtml: "="
        },
        link: function (n, t) {
            n.$watch("rxHtml", function (i) {
                angular.isUndefined(i) || $(t).html(n.rxHtml)
            }, !0)
        }
    }
}]);
radix.directive("rxNosave", function () {
    return {
        restrict: "A",
        link: function (n, t) {
            $(t).attr("autocomplete", "off")
        }
    }
});
radix.directive("rxModelRequired", ["rxJson", function (n) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (t, i, r, u) {
            function f(i, r) {
                var u = n.find(t.modalValidationConditions, {
                    name: i
                })[0];
                angular.isUndefined(u) ? t.modalValidationConditions.push({
                    name: i,
                    value: r
                }) : u.value = r
            }

            function e(i) {
                var r = n.find(t.modalValidationConditions, {
                    name: i
                })[0];
                return angular.isUndefined(r) ? undefined : r.value
            }
            t.modalValidationConditions = [];
            var o = r.ngModel;
            t.$watch(r.rxModelValidate, function (n) {
                angular.isUndefined(n) || (f(r.ngModel, n), n ? (u.$viewValue == "" || u.$viewValue == null) && ($(i).addClass("rx-error"), $(i).removeClass("rx-valid"), u.$setValidity(r.ngModel, !1)) : ($(i).removeClass("rx-error"), $(i).addClass("rx-valid"), u.$setValidity(r.ngModel, !0)))
            });
            t.$watch(o, function (n) {
                var t = e(r.ngModel);
                angular.isUndefined(n) || n == null || n == "" ? angular.isUndefined(t) || t && ($(i).addClass("rx-error"), $(i).removeClass("rx-valid"), u.$setValidity(r.ngModel, !1)) : angular.isUndefined(t) || (t ? n != "" && n != null ? ($(i).removeClass("rx-error"), $(i).addClass("rx-valid"), u.$setValidity(r.ngModel, !0)) : ($(i).addClass("rx-error"), $(i).removeClass("rx-valid"), u.$setValidity(r.ngModel, !1)) : ($(i).removeClass("rx-error"), $(i).addClass("rx-valid"), u.$setValidity(r.ngModel, !0)))
            }, !0)
        }
    }
}]);
radix.directive("rxMask", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (n, t, i, r) {
            n.$watch(i.rxMask, function (i) {
                if (!angular.isUndefined(i)) {
                    $(t).unmask();
                    var u = setTimeout(function () {
                        $(t).mask(i, {
                            completed: function () {
                                r.$setViewValue(this.val());
                                n.$apply()
                            }
                        })
                    }, 500)
                }
            }, !0)
        }
    }
});
radix.filter("filteryear", function () {
    return function (n, t) {
        if (!angular.isUndefined(t))
            for (var i = 0; i < t[0].week.length; i++)
                if (!angular.isUndefined(t[0].week[i].applicationYear)) return n + " " + t[0].week[i].applicationYear
    }
});
radix.filter("nullIdentifier", function () {
    return function (n, t) {
        return !angular.isUndefined(t) && n == t ? "" : angular.isUndefined(n) ? "" : n
    }
});
radix.directive("rxRightClick", ["$parse", function (n) {
    return function (t, i, r) {
        var u = n(r.rxRightClick);
        i.bind("contextmenu", function (n) {
            t.$apply(function () {
                n.preventDefault();
                u(t, {
                    $event: n
                })
            })
        })
    }
}]);
radix.directive("rxExplorerTree", ["$compile", "rxJson", "$rootScope", "$window", "rxUserPermission", function (n, t) {
    return {
        restrict: "E",
        scope: {
            explorertreeSource: "=",
            explorertreeOption: "="
        },
        controller: ["$scope", "$element", function (i, r) {
            i.isCustomChange = !1;
            i.getTreeBind = function (r, u) {
                var e, o, f;
                if (r.isOpenRow = angular.isUndefined(u) ? r.isOpenRow == undefined ? !0 : !r.isOpenRow : !0, r.isOpenRow) {
                    for (e = t.find(i.explorertreeSource, {
                        parentObjectId: r.objectId
                    }), o = "<ul>", f = 0; f < e.length; f++) {
                        var h = t.find(i.explorertreeSource, {
                            parentObjectId: e[f].objectId
                        }),
                            c = h.length > 0 ? "icon-caret-right" : "no-subfolder folder-margin-left",
                            s = "";
                        e[f].active || (s = "folder-color-inactive");
                        o += '<li><div id="selected' + e[f].objectId + '" + ng-click="treeEvent(' + e[f].objectId + ')"  ><i ng-click="getSubTreeBind(' + e[f].objectId + ',$element)" class="' + c + '"><\/i><i class="bigger-175  folder-color ' + s + ' icon-folder-close folder-margin-left"><\/i>' + e[f].objectName + '<\/div><div id="rxattachment' + e[f].objectId + '" class="close-tree" ><\/div><\/li>'
                    }
                    o += "<\/ul>";
                    $("#rxattachment" + r.objectId).html(n(o)(i))
                } else $("#rxattachment" + r.objectId).html("")
            };
            i.getCaretCss = function (n) {
                if (n.caret = angular.isUndefined(n.caret) ? "" : n.caret, n.caret != "no-subfolder folder-margin-left") {
                    var r = t.find(i.explorertreeSource, {
                        parentObjectId: n.objectId
                    });
                    n.caret = r.length > 0 ? angular.isUndefined(i.treeOption) ? "icon-caret-right" : angular.isUndefined(i.treeOption.treeMaster) ? "icon-caret-right" : i.treeOption.treeMaster.iconCss == undefined ? "icon-caret-right" : i.treeOption.treeMaster.iconCss : "no-subfolder folder-margin-left"
                }
            };
            i.getSubTreeBind = function (r, u) {
                var e, o, f, h, s, c;
                if ($("#rxattachment" + r).hasClass("close-tree") || u != undefined) {
                    for (e = t.find(i.explorertreeSource, {
                        parentObjectId: r
                    }), o = "<ul>", f = 0; f < e.length; f++) h = t.find(i.explorertreeSource, {
                        parentObjectId: e[f].objectId
                    }), s = "", e[f].active || (s = "folder-color-inactive"), c = h.length > 0 ? "icon-caret-right" : "no-subfolder folder-margin-left", o += '<li><div id="selected' + e[f].objectId + '" ng-click="treeEvent(' + e[f].objectId + ')"><i ng-click="getSubTreeBind(' + e[f].objectId + ',$element)" class="' + c + '"><\/i><i class="bigger-175  ' + s + '  folder-color icon-folder-close folder-margin-left"><\/i>' + e[f].objectName + '<\/div><div id="rxattachment' + e[f].objectId + '" class="close-tree" ><\/div><\/li>';
                    o += "<\/ul>";
                    u == undefined && ($("#rxattachment" + r).removeClass("close-tree"), $("#rxattachment" + r).addClass("open-tree"));
                    $("#rxattachment" + r).html(n(o)(i))
                } else $("#rxattachment" + r).addClass("close-tree"), $("#rxattachment" + r).removeClass("open-tree"), $("#rxattachment" + r).html("")
            };
            i.treeEvent = function (n, r) {
                $(".selected").removeClass("selected");
                $("#selected" + n).addClass("selected");
                angular.isUndefined(r) && (r = t.find(i.explorertreeSource, {
                    objectId: n
                })[0]);
                i.getTreeBind(r);
                i.$parent.rxtreeId = n;
                i.$parent.$eval(i.explorertreeOption.treeMaster.callbacks.select + "(rxtreeId)")
            };
            i.setFunctions = function () {
                i.explorertreeSource.addTreeFolder = function (n) {
                    i.explorertreeSource.push(n);
                    i.getSubTreeBind(n.parentObjectId, !1)
                };
                i.explorertreeSource.selectFolder = function (n) {
                    i.isSelectedNodeFolder = !0;
                    i.setSelectedNode(n)
                };
                i.explorertreeSource.inactiveFolder = function (n) {
                    var r = t.find(i.explorertreeSource, {
                        objectId: n
                    })[0];
                    r.active = !1;
                    r.objectName = r.objectName + " (Inactive)";
                    $("#selected" + n + " .icon-folder-close").addClass("folder-color-inactive")
                };
                i.explorertreeSource.activeFolder = function (n) {
                    var r = t.find(i.explorertreeSource, {
                        objectId: n
                    })[0];
                    r.active = !0;
                    r.objectName = r.objectName.replace(" (Inactive)", "");
                    $("#selected" + n + " .icon-folder-close").removeClass("folder-color-inactive")
                };
                i.explorertreeSource.renameTreeFolder = function (n, r) {
                    var u = t.find(i.explorertreeSource, {
                        objectId: n
                    })[0];
                    u.objectName = r;
                    i.getSubTreeBind(u.parentObjectId, !1)
                };
                i.explorertreeSource.removeTreeFolder = function (n) {
                    var r = t.find(i.explorertreeSource, {
                        objectId: n
                    })[0],
                        f, u;
                    r != null && (f = r.parentObjectId, u = i.explorertreeSource.indexOf(r), u != -1 && i.explorertreeSource.splice(u, 1), i.getSubTreeBind(f, !1))
                }
            };
            i.explorerTreeSelecteds = [];
            i.setSelectedNode = function (n) {
                var r, u;
                if (n.parentObjectId == 0)
                    for (r = i.explorerTreeSelecteds.length - 1; r >= 0; --r) i.getTreeBind(i.explorerTreeSelecteds[r], !0), $(".selected").removeClass("selected"), $("#selected" + i.explorerTreeSelecteds[r].objectId).addClass("selected");
                else i.isSelectedNodeFolder && (i.explorerTreeSelecteds = [], i.explorerTreeSelecteds.push(n)), i.isSelectedNodeFolder = !1, u = t.find(i.explorertreeSource, {
                    objectId: n.parentObjectId
                })[0], i.explorerTreeSelecteds.push(u), i.setSelectedNode(u)
            };
            i.setExplorertree = function () {
                i.setFunctions();
                i.isCustomChange = !0;
                i.rxExplorerTreeRoot = t.find(i.explorertreeSource, {
                    parentObjectId: 0
                });
                $(r).html(n('<div class="explorer-listing"><ul class="nav nav-pills nav-stacked"><li ng-repeat="attachmenttree in rxExplorerTreeRoot" ><div id="selected{{attachmenttree.objectId}}" class="rootfolder" ng-click="treeEvent(attachmenttree.objectId,attachmenttree)"><i ng-init="getCaretCss(attachmenttree)" ng-class="attachmenttree.caret" ng-click="getTreeBind(attachmenttree)"><\/i><i class="bigger-175  folder-color icon-folder-close folder-margin-left"><\/i>{{attachmenttree.objectName}}<\/div><div id="rxattachment{{attachmenttree.objectId}}"><\/ul><\/div>')(i))
            };
            i.$watch("explorertreeSource", function (n) {
                angular.isUndefined(n) || i.isCustomChange || i.setExplorertree()
            })
        }],
        link: function () { },
        replace: !0
    }
}]);
radix.directive("rxGrid", ["$compile", "rxData", "$rootScope", "$window", "rxJson", "response", "cacheData", "$filter", "rxEncode", "rxUserPermission", "rxAlert", "$timeout", function (n, t, i, r, u, f, e, o, s, h, c, l) {
    return {
        restrict: "E",
        scope: {
            gridSource: "=",
            gridOption: "="
        },
        controller: ["$scope", "$element", function (r, a) {
            var k = "",
                d, p, v;
            r.createCustomColumn = !1;
            r.pageSize = 10;
            r.currentPage = 0;
            r.tableHeadings = [];
            r.tableWidth = 0;
            r.setTableCSS = function (n) {
                var t = angular.isUndefined(n.tableCss) ? "" : n.tableCss,
                    i = angular.isUndefined(r.gridOption.gridMaster.autoWidthColumn) ? !1 : r.gridOption.gridMaster.autoWidthColumn,
                    f = u.find(r.gridOption.masterTableView.columns, {
                        activeColumn: !0
                    });
                return '<div><table id="' + r.gridName + '" class="' + t + '" >'
            };
            r.setTableHeadingCss = function (n) {
                var t = angular.isUndefined(n.tableHeadingCss) ? "" : n.tableHeadingCss;
                return '<thead class="' + t + '">'
            };
            r.setTableHeadingRowCss = function (n) {
                return angular.isUndefined(n.tableHeadingRowCss) ? "" : n.tableHeadingRowCss
            };
            r.setCustomFilterText = function (n) {
                var t = angular.isUndefined(n.headerText) ? "" : n.headerText;
                return '<div id="' + n.dataField + '" class="popover fade "><div class="arrow"><\/div><h3 class="popover-title">Search "' + t + '"<\/h3><div class="popover-content"><div class="row form-group"><label class="control-label col-lg-4 col-xs-4">' + t + '<\/label><div class="col-lg-8 col-xs-8"><input type="text" ng-model="customSearch.' + n.dataField + '" class="form-control"/><\/div><\/div><div class="row form-group"><label class="control-label col-lg-4 col-xs-4">' + t + '<\/label><div class="col-lg-8 col-xs-8"><button class="btn btn-primary" ng-click="searchCustomFilter(customSearch.' + n.dataField + ')">Search<i class="icon-search icon-on-right"><\/i><\/button><\/div><\/div><\/div><\/div>'
            };
            r.showCustomFilter = function (t) {
                var i, f;
                t.showSearch && t.showFilter && (t.formatType == "text" ? (i = "#th" + r.gridName + t.sortColumn, $("#th" + r.gridName + t.sortColumn).popover({
                    placement: "bottom",
                    title: "Search " + t.headerText + '<button type="button" class="pull-right close popover-title-close"  onclick=$("' + i + '").popover("hide")><i class="icon-remove-circle icon-large"><\/i><\/button>',
                    html: !0,
                    container: "body",
                    trigger: "click",
                    content: function () {
                        $(".popover").remove();
                        var i = '<div class="row"><div class="form-group"><label>' + t.headerText + '<\/label><input type="text" ng-model="customSearch.' + t.sortColumn + '" class="form-control"/><\/div><div class="col-lg-12 col-sm-12"><button class="btn btn-primary" ng-click=searchCustomFilter(customSearch,"' + t.sortColumn + '",' + t.changeDataFieldForFilter + ')> Search <i class="icon-search icon-on-right"><\/i><\/button><button class="btn btn-danger" ng-click=\rresetCustomSearch(customSearch,"' + t.sortColumn + '",' + t.changeDataFieldForFilter + ')> Reset <i class="icon-refresh icon-on-right"><\/i><\/button><\/div>';
                        return r.$apply(function () {
                            return n(i)(r)
                        })
                    }
                })) : t.formatType == "checkbox" ? (i = "#th" + r.gridName + t.sortColumn, $("#th" + r.gridName + t.sortColumn).popover({
                    placement: "bottom",
                    title: "Search " + t.headerText + '<button type="button" class="pull-right close popover-title-close" onclick=$("' + i + '").popover("hide")><i class="icon-remove-circle icon-large"><\/i><\/button>',
                    html: !0,
                    container: "body",
                    trigger: "click",
                    content: function () {
                        var i, f, e;
                        if (angular.isUndefined(r.customSearch) && (r.customSearch = {}), $(".popover").remove(), r.drpBinds = [{
                            searchValue: "",
                            text: "All"
                        }, {
                            searchValue: t.formatObject.trueValue,
                            text: "Active"
                        }, {
                            searchValue: t.formatObject.falseValue,
                            text: "Inactive"
                        }], !angular.isUndefined(r.gridOption.gridMaster.customSearchCheckbox) && (i = u.find(r.gridOption.gridMaster.customSearchCheckbox, {
                            dataField: t.sortColumn
                        }), i.length > 0))
                            for (r.drpBinds = [], r.drpBinds.push({
                                searchValue: "",
                                text: "All"
                            }), f = 0; f < i[0].source.length; f++) r.drpBinds.push({
                                searchValue: i[0].source[f].searchValue,
                                text: i[0].source[f].text
                            });
                        return angular.isUndefined(r.customSearch[t.sortColumn]) && (r.customSearch[t.sortColumn] = ""), e = '<div class="row form-group"  style="width:350px;"><label class="control-label col-lg-6 col-xs-6">' + t.headerText + '<\/label><div class="col-lg-6 col-xs-6"><select class="col-lg-12 col-xs-12" ng-change=customSearchDropdown(customSearch.' + t.sortColumn + ',"' + t.sortColumn + '") ng-model="customSearch.' + t.sortColumn + '"   ng-options="sdrp.searchValue as sdrp.text for sdrp in drpBinds" ><\/select><\/div><\/div><div class="row form-group"><label class="control-label col-lg-4 col-xs-4"><\/label><div class="col-lg-8 col-xs-8 col-lg-offset-4"><button class="btn btn-primary" ng-click=searchCustomFilter(customSearch,"' + t.sortColumn + '")>Search<i class="icon-search icon-on-right"><\/i><\/button><button class="btn btn-danger" style="margin-left:5px;" ng-click=cancelCustomSearch("' + t.sortColumn + '")>Cancel<i class="icon-arrow-left icon-on-right"><\/i><\/button>', "<\/div><\/div>", r.$apply(function () {
                            return n(e)(r)
                        })
                    }
                })) : t.formatType == "colorbox" && (i = "#th" + r.gridName + t.sortColumn, $("#th" + r.gridName + t.sortColumn).popover({
                    placement: "bottom",
                    title: "Search " + t.headerText + '<button type="button" class="pull-right close popover-title-close" onclick=$("' + i + '").popover("hide")><i class="icon-remove-circle icon-large"><\/i><\/button>',
                    html: !0,
                    trigger: "click",
                    container: "body",
                    content: function () {
                        $(".popover").remove();
                        r.colorCodes = [{
                            code: "#ac725e"
                        }, {
                            code: "#d06b64"
                        }, {
                            code: "#f83a22"
                        }, {
                            code: "#fa573c"
                        }, {
                            code: "#ff7537"
                        }, {
                            code: "#ffad46"
                        }, {
                            code: "#42d692"
                        }, {
                            code: "#16a765"
                        }, {
                            code: "#7bd148"
                        }, {
                            code: "#b3dc6c"
                        }, {
                            code: "#fbe983"
                        }, {
                            code: "#fad165"
                        }, {
                            code: "#92e1c0"
                        }, {
                            code: "#9fe1e7"
                        }, {
                            code: "#9fc6e7"
                        }, {
                            code: "#4986e7"
                        }, {
                            code: "#9a9cff"
                        }, {
                            code: "#b99aff"
                        }, {
                            code: "#c2c2c2"
                        }, {
                            code: "#cabdbf"
                        }, {
                            code: "#cca6ac"
                        }, {
                            code: "#f691b2"
                        }, {
                            code: "#cd74e6"
                        }, {
                            code: "#a47ae2"
                        }, {
                            code: "#555"
                        }];
                        var i = '<div class="row form-group"  style="width:350px;"><label class="control-label col-lg-6 col-xs-6">' + t.headerText + '<\/label><div class="col-lg-6 col-xs-6"><select id="simple-colorpicker-1 " ng-model="customSearch.' + t.sortColumn + '" rx-color rx-color-required class="hide"><option value="#ac725e" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[0].code">#ac725e<\/option><option value="#d06b64" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[1].code">#d06b64<\/option><option value="#f83a22" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[2].code">#f83a22<\/option><option value="#fa573c" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[3].code">#fa573c<\/option><option value="#ff7537" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[4].code">#ff7537<\/option><option value="#ffad46" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[5].code">#ffad46<\/option><option value="#42d692" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[6].code">#42d692<\/option><option value="#16a765" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[7].code">#16a765<\/option><option value="#7bd148" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[8].code">#7bd148<\/option><option value="#b3dc6c" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[9].code">#b3dc6c<\/option><option value="#fbe983" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[10].code">#fbe983<\/option><option value="#fad165" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[11].code">#fad165<\/option><option value="#92e1c0" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[12].code">#92e1c0<\/option><option value="#9fe1e7" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[13].code">#9fe1e7<\/option><option value="#9fc6e7" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[14].code">#9fc6e7<\/option><option value="#4986e7" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[15].code">#4986e7<\/option><option value="#9a9cff" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[16].code">#9a9cff<\/option><option value="#b99aff" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[17].code">#b99aff<\/option><option value="#c2c2c2" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[18].code">#c2c2c2<\/option><option value="#cabdbf" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[19].code">#cabdbf<\/option><option value="#cca6ac" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[20].code">#cca6ac<\/option><option value="#f691b2" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[21].code">#f691b2<\/option><option value="#cd74e6" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[22].code">#cd74e6<\/option><option value="#a47ae2" ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[23].code">#a47ae2<\/option><option value="#555"    ng-selected="customSearch.' + t.sortColumn + ' == colorCodes[24].code">#555<\/option><\/select><\/div><\/div><div class="row form-group"><label class="control-label col-lg-4 col-xs-4"><\/label><div class="col-lg-8 col-xs-8 col-lg-offset-4"><button class="btn btn-primary" ng-click=searchCustomFilter(customSearch,"' + t.sortColumn + '")>Search<i class="icon-search icon-on-right"><\/i><\/button><button class="btn btn-danger" style="margin-left:5px;" ng-click=cancelCustomSearch("' + t.sortColumn + '")>Cancel<i class="icon-arrow-left icon-on-right"><\/i><\/button>';
                        return r.$apply(function () {
                            return n(i)(r)
                        })
                    }
                })), t.showFilter = !1, f = setTimeout(function () {
                    $("#th" + r.gridName + t.sortColumn).popover("show")
                }, 100))
            };
            r.customSearchDropdown = function () { };
            r.resetCustomSearch = function (n, t, i) {
                n == null ? ($("#th" + r.gridName + t).popover("hide"), $("#theading" + r.gridName + t + " .popover ").remove()) : (n[t] = undefined, r.searchCustomFilter(n, t, i))
            };
            r.cancelCustomSearch = function (n) {
                $("#th" + r.gridName + n).popover("hide");
                $("#theading" + r.gridName + n + " .popover ").remove()
            };
            r.dbSearch = {};
            r.searchCustomFilter = function (n, t, i) {
                var s = n[t],
                    h = u.find(r.gridOption.masterTableView.columns, {
                        dataField: t,
                        dateFilter: !0
                    })[0],
                    o, f;
                h != undefined && n[t] != null && n[t] != "" && (o = n[t].split("/"), n[t] = o[1] + "/" + o[0] + "/" + o[2]);
                r.currentPage = 0;
                f = t;
                i && (f += "_filteredDate");
                r.dbSearch[f] = n[t];
                angular.isNumber(n[t]) ? $("#th" + r.gridName + t).addClass("read-filter") : angular.isString(n[t]) ? n[t] == "" ? (angular.isUndefined(r.gridOption.gridMaster.customPagging) ? r.search[f] = undefined : r.dbSearch[f] = undefined, $("#th" + r.gridName + t).removeClass("read-filter")) : n[t] == undefined ? $("#th" + r.gridName + t).removeClass("read-filter") : $("#th" + r.gridName + t).addClass("read-filter") : /^(true|false)$/i.test(n[t]) ? $("#th" + r.gridName + t).addClass("read-filter") : n[t] == undefined && $("#th" + r.gridName + t).removeClass("read-filter");
                e.save(r.gridName + "Search", r.search);
                $("#th" + r.gridName + t).popover("hide");
                $(".popover ").remove();
                angular.isUndefined(r.gridOption.gridMaster.dbSearch) ? r.search[f] = n[t] : (r.customPaggingPage = 0, r.$parent.eventObjectCustom = r.dbSearch, r.$parent.orderByColumnGrid = r.SortColumnName, r.$parent.isOrderByColumnGrid = r.sortOrder, r.$parent.cPage = r.customPaggingPage, r.$parent.pSize = r.pageSize, r.$parent.$eval(r.gridOption.gridMaster.customPagging.eventName + "(cPage,pSize,eventObjectCustom,orderByColumnGrid,isOrderByColumnGrid)"));
                r.subGridInitillization();
                r.customSearch[t] = s
            };
            var w = !1,
                y = 0,
                b = !0;
            r.isSetGridOptions = !1;
            r.setTableHeadings = function (n) {
                var ut, ft, c, p, ot, ht, nt, o, l, t, d, tt, it, rt;
                if (n.isActionColumnsDisable = !1, n.isDeleteVisible = !0, n.isEditVisible = !0, n.isEditAddVisible = !0, n.columnType != "inlineClickColumn") {
                    var i = "",
                        st = angular.isUndefined(n.languageProperty) ? "" : n.languageProperty,
                        f = undefined,
                        v = undefined;
                    angular.isUndefined(n.dataField) ? i = "" : (i = angular.isUndefined(n.sortColumn) ? "sorting" : "", angular.isUndefined(r.gridOption.gridMaster.customSortEvents) || (r.getEventNameColumn = u.find(r.gridOption.gridMaster.customSortEvents, {
                        columnName: n.dataField
                    })[0], r.getEventNameColumn != undefined && (r.sortOrder = n.sortOrder, r.isResetGridCall && (i = angular.isUndefined(n.sortColumn) ? angular.isUndefined(n.sortCss) ? "sorting" : n.sortCss : "", angular.isUndefined(n.sortOrder) || n.sortOrder ? f = !0 : (f = !1, v = !0)))));
                    ut = angular.isUndefined(r.gridOption.gridMaster.defaultSortColumn) ? "" : r.gridOption.gridMaster.defaultSortColumn;
                    r.spSearch ? (r.SortColumnName == undefined && (r.SortColumnName = ut), r.SortColumnName == n.dataField && (b = !1, i = r.sortOrder ? "sorting_desc" : "sorting_asc", r.sortOrder ? (f = !1, v = !0) : f = !0)) : ut == n.dataField && (b = !1, i = angular.isUndefined(n.sortOrder) || n.sortOrder ? "sorting_asc" : "sorting_desc", angular.isUndefined(r.gridOption.gridMaster.customSortEvents) ? (r.SortColumnName = n.dataField, r.SortOrder = !0) : (r.SortColumnName = undefined, r.SortOrder = undefined), angular.isUndefined(n.sortOrder) || n.sortOrder ? f = !0 : (f = !1, v = !0));
                    ft = angular.isUndefined(r.gridOption.gridMaster.allowMultipleColumSorting) ? !1 : r.gridOption.gridMaster.allowMultipleColumSorting;
                    c = [];
                    c = u.find(r.gridOption.masterTableView.columns, {
                        activeColumn: !0
                    });
                    w || ((c.length > 1 && c.length < 8 || r.gridName == "officeGrid") && (y = $(a[0].parentElement).width(), angular.isUndefined(r.gridOption.gridMaster.saveWidth) || (r.gridOption.gridMaster.saveWidth ? e.save("securityg", y) : y = parseInt(e.fetch("securityg"))), y == 0 && (y = parseInt(e.fetch("securityg"))), r.mainTableWidth = {
                        width: y + "px"
                    }, y = (y - 105) / c.length), w = !0);
                    p = {
                        width: angular.isUndefined(n.width) ? y + "px" : n.width + "px"
                    };
                    angular.isUndefined(r.gridOption.gridMaster.tableWidth) || (r.mainTableWidth = {
                        width: r.gridOption.gridMaster.tableWidth + "px"
                    }, p = {
                        width: n.width + "px"
                    });
                    var et = angular.isUndefined(r.gridOption.gridMaster.autoWidthColumn) ? !1 : r.gridOption.gridMaster.autoWidthColumn,
                        g = angular.isUndefined(r.gridOption.gridMaster.showFilter) ? !1 : r.gridOption.gridMaster.showFilter,
                        s = angular.isUndefined(n.headerText) ? "" : n.headerText;
                    if (rx.rxString.first(s, 1) == "@" && (s = rx.language.getPropertyValue(s)), et && c.length > 8 && (ot = s.length < 2 ? 100 : s.length, ht = angular.isUndefined(n.width) ? (ot + 5) * 12 : n.width, r.tableWidth += ht, p = {
                        width: angular.isUndefined(n.width) ? (ot + 5) * 12 + "px" : n.width + "px"
                    }, r.mainTableWidth = {
                        width: r.tableWidth + "px"
                    }), k = "", nt = angular.isUndefined(n.searchType) ? "text" : n.searchType, formatObject = {}, nt == "checkbox" && (formatObject = {
                        trueValue: n.trueValue,
                        falseValue: n.falseValue
                    }), n.columnType == "actionsColumn")
                        if (angular.isUndefined(n.headerCss) && (n.headerCss = "action-column"), p = angular.isUndefined(n.customWidth) ? {
                            width: "105px"
                        } : {
                                width: n.customWidth + "px"
                            }, r.gridOption.gridMaster.permissionCode != undefined) {
                            if (t = u.find(rx.permission.userContext, {
                                permissionCode: r.gridOption.gridMaster.permissionCode
                            })[0], !angular.isUndefined(t) && (d = [], n.actions != undefined)) {
                                for (o = 0; o < n.actions.length; o++) t[n.actions[o].operationType] ? n.actions[o].showAction = !0 : (n.actions[o].showAction = !1, d.push(o));
                                n.actions.length == d.length && (n.isActionColumnsDisable = !0)
                            }
                        } else t = u.find(h.permissionContext, {
                            permissionItemName: r.gridOption.gridMaster.itemName
                        })[0], angular.isUndefined(t) && !angular.isUndefined(r.gridOption.gridMaster.baseSecurityContext) && r.gridOption.gridMaster.baseSecurityContext && (t = u.find(h.mainContext, {
                            permissionItemName: r.gridOption.gridMaster.itemName
                        })[0]), angular.isUndefined(t) || t.fullControl || (l = u.find(n.actions, {
                            eventIdentity: "delete"
                        })[0], l != undefined && (n.isDeleteVisible = !1), t.canEdit || (l = u.find(n.actions, {
                            eventIdentity: "edit"
                        })[0], l != undefined && (n.isEditVisible = !1)), t.canAdd || (l = u.find(n.actions, {
                            eventIdentity: "copy"
                        })[0], l != undefined && (n.isEditAddVisible = !1)), n.isActionColumnsDisable = n.isEditVisible || n.isDeleteVisible ? !1 : !0);
                    else n.columnType == "actionColumn" && (angular.isUndefined(n.headerCss) && (n.headerCss = "action-column"), p = angular.isUndefined(n.customWidth) ? {
                        width: "105px"
                    } : {
                            width: n.customWidth + "px"
                        }, r.gridOption.gridMaster.permissionCode != undefined && (t = u.find(rx.permission.userContext, {
                            permissionCode: r.gridOption.gridMaster.permissionCode
                        })[0], angular.isUndefined(t) || (d = [], t[n.operationType] ? n.showAction = !0 : (n.showAction = !1, d.push(o)), n.isActionColumnsDisable = n.showAction)));
                    tt = !1;
                    n.dateFilter && n.changeDateFormat && (tt = !0);
                    n.isActionColumnsDisable || (it = n.columnType != "actionColumn" && n.columnType != "actionsColumn" && n.columnType != "subGridIconColumn" && n.columnType != "htmlColumn" && g, (n.columnType == "actionColumn" || n.columnType == "actionsColumn") && n.dataField != null && g && (it = !0), rt = undefined, n.columnType == "checkboxColumn" && n.showHeaderCheckbox == !0 && (rt = !0), angular.isUndefined(r.gridOption.gridMaster.customPagging) ? r.tableHeadings.push({
                        dataField: n.dataField,
                        showHeaderCheckbox: rt,
                        formatType: nt,
                        autoWidthColumn: et,
                        activeAscIcon: f,
                        activeDscIcon: v,
                        formatObject: formatObject,
                        showSearch: it,
                        showFilter: g,
                        languageProperty: st,
                        sortColumn: n.dataField,
                        sortCss: i,
                        headerText: s,
                        headerCss: angular.isUndefined(n.headerCss) ? "" : n.headerCss,
                        isSorting: i != "" && ft,
                        sortOrder: i == "sorting_asc" && r.sortOrder == !0,
                        changeDataFieldForFilter: tt
                    }) : r.tableHeadings.push({
                        dataField: n.dataField,
                        showHeaderCheckbox: rt,
                        formatType: nt,
                        autoWidthColumn: et,
                        activeAscIcon: f,
                        activeDscIcon: v,
                        formatObject: formatObject,
                        showSearch: it,
                        showFilter: g,
                        languageProperty: st,
                        sortColumn: n.dataField,
                        sortCss: i,
                        headerText: s,
                        headerCss: angular.isUndefined(n.headerCss) ? "" : n.headerCss,
                        isSorting: i != "" && ft,
                        sortOrder: r.sortOrder,
                        changeDataFieldForFilter: tt
                    }), angular.isUndefined(n.showSearch) || (r.tableHeadings[r.tableHeadings.length - 1].showSearch = n.showSearch), angular.isUndefined(n.isSorting) || n.isSorting || (r.tableHeadings[r.tableHeadings.length - 1].isSorting = !1))
                }
            };
            r.isActionColumnsDisable = !1;
            r.setconditionalRowCss = function () {
                var u = "",
                    f = "",
                    n = "",
                    t, i;
                return angular.isUndefined(rxgs.gridMaster.selectedRow) || (u = angular.isUndefined(rxgs.gridMaster.selectedRow.event) ? "" : rxgs.gridMaster.selectedRow.event, f = angular.isUndefined(rxgs.gridMaster.selectedRow.cssClass) ? "" : rxgs.gridMaster.selectedRow.cssClass, n = 'rx-activeclass element="' + r.gridName + '" add-class="selectedRow" ng-click="selectedRowEvent(rxg)"'), angular.isUndefined(r.rxgs.gridMaster.groupBy) || (r.isGroupGrid = !0, r.parentPropertyName = r.rxgs.gridMaster.groupBy.parentPropertyName, r.childPropertyName = r.rxgs.gridMaster.groupBy.childPropertyName, r.defaultSortColumnName = r.rxgs.gridMaster.defaultSortColumn), angular.isUndefined(rxgs.gridMaster.selectedRowDoubleClickEvent) || rxgs.gridMaster.selectedRowDoubleClickEvent == "" || (n == "" ? n = ' rx-activeclass element="' + r.gridName + '" add-class="selectedRow" ng-dblclick="selectedRowEvent(rxg,true)" ' : n += ' ng-dblclick="selectedRowEvent(rxg,true)" '), t = "", i = " ng-hide=\"rxg['expandCollapse']\" ", angular.isUndefined(rxgs.gridMaster.conditionalRowCss) || (t = 'ng-class="getRowConditionalCss(rxg)"'), angular.isUndefined(r.gridOption.gridMaster.customPagging) ? !angular.isUndefined(r.gridOption.gridMaster.hidePaging) && r.gridOption.gridMaster.hidePaging ? angular.isUndefined(r.gridOption.gridMaster.searchColumns) ? "<tr " + n + ' ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject | filter : search)) | orderBy:SortColumnName:sortOrder" class="' + rxgs.gridCss.tableRowCss + '" ' + t + ">" : angular.isUndefined(r.rxgs.gridMaster.groupBy) ? "<tr " + n + ' ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject | rxGridFilter : search : searchColumns)) | orderBy:SortColumnName:sortOrder" class="' + rxgs.gridCss.tableRowCss + '" ' + t + ">" : "<tr" + i + ' ng-class="{groupRow: rxg.' + r.rxgs.gridMaster.groupBy.parentPropertyName + ' == 0}"' + n + ' ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject | rxGridFilter : search : searchColumns : isGroupGrid : parentPropertyName : childPropertyName) | rxGroupArray : parentPropertyName : childPropertyName)" class="' + rxgs.gridCss.tableRowCss + '" ' + t + ">" : angular.isUndefined(r.gridOption.gridMaster.searchColumns) ? "<tr " + n + ' ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject | filter : search))  | orderBy:SortColumnName:sortOrder | startIndex:currentPage*pageSize | limitTo:pageSize  " class="' + rxgs.gridCss.tableRowCss + '" ' + t + ">" : angular.isUndefined(r.rxgs.gridMaster.groupBy) ? "<tr " + n + ' ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject | rxGridFilter : search : searchColumns))  | orderBy:SortColumnName:sortOrder | startIndex:currentPage*pageSize | limitTo:pageSize  " class="' + rxgs.gridCss.tableRowCss + '" ' + t + ">" : "<tr " + i + ' ng-class="{groupRow: rxg.' + r.rxgs.gridMaster.groupBy.parentPropertyName + ' == 0}"' + n + ' ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject | rxGridFilter : search : searchColumns : isGroupGrid : parentPropertyName : childPropertyName)) | rxGroupPaging : parentPropertyName : childPropertyName : pageSize : currentPage : defaultSortColumnName" class="' + rxgs.gridCss.tableRowCss + '" ' + t + ">" : angular.isUndefined(r.gridOption.gridMaster.searchColumns) ? "<tr " + n + ' ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject)) | startIndex:currentPage*pageSize | limitTo:pageSize  " class="' + rxgs.gridCss.tableRowCss + '" ' + t + ">" : "<tr " + n + ' ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject | rxGridFilter : search : searchColumns)) | startIndex:currentPage*pageSize | limitTo:pageSize  " class="' + rxgs.gridCss.tableRowCss + '" ' + t + ">"
            };
            r.getRowConditionalCss = function (n) {
                for (var t, r = "none", i = 0; i < rxgs.gridMaster.conditionalRowCss.length; i++)
                    if (t = rxgs.gridMaster.conditionalRowCss[i], n[t.dataColumn] == t.dataValue) {
                        r = t.dataRowCss;
                        break
                    }
                return r
            };
            r.selectedRowEvent = function (n, i) {
                t.setJsonObject(n, r.gridName);
                t.setJsonArray(r.rxgs.gridObject, r.gridName);
                t.setFilteredJsonArray(r.filteredRxgs, r.gridName);
                t.activeGrid = r.gridName;
                i ? angular.isUndefined(r.rxgs.gridMaster.selectedRowDoubleClickEvent) || (r.selectedRowData = n, r.$parent.selectedrowrxg = n, r.$parent.$eval(r.rxgs.gridMaster.selectedRowDoubleClickEvent + "(selectedrowrxg)")) : angular.isUndefined(r.rxgs.gridMaster.selectedRow.event) || (r.selectedRowData = n, r.$parent.selectedrowrxg = n, r.$parent.$eval(r.rxgs.gridMaster.selectedRow.event + "(selectedrowrxg)"))
            };
            r.toggleEditMode = function (n, t) {
                n.isEditMode = !n.isEditMode;
                for (var i in n) i != "$$hashKey" && $("#" + i + t).val(n[i])
            };
            r.deleteObject = function () { };
            r.updateObject = function (n) {
                var i = {};
                for (var t in n) t != "$$hashKey" && (i[t] = n[t]);
                r.$parent.inlinerxg = i;
                r.$parent.$eval(r.gridOption.gridMaster.rowUpdateEvent + "(inlinerxg)")
            };
            r.changeSortOrder = function (n) {
                if (n.isSorting) {
                    for (var t = 0; t < r.tableHeadings.length; t++) r.tableHeadings[t].isSorting && (r.tableHeadings[t].sortCss = "sorting", r.tableHeadings[t].activeAscIcon = undefined, r.tableHeadings[t].activeDscIcon = undefined);
                    r.subGridInitillization();
                    n.sortOrder ? (r.SortColumnName = n.sortColumn, r.sortOrder = !1, n.sortCss = "sorting_asc", n.sortOrder = !1, n.activeSortColumn = !1, e.save(r.gridName + "SortColumn", r.SortColumnName), e.save(r.gridName + "SortOrder", r.sortOrder), n.activeAscIcon = !0, n.activeDscIcon = !1) : (r.SortColumnName = n.sortColumn, r.sortOrder = !0, n.activeSortColumn = !0, n.sortCss = "sorting_desc", n.sortOrder = !0, e.save(r.gridName + "SortColumn", r.SortColumnName), e.save(r.gridName + "SortOrder", r.sortOrder), n.activeAscIcon = !1, n.activeDscIcon = !0);
                    angular.isUndefined(r.gridOption.gridMaster.customSortEvents) || (r.getEventNameColumn = u.find(r.gridOption.gridMaster.customSortEvents, {
                        columnName: n.sortColumn
                    })[0], r.getEventNameColumn != undefined && (r.$parent.cColumn = n.sortColumn, r.$parent.cColumnOrder = r.sortOrder, r.$parent.$eval(r.getEventNameColumn.eventName + "(cColumn,cColumnOrder)")));
                    angular.isUndefined(r.gridOption.gridMaster.dbSearch) || (r.$parent.eventObjectCustom = r.dbSearch, r.$parent.orderByColumnGrid = r.SortColumnName, r.$parent.isOrderByColumnGrid = r.sortOrder, r.$parent.cPage = r.$parent.cPage, r.$parent.pSize = r.pageSize, r.$parent.$eval(r.gridOption.gridMaster.customPagging.eventName + "(cPage,pSize,eventObjectCustom,orderByColumnGrid,isOrderByColumnGrid)"))
                }
            };
            r.setTableRows = function (n) {
                switch (n.columnType) {
                    case "textColumn":
                        return r.setTextColumn(n);
                    case "subGridIconColumn":
                        return r.setSubGridColumn(n);
                    case "htmlColumn":
                        return r.setHtmlColumn(n);
                    case "inlineEditColumn":
                        return r.setInlineEditColumn(n);
                    case "imageColumn":
                        return r.setImage(n);
                    case "checkboxColumn":
                        return r.setCheckbox(n);
                    case "dateColumn":
                        return r.setDateColumn(n);
                    case "fileUploadColumn":
                        return r.setFileUploadColumn(n);
                    case "dropdownColumn":
                        return r.setDropdown(n);
                    case "textBoxColumn":
                        return r.setTextBox(n);
                    case "textAreaColumn":
                        return r.setTextArea(n);
                    case "hyperLinkColumn":
                        return r.setHyperLinkcolumn(n);
                    case "actionColumn":
                        return r.setActionColumn(n);
                    case "actionsColumn":
                        return r.setActionsColumn(n);
                    case "dropdownActionsColumn":
                        return r.setDropdownActionsColumn(n);
                    case "colorColumn":
                        return r.setColorColumn(n)
                }
                return ""
            };
            r.setGridTemplates = function () {
                var t = "";
                $.ajax({
                    url: r.gridOption.gridMaster.displayTemplate.templateUrl,
                    async: !1
                }).done(function (n) {
                    t = n
                });
                var i = angular.isUndefined(r.gridOption.gridMaster.displayTemplate.columnPerRow) ? 2 : r.gridOption.gridMaster.displayTemplate.columnPerRow,
                    u = Math.floor(12 / i),
                    n = '<div class="animate-panel"><div class="row" ng-repeat="row in (filteredRxgs =  (templateRows)) | startIndex:currentPage*pageSize | limitTo:pageSize "><div class="col-lg-' + u + '" ng-repeat="rxg in row.dataColumn" >' + t + "<\/div><\/div><\/div>";
                return angular.forEach(r.gridOption.masterTableView.columns, function (t) {
                    t.columnType == "actionsColumn" && (angular.forEach(t.actions, function (t) {
                        var u = t.keyName,
                            i = [];
                        angular.isUndefined(t.event) ? angular.isUndefined(t.navigateUrl) ? angular.isUndefined(t.templatePath) || (i = r._CreateActionColumnIcon(t)) : i = r._CreateActionColumnHyperLink(t) : i = r._CreateActionColumnIconEvent(t);
                        n = n.replace("#" + u + "Text#", i[0]);
                        n = n.replace("#" + u + "event#", i[1])
                    }), angular.isUndefined(t.conditionalActions) || angular.forEach(t.conditionalActions, function (t) {
                        var i = [];
                        angular.forEach(t.conditionalView, function (u) {
                            var e = angular.isUndefined(u.navigateUrl) ? !1 : !0,
                                o = angular.isUndefined(u.event) ? !1 : !0,
                                f = u.keyName;
                            i = e ? r._CreateConditionalActionsColumnHyperLink(u, t.dataFieldColumn) : o ? r._CreateConditionalActionsColumnIconEvent(u, t.dataFieldColumn) : r._CreateConditionalActionsColumnIcon(u, t.dataFieldColumn);
                            n = n.replace("#" + f + "Text#", i[0]);
                            n = n.replace("#" + f + "event#", i[1]);
                            n = n.replace("#" + f + "#", i[2])
                        })
                    }))
                }), n
            };
            r.callFunction = function (n, t) {
                r.$parent.currentRow = t;
                r.$parent.$eval(n + "(currentRow)")
            };
            r.getTotalRows = function () {
                var f = angular.isUndefined(r.gridOption.gridMaster.displayTemplate.columnPerRow) ? 2 : r.gridOption.gridMaster.displayTemplate.columnPerRow,
                    n, o, u, e, t, i, s, h;
                if (r.rxgs.gridObject != null && r.rxgs.gridObject.length > 0)
                    for (o = Math.ceil(r.rxgs.gridObject.length / f), n = new Array(o), u = [], e = 0, t = 0; t < n.length; t++) {
                        for (u = [], i = 0; i < f; i++) s = t * f + i + 1, r.rxgs.gridObject.length >= s && (h = r.rxgs.gridObject[e], u[i] = h, e++);
                        n[t] = {
                            dataColumn: u
                        }
                    }
                r.templateRows = angular.isUndefined(n) ? [] : n
            };
            r.setColorColumn = function (n) {
                var t = "",
                    i;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (i = r.rxgs.gridMaster.groupBy.parentPropertyName, t = ' ng-if="rxg.' + i + ' > 0" '), "" + ('<td "' + t + '"><span bck-color bck-source="rxg.' + n.dataField + '" style="padding-left:44px; padding-bottom:3px;"><\/span><\/td>')
            };
            r.inlineClick = function (n, e) {
                var a, o, v, h, l, c;
                if (activeGridJson = r.gridName, $(".popover").remove(), i.entityFlagChanged = !0, a = angular.isUndefined(r.gridOption.gridMaster.isEncodingRequired) ? !0 : r.gridOption.gridMaster.isEncodingRequired, o = u.find(r.gridOption.masterTableView.columns, {
                    columnType: "inlineClickColumn"
                }), o.length > 0 && !angular.isUndefined(o[0]))
                    if (angular.isUndefined(o[0].templatePath)) {
                        if (!angular.isUndefined(o[0].navigateUrl)) {
                            for (t.activeGrid = r.gridName, t.setJsonObject(n, r.gridName), t.setCurrentEvent(o[0].eventIdentity, r.gridName), t.setJsonArray(r.rxgs.gridObject, r.gridName), t.setFilteredJsonArray(r.filteredRxgs, r.gridName), h = o[0].navigateUrl.split("/:"), l = h[0], c = 1; c < h.length; c++) l += a ? "/" + s.encode(n[h[c]]) : "/" + n[h[c]];
                            f.redirect(l.replace("#", ""))
                        }
                    } else v = angular.isUndefined(o[0].popupCss) ? "" : o[0].popupCs, t.activeGrid = r.gridName, t.setJsonObject(n, r.gridName), t.setCurrentEvent(o[0].eventIdentity, r.gridName), t.setJsonArray(r.rxgs.gridObject, r.gridName), t.setFilteredJsonArray(r.filteredRxgs, r.gridName), r.popupTemplate = {
                        popupCss: v
                    }, r.popupTemplateSrc = {
                        src: o[0].templatePath
                    }, $("#popupTemplate" + r.gridName).modal({
                        backdrop: "static",
                        keyboard: !1
                    }), $("#popupTemplate" + r.gridName).modal("show");
                angular.isUndefined(e) || r.events(n, e)
            };
            r.setTextColumn = function (n) {
                var i = "",
                    s = "",
                    o = angular.isUndefined(n.activeText) ? "" : " | activetext",
                    h = angular.isUndefined(n.activeValueText) ? "" : " : " + n.dataField + "Filter",
                    c = angular.isUndefined(r.gridOption.gridMaster.textTruncate) ? "" : " | texttruncate : '" + r.gridName + "' : '" + n.dataField + "'",
                    e = angular.isUndefined(n.dateFilter) ? "" : " | rxdatefilter ",
                    l = "",
                    u = "",
                    y, f, a, v, p, w, t;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (y = r.rxgs.gridMaster.groupBy.parentPropertyName, u = ' ng-if="rxg.' + y + ' > 0" '), e != "" && n.changeDateFormat && (e = " | rxdatefilter : rxg : '" + n.dataField + "' "), n.dateTimeFormatType != null && (f = "", a = "", n.dateTimeFormatType.isDateTime ? f = rx.appConfiguration.userPreference.userDateFormat + " " + rx.appConfiguration.userPreference.userTimeFormat : n.dateTimeFormatType.isDate ? f = rx.appConfiguration.userPreference.userDateFormat : n.dateTimeFormatType.isTime ? f = rx.appConfiguration.userPreference.userTimeFormat : n.dateTimeFormatType.isCustomFormat && (f = n.dateTimeFormatType.displayDateFormat, a = n.dateTimeFormatType.inputDateFormat), f != "" && (l = " | rxDateTimeFormatter : '" + f + "' : '" + a + "'")), v = angular.isUndefined(n.eventName) ? "" : 'ng-click=events(rxg,"' + n.eventName + '") ', angular.isUndefined(n.activeValueText) || (r[n.dataField + "Filter"] = n.activeValueText), (o != "" || h != "") && (c = ""), angular.isUndefined(n.conditionalColumnCss) ? (i = angular.isUndefined(n.columnCss) ? "" : n.columnCss, p = angular.isUndefined(r.gridOption.gridMaster.inlineEditing) ? !1 : !0, p ? s += '<td ng-init="rxg.isEditMode=true" class="' + i + '"><div ng-show="!rxg.isEditMode">{{rxg.' + n.dataField + '}}<\/div><div ng-show="rxg.isEditMode"><input type="text" class="form-control" id="' + n.dataField + '{{$index}}"/><\/div> <\/td>' : (w = angular.isUndefined(n.tooltip) ? !1 : n.tooltip, t = "", w && (t = 'rx-tip main-object="rxg" property="' + n.dataField + '" tip-trigger="hover" tip-placement="top"', e != "" ? t += "tip-type='date'" : n.dateTimeFormatType != null && (t += " tip-type='date' date-input-format='" + n.dateTimeFormatType.inputDateFormat + "' date-display-format='" + n.dateTimeFormatType.displayDateFormat + "'"), o != "" && (t += "tip-type='checkbox' ", n.activeValueText != undefined && (t += "true-text='" + n.activeValueText.trueText + "' false-text='" + n.activeValueText.falseText + "'"))), s += angular.isUndefined(r.gridOption.gridCss.showTextCss) ? !angular.isUndefined(n.sameAsValue) && n.sameAsValue ? '<td "' + u + '"  class="breakword ' + i + '"><div ' + v + t + ' rx-bind="rxg.' + n.dataField + '"><\/div><\/td>' : '<td "' + u + '"  class="' + i + '"><div ' + v + t + " >{{rxg." + n.dataField + o + h + l + c + e + " }} <\/div><\/td>" : angular.isUndefined(n.eventName) ? !angular.isUndefined(n.sameAsValue) && n.sameAsValue ? '<td "' + u + '" class="breakword ' + i + '"><div  ><span ' + t + ' ng-click="inlineClick(rxg)" class="' + r.gridOption.gridCss.showTextCss + '" rx-bind="rxg.' + n.dataField + '"><\/span><\/div><\/td>' : '<td "' + u + '" class="' + i + '"><div  ><span ' + t + ' ng-click="inlineClick(rxg)" class="' + r.gridOption.gridCss.showTextCss + '">{{rxg.' + n.dataField + o + h + l + c + e + " }} <\/span><\/div><\/td>" : !angular.isUndefined(n.sameAsValue) && n.sameAsValue ? '<td "' + u + '" class="breakword ' + i + '"><div  ><span ' + t + " ng-click='inlineClick(rxg,\"" + n.eventName + '")\' class="' + r.gridOption.gridCss.showTextCss + '" rx-bind="rxg.' + n.dataField + '"><\/span><\/div><\/td>' : '<td "' + u + '" class="' + i + '"><div  ><span ' + t + " ng-click='inlineClick(rxg,\"" + n.eventName + '")\' class="' + r.gridOption.gridCss.showTextCss + '">{{rxg.' + n.dataField + o + h + l + c + e + " }} <\/span><\/div><\/td>")) : (i = angular.isUndefined(n.columnCss) ? "" : n.columnCss, s += !angular.isUndefined(n.sameAsValue) && n.sameAsValue ? '<td "' + u + '" class=\breakword {{getColumnCss(rxg,"' + n.dataField + '")}} ' + i + ' rx-bind="rxg.' + n.dataField + '"><\/td>' : '<td "' + u + '" class={{getColumnCss(rxg,"' + n.dataField + '")}} ' + i + " >{{rxg." + n.dataField + "}}<\/td>"), s
            };
            r.bindHtmlEvent = function (n) {
                return JSON.parse(n)
            };
            r.getMultilingualText = function (n) {
                return rx.language.getPropertyValue(n)
            };
            r.setSubGridColumn = function (n) {
                var u = angular.isUndefined(n.detailKeyField) ? "" : n.detailKeyField,
                    t = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    i = angular.isUndefined(n.eventName) ? "" : "ng-click='openSubGridEvent(rxg,$index)' ",
                    r = angular.isUndefined(rxgs.gridMaster.subGridConfiguration) ? "" : angular.isUndefined(rxgs.gridMaster.subGridConfiguration.collapseIcon) ? "" : rxgs.gridMaster.subGridConfiguration.collapseIcon;
                return "" + ('<td class="' + t + '"><i id="icon-{{rxg.' + n.detailKeyField + '}}"  ' + i + ' class="' + r + '"><\/i><\/td>')
            };
            d = [];
            r.isClose = [];
            r.openSubGridEvent = function (t, i) {
                var e = rx.json.find(r.gridOption.masterTableView.columns, {
                    columnType: "subGridIconColumn"
                }),
                    f;
                if (e != undefined && e.length > 0) {
                    var c = e[0].eventName,
                        l = e[0].templatePath,
                        u = e[0].detailKeyField,
                        s = angular.isUndefined(r.gridOption.gridMaster.subGridConfiguration) ? "" : angular.isUndefined(r.gridOption.gridMaster.subGridConfiguration.collapseIcon) ? "" : r.gridOption.gridMaster.subGridConfiguration.collapseIcon,
                        h = angular.isUndefined(r.gridOption.gridMaster.subGridConfiguration) ? "" : angular.isUndefined(r.gridOption.gridMaster.subGridConfiguration.expandIcon) ? "" : r.gridOption.gridMaster.subGridConfiguration.expandIcon,
                        a = document.getElementById(r.gridName);
                    for (orderBy = o("orderBy"), orderFilteredRxgs = orderBy(r.filteredRxgs, r.SortColumnName, r.sortOrder), r.subgridSrc = l, f = 0; f < orderFilteredRxgs.length; f++) t[u] !== orderFilteredRxgs[f][u] ? (r.isClose[orderFilteredRxgs[f][u]] = !0, $("#icon-" + orderFilteredRxgs[f][u]).removeClass(h).addClass(s), $("#div" + orderFilteredRxgs[f][u]).remove(), $("#td" + orderFilteredRxgs[f][u]).remove(), $("#tr" + orderFilteredRxgs[f][u]).remove()) : (currentIcon = $("#icon-" + t[u]), r.isClose[t[u]] = r.isClose[t[u]] == undefined ? !0 : r.isClose[t[u]], r.isClose[t[u]] ? (r.isClose[t[u]] = !1, currentIcon.removeClass(s).addClass(h), $("#" + a.id + "> tbody > tr").eq(i).after(n('<tr id="tr' + t[u] + '"><td id="td' + t[u] + '" colspan="' + r.gridOption.masterTableView.columns.length + '"><div id="div' + t[u] + '" ng-include src="subgridSrc"><\/div><\/td>')(r))) : ($("#div" + t[u]).remove(), $("#td" + t[u]).remove(), $("#tr" + t[u]).remove(), r.isClose[t[u]] = !0, currentIcon.removeClass(h).addClass(s)))
                }
                r.$parent.rxg = t;
                r.$parent.$eval(c + "(rxg)")
            };
            r.setHtmlColumn = function (n) {
                var u = "",
                    i = "",
                    t = "",
                    f = angular.isUndefined(n.isShowLength) ? !1 : n.isShowLength,
                    e = angular.isUndefined(n.isViewLink) ? !1 : n.isViewLink,
                    o = angular.isUndefined(n.showLinkText) ? "view" : n.showLinkText,
                    s = angular.isUndefined(n.linkCss) ? "" : n.linkCss,
                    h;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (h = r.rxgs.gridMaster.groupBy.parentPropertyName, u = ' ng-if="rxg.' + h + ' > 0" '), r.limitTo = [], r.showDetail = [], angular.isUndefined(n.conditionalColumnCss) ? n.htmlTemplate == undefined ? (i = angular.isUndefined(n.columnCss) ? "" : n.columnCss, angular.isUndefined(r.gridOption.gridCss.showTextCss) ? (t += '<td "' + u + '" id="rxhtmlColumn" ng-init="setLimit(rxg,' + n.limitTo + ",&quot;" + n.dataField + '&quot;,$index)" class="' + i + '"><div><table><tr><td>', f && (t += "{{rxg." + n.dataField + ".length}} "), angular.isUndefined(n.showLengthText) || (t += n.showLengthText), e ? (t += " ( <a class=" + s + " ng-click='showDetails(" + n.limitTo + ",&quot;" + n.dataField + "&quot;,rxg,$index)'>" + o + "<\/a> ) <\/td><\/tr>", t += '<tr ng-repeat="item in rxg.' + n.dataField + "| limitTo:  rxg." + n.dataField + 'limitTo"><td>{{$index + 1}} - {{item.' + n.dataColumns.dataField + " }}<\/td><\/tr><\/table><\/div><\/td>") : t += '<tr ng-repeat="item in rxg.' + n.dataField + '"><td>{{$index + 1}} - {{item.' + n.dataColumns.dataField + " }}<\/td><\/tr><\/table><\/div><\/td>") : (t += '<td "' + u + '" id="rxhtmlColumn" ng-init="setLimit(rxg,' + n.limitTo + ",&quot;" + n.dataField + '&quot;,$index)" class="' + i + '"><div class="' + r.gridOption.gridCss.showTextCss + '"><table><tr><td>', f && (t += "{{rxg." + n.dataField + ".length}} "), angular.isUndefined(n.showLengthText) || (t += n.showLengthText), e ? (t += " ( <a class=" + s + " ng-click='showDetails(" + n.limitTo + ",&quot;" + n.dataField + "&quot;,rxg,$index)'>" + o + "<\/a> ) <\/td><\/tr>", t += '<tr ng-repeat="item in rxg.' + n.dataField + " | limitTo:  rxg." + n.dataField + 'limitTo"><td>{{$index + 1}} - {{item.' + n.dataColumns.dataField + " }}<\/td><\/tr><\/table><\/div><\/td>") : t += '<tr ng-repeat="item in rxg.' + n.dataField + '"><td>{{$index + 1}} - {{item.' + n.dataColumns.dataField + " }}<\/td><\/tr><\/table><\/div><\/td>")) : (i = angular.isUndefined(n.columnCss) ? "" : n.columnCss, t += '<td "' + u + '" class="' + i + '">' + n.htmlTemplate + "<\/td>") : (i = angular.isUndefined(n.columnCss) ? "" : n.columnCss, t += '<td id="rxhtmlColumn" ng-init="setLimit(rxg,' + n.limitTo + ",&quot;" + n.dataField + '&quot;,$index)" class={{getColumnCss(rxg,"' + n.dataField + '")}} ' + i + " ><table><tr><td>", f && (t += "{{rxg." + n.dataField + ".length}} "), angular.isUndefined(n.showLengthText) || (t += n.showLengthText), e ? (t += " ( <a class=" + s + " ng-click='showDetails(" + n.limitTo + ",&quot;" + n.dataField + "&quot;,rxg)'>" + o + "<\/a> ) <\/td><\/tr>", t += '<tr ng-repeat="item in rxg.' + n.dataField + "| limitTo: rxg." + n.dataField + 'limitTo"><td>{{$index + 1}} - {{item.' + n.dataColumns.dataField + " }}<\/td><\/tr><\/table><\/td>") : t += '<tr ng-repeat="item in rxg.' + n.dataField + '"><td>{{$index + 1}} - {{item.' + n.dataColumns.dataField + " }}<\/td><\/tr><\/table><\/td>"), t
            };
            r.setLimit = function (n, t, i) {
                n[i + "limitTo"] = t
            };
            r.showDetails = function (n, t, i) {
                i[t + "limitTo"] = n == i[t + "limitTo"] ? i[t].length : n
            };
            r.inlineToolTipArray = [];
            r.setInlineEditColumn = function (n) {
                var t = "",
                    i = "",
                    u = "",
                    f;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (f = r.rxgs.gridMaster.groupBy.parentPropertyName, u = ' ng-if="rxg.' + f + ' > 0" '), angular.isUndefined(n.conditionalColumnCss) ? (t = angular.isUndefined(n.columnCss) ? "" : n.columnCss, i += '<td "' + u + '" class="' + t + '" ng-init="rxg.isEditMode=false"><div ng-show="!rxg.isEditMode" class="btn-toolbar"><div class="btn-group"><i id="inlineedit{{$index}}"  ng-click="toggleEditMode(rxg,$index)" class="btn btn-default ' + n.edit.editIcon + '"><\/i><i id="inlinedelete{{$index}}" ng-click="deleteObject(rxg,$index)" class="btn btn-default ' + n.del.icon + '"><\/i><\/div><\/div><div ng-show="rxg.isEditMode" class="btn-toolbar "><div class="btn-group"><i id="inlinesave{{$index}}" ng-click="updateObject(rxg,$index)" class="btn btn-default ' + n.edit.saveIcon + '"><\/i><i id="inlinecancel{{$index}}" ng-click="toggleEditMode(rxg,$index)" class="btn btn-default ' + n.edit.cancelIcon + '"><\/i><\/div><\/div><\/td>') : (t = angular.isUndefined(n.columnCss) ? "" : n.columnCss, i += '<td "' + u + '" class={{getColumnCss(rxg,"' + n.dataField + '")}} ' + t + " >{{rxg." + n.dataField + "}}<\/td>"), r.inlineToolTipArray.push({
                    controlId: "inlineedit",
                    title: n.edit.editTitle,
                    placement: angular.isUndefined(n.edit.editTipPlacement) ? "top" : n.edit.editTipPlacement
                }), r.inlineToolTipArray.push({
                    controlId: "inlinedelete",
                    title: n.edit.deleteText,
                    placement: angular.isUndefined(n.edit.deleteTipPlacement) ? "top" : n.edit.deleteTipPlacement
                }), r.inlineToolTipArray.push({
                    controlId: "inlinesave",
                    title: n.edit.saveTitle,
                    placement: angular.isUndefined(n.edit.saveTipPlacement) ? "top" : n.edit.saveTipPlacement
                }), r.inlineToolTipArray.push({
                    controlId: "inlinecancel",
                    title: n.edit.cancelTitle,
                    placement: angular.isUndefined(n.edit.cancelTipPlacement) ? "top" : n.edit.cancelTipPlacement
                }), i
            };
            r.setActionColumn = function (n) {
                var f = angular.isUndefined(n.navigateUrl) ? !1 : !0,
                    t = "",
                    e = angular.isUndefined(n.event) ? !1 : !0,
                    i = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    u;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (u = r.rxgs.gridMaster.groupBy.parentPropertyName, t = ' ng-if="rxg.' + u + ' > 0" '), "" + (f ? '<td "' + t + '" class="' + i + '">' + r._CreateActionColumnHyperLink(n) + "<\/td>" : e ? '<td "' + t + '" class="' + i + '">' + r._CreateActionColumnIconEvent(n) + "<\/td>" : '<td "' + t + '" class="' + i + '">' + r._CreateActionColumnIcon(n) + "<\/td>")
            };
            r._CreateActionColumnHyperLink = function (n) {
                var y = angular.isUndefined(n.hideAction) ? !1 : !0,
                    h = angular.isUndefined(n.windowOpen) ? !1 : n.windowOpen,
                    c = angular.isUndefined(r.gridOption.gridMaster.isEncodingRequired) ? !0 : r.gridOption.gridMaster.isEncodingRequired,
                    l = !angular.isUndefined(r.isTabIndex) && angular.isUndefined(n.isTabIndex) ? ' tabindex="{{getCurrentTabIndex()}}" ' : " ",
                    i = "",
                    u, t, f;
                if (y) {
                    for (t = 0; t < n.hideAction.length; t++) i += n.hideAction[t].dataField + "-rx-" + r.spaceRemover(n.hideAction[t].dataField) + ",";
                    i = 'ng-hide=hideActionLink("' + i + '",rxg) '
                }
                var e = n.navigateUrl.split("/:"),
                    a = e[0],
                    p = angular.isUndefined(n.hyperlinkCss) ? "" : n.hyperlinkCss,
                    w = angular.isUndefined(n.text) ? "" : n.text,
                    v = angular.isUndefined(n.eventIdentity) ? "" : n.eventIdentity,
                    b = angular.isUndefined(n.tooltip) ? !1 : !0,
                    o = "",
                    s = "";
                for (b && (o += 'rx-tip tip-trigger="' + n.tooltip.trigger + '" tip-placement="' + n.tooltip.placement + '"', s = rx.rxString.first(n.tooltip.title, 1) == "@" ? rx.language.getPropertyValue(n.tooltip.title) : n.tooltip.title), u = "", t = 1; t < e.length; t++) u += e[t] + ",";
                return angular.isUndefined(r.gridOption.gridMaster.displayTemplate) ? "<a" + l + 'title="' + s + '" ' + o + " " + i + '  ng-click=\nnavigateUrl(rxg,"' + v + '","' + a + '","' + u + '",' + h + "," + c + ') href="" class="' + p + '" ><i class="' + n.iconCss + '" ><\/i>' + w + "<\/a>" : (f = [], f.push(rx.rxString.first(n.text, 1) == "@" ? rx.language.getPropertyValue(n.text) : n.text), f.push('title="' + s + '"' + o + " " + l + ' ng-click=\nnavigateUrl(rxg,"' + v + '","' + a + '","' + u + '",' + h + "," + c + ") "), f)
            };
            r._CreateActionPopover = function (n, t, i) {
                var h = angular.isUndefined(n.popover.isShowClose) ? !1 : !0,
                    c = angular.isUndefined(n.text) ? "" : n.text,
                    y = angular.isUndefined(n.cssClass) ? "" : n.cssClass,
                    e = "",
                    l = !angular.isUndefined(r.isTabIndex) && angular.isUndefined(n.isTabIndex) ? ' tabindex="{{getCurrentTabIndex()}}" ' : " ",
                    o = "",
                    u = "",
                    a = "",
                    s, f, v;
                return (u = "", isSetTipString = angular.isUndefined(n.tooltip) ? !1 : !0, isSetPopoverString = angular.isUndefined(n.popover) ? !1 : !0, s = "", f = "", isSetTipString && (s = angular.isUndefined(n.tooltip.title) ? "" : isSetTipString && rx.rxString.first(n.tooltip.title, 1) == "@" ? rx.language.getPropertyValue(n.tooltip.title) : n.tooltip.title, o = isSetTipString ? 'rx-tip tip-trigger="' + n.tooltip.trigger + '" tip-placement="' + n.tooltip.placement + '" title="' + s + '"' : ""), isSetPopoverString && (f = angular.isUndefined(n.popover.title) ? "" : isSetPopoverString && rx.rxString.first(n.popover.title, 1) == "@" ? rx.language.getPropertyValue(n.popover.title) : n.popover.title, u = isSetPopoverString ? 'data-toggle="popover"' : "", e = angular.isUndefined(n.popover.closeIconCss) ? "glyphicon glyphicon-remove" : n.popover.closeIconCss), c != "") ? (v = "<span " + o + ">", v + "<span " + l + "" + u + "ng-click='popoverEvents($event,rxg,\"" + n.popover.templatePath + '","' + n.popover.popoverCss + '","' + f + '","' + n.popover.placement + '",' + h + ',"' + e + '")\' class="' + y + '" id="popover_{{$index}}_' + t + "_" + i + '">' + c + "<\/span><\/span>") : (a = "<span " + o + ">", a + "<i " + u + l + "ng-click='popoverEvents($event,rxg,\"" + n.popover.templatePath + '","' + n.popover.popoverCss + '","' + f + '","' + n.popover.placement + '",' + h + ',"' + e + '")\' class="' + n.iconCss + '" id="popover_{{$index}}_' + t + "_" + i + '"><\/i><\/span>')
            };
            r.popoverEvents = function (i, u, f, e, o, s, h, c) {
                var l, a;
                angular.isUndefined(rxgs.gridMaster.selectedRow) || i == undefined || i.stopPropagation();
                $(".popover").remove();
                r.tooltipTemplateSrc = "";
                l = "#" + i.currentTarget.id;
                $(l).popover({
                    trigger: "click",
                    placement: angular.isUndefined(s) ? "right" : s,
                    title: h ? o + '<button type="button" class="pull-right close popover-title-close"  onclick=$(".popover").remove();$(".tooltip").css("display","none")><i class="' + c + '"><\/i><\/button>' : o,
                    html: !0,
                    container: "body",
                    content: function () {
                        return $(l).popover("destroy"), r.$apply(function () {
                            var t = '<div id="includeTemplate' + r.gridName + '" class="' + e + '">' + r.tooltipTemplateSrc + "<\/div>";
                            return n(t)(r)
                        })
                    }
                });
                t.setJsonObject(u, r.gridName);
                t.setJsonArray(r.rxgs.gridObject, r.gridName);
                t.activeGrid = r.gridName;
                t.setFilteredJsonArray(r.filteredRxgs, r.gridName);
                r.$parent.gridcustomize = u;
                a = setTimeout(function () {
                    $(l).popover("show")
                }, 50);
                angular.isUndefined(f) || $.get(f, function (n) {
                    r.tooltipTemplateSrc = n;
                    r.$apply()
                })
            };
            r.events = function (n, i) {
                $(".popover").remove();
                t.setJsonObject(n, r.gridName);
                t.setJsonArray(r.rxgs.gridObject, r.gridName);
                t.activeGrid = r.gridName;
                t.setFilteredJsonArray(r.filteredRxgs, r.gridName);
                r.$parent.gridcustomize = n;
                angular.isUndefined(rxgs.gridMaster.selectedRow) || event.stopPropagation();
                r.$parent.$eval(i + "(gridcustomize)")
            };
            r.hideActionLink = function (n, t) {
                for (var u, f = n.split(","), i = 0; i < f.length - 1; i++)
                    if (u = f[i].split("-rx-"), t[u[0]] == r.spaceRemover(u[1])) return angular.isUndefined(t[r.gridOption.gridMaster.primaryKey]) || $("#" + t[r.gridOption.gridMaster.primaryKey] + " .inner-pipe").html(""), !0;
                return !1
            };
            r.navigateUrl = function (n, i, u, e, o, h) {
                var l, c, a;
                for (angular.isUndefined(rxgs.gridMaster.selectedRow) || event.stopPropagation(), l = e.split(","), t.activeGrid = r.gridName, t.setCurrentEvent(i, r.gridName), t.setJsonArray(r.rxgs.gridObject, r.gridName), t.setFilteredJsonArray(r.filteredRxgs, r.gridName), c = 0; c < l.length - 1; c++) u += o ? n[l[c]] : h ? "/" + s.encode(n[l[c]]) : "/" + n[l[c]];
                angular.isUndefined(r.gridOption.gridMaster.entityLock) ? o ? window.open(u.replace("#", "")) : f.redirect(u.replace("#", "")) : (a = {
                    entityId: n[r.gridOption.gridMaster.primaryKey],
                    entityType: r.gridName,
                    url: u,
                    isWindowOpen: o,
                    isView: !1
                }, r.$parent.eLock = a, r.$parent.entityLock(r.$parent.eLock))
            };
            r.modelPopup = [];
            r._CreateActionColumnIcon = function (n) {
                var c = angular.isUndefined(n.hideAction) ? !1 : !0,
                    t = "",
                    s = !angular.isUndefined(r.isTabIndex) && angular.isUndefined(n.isTabIndex) ? ' tabindex="{{getCurrentTabIndex()}}" ' : " ",
                    i, e, o;
                if (c) {
                    for (i = 0; i < n.hideAction.length; i++) t += n.hideAction[i].dataField + "-rx-" + r.spaceRemover(n.hideAction[i].value) + ",";
                    t = 'ng-hide=hideActionLink("' + t + '",rxg) '
                }
                var p = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    l = angular.isUndefined(n.hyperlinkCss) ? "" : n.hyperlinkCss,
                    a = angular.isUndefined(n.tooltip) ? !1 : !0,
                    v = angular.isUndefined(n.isLink) ? !1 : n.isLink,
                    y = angular.isUndefined(n.text) ? !1 : n.text,
                    u = "",
                    f = "",
                    h = angular.isUndefined(n.eventIdentity) ? "" : n.eventIdentity;
                return (a && (u += 'rx-tip tip-trigger="' + n.tooltip.trigger + '" tip-placement="' + n.tooltip.placement + '"', f = rx.rxString.first(n.tooltip.title, 1) == "@" ? rx.language.getPropertyValue(n.tooltip.title) : n.tooltip.title), e = r.modelPopup.length, r.modelPopup.push({
                    src: angular.isUndefined(n.templatePath) ? "" : n.templatePath,
                    popupCss: angular.isUndefined(n.popupCss) ? "" : n.popupCss
                }), !angular.isUndefined(r.gridOption.gridMaster.displayTemplate)) ? (o = [], o.push(rx.rxString.first(n.text, 1) == "@" ? rx.language.getPropertyValue(n.text) : n.text), o.push('title="' + f + '"' + u + " " + s + " ng-click=actionEvents(rxg," + e + ',"' + h + '") '), o) : v ? "<a" + s + 'href="" ' + u + " " + t + '  title="' + f + '" ng-click=actionEvents(rxg,' + e + ',"' + h + '") class="' + l + '" title="' + n.title + '">' + y + "<\/a>" : "<i " + s + u + " " + t + '  title="' + f + '" ng-click=actionEvents(rxg,' + e + ',"' + h + '") class="' + n.iconCss + '" title="' + n.title + '"><\/i>'
            };
            r._CreateActionColumnIconEvent = function (n) {
                var e = angular.isUndefined(n.text) ? "" : n.text,
                    s = angular.isUndefined(n.cssClass) ? "" : n.cssClass,
                    u = !angular.isUndefined(r.isTabIndex) && angular.isUndefined(n.isTabIndex) ? ' tabindex="{{getCurrentTabIndex()}}" ' : " ",
                    t = "",
                    f = angular.isUndefined(n.tooltip) ? !1 : !0,
                    o = "",
                    i;
                return (f && (o = f && rx.rxString.first(n.tooltip.title, 1) == "@" ? rx.language.getPropertyValue(n.tooltip.title) : n.tooltip.title, t = f ? 'rx-tip tip-trigger="' + n.tooltip.trigger + '" tip-placement="' + n.tooltip.placement + '" title="' + o + '"' : ""), !angular.isUndefined(r.gridOption.gridMaster.displayTemplate)) ? (i = [], i.push(rx.rxString.first(n.text, 1) == "@" ? rx.language.getPropertyValue(n.text) : n.text), i.push(t + " " + u + ' ng-click=events(rxg,"' + n.event + '") '), i) : e != "" ? "<span " + u + "" + t + ' ng-click=events(rxg,"' + n.event + '") class="' + s + '" title="' + n.title + '">' + e + "<\/span>" : "<i " + u + t + ' ng-click=events(rxg,"' + n.event + '") class="' + n.iconCss + '" title="' + n.title + '"><\/i>'
            };
            r.events = function (n, u) {
                $(".popover").remove();
                i.entityFlagChanged = !0;
                t.setJsonObject(n, r.gridName);
                t.setJsonArray(r.rxgs.gridObject, r.gridName);
                t.activeGrid = r.gridName;
                t.setFilteredJsonArray(r.filteredRxgs, r.gridName);
                r.$parent.gridcustomize = n;
                angular.isUndefined(rxgs.gridMaster.selectedRow) || event.stopPropagation();
                r.$parent.$eval(u + "(gridcustomize)")
            };
            r.actionEvents = function (n, u, f) {
                i.vChange = "";
                activeGridJson = r.gridName;
                $(".popover").remove();
                i.entityFlagChanged = !0;
                t.setJsonObject(n, r.gridName);
                t.setCurrentEvent(f, r.gridName);
                t.setJsonArray(r.rxgs.gridObject, r.gridName);
                t.setFilteredJsonArray(r.filteredRxgs, r.gridName);
                t.activeGrid = r.gridName;
                r.popupIndexCount = u;
                r.popupTemplate = {
                    popupCss: r.modelPopup[u].popupCss
                };
                r.popupTemplateSrc = r.modelPopup[u];
                angular.isUndefined(rxgs.gridMaster.selectedRow) || event.stopPropagation();
                $("#popupTemplate" + r.gridName).modal({
                    backdrop: "static",
                    keyboard: !1
                });
                $("#popupTemplate" + r.gridName).modal("show")
            };
            r.setImage = function (n) {
                var f = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    e = angular.isUndefined(n.imageCss) ? "" : n.imageCss,
                    t = angular.isUndefined(n.alternateText) ? "" : n.alternateText,
                    i = "",
                    u;
                return t != "", angular.isUndefined(r.rxgs.gridMaster.groupBy) || (u = r.rxgs.gridMaster.groupBy.parentPropertyName, i = ' ng-if="rxg.' + u + ' > 0" '), "" + ('<td "' + i + '" class="' + f + '"><img src="{{rxg.' + n.dataField + '}}" alt="' + t + '" class="' + e + '" /><\/td>')
            };
            r.setCheckbox = function (n) {
                var u = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    t = "",
                    f = angular.isUndefined(n.eventName) ? "" : n.eventName,
                    i;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (i = r.rxgs.gridMaster.groupBy.parentPropertyName, t = ' ng-if="rxg.' + i + ' > 0" '), "" + ('<td "' + t + '" class="' + u + '"><input ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") ng-change=changeControlValidCheckbox(rxg,"' + f + '","' + n.dataField + '") type="checkbox" class="cursor" ng-model="rxg.' + n.dataField + '"  /><\/td>')
            };
            r.isControlValueChanged = !1;
            r.changeControlValidCheckbox = function (n, t, i) {
                var h, c, l;
                if (angular.isUndefined(rxgs.gridMaster.selectedRow) || event.stopPropagation(), r.isControlValueChanged = !0, t != "" && (r.$parent.rxgData = n, r.$parent.$eval(t + "(rxgData)")), h = u.find(r.rxgs.masterTableView.columns, {
                    dataField: i
                })[0], h != null && h.showHeaderCheckbox && (c = {}, c[i] = !0, r.gridSource != null && (l = u.find(r.gridSource, c), r.checkboxHeaders[i] = l != null && l.length == r.gridSource.length ? !0 : !1)), !angular.isUndefined(r.rxgs.gridMaster.groupBy) && !angular.isUndefined(r.rxgs.gridMaster.groupBy.groupByCheckbox)) {
                    var v = {},
                        y = {},
                        p = {},
                        e, o, f, a = r.rxgs.gridMaster.groupBy.parentPropertyName,
                        w = r.rxgs.gridMaster.groupBy.childPropertyName,
                        s = r.rxgs.gridMaster.groupBy.groupByCheckbox.dataFieldName;
                    angular.isUndefined(r.rxgs.gridMaster.groupBy.groupByCheckbox.isIndeterminant) && angular.isUndefined(r.rxgs.gridMaster.groupBy.groupByCheckbox.isCheckParent) || (v[a] = n[a], p[w] = n[a], o = rx.json.find(r.rxgs.gridObject, v), e = rx.json.find(r.rxgs.gridObject, p)[0], y[s] = !0, f = rx.json.find(o, y));
                    angular.isUndefined(r.rxgs.gridMaster.groupBy.groupByCheckbox.isIndeterminant) || o.length != f.length && f.length != 0 && (e[s] = null);
                    angular.isUndefined(r.rxgs.gridMaster.groupBy.groupByCheckbox.isCheckParent) || (o.length == f.length ? e[s] = !0 : f.length == 0 && (e[s] = !1))
                }
            };
            r.initCheckboxHeader = function (n) {
                var f = u.find(r.rxgs.masterTableView.columns, {
                    dataField: n
                })[0],
                    t, i;
                f != null && f.showHeaderCheckbox && (t = {}, t[n] = !0, r.gridSource != null && (r.checkboxHeaders = r.checkboxHeaders == null ? {} : r.checkboxHeaders, i = u.find(r.gridSource, t), r.checkboxHeaders[n] = i != null && i.length == r.gridSource.length ? !0 : !1))
            };
            r.changeControlValid = function () {
                angular.isUndefined(rxgs.gridMaster.selectedRow) || event.stopPropagation();
                r.isControlValueChanged = !0
            };
            r.setDateColumn = function (n) {
                var u = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    t = "",
                    f = angular.isUndefined(n.textBoxCss) ? "" : n.textBoxCss,
                    e = angular.isUndefined(n.eventName) ? "" : n.eventName,
                    i;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (i = r.rxgs.gridMaster.groupBy.parentPropertyName, t = ' ng-if="rxg.' + i + ' > 0" '), "" + ('<td "' + t + '" class="' + u + '"><input ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") type="text" set-rxgrid rx-date class="' + f + '" rx-model="rxg.' + n.dataField + '" ng-model="rxg.' + n.dataField + '1" ng-change=changeControlEvent(rxg,"' + e + '")  /><\/td>')
            };
            r.setFileUploadColumn = function (n) {
                var i;
                r.checkUpdateScopeObject(n);
                var u = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    f = "",
                    t = "",
                    o = angular.isUndefined(n.textBoxCss) ? "" : n.textBoxCss,
                    e = angular.isUndefined(n.url) ? "" : n.url;
                angular.isUndefined(r.rxgs.gridMaster.groupBy) || (i = r.rxgs.gridMaster.groupBy.parentPropertyName, t = ' ng-if="rxg.' + i + ' > 0" ');
                f += '<td "' + t + '" class="' + u + '"><input ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '")  type="file" rx-fileupload url="' + e + '" name="files[]" ng-model="rxg.' + n.dataField + '" upload-event=\fileUploadEvent(rxg,"' + n.jsonObjectName + '","' + n.dataField + '",uploadFile)  /><\/td>'
            };
            r.dropdownSourceInit = function (n, t, i) {
                r.$parent.rxgDrpData = n;
                n["grid" + i + "s"] = r.$parent.$eval(t + "(rxgDrpData)")
            };
            r.setDropdown = function (n) {
                var i = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    h = "",
                    t = "",
                    u = angular.isUndefined(n.dropdownCss) ? "" : n.dropdownCss,
                    f = angular.isUndefined(n.textColumn) ? "" : n.textColumn,
                    e = angular.isUndefined(n.valueColumn) ? "" : n.valueColumn,
                    o = angular.isUndefined(n.eventName) ? "" : n.eventName,
                    s = angular.isUndefined(n.selectChange) ? 'ng-change="changeControlValid()"' : 'ng-change="selectChangeEvent(rxg)"',
                    c;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (c = r.rxgs.gridMaster.groupBy.parentPropertyName, t = ' ng-if="rxg.' + c + ' > 0" '), angular.isUndefined(n.eventSource) ? (r["grid" + n.dataField + "s"] = n.source, h += !angular.isUndefined(n.inlineEditConditional) && n.inlineEditConditional ? o != "" ? '<td "' + t + '" class="' + i + '"><div  ng-show="!conditionalShowBox">{{rxg.' + n.dataField + '}}<\/div><div ng-show="conditionalShowBox"><select ng-init  ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + u + '" ng-model="rxg.' + n.dataField + '" ng-options="rxDrpObj.' + e + " as rxDrpObj." + f + " for rxDrpObj in grid" + n.dataField + 's" ng-change=changeControlEvent(rxg,"' + o + '")  /><\/div><\/td>' : '<td "' + t + '" class="' + i + '"><div   ng-show="!conditionalShowBox">{{rxg.' + n.dataField + '}}<\/div><div ng-show="conditionalShowBox"><select ' + s + ' ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + u + '" ng-model="rxg.' + n.dataField + '" ng-options="rxDrpObj.' + e + " as rxDrpObj." + f + " for rxDrpObj in grid" + n.dataField + 's" /><\/div><\/td>' : o != "" ? '<td "' + t + '" class="' + i + '"><select      ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + u + '" ng-model="rxg.' + n.dataField + '" ng-options="rxDrpObj.' + e + " as rxDrpObj." + f + " for rxDrpObj in grid" + n.dataField + 's" ng-change=changeControlEvent(rxg,"' + o + '") /><\/td>' : '<td "' + t + '" class="' + i + '"><select  ' + s + ' ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + u + '" ng-model="rxg.' + n.dataField + '" ng-options="rxDrpObj.' + e + " as rxDrpObj." + f + " for rxDrpObj in grid" + n.dataField + 's" /><\/td>') : h += !angular.isUndefined(n.inlineEditConditional) && n.inlineEditConditional ? o != "" ? '<td "' + t + '" class="' + i + '"><div ng-show="!conditionalShowBox">{{rxg.' + n.dataField + '}}<\/div><div  ng-show="conditionalShowBox"><select ng-init=dropdownSourceInit(rxg,"' + n.eventSource + '","' + n.dataField + '")  ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + u + '" ng-model="rxg.' + n.dataField + '" ng-options="rxDrpObj.' + e + " as rxDrpObj." + f + " for rxDrpObj in rxg.grid" + n.dataField + 's" ng-change=changeControlEvent(rxg,"' + o + '")  /><\/div><\/td>' : '<td "' + t + '" class="' + i + '"><div ng-show="!conditionalShowBox">{{rxg.' + n.dataField + '}}<\/div><div ng-show="conditionalShowBox"><select  ng-init=dropdownSourceInit(rxg,"' + n.eventSource + '","' + n.dataField + '") ' + s + ' ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + u + '" ng-model="rxg.' + n.dataField + '" ng-options="rxDrpObj.' + e + " as rxDrpObj." + f + " for rxDrpObj in rxg.grid" + n.dataField + 's" /><\/div><\/td>' : o != "" ? '<td "' + t + '" class="' + i + '"><select ng-init=dropdownSourceInit(rxg,"' + n.eventSource + '","' + n.dataField + '")  ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + u + '" ng-model="rxg.' + n.dataField + '" ng-options="rxDrpObj.' + e + " as rxDrpObj." + f + " for rxDrpObj in rxg.grid" + n.dataField + 's" ng-change=changeControlEvent(rxg,"' + o + '")  /><\/td>' : '<td "' + t + '" class="' + i + '"><select  ng-init=dropdownSourceInit(rxg,"' + n.eventSource + '","' + n.dataField + '") ' + s + ' ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + u + '" ng-model="rxg.' + n.dataField + '" ng-options="rxDrpObj.' + e + " as rxDrpObj." + f + " for rxDrpObj in rxg.grid" + n.dataField + 's" /><\/td>', h
            };
            r.selectChangeEvent = function () {
                r.isControlValueChanged = !0
            };
            r.setTextBox = function (n) {
                var u = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    t = "",
                    f = angular.isUndefined(n.textBoxCss) ? "" : n.textBoxCss,
                    e = angular.isUndefined(n.eventName) ? "" : n.eventName,
                    h = angular.isUndefined(n.conditionalDisabled) ? !1 : !0,
                    i = "",
                    o = angular.isUndefined(n.maxLength) ? "" : 'maxlength="' + n.maxLength + '"',
                    s;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (s = r.rxgs.gridMaster.groupBy.parentPropertyName, t = ' ng-if="rxg.' + s + ' > 0" '), angular.isUndefined(n.decimalNumber) || (i = n.decimalNumber ? "rx-grid-decimal='true' rx-decimal = '" + n.decimalPoint + "'" : "rx-number"), "" + (h ? !angular.isUndefined(n.inlineEditConditional) && n.inlineEditConditional ? '<td "' + t + '" class="' + u + '"><div ng-show="!conditionalShowBox">{{rxg.' + n.dataField + '}}<\/div><div ng-show="conditionalShowBox"><input type="text" ' + i + " " + o + ' ng-disabled=conditnalDisabledTextbox(rxg,"' + n.dataField + '") class="' + f + '" ng-model="rxg.' + n.dataField + '" ng-change=changeControlEvent(rxg,"' + e + '")  /><\/div><\/td>' : '<td  "' + t + '"class="' + u + '"><input  ' + i + " " + o + '   type="text" ng-disabled=conditnalDisabledTextbox(rxg,"' + n.dataField + '") class="' + f + '" ng-model="rxg.' + n.dataField + '" ng-change=changeControlEvent(rxg,"' + e + '")  /><\/td>' : !angular.isUndefined(n.inlineEditConditional) && n.inlineEditConditional ? '<td "' + t + '" class="' + u + '"><div ng-show="!conditionalShowBox">{{rxg.' + n.dataField + '}}<div><div ng-show="conditionalShowBox"><input type="text"  ' + i + " " + o + '  ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + f + '" ng-model="rxg.' + n.dataField + '" ng-change=changeControlEvent(rxg,"' + e + '")  /><\/div><\/td>' : '<td "' + t + '" class="' + u + '"><input type="text"  ' + i + " " + o + ' ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '") class="' + f + '" ng-model="rxg.' + n.dataField + '" ng-change=changeControlEvent(rxg,"' + e + '")  /><\/td>')
            };
            r.conditnalDisabledTextbox = function (n, t) {
                var i, f;
                if (!angular.isUndefined(r.gridOption.gridMaster.conditionalDisableds) && (i = u.find(r.gridOption.gridMaster.conditionalDisableds, {
                    dataField: t.trim()
                }), i.length > 0))
                    for (f = 0; f < i[0].source.length; f++)
                        if (n[i[0].source[f].dataField] == i[0].source[f].value) return !0;
                return r.isReadOnlyControl ? !0 : !1
            };
            r.setTextArea = function (n) {
                var u = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    t = "",
                    f = angular.isUndefined(n.textAreaCss) ? "" : n.textAreaCss,
                    e = n.rows,
                    o = n.cols,
                    i;
                return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (i = r.rxgs.gridMaster.groupBy.parentPropertyName, t = ' ng-if="rxg.' + i + ' > 0" '), "" + ('<td "' + t + '" class="' + u + '"><textarea  rows="' + e + '" cols="' + o + '" class="' + f + '" ng-disabled=isReadOnlyHtmlControl(rxg,"' + n.dataField + '")  ng-model="rxg.' + n.dataField + '" ng-change=changeControlEvent(rxg,"' + n.jsonObjectName + '","{{rxg.' + n.dataField + '}}","' + n.dataField + '",3)  ><\/textarea><\/td>')
            };
            r.setHyperLinkcolumn = function (n) {
                var t = "",
                    i;
                return t = angular.isUndefined(n.columnCss) ? "" : n.columnCss, hideColumnCondition = "", angular.isUndefined(r.rxgs.gridMaster.groupBy) || (i = r.rxgs.gridMaster.groupBy.parentPropertyName, hideColumnCondition = ' ng-if="rxg.' + i + ' > 0" '), "" + ('<td "' + hideColumnCondition + '" class="' + t + '">' + r._CreateHyperLink(n) + "<\/td>")
            };
            r.getEncodedString = function (n) {
                return s.encode(n)
            };
            r.setConditionalHyperLink = function (n, t) {
                for (var e, o, f = u.find(r.gridOption.gridMaster.conditionalHyperLink, {
                    dataField: t
                }), i = 0; i < f.length; i++)
                    if (n[f[i].dataValueField] == f[i].value) {
                        for (e = f[i].navigateUrl.split(":"), o = e[0], i = 1; i < e.length; i++) o += s.encode(n[e[i]]);
                        return o
                    }
            };
            r.getCurrentTabIndex = function () {
                return r.gridOption.gridMaster.tabIndex
            };
            r._CreateHyperLink = function (n) {
                var s = angular.isUndefined(n.activeText) ? "" : " | activetext",
                    l = angular.isUndefined(n.activeValueText) ? "" : " : " + n.dataField + "Filter",
                    a = angular.isUndefined(r.gridOption.gridMaster.textTruncate) ? "" : " | texttruncate : '" + r.gridName + "' : '" + n.dataField + "'",
                    h = angular.isUndefined(n.dateFilter) ? "" : " | rxdatefilter ",
                    p = angular.isUndefined(n.isStaticUrl) ? !1 : n.isStaticUrl,
                    w = angular.isUndefined(n.protocolAvailable) ? !1 : n.protocolAvailable,
                    v = angular.isUndefined(n.targetBlank) ? "" : 'target="blank"',
                    f = !angular.isUndefined(r.isTabIndex) && angular.isUndefined(n.isTabIndex) ? ' tabindex="{{getCurrentTabIndex()}}" ' : " ",
                    e = "",
                    c = "",
                    i = angular.isUndefined(n.hyperlinkCss) ? "" : n.hyperlinkCss,
                    b = angular.isUndefined(r.gridOption.gridMaster.conditionalHyperLink) ? !1 : !0,
                    y = undefined,
                    k = angular.isUndefined(n.tooltip) ? !1 : n.tooltip,
                    t = "",
                    o;
                if (k && (t = 'rx-tip main-object="rxg" property="' + n.dataField + '" tip-trigger="hover" tip-placement="top"', h != "" && (t += "tip-type='date'"), s != "" && (t += "tip-type='checkbox' ", n.activeValueText != undefined && (t += "true-text='" + n.activeValueText.trueText + "' false-text='" + n.activeValueText.falseText + "'"))), b && (y = u.find(r.gridOption.gridMaster.conditionalHyperLink, {
                    dataField: n.dataField
                })[0]), angular.isUndefined(n.navigateUrlDataField)) {
                    if (y == undefined) {
                        for (e = n.navigateUrl.split(":"), c = e[0], i = angular.isUndefined(n.hyperlinkCss) ? "" : n.hyperlinkCss, o = 1; o < e.length; o++) c += "{{getEncodedString(rxg." + e[o] + ")}}";
                        return "<span " + t + "><a" + f + ' href="' + c + '" class="' + i + '" >{{rxg.' + n.dataField + s + l + a + h + "}}<\/a><\/span>"
                    }
                    return "<span " + t + "><a" + f + ' href={{setConditionalHyperLink(rxg,"' + n.dataField + '")}} class="' + i + '" >{{rxg.' + n.dataField + s + l + a + h + "}}<\/a><\/span>"
                }
                if (p) return w ? "<a " + f + t + " " + v + ' href="{{rxg.' + n.navigateUrlDataField + '}}" class="' + i + '">{{rxg.' + n.dataField + "}}<\/a>" : "<a " + f + t + " " + v + ' href="' + window.location.protocol + "//{{rxg." + n.navigateUrlDataField + '}}" class="' + i + '">{{rxg.' + n.dataField + "}}<\/a>"
            };
            r.changeControlEvent = function (n, t) {
                t != "" && (r.isControlValueChanged = !0, r.$parent.rxgRow = n, r.$parent.$eval(t + "(rxgRow)"))
            };
            r.spaceRemover = function (n) {
                for (var i = n.split(" "), u = i.length - 1, r = "", t = 0; t < i.length; t++) r += u == t ? i[t] : i[t] + "_";
                return r
            };
            r.spaceReplacer = function (n) {
                for (var i = n.split("_"), u = i.length - 1, r = "", t = 0; t < i.length; t++) r += u == t ? i[t] : i[t] + " ";
                return r
            };
            r.commaSplitter = function (n) {
                return n.split(",")
            };
            r.setActionsColumn = function (n) {
                var i;
                if (!n.isActionColumnsDisable) {
                    var t = "",
                        u = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                        f = angular.isUndefined(n.actions) ? !1 : !0,
                        e = v != "" ? v : "";
                    return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (i = r.rxgs.gridMaster.groupBy.parentPropertyName, t = ' ng-if="rxg.' + i + ' > 0" '), _actionColumnHtml = '<td "' + t + '" class="' + u + '"><div id="{{rxg.' + e + '}}" >', _conditionalActions = angular.isUndefined(n.conditionalActions) ? !1 : !0, _innerIconCss = angular.isUndefined(n.innerIconCss) ? "rx-iconspacing" : n.innerIconCss, _iconsSpacing = 0, _conditionalHtml = "", _columnIndex = r.gridOption.masterTableView.columns.indexOf(n), f && angular.forEach(n.actions, function (t) {
                        if (angular.isUndefined(t.isActionColumnHide) || t.isActionColumnHide) {
                            if (r.gridOption.gridMaster.permissionCode != undefined) {
                                if (!t.showAction) return ""
                            } else if (t.eventIdentity == "copy" && !n.isEditAddVisible || t.eventIdentity == "edit" && !n.isEditVisible || t.eventIdentity == "delete" && !n.isDeleteVisible) return "";
                            var u = angular.isUndefined(t.navigateUrl) ? !1 : !0,
                                f = angular.isUndefined(t.event) ? !1 : !0,
                                e = angular.isUndefined(t.popover) ? !1 : !0,
                                i = _iconsSpacing == 0 ? "" : '<span  class="' + _innerIconCss + '">|<\/span>';
                            _actionColumnHtml += u ? i + r._CreateActionColumnHyperLink(t) : f ? i + r._CreateActionColumnIconEvent(t) : e ? i + r._CreateActionPopover(t, _iconsSpacing, _columnIndex) : i + r._CreateActionColumnIcon(t);
                            _iconsSpacing++
                        }
                    }), _conditionalActions && angular.forEach(n.conditionalActions, function (n) {
                        angular.forEach(n.conditionalView, function (t) {
                            var u = angular.isUndefined(t.navigateUrl) ? !1 : !0,
                                f = angular.isUndefined(t.event) ? !1 : !0,
                                e = v != "" ? v : "",
                                o = r.getConditionalIconId(e, t),
                                i = _iconsSpacing == 0 ? "" : '<i id="' + o + '" class="' + _innerIconCss + '"><\/i>';
                            _actionColumnHtml += u ? i + r._CreateConditionalActionsColumnHyperLink(t, n.dataFieldColumn) : f ? i + r._CreateConditionalActionsColumnIconEvent(t, n.dataFieldColumn) : i + r._CreateConditionalActionsColumnIcon(t, n.dataFieldColumn)
                        })
                    }), _actionColumnHtml += "<\/div>" + _conditionalHtml + "<\/td>", "" + _actionColumnHtml
                }
                return ""
            };
            r.getConditionalIconId = function (n, t) {
                var i, r, u;
                if (angular.isString(t.value))
                    for (i = t.value.trim().split(" "), r = i[0], u = 1; u < i.length; u++) r += "_" + i[u];
                else r = t.value;
                return "{{rxg." + n + "}}a" + r
            };
            r._CreateConditionalActionsColumnHyperLink = function (n, t) {
                for (var o, u, b, h, e, f = n.navigateUrl.split(":"), s = f[0], a = angular.isUndefined(n.hyperlinkCss) ? "" : n.hyperlinkCss, c = v != "" ? v : "", y = angular.isUndefined(n.text) ? "" : n.text, p = f.length - 1, l = !angular.isUndefined(r.isTabIndex) && angular.isUndefined(n.isTabIndex) ? ' tabindex="{{getCurrentTabIndex()}}" ' : " ", w = !angular.isUndefined(r.pipeSymbol) && angular.isUndefined(n.pipeSymbol) ? "rx-pipeicon" : "", i = 1; i < f.length; i++) s += i == p ? "{{rxg." + f[i] + "}}" : "{{rxg." + f[i].replace("/", "") + "}}/";
                if (angular.isString(n.value)) {
                    for (o = n.value.trim().split(" "), u = o[0], i = 1; i < o.length; i++) u += "_" + o[i];
                    _eventString = '{{getActionsConditionalView(rxg,"' + t + '","' + u + '","' + v + '",$index)}}'
                } else _eventString = '{{getActionsConditionalView(rxg,"' + t + '",' + n.value + ',"' + v + '",$index)}}', u = n.value;
                return (b = "", h = angular.isUndefined(n.tooltip) ? !1 : !0, _tipTitle = h ? rx.rxString.first(n.tooltip.title, 1) == "@" ? rx.language.getPropertyValue(n.tooltip.title) : n.tooltip.title : "", tipstring = h ? 'rx-tip tip-trigger="' + n.tooltip.trigger + '" tip-placement="' + n.tooltip.placement + '" title="' + _tipTitle + '"' : "", !angular.isUndefined(r.gridOption.gridMaster.displayTemplate)) ? (e = [], e.push(rx.rxString.first(n.text, 1) == "@" ? rx.language.getPropertyValue(n.text) : n.text), e.push('id="{{rxg.' + c + "}}a" + u + '" ' + tipstring + " " + l + ' href="' + s + '" '), e.push(_eventString), e) : '<span id="{{rxg.' + c + "}}a" + u + '" class="' + w + '"><a' + l + 'href="' + s + '" class="' + a + '" ><i class="' + n.iconCss + '"><\/i>' + y + "<\/a><\/span>" + _eventString
            };
            r._CreateConditionalActionsColumnIcon = function (n, t) {
                var a = angular.isUndefined(n.value) ? "" : n.value,
                    o = 0,
                    c = v != "" ? v : "",
                    s, f, i, e, l, h, u;
                if (_eventString = "", s = !angular.isUndefined(r.isTabIndex) && angular.isUndefined(n.isTabIndex) ? ' tabindex="{{getCurrentTabIndex()}}" ' : " ", isPopupEnabled = !angular.isUndefined(n.templatePath) && angular.isUndefined(n.event) ? !0 : !1, o = r.modelPopup.length, _pipeSymbol = !angular.isUndefined(r.pipeSymbol) && angular.isUndefined(n.pipeSymbol) ? "rx-pipeicon" : "", r.modelPopup.push({
                    src: angular.isUndefined(n.templatePath) ? "" : n.templatePath,
                    popupCss: angular.isUndefined(n.popupCss) ? "" : n.popupCss
                }), angular.isString(n.value)) {
                    for (f = n.value.trim().split(" "), i = f[0], e = 1; e < f.length; e++) i += "_" + f[e];
                    _eventString = '{{getActionsConditionalView(rxg,"' + t + '","' + i + '","' + v + '",$index)}}'
                } else _eventString = '{{getActionsConditionalView(rxg,"' + t + '",' + n.value + ',"' + v + '",$index)}}', i = n.value;
                return (l = "", h = angular.isUndefined(n.tooltip) ? !1 : !0, _tipTitle = h ? rx.rxString.first(n.tooltip.title, 1) == "@" ? rx.language.getPropertyValue(n.tooltip.title) : n.tooltip.title : "", tipstring = h ? 'rx-tip tip-trigger="' + n.tooltip.trigger + '" tip-placement="' + n.tooltip.placement + '" title="' + _tipTitle + '"' : "", !angular.isUndefined(r.gridOption.gridMaster.displayTemplate)) ? (u = [], u.push(rx.rxString.first(n.text, 1) == "@" ? rx.language.getPropertyValue(n.text) : n.text), u.push('id="{{rxg.' + c + "}}a" + i + '" ' + tipstring + " " + s + ' ng-click="actionEvents(rxg,' + o + ')" '), u.push(_eventString), u) : '<span id="{{rxg.' + c + "}}a" + i + '" class="' + _pipeSymbol + '"><i' + s + tipstring + '  ng-click="actionEvents(rxg,' + o + ')" class="' + n.iconCss + '" title="' + n.title + '"><\/i><\/span>' + _eventString
            };
            r._CreateConditionalActionsColumnIconEvent = function (n, t) {
                var a = angular.isUndefined(n.value) ? "" : n.value,
                    s = v != "" ? v : "",
                    o, h, f, i, e, u;
                if (_eventString = "", o = !angular.isUndefined(r.isTabIndex) && angular.isUndefined(n.isTabIndex) ? ' tabindex="{{getCurrentTabIndex()}}" ' : " ", h = !angular.isUndefined(r.pipeSymbol) && angular.isUndefined(n.pipeSymbol) ? "rx-pipeicon" : "", angular.isString(n.value)) {
                    for (f = n.value.trim().split(" "), i = f[0], e = 1; e < f.length; e++) i += "_" + f[e];
                    _eventString = '{{getActionsConditionalView(rxg,"' + t + '","' + i + '","' + v + '",$index)}}'
                } else _eventString = '{{getActionsConditionalView(rxg,"' + t + '",' + n.value + ',"' + v + '",$index)}}', i = n.value;
                var c = angular.isUndefined(n.tooltip) ? !1 : !0,
                    l = c ? rx.rxString.first(n.tooltip.title, 1) == "@" ? rx.language.getPropertyValue(n.tooltip.title) : n.tooltip.title : "";
                return (tipstring = c ? 'rx-tip tip-trigger="' + n.tooltip.trigger + '" tip-placement="' + n.tooltip.placement + '" title="' + l + '"' : "", !angular.isUndefined(r.gridOption.gridMaster.displayTemplate)) ? (u = [], u.push(rx.rxString.first(n.text, 1) == "@" ? rx.language.getPropertyValue(n.text) : n.text), u.push('id="{{rxg.' + s + "}}a" + i + '" ' + tipstring + " " + o + ' ng-click=events(rxg,"' + n.event + '") '), u.push(_eventString), u) : '<span id="{{rxg.' + s + "}}a" + i + '" class="' + h + '"><i ' + o + tipstring + '  ng-click=events(rxg,"' + n.event + '") class="' + n.iconCss + '" title="' + n.title + '"><\/i><\/span>' + _eventString
            };
            r.getActionsConditionalView = function (n, t, i, r) {
                var h, o, f, c, s, e, l, a, v, y;
                if (angular.isString(i))
                    for (h = i.trim().split("_"), o = h[0], e = 1; e < h.length; e++) o += " " + h[e];
                else o = i;
                for (f = {}, f.columnType = "actionsColumn", c = u.find(rxgs.masterTableView.columns, f), s = [], e = 0; e < c.length; e++)
                    if (f = {}, f.dataFieldColumn = t, l = u.find(c[e].conditionalActions, f), f = {}, f.value = o, l.length != 0 && (s = u.find(l[0].conditionalView, f), s.length > 0)) break;
                return a = "", a = angular.isString(n[t]) ? n[t].trim() : n[t], f = {}, f.value = o, a != o && (f = {}, f.value = o, v = u.find(c, f), s[0] != undefined && (y = "." + s[0].iconCss, $("#" + n[r] + "a" + i).remove())), ""
            };
            r.setDropdownActionsColumn = function (n) {
                var e = angular.isUndefined(n.columnCss) ? "" : n.columnCss,
                    o = angular.isUndefined(n.buttonCss) ? "" : n.buttonCss,
                    s = angular.isUndefined(n.iconCss) ? "" : n.iconCss,
                    h = angular.isUndefined(n.text) ? "" : n.text,
                    c = angular.isUndefined(n.actions) ? !1 : !0,
                    l = v != "" ? v : "",
                    i = "",
                    u, f, t;
                angular.isUndefined(r.rxgs.gridMaster.groupBy) || (u = r.rxgs.gridMaster.groupBy.parentPropertyName, i = ' ng-if="rxg.' + u + ' > 0" ');
                _actionColumnHtml = '<td "' + i + '" class="' + e + '"><div class="btn-group"><button data-toggle="dropdown" class="btn ' + o + ' dropdown-toggle"><i class="' + s + '"><\/i> ' + h + '  <span class="caret"><\/span><\/button><ul class="dropdown-menu pull-right">';
                c && (f = n.actions.length - 1, t = 1, angular.forEach(n.actions, function (n) {
                    var i = angular.isUndefined(n.navigateUrl) ? !1 : !0,
                        u = angular.isUndefined(n.event) ? !1 : !0;
                    _actionColumnHtml += i ? "<li>" + r._CreateActionColumnHyperLink(n) + "<\/li>" : u ? "<li>" + r._CreateActionColumnIconEventText(n) + "<\/li>" : "<li>" + r._CreateActionColumnIconText(n) + "<\/li>";
                    f >= t && (_actionColumnHtml += '<li class="divider"><\/li>', t++)
                }));
                _actionColumnHtml += "<\/ul><\/td>";
                tableDataHtml += _actionColumnHtml
            };
            r.getFooterText = function (n) {
                return !angular.isUndefined(r.gridOption.gridMaster.lables) && !angular.isUndefined(r.gridOption.gridMaster.lables.footer) && !angular.isUndefined(r.gridOption.gridMaster.lables.footer[n]) ? rx.rxString.first(r.gridOption.gridMaster.lables.footer[n], 1) == "@" ? rx.language.getPropertyValue(r.gridOption.gridMaster.lables.footer[n]) : r.gridOption.gridMaster.lables.footer[n] : undefined
            };
            r.setFooterPagingInformation = function () {
                if (!angular.isUndefined(rxgs.gridMaster.showFooterPagging)) {
                    var i = "",
                        n = r.getFooterText("previous"),
                        t = r.getFooterText("next"),
                        u = r.getFooterText("recordText");
                    return n = n == undefined ? "Previous" : n, t = t == undefined ? "Next" : t, u = u == undefined ? "Records" : u, rxgs.gridMaster.showFooterPagging.style == null || rxgs.gridMaster.showFooterPagging.style == "" || rxgs.gridMaster.showFooterPagging.style == rx.appConfiguration.grid.pagingOptions.normal ? i = '<div class="row show-grid"><div class="col-lg-6 col-xs-12" ><div  >{{getPagingString()}}<a ng-show="filteredRxgs.length >0"  class="link-previous" ng-class="disabledPreviousButton()" ng-disabled="currentPage == 0" ng-click="previousPage()" ><i class="icon-double-angle-left small-arrow"><\/i> ' + n + '<\/a><span ng-show="filteredRxgs.length >0"> | <\/span><a ng-show="filteredRxgs.length >0" class="link-next" ng-class="disabledNextButton()" ng-disabled="" ng-click="nextPage()">' + t + ' <i class="icon-double-angle-right small-arrow"><\/i><\/a><\/div><\/div><div class="col-lg-6 col-xs-12" style="padding-top:10px;"><\/div><\/div>' : rxgs.gridMaster.showFooterPagging.style == rx.appConfiguration.grid.pagingOptions.normalPagingRight ? i = '<div class="row show-grid"><div class="col-lg-12 col-xs-12" ><div  >{{getPagingString()}}<span class="pull-right paging-margin"><a ng-show="filteredRxgs.length >0"  class="link-previous" ng-class="disabledPreviousButton()" ng-disabled="currentPage == 0" ng-click="previousPage()" ><i class="icon-double-angle-left small-arrow"><\/i> ' + n + '<\/a><span ng-show="filteredRxgs.length >0"> | <\/span><a ng-show="filteredRxgs.length >0" class="link-next" ng-class="disabledNextButton()" ng-disabled="" ng-click="nextPage()">' + t + ' <i class="icon-double-angle-right small-arrow"><\/i><\/a><\/span><\/div><\/div><\/div>' : rxgs.gridMaster.showFooterPagging.style == rx.appConfiguration.grid.pagingOptions.normalDropdown ? (r.dropDownObject = angular.isUndefined(rxgs.gridMaster.pagingDropdownSource) ? rx.appConfiguration.grid.pagingDropdownSource : rxgs.gridMaster.pagingDropdownSource, i = '<div class="row show-grid"><div class="col-lg-12 col-xs-12 col-md-12 col-sm-12" ><div  >{{getPagingString()}}<select class="span12 form-control paging-dropdown-normal" ng-init="pagging = pageSize" ng-model="pagging" ng-change="changePagging(pagging)" ><option ng-repeat="do in dropDownObject" value="{{do.size}}" ng-selected="do.size == pageSize">{{do.size}}<\/option><\/select><span class="paging-margin"><a ng-show="filteredRxgs.length >0"  class="link-previous" ng-class="disabledPreviousButton()" ng-disabled="currentPage == 0" ng-click="previousPage()" ><i class="icon-double-angle-left small-arrow"><\/i> ' + n + '<\/a><span ng-show="filteredRxgs.length >0"> | <\/span><a ng-show="filteredRxgs.length >0" class="link-next" ng-class="disabledNextButton()" ng-disabled="" ng-click="nextPage()">' + t + ' <i class="icon-double-angle-right small-arrow"><\/i><\/a><\/span><\/div><\/div><\/div>') : rxgs.gridMaster.showFooterPagging.style == rx.appConfiguration.grid.pagingOptions.normalDropdownPagingRight ? (r.dropDownObject = angular.isUndefined(rxgs.gridMaster.pagingDropdownSource) ? rx.appConfiguration.grid.pagingDropdownSource : rxgs.gridMaster.pagingDropdownSource, i = '<div class="row show-grid"><div class="col-lg-5 col-xs-5">{{getPagingString()}}<\/div><div class="col-lg-1 col-xs-1 col-md-1 col-sm-1"><select class="span12 form-control" ng-model="pagging" ng-init="pagging = pageSize" ng-change="changePagging(pagging)" ><option ng-repeat="do in dropDownObject" value="{{do.size}}" ng-selected="do.size == pageSize">{{do.size}}<\/option><\/select><\/div><div class="col-lg-4 pull-right"><span class="pull-right paging-margin"><a ng-show="filteredRxgs.length >0"  class="link-previous" ng-class="disabledPreviousButton()" ng-disabled="currentPage == 0" ng-click="previousPage()" ><i class="icon-double-angle-left small-arrow"><\/i> ' + n + '<\/a><span ng-show="filteredRxgs.length >0"> | <\/span><a ng-show="filteredRxgs.length >0" class="link-next" ng-class="disabledNextButton()" ng-disabled="" ng-click="nextPage()">' + t + ' <i class="icon-double-angle-right small-arrow"><\/i><\/a><\/span><\/div><\/div>') : rxgs.gridMaster.showFooterPagging.style == rx.appConfiguration.grid.pagingOptions.pagingRight ? i = '<div class="row show-grid pull-right"><div class="col-lg-12 col-xs-12" ><div  >{{getPagingString()}}<a ng-show="filteredRxgs.length >0"  class="link-previous" ng-class="disabledPreviousButton()" ng-disabled="currentPage == 0" ng-click="previousPage()" ><i class="icon-double-angle-left small-arrow"><\/i> ' + n + '<\/a><span ng-show="filteredRxgs.length >0"> | <\/span><a ng-show="filteredRxgs.length >0" class="link-next" ng-class="disabledNextButton()" ng-disabled="" ng-click="nextPage()">' + t + ' <i class="icon-double-angle-right small-arrow"><\/i><\/a><\/div><\/div><\/div>' : rxgs.gridMaster.showFooterPagging.style == rx.appConfiguration.grid.pagingOptions.pagingRightDropdown ? (r.dropDownObject = angular.isUndefined(rxgs.gridMaster.pagingDropdownSource) ? rx.appConfiguration.grid.pagingDropdownSource : rxgs.gridMaster.pagingDropdownSource, i = '<div class="row show-grid pull-right"><div class="col-lg-12 col-xs-12 col-md-12 col-sm-12" ><div  >{{getPagingString()}}<select  class="span12 form-control paging-dropdown" ng-init="pagging = pageSize" ng-model="pagging" ng-change="changePagging(pagging)" ><option ng-repeat="do in dropDownObject" value="{{do.size}}" ng-selected="do.size == pageSize">{{do.size}}<\/option><\/select><span class="paging-margin"><a ng-show="filteredRxgs.length >0"  class="link-previous" ng-class="disabledPreviousButton()" ng-disabled="currentPage == 0" ng-click="previousPage()" ><i class="icon-double-angle-left small-arrow"><\/i> ' + n + '<\/a><span ng-show="filteredRxgs.length >0"> | <\/span><a ng-show="filteredRxgs.length >0" class="link-next" ng-class="disabledNextButton()" ng-disabled="" ng-click="nextPage()">' + t + ' <i class="icon-double-angle-right small-arrow"><\/i><\/a><\/span><\/div><\/div><\/div>') : rxgs.gridMaster.showFooterPagging.style == rx.appConfiguration.grid.pagingOptions.pagingLeftDropdownRight && (r.dropDownObject = angular.isUndefined(rxgs.gridMaster.pagingDropdownSource) ? rx.appConfiguration.grid.pagingDropdownSource : rxgs.gridMaster.pagingDropdownSource, i = '<div class="row"><div class="show-grid pull-left col-lg-6 col-md-8 col-sm-8 col-xs-12 "><div  >{{getPagingString()}}<span class="paging-margin"><a ng-show="filteredRxgs.length >0"  class="link-previous" ng-class="disabledPreviousButton()" ng-disabled="currentPage == 0" ng-click="previousPage()" ><i class="icon-double-angle-left small-arrow"><\/i> ' + n + '<\/a><span ng-show="filteredRxgs.length >0"> | <\/span><a ng-show="filteredRxgs.length >0" class="link-next" ng-class="disabledNextButton()" ng-disabled="" ng-click="nextPage()">' + t + ' <i class="icon-double-angle-right small-arrow"><\/i><\/a><\/span><\/div><\/div><div class="show-grid pull-right col-lg-3 col-md-3 col-sm-4 col-xs-12 ng-scope text-xs-right"><select class="span12 form-control paging-dropdown-right" ng-init="pagging = pageSize" ng-model="pagging" ng-change="changePagging(pagging)" ><option ng-repeat="do in dropDownObject" value="{{do.size}}" ng-selected="do.size == pageSize">{{do.size}}<\/option><\/select> ' + u + " <\/div><\/div>"), i
                }
                return ""
            };
            r.changePagging = function (n) {
                !angular.isUndefined(r.gridOption.gridMaster.loadingOnPageChange) && r.gridOption.gridMaster.loadingOnPageChange ? (rx.progress.show(), l(function () {
                    r.changePagingItem(n);
                    rx.progress.hide()
                }, 500)) : r.changePagingItem(n)
            };
            r.changePagingItem = function (n) {
                if (r.currentPage = 0, r.pageSize = parseInt(n), r.$parent.pageSize = n, !angular.isUndefined(r.gridOption.gridMaster.showFooterPagging.pagingDropdownChangeEvent)) {
                    var t = r.gridOption.gridMaster.showFooterPagging.pagingDropdownChangeEvent;
                    r.$parent.$eval(t + "(pageSize)")
                }
            };
            r.addition = function (n, t, i) {
                for (var u = 0, f = 0; f < r.gridSource.length; f++) u = typeof r.gridSource[f][n] == "string" ? u + parseFloat(r.gridSource[f][n].replace(",", "")) : u + r.gridSource[f][n];
                return u = u == 0 ? "" : u, t != null && t == !0 && (u = u.toFixed(2)), i != null && i == !0 && (u = u.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), u
            };
            r.setFooter = function () {
                for (var n, t = '<tfoot><tr class="' + r.setTableHeadingRowCss(rxgs.gridCss) + '">', i = 0; i < r.gridOption.masterTableView.columns.length; i++) n = r.gridOption.masterTableView.columns[i], n.activeColumn == !0 ? t += n.isFooterThousandSeparator != null && n.footerDataField != null && n.isFooterRoundValue != null ? n.footerCSS != null ? '<td class= "' + n.footerCSS + '"><b>{{addition("' + n.footerDataField + '", ' + n.isFooterRoundValue + ", " + n.isFooterThousandSeparator + ")}}<\/b><\/td>" : '<td ><b>{{addition("' + n.footerDataField + '", ' + n.isFooterRoundValue + ", " + n.isFooterThousandSeparator + ")}}<\/b><\/td>" : n.footerDataField != null && n.isFooterRoundValue != null ? n.footerCSS != null ? '<td class= "' + n.footerCSS + '"><b>{{addition("' + n.footerDataField + '", ' + n.isFooterRoundValue + ")}}<\/b><\/td>" : '<td ><b>{{addition("' + n.footerDataField + '", ' + n.isFooterRoundValue + ")}}<\/b><\/td>" : n.footerDataField != null ? n.footerCSS != null ? '<td class= "' + n.footerCSS + '"><b>{{addition("' + n.footerDataField + '")}}<\/b><\/td>' : '<td ><b>{{addition("' + n.footerDataField + '")}}<\/b><\/td>' : '<td colspan="1"><b><\/b><\/td>' : n.columnType == "actionsColumn" && (t += '<td colspan="1"><b>' + n.footerColumnText + "<\/b><\/td>");
                return t + "<\/tfoot>"
            };
            r.getPagingString = function () {
                var t, i, f, e, n, u;
                return angular.isUndefined(r.gridOption.gridMaster.customPagging) ? (t = r.filteredRxgs.length, i = 0, angular.isUndefined(r.rxgs.gridMaster.groupBy) || (f = r.rxgs.gridMaster.groupBy.parentPropertyName, e = rx.linq(r.filteredRxgs).where("t => t." + f + " == 0").toList(), i = e.length, t = t - i), t > r.pageSize && (n = t / r.pageSize, r.currentPage > parseInt(n) && (r.currentPage = parseInt(n)))) : r.customPagggingRecords > r.pageSize && (n = r.customPagggingRecords / r.pageSize, r.currentPage > parseInt(n) && (r.currentPage = parseInt(n))), t == 0 ? (u = r.getFooterText("noResult"), u == undefined ? "No result found." : u) : r.setPagingString()
            };
            r.disabledNextButton = function () {
                var n, t, i, u;
                return !angular.isUndefined(r.filteredRxgs) && !angular.isUndefined(r.filteredRxgs.length) ? angular.isUndefined(r.gridOption.gridMaster.customPagging) ? (n = r.filteredRxgs.length, t = 0, angular.isUndefined(r.rxgs.gridMaster.groupBy) || (i = r.rxgs.gridMaster.groupBy.parentPropertyName, u = rx.linq(r.filteredRxgs).where("t => t." + i + " == 0").toList(), t = u.length, n = n - t), r.currentPage >= n / r.pageSize - 1 ? "previousDisabled" : "") : r.currentPage >= r.customPagggingRecords / r.pageSize - 1 ? "previousDisabled" : "" : ""
            };
            r.disabledPreviousButton = function () {
                return angular.isUndefined(r.gridOption.gridMaster.customPagging) ? r.currentPage != 0 ? "" : "previousDisabled" : r.customPaggingPage != 0 ? "" : "previousDisabled"
            };
            r.customPaggingPage = 0;
            r.nextPage = function () {
                if (angular.isUndefined(r.gridOption.gridMaster.customPagging)) {
                    var n = r.disabledNextButton() == "" ? !0 : !1;
                    n && (!angular.isUndefined(r.gridOption.gridMaster.loadingOnPageChange) && r.gridOption.gridMaster.loadingOnPageChange ? (rx.progress.show(), l(function () {
                        r.setPagingNext();
                        rx.progress.hide()
                    }, 500)) : r.setPagingNext())
                } else r.customPaggingPage >= r.customPagggingRecords / r.pageSize - 1 || (r.customPaggingPage = r.customPaggingPage + 1, angular.isUndefined(r.gridOption.gridMaster.customPagging) || (r.$parent.cPage = r.customPaggingPage + 1, r.$parent.pSize = r.pageSize, r.$parent.eventObjectCustom = r.dbSearch, r.$parent.orderByColumnGrid = r.SortColumnName, r.$parent.isOrderByColumnGrid = r.sortOrder, r.$parent.$eval(r.gridOption.gridMaster.customPagging.eventName + "(cPage,pSize,eventObjectCustom,orderByColumnGrid,isOrderByColumnGrid)")), e.save(r.gridName + "PageIndex", r.customPaggingPage))
            };
            r.setPagingNext = function () {
                var n;
                if (r.setExpandCollapseIcon(), n = r.filteredRxgs.length, !angular.isUndefined(r.rxgs.gridMaster.groupBy)) {
                    var i = r.rxgs.gridMaster.groupBy.parentPropertyName,
                        t = 0,
                        u = rx.linq(r.filteredRxgs).where("t => t." + i + " == 0").toList();
                    t = u.length;
                    n = n - t
                }
                r.currentPage >= n / r.pageSize - 1 || (r.currentPage = r.currentPage + 1, e.save(r.gridName + "PageIndex", r.currentPage))
            };
            r.setExpandCollapseIcon = function () {
                var i, t, n;
                if (!angular.isUndefined(r.rxgs.gridMaster.groupBy) && !angular.isUndefined(r.rxgs.gridMaster.groupBy.collapsibleProperty))
                    for (i = r.rxgs.gridMaster.groupBy.parentPropertyName, collection = r.isResetGridCall ? r.gridSource : angular.isUndefined(r.filteredRxgs) ? r.gridSource : r.filteredRxgs, t = rx.linq(collection).where("t => t." + i + " == 0").toList(), n = 0; n < t.length; n++) r.expandCollapseIcon[t[n][r.rxgs.gridMaster.groupBy.childPropertyName]] = r.rxgs.gridMaster.groupBy.collapsibleProperty.expandIcon
            };
            r.previousPage = function () {
                if (angular.isUndefined(r.gridOption.gridMaster.customPagging)) {
                    var n = r.disabledPreviousButton() == "" ? !0 : !1;
                    n && (!angular.isUndefined(r.gridOption.gridMaster.loadingOnPageChange) && r.gridOption.gridMaster.loadingOnPageChange ? (rx.progress.show(), l(function () {
                        r.prevPagingItem();
                        rx.progress.hide()
                    }, 500)) : r.prevPagingItem())
                } else r.customPaggingPage != 0 && (r.customPaggingPage = r.customPaggingPage - 1, r.$parent.cPage = r.$parent.cPage - 1, r.$parent.pSize = r.pageSize, r.$parent.eventObjectCustom = r.dbSearch, r.$parent.orderByColumnGrid = r.SortColumnName, r.$parent.isOrderByColumnGrid = r.sortOrder, r.$parent.$eval(r.gridOption.gridMaster.customPagging.eventName + "(cPage,pSize,eventObjectCustom,orderByColumnGrid,isOrderByColumnGrid)"), e.save(r.gridName + "PageIndex", r.customPaggingPage))
            };
            r.prevPagingItem = function () {
                r.setExpandCollapseIcon();
                r.currentPage != 0 && (r.currentPage = r.currentPage - 1, e.save(r.gridName + "PageIndex", r.currentPage))
            };
            p = !1;
            r.setPagingString = function () {
                var u, o, s, e, n;
                if (angular.isUndefined(r.gridOption.gridMaster.customPagging)) {
                    if (angular.isUndefined(r.gridOption.gridMaster.displayTemplate)) {
                        if (r.currentPage == 0) {
                            var u = 1,
                                i = r.filteredRxgs.length,
                                f = u * r.pageSize - r.pageSize + 1;
                            return t = u * r.pageSize, angular.isUndefined(r.rxgs.gridMaster.groupBy) || (s = r.rxgs.gridMaster.groupBy.parentPropertyName, masterArray = rx.linq(r.filteredRxgs).where("t => t." + s + " == 0").toList(), masterArrayLength = masterArray.length, i = i - masterArrayLength), t = i < t ? i : t, masterArrayLength = 0, e = p ? "(filtered from " + r.rxgs.gridObject.length + " total entries)" : "", n = r.getFooterText("records"), n = n == undefined ? "Showing #fromNumber# - #toNumber# of #totalNumber# entries " : n, n.replace("#fromNumber#", f).replace("#toNumber#", t).replace("#totalNumber#", i)
                        }
                        var u = r.currentPage + 1,
                            f = u * r.pageSize - r.pageSize + 1,
                            i = r.filteredRxgs.length,
                            t = u * r.pageSize;
                        return angular.isUndefined(r.rxgs.gridMaster.groupBy) || (s = r.rxgs.gridMaster.groupBy.parentPropertyName, masterArray = rx.linq(r.filteredRxgs).where("t => t." + s + " == 0").toList(), masterArrayLength = masterArray.length, i = i - masterArrayLength), t > i && (t = i), e = p ? "(filtered from " + r.rxgs.gridObject.length + " total entries)" : "", n = r.getFooterText("records"), n = n == undefined ? "Showing #fromNumber# - #toNumber# of #totalNumber# entries " : n, n.replace("#fromNumber#", f).replace("#toNumber#", t).replace("#totalNumber#", i)
                    }
                    return r.currentPage == 0 ? (u = 1, o = angular.isUndefined(r.gridOption.gridMaster.displayTemplate.columnPerRow) ? 1 : r.gridOption.gridMaster.displayTemplate.columnPerRow, i = r.rxgs.gridObject.length, f = u * r.pageSize - r.pageSize + 1, t = u * r.pageSize * o, t = i < t ? i : t, e = p ? "(filtered from " + r.rxgs.gridObject.length + " total entries)" : "", n = r.getFooterText("records"), n = n == undefined ? "Showing #fromNumber# - #toNumber# of #totalNumber# entries " : n, n.replace("#fromNumber#", f).replace("#toNumber#", t).replace("#totalNumber#", i)) : (u = r.currentPage + 1, o = angular.isUndefined(r.gridOption.gridMaster.displayTemplate.columnPerRow) ? 1 : r.gridOption.gridMaster.displayTemplate.columnPerRow, f = u * r.pageSize * o - r.pageSize * o + 1, i = r.rxgs.gridObject.length, t = u * r.pageSize * o, t > i && (t = i), e = p ? "(filtered from " + r.rxgs.gridObject.length + " total entries)" : "", n = r.getFooterText("records"), n = n == undefined ? "Showing #fromNumber# - #toNumber# of #totalNumber# entries " : n, n.replace("#fromNumber#", f).replace("#toNumber#", t).replace("#totalNumber#", i))
                }
                if (r.customPaggingPage == 0) {
                    var u = 1,
                        i = r.customPagggingRecords,
                        f = u * r.pageSize - r.pageSize + 1;
                    return t = u * r.pageSize, t = i < t ? i : t, e = p ? "(filtered from " + r.rxgs.gridObject.length + " total entries)" : "", n = r.getFooterText("records"), n = n == undefined ? "Showing #fromNumber# - #toNumber# of #totalNumber# entries " : n, n.replace("#fromNumber#", f).replace("#toNumber#", t).replace("#totalNumber#", i)
                }
                var u = r.customPaggingPage + 1,
                    f = u * r.pageSize - r.pageSize + 1,
                    i = r.customPagggingRecords,
                    t = u * r.pageSize;
                return t > i && (t = i), e = p ? "(filtered from " + r.rxgs.gridObject.length + " total entries)" : "", n = r.getFooterText("records"), n = n == undefined ? "Showing #fromNumber# - #toNumber# of #totalNumber# entries " : n, n.replace("#fromNumber#", f).replace("#toNumber#", t).replace("#totalNumber#", i)
            };
            r.applyDateFilter = function (n, t) {
                var i = [],
                    n;
                r.currentGridSource = r.gridSource;
                n = n && !isNaN(Date.parse(n)) ? Date.parse(n) : 0;
                r.gridSource && r.gridSource.length > 0 && ($.each(r.gridSource, function (r, u) {
                    var f = Date.parse(u[t]);
                    f == n && i.push(u)
                }), r.rxgs.gridObject = i)
            };
            r.search = {};
            r.conditionalShowBox = !1;
            r.setFunctions = function () {
                r.gridSource.isValueChange = function () {
                    return r.isControlValueChanged
                };
                r.gridSource.routeChanges = function () {
                    r.popupTemplate = {
                        popupCss: r.modelPopup[r.popupIndexCount].popupCss
                    };
                    r.popupTemplateSrc = r.modelPopup[r.popupIndexCount];
                    $("#popupTemplate" + r.gridName).modal({
                        backdrop: "static",
                        keyboard: !1
                    });
                    $("#popupTemplate" + r.gridName).modal("show")
                };
                r.gridSource.autoFilter = function (n) {
                    debugger
                    r.currentPage = 0;
                    r.search.$ = n;
                    for (var t = 0; t < r.searchColumns.length; t++) r.search[r.searchColumns[t]] = n;
                    r.subGridInitillization()
                };
                r.subGridInitillization = function () {
                    debugger
                    var i = rx.json.find(r.gridOption.masterTableView.columns, {
                        columnType: "subGridIconColumn"
                    }),
                        n;
                    if (i != undefined && i.length > 0) {
                        var s = i[0].eventName,
                            t = i[0].detailKeyField,
                            u = angular.isUndefined(r.gridOption.gridMaster.subGridConfiguration) ? "" : angular.isUndefined(r.gridOption.gridMaster.subGridConfiguration.collapseIcon) ? "" : r.gridOption.gridMaster.subGridConfiguration.collapseIcon,
                            f = angular.isUndefined(r.gridOption.gridMaster.subGridConfiguration) ? "" : angular.isUndefined(r.gridOption.gridMaster.subGridConfiguration.expandIcon) ? "" : r.gridOption.gridMaster.subGridConfiguration.expandIcon,
                            e = o("orderBy");
                        for (orderFilteredRxgs = e(r.filteredRxgs, r.SortColumnName, r.sortOrder), n = 0; n < orderFilteredRxgs.length; n++) r.isClose[orderFilteredRxgs[n][t]] = !0, $("#icon-" + orderFilteredRxgs[n][t]).removeClass(f).addClass(u), $("#div" + orderFilteredRxgs[n][t]).remove(), $("#td" + orderFilteredRxgs[n][t]).remove(), $("#tr" + orderFilteredRxgs[n][t]).remove()
                    }
                };
                r.gridSource.autoFilterTemplateGrid = function (n) {
                    debugger
                    angular.isUndefined(r.gridOption.gridMaster.displayTemplate) || (r.currentPage = 0, r.rxgs.gridObject = r.tempSearch, r.search.$ = n, r.rxgs.gridObject = angular.isUndefined(r.gridOption.gridMaster.searchColumns) ? o("filter")(r.rxgs.gridObject, r.search.$) : o("rxGridFilter")(r.rxgs.gridObject, r.search.$, r.searchColumns), r.gridSource = r.rxgs.gridObject, r.setGrid())
                };
                r.gridSource.columnFilterTemplateGrid = function (n, t) {
                    angular.isUndefined(r.gridOption.gridMaster.displayTemplate) || (r.currentPage = 0, r.rxgs.gridObject = r.tempSearch, r.search[n] = t, r.rxgs.gridObject = angular.isUndefined(r.gridOption.gridMaster.searchColumns) ? o("filter")(r.rxgs.gridObject, r.search) : o("rxGridFilter")(r.rxgs.gridObject, r.search, r.searchColumns), r.gridSource = r.rxgs.gridObject, r.setGrid())
                };
                r.gridSource.columnFilter = function (n, t) {
                    r.currentPage = 0;
                    r.search[n] = t
                };
                r.gridSource.gridEdit = function (n) {
                    r.conditionalShowBox = n
                };
                r.gridSource.setReadOnlyGrid = function (n) {
                    r.isReadOnlyControl = n
                };
                r.gridSource.getPaggingResult = function () {
                    return r.getPagingString()
                };
                r.gridSource.nextPage = function () {
                    r.nextPage()
                };
                r.gridSource.ascendingRow = function (n) {
                    var i = {},
                        t, f;
                    return (i[n] = r.selectedRowData[n] - 1, t = u.find(r.gridSource, i), t.length > 0) ? (r.isControlValueChanged = !0, f = t[0][n], t[0][n] = r.selectedRowData[n], r.selectedRowData[n] = f, {
                        currentRow: r.selectedRowData,
                        nextRow: t[0]
                    }) : undefined
                };
                r.gridSource.descendingRow = function (n) {
                    var i = {},
                        t, f;
                    return (i[n] = r.selectedRowData[n] + 1, t = u.find(r.gridSource, i), t.length > 0) ? (r.isControlValueChanged = !0, f = t[0][n], t[0][n] = r.selectedRowData[n], r.selectedRowData[n] = f, {
                        currentRow: r.selectedRowData,
                        nextRow: t[0]
                    }) : undefined
                };
                r.gridSource.resetSearch = function () {
                    $(".popover").remove();
                    r.search = {
                        $: ""
                    };
                    r.customSearch = {};
                    r.dbSearch = {};
                    e.save(r.gridName + "Search", {
                        $: ""
                    });
                    $(".read-filter").removeClass("read-filter")
                };
                r.gridSource.resetTemplateGrid = function () {
                    angular.isUndefined(r.gridOption.gridMaster.displayTemplate) || ($(".popover").remove(), r.search = {
                        $: ""
                    }, r.customSearch = {}, r.dbSearch = {}, e.save(r.gridName + "Search", {
                        $: ""
                    }), $(".read-filter").removeClass("read-filter"), e.save(r.gridName + "PageIndex", 0), r.currentPage = 0, r.gridSource = r.tempSearch, r.tableHeadings = [], r.search = {
                        $: ""
                    }, r.customSearch = {}, r.dbSearch = {}, r.isResetGridCall = !0, r.spSearch = !1, r.setGrid())
                };
                r.gridSource.previousPage = function () {
                    r.previousPage()
                };
                r.gridSource.hidePopup = function () {
                    $("#popupTemplate" + r.gridName).modal("hide");
                    $(".modal-backdrop").removeClass("in");
                    $("#bodyElement").removeClass("modal-open");
                    $(".modal-backdrop").addClass("displayNone");
                    i.entityChangeRedirect = !1
                };
                r.gridSource.showPopup = function (n, u) {
                    i.vChange = "";
                    t.setCurrentEvent("add", r.gridName);
                    $(".popover").remove();
                    t.activeGrid = r.gridName;
                    t.setJsonArray(r.rxgs.gridObject, r.gridName);
                    t.setFilteredJsonArray(r.filteredRxgs, r.gridName);
                    r.popupTemplate = {
                        popupCss: n
                    };
                    r.popupTemplateSrc = {
                        src: u
                    };
                    $("#popupTemplate" + r.gridName).removeClass("displayNone");
                    $("#popupTemplate" + r.gridName).modal({
                        backdrop: "static",
                        keyboard: !1
                    });
                    $("#popupTemplate" + r.gridName).modal("show")
                };
                r.gridSource.displayOffPopup = function () {
                    $("#popupTemplate" + r.gridName).addClass("displayNone");
                    r.gridName == "commentGrid" && (r.popupTemplateSrc = {
                        src: "/Scripts/lib/rx/template/blank.html",
                        popupCss: ""
                    })
                };
                r.gridSource.displayOnPopup = function () {
                    $("#popupTemplate" + r.gridName).removeClass("displayNone")
                };
                r.gridSource.showSubPopup = function (n, i) {
                    $("#popupTemplate" + r.gridName).addClass("displayNone");
                    t.activeGrid = r.gridName;
                    t.setJsonArray(r.rxgs.gridObject, r.gridName);
                    t.setFilteredJsonArray(r.filteredRxgs, r.gridName);
                    r.popupTemplate = {
                        popupCss: n
                    };
                    r.subPopupTemplateSrc = {
                        src: i
                    };
                    $("#subpopupTemplate" + r.gridName).hasClass("in") ? $("#subpopupTemplate" + r.gridName).removeClass("displayNone") : ($("#subpopupTemplate" + r.gridName).modal({
                        backdrop: "static",
                        keyboard: !1
                    }), $("#subpopupTemplate" + r.gridName).modal("show"), $("#subpopupTemplate" + r.gridName).addClass("in"), $("#subpopupTemplate" + r.gridName).removeClass("displayNone"))
                };
                r.gridSource.hideSubPopup = function () {
                    i.isPopupHide = !0;
                    $("#popupTemplate" + r.gridName).removeClass("displayNone");
                    r.subPopupTemplateSrc = {
                        src: "/Scripts/lib/rx/template/blank.html"
                    };
                    $("#subpopupTemplate" + r.gridName).addClass("displayNone")
                };
                r.gridSource.setSortSource = function (n) {
                    r.SortColumnName = undefined;
                    r.sortOrder = undefined;
                    r.rxgs.gridObject = n
                };
                r.gridSource.resetGrid = function (n, t, i) {
                    angular.isUndefined(t) ? (e.save(r.gridName + "PageIndex", 0), r.currentPage = 0, r.gridSource = n, r.tableHeadings = [], r.search = {
                        $: ""
                    }, r.customSearch = {}, r.dbSearch = {}, r.isResetGridCall = !0, r.spSearch = !1, r.setGrid()) : (i != undefined && (r.customPaggingPage = i), e.save(r.gridName + "PageIndex", 0), r.currentPage = 0, r.gridSource = n, r.tableHeadings = [], r.search = {
                        $: ""
                    }, r.customSearch = {}, r.isResetGridCall = !0, r.spSearch = !0, r.setGrid())
                };
                r.gridSource.resetGridOptions = function (n) {
                    r.gridOption = n;
                    r.search = {
                        $: ""
                    };
                    r.customSearch = {};
                    r.isResetGridCall = !0;
                    r.setGrid()
                };
                r.isInteger = function (n) {
                    return n === +n && n === (n | 0)
                };
                r.gridSource.exportToCsv = function () {
                    for (var a, w, ut, y, b, f, t, i, e, c, l, h, g = u.find(r.gridOption.masterTableView.columns, {
                        isDataColumn: !0
                    }), n = u.convertToArrary(g, "dataField"), v = u.convertToArrary(g, "headerText"), nt = [], s = 0; s < v.length; s++) v[s] != "Edit" && v[s] != "Delete" && (rx.rxString.first(v[s], 1) == "@" && (v[s] = rx.language.getPropertyValue(v[s])), nt.push(v[s]));
                    v = nt;
                    var p = {
                        columns: v,
                        rows: []
                    },
                        rt = o("orderBy"),
                        k = "";
                    if (angular.isUndefined(r.gridOption.gridMaster.groupBy))
                        for (k = rt(r.filteredRxgs, r.SortColumnName, r.sortOrder), s = 0; s < k.length; s++) {
                            f = k[s];
                            t = [];
                            for (i in n) n[i] != undefined && (f[n[i]] == null ? t.push(" ") : (e = u.find(r.gridOption.masterTableView.columns, {
                                dataField: n[i]
                            })[0], angular.isUndefined(e.searchType) || e.searchType != "checkbox" ? angular.isUndefined(r.gridOption.gridMaster.customSearchCheckbox) ? angular.isUndefined(e.dateFilter) ? t.push(f[n[i]]) : (h = f[n[i]].split("/"), t.push(h[1] + "/" + h[0] + "/" + h[2])) : (c = u.find(r.gridOption.gridMaster.customSearchCheckbox, {
                                dataField: n[i]
                            })[0], angular.isUndefined(c) ? angular.isUndefined(e.dateFilter) ? t.push(f[n[i]]) : (h = f[n[i]].split("/"), t.push(h[1] + "/" + h[0] + "/" + h[2])) : (l = u.find(c.source, {
                                searchValue: f[n[i]]
                            })[0], angular.isUndefined(l) || t.push(l.text))) : f[n[i]] == e.trueValue ? angular.isUndefined(e.activeValueText) ? t.push("Active") : t.push(e.activeValueText.trueText) : angular.isUndefined(e.activeValueText) ? (c = u.find(r.gridOption.gridMaster.customSearchCheckbox, {
                                dataField: n[i]
                            })[0], angular.isUndefined(c) ? t.push("Inactive") : (l = u.find(c.source, {
                                searchValue: f[n[i]]
                            })[0], angular.isUndefined(l) ? t.push(f[n[i]]) : t.push(l.text))) : t.push(e.activeValueText.falseText)));
                            p.rows.push({
                                row: t
                            })
                        } else if (a = r.gridOption.gridMaster.groupBy.parentPropertyName, w = r.gridOption.gridMaster.groupBy.childPropertyName, !angular.isUndefined(r.filteredRxgs) && r.filteredRxgs != null && !angular.isUndefined(a) && a != null && !angular.isUndefined(w) && w != null) {
                            ut = rx.linq(r.filteredRxgs).where("t => t." + a + " == 0").toList();
                            y = rx.linq(r.filteredRxgs).where("t => t." + a + " > 0").toList();
                            y = rx.json.sortBy(y, a);
                            var d = rx.json.uniqueByProperty(y, a),
                                tt = {},
                                it = {};
                            for (s = 0; s < d.length; s++)
                                if (it[w] = d[s][a], b = rx.json.find(r.filteredRxgs, it)[0], b != undefined && (tt[a] = d[s][a], childRecords = rx.json.find(y, tt), childRecords.length > 0)) {
                                    t = [];
                                    for (i in n) n[i] != undefined && (b[n[i]] == null ? t.push("") : t.push(b[n[i]]));
                                    for (p.rows.push({
                                        row: t
                                    }), j = 0; j < childRecords.length; j++) {
                                        f = childRecords[j];
                                        t = [];
                                        for (i in n) n[i] != undefined && (f[n[i]] == null ? t.push(" ") : (e = u.find(r.gridOption.masterTableView.columns, {
                                            dataField: n[i]
                                        })[0], angular.isUndefined(e.searchType) || e.searchType != "checkbox" ? angular.isUndefined(r.gridOption.gridMaster.customSearchCheckbox) ? angular.isUndefined(e.dateFilter) ? t.push(f[n[i]]) : (h = f[n[i]].split("/"), t.push(h[1] + "/" + h[0] + "/" + h[2])) : (c = u.find(r.gridOption.gridMaster.customSearchCheckbox, {
                                            dataField: n[i]
                                        })[0], angular.isUndefined(c) ? angular.isUndefined(e.dateFilter) ? t.push(f[n[i]]) : (h = f[n[i]].split("/"), t.push(h[1] + "/" + h[0] + "/" + h[2])) : (l = u.find(c.source, {
                                            searchValue: f[n[i]]
                                        })[0], angular.isUndefined(l) || t.push(l.text))) : f[n[i]] == e.trueValue ? angular.isUndefined(e.activeValueText) ? t.push("Active") : t.push(e.activeValueText.trueText) : angular.isUndefined(e.activeValueText) ? (c = u.find(r.gridOption.gridMaster.customSearchCheckbox, {
                                            dataField: n[i]
                                        })[0], angular.isUndefined(c) ? t.push("Inactive") : (l = u.find(c.source, {
                                            searchValue: f[n[i]]
                                        })[0], angular.isUndefined(l) ? t.push(f[n[i]]) : t.push(l.text))) : t.push(e.activeValueText.falseText)));
                                        p.rows.push({
                                            row: t
                                        })
                                    }
                                }
                        }
                    return p
                };
                r.gridSource.resetGridOptionColumns = function (n) {
                    var t = setTimeout(function () {
                        r.currentSortColumn = r.SortColumnName;
                        r.currentSortOrder = r.sortOrder;
                        r.isSetGridOptions = !0;
                        r.gridOption.masterTableView.columns = n;
                        r.isResetGridCall = !0;
                        r.setGrid();
                        r.$apply()
                    }, 1e3)
                };
                r.gridSource.getGridColumns = function () {
                    return r.gridOption.masterTableView.columns
                };
                r.gridSource.selectAll = function (n, t) {
                    var f = u.find(r.rxgs.masterTableView.columns, {
                        dataField: n
                    }),
                        i;
                    f != null && f.length > 0 && r.rxgs.gridObject != null && r.rxgs.gridObject.length > 0 && (i = [], i = angular.isUndefined(r.gridOption.gridMaster.searchColumns) ? o("filter")(r.rxgs.gridObject, r.search) : o("rxGridFilter")(r.rxgs.gridObject, r.search, r.searchColumns), angular.isUndefined(r.gridOption.gridMaster.customPagging) ? (i = o("orderBy")(i, r.SortColumnName, r.sortOrder), t || (i = o("startIndex")(i, r.currentPage * r.pageSize), i = o("limitTo")(i, r.pageSize))) : t || (i = o("startIndex")(i, r.currentPage * r.pageSize), i = o("limitTo")(i, r.pageSize)), angular.forEach(i, function (t) {
                        var f = {},
                            i;
                        f[r.rxgs.gridMaster.primaryKey] = t[r.rxgs.gridMaster.primaryKey];
                        i = u.find(r.rxgs.gridObject, f)[0];
                        i != null && (i[n] = !0)
                    }))
                };
                r.gridSource.deSelectAll = function (n, t) {
                    var f = u.find(r.rxgs.masterTableView.columns, {
                        dataField: n
                    }),
                        i;
                    f != null && f.length > 0 && r.rxgs.gridObject != null && r.rxgs.gridObject.length > 0 && (i = [], i = angular.isUndefined(r.gridOption.gridMaster.searchColumns) ? o("filter")(r.rxgs.gridObject, r.search) : o("rxGridFilter")(r.rxgs.gridObject, r.search, r.searchColumns), angular.isUndefined(r.gridOption.gridMaster.customPagging) ? (i = o("orderBy")(i, r.SortColumnName, r.sortOrder), t || (i = o("startIndex")(i, r.currentPage * r.pageSize), i = o("limitTo")(i, r.pageSize))) : t || (i = o("startIndex")(i, r.currentPage * r.pageSize), i = o("limitTo")(i, r.pageSize)), angular.forEach(i, function (t) {
                        var f = {},
                            i;
                        f[r.rxgs.gridMaster.primaryKey] = t[r.rxgs.gridMaster.primaryKey];
                        i = u.find(r.rxgs.gridObject, f)[0];
                        i != null && (i[n] = !1)
                    }))
                };
                r.gridSource.getSelectedRows = function (n, t) {
                    var i, f;
                    if (r.rxgs.gridObject != null && r.rxgs.gridObject.length > 0) return i = [], i = angular.isUndefined(r.gridOption.gridMaster.searchColumns) ? o("filter")(r.rxgs.gridObject, r.search) : o("rxGridFilter")(r.rxgs.gridObject, r.search, r.searchColumns), angular.isUndefined(r.gridOption.gridMaster.customPagging) ? (i = o("orderBy")(i, r.SortColumnName, r.sortOrder), t || (i = o("startIndex")(i, r.currentPage * r.pageSize), i = o("limitTo")(i, r.pageSize))) : t || (i = o("startIndex")(i, r.currentPage * r.pageSize), i = o("limitTo")(i, r.pageSize)), f = {}, f[n] = !0, u.find(i, f)
                }
            };
            r.isReadOnlyHtmlControl = function (n, t) {
                var i, f;
                if (!angular.isUndefined(r.gridOption.gridMaster.conditionalDisableds) && (i = u.find(r.gridOption.gridMaster.conditionalDisableds, {
                    dataField: t.trim()
                }), i.length > 0))
                    for (f = 0; f < i[0].source.length; f++)
                        if (n[i[0].source[f].dataField] == i[0].source[f].value) return !0;
                return r.isReadOnlyControl ? !0 : !1
            };
            v = "";
            r.isResetGridCall = !1;
            r.expandCollapseGroupGrid = function (n, t) {
                var e = {},
                    f = r.rxgs.gridMaster.groupBy.childPropertyName,
                    o = r.rxgs.gridMaster.groupBy.parentPropertyName,
                    u, i;
                for (e[o] = t[f], u = rx.json.find(r.gridSource, e), i = 0; i < u.length; i++) u[i].expandCollapse = u[i].expandCollapse == undefined ? !1 : u[i].expandCollapse, u[i].expandCollapse = u[i].expandCollapse == !0 ? !1 : !0;
                r.rxgs.gridMaster.groupBy.collapsibleProperty != undefined && (r.expandCollapseIcon[t[f]] = r.expandCollapseIcon[t[f]] !== r.rxgs.gridMaster.groupBy.collapsibleProperty.collapseIcon ? r.rxgs.gridMaster.groupBy.collapsibleProperty.collapseIcon : r.rxgs.gridMaster.groupBy.collapsibleProperty.expandIcon)
            };
            r.changeGroupingEvent = function (n) {
                var t, i;
                r.rxgs.gridObject != null && r.rxgs.gridObject.length > 0 && (t = [], angular.isUndefined(r.gridOption.gridMaster.searchColumns) || (t = o("rxGridFilter")(r.rxgs.gridObject, r.search, r.searchColumns, !0, r.rxgs.gridMaster.groupBy.parentPropertyName, r.rxgs.gridMaster.groupBy.childPropertyName)), i = {}, i[r.rxgs.gridMaster.groupBy.parentPropertyName] = n[r.rxgs.gridMaster.groupBy.childPropertyName], t = rx.json.find(r.rxgs.gridObject, i), angular.forEach(t, function (t) {
                    var f = {},
                        i;
                    f[r.rxgs.gridMaster.primaryKey] = t[r.rxgs.gridMaster.primaryKey];
                    i = u.find(r.rxgs.gridObject, f)[0];
                    i != null && (i[r.rxgs.gridMaster.groupBy.groupByCheckbox.dataFieldName] = n[r.rxgs.gridMaster.groupBy.groupByCheckbox.dataFieldName])
                }))
            };
            r.setGrid = function () {
                var f, y, p, h, c, o, d, l, s, e, g;
                if (r.conditionalShowBox = !1, b = !0, w = !1, r.spSearch || (r.customSearch = {}), r.tableWidth = 0, i.entityFlagChanged = undefined, k = "", r.tableHeadings = [], r.setFunctions(), r.createCustomColumn = !0, rxgs = r.rxgs = r.gridOption, r.rxgs.gridObject = r.gridSource, r.expandCollapseIcon = [], rxgs.gridObject = r.gridSource, r.setExpandCollapseIcon(), r.pageSize = angular.isUndefined(rxgs.gridMaster.pageSize) ? 10 : rxgs.gridMaster.pageSize, r.gridName = angular.isUndefined(rxgs.gridMaster.gridName) ? "" : rxgs.gridMaster.gridName, r.isReadOnlyControl = angular.isUndefined(rxgs.gridMaster.readOnlyControl) ? !1 : rxgs.gridMaster.readOnlyControl, v = angular.isUndefined(rxgs.gridMaster.primaryKey) ? "" : rxgs.gridMaster.primaryKey, t.activeGrid = r.gridName, t.setJsonArray(r.rxgs.gridObject, r.gridName), r.searchColumns = angular.isUndefined(r.gridOption.gridMaster.searchColumns) ? [] : r.gridOption.gridMaster.searchColumns, r.isTabIndex = angular.isUndefined(r.gridOption.gridMaster.tabIndex) ? !1 : !0, r.pipeSymbol = angular.isUndefined(r.gridOption.gridMaster.pipeSymbol) ? !1 : !0, r.isTabIndex && (r.tabIndexNumber = r.gridOption.gridMaster.tabIndex), r.currentPage = 0, angular.isUndefined(r.gridOption.gridMaster.customPagging) || angular.isUndefined(r.gridSource[0]) || (r.customPagggingRecords = r.gridSource[0][r.gridOption.gridMaster.customPagging.recordCountColumn]), f = "", !angular.isUndefined(rxgs.gridCss)) {
                    if (angular.isUndefined(r.gridOption.gridMaster.displayTemplate) ? (f = angular.isUndefined(rxgs.gridCss) ? "<table>" : r.setTableCSS(rxgs.gridCss), f += angular.isUndefined(rxgs.gridCss) ? "<thead>" : r.setTableHeadingCss(rxgs.gridCss), y = angular.isUndefined(r.gridOption.gridMaster.autoWidthColumn) ? !1 : r.gridOption.gridMaster.autoWidthColumn, p = u.find(r.gridOption.masterTableView.columns, {
                        activeColumn: !0
                    }), f += '<tr class="' + r.setTableHeadingRowCss(rxgs.gridCss) + '"><th ng-repeat="th in tableHeadings"  id="theading{{gridName}}{{th.sortColumn}}"     class="cursor {{th.headerCss}} {{th.sortCss}}"><div style="float:left; padding-right:5px;"><span  ng-show="th.showSearch" ng-click="showCustomFilter(th)"   id="th{{gridName}}{{th.sortColumn}}" ><i class="icon-filter  rxfilter" ><\/i> <\/span><\/div><div style="float:left; padding-right:5px;"><label ng-show="th.showHeaderCheckbox == true" style="margin-bottom: 18px !important;" class="checkbox-inline grid-header-checkbox "><input type="checkbox" class="cursor" ng-init="initCheckboxHeader(th.dataField)" ng-model="checkboxHeaders[th.dataField]" ng-change="selectAllRecords(th.dataField,checkboxHeaders[th.dataField])"><\/label><\/div><div style="float:left;" ng-click="changeSortOrder(th)">{{th.headerText}}<i class="icon-long-arrow-up icon-2 rx-sort" ng-show="th.activeAscIcon"><\/i><i class="icon-long-arrow-down icon-2 rx-sort" ng-show="th.activeDscIcon"><\/i><\/div><\/th><\/tr><\/thead>', angular.isUndefined(r.gridOption.gridMaster.gridFooter) || (f += r.setFooter()), f += "<tbody>" + r.setconditionalRowCss()) : (r.getTotalRows(), f += r.setGridTemplates(), f += r.setFooterPagingInformation()), !angular.isUndefined(rxgs.masterTableView)) {
                        if (angular.isUndefined(r.gridOption.gridMaster.displayTemplate) && (angular.isUndefined(r.rxgs.gridMaster.groupBy) || (f += "<td ng-if='rxg." + r.rxgs.gridMaster.groupBy.parentPropertyName + " == 0' colspan='" + rxgs.masterTableView.columns.length + "' class='" + r.rxgs.gridMaster.groupBy.rowCss + "'><div class='groupGridRowDiv'>", angular.isUndefined(r.rxgs.gridMaster.groupBy.collapsibleProperty) || (f += "<i ng-class='expandCollapseIcon[rxg." + r.rxgs.gridMaster.groupBy.childPropertyName + "]' ng-click='expandCollapseGroupGrid($event,rxg)'><\/i>"), f += r.rxgs.gridMaster.groupBy.groupHtmlTemplate + "<\/div><\/td>"), angular.forEach(rxgs.masterTableView.columns, function (n) {
                            angular.isUndefined(n.activeColumn) ? (r.setTableHeadings(n), f += r.setTableRows(n)) : n.activeColumn && (r.setTableHeadings(n), f += r.setTableRows(n))
                        })), f += "<\/table><\/div>", angular.isUndefined(r.gridOption.gridMaster.displayTemplate) && (f += r.setFooterPagingInformation()), r.subPopupTemplateSrc = {}, $("#popupTemplate" + r.gridName).remove(), h = '<div  id="popupTemplate' + r.gridName + '" class="modal fade {{popupTemplate.popupCss}} showpopup"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true"><div ng-include src="popupTemplateSrc.src"><\/div><\/div>', c = '<div  id="subpopupTemplate' + r.gridName + '" class="modal fade {{popupTemplate.popupCss}} showpopup"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true"><div ng-include src="subPopupTemplateSrc.src"><\/div><\/div>', f += k, r.popupTemplateSrc = {
                            src: "",
                            popupCss: ""
                        }, r.mainTableWidth = r.gridName == "costCentreGrid" ? "" : r.mainTableWidth, b && (r.SortColumnName = angular.isUndefined(r.gridOption.gridMaster.defaultSortColumn) ? "" : r.gridOption.gridMaster.defaultSortColumn, r.SortOrder = r.SortOrder == undefined ? !0 : r.sortOrder), r.isSetGridOptions) {
                            for (r.isSetGridOptions = !1, r.SortColumnName = r.currentSortColumn, r.sortOrder = r.currentSortOrder, o = u.find(r.tableHeadings, {
                                sortColumn: r.SortColumnName
                            })[0], e = 0; e < r.tableHeadings.length; e++) r.tableHeadings[e].sortCss = "sorting", r.tableHeadings[e].activeAscIcon = undefined, r.tableHeadings[e].activeDscIcon = undefined;
                            angular.isUndefined(o) || (o.sortCss = r.sortOrder ? "sorting_asc" : "sorting_desc", o.sortOrder = r.sortOrder, o.activeSortColumn = r.sortOrder, o.activeAscIcon = r.sortOrder ? !1 : !0, o.activeDscIcon = r.sortOrder ? !0 : !1)
                        }
                        $(a).html(n(f)(r));
                        $("#bodyElement").append(n(c)(r));
                        $("#bodyElement").append(n(h)(r));
                        i.resumePopup = !1;
                        d = setTimeout(function () {
                            r.resetTableWidth();
                            r.$apply()
                        }, 1e3);
                        $("#popupTemplate" + r.gridName).on("hide.bs.modal", function () { });
                        $("#popupTemplate" + r.gridName).on("hidden.bs.modal", function () {
                            $("#rxload").removeClass("rxloadin").addClass("rxloadout");
                            $("#subpopupTemplate" + r.gridName).removeClass("in");
                            $(".modal-backdrop").removeClass("fade");
                            $(".modal-backdrop").removeClass("in");
                            $(".modal-backdrop").removeClass("modal-backdrop");
                            r.$apply(function () {
                                r.popupTemplateSrc = {
                                    src: "/Scripts/lib/rx/template/blank.html",
                                    popupCss: ""
                                }
                            })
                        });
                        for (l = r.gridSource.length > r.pageSize ? r.pageSize : r.gridSource.length, e = 0; e < l; e++)
                            for (s = 0; s < r.inlineToolTipArray.length; s++) $("#" + r.inlineToolTipArray[s].controlId + e).tooltip({
                                title: r.inlineToolTipArray[s].title,
                                placement: r.inlineToolTipArray[s].placement,
                                trigger: "hover"
                            })
                    }
                    if (r.isResetGridCall) g = r.spSearch ? setTimeout(function () {
                        for (var n in r.dbSearch) r.dbSearch[n] != "" && r.dbSearch[n] != undefined && (r.customSearch[n] = r.dbSearch[n], n != "$" && $("#th" + r.gridName + n).addClass("read-filter"));
                        r.$apply()
                    }, 500) : setTimeout(function () {
                        for (var n in r.search) r.search[n] != "" && (r.customSearch[n] = r.search[n], n != "$" && $("#th" + r.gridName + n).addClass("read-filter"));
                        r.$apply()
                    }, 500);
                    else if (r.search = {}, !angular.isUndefined(rxgs.gridMaster.defaultSearch))
                        for (r.customSearch = {}, e = 0; e < rxgs.gridMaster.defaultSearch.length; e++) r.search[rxgs.gridMaster.defaultSearch[e].dataField] = rxgs.gridMaster.defaultSearch[e].value, r.customSearch[rxgs.gridMaster.defaultSearch[e].dataField] = rxgs.gridMaster.defaultSearch[e].value
                }
            };
            r.selectAllRecords = function (n, t) {
                t ? r.gridSource.selectAll(n, !0) : r.gridSource.deSelectAll(n, !0)
            };
            r.spSearch = !0;
            r.dataLossPopup = function (n) {
                if (n) {
                    if (i.isEntityChanged = !1, i.entityFlagChanged = !1, r.gridSource.hidePopup(), !angular.isUndefined(r.gridOption.gridMaster.entityLock) && !angular.isUndefined(t[t.activeGrid].row)) {
                        var u = {
                            entityId: t[t.activeGrid].row[r.gridOption.gridMaster.primaryKey],
                            entityType: r.gridName,
                            Unlock: !0
                        };
                        r.$parent.eLock = u;
                        r.$parent.entityLock(r.$parent.eLock, !0)
                    }
                    i.$apply()
                } else c.hide()
            };
            r.alertEventProcess = function () {
                i.isHidePopupGrid = !0;
                t[r.gridName].event == "edit" || t[r.gridName].event == "view" ? angular.isUndefined(r.gridOption.gridMaster.alertEvent.update) || (c.scopeOption.$eval(r.gridOption.gridMaster.alertEvent.update), i.isHidePopupGrid && r.dataLossPopup(!0)) : t[r.gridName].event == "delete"
            };
            r.resetTableWidth = function () { };
            r.isRepeatWidth = !0;
            r.$on("rxGridTableWidthBroadCast", function () {
                var i, n, t, f, h;
                if (w = !1, r.isRepeatWidth)
                    for (r.isRepeatWidth = !1, i = 0; i < r.tableHeadings.length; i++)
                        if (n = r.tableHeadings[i], n.showSearch) {
                            t = [];
                            w || (t = u.find(r.gridOption.masterTableView.columns, {
                                activeColumn: !0
                            }), t.length > 1 && t.length < 8 && (y = $(a[0].parentElement).width(), angular.isUndefined(r.gridOption.gridMaster.saveWidth) || (r.gridOption.gridMaster.saveWidth ? e.save("securityg", y) : y = parseInt(e.fetch("securityg"))), y == 0 && (y = parseInt(e.fetch("securityg"))), r.mainTableWidth = {
                                width: y + "px"
                            }, y = (y - 105) / t.length), w = !0);
                            var o = {
                                width: y + "px"
                            },
                                c = angular.isUndefined(r.gridOption.gridMaster.autoWidthColumn) ? !1 : r.gridOption.gridMaster.autoWidthColumn,
                                s = angular.isUndefined(n.headerText) ? "" : n.headerText;
                            c && (f = s.length < 2 ? 100 : s.length, h = (f + 5) * 12, r.tableWidth += h, o = {
                                width: (f + 5) * 12 + "px"
                            }, r.mainTableWidth = {
                                width: r.tableWidth + "px"
                            });
                            n.autoWidthColumn = o
                        }
            });
            this.updateGridSource = function (n) {
                angular.isUndefined(n) || r.createCustomColumn || (r.tempSearch = r.gridSource, r.setGrid())
            };
            r.$watch("gridSource", this.updateGridSource, !0);
            r.$on("$destroy", function () {
                $(a).remove();
                r = r.$new()
            });
            r.getColumnCss = function (n, t) {
                var r = {},
                    i, u;
                return (r.dataField = t, i = rx.json.find(rxgs.masterTableView.columns, r), r = {}, i.length > 0 && i[0].conditionalColumnCss != undefined && (t = i[0].conditionalColumnCss.dataField == undefined ? t : i[0].conditionalColumnCss.dataField, r.value = n[t], u = rx.json.find(i[0].conditionalColumnCss.conditions, r), u.length != 0)) ? u[0].cssClass : ""
            }
        }],
        link: function () { },
        replace: !0
    }
}]);
radix.directive("rxActiveclass", function () {
    return {
        restrict: "A",
        link: function (n, t, i) {
            $(t).click(function () {
                $("#" + i.element + " tbody tr").removeClass(i.addClass);
                $(t).addClass(i.addClass)
            })
        }
    }
});
radix.filter("startIndex", function () {
    return function (n, t) {
        return t = +t, n.slice(t)
    }
});
radix.filter("activetext", function () {
    return function (n, t) {
        return angular.isUndefined(t) ? n == 0 ? "InActive" : "Active" : n ? t.trueText : t.falseText
    }
});
radix.filter("foldertexttruncate", function () {
    return function (n) {
        return String(n).length > 60 ? String(n).substring(0, 60) + "..." : n
    }
});
radix.filter("texttruncate", function () {
    return function (n, t, i) {
        var u = $("#theading" + t + i).width() / 8,
            f = u / 2,
            r = "...",
            e;
        return String(n).length > u ? (e = String(n).substring(0, f - r.length) + r, String(n).substring(0, f - r.length) + r) : n
    }
});
radix.filter("rxfilter", ["rxJson", function (n) {
    return function (t, i, r) {
        return angular.isUndefined(t) ? undefined : n.filter(r, i, t)
    }
}]);
radix.filter("anymessage", function () {
    return function (n) {
        return n == null ? "Any" : n
    }
});
radix.filter("rxdatefilter", function () {
    return function (n, t, i) {
        var u, f, e, r, o;
        return (rx.appConfiguration.rxDateConfig.cultureInfo != null && rx.appConfiguration.rxDateConfig.cultureInfo.culture != null && moment.locale(rx.appConfiguration.rxDateConfig.cultureInfo.culture), !angular.isUndefined(n) && n != null && n != "" && n.length >= 8) ? rx.appConfiguration.rxDateConfig.cultureInfo != null && rx.appConfiguration.rxDateConfig.cultureInfo.culture != null && rx.appConfiguration.rxDateConfig.cultureInfo.culture != "" && rx.appConfiguration.rxDateConfig.format != null && rx.appConfiguration.rxDateConfig.format.inputFormat != null ? (u == null && (u = "L"), r = moment(n, rx.appConfiguration.rxDateConfig.format.inputFormat).format(u), r == "Invalid date" && (r = ""), r) : rx.appConfiguration.rxDateConfig.format != null && rx.appConfiguration.rxDateConfig.format.inputFormat != null && rx.appConfiguration.rxDateConfig.format.inputFormat != "" ? (f = rx.appConfiguration.rxDateConfig.format.inputFormat, r = moment(n, f), r != null && r._d != null && (r = r._d, e = moment(r).format(rx.appConfiguration.rxDateConfig.format.displayFormat.toUpperCase())), t != null && i != null && (t[i + "_filteredDate"] = moment(r).format("MM/DD/YYYY")), e) : (r = moment(n, "YYYY"), r != "0001") ? (r = moment(n, "MM/DD/YYYY"), o = moment(r).format(rx.appConfiguration.rxDateConfig.format.displayFormat.toUpperCase()), t != null && i != null && (t[i + "_filteredDate"] = moment(r).format("MM/DD/YYYY")), o) : "" : ""
    }
});
radix.filter("rxCurrency", function () {
    return function (n, t) {
        if (!angular.isUndefined(n) && n != null) {
            $("#temp").text(n).formatCurrency();
            var i = $("#temp").html();
            return i.replace("$", t)
        }
        return n
    }
});
radix.filter("viewtext", function () {
    return function (n, t) {
        var r, i;
        if (n != undefined) {
            for (r = "", i = 0; i < t; i++) r += n.charAt(i);
            return r
        }
        return ""
    }
});
radix.filter("rxGridFilter", [function () {
    function n(n, t) {
        return /^(true|false)$/i.test(t) ? (n + "").indexOf(t) >= 0 : /^\s*\d+\s*$/i.test(t) ? (n + "").indexOf(t) >= 0 : n == null ? !1 : (n.toLowerCase() + "").indexOf(t.toLowerCase()) >= 0
    }
    return function (t, i, r, u, f, e) {
        var o = [],
            s = !1;
        for (var h in i) h != "$" ? i[h] == "" ? /^(true|false)$/i.test(i[h]) ? s = !0 : (i[h] = undefined, s = !1) : s = !0 : s = !1;
        return s ? (angular.forEach(t, function (r) {
            var c = 1,
                a = 1,
                s = [],
                l = {};
            for (var h in i) i[h] != undefined && h != "$" && (a++ , n(String(r[h]), i[h]) && o.indexOf(r) < 0 && (u != undefined && f != undefined && e != undefined ? r[f] > 0 && (o.push(r), c++ , l[e] = r[f], s = rx.json.find(t, l), s != undefined && o.indexOf(s[0]) == -1 && (o.push(s[0]), c++)) : (o.push(r), c++)))
        }), o) : t
    }
}]);
radix.factory("breadCrumbService", ["$rootScope", function (n) {
    var t = {};
    return t.broadcast = function (n) {
        this.breadCrumbSoruce = n;
        this.broadcastBreadCrumb()
    }, t.broadcastBreadCrumb = function () {
        n.$broadcast("$breadCrumbBroadcast")
    }, t
}]);
radix.factory("rxRecordLock", function () {
    return {
        isEdit: !1,
        entityTypeName: ""
    }
});
radix.factory("rxUserPermission", function () {
    return {
        permissionContext: [],
        mainContext: [],
        maintenanceContext: [],
        entryType: "",
        backOfficeContext: [],
        securityGeneralItems: [],
        currentUserPermissionItem: ""
    }
});
radix.factory("loader", function () {
    var n = function (n) {
        n
    };
    return {
        load: n
    }
});
radix.factory("rxPopup", ["$compile", "$rootScope", function (n, t) {
    return {
        newRootScope: "",
        showPopup: function (i, r) {
            var f, u, e;
            if (newRootScope = t.$new(), newRootScope.popupTemplateSrc = angular.isUndefined(newRootScope.popupTemplateSrc) ? {
                src: i,
                popupCss: r
            } : {
                    src: i,
                    popupCss: r
                }, $("#rxPopupFactory").remove(), $("#rxPopupFactorysubPopup").remove(), f = $("#rxPopupFactory"), angular.isUndefined(f[0])) {
                u = '<div  id="rxPopupFactory" class="modal fade {{popupTemplateSrc.popupCss}}"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true"><div ng-include src="popupTemplateSrc.src"><\/div><\/div>';
                u += '<div  id="rxPopupFactorysubPopup" class="modal fade {{popupTemplate.popupCss}} showpopup"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true"><div ng-include src="subPopupTemplateSrc.src"><\/div><\/div>';
                $("#bodyElement").append(n(u)(newRootScope));
                $("#rxPopupFactory").on("hidden.bs.modal", function () {
                    newRootScope.$apply(function () {
                        newRootScope.popupTemplateSrc = {
                            src: "/Scripts/lib/rx/template/blank.html",
                            popupCss: ""
                        }
                    })
                });
                $("#rxPopupFactorysubPopup").on("hidden.bs.modal", function () {
                    newRootScope.$apply(function () {
                        newRootScope.popupTemplateSrc = {
                            src: "/Scripts/lib/rx/template/blank.html",
                            popupCss: ""
                        }
                    })
                });
                e = setTimeout(function () {
                    $("#rxPopupFactory").modal({
                        backdrop: "static",
                        keyboard: !1
                    });
                    $("#rxPopupFactory").modal("show")
                }, 200)
            } else $("#rxPopupFactory").modal("show")
        },
        showSubPopup: function (n, t) {
            $("#rxPopupFactory").addClass("displayNone");
            newRootScope.popupTemplate = {
                popupCss: t
            };
            newRootScope.subPopupTemplateSrc = {
                src: n
            };
            $("#rxPopupFactorysubPopup").hasClass("in") ? $("#rxPopupFactorysubPopup").removeClass("displayNone") : ($("#rxPopupFactorysubPopup").modal({
                backdrop: "static",
                keyboard: !1
            }), $("#rxPopupFactorysubPopup").modal("show"), $("#rxPopupFactorysubPopup").addClass("in"), $("#rxPopupFactorysubPopup").removeClass("displayNone"))
        },
        hideSubPopup: function () {
            $("#rxPopupFactory").removeClass("displayNone");
            newRootScope.subPopupTemplateSrc = {
                src: "/Scripts/lib/rx/template/blank.html"
            };
            $("#rxPopupFactorysubPopup").addClass("displayNone")
        },
        hidePopup: function () {
            $("#rxPopupFactory").modal("hide");
            $("#rxPopupFactorysubPopup").modal("hide")
        }
    }
}]);
radix.factory("rxWait", ["appConfig", function (n) {
    var t = function (t) {
        var i = angular.isUndefined(t) ? n.loadingText + "..." : n.loadingText + " " + t + "...";
        $("#rxload").removeClass("rxloadout").addClass("rxloadin");
        $("#rxload").html('<div class="wait-box" style="position:absolute; top:40%; left:48%"><center><img src="Content/images/big-progress.gif" class="wait-image"><div class="wait-message"><\/div><\/center><\/div>')
    },
        i = function () {
            $("#rxload").removeClass("rxloadin").addClass("rxloadout")
        };
    return {
        show: t,
        hide: i
    }
}]);
radix.factory("rxLog", ["$log", function (n) {
    toastr.options = {
        positionClass: "toast-bottom-left",
        timeOut: "4000",
        showMethod: "slideDown",
        hideMethod: "slideUp"
    };
    toastr.options.timeOut = angular.isUndefined(rx.appConfiguration.notification.toastr.timeOut) ? 4e3 : rx.appConfiguration.notification.toastr.timeOut;
    toastr.options.positionClass = "toast-bottom-right";
    var t = function () {
        toastr.options = {
            closeButton: !0,
            positionClass: "toast-bottom-left",
            timeOut: "0",
            extendedTimeOut: "0",
            showMethod: "slideDown",
            hideMethod: "slideUp"
        }
    },
        r = function () {
            toastr.options = {
                positionClass: "toast-bottom-left",
                timeOut: angular.isUndefined(rx.appConfiguration.notification.toastr.timeOut) ? 4e3 : rx.appConfiguration.notification.toastr.timeOut,
                showMethod: "slideDown",
                hideMethod: "slideUp"
            }
        },
        u = function (n, u, f, e) {
            var o, s;
            if (rx.rxString.first(n, 1) == "@" && (o = n.replace("@", ""), rx.language.pageProperties[o] != undefined ? n = rx.language.pageProperties[o] : rx.language.globalProperties[o] != undefined && (n = rx.language.globalProperties[o])), angular.isArray(u)) {
                if (!angular.isUndefined(u))
                    for (!angular.isUndefined(f) && f && t(), s = 0; s < u.length; s++) n = n.replace("{" + s + "}", u[s])
            } else !angular.isUndefined(u) && u && t();
            toastr.success(n);
            !angular.isUndefined(u) && u && r();
            i(n, f, e, "success")
        },
        f = function (n, r, u, f, e) {
            var o, s;
            if (rx.rxString.first(n, 1) == "@" && (o = n.replace("@", ""), rx.language.pageProperties[o] != undefined ? n = rx.language.pageProperties[o] : rx.language.globalProperties[o] != undefined && (n = rx.language.globalProperties[o])), angular.isArray(r)) {
                if (!angular.isUndefined(r))
                    for (!angular.isUndefined(u) && u && t(), s = 0; s < r.length; s++) n = n.replace("{" + s + "}", r[s])
            } else !angular.isUndefined(r) && r && t();
            !angular.isUndefined(e) && e && (toastr.options = {
                closeButton: !0,
                positionClass: "toast-bottom-full-width",
                timeOut: "0",
                extendedTimeOut: "0",
                showMethod: "slideDown",
                hideMethod: "slideUp"
            });
            toastr.error(n);
            !angular.isUndefined(r) && r && (toastr.options = {
                positionClass: "toast-bottom-left",
                timeOut: angular.isUndefined(rx.appConfiguration.notification.toastr) ? 4e3 : rx.appConfiguration.notification.toastr,
                showMethod: "slideDown",
                hideMethod: "slideUp"
            });
            !angular.isUndefined(e) && e && (toastr.options = {
                positionClass: "toast-bottom-left",
                timeOut: angular.isUndefined(rx.appConfiguration.notification.toastr) ? 4e3 : rx.appConfiguration.notification.toastr,
                showMethod: "slideDown",
                hideMethod: "slideUp"
            });
            i(n, u, f, "error")
        },
        e = function (n, t, r, u) {
            var f, e;
            if (rx.rxString.first(n, 1) == "@" && (f = n.replace("@", ""), rx.language.pageProperties[f] != undefined ? n = rx.language.pageProperties[f] : rx.language.globalProperties[f] != undefined && (n = rx.language.globalProperties[f])), angular.isArray(t))
                for (e = 0; e < t.length; e++) n = n.replace("{" + e + "}", t[e]);
            toastr.warning(n);
            i(n, r, u, "warning")
        },
        o = function (n, t, r, u) {
            var f, e;
            if (rx.rxString.first(n, 1) == "@" && (f = n.replace("@", ""), rx.language.pageProperties[f] != undefined ? n = rx.language.pageProperties[f] : rx.language.globalProperties[f] != undefined && (n = rx.language.globalProperties[f])), angular.isArray(t))
                for (e = 0; e < t.length; e++) n = n.replace("{" + e + "}", t[e]);
            toastr.info(n);
            i(n, r, u, "log")
        },
        i = function (t, i, r, u) {
            var f = u === "error" ? n.error : n.log;
            r = angular.isUndefined(r) ? "" : "[" + r + "] ";
            i = angular.isUndefined(i) ? "" : i;
            f(r, t, i)
        };
    return {
        success: u,
        error: f,
        warning: e,
        log: o
    }
}]);
radix.factory("rxModal", function () {
    var n = function (n, t, i) {
        $("#rxModalTemplate" + t).modal({
            keyboard: !1
        });
        $("#rxModalTemplate" + t).modal("show");
        angular.isUndefined(i) || n.$eval(i)
    };
    return {
        showModal: n
    }
});
radix.factory("appConfig", function () {
    return {
        loadingText: "Please wait",
        storeExpirationMs: 864e5,
        webConfiguration: {
            standAlone: !1
        }
    }
});
radix.factory("rxString", [function () {
    var n = function (n, t, i) {
        return S(n).replaceAll(t, i).s
    };
    return {
        replaceAll: n
    }
}]);
radix.factory("rxJson", ["$filter", function (n) {
    var t = function (t, i, r) {
        var o = {},
            u, e, f;
        if (o[t] = i, u = n("filter")(r, o), e = [], !angular.isUndefined(u) && u.length > 0)
            for (f = 0; f < u.length; f++) u[f][t] == i && e.push(u[f]);
        return e
    },
        i = function (t, i) {
            return n("filter")(t, i)
        },
        r = function (n, t) {
            return _.pluck(n, t)
        },
        u = function (n, t) {
            return _.max(n, function (n) {
                return n[t]
            })
        },
        f = function (n, t) {
            return _.min(n, function (n) {
                return n[t]
            })
        },
        e = function (n) {
            return _.uniq(n)
        };
    return find = function (n, t) {
        return _.where(n, t)
    }, del = function (n, t) {
        for (var r, u = find(n, t), i = 0; i < u.length; i++) r = n.indexOf(u[i]), r != -1 && n.splice(r, 1);
        return n
    }, removeColumn = function (n, t) {
        return _.omit(n, t)
    }, arrayContains = function (n, t) {
        return _.contains(n, t)
    }, uniqueNumber = function () {
        return _.uniqueId()
    }, uniqueByProperty = function (n, t) {
        return _.uniq(n, function (n) {
            return n[t]
        })
    }, createJsonObject = function (n, t, i) {
        for (var u = {}, r = 0; r < n.length; r++) u[n[r][t]] = n[r][i];
        return u
    }, createJsonObjectArray = function (n, t, i, r, u, f) {
        for (var o, s = n.split(u), c = t.split(u), h = [], e = 0; e < s.length; e++) o = {}, o[i] = f ? parseInt(s[e]) : s[e], o[r] = c[e], h.push(o);
        return h
    }, groupBy = function (n, t) {
        return _.groupBy(n, t)
    }, contains = function (n, t) {
        return _.contains(n, t)
    }, pascalCase = function (n) {
        return n.charAt(0).toUpperCase() + n.slice(1)
    }, camelCase = function (n) {
        return n.charAt(0).toLowerCase() + n.slice(1)
    }, keys = function (n) {
        return _.keys(n)
    }, values = function (n) {
        return _.values(n)
    }, sortBy = function (n, t) {
        return _.sortBy(n, function (n) {
            if (n[t] != null) return typeof n[t] == "string" ? n[t].toLowerCase() : n[t]
        })
    }, randomNumber = function (n, t) {
        return _.random(n, t)
    }, {
            filter: t,
            convertToArrary: r,
            max: u,
            min: f,
            find: find,
            unique: e,
            advanceFilter: i,
            del: del,
            createJsonObject: createJsonObject,
            removeColumn: removeColumn,
            arrayContains: arrayContains,
            uniqueNumber: uniqueNumber,
            groupBy: groupBy,
            pascalCase: pascalCase,
            keys: keys,
            values: values,
            camelCase: camelCase,
            createJsonObjectArray: createJsonObjectArray,
            sortBy: sortBy,
            randomNumber: randomNumber,
            contains: contains,
            uniqueByProperty: uniqueByProperty
        }
}]);
radix.factory("cacheData", ["appConfig", function (n) {
    var t = window.amplify,
        e = window.jQuery,
        i = {
            expires: n.storeExpirationMs
        },
        r = function (n) {
            return n == "aft" || n == "oauth" || n == "userOffice" ? t.store(n, null) : t.store(String(numberChanger) + n, null)
        },
        u = function (n) {
            return n == "aft" || n == "oauth" || n == "userOffice" ? t.store(n) : t.store(String(numberChanger) + n)
        },
        f = function (n, r) {
            if (n == "aft" || n == "oauth" || n == "userOffice") t.store(n, r, i);
            else return t.store(String(numberChanger) + n, r, i)
        };
    return {
        clear: r,
        fetch: u,
        save: f
    }
}]);
radix.factory("rxOdataQueryOptions", ["rxJson", function (n) {
    var t = [],
        i = [],
        r = function (n, t) {
            switch (n.valueType) {
                case "text":
                    return o(n, t);
                case "dropdown":
                    return e(n, t);
                case "checkbox":
                    return f(n, t)
            }
        },
        u = function (r, u) {
            t = [];
            angular.forEach(r.columns, function (f) {
                var s, o, e;
                if (!angular.isUndefined(u[f.columnName]) && u[f.columnName] != "") {
                    for (t = [], s = u[f.columnName].split(","), o = 0; o < s.length; o++) e = {}, angular.isUndefined(f.replaceColumn) ? (e.columnName = n.pascalCase(f.columnName), e.operator = f.operator, e.nextOperator = r.nextOperator, e.value = s[o]) : (e.columnName = n.pascalCase(f.replaceColumn), e.operator = f.operator, e.nextOperator = r.nextOperator, e.value = s[o]), angular.isUndefined(f.valueType) || (f.valueType == "bool" ? e.value = e.value ? f.trueValue : !1 : f.valueType == "int" && (e.value = parseInt(e.value))), t.push(e);
                    i.push({
                        forceOperator: r.conditionalOperator,
                        conditions: t
                    })
                }
            })
        },
        f = function (i, r) {
            return t = [], angular.forEach(i.columns, function (i) {
                if (!angular.isUndefined(r[i.columnName]) && r[i.columnName]) {
                    var u = {};
                    angular.isUndefined(i.replaceColumn) ? (u.columnName = n.pascalCase(i.columnName), u.operator = i.operator, u.value = r[i.columnName]) : (u.columnName = n.pascalCase(i.replaceColumn), u.operator = i.operator, u.value = r[i.columnName]);
                    angular.isUndefined(i.valueType) || (i.valueType == "bool" ? u.value = u.value ? i.trueValue : !1 : i.valueType == "int" && (u.value = parseInt(u.value)));
                    t.push(u)
                }
            }), t
        },
        e = function (i, r) {
            return t = [], angular.forEach(i.columns, function (i) {
                if (!angular.isUndefined(r[i.columnName])) {
                    var u = {};
                    angular.isUndefined(i.replaceColumn) ? (u.columnName = n.pascalCase(i.columnName), u.operator = i.operator, u.value = r[i.columnName]) : (u.columnName = n.pascalCase(i.replaceColumn), u.operator = i.operator, u.value = r[i.columnName]);
                    angular.isUndefined(i.valueType) || (u.value = i.valueType == "bool" ? u.value == i.trueValue ? !0 : !1 : parseInt(u.value));
                    t.push(u)
                }
            }), t
        },
        o = function (i, r) {
            return t = [], angular.forEach(i.columns, function (i) {
                if (!angular.isUndefined(r[i.columnName]) && r[i.columnName] != "" && r[i.columnName] != null) {
                    var u = {};
                    angular.isUndefined(i.replaceColumn) ? (u.columnName = n.pascalCase(i.columnName), u.operator = i.operator, u.value = r[i.columnName]) : (u.columnName = n.pascalCase(i.replaceColumn), u.operator = i.operator, u.value = r[i.columnName]);
                    angular.isUndefined(i.valueType) || (u.value = i.valueType == "bool" ? u.value == i.trueValue ? !0 : !1 : parseInt(u.value));
                    t.push(u)
                }
            }), t
        },
        s = function (n, f) {
            return t = [], i = [], angular.forEach(n, function (n) {
                n.operatorType == "operator" ? r(n, f).length > 0 && i.push({
                    operator: n.conditionalOperator,
                    conditions: r(n, f)
                }) : u(n, f)
            }), i
        };
    return {
        getQuery: s
    }
}]);
radix.factory("rxTreeData", function () {
    var n = {
        activeTree: {},
        setSelectedItems: ""
    };
    return n.setCheckboxTree = function (t, i) {
        n[t].checkedSource = i
    }, n.setTreeSource = function (t, i) {
        angular.isUndefined(n[t]) ? n[t] = {
            source: i
        } : n[t].source = i
    }, n.setTreeRootObject = function (t, i, r) {
        angular.isUndefined(n[i]) ? (n[i] = {}, n[i].rootObject = t, n[i].parentObjects = r) : (n[i].rootObject = t, n[i].parentObjects = r)
    }, n.setTreeParentObject = function (t, i, r) {
        angular.isUndefined(n[i]) ? (n[i] = {}, n[i].parentObject = t, n[i].childObjects = r) : (n[i].parentObject = t, n[i].childObjects = r)
    }, n.setTreeChildObject = function (t, i) {
        angular.isUndefined(n[i]) ? n[i] = {} : n[i].childObject = t
    }, n.setTreeName = function (t) {
        n.activeTree = t
    }, n.deleteParentObject = function (t) {
        var r = n[n.activeTree].rootObject.parentObjects.indexOf(t),
            u, f, i;
        if (r != -1)
            for (u = n[n.activeTree].rootObject.parentObjects.length, f = n[n.activeTree].rootObject.parentObjects, n[n.activeTree].rootObject.parentObjects = [], i = 0; i < u; i++) i != r && n[n.activeTree].rootObject.parentObjects.push(f[i])
    }, n.deleteChildObject = function (t) {
        var i = n[n.activeTree].rootObject.parentObjects.indexOf(n[n.activeTree].parentObject),
            u = n[n.activeTree].rootObject.parentObjects[i].parentObjects.indexOf(t),
            f, e, r;
        if (u != -1)
            for (f = n[n.activeTree].rootObject.parentObjects[i].parentObjects.length, e = n[n.activeTree].rootObject.parentObjects[i].parentObjects, n[n.activeTree].rootObject.parentObjects[i].parentObjects = [], r = 0; r < f; r++) r != u && n[n.activeTree].rootObject.parentObjects[i].parentObjects.push(e[r])
    }, n.addParentObject = function (t) {
        t.parentObjects = [];
        t.showParent = !0;
        n[n.activeTree].parentObjects.push(t)
    }, n.addChildObject = function (t) {
        t.cssClass = "icon-remove";
        t.childSelectedCss = "";
        t.showEditIcon = !1;
        n[n.activeTree].childObjects.push(t)
    }, n.setSelectedObject = function (t, i) {
        if (!angular.isUndefined(t)) {
            for (var r, f = t.split(","), e = "", u = 0; u < f.length; u++) r = rx.json.find(i, {
                objectId: parseInt(f[u])
            })[0], void 0 != r && (e += 0 == u ? r.objectName : ", " + r.objectName);
            n.setSelectedItems = e
        }
    }, n
});
radix.factory("cookieconfig", ["$cookieStore", "cacheData", function (n, t) {
    return {
        get: function (n) {
            var f, i, u, e, r;
            if (n == "attachmentType" || n == "attachmentEntityId" || n == "selectedDocumentFileId" || n == "selectedDocumentFileName") return t.fetch(n);
            if (n == "lid") return f = amplify.store("userOffice"), f.userOffice.userId;
            for (r = document.cookie.split(";"), i = 0; i < r.length; i++)
                if (u = r[i].substr(0, r[i].indexOf("=")), e = r[i].substr(r[i].indexOf("=") + 1), u = u.replace(/^\s+|\s+$/g, ""), u == n) return unescape(e)
        },
        save: function (n, i, r, u) {
            var f, e;
            if ((n == "attachmentType" || n == "attachmentEntityId" || n == "selectedDocumentFileId" || n == "selectedDocumentFileName") && u == undefined) {
                t.save(n, i);
                return
            }
            f = new Date;
            f.setDate(f.getDate() + r);
            e = escape(i) + (r == null ? "" : "; expires=" + f.toUTCString());
            document.cookie = n + "=" + e
        },
        put: function (t, i) {
            n[t] = angular.toJson(i)
        },
        remove: function (n) {
            document.cookie = n + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;"
        }
    }
}]);
radix.factory("rxAuth", [function () {
    return UserLoginID = localStorage.getItem("accessCode"), User = function () {
        return localStorage.getItem("username")
    }, UserRole = localStorage.getItem("rolename"), IsUserAuthenticate = function () {
        return localStorage.getItem("__RequestVerificationToken") != null && localStorage.getItem("__RequestVerificationToken") != undefined && localStorage.getItem("__RequestVerificationToken") != "" ? !0 : !1
    }, {
        UserLoginID: UserLoginID,
        User: User,
        UserRole: UserRole,
        IsUserAuthenticate: IsUserAuthenticate
    }
}]);
radix.factory("rxEncode", ["$window", function (n) {
    return {
        name: "Base64",
        readonly: !1,
        encode: function (t) {
            n.btoa = base64.encode;
            var i = n.btoa(t);
            return i = i.replace("=", "00"), i.replace("=", "00")
        },
        decode: function (t) {
            if (n.atob = base64.decode, t) {
                var i = t.replace("00", "=");
                return i = i.replace("00", "="), n.atob(i)
            }
            return undefined
        }
    }
}]);
radix.factory("rxUtils", function () {
    var n = function (n) {
        return _.escape(n)
    },
        t = function (n) {
            return _.unescape(n)
        },
        i = function (n) {
            var t = n.split("/");
            return moment([t[2], t[0] - 1, t[1]]).dayOfYear()
        },
        r = function (n) {
            var t = n.split("/");
            return moment([t[2], t[0] - 1, t[1]]).get("year")
        },
        u = function (n, t) {
            var i = n.split("/"),
                r = moment([i[2], i[0] - 1, i[1]]).add("days", t);
            return r.format("L")
        };
    return {
        safeHtml: n,
        convertToHtml: t,
        getDayOfYear: i,
        getYear: r,
        addDays: u
    }
});
radix.factory("rxDiaryData", ["$rootScope", function () {
    var n = {};
    return n.setActiveDaiary = function (t, i) {
        n[t] = i
    }, n
}]);
radix.factory("rxPopupData", function () {
    var n = {
        activeName: ""
    };
    return n.setObject = function (t, i) {
        angular.isUndefined(n[i]) && (n[i] = {});
        n[i] = t
    }, n
});
radix.factory("rxMobile", function () {
    var n = function () {
        return MobileEsp.DetectAndroid() || MobileEsp.DetectBlackBerry() || MobileEsp.DetectIpad() || MobileEsp.DetectWindowsPhone7() ? !0 : !1
    };
    return {
        isMobileDevice: n
    }
});
radix.factory("configuration", function () {
    return {
        global: {
            searchStartString: !0
        }
    }
});
radix.factory("rxExplorerData", function () {
    var n = {
        source: [],
        active: ""
    };
    return n.setExplorerSource = function (t, i) {
        angular.isUndefined(n[t]) && (n[t] = {});
        n[t].source = i
    }, n
});
radix.factory("rxData", ["$rootScope", function () {
    var n = {
        jsonObject: {},
        jsonArray: [],
        eventJsonArray: [],
        filteredJsonArray: [],
        isFiltered: !1,
        headingJsonArray: [],
        subGridJsonArray: {},
        gridChangedData: {},
        activeGrid: {}
    };
    return n.setJsonObject = function (t, i) {
        angular.isUndefined(n[i]) ? (n[i] = {}, n[i].row = t) : n[i].row = t
    }, n.setJsonArray = function (t, i) {
        angular.isUndefined(n[i]) ? (n[i] = {}, n[i].source = t) : n[i].source = t
    }, n.setFilteredJsonArray = function (t, i) {
        angular.isUndefined(n[i]) ? (n[i] = {}, n[i].filteredSource = t) : n[i].filteredSource = t
    }, n.setLanguageHeader = function (t) {
        var i, u, r;
        for (i in t) u = rxJson.find(n.headingJsonArray, {
            languageProperty: i
        })[0], r = n.headingJsonArray.indexOf(u), r != -1 && (n.headingJsonArray[r].headerText = t[i])
    }, n.setCurrentEvent = function (t, i) {
        angular.isUndefined(n[i]) || (n[i].event = t)
    }, n.setHeadingJsonArray = function (t) {
        n.headingJsonArray = t
    }, n.add = function (t, i) {
        angular.isUndefined(n[i]) || n[i].source.push(t)
    }, n.rowDelete = function (t) {
        if (!angular.isUndefined(n[t])) {
            var i = n[t].source.indexOf(n[t].row);
            i != -1 && n[t].source.splice(i, 1);
            n.filteredJsonArray != 0 && (i = n[t].filteredSource.indexOf(n.jsonObject), i != -1 && n[t].filteredSource.splice(i, 1))
        }
    }, n.setSubGridJsonObject = function (t, i) {
        angular.isUndefined(n[i]) ? (n[i] = {}, n[i].subGridrow = t) : n[i].subGridrow = t
    }, n
}]);
radix.factory("response", ["$location", "$route", function (n, t) {
    return {
        redirect: function (t) {
            n.url(t)
        },
        refresh: function () {
            t.reload()
        }
    }
}]);
radix.factory("request", ["$routeParams", "$location", "rxEncode", function (n, t, i) {
    return {
        cookies: function () {
            return {
                value: null
            }
        },
        queryString: function (t, r) {
            return angular.isUndefined(r) ? i.decode(n[t]) : n[t]
        },
        rawUrl: function () {
            return t.path()
        },
        Url: function () {
            return t.absUrl()
        }
    }
}]);
radix.factory("rxMobile", function () {
    var n = function () {
        return MobileEsp.DetectAndroid() || MobileEsp.DetectBlackBerry() || MobileEsp.DetectIpad() || MobileEsp.DetectWindowsPhone7() ? !0 : !1
    };
    return {
        isMobileDevice: n
    }
});
radix.factory("configuration", function () {
    return {
        global: {
            searchStartString: !0
        }
    }
});
radix.factory("clientcontext", ["$rootScope", "rxWait", "cacheData", "rxLog", "configuration", "rxOdataQueryOptions", "appConfig", "cookieconfig", function (n, t, i, r, u, f) {
    function a() {
        var n = {
            queryOptions: "/?",
            queryNumber: 0,
            isFilter: !1,
            url: "",
            key: ""
        },
            i, t;
        return setUrl = function (t, i) {
            return n.queryOptions = "/?", n.queryNumber = 0, n.url = t, n.key = i, n.isStoreProcedure = !1, n.jObject = {}, n
        }, n.newQuery = function () {
            return n.queryOptions = "/?", n.queryNumber = 0, n.jObject = {}, n
        }, n.records = function (t) {
            return n.queryOptions += n.queryNumber == 0 ? "?count=" + t : "&count=" + t, n.queryNumber++ , n
        }, n.page = function (t) {
            return n.queryOptions += n.queryNumber == 0 ? "?page=" + t : "&page=" + t, n.queryNumber++ , n
        }, n.top = function (t) {
            return n.queryOptions += n.queryNumber == 0 ? "$top=" + t : "&$top=" + t, n.queryNumber++ , n
        }, n.expand = function (t) {
            for (var i = 0; i < t.length; i++) n.queryOptions += n.queryNumber == 0 ? "$expand=" + t[i] : "&$expand=" + t[i], n.queryNumber++;
            return n
        }, n.orderBy = function (t) {
            return n.queryOptions += n.queryNumber == 0 ? "$orderby=" + t.columnName + " " + t.order : "&$orderby=" + t.columnName + " " + t.order, n.queryNumber++ , n
        }, n.convertArrayColumn = "", n.arrayObject = function (t) {
            return n.convertArrayColumn = t, n
        }, n.select = function (t) {
            var i = "",
                r = t.length - 1,
                u = 0;
            return angular.forEach(t, function (n) {
                i += r == u ? n : n + ","
            }), n.queryOptions += n.queryNumber == 0 ? "$select=" + i : "&$select=" + i, n
        }, n.skip = function (t) {
            return n.queryOptions += n.queryNumber == 0 ? "$skip=" + t : "&$skip=" + t, n.queryNumber++ , n
        }, n.queryFilter = function (t, i) {
            var r = f.getQuery(t, i);
            return r.length > 0 ? n.filter(r) : undefined
        }, n.filter = function (r) {
            var v = 0,
                l = 0,
                o, s, f, a, c, e, h;
            if (n.isFilter || (n.queryOptions += n.queryNumber == 0 ? "$filter=" : "&$filter=", n.queryOptions = n.isStoreProcedure ? "?query=" : n.queryOptions, n.isFilter = !0), o = "", s = !1, angular.isArray(r)) {
                for (f = 0; f < r.length; f++)
                    if (angular.isUndefined(r[f].forceOperator))
                        for (s && (n.isStoreProcedure || (h = o.length + 3, n.queryOptions = n.queryOptions.substring(0, n.queryOptions.length - h), s = !1, n.queryOptions += " " + r[f].operator + " ")), o = r[f].operator, e = 0; e < r[f].conditions.length; e++) r[f].conditions[e].operator == "contains" ? u.searchStartString ? n.startsWith(r[f].conditions[e].columnName, r[f].conditions[e].value, !0) : n.subsStringOf(r[f].conditions[e].columnName, r[f].conditions[e].value, !0) : n.queryOptions += r[f].conditions[e].columnName + " " + i(r[f].conditions[e].operator) + " " + t(r[f].conditions[e].value) + " ", l = 0, v++ , n.queryOptions += " " + r[f].operator + " ";
                    else
                        for (s = !0, n.isStoreProcedure || (n.queryOptions += "("), a = r[f].conditions.length - 1, c = 0, e = 0; e < r[f].conditions.length; e++) o = r[f].conditions[e].nextOperator, r[f].conditions[e].operator == "contains" ? u.searchStartString ? n.startsWith(r[f].conditions[e].columnName, r[f].conditions[e].value, !0) : n.subsStringOf(r[f].conditions[e].columnName, r[f].conditions[e].value, !0) : n.queryOptions += n.isStoreProcedure ? e == 0 ? r[f].conditions[e].columnName + " " + i(r[f].conditions[e].operator) + " " + t(r[f].conditions[e].value) + " " : " , " + t(r[f].conditions[e].value) + " " : r[f].conditions[e].columnName + " " + i(r[f].conditions[e].operator) + " " + t(r[f].conditions[e].value) + " ", l = 0, isSpCheck = a == c, spstring = isSpCheck ? n.isStoreProcedure || (n.queryOptions += " )  " + r[f].conditions[e].nextOperator + " ") : n.isStoreProcedure ? "" : n.queryOptions += " " + r[f].forceOperator + " ", c++;
                h = o.length + 3;
                n.queryOptions = n.queryOptions.substring(0, n.queryOptions.length - h)
            } else n.queryOptions += r.columnName + " " + i(r.operator) + " " + t(r.value) + " ";
            return n.queryNumber++ , n
        }, n.and = function () {
            return n.queryOptions += n.queryNumber == 0 ? "" : " and ", n.queryNumber++ , n
        }, n.or = function () {
            return n.queryOptions += n.queryNumber == 0 ? "" : " or ", n.queryNumber++ , n
        }, n.subsStringOf = function (i, r, u) {
            return n.isFilter || (n.queryOptions += n.queryNumber == 0 ? "$filter=" : "&$filter=", n.isFilter = !0), u = angular.isUndefined(u) ? !0 : u, n.queryOptions += "substringof(" + t(r) + ", " + i + ") eq " + u + " ", n.queryNumber++ , n
        }, n.endsWith = function (i, r, u) {
            return n.isFilter || (n.queryOptions += n.queryNumber == 0 ? "$filter=" : "&$filter=", n.isFilter = !0), u = angular.isUndefined(u) ? !0 : u, n.queryOptions += "substringof(" + i + ", " + t(r) + ") eq " + u + " ", n.queryNumber++ , n
        }, n.length = function (t, i) {
            return n.isFilter || (n.queryOptions += n.queryNumber == 0 ? "$filter=" : "&$filter=", n.isFilter = !0), _bool = angular.isUndefined(_bool) ? !0 : _bool, n.queryOptions += "length(" + t + ") eq " + i + " ", n.queryNumber++ , n
        }, n.startsWith = function (i, r, u) {
            return n.isFilter || (n.queryOptions += n.queryNumber == 0 ? "$filter=" : "&$filter=", n.isFilter = !0), u = angular.isUndefined(u) ? !0 : u, n.queryOptions += n.isStoreProcedure ? i + ' eq "' + r + '"' : "startswith(" + i + ", " + t(r) + ") eq " + u + " ", n.queryNumber++ , n
        }, n.get = function () {
            amplify.request.define(n.key, "ajax", {
                url: n.url + n.queryOptions,
                dataType: "json",
                type: "GET",
                cache: !1,
                decoder: "radixDecoder",
                beforeSend: function (n, t) {
                    return rx.appConfiguration.clientContext.beforeSend(n, t)
                }
            });
            n.queryOptions = "/?";
            n.queryNumber = 0;
            n.isFilter = !1;
            var t = function (n, t) {
                return amplify.request({
                    resourceId: t,
                    success: n.success,
                    error: n.error
                })
            };
            return n.queryNumber = 0, c.Deferred(function (i) {
                t({
                    success: function (t) {
                        var u, r;
                        if (n.queryOptions = "/?", n.queryNumber = 0, n.isFilter = !1, n.isStoreProcedure = !1, n.convertArrayColumn != "") {
                            for (u = [], r = 0; r < t.length; r++) u.push(t[r][n.convertArrayColumn]);
                            n.convertArrayColumn = "";
                            i.resolve(u)
                        } else i.resolve(t)
                    },
                    error: function () {
                        i.reject()
                    }
                }, n.key)
            }).promise()
        }, i = function (n) {
            switch (n) {
                case "=":
                    return " eq ";
                case "!=":
                    return " ne ";
                case ">":
                    return " gt ";
                case ">=":
                    return " ge ";
                case "<":
                    return " lt ";
                case "<=":
                    return " le "
            }
        }, t = function (t) {
            return n.isStoreProcedure ? t : angular.isString(t) ? "'" + t + "'" : t
        }, {
                setUrl: setUrl
            }
    }
    var c = window.jQuery,
        e = "",
        o = {},
        s = [],
        h = 0,
        l = "",
        v = function (n, t) {
            return o = {}, angular.isUndefined(n.get) || (e = t + "get", requestDefine(n.get, "GET")), angular.isUndefined(n.post) || (e = t + "post", requestDefine(n.post, "POST")), angular.isUndefined(n.put) || (e = t + "put", requestDefine(n.put, "PUT")), angular.isUndefined(n.del) || (e = t + "del", requestDefine(n.del, "DELETE")), angular.isUndefined(n.getby) || (e = t + "getby", requestDefine(n.getby, "GETBY")), angular.isUndefined(n.oData) || (e = t + "odata", requestDefine(n.oData, "oData")), o
        };
    return requestDefine = function (n, t) {
        l = t;
        s = [];
        for (var i in n) i = String(i), s.push(i.charAt(0).toUpperCase() + i.slice(1));
        h = 0;
        angular.forEach(n, function (n) {
            var i = n.split("/"),
                r;
            if (l = t == "GETBY" ? "GET" : t, amplify.request.define(e + i[i.length - 1], "ajax", {
                url: n,
                dataType: "json",
                type: l,
                cache: !1,
                decoder: "radixDecoder",
                beforeSend: function (n, t) {
                    return rx.appConfiguration.clientContext.beforeSend(n, t)
                }
            }), t == "GET") r = function (n, t) {
                return amplify.request({
                    resourceId: t,
                    success: n.success,
                    error: n.error
                })
            }, o["get" + s[h]] = getData(r, e + i[i.length - 1]);
            else if (t == "oData") o["oData" + s[h]] = a().setUrl(n, e + i[i.length - 1]);
            else {
                r = function (n, t, i) {
                    return amplify.request({
                        resourceId: i,
                        data: t,
                        success: n.success,
                        error: n.error
                    })
                };
                switch (t) {
                    case "POST":
                        o["post" + s[h]] = postData(r, e + i[i.length - 1]);
                        break;
                    case "PUT":
                        o["put" + s[h]] = putData(r, e + i[i.length - 1]);
                        break;
                    case "DELETE":
                        o["delete" + s[h]] = deleteData(r, e + i[i.length - 1]);
                        break;
                    case "GETBY":
                        o["getBy" + s[h]] = getByData(r, e + i[i.length - 1])
                }
            }
            h++
        })
    }, getData = function (n, t) {
        return get = function () {
            return c.Deferred(function (i) {
                n({
                    success: function (n) {
                        i.resolve(n)
                    },
                    error: function () {
                        i.reject()
                    }
                }, t)
            }).promise()
        }, {
                get: get
            }
        }, postData = function (n, t) {
        return post = function (i) {
            return c.Deferred(function (r) {
                n({
                    success: function (n) {
                        r.resolve(n)
                    },
                    error: function () {
                        r.reject()
                    }
                }, i, t)
            }).promise()
        }, {
                post: post
            }
    }, putData = function (t, i) {
        return put = function (r) {
            return c.Deferred(function (u) {
                t({
                    success: function (t) {
                        n.isEntityChanged = !1;
                        n.entityFlagChanged = !1;
                        n.$apply();
                        u.resolve(t)
                    },
                    error: function () {
                        u.reject()
                    }
                }, r, i)
            }).promise()
        }, {
                put: put
            }
    }, deleteData = function (n, t) {
        var i = function (i) {
            return c.Deferred(function (r) {
                n({
                    success: function (n) {
                        r.resolve(n)
                    },
                    error: function () {
                        r.reject()
                    }
                }, i, t)
            }).promise()
        };
        return {
            del: i
        }
    }, getByData = function (n, t) {
        return get = function (i) {
            return c.Deferred(function (r) {
                n({
                    success: function (n) {
                        r.resolve(n)
                    },
                    error: function () {
                        r.reject()
                    }
                }, i, t)
            }).promise()
        }, {
                get: get
            }
    }, amplify.request.decoders.radixDecoder = function (n, t, i, r, u) {
        angular.isUndefined(rx.appConfiguration.clientContext.requestDecoder) || rx.appConfiguration.clientContext.requestDecoder(n, t, i, r, u) && r(n)
    }, {
            initializeApi: v
        }
}]);
rxLinqQuery = {
    currentCollection: [],
    selectCollection: [],
    setter: function (n) {
        return this.currentCollection = n, rxLinqQuery
    },
    where: function (n) {
        var t = n.match(/^\s*\(?\s*([^)]*)\s*\)?\s*=>(.*)/),
            i = new Function(t[1], "return " + t[2]);
        return this.currentCollection = this.currentCollection.filter(i, undefined), rxLinqQuery
    },
    isObject: function (n) {
        return "object" == typeof n
    },
    functionCreator: function (n) {
        var f = [],
            r = n.match(/^\s*\(?\s*([^)]*)\s*\)?\s*=>(.*)/),
            u, i, t;
        if (this.currentCollection.length > 0 && this.isObject(this.currentCollection[0]))
            for (u = r[2].split(","), i = 0; i < u.length; i++) t = u[i].match(/^\s*\(?\s*([^)]*)\s*\)?\s*==(.*)/), t !== null ? f = {
                accessFunction: new Function(r[1], "return " + t[0]),
                key: t[1].split(".")[1]
            } : (t = u[i].match(/^\s*\(?\s*([^)]*)\s*\)?\s*=(.*)/), t === null ? f.push({
                accessFunction: new Function(r[1], "return " + u[i]),
                key: u[i].split(".")[1]
            }) : f.push({
                accessFunction: new Function(r[1], "return " + t[2]),
                key: t[1].split(".")[1]
            }));
        else f = {
            accessFunction: new Function(r[1], "return " + r[2])
        };
        return f
    },
    select: function (n) {
        var i, u, r, t;
        if (this.defferedSort = null, i = this.functionCreator(n), this.processDefferedSort(), this.currentCollection.length > 0 && this.isObject(this.currentCollection[0]))
            for (t = 0; t < this.currentCollection.length; t++) {
                for (u = {}, r = 0; r < i.length; r++) u[i[r].key] = i[r].accessFunction(this.currentCollection[t]);
                this.selectCollection.push(u)
            } else
            for (t = 0; t < this.currentCollection.length; t++) this.selectCollection.push(i.accessFunction(this.currentCollection[t]));
        return this.currentCollection = this.selectCollection, this.selectCollection = [], rxLinqQuery
    },
    prepend: function (n) {
        return this.currentCollection = [n].concat(this.currentCollection), rxLinqQuery
    },
    indexOf: function (n) {
        for (var i = this.functionCreator(n), t = 0; t < this.currentCollection.length; t++)
            if (t in this.currentCollection && i.accessFunction(this.currentCollection[t])) return t;
        return -1
    },
    lastIndexOf: function (n) {
        for (var i = this.functionCreator(n), t = this.currentCollection.length - 1; t >= 0; t--)
            if (t in this.currentCollection && i.accessFunction(this.currentCollection[t])) return t;
        return -1
    },
    count: function (n) {
        var t = this.functionCreator(n),
            r, i;
        for (t = this.isObject(t) ? t : t[0], r = 0, i = 0; i < this.currentCollection.length; i++) i in this.currentCollection && t.accessFunction(this.currentCollection[i]) && r++;
        return r
    },
    any: function (n) {
        var t = this.functionCreator(n);
        return t = this.isObject(t) ? t : t[0], this.currentCollection.some(t.accessFunction, undefined)
    },
    all: function (n) {
        var t = this.functionCreator(n);
        return t = this.isObject(t) ? t : t[0], this.currentCollection.every(t.accessFunction, undefined)
    },
    first: function (n) {
        var t, i;
        if (n === undefined) return this.currentCollection.length > 0 ? this.currentCollection[0] : undefined;
        for (t = this.functionCreator(n), t = this.isObject(t) ? t : t[0], i = 0; i < this.currentCollection.length; i++)
            if (i in this.currentCollection && t.accessFunction(this.currentCollection[i])) return this.currentCollection[i];
        return undefined
    },
    firstOrDefault: function (n, t) {
        for (var r = this.functionCreator(t), r = this.isObject(r) ? r : r[0], i = 0; i < this.currentCollection.length; i++)
            if (i in this.currentCollection && r.accessFunction(this.currentCollection[i])) return this.currentCollection[i];
        return n
    },
    single: function (n) {
        var t, i;
        if (n === undefined) return this.currentCollection.length > 0 ? this.currentCollection[0] : undefined;
        for (t = this.functionCreator(n), t = this.isObject(t) ? t : t[0], i = 0; i < this.currentCollection.length; i++)
            if (i in this.currentCollection && t.accessFunction(this.currentCollection[i])) return this.currentCollection[i];
        return undefined
    },
    singleOrDefault: function (n, t) {
        for (var r = this.functionCreator(t), r = this.isObject(r) ? r : r[0], i = 0; i < this.currentCollection.length; i++)
            if (i in this.currentCollection && r.accessFunction(this.currentCollection[i])) return this.currentCollection[i];
        return n
    },
    last: function (n) {
        for (var i = this.functionCreator(n), t = this.currentCollection.length - 1; t >= 0; t--)
            if (t in this.currentCollection && i.accessFunction(this.currentCollection[t])) return this.currentCollection[t];
        return undefined
    },
    lastOrDefault: function (n, t) {
        for (var r = this.functionCreator(t), i = this.currentCollection.length - 1; i >= 0; i--)
            if (i in this.currentCollection && r.accessFunction(this.currentCollection[i])) return this.currentCollection[i];
        return undefined
    },
    processDeferredSort: function (n) {
        n.deferredSort == null
    },
    defaultStringCompare: function (n, t) {
        return n < t ? -1 : n > t ? 1 : 0
    },
    defaultStringReverse: function (n, t) {
        return n > t ? -1 : n < t ? 1 : 0
    },
    orderBy: function (n) {
        this.defferedSort = {
            keySelector: function (n, t) {
                return n[t]
            },
            comparer: this.defaultStringCompare,
            reverse: !1,
            next: null
        };
        var t = this.defferedSort;
        return this.currentCollection.sort(function (i, r) {
            return i = t.keySelector(i, n), r = t.keySelector(r, n), t.comparer(i, r)
        }), rxLinqQuery
    },
    orderByDescending: function (n) {
        this.defferedSort = {
            keySelector: function (n, t) {
                return n[t]
            },
            comparer: this.defaultStringReverse,
            reverse: !1,
            next: null
        };
        var t = this.defferedSort;
        return this.currentCollection.sort(function (i, r) {
            return i = t.keySelector(i, n), r = t.keySelector(r, n), t.comparer(i, r)
        }), rxLinqQuery
    },
    thenBy: function (n) {
        var t = this.functionCreator(n);
        return t = this.isObject(t) ? t : t[0], this.defferedSort = this.extendDeferredSort(this.defferedSort, {
            keySelector: t.accessFunction,
            comparer: this.defaultStringCompare,
            reverse: !1,
            next: null
        }), rxLinqQuery
    },
    thenByDescending: function (n) {
        var t = this.functionCreator(n);
        return t = this.isObject(t) ? t : t[0], this.defferedSort = this.extendDeferredSort(this.defferedSort, {
            keySelector: t.accessFunction,
            comparer: this.defaultStringCompare,
            reverse: !0,
            next: null
        }), rxLinqQuery
    },
    extendDeferredSort: function (n, t) {
        var i = function (n) {
            return {
                keySelector: n.keySelector,
                comparer: n.comparer,
                reverse: n.reverse,
                next: n.next == null ? t : i(n.next)
            }
        };
        return i(n)
    },
    processDefferedSort: function () {
        if (this.defferedSort !== null) {
            var n = function (t, i, r) {
                var u;
                return u = r.reverse ? r.comparer(r.keySelector(i), r.keySelector(t)) : r.comparer(r.keySelector(t), r.keySelector(i)), u == 0 ? r.next == null ? 0 : n(t, i, r.next) : u
            };
            this.currentCollection.sort(function (t, i) {
                return n(t, i, rxLinqQuery.defferedSort)
            })
        }
    },
    reverse: function () {
        this.currentCollection.reverse()
    },
    sum: function (n, t) {
        var r = this.functionCreator(n),
            u, i, f;
        for (r = this.isObject(r) ? r : r[0], u = 0, i = 0; i < this.currentCollection.length; i++) i in this.currentCollection && (f = r.accessFunction(this.currentCollection[i]), u += f ? t == undefined ? this.currentCollection[i] : this.currentCollection[i][t] : 0);
        return u
    },
    average: function (n, t) {
        var r = this.functionCreator(n),
            u, e, i, f, o;
        for (r = this.isObject(r) ? r : r[0], u = 0, e = 1, i = 0; i < this.currentCollection.length; i++)
            if (i in this.currentCollection) {
                if (f = r.accessFunction(this.currentCollection[i]), f == null) continue;
                if (isNaN(f)) throw new Error("Encountered an element that is not a number.");
                o = f ? t == undefined ? this.currentCollection[i] : this.currentCollection[i][t] : 0;
                u += (o - u) / e;
                e += 1
            }
        return u
    },
    min: function (n, t) {
        var r, u, i, e, f;
        if (this.currentCollection.length == 0) throw new Error("No minimum element.");
        for (n !== undefined ? (r = this.functionCreator(n), r = this.isObject(r) ? r : r[0]) : n = null, u = n == null ? this.currentCollection[0] : r.accessFunction(this.currentCollection[0]), u = u ? t == undefined ? this.currentCollection[0] : this.currentCollection[0][t] : 0, i = 1; i < this.currentCollection.length; i++) i in this.currentCollection && (e = n == null ? this.currentCollection[i] : r.accessFunction(this.currentCollection[i]), f = e ? t == undefined ? this.currentCollection[i] : this.currentCollection[i][t] : 0, f < u && (u = f));
        return u
    },
    minBy: function (n) {
        var t, r, u, i, f;
        if (this.currentCollection.length == 0) throw new Error("No minimum element.");
        for (n !== undefined ? (t = this.functionCreator(n), t = this.isObject(t) ? t : t[0]) : n = null, r = n == null ? this.currentCollection[0] : t.accessFunction(this.currentCollection[0]), u = this.currentCollection[0], i = 1; i < this.currentCollection.length; i++) i in this.currentCollection && (f = n == null ? this.currentCollection[i] : t.accessFunction(this.currentCollection[i]), f < r && (r = f, u = this.currentCollection[i]));
        return u
    },
    max: function (n) {
        var t, r, i, u;
        if (this.currentCollection.length == 0) throw new Error("No minimum element.");
        for (n !== undefined ? (t = this.functionCreator(n), t = this.isObject(t) ? t : t[0]) : n = null, r = n == null ? this.currentCollection[0] : t.accessFunction(this.currentCollection[0]), i = 1; i < this.currentCollection.length; i++) i in this.currentCollection && (u = n == null ? this.currentCollection[i] : t.accessFunction(this.currentCollection[i]), u > r && (r = u));
        return r
    },
    maxBy: function (n) {
        var t, r, u, i, f;
        if (this.currentCollection.length == 0) throw new Error("No minimum element.");
        for (n !== undefined ? (t = this.functionCreator(n), t = this.isObject(t) ? t : t[0]) : n = null, r = n == null ? this.currentCollection[0] : t.accessFunction(this.currentCollection[0]), u = this.currentCollection[0], i = 1; i < this.currentCollection.length; i++) i in this.currentCollection && (f = n == null ? this.currentCollection[i] : t.accessFunction(this.currentCollection[i]), f > r && (r = f, u = this.currentCollection[i]));
        return u
    },
    skip: function (n) {
        return this.currentCollection.slice(n), rxLinqQuery
    },
    take: function (n) {
        return this.currentCollection.slice(0, n), rxLinqQuery
    },
    defferedSort: null,
    toList: function () {
        return this.currentCollection.length > 0 && this.isObject(this.currentCollection[0]) ? this.currentCollection : []
    },
    toArray: function () {
        return this.currentCollection.length > 0 && !this.isObject(this.currentCollection[0]) ? this.currentCollection : []
    }
};
var regexString = {
    trimLeft: /(^\s*)/g,
    trimRight: /\s+$/,
    normalizeSpace: /\xa0|[ \t]+/g,
    normalizeSpaceBlank: /^\s+|\s+$/g,
    trim: /(^\s*|\s*$)/g,
    isCamelCase: /^[a-z]+([A-Z][a-z]*)*$/,
    isPascalCase: /^([A-Z][a-z]*)+$/,
    isEmpty: /^[\s\xa0]*$/,
    isAlpha: /[^a-zA-Z]/,
    isAlphaNumeric: /[^a-zA-Z0-9]/,
    lessThan: /&lt;/g,
    greaterThan: /&gt;/g,
    quote: /&quot;/g,
    apostrophe: /&apos;/g,
    rightSlash: /&#x2f;/g,
    andOperator: /&amp;/g
},
    dataIdentifier = {
        number: "number",
        string: "string",
        date: "date",
        float: "float"
    },
    rx = {},
    radixApp = angular.module("radix", ["ng"], [function () {
        rx.linq = function (n) {
            return rxLinqQuery.setter(n)
        };
        rx.console = rxLogProvider();
        rx.language = rxLanguageProvider();
        rx.rxString = {
            setter: function (n, t) {
                if (n !== null && n !== undefined) return typeof n === t ? !0 : (exceptionHandler(n), !1)
            },
            exceptionHandler: function (n) {
                throw "Wrong Data : " + n;
            },
            trimLeft: function (n) {
                if (this.setter(n, dataIdentifier.string)) return n.replace(new RegExp(regexString.trimLeft), "")
            },
            trimRight: function (n) {
                if (this.setter(n, dataIdentifier.string)) return n.replace(new RegExp(regexString.trimRight), "")
            },
            normalizeSpaces: function (n) {
                if (this.setter(n, dataIdentifier.string)) return n.replace(new RegExp(regexString.normalizeSpace), " ").replace(new RegExp(regexString.normalizeSpaceBlank), "")
            },
            capitalize: function (n) {
                if (this.setter(n, dataIdentifier.string)) return n.substr(0, 1).toUpperCase() + n.substring(1).toLowerCase()
            },
            camelize: function (n) {
                return n.replace(/(\-|_|\s)+(.)?/g, function (n, t, i) {
                    return i ? i.toUpperCase() : ""
                })
            },
            camelCase: function (n) {
                return n.charAt(0).toLowerCase() + n.slice(1)
            },
            isCamelCase: function (n) {
                if (this.setter(n, dataIdentifier.string)) return new RegExp(regexString.isCamelCase).test(n)
            },
            isPascalCase: function (n) {
                if (this.setter(n, dataIdentifier.string)) return new RegExp(regexString.isPascalCase).test(n)
            },
            pascalCase: function () { },
            titleCase: function () { },
            trim: function (n) {
                if (this.setter(n, dataIdentifier.string)) return n.replace(new RegExp(regexString.trim), "")
            },
            contains: function (n, t) {
                if (this.setter(n, dataIdentifier.string)) return n.indexOf(t) != -1
            },
            mergeString: function () {
                return Array.prototype.join.call(arguments, "")
            },
            toUpper: function () { },
            toLower: function () { },
            toCharArray: function () { },
            toCharArray: function () { },
            substring: function () { },
            startsWith: function () { },
            replaceAll: function () { },
            compare: function (n, t) {
                if (this.setter(n, dataIdentifier.string) && this.setter(t, dataIdentifier.string)) {
                    var i = String(n).toLowerCase(),
                        r = String(t).toLowerCase();
                    return i < r ? -1 : i == r ? 0 : 1
                }
            },
            toNumber: function () {
                var n, t;
                return n = a.replace(La, function (n) {
                    return n = Ka[n], n === Ia && (t = !0), n
                }), t ? parseFloat(n) : parseInt(n, b || 10)
            },
            pad: function (n, t, i) {
                if ((i == undefined || i == null) && (i = " "), this.setter(n, dataIdentifier.string)) {
                    if (n.length <= t) {
                        t = t - n.length;
                        var r = Array(Math.ceil(t / 2) + 1).join(i),
                            u = Array(Math.floor(t / 2) + 1).join(i);
                        return r + n + u
                    }
                    return n
                }
            },
            padLeft: function (n, t, i) {
                if ((i == undefined || i == null) && (i = " "), this.setter(n, dataIdentifier.string)) {
                    if (n.length <= t) {
                        var r = Array(t - n.length + 1).join(i);
                        return r + n
                    }
                    return n
                }
            },
            padRight: function (n, t, i) {
                if ((i == undefined || i == null) && (i = " "), this.setter(n, dataIdentifier.string)) {
                    if (n.length <= t) {
                        var r = Array(t - n.length + 1).join(i);
                        return n + r
                    }
                    return n
                }
            },
            last: function (n, t) {
                return this.setter(t, dataIdentifier.number) && t > 0 && this.setter(n, dataIdentifier.string) ? n.substr(0 > n.length - t ? 0 : n.length - t) : n
            },
            first: function (n, t) {
                return this.setter(t, dataIdentifier.number) && t > 0 && this.setter(n, dataIdentifier.string) ? n.slice(0, t) : undefined
            },
            words: function (n, t) {
                if (this.setter(n, dataIdentifier.string)) return t == undefined ? n.split(t) : n.split(" ")
            },
            unescapeUrl: function (n) {
                if (this.setter(n, dataIdentifier.string)) return decodeURIComponent(n)
            },
            unescapeHtml: function (n) {
                if (this.setter(n, dataIdentifier.string)) return n.replace(new RegExp(regexString.lessThan), "<").replace(new RegExp(regexString.greaterThan), ">").replace(new RegExp(regexString.quote), '"').replace(new RegExp(regexString.apostrophe), "'").replace(new RegExp(regexString.rightSlash), "/").replace(new RegExp(regexString.andOperator), "&")
            },
            isEmpty: function (n) {
                if (this.setter(n, dataIdentifier.string)) return new RegExp(regexString.isEmpty).test(n)
            },
            isBlank: function (n) {
                if (this.setter(n, dataIdentifier.string)) return 0 === n.trim().length
            },
            isAlphaNumeric: function (n) {
                if (this.setter(n, dataIdentifier.string)) return !new RegExp(regexString.isAlphaNumeric).test(n)
            },
            isAlpha: function (n) {
                if (this.setter(n, dataIdentifier.string)) return !new RegExp(regexString.isAlpha).test(n)
            },
            isLower: function (n) {
                if (this.setter(n, dataIdentifier.string)) return this.isAlpha(n) && n.toLowerCase() == n
            },
            truncate: function (n, t) {
                if (this.setter(n, dataIdentifier.string)) return n.substring(0, t) + "..."
            },
            between: function (n, t, i) {
                var r = n,
                    u = r.indexOf(t),
                    f = r.indexOf(i, u + t.length);
                return f == -1 && i != null ? new this.constructor("") : f == -1 && i == null ? r.substring(u + t.length) : r.slice(u + t.length, f)
            },
            encode: function () { },
            decode: function () { }
        };

        rx.cache = {
            global: {
                save: function (n, t) {
                    if (n == "audits")
                        globalAudits = t;
                    else
                        amplify.store(n, t)
                },
                get: function (n) {
                    if (n == "audits")
                        return globalAudits;
                    return amplify.store(n)
                },
                remove: function(n) {
                    return amplify.store(n, null)
                }
            },
            session: {
                save: function(n, t) {
                    amplify.store.sessionStorage(n, t)
                },
                get: function(n) {
                    return amplify.store.sessionStorage(n)
                },
                remove: function(n) {
                    return amplify.store.sessionStorage(n, null)
                }
            }
        };
        rx.progress = {
            show: function () {
                var n = $("#" + rx.appConfiguration.loader.loaderId);
                n[0] == undefined && $("#bodyElement").append('<div id="' + rx.appConfiguration.loader.loaderId + '"><\/div>');
                $("#" + rx.appConfiguration.loader.loaderId).removeClass(rx.appConfiguration.loader.loadOutClass).addClass(rx.appConfiguration.loader.loadInClass);
                $("#" + rx.appConfiguration.loader.loaderId).html(rx.appConfiguration.loader.html)
            },
            hide: function () {
                $("#" + rx.appConfiguration.loader.loaderId).html("");
                $("#" + rx.appConfiguration.loader.loaderId).removeClass(rx.appConfiguration.loader.loadInClass).addClass(rx.appConfiguration.loader.loadOutClass)
            }
        };
        rx.modalValidation = {
            isEntityChanged: !1,
            modalUpdateObject: {},
            modalUpdateObjects: {},
            getModalUpdateObject: {},
            getMergeObjectContext: function (n, t) {
                for (var r, i = 0; i < t.length; i++)
                    if (!angular.isUndefined(t[i]))
                        for (r in t[i]) n[r] = t[i][r];
                return n
            },
            setObjectContext: function (n) {
                modalUpdateObject = {};
                for (var t in n) t != "$$hashKey" && (angular.isArray(n[t]) ? angular.isArray(n[t]) ? (modalUpdateObject[t] = [], jsonArray(n[t], t)) : angular.isObject(n[t]) && (modalUpdateObject[t] = n(n[t])) : modalUpdateObject[t] = n[t])
            },
            setObjectContextArray: function (n, t) {
                modalUpdateObjects[n] = t
            },
            setObjectContexts: function (n, t) {
                modalUpdateObjects[n] = {};
                for (var i in t) i != "$$hashKey" && (angular.isArray(t[i]) ? angular.isArray(t[i]) ? (modalUpdateObjects[n][i] = [], jsonArray(t[i], i)) : angular.isObject(t[i]) && (modalUpdateObjects[n][i] = t(t[i])) : modalUpdateObjects[n][i] = t[i])
            },
            getArrayContext: function (n) {
                for (var r, i, u = [], t = 0; t < n.length; t++) {
                    r = {};
                    for (i in n[t]) i != "$$hashKey" && (r[i] = n[t][i]);
                    u.push(r)
                }
                return u
            },
            getObjectContext: function (n) {
                getModalUpdateObject = {};
                for (var t in n) t != "$$hashKey" && (getModalUpdateObject[t] = n[t]);
                return getModalUpdateObject
            },
            getCurrentObjectContext: function () {
                getModalUpdateObject = {};
                for (var n in modalUpdateObject) n != "$$hashKey" && (getModalUpdateObject[n] = modalUpdateObject[n]);
                return getModalUpdateObject
            },
            getObjectContexts: function (n) {
                getModalUpdateObject = {};
                for (var t in modalUpdateObjects[n]) t != "$$hashKey" && (getModalUpdateObject[t] = modalUpdateObjects[n][t]);
                return getModalUpdateObject
            },
            jsonObject: function (n) {
                var t = {};
                for (var i in n) t[i] = n[i];
                return t
            },
            jsonArray: function (n, t) {
                for (var r, i = 0; i < n.length; i++) {
                    modalUpdateObject[t][i] = {};
                    for (r in n[i]) modalUpdateObject[t][i][r] = angular.isObject(n[i][r]) ? jsonObject(n[i][r]) : n[i][r]
                }
            },
            isChanged: function (n) {
                return !angular.equals(n, modalUpdateObject)
            }
        };
        var n = angular.injector(["rx"]);
        rx.alert = n.get("rxAlert");
        rx.mobile = n.get("rxMobile");
        rx.log = n.get("rxLog");
        rx.encryption = n.get("rxEncode");
        rx.popup = n.get("rxPopup");
        rx.json = n.get("rxJson");
        rx.cookie = n.get("cookieconfig");
        rx.auth = n.get("rxAuth");
        rx.utils = n.get("rxUtils")
    }]);
radix.factory("dataBroadcast", ["$rootScope", function (n) {
    var t = {
        jsonObject: {},
        keyName: ""
    };
    return t.broadcast = function (n, i) {
        t.jsonObject = n;
        t.keyName = i;
        t.broadcastService()
    }, t.broadcastService = function () {
        n.$broadcast("dataServiceBroadcast", this.keyName, this.jsonObject)
    }, t
}]);
radix.directive("rxDisableF12", function () {
    return {
        link: function () {
            document.onkeypress = function (n) {
                return n = n || window.event, n.keyCode == 123 || n.ctrlKey && n.keyCode === 85 || n.ctrlKey && n.keyCode === 83 ? (rx.log.warning("you are doing something wrong !!"), !1) : !0
            };
            document.onmousedown = function (n) {
                return n = n || window.event, n.keyCode == 123 || n.ctrlKey && n.keyCode === 85 || n.ctrlKey && n.keyCode === 83 ? (rx.log.warning("you are doing something wrong !!"), !1) : !0
            };
            document.onkeydown = function (n) {
                return n = n || window.event, n.keyCode == 123 || n.ctrlKey && n.keyCode === 85 || n.ctrlKey && n.keyCode === 83 ? (rx.log.warning("you are doing something wrong !!"), !1) : !0
            }
        }
    }
});
radix.directive("rxUnique", ["$parse", "request", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (n, t, i, r) {
            function f(n, i, r) {
                $(t).tooltip({
                    title: n,
                    html: !0,
                    trigger: i,
                    placement: "bottom",
                    delay: {
                        show: 200,
                        hide: 0
                    }
                });
                r && $(t).tooltip("show")
            }
            var e = !0,
                o = "",
                s = "",
                u = "";
            i.rxUniquemessage != undefined && n.$watch(i.rxUniquemessage, function (n) {
                angular.isUndefined(n) || (s = n)
            });
            i.rxUniqueRequiredMessage != undefined && n.$watch(i.rxUniqueRequiredMessage, function (n) {
                angular.isUndefined(n) || (u = n)
            });
            n.$watch(i.ngModel, function (h) {
                var l, c, a;
                if ($(t).tooltip("destroy"), h != undefined && h != null && h != "") {
                    if (!angular.isUndefined(i.editMode) && e) {
                        e = !1;
                        o = h;
                        $(t).removeClass("rx-error");
                        $(t).addClass("rx-valid");
                        r.$setValidity(i.ngModel, !0);
                        return
                    }
                    o != h ? (l = angular.isUndefined(i.apiUrl) ? "api/DataValidation" : i.apiUrl, c = angular.isUndefined(i.rxUnique) ? undefined : n[i.rxUnique], l == "" || angular.isUndefined(c) || (c.value = h, $.ajax({
                        url: l,
                        type: "POST",
                        data: c,
                        beforeSend: function (n) {
                            var t = amplify.store("oauth");
                            n.setRequestHeader("Authorization", t)
                        },
                        dataType: "json",
                        async: !1,
                        success: function (u) {
                            if (u.length > 0) {
                                $(t).addClass("rx-error");
                                $(t).removeClass("rx-valid");
                                r.$setValidity(i.ngModel, !1);
                                $(t).tooltip("destroy");
                                var e = setTimeout(function () {
                                    f(s, "manual", !0)
                                }, 200)
                            } else $(t).tooltip("destroy"), $(t).removeClass("rx-error"), $(t).addClass("rx-valid"), r.$setValidity(i.ngModel, !0);
                            n.$apply()
                        }
                    }))) : ($(t).tooltip("destroy"), $(t).removeClass("rx-error"), $(t).addClass("rx-valid"), r.$setValidity(i.ngModel, !0))
                } else u != "" && (!angular.isUndefined(i.editMode) && e ? (h == undefined || h == null || h == "") && ($(t).tooltip("destroy"), a = setTimeout(function () {
                    f(u, "hover")
                }, 200)) : ($(t).tooltip("destroy"), a = setTimeout(function () {
                    f(u, "hover")
                }, 200))), $(t).addClass("rx-error"), $(t).removeClass("rx-valid"), r.$setValidity(i.ngModel, !1)
            }, !0)
        }
    }
}]);
radix.directive("rxEnter", function () {
    return function (n, t, i) {
        $(t).keyup(function (r) {
            var u = r.keyCode || r.which;
            u == 13 && n.$apply(function () {
                n.txtValue = $(t).val();
                $(t).blur();
                n.$eval(i.rxEnter + "(txtValue)")
            })
        })
    }
});
radix.directive("rxExplorer", ["$compile", "rxJson", "$rootScope", "$window", "rxExplorerData", "rxAlert", function (n, t, i, r, u, f) {
    return {
        restrict: "E",
        scope: {
            explorerSource: "=",
            explorerOption: "=",
            explorerRootobject: "="
        },
        controller: ["$scope", "$element", function (i, r) {
            i.selectFolderEvent = function () {
                var n;
                i.activeFolder.objectType == "File" ? (i.$parent.selectExEventd = i.activeFolder, n = i.explorerOption.callbacks.fileDownloadEvent + "(selectExEventd)", i.$parent.$eval(n)) : (i.$parent.selectExEvent = i.activeFolder, n = i.explorerOption.callbacks.selectFolderEvent + "(selectExEvent)", i.$parent.$eval(n))
            };
            i.openFolder = function (n) {
                var r, u;
                n.objectType != "File" ? (i.activeFolder = n, i.selectFolderEvent(), i.createFolderShow = !1, $("#rxexplorer-dropdown").removeClass("open"), i.breadCums.push(n), r = t.find(i.explorerSource, {
                    parentObjectId: n.objectId
                }), i.folders = r) : (i.activeFolder = n, i.$parent.selectExEventd = i.activeFolder, u = i.explorerOption.callbacks.fileDownloadEvent + "(selectExEventd)", i.$parent.$eval(u))
            };
            i.setBreadCums = function () { };
            i.backFolder = function (n, r) {
                var f, u, e, o;
                for (i.activeFolder = n, i.selectFolderEvent(), i.createFolderShow = !1, $("#rxexplorer-dropdown").removeClass("open"), f = [], u = r + 1; u < i.breadCums.length; u++) f.push(i.breadCums[u]);
                for (u = 0; u < f.length; u++) e = i.breadCums.indexOf(f[u]), e != -1 && i.breadCums.splice(e, 1);
                o = t.find(i.explorerSource, {
                    parentObjectId: n.objectId
                });
                i.folders = o
            };
            i.activeFolder = {};
            i.showContextMenu = function (n, t, r) {
                if (angular.isUndefined(i.explorerOption.callbacks.contextMenuValidation)) i.showValidateContextMenu(n, t, r);
                else {
                    if (r.parentObjectId == 12 || r.parentObjectId == 13 || r.parentObjectId == 14) return !0;
                    i.$parent.objecte = r.objectId;
                    i.$parent.vobjecte = !0;
                    i.$parent.$eval(i.explorerOption.callbacks.contextMenuValidation + "(objecte,vobjecte)") || i.showValidateContextMenu(n, t, r)
                }
            };
            i.showValidateContextMenu = function (n, t, r) {
                angular.isUndefined(i.explorerOption.callbacks.rightClick) && (i.createFolderShow = !1, i.activeFolder = r, i.activeFolder.objectType != "File" ? r.active ? (i.contextmenus = [{
                    itemName: "Rename"
                }, {
                    itemName: "Delete"
                }, {
                    itemName: "Make Inactive"
                }], $("#rxexplorer-dropdown").removeClass("open"), document.getElementById("rxexplorer-dropdown").style.position = "absolute", document.getElementById("rxexplorer-dropdown").style.display = "inline", document.getElementById("rxexplorer-dropdown").style.left = i.leftPosition + 10 + "px", document.getElementById("rxexplorer-dropdown").style.top = i.topPosition + 5 + "px", $("#rxexplorer-dropdown").addClass("open")) : (i.contextmenus = [{
                    itemName: "Make Active"
                }], $("#rxexplorer-dropdown").removeClass("open"), document.getElementById("rxexplorer-dropdown").style.position = "absolute", document.getElementById("rxexplorer-dropdown").style.display = "inline", document.getElementById("rxexplorer-dropdown").style.left = i.leftPosition + 10 + "px", document.getElementById("rxexplorer-dropdown").style.top = i.topPosition + 5 + "px", $("#rxexplorer-dropdown").addClass("open")) : r.active ? (i.contextmenus = [{
                    itemName: "Rename File"
                }, {
                    itemName: "Delete File"
                }], $("#rxexplorer-dropdown").removeClass("open"), document.getElementById("rxexplorer-dropdown").style.position = "absolute", document.getElementById("rxexplorer-dropdown").style.display = "inline", document.getElementById("rxexplorer-dropdown").style.left = i.leftPosition + 10 + "px", document.getElementById("rxexplorer-dropdown").style.top = i.topPosition + 5 + "px", $("#rxexplorer-dropdown").addClass("open")) : (i.contextmenus = [{
                    itemName: "Active File"
                }], $("#rxexplorer-dropdown").removeClass("open"), document.getElementById("rxexplorer-dropdown").style.position = "absolute", document.getElementById("rxexplorer-dropdown").style.display = "inline", document.getElementById("rxexplorer-dropdown").style.left = i.leftPosition + 10 + "px", document.getElementById("rxexplorer-dropdown").style.top = i.topPosition + 5 + "px", $("#rxexplorer-dropdown").addClass("open")))
            };
            i.getRootFolderName = function (n) {
                if (n.parentObjectId == 0) i.currentRootFolderName = n.objectName;
                else {
                    var r = t.find(i.explorerSource, {
                        objectId: n.parentObjectId
                    })[0];
                    i.getRootFolderName(r)
                }
            };
            i.createFolderExplorer = function (n) {
                for (var u, o, s, f = t.find(i.explorerSource, {
                    parentObjectId: i.activeFolder.objectId
                }), e = !1, r = 0; r < f.length; r++)
                    if (f[r].objectName.toLowerCase() == n.toLowerCase()) {
                        e = !0;
                        break
                    }
                if (e) alert("Folder already exist");
                else {
                    for (i.$parent.createNameF = n, i.$parent.createParent = angular.isUndefined(i.activeFolder.parentObjectId) ? i.explorerRootobject.objectId : i.activeFolder.objectId, i.getRootFolderName(i.activeFolder), u = "", o = i.breadCums.length - 1, r = 0; r < i.breadCums.length; r++) u += o == r ? i.breadCums[r].objectName : i.breadCums[r].objectName + "/";
                    i.$parent.tpath = u;
                    i.$parent.cRootFolder = i.currentRootFolderName;
                    s = i.explorerOption.callbacks.createEvent + "(createNameF,createParent,tpath,cRootFolder)";
                    i.$parent.$eval(s);
                    i.CreateFolderText = ""
                }
            };
            i.getActiveClass = function (n) {
                return n.active ? angular.isUndefined(n.objectType) ? "folder-color icon-folder-close" : n.objectType == "Folder" ? "folder-color icon-folder-close" : "folder-color icon-file-text" : angular.isUndefined(n.objectType) ? "folder-color-inactive icon-folder-close" : n.objectType == "Folder" ? "folder-color-inactive icon-folder-close" : "folder-color-inactive icon-file-text"
            };
            i.contextEvent = function (n) {
                var u, e, v, y, r, c, l, s, a, h, o;
                i.createFolderShow = !1;
                u = "";
                e = !0;
                i.$parent.eventObject = i.activeFolder;
                switch (n.itemName) {
                    case "Rename":
                        v = t.find(i.explorerSource, {
                            parentObjectId: i.activeFolder.objectId
                        });
                        v.length > 0 ? (f.show({
                            dataCollection: [],
                            titleText: "Alert",
                            contentText: "Item is In Use, do you wish to proceed?",
                            okText: "Yes",
                            cancelText: "No",
                            cancelRequired: undefined,
                            callbacks: {
                                ok: "callRenameFolderEvent"
                            }
                        }, i), e = !1) : i.renameFolderEvent();
                        break;
                    case "Delete":
                        o = t.find(i.explorerSource, {
                            parentObjectId: i.activeFolder.objectId
                        });
                        o.length > 0 ? (f.show({
                            dataCollection: [],
                            titleText: "Alert",
                            contentText: "Item is In Use, cannot delete.",
                            cancelRequired: !1,
                            callbacks: {
                                ok: "deleteFolderEvent"
                            }
                        }, i), e = !1) : u = i.explorerOption.callbacks.deleteEvent + "(eventObject)";
                        break;
                    case "Make Inactive":
                        y = t.find(i.explorerSource, {
                            parentObjectId: i.activeFolder.objectId
                        });
                        y.length > 0 ? f.show({
                            dataCollection: [],
                            titleText: "Alert",
                            contentText: "Item has attachments",
                            cancelRequired: !1,
                            callbacks: {
                                ok: "alertOkClicked"
                            }
                        }, i) : (i.activeFolder.objectName = i.activeFolder.objectName + " (Inactive)", u = i.explorerOption.callbacks.inactiveEvent + "(eventObject)");
                        break;
                    case "Make Active":
                        i.activeFolder.objectName = i.activeFolder.objectName.replace(" (Inactive)", "");
                        u = i.explorerOption.callbacks.activeEvent + "(eventObject)";
                        break;
                    case "Rename File":
                        if (angular.isUndefined(i.showInputBox) || i.showInputBox != !0) {
                            f.inputBox({
                                titleText: "Rename File",
                                contentText: "Please Enter File Name : ",
                                maxLength: 50,
                                cancelRequired: !1,
                                callbacks: {
                                    ok: "fileNameEntered",
                                    cancel: "commentEnteredCancel"
                                }
                            }, i);
                            return
                        }
                        if (i.showInputBox = !1, r = i.renameFolderName, r != null && r.trim() != null)
                            if (r.trim() != "")
                                if (i.activeFolder.objectType == "File" && (c = i.activeFolder.objectName.split(".")[1], l = r.split("."), r = l.length > 1 ? l[0] + "." + c : r.trim() + "." + c), s = t.find(i.explorerSource, {
                                    parentObjectId: i.activeFolder.parentObjectId
                                }), s.length > 0) {
                                    for (a = !1, h = 0; h < s.length; h++)
                                        if (s[h].objectName.toLowerCase() == r.toLowerCase()) {
                                            a = !0;
                                            break
                                        }
                                    a ? i.contextEvent(n) : (i.$parent.renameNameF = r, u = i.explorerOption.callbacks.renameEvent + "(eventObject,renameNameF)")
                                } else i.$parent.renameNameF = r, u = i.explorerOption.callbacks.renameEvent + "(eventObject,renameNameF)";
                            else i.contextEvent(n);
                        else e = !1;
                        break;
                    case "Delete File":
                        o = t.find(i.explorerSource, {
                            parentObjectId: i.activeFolder.objectId
                        });
                        o.length > 0 ? e = !1 : u = i.explorerOption.callbacks.deleteEvent + "(eventObject)"
                }
                e && i.$parent.$eval(u);
                $("#rxexplorer-dropdown").removeClass("open")
            };
            i.alertOkClicked = function () {
                f.hide()
            };
            i.deleteFolderEvent = function () {
                f.hide()
            };
            i.characterLimitExceed = function () {
                f.hide();
                i.renameFolderEvent()
            };
            i.callRenameFolderEvent = function () {
                var n = setTimeout(function () {
                    i.renameFolderEvent()
                }, 1)
            };
            i.callInactiveFolderEvent = function () {
                var n = "";
                i.activeFolder.objectName = i.activeFolder.objectName + " (Inactive)";
                n = i.explorerOption.callbacks.inactiveEvent + "(eventObject)";
                i.$parent.$eval(n)
            };
            i.renameFolderEvent = function () {
                var n, c, u, e, o, s, r, h, l;
                if (i.$parent.eventObject = i.activeFolder, angular.isUndefined(i.showInputBox) || i.showInputBox != !0) {
                    f.inputBox({
                        titleText: "Rename Folder",
                        contentText: "Please Enter Folder Name : ",
                        maxLength: 50,
                        cancelRequired: !1,
                        callbacks: {
                            ok: "folderNameEntered",
                            cancel: "commentEnteredCancel"
                        }
                    }, i);
                    return
                }
                if (i.showInputBox = !1, n = i.renameFolderName, n != null && n.trim() != null)
                    if (n.trim() != "") {
                        if (c = n.length, n.length > 50) {
                            f.show({
                                dataCollection: [],
                                titleText: "Alert",
                                contentText: "Character limit exceed",
                                cancelRequired: !1,
                                callbacks: {
                                    ok: "characterLimitExceed"
                                }
                            }, i);
                            return
                        }
                        for (i.activeFolder.objectType == "File" && (u = i.activeFolder.objectName.split(".")[1], e = n.split("."), n = e.length > 1 ? e[0] + "." + u : n.trim() + "." + u), o = t.find(i.explorerSource, {
                            parentObjectId: i.activeFolder.parentObjectId
                        }), s = !1, r = 0; r < o.length; r++)
                            if (o[r].objectName.toLowerCase() == n.toLowerCase()) {
                                s = !0;
                                break
                            }
                        s ? (alert("Folder already exist"), i.renameFolderEvent()) : (i.$parent.renameNameF = n, h = i.explorerOption.callbacks.renameEvent + "(eventObject,renameNameF)", i.$parent.$eval(h))
                    } else i.renameFolderEvent();
                else l = !1
            };
            i.folderNameEntered = function (n) {
                i.renameFolderName = n;
                i.showInputBox = !0;
                i.renameFolderEvent();
                f.hide()
            };
            i.fileNameEntered = function (n) {
                if (n != null && n.trim() != null && n.trim() != "") {
                    i.renameFolderName = n;
                    i.showInputBox = !0;
                    var t = [];
                    t.itemName = "Rename File";
                    i.contextEvent(t);
                    f.hide()
                }
            };
            i.createNewFolder = function () {
                var n = i.explorerOption.callbacks.createNewFolder + "()";
                i.$parent.$eval(n)
            };
            i.setFunctions = function () {
                i.createFolderShow = !1;
                i.explorerSource.deleteFolder = function () {
                    var n = i.explorerSource.indexOf(i.activeFolder),
                        t = i.folders.indexOf(i.activeFolder);
                    n != -1 && i.explorerSource.splice(n, 1);
                    t != -1 && i.folders.splice(t, 1)
                };
                i.explorerSource.showPopup = function (n, t) {
                    $(".popover").remove();
                    i.popupTemplate = {
                        popupCss: n
                    };
                    i.popupTemplateSrc = {
                        src: t
                    };
                    $("#rxEplorerPopupTemplate").modal({
                        backdrop: "static",
                        keyboard: !1
                    });
                    $("#popupTemplate").modal("show")
                };
                i.explorerSource.createFolder = function () {
                    i.removeContextMenu();
                    i.CreateFolderText = "";
                    i.createFolderShow = !0;
                    var n = setTimeout(function () {
                        $("#CreateFolderText").focus()
                    }, 100)
                };
                i.explorerSource.searchFolder = function (n) {
                    if (i.createFolderShow = !1, i.firstTextSearch && (e = i.folders, i.firstTextSearch = !1), $("#rxexplorer-dropdown").removeClass("open"), n != "" && n != undefined) {
                        var r = t.advanceFilter(i.explorerSource, {
                            objectName: n
                        });
                        i.folders = r
                    } else i.folders = e, i.firstTextSearch = !0
                };
                i.explorerSource.addFolder = function (n) {
                    i.explorerSource.push(n);
                    i.folders.push(n);
                    i.createFolderShow = !1
                };
                i.explorerSource.resetExplorer = function (n, t) {
                    i.breadCums = [];
                    i.explorerRootobject = t;
                    i.explorerSource = n;
                    i.setExplorer()
                };
                i.explorerSource.inactiveAllChilds = function () {
                    for (var r = t.find(i.explorerSource, {
                        parentObjectId: i.activeFolder.parentObjectId
                    }), n = 0; n < r.length; n++) r[n].active = !1
                };
                i.explorerSource.activeAllChilds = function () {
                    for (var r = t.find(i.explorerSource, {
                        parentObjectId: i.activeFolder.parentObjectId
                    }), n = 0; n < r.length; n++) r[n].active = !0
                };
                i.explorerSource.setActiveFolder = function (n) {
                    i.removeContextMenu();
                    i.activeFolder = t.find(i.explorerSource, {
                        objectId: n
                    })[0];
                    i.activeFolder.objectName = i.activeFolder.objectName.replace(" (Inactive)", "");
                    i.folders = t.find(i.explorerSource, {
                        parentObjectId: n
                    })
                };
                u.setExplorerSource("explorer", i.explorerSource)
            };
            i.firstTextSearch = !0;
            var e = [];
            i.removeContextMenu = function () {
                angular.isUndefined(i.CreateFolderText) || i.CreateFolderText == "" || i.createFolderExplorer(i.CreateFolderText);
                $("#rxexplorer-dropdown").removeClass("open")
            };
            i.createFolderShow = !1;
            i.isCustomChange = !1;
            i.breadCums = [];
            i.setExplorer = function () {
                var u, f, e;
                i.setFunctions();
                i.isCustomChange = !0;
                i.activeFolder = i.explorerRootobject;
                i.breadCums.push(i.explorerRootobject);
                i.selectFolderEvent();
                i.folders = t.find(i.explorerSource, {
                    parentObjectId: i.explorerRootobject.objectId
                });
                u = angular.isUndefined(i.explorerOption.showBreadCrumb) ? "" : i.explorerOption.showBreadCrumb ? '<div class="breadcrumbs rx-explorer"  ><i class="bigger-175  folder-color icon-folder-close"><\/i><ul class="breadcrumb"><li ng-repeat="breadcum in breadCums" ng-click="backFolder(breadcum,$index)" ><span ng-class="{active:$last}">{{breadcum.objectName}}<\/span><\/li><\/ul><div class="nav-search pull-right" id="nav-search"><button class="btn btn-primary btn-width ml10" ng-click="createNewFolder()" title="Add New Folder"><i class="icon-plus icon-on-left"><\/i><\/button> <\/div><\/div>' : "";
                f = '<div id="rxExplorers" ng-click="removeContextMenu()" style="clear:both;">' + u + '<div style="clear:both;"  ><table class="table table-hover-explorer"><thead class="background-gray-light"><tr><th>Name<\/th><th>Date Modified<\/th><th>Type<\/th><\/tr><\/thead><tbody><tr><td colspan="3" ng-show="folders.length == 0">No folder found.<\/td><\/tr><tr ng-repeat="folder in folders" rx-right-click="showContextMenu($event,$element,folder)" ng-click="openFolder(folder)"><td><i ng-class="getActiveClass(folder)" class=" bigger-175 "><\/i> {{folder.objectName | foldertexttruncate}}<\/td><td>{{folder.lastUpdatedDate | rxdatefilter}}<\/td><td>{{folder.objectType}}<\/td><\/tr><tr ng-show="createFolderShow" ><td><i class="icon-folder-close bigger-175 folder-color"><\/i> <input type="text" maxlength="50" rx-enter="createFolderExplorer" id="CreateFolderText" ng-model="CreateFolderText" class="form-control"/><\/td><td><\/td><td>File Folder<\/td><\/tr><\/tbody><\/table><div id="rxexplorer-dropdown" class="dropdown "><ul aria-labelledby="drop4" role="menu" class="dropdown-menu" id="menu1"><li role="presentation" ng-repeat="contextmenu in contextmenus" ng-click="contextEvent(contextmenu)" class="cursor"><a  tabindex="-1" role="menuitem">{{contextmenu.itemName}}<\/a><\/li><\/ul><\/div><\/div><\/div>';
                $("#rxEplorerPopupTemplate").remove();
                e = '<div  id="rxEplorerPopupTemplate" class="modal fade {{popupTemplate.popupCss}} showpopup"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true"><div ng-include src="popupTemplateSrc.src"><\/div><\/div>';
                $(r).html(n(f)(i));
                $("#bodyElement").append(n(e)(i));
                $("#rxExplorers").mousemove(function (n) {
                    var t = $(this).parent().offset(),
                        r = n.pageX - t.left,
                        u = n.pageY - t.top;
                    i.leftPosition = r;
                    i.topPosition = u;
                    i.$apply()
                });
                $("#rxEplorerPopupTemplate").on("hidden.bs.modal", function () {
                    i.$apply(function () {
                        i.popupTemplateSrc = {
                            src: "Scripts/lib/rxapp/template/blank.html",
                            popupCss: ""
                        }
                    })
                })
            };
            i.$watch("explorerSource", function (n) {
                angular.isUndefined(n) || i.isCustomChange || i.setExplorer()
            })
        }],
        link: function () { },
        replace: !0
    }
}]);
radix.factory("rxAlert", ["$compile", "$rootScope", "appConfig", "cookieconfig", function (n, t) {
    var i = function (n, t) {
        for (var i = 0; i < t.length; i++) n = n.replace("{" + i + "}", t[i]);
        return n
    },
        r = function () {
            $('#rxPopupFactory[style*="display: block;"]').length > 0 && $("#rxPopupFactory").addClass("displayNoneAlert");
            $('#rxPopupFactorysubPopup[style*="display: block;"]').length > 0 && $("#rxPopupFactorysubPopup").addClass("displayNoneAlert")
        };
    return openPopupIfExists = function () {
        $("#rxPopupFactory.displayNoneAlert").length > 0 && $("#rxPopupFactory").removeClass("displayNoneAlert");
        $("#rxPopupFactorysubPopup.displayNoneAlert").length > 0 && $("#rxPopupFactorysubPopup").removeClass("displayNoneAlert")
    }, {
            show: function (r, u) {
                var e = "",
                    o, f;
                if (!angular.isUndefined(r.dataCollection)) {
                    for (e = "<ol>", o = 0; o < r.dataCollection.length; o++) e += "<li>" + r.dataCollection[o] + "<\/li>";
                    e += "<\/ol>"
                }
                f = angular.isUndefined(r.callbacks.save) ? "Ok" : "Don't Save";
                rx.rxString.first(r.titleText, 1) == "@" && (r.titleText = rx.language.getPropertyValue(r.titleText), r.cancelText = angular.isUndefined(r.cancelText) ? "Cancel" : rx.language.getPropertyValue(r.cancelText), r.okText = angular.isUndefined(r.okText) ? f : rx.language.getPropertyValue(r.okText), r.contentText = angular.isUndefined(r.contentText) ? r.contentText : rx.language.getPropertyValue(r.contentText), r.labels != undefined && (r.titleText = r.labels.titleText != undefined ? i(r.titleText, r.labels.titleText) : r.titleText, r.cancelText = r.labels.cancelText != undefined ? i(r.cancelText, r.labels.cancelText) : r.cancelText, r.okText = r.labels.okText != undefined ? i(r.okText, r.labels.okText) : r.okText, r.contentText = r.labels.contentText != undefined ? i(r.contentText, r.labels.contentText) : r.contentText));
                var h = angular.isUndefined(r.callbacks.ok) ? "" : 'ng-click="' + r.callbacks.ok + '(true)"',
                    c = angular.isUndefined(r.callbacks.cancel) ? "" : 'ng-click="' + r.callbacks.cancel + '(false)"',
                    l = angular.isUndefined(r.callbacks.save) ? "" : 'ng-click="' + r.callbacks.save + '"',
                    s = angular.isUndefined(r.saveText) ? "Save" : r.saveText,
                    a = angular.isUndefined(r.callbacks.save) ? !angular.isUndefined(r.bpme) && !angular.isUndefined(r.bpme.bpmeRuleCheck) && r.bpme.bpmeRuleCheck ? '<button  class="btn btn-primary " ng-click="alertBpmeCheck()">' + s + "<\/button>" : "" : '<button  class="btn btn-primary " ' + l + ">" + s + "<\/button>";
                f = angular.isUndefined(r.okText) ? f : r.okText;
                var v = angular.isUndefined(r.cancelText) ? "Cancel" : r.cancelText,
                    y = "<button  class='btn btn-primary showRxalertOK' " + h + ">" + f + "<\/button>",
                    p = angular.isUndefined(r.cancelRequired) ? '<button  class="btn btn-primary showRxalert" id="alertCancel" ' + c + " >" + v + "<\/button>" : "",
                    w = ' <div class="mainOverlayout"><div class="alertbox"><div id="rxAlert" class="alertbox"><div class="modal-header"><h5>' + r.titleText + '<\/h5><\/div><div class="modal-body"><div class="row"><div class="col-lg-12">' + r.contentText + "<br />" + e + '<\/div><\/div><\/div><div class="modal-footer">' + a + y + p + "<\/div><\/div><\/div><\/div>";
                $("#rxload").removeClass("rxloadout").addClass("rxloadin");
                $("#rxload").html(n(w)(u));
                $(".showRxalertOK").click(function () {
                    $("#rxload").removeClass("rxloadin").addClass("rxloadout")
                });
                $(".showRxalert").click(function () {
                    t.isEntityChanged = !0;
                    t.entityChangeRedirect = !0;
                    t.isEntityChangeCall = !0;
                    t.$apply();
                    $("#rxload").removeClass("rxloadin").addClass("rxloadout")
                })
            },
            promptBox: function (t, u) {
                var e, f, o;
                u.rxAlertModel = undefined;
                rx.rxString.first(t.titleText, 1) == "@" ? (t.titleText = rx.language.getPropertyValue(t.titleText), t.cancelText = angular.isUndefined(t.cancelText) ? "Cancel" : rx.language.getPropertyValue(t.cancelText), t.okText = angular.isUndefined(t.okText) ? "Ok" : rx.language.getPropertyValue(t.okText), t.contentText = angular.isUndefined(t.contentText) ? t.contentText : rx.language.getPropertyValue(t.contentText), t.labels != undefined && (t.titleText = t.labels.titleText != undefined ? i(t.titleText, t.labels.titleText) : t.titleText, t.cancelText = t.labels.cancelText != undefined ? i(t.cancelText, t.labels.cancelText) : t.cancelText, t.okText = t.labels.okText != undefined ? i(t.okText, t.labels.okText) : t.okText, t.contentText = t.labels.contentText != undefined ? i(t.contentText, t.labels.contentText) : t.contentText)) : (t.cancelText = angular.isUndefined(t.cancelText) ? "Cancel" : t.cancelText, t.okText = angular.isUndefined(t.okText) ? "Ok" : t.okText);
                e = '<button  class="btn btn-primary" ng-click="' + t.callbacks.ok + '(rxAlertModel)">' + t.okText + "<\/button>";
                f = "";
                f = angular.isUndefined(t.callbacks.cancel) ? '<button  class="btn btn-primary"  id="alertCancel" >' + t.cancelText + "<\/button>" : '<button  class="btn btn-primary" ng-click="' + t.callbacks.cancel + '(rxAlertModel)"  id="alertCancel" >' + t.cancelText + "<\/button>";
                o = ' <div class="mainOverlayout"><div class="alertbox"><div id="rxAlert" class="alertbox"><div class="modal-header"><h5>' + t.titleText + '<\/h5><\/div><div class="modal-body"><div class="row"><div class="col-lg-12">' + t.contentText + '<\/div><\/div><div class="row"><div class="col-lg-12"><textarea autofocus maxlength="' + t.maxLength + '" class="form-control" ng-model="rxAlertModel" cols="50" rows="4"><\/textarea><\/div><\/div><\/div><div class="modal-footer">' + e + f + "<\/div><\/div><\/div><\/div>";
                $("#rxload").removeClass("rxloadout").addClass("rxloadin");
                $("#rxload").html(n(o)(u));
                r();
                $("#alertCancel").click(function () {
                    $("#rxload").removeClass("rxloadin").addClass("rxloadout")
                })
            },
            inputBox: function (t, u, f) {
                var o, e, s;
                u.rxAlertModel = f != undefined ? f : undefined;
                rx.rxString.first(t.titleText, 1) == "@" ? (t.titleText = rx.language.getPropertyValue(t.titleText), t.cancelText = angular.isUndefined(t.cancelText) ? "Cancel" : rx.language.getPropertyValue(t.cancelText), t.okText = angular.isUndefined(t.okText) ? "Ok" : rx.language.getPropertyValue(t.okText), t.contentText = angular.isUndefined(t.contentText) ? t.contentText : rx.language.getPropertyValue(t.contentText), t.labels != undefined && (t.titleText = t.labels.titleText != undefined ? i(t.titleText, t.labels.titleText) : t.titleText, t.cancelText = t.labels.cancelText != undefined ? i(t.cancelText, t.labels.cancelText) : t.cancelText, t.okText = t.labels.okText != undefined ? i(t.okText, t.labels.okText) : t.okText, t.contentText = t.labels.contentText != undefined ? i(t.contentText, t.labels.contentText) : t.contentText)) : (t.cancelText = angular.isUndefined(t.cancelText) ? "Cancel" : t.cancelText, t.okText = angular.isUndefined(t.okText) ? "Ok" : t.okText);
                o = '<button  class="btn btn-primary" ng-click="' + t.callbacks.ok + '(rxAlertModel)">' + t.okText + "<\/button>";
                e = "";
                e = angular.isUndefined(t.callbacks.cancel) ? '<button  class="btn btn-primary"  id="alertCancel" >' + t.cancelText + "<\/button>" : '<button  class="btn btn-primary" ng-click="' + t.callbacks.cancel + '(rxAlertModel)"  id="alertCancel" >' + t.cancelText + "<\/button>";
                s = ' <div class="mainOverlayout"><div class="alertbox"><div id="rxAlert" class="alertbox"><div class="modal-header"><h5>' + t.titleText + '<\/h5><\/div><div class="modal-body"><div class="row"><div class="col-lg-12">' + t.contentText + '<\/div><\/div><div class="row"><div class="col-lg-12"><input type="text" autofocus maxlength="' + t.maxLength + '" class="form-control" ng-model="rxAlertModel"><\/input><\/div><\/div><\/div><div class="modal-footer">' + o + e + "<\/div><\/div><\/div><\/div>";
                $("#rxload").removeClass("rxloadout").addClass("rxloadin");
                $("#rxload").html(n(s)(u));
                r();
                $("#alertCancel").click(function () {
                    $("#rxload").removeClass("rxloadin").addClass("rxloadout")
                })
            },
            hide: function () {
                openPopupIfExists();
                $("#rxload").removeClass("rxloadin").addClass("rxloadout")
            },
            currentAlertOption: {},
            scopeOption: {},
            currentUrl: "",
            confirmBox: function () {
                var i = t.currentAlertOption,
                    r = "",
                    u;
                if (!angular.isUndefined(i.dataCollection)) {
                    for (r = "<ol>", u = 0; u < i.dataCollection.length; u++) r += "<li>" + i.dataCollection[u] + "<\/li>";
                    r += "<\/ol>"
                }
                var f = angular.isUndefined(i.callbacks.ok) ? "" : 'ng-click="' + i.callbacks.ok + '(true)"',
                    e = angular.isUndefined(i.callbacks.cancel) ? "" : 'ng-click="' + i.callbacks.cancel + '(false)"',
                    o = angular.isUndefined(i.callbacks.save) ? "" : 'ng-click="' + i.callbacks.save + '"',
                    s = angular.isUndefined(i.callbacks.save) ? "" : '<button  class="btn btn-primary " ' + o + ">Save<\/button>",
                    h = angular.isUndefined(i.callbacks.save) ? "Ok" : "Don't Save",
                    c = "<button  class='btn btn-primary dontsave' " + f + ">" + h + "<\/button>",
                    l = angular.isUndefined(i.cancelRequired) ? '<button  class="btn btn-primary showRxalert" id="alertCancel" ' + e + " >Cancel<\/button>" : "",
                    a = ' <div class="mainOverlayout"><div class="alertbox"><div id="rxAlert" class="alertbox"><div class="modal-header"><h5>' + i.titleText + '<\/h5><\/div><div class="modal-body"><div class="row"><div class="col-lg-12">' + i.contentText + "<br />" + r + '<\/div><\/div><\/div><div class="modal-footer">' + s + c + l + "<\/div><\/div><\/div><\/div>";
                $("#rxload").removeClass("rxloadout").addClass("rxloadin");
                $("#rxload").html(n(a)(t.scopeOption));
                $(".dontsave").click(function () {
                    t.$apply()
                });
                $(".showRxalert").click(function () {
                    $("#rxload").removeClass("rxloadin").addClass("rxloadout")
                })
            }
        }
}]);
radix.directive("rxNumber", ["$parse", function (n) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (t, i, r) {
            function o(n) {
                function i(n) {
                    var i = String(n).match(t);
                    return i != null && String(i[0]) == String(n) ? !0 : !1
                }
                var t = /^\s*\d+\s*$/;
                return angular.isUndefined(r.decimal) || (t = /^\d*(\.)?\d*$/), i(n) ? !0 : !1
            }

            function s(n) {
                return f ? !1 : n.startsWith("0") && n.charAt(1) != "." && n.length > 1 ? !0 : !1
            }

            function h(n) {
                for (var t = !1; t == !1;) f ? t = !0 : n.startsWith("0") && n.charAt(1) != "." && n.length > 1 ? n = n.substr(1, n.length) : t = !0;
                return n
            }
            var u = n(r.ngModel),
                e = !0,
                f = angular.isUndefined(r.isMultipleZero) ? !1 : r.isMultipleZero == "false" ? !1 : !0;
            $(i).keypress(function (n) {
                var r = i[0].value.split(""),
                    u = typeof n.which == "number" ? n.which : n.keyCode,
                    t;
                return u == 8 ? !0 : (r.splice(n.currentTarget.selectionStart, n.currentTarget.selectionEnd, String.fromCharCode(u)), t = r.join(""), s(t)) ? !1 : o(t)
            });
            $(i).change(function () {
                t.$apply(function () {
                    var n = i[0].value,
                        r;
                    n = h(n);
                    r = !1;
                    n.indexOf(".") != -1 ? (n.endsWith(".") ? (n = n.substr(0, n.length - 1), f ? u.assign(t, n) : u.assign(t, Number(n)), r = !0) : n.startsWith(".") && (n = "0" + n, f ? u.assign(t, n) : u.assign(t, Number(n)), r = !0), n.startsWith("0") && n.charAt(1) != "." && !f && (n = n.substr(1, n.length), u.assign(t, Number(n)), r = !0)) : n.startsWith("0") && n.length > 1 && !f && (n = n.substr(1, n.length), u.assign(t, Number(n)), r = !0);
                    r || n != null && n != "" && (f ? u.assign(t, n) : u.assign(t, Number(n)))
                })
            });
            $(i).on("paste", function () {
                e = !0
            });
            $(i).blur(function () {
                i[0].value != null && i[0].value != "" && u.assign(t, Number(i[0].value))
            });
            t.$watch(r.ngModel, function () {
                e && (e = !1, o(i[0].value) || u.assign(t, undefined))
            })
        }
    }
}]);
radix.directive("rxDecimal", ["$parse", function (n) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (t, i, r) {
            function e(n) {
                function u(s) {
                    i[0].value.indexOf(".") != -1 && r.rxDecimal != null && parseInt(r.rxDecimal) > 0 && (t = "/^[0-9]*(.)?[0-9]{1," + parseInt(r.rxDecimal) + "}/", t = eval(t));
                    var matchedChar = String(s).match(t);
                    return matchedChar != null && String(matchedChar[0]) == String(s) ? !0 : !1
                }
                var t = /^\d*(\.)?$/;
                return u(n) ? !0 : !1
            }

            function s(n) {
                return n.startsWith("0") && n.charAt(1) != "." && n.length > 1 ? !0 : !1
            }

            function h(n) {
                for (var t = !1; t == !1;) n.startsWith("0") && n.charAt(1) != "." && n.length > 1 ? n = n.substr(1, n.length) : t = !0;
                return n
            }

            function o(n) {
                if (n.indexOf(".") != -1) {
                    var t = n.substr(n.indexOf(".") + 1, n.length - 1);
                    return parseInt(t) == 0 ? !0 : !1
                }
            }
            var u = n(r.ngModel),
                f = !0;
            $(i).keypress(function (n) {
                var t = i[0].value.split(""),
                    r = n.keyCode || n.charCode,
                    u;
                return r == 8 ? !0 : t.indexOf(".") == -1 && r == 46 ? !0 : (t.splice(n.currentTarget.selectionStart, n.currentTarget.selectionEnd == n.currentTarget.selectionStart ? 0 : n.currentTarget.selectionEnd, String.fromCharCode(r)), u = t.join(""), s(u)) ? !1 : e(u)
            });
            $(i).focusout(function (n) {
                var u = n.keyCode || n.charCode,
                    t = i[0].value.split(""),
                    r;
                if (u == 8 || t.indexOf(".") == -1 && u == 46) return !0;
                t.splice(n.currentTarget.selectionStart, n.currentTarget.selectionEnd == n.currentTarget.selectionStart ? 0 : n.currentTarget.selectionEnd, String.fromCharCode(n.keyCode));
                r = t.join("");
                (r.indexOf("e") || r.indexOf("E")) != -1 && $(i).val("")
            });
            $(i).change(function () {
                t.$apply(function () {
                    var n = i[0].value,
                        f, e;
                    n = h(n);
                    f = !1;
                    n.indexOf(".") != -1 ? (n.endsWith(".") ? parseInt(r.rxDecimal) > 0 ? (e = new Array(parseInt(r.rxDecimal) + 1).join("0"), n += e, u.assign(t, n), f = !0) : (n = n.substr(0, n.length - 1), u.assign(t, Number(n))) : n.startsWith(".") && (n = "0" + n, u.assign(t, Number(n)), f = !0), n.startsWith("0") && n.charAt(1) != "." && (n = n.substr(1, n.length), u.assign(t, Number(n)), f = !0)) : n.startsWith("0") && n.length > 1 && (n = n.substr(1, n.length), u.assign(t, Number(n)), f = !0);
                    f || n != null && n != "" && (o(n) ? u.assign(t, n) : u.assign(t, Number(n)))
                })
            });
            $(i).blur(function () {
                i[0].value != null && i[0].value != "" && (o(i[0].value) ? u.assign(t, i[0].value) : u.assign(t, Number(i[0].value)))
            });
            $(i).on("paste", function () {
                f = !0
            });
            t.$watch(r.ngModel, function () {
                f && (f = !1, e(i[0].value) || u.assign(t, undefined))
            })
        }
    }
}]);
radix.factory("rxCalenderData", ["$rootScope", function () {
    var n = {};
    return n.setActiveCalender = function (t, i, r, u, f, e) {
        n[t] = i;
        n[r] = u;
        n[f] = e
    }, n.setActiveCalenderOptions = function (t, i) {
        n[t] = i
    }, n.setActiveRow = function (t, i) {
        n[t] = i
    }, n
}]);
radix.factory("rxUserPermission", function () {
    return {
        permissionContext: [],
        mainContext: [],
        maintenanceContext: [],
        entryType: "",
        backOfficeContext: [],
        securityGeneralItems: [],
        currentUserPermissionItem: ""
    }
});
radix.directive("rxCalender", ["$compile", "rxJson", "rxCalenderData", "rxPopup", function (n, t, i, r) {
    return {
        restrict: "E",
        scope: {
            calenderDates: "=",
            datesAvaibility: "=",
            calenderMonths: "=",
            calenderOption: "="
        },
        controller: ["$scope", "$element", function (u, f) {
            var e = "";
            u.calendarViewColumns = 0;
            u.setPopover = function (n) {
                return t.find(u.datesAvaibility, {
                    dateId: n.applicationDateId
                })
            };
            u.getMonthName = function (n) {
                switch (n) {
                    case 1:
                        return "January";
                    case 2:
                        return "February";
                    case 3:
                        return "March";
                    case 4:
                        return "April";
                    case 5:
                        return "May";
                    case 6:
                        return "June";
                    case 7:
                        return "July";
                    case 8:
                        return "August";
                    case 9:
                        return "September";
                    case 10:
                        return "October";
                    case 11:
                        return "November";
                    case 12:
                        return "December"
                }
            };
            u.setFunctions = function () {
                u.calenderDates.resetCalender = function (n, t, i, r) {
                    u.calenderDates = n;
                    u.datesAvaibility = t;
                    u.calenderMonths = i;
                    u.contentClass = angular.isUndefined(u.calenderOption) ? "month" : angular.isUndefined(u.calenderOption.defaultSelected) ? "month" : u.calenderOption.defaultSelected;
                    r != undefined && (u.contentClass = r);
                    u.currentWeek = undefined;
                    u.currentDay = undefined;
                    u.setRxCalender()
                };
                u.calenderDates.resetCalenderAvaibility = function (n) {
                    u.datesAvaibility = n;
                    u.contentClass = angular.isUndefined(u.calenderOption) ? "month" : angular.isUndefined(u.calenderOption.defaultSelected) ? "month" : u.calenderOption.defaultSelected;
                    u.currentWeek = undefined;
                    u.currentDay = undefined;
                    u.setRxCalender()
                };
                u.calenderDates.resetCalenderView = function (n) {
                    u.calendarViewColumns = n;
                    u.contentClass = angular.isUndefined(u.calenderOption) ? "month" : angular.isUndefined(u.calenderOption.defaultSelected) ? "month" : u.calenderOption.defaultSelected;
                    u.currentWeek = undefined;
                    u.currentDay = undefined;
                    u.setRxCalender()
                };
                i.setActiveCalender("currentCalender", u.calenderDates)
            };
            u.initCalender = function () {
                var p, i, l, b, s, r, a, n, k, d;
                angular.isUndefined(u.calenderOption) || angular.isUndefined(u.calenderOption.calenderMaster) || angular.isUndefined(u.calenderOption.calenderMaster.template) || angular.isUndefined(u.calenderOption.calenderMaster.template.viewTemplate) || $.ajax({
                    url: u.calenderOption.calenderMaster.template.viewTemplate,
                    async: !1
                }).done(function (n) {
                    e = n
                });
                u.calendarViewColumns == 0 && (u.calendarViewColumns = u.calenderMonths.defaultCalenderView);
                var v = [];
                if (u.calenderMonths.endMonth < u.calenderMonths.startMonth) {
                    for (p = 12 - u.calenderMonths.startMonth, i = u.calenderMonths.startMonth, n = 0; n < p; n++) v.push({
                        monthId: i,
                        monthName: u.getMonthName(i),
                        dates: t.find(u.calenderDates, {
                            applicationMonthId: i,
                            applicationYearId: u.calenderMonths.startYearId
                        })
                    }), i++;
                    for (n = 1; n <= u.calenderMonths.endMonth; n++) v.push({
                        monthId: n + 1,
                        monthName: u.getMonthName(n + 1),
                        dates: t.find(u.calenderDates, {
                            applicationMonthId: n + 1,
                            applicationYearId: u.calenderMonths.endYearId
                        })
                    })
                } else if (angular.isUndefined(u.calenderMonths.endMonth)) i = u.calenderMonths.startMonth, v.push({
                    monthId: i,
                    monthName: u.getMonthName(i),
                    dates: t.find(u.calenderDates, {
                        applicationMonthId: i,
                        applicationYearId: u.calenderMonths.startYearId
                    })
                });
                else
                    for (p = u.calenderMonths.endMonth - u.calenderMonths.startMonth, i = u.calenderMonths.startMonth, n = 0; n < p; n++) v.push({
                        monthId: i,
                        monthName: u.getMonthName(i),
                        dates: t.find(u.calenderDates, {
                            applicationMonthId: i,
                            applicationYearId: u.calenderMonths.startYearId
                        })
                    }), i++;
                var w = u.calendarViewColumns,
                    i = 0,
                    f = 0,
                    c = 1,
                    o = [];
                for (o[f] = {}, o[f].columns = [], l = v, b = "", b = w == 1 ? "col-lg-12 col-xs-12" : w == 2 ? "col-lg-6  col-xs-6" : "col-lg-4  col-xs-6", s = 0; s < l.length; s++) {
                    r = l[s].dates;
                    a = 1;
                    c = 0;
                    var y = 0,
                        h = [],
                        g = r.length - 1;
                    for (n = 0; n < r.length; n++) {
                        if (n == 0 && h.push({
                            week: []
                        }), a == r[n].applicationDayId) h[y].week.push(r[n]);
                        else {
                            for (k = 0; k < r[n].applicationDayId - 1; k++) h[y].week.push({
                                applicationDateId: 0,
                                applicationYearId: 0,
                                applicationMonthId: 0,
                                applicationDayId: 0,
                                monthDate: 0,
                                dateBooked: []
                            });
                            a = r[n].applicationDayId;
                            c = r[n].applicationDayId - 1;
                            h[y].week.push(r[n])
                        }
                        if (g == n)
                            for (d = c; d < 6; d++) h[y].week.push({
                                applicationDateId: 0,
                                applicationYearId: 0,
                                applicationMonthId: 0,
                                applicationDayId: 0,
                                monthDate: 0,
                                dateBooked: []
                            });
                        a == 7 ? a = 1 : a++;
                        c == 6 ? (y++ , c = 0, h.push({
                            week: []
                        })) : c++
                    }
                    l[s].dates = h;
                    w < 4 && (i < w ? (o[f].columns.push({
                        divClass: b,
                        months: l[s]
                    }), i++) : (i = 1, f++ , o[f] = {}, o[f].columns = [], o[f].columns.push({
                        divClass: b,
                        months: l[s]
                    })))
                }
                u.calendars = o
            };
            u.setDisplayMode = function (n) {
                var t = new Date,
                    f = t.getDate(),
                    e = t.getMonth() + 1,
                    r, i;
                n == "week" ? (t = new Date, r = t.getDay(), u.$parent.startDateData = moment().subtract(t.getDay(), "days").format("L"), i = 6 - t.getDay(), u.$parent.endDateData = moment().add(i, "days").format("L"), u.lastDateOfWeek = u.$parent.endDateData, u.calenderOption.calenderMaster.callbacks.weekView != undefined && u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.weekView + "(startDateData, endDateData)")) : n == "day" ? (u.$parent.currentDateData = moment().format("L"), u.dateOfMonth = u.$parent.currentDateData, u.calenderOption.calenderMaster.callbacks.dayView != undefined && u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.dayView + "(currentDateData)")) : (u.$parent.currentYearData = u.weekViewCalendars[0].applicationYearId, u.$parent.currentMonth = u.weekViewCalendars[0].applicationMonthId, u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.resetCalender + "(currentMonth,'month',currentYearData)"))
            };
            u.displayModeContent = function (n) {
                u.contentClass = n;
                u.setDisplayMode(n)
            };
            u.getFirstWeek = function (n) {
                var f = "",
                    t, e, i, o, r, s;
                if (n != undefined) {
                    for (i = 0; i < n.length; i++)
                        if (!angular.isUndefined(n[i].applicationDate)) {
                            e = i;
                            t = new Date(n[i].applicationYear, n[i].applicationMonthId - 1, n[i].applicationDate);
                            break
                        }
                    return e != 0 ? (t.setDate(t.getDate() - e), o = u.getMonthName(t.getMonth() + 1), f += u.getMultilingulalMonth(o) + " " + t.getDate(), r = new Date(t.setDate(t.getDate() + (e + (6 - e)))), s = u.getMonthName(r.getMonth() + 1), f + (" - " + u.getMultilingulalMonth(s) + " " + r.getDate() + " " + t.getFullYear())) : (o = u.getMonthName(t.getMonth() + 1), f += u.getMultilingulalMonth(o) + " " + t.getDate(), r = new Date(t.setDate(t.getDate() + 6)), s = u.getMonthName(r.getMonth() + 1), f + (" - " + u.getMultilingulalMonth(s) + " " + r.getDate() + " " + t.getFullYear()))
                }
                return f
            };
            u.firstTime = !1;
            u.setRxCalender = function () {
                var r, i, s;
                u.setFunctions();
                u.firstTime = !0;
                u.initCalender();
                var t = "",
                    e = (new Date).getDate(),
                    o = (new Date).getMonth() + 1,
                    h = angular.isUndefined(u.calenderOption.currentDayCss) ? "" : 'ng-class="{' + u.calenderOption.currentDayCss + ": (week.applicationDate == " + e + " && cols.months.monthId == " + String(o) + ')}"';
                if (u.contentClass == "week") u.weekViewCalendars = u.calendars[0].columns[0].months.dates[0].week;
                else if (u.contentClass == "day") {
                    for (r = [], i = 0; i < u.calendars[0].columns[0].months.dates[0].week.length; i++) u.calendars[0].columns[0].months.dates[0].week[i].applicationDateId != 0 && r.push(u.calendars[0].columns[0].months.dates[0].week[i]);
                    u.weekViewCalendars = r
                }
                u.timeViews = [{
                    time: 1,
                    currentTime: "00:00 AM"
                }, {
                    time: 2,
                    currentTime: "00:30 AM"
                }, {
                    time: 3,
                    currentTime: "01:00 AM"
                }, {
                    time: 4,
                    currentTime: "01:30 AM"
                }, {
                    time: 5,
                    currentTime: "02:00 AM"
                }, {
                    time: 6,
                    currentTime: "02:30 AM"
                }, {
                    time: 7,
                    currentTime: "03:00 AM"
                }, {
                    time: 8,
                    currentTime: "03:30 AM"
                }, {
                    time: 9,
                    currentTime: "04:00 AM"
                }, {
                    time: 10,
                    currentTime: "04:30 AM"
                }, {
                    time: 11,
                    currentTime: "05:00 AM"
                }, {
                    time: 12,
                    currentTime: "05:30 AM"
                }, {
                    time: 13,
                    currentTime: "06:00 AM"
                }, {
                    time: 14,
                    currentTime: "06:30 AM"
                }, {
                    time: 15,
                    currentTime: "07:00 AM"
                }, {
                    time: 16,
                    currentTime: "07:30 AM"
                }, {
                    time: 17,
                    currentTime: "08:00 AM"
                }, {
                    time: 18,
                    currentTime: "08:30 AM"
                }, {
                    time: 19,
                    currentTime: "09:00 AM"
                }, {
                    time: 20,
                    currentTime: "09:30 AM"
                }, {
                    time: 21,
                    currentTime: "10:00 AM"
                }, {
                    time: 22,
                    currentTime: "10:30 AM"
                }, {
                    time: 23,
                    currentTime: "11:00 AM"
                }, {
                    time: 24,
                    currentTime: "11:30 AM"
                }, {
                    time: 25,
                    currentTime: "12:00 PM"
                }, {
                    time: 26,
                    currentTime: "12:30 PM"
                }, {
                    time: 27,
                    currentTime: "01:00 PM"
                }, {
                    time: 28,
                    currentTime: "01:30 PM"
                }, {
                    time: 29,
                    currentTime: "02:00 PM"
                }, {
                    time: 30,
                    currentTime: "02:30 PM"
                }, {
                    time: 31,
                    currentTime: "03:00 PM"
                }, {
                    time: 32,
                    currentTime: "03:30 PM"
                }, {
                    time: 33,
                    currentTime: "04:00 PM"
                }, {
                    time: 34,
                    currentTime: "04:30 PM"
                }, {
                    time: 35,
                    currentTime: "05:00 PM"
                }, {
                    time: 36,
                    currentTime: "05:30 PM"
                }, {
                    time: 37,
                    currentTime: "06:00 PM"
                }, {
                    time: 38,
                    currentTime: "06:30 PM"
                }, {
                    time: 39,
                    currentTime: "07:00 PM"
                }, {
                    time: 40,
                    currentTime: "07:30 PM"
                }, {
                    time: 41,
                    currentTime: "08:00 PM"
                }, {
                    time: 42,
                    currentTime: "08:30 PM"
                }, {
                    time: 43,
                    currentTime: "09:00 PM"
                }, {
                    time: 44,
                    currentTime: "09:30 PM"
                }, {
                    time: 45,
                    currentTime: "10:00 PM"
                }, {
                    time: 46,
                    currentTime: "10:30 PM"
                }, {
                    time: 47,
                    currentTime: "11:00 PM"
                }, {
                    time: 48,
                    currentTime: "11:30 PM"
                },];
                t = '<div class="row " ng-repeat="line in calendars"><div ng-repeat="cols in line.columns" class="{{cols.divClass}}"><table style="width: 100%" class="fc-header" ><tbody ><tr><td class="fc-header-left"><\/td><td class="fc-header-center"><span class="fc-header-title"><h2 ng-if="contentClass == &quot;month&quot;">{{getMultilingulalMonth(cols.months.monthName) | filteryear : cols.months.dates}}<\/h2><h2 ng-if="contentClass == &quot;week&quot;">{{getFirstWeek(weekViewCalendars)}}<\/h2><h2 ng-if="contentClass == &quot;day&quot;" ng-bind="getTitleDay()"><\/h2><\/span><\/td><td class="fc-header-right"><\/td><\/tr><tr><td class="fc-header-left"><button class="btn btn-primary btn-width ml10" ng-click="resetToDefault()" ng-show="showResetButton()" title="Reset To Default"><i class="icon-undo"><\/i><\/button><\/td><td class="fc-header-center"><\/td><td class="pull-right"><\/td><\/tr><tr><td class="fc-header-left" ng-show="showNavigationButtons()"><a ng-click="movePrevious()" class="decoration-none" style="text-decoration: none;"><i class="icon-double-angle-left"><\/i> {{getMultilingulalNavigation(&quot;Previous&quot;)}} <\/a><span>  |  <\/span><a ng-click="moveNext()" class="decoration-none" style="text-decoration: none;"> {{getMultilingulalNavigation(&quot;Next&quot;)}} <i class="icon-double-angle-right"><\/i><\/a><\/td><td class="fc-header-center"><\/td><td class="pull-right" ng-show="showDisplayMode()"><button class="fc-button fc-button-month fc-state-default fc-corner-left" ng-class="{&quot;fc-state-active&quot;: contentClass == &quot;month&quot;, &quot;fc-state-default&quot;:contentClass != &quot;month&quot;}" unselectable="on" ng-click="displayModeContent(&quot;month&quot;)">{{getMultilingulalviewContent(&quot;month&quot;)}}<\/button><button class="fc-button fc-button-agendaWeek" ng-class="{&quot;fc-state-active&quot;: contentClass == &quot;week&quot;, &quot;fc-state-default&quot;:contentClass != &quot;week&quot;}" ng-click="displayModeContent(&quot;week&quot;)">{{getMultilingulalviewContent(&quot;week&quot;)}}<\/button><button class="fc-button fc-button-agendaDay  fc-corner-right" ng-class="{&quot;fc-state-active&quot;: contentClass == &quot;day&quot;, &quot;fc-state-default&quot;:contentClass != &quot;day&quot;}" ng-click="displayModeContent(&quot;day&quot;)">{{getMultilingulalviewContent(&quot;day&quot;)}}<\/button><\/td><\/tr><\/tbody><\/table>';
                u.contentClass == "month" ? t += '<table cellspacing="0" style="width: 100%" class="table calendar-schedule calendardays alignCenter table-bordered" ng-if="contentClass == &quot;month&quot;"><thead ><tr class="background-blue "><th class="alignCenter" style="width: 14.28571428571429%;">' + u.getMultilingulalDay("Sunday") + '<\/th><th class="alignCenter" style="width: 14.28571428571429%;">' + u.getMultilingulalDay("Monday") + '<\/th><th class="alignCenter" style="width: 14.28571428571429%;">' + u.getMultilingulalDay("Tuesday") + '<\/th><th class="alignCenter" style="width: 14.28571428571429%;">' + u.getMultilingulalDay("Wednesday") + '<\/th><th class="alignCenter" style="width: 14.28571428571429%;">' + u.getMultilingulalDay("Thursday") + '<\/th><th class="alignCenter" style="width: 14.28571428571429%;">' + u.getMultilingulalDay("Friday") + '<\/th><th class="alignCenter" style="width: 14.28571428571429%;">' + u.getMultilingulalDay("Saturday") + '<\/th><\/tr><\/thead><tbody ><tr ng-if="calendar.week.length>0" ng-repeat="calendar in cols.months.dates" style="height:100px;"><td   ng-repeat="week in calendar.week" style="padding:0px !important;"' + h + '><div><div ng-hide="hideRow(week.applicationDate,true,week)" class="date" >{{week.applicationDate | nullIdentifier : 0}}<\/div><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr ng-class="getNgClassCss(_jsonA)"  ng-repeat="candidateAvaibilityr in _jsonA = setPopover(week) | limitTo : 2" style="padding:0px;"><td ng-style="setColor(candidateAvaibilityr)" ng-click="viewTemplateMonth(week,$index,$event)"  align="center">{{showCellLabel(candidateAvaibilityr)}}<\/td><\/tr><tr ng-show="_jsonA.length > 2"><td style="padding:0px 0px 0px 0px"><div class="more" id="{{week.applicationDateId}}" ng-click="viewTemplateMonth(week,undefined,$event)">{{_jsonA.length - 2}} more items<\/div><\/td><\/tr><\/table><\/div><\/td><\/tr><\/tbody><\/table>' : (s = angular.isUndefined(u.calenderOption.currentDayCss) ? "" : 'ng-class="{' + u.calenderOption.currentDayCss + ": (week.applicationDate == " + e + " && week.applicationMonthId == " + String(o) + ')}"', t += '<div class="fc-content" style="position: relative;"><div class="fc-view fc-view-agendaWeek fc-agenda"><table style="width:100%" class="fc-agenda-days fc-border-separate calendardays alignCenter table-bordered" cellspacing="0"><thead><tr class="fc-first fc-last background-blue"><th class="fc-agenda-axis fc-widget-header fc-first" style="width: 4%;">&nbsp;<\/th><th class="fc-agenda-axis fc-widget-header fc-first alignCenter" ng-style="getContentWiseStyle()" style="text-align:center" ng-repeat="week in _week = getWeekDays(weekViewCalendars)">{{week}}<\/th><\/tr><\/thead><tbody ><tr class="fc-first fc-last" ng-repeat="timeView in timeViews"><td class="fc-col0 fc-sun fc-widget-content calendardays" ng-bind="timeView.currentTime"><\/td><td class="fc-col0 fc-sun fc-widget-content calendardays week-active-data"' + s + ' ng-style="setColorWeek(week,timeView.time)"  ng-repeat="week in weekViewCalendars" ><div ng-bind="getWeekTimeData(week,timeView.time,$index)"  id="{{timeView.time}}{{week.applicationDayId}}{{$index}}" ng-click="viewTemplateCalender(week,timeView.time,$event)"><\/div><\/td><\/tr><\/tbody><\/table>');
                t += "<\/div><\/div><\/div><\/div>";
                $(f).html(n(t)(u))
            };
            u.getMultilingulalDay = function (n) {
                return !angular.isUndefined(u.calenderOption.calenderMaster.labels) && !angular.isUndefined(u.calenderOption.calenderMaster.labels.day) && !angular.isUndefined(u.calenderOption.calenderMaster.labels.day[n]) ? rx.rxString.first(u.calenderOption.calenderMaster.labels.day[n], 1) == "@" ? rx.language.getPropertyValue(u.calenderOption.calenderMaster.labels.day[n]) : u.calenderOption.calenderMaster.labels.day[n] : n
            };
            u.getMultilingulalMonth = function (n) {
                return !angular.isUndefined(u.calenderOption.calenderMaster.labels) && !angular.isUndefined(u.calenderOption.calenderMaster.labels.month) && !angular.isUndefined(u.calenderOption.calenderMaster.labels.month[n]) ? rx.rxString.first(u.calenderOption.calenderMaster.labels.month[n], 1) == "@" ? rx.language.getPropertyValue(u.calenderOption.calenderMaster.labels.month[n]) : u.calenderOption.calenderMaster.labels.month[n] : n
            };
            u.getMultilingulalNavigation = function (n) {
                return !angular.isUndefined(u.calenderOption.calenderMaster.labels) && !angular.isUndefined(u.calenderOption.calenderMaster.labels.navigation) && !angular.isUndefined(u.calenderOption.calenderMaster.labels.navigation[n]) ? rx.rxString.first(u.calenderOption.calenderMaster.labels.navigation[n], 1) == "@" ? rx.language.getPropertyValue(u.calenderOption.calenderMaster.labels.navigation[n]) : u.calenderOption.calenderMaster.labels.navigation[n] : n
            };
            u.getMultilingulalviewContent = function (n) {
                return !angular.isUndefined(u.calenderOption.calenderMaster.labels) && !angular.isUndefined(u.calenderOption.calenderMaster.labels.viewContent) && !angular.isUndefined(u.calenderOption.calenderMaster.labels.viewContent[n]) ? rx.rxString.first(u.calenderOption.calenderMaster.labels.viewContent[n], 1) == "@" ? rx.language.getPropertyValue(u.calenderOption.calenderMaster.labels.viewContent[n]) : u.calenderOption.calenderMaster.labels.viewContent[n] : n
            };
            u.getTitleDay = function () {
                if (angular.isUndefined(u.weekViewCalendars[0])) return "";
                if (u.weekViewCalendars[0].applicationDate !== 0) {
                    var n = u.getMultilingulalDay(u.weekViewCalendars[0].applicationDay),
                        t = u.getMultilingulalMonth(u.weekViewCalendars[0].applicationMonth);
                    return n + "," + t + " " + u.weekViewCalendars[0].applicationDate + ", " + u.weekViewCalendars[0].applicationYear
                }
                return ""
            };
            u.getWeekName = function (n) {
                switch (n) {
                    case 0:
                        return "Sunday";
                    case 1:
                        return "Monday";
                    case 2:
                        return "Tuesday";
                    case 3:
                        return "Wednesday";
                    case 4:
                        return "Thursday";
                    case 5:
                        return "Friday";
                    case 6:
                        return "Saturday"
                }
            };
            u.getWeekDays = function (n) {
                var r, i, f, t, e;
                if (n != undefined) {
                    for (r = [], t = 0; t < n.length; t++)
                        if (!angular.isUndefined(n[t].applicationDate)) {
                            f = t;
                            i = new Date(n[t].applicationYear, n[t].applicationMonthId - 1, n[t].applicationDate);
                            break
                        }
                    for (f != 0 && i.setDate(i.getDate() - f), t = 0; t < n.length; t++) t != 0 && (i = new Date(i.setDate(i.getDate() + 1))), e = u.getWeekName(i.getDay()), u.dayViewText = u.getMultilingulalDay(e), u.monthViewText = i.getMonth() + 1, u.dateViewText = i.getDate(), u.yearViewText = i.getFullYear(), u.calenderOption.calenderMaster.labels.format != undefined && (u.firstLabel = u.calenderOption.calenderMaster.labels.format.firstLabel != undefined ? u[u.calenderOption.calenderMaster.labels.format.firstLabel] : "", u.secondLabel = u.calenderOption.calenderMaster.labels.format.secondLabel != undefined ? u[u.calenderOption.calenderMaster.labels.format.secondLabel] : "", u.thirdLabel = u.calenderOption.calenderMaster.labels.format.thirdLabel != undefined ? u[u.calenderOption.calenderMaster.labels.format.thirdLabel] : "", u.fourthLabel = u.calenderOption.calenderMaster.labels.format.fourthLabel != undefined ? u[u.calenderOption.calenderMaster.labels.format.fourthLabel] : "", u.seperatorFirst = u.calenderOption.calenderMaster.labels.format.seperatorFirst != undefined ? u.calenderOption.calenderMaster.labels.format.seperatorFirst : " ", u.seperatorSecond = u.calenderOption.calenderMaster.labels.format.seperatorSecond != undefined ? u.calenderOption.calenderMaster.labels.format.seperatorSecond : " ", u.seperatorThird = u.calenderOption.calenderMaster.labels.format.seperatorThird != undefined ? u.calenderOption.calenderMaster.labels.format.seperatorThird : " "), r.push(u.firstLabel + u.seperatorFirst + u.secondLabel + u.seperatorSecond + u.thirdLabel + u.seperatorThird + u.fourthLabel);
                    return r
                }
            };
            u.getContentWiseStyle = function () {
                return u.contentClass == "week" ? {
                    width: "13.71%"
                } : {
                        width: "96%"
                    }
            };
            u.setColor = function (n) {
                return {
                    "background-color": n.colorCode
                }
            };
            u.setColorWeek = function (n, i) {
                return u.findDatas = t.find(u.datesAvaibility, {
                    dateId: n.applicationDateId,
                    dataTime: i
                }), u.findDatas.length > 0 ? {
                    "background-color": u.findDatas[0].colorCode
                } : void 0
            };
            u.viewTemplateCalender = function (f, o, s) {
                var c = "#" + s.currentTarget.id,
                    h = t.find(u.datesAvaibility, {
                        dateId: f.applicationDateId,
                        dataTime: o
                    }),
                    l;
                h.length > 1 ? ($(c).popover({
                    placement: u.contentClass == "week" ? "right" : "bottom",
                    html: !0,
                    title: "Items (" + h.length + ')<button type="button" class="pull-right close popover-title-close"  onclick=$(".popover").remove()><i class="glyphicon glyphicon-remove"><\/i><\/button>',
                    trigger: "click",
                    container: "body",
                    delay: {
                        show: angular.isUndefined(rx.appConfiguration.popoverOption) || angular.isUndefined(rx.appConfiguration.popoverOption.delay.show) ? 200 : rx.appConfiguration.popoverOption.delay.show,
                        hide: angular.isUndefined(rx.appConfiguration.popoverOption) || angular.isUndefined(rx.appConfiguration.popoverOption.delay.hide) ? 100 : rx.appConfiguration.popoverOption.delay.hide
                    },
                    content: function () {
                        return $(c).popover("destroy"), $(".popover").remove(), u.$apply(function () {
                            u.findData = h;
                            var t = "<div>" + e + "<\/div>";
                            return n(t)(u)
                        })
                    }
                }), l = setTimeout(function () {
                    $(c).popover("show")
                }, 200), angular.isUndefined(u.calenderOption) || angular.isUndefined(u.calenderOption.calenderMaster) || angular.isUndefined(u.calenderOption.calenderMaster.callbacks) || angular.isUndefined(u.calenderOption.calenderMaster.callbacks.select) || (u.$parent.jsonObject = h, u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.select + "(jsonObject)"))) : h.length > 0 && (angular.isUndefined(u.calenderOption) || angular.isUndefined(u.calenderOption.calenderMaster) || (angular.isUndefined(u.calenderOption.calenderMaster.template) || angular.isUndefined(u.calenderOption.calenderMaster.template.editTemplate) || ($(".popover").remove(), i.setActiveRow("currentCellData", h), r.showPopup(u.calenderOption.calenderMaster.template.editTemplate, "")), angular.isUndefined(u.calenderOption.calenderMaster.callbacks) || angular.isUndefined(u.calenderOption.calenderMaster.callbacks.select) || (u.$parent.jsonObject = h[0], u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.select + "(jsonObject)"))))
            };
            u.viewTemplateMonth = function (f, o, s) {
                var c = "#" + s.currentTarget.id,
                    h = t.find(u.datesAvaibility, {
                        dateId: f.applicationDateId
                    }),
                    l;
                angular.isUndefined(o) ? (h.splice(0, 2), h.length > 0 && ($(c).popover({
                    placement: f.applicationDayId == 7 ? "left" : "right",
                    html: !0,
                    title: "Items (" + h.length + ')<button type="button" class="pull-right close popover-title-close"  onclick=$(".popover").remove()><i class="glyphicon glyphicon-remove"><\/i><\/button>',
                    trigger: "click",
                    container: "body",
                    delay: {
                        show: angular.isUndefined(rx.appConfiguration.popoverOption) || angular.isUndefined(rx.appConfiguration.popoverOption.delay.show) ? 200 : rx.appConfiguration.popoverOption.delay.show,
                        hide: angular.isUndefined(rx.appConfiguration.popoverOption) || angular.isUndefined(rx.appConfiguration.popoverOption.delay.hide) ? 100 : rx.appConfiguration.popoverOption.delay.hide
                    },
                    content: function () {
                        return $(c).popover("destroy"), $(".popover").remove(), u.$apply(function () {
                            u.findData = h;
                            var t = "<div>" + e + "<\/div>";
                            return n(t)(u)
                        })
                    }
                }), l = setTimeout(function () {
                    $(c).popover("show")
                }, 200), angular.isUndefined(u.calenderOption) || angular.isUndefined(u.calenderOption.calenderMaster) || angular.isUndefined(u.calenderOption.calenderMaster.callbacks) || angular.isUndefined(u.calenderOption.calenderMaster.callbacks.select) || (u.$parent.jsonObject = h, u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.select + "(jsonObject)")))) : h.length > 0 && o <= 1 && (angular.isUndefined(u.calenderOption) || angular.isUndefined(u.calenderOption.calenderMaster) || (angular.isUndefined(u.calenderOption.calenderMaster.template) || angular.isUndefined(u.calenderOption.calenderMaster.template.editTemplate) || ($(".popover").remove(), i.setActiveRow("currentCellData", h[o]), r.showPopup(u.calenderOption.calenderMaster.template.editTemplate, "")), angular.isUndefined(u.calenderOption.calenderMaster.callbacks) || angular.isUndefined(u.calenderOption.calenderMaster.callbacks.select) || (u.$parent.jsonObject = h[o], u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.select + "(jsonObject)"))))
            };
            u.getWeekTimeData = function (n, i) {
                var r = t.find(u.datesAvaibility, {
                    dateId: n.applicationDateId,
                    dataTime: i
                });
                return r.length > 1 ? "Items (" + r.length + ")" : r.length == 0 ? "" : !angular.isUndefined(u.calenderOption) && !angular.isUndefined(u.calenderOption.calenderMaster) && !angular.isUndefined(u.calenderOption.calenderMaster.cellItemTextColumn) ? r[0][u.calenderOption.calenderMaster.cellItemTextColumn] : void 0
            };
            u.getWeekTimeDataLength = function (n, i) {
                var r = t.find(u.datesAvaibility, {
                    dateId: n.applicationDateId,
                    dataTime: i
                });
                return angular.isUndefined(r.length) ? 0 : r.length
            };
            u.showCellLabel = function (n) {
                if (!angular.isUndefined(u.calenderOption) && !angular.isUndefined(u.calenderOption.calenderMaster) && !angular.isUndefined(u.calenderOption.calenderMaster.cellItemTextColumn)) return n[u.calenderOption.calenderMaster.cellItemTextColumn]
            };
            u.getNgClassCss = function (n) {
                return n.length == 1 ? "height-100 row-task" : n.length == 2 ? "height-50 row-task" : "height-33 row-task"
            };
            u.hideRow = function (n) {
                return n == "" || n == null ? !0 : !1
            };
            u.movePrevious = function () {
                u.contentClass == "month" ? (u.$parent.currentYearData = u.$parent.currentYearData == undefined ? u.currentMonth == 1 ? u.calenderMonths.startYearId - 1 : u.calenderMonths.startYearId : u.currentMonth == 1 ? u.$parent.currentYearData - 1 : u.$parent.currentYearData, u.currentMonth = u.currentMonth == 1 ? 12 : u.currentMonth - 1, u.$parent.currentMonth = u.currentMonth, u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.resetCalender + "(currentMonth,'month',currentYearData)")) : u.contentClass == "week" ? (u.$parent.endDateData = moment(u.lastDateOfWeek).subtract(6, "days").format("L"), u.$parent.startDateData = moment(u.$parent.endDateData).subtract(6, "days").format("L"), u.lastDateOfWeek = u.$parent.endDateData, u.calenderOption.calenderMaster.callbacks.weekView != undefined && u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.weekView + "(startDateData, endDateData)")) : u.contentClass == "day" && (u.$parent.currentDateData = moment(u.dateOfMonth).subtract(1, "days").format("L"), u.dateOfMonth = u.$parent.currentDateData, u.calenderOption.calenderMaster.callbacks.dayView != undefined && u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.dayView + "(currentDateData)"))
            };
            u.moveNext = function () {
                u.contentClass == "month" ? (u.$parent.currentYearData = u.$parent.currentYearData == undefined ? u.currentMonth == 12 ? u.calenderMonths.startYearId + 1 : u.calenderMonths.startYearId : u.currentMonth == 12 ? u.$parent.currentYearData + 1 : u.$parent.currentYearData, u.currentMonth = u.currentMonth == 12 ? 1 : u.currentMonth + 1, u.$parent.currentMonth = u.currentMonth, u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.resetCalender + "(currentMonth,'month',currentYearData)")) : u.contentClass == "week" ? (u.$parent.startDateData = moment(u.lastDateOfWeek).add(1, "days").format("L"), u.$parent.endDateData = moment(u.$parent.startDateData).add(6, "days").format("L"), u.lastDateOfWeek = u.$parent.endDateData, u.calenderOption.calenderMaster.callbacks.weekView != undefined && u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.weekView + "(startDateData, endDateData)")) : u.contentClass == "day" && (u.$parent.currentDateData = moment(u.dateOfMonth).add(1, "days").format("L"), u.dateOfMonth = u.$parent.currentDateData, u.calenderOption.calenderMaster.callbacks.dayView != undefined && u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.dayView + "(currentDateData)"))
            };
            u.resetToDefault = function () {
                u.$parent.$eval(u.calenderOption.calenderMaster.callbacks.resetToDefault + "()");
                u.currentMonth = u.calenderOption.defaultMonth
            };
            u.showResetButton = function () {
                return u.calenderOption.showResetButton
            };
            u.showNavigationButtons = function () {
                return u.calenderOption.showNavigationButtons
            };
            u.showDisplayMode = function () {
                return u.calenderOption.showDisplayMode
            };
            u.$watch("calenderDates", function (n) {
                u.firstTime || !angular.isUndefined(n) && n.length > 0 && (u.contentClass = angular.isUndefined(u.calenderOption) ? "month" : angular.isUndefined(u.calenderOption.defaultSelected) ? "month" : u.calenderOption.defaultSelected, u.currentMonth = u.calenderOption.defaultMonth, u.setRxCalender())
            }, !0)
        }],
        link: function () { }
    }
}]);
radix.directive("rxTip", [function () {
    "use strict";
    return {
        restrict: "A",
        link: function (n, t, i) {
            var u = i.mainObject + "." + i.property,
                r;
            angular.isUndefined(i.mainObject) && angular.isUndefined(i.tipTitle) && (r = i.title, $(t).tooltip({
                title: r,
                trigger: "hover",
                placement: angular.isUndefined(i.tipPlacement) ? "top" : i.tipPlacement,
                delay: {
                    show: angular.isUndefined(rx.appConfiguration.tipOption) || angular.isUndefined(rx.appConfiguration.tipOption.delay.show) ? 200 : rx.appConfiguration.tipOption.delay.show,
                    hide: angular.isUndefined(rx.appConfiguration.tipOption) || angular.isUndefined(rx.appConfiguration.tipOption.delay.hide) ? 100 : rx.appConfiguration.tipOption.delay.hide
                }
            }));
            n.$watch(i.tipTitle, function (n) {
                angular.isUndefined(n) || ($(t).tooltip("destroy"), $(t).tooltip({
                    title: n,
                    trigger: angular.isUndefined(i.tipTrigger) ? "hover" : i.tipTrigger,
                    placement: angular.isUndefined(i.tipPlacement) ? "bottom" : i.tipPlacement,
                    delay: {
                        show: angular.isUndefined(rx.appConfiguration.tipOption) || angular.isUndefined(rx.appConfiguration.tipOption.delay.show) ? 200 : rx.appConfiguration.tipOption.delay.show,
                        hide: angular.isUndefined(rx.appConfiguration.tipOption) || angular.isUndefined(rx.appConfiguration.tipOption.delay.hide) ? 100 : rx.appConfiguration.tipOption.delay.hide
                    }
                }))
            }, !0);
            n.$watch(u, function (r) {
                var e, s, o, u, f;
                r != undefined && ($(t).tooltip("destroy"), e = "", angular.isUndefined(i.tipType) ? e = n[i.mainObject][i.property] : (i.tipType == "date" && (f = n[i.mainObject][i.property], angular.isUndefined(f) || f == null || f == "" ? e = "" : (rx.appConfiguration.rxDateConfig.cultureInfo != null && rx.appConfiguration.rxDateConfig.cultureInfo.culture != null && moment.locale(rx.appConfiguration.rxDateConfig.cultureInfo.culture), i.dateInputFormat != undefined && i.dateDisplayFormat != undefined ? (u = moment(f, i.dateInputFormat), u != null && u._d != null && (u = u._d, o = moment(u).format(i.dateDisplayFormat)), e = o) : rx.appConfiguration.rxDateConfig.cultureInfo != null && rx.appConfiguration.rxDateConfig.cultureInfo.culture != null && rx.appConfiguration.rxDateConfig.cultureInfo.culture != "" && rx.appConfiguration.rxDateConfig.format != null && rx.appConfiguration.rxDateConfig.format.inputFormat != null ? (u = moment(f, rx.appConfiguration.rxDateConfig.format.inputFormat).format("L"), u == "Invalid date" && (u = ""), e = u) : rx.appConfiguration.rxDateConfig.format != null && rx.appConfiguration.rxDateConfig.format.inputFormat != null && rx.appConfiguration.rxDateConfig.format.inputFormat != "" ? (s = rx.appConfiguration.rxDateConfig.format.inputFormat, u = moment(f, s), u != null && u._d != null && (u = u._d, o = moment(u).format(rx.appConfiguration.rxDateConfig.format.displayFormat.toUpperCase())), e = o) : (u = moment(f, "MM/DD/YYYY"), e = moment(u).format(rx.appConfiguration.rxDateConfig.format.displayFormat.toUpperCase())))), i.tipType == "checkbox" && (f = n[i.mainObject][i.property], e = i.trueText != undefined ? f ? i.trueText : i.falseText : f == 0 ? "InActive" : "Active")), e != "" && $(t).tooltip({
                    title: e,
                    trigger: i.tipTrigger,
                    placement: angular.isUndefined(i.tipPlacement) ? "top" : i.tipPlacement,
                    delay: {
                        show: angular.isUndefined(rx.appConfiguration.tipOption) || angular.isUndefined(rx.appConfiguration.tipOption.delay.show) ? 200 : rx.appConfiguration.tipOption.delay.show,
                        hide: angular.isUndefined(rx.appConfiguration.tipOption) || angular.isUndefined(rx.appConfiguration.tipOption.delay.hide) ? 100 : rx.appConfiguration.tipOption.delay.hide
                    }
                }))
            }, !0)
        }
    }
}]);
radix.directive("rxAuthorization", [function () {
    "use strict";
    return {
        restrict: "A",
        link: function (n, t, i) {
            for (var r, o, s, u, f, h, c = i.rxAuthorization.split(","), e = 0; e < c.length; e++)
                if (r = undefined, r = rx.json.find(rx.permission.userContext, {
                    permissionCode: parseInt(c[e])
                })[0], r != undefined) {
                    for (o = [], s = i.operationType.split(","), u = 0; u < s.length; u++) f = s[u], f != "" && o.push({
                        operationType: f,
                        hasAccess: r[f]
                    });
                    if (h = rx.json.find(o, {
                        hasAccess: !0
                    }), h == null || h.length == 0) {
                        $(t).remove();
                        return
                    }
                } else {
                    $(t).remove();
                    return
                }
        }
    }
}]);
radix.directive("rxTree", ["$compile", "rxJson", "$rootScope", "$window", "$filter", "rxTreeData", "$timeout", function (n, t, i, r, u, f, e) {
    return {
        restrict: "E",
        scope: {
            treeSource: "=",
            treeOption: "=",
            selectedNodes: "=",
            isOpenDropdown: "="
        },
        controller: ["$scope", "$element", "$attrs", function (i, r, o) {
            var l = i.treeOption.treeMaster.treeName,
                a, c, v, h, s;
            if (i.isCustomChange = !1, i.nodeCss = i.treeOption.treeMaster.nodeCss, a = !1, c = {}, angular.isUndefined(i.nodeCss) && (i.nodeCss = {
                openNodeIconClass: "glyphicon glyphicon-plus tree-icon",
                closeNodeIconClass: "glyphicon glyphicon-minus tree-icon",
                nodeColorClass: "folder-color",
                inactiveIconClass: "folder-color-inactive"
            }), !angular.isUndefined(o.dropdownId)) {
                i.isOpenDropdown = !1;
                v = r.closest("#" + o.dropdownId)[0];
                $(document).on("click", function (n) {
                    var t = n.target.parentElement,
                        r, u;
                    if (t != null && t.id.indexOf("selected") == -1) {
                        for (r = !1, u = o.dropdownClassname; angular.isDefined(t) && t !== null && !r;) _.contains(t.className.split(" "), u) && !r && t === v && (r = !0), t = t.parentElement;
                        r || i.$apply(function () {
                            i.isOpenDropdown = !1
                        })
                    }
                })
            }
            i.getTreeIcon = function (n) {
                var r = t.find(i[i.currentSourceNameFilter], {
                    parentObjectId: n.objectId
                });
                return r.length > 0 ? n.isOpenRow ? i.nodeCss.closeNodeIconClass : i.nodeCss.openNodeIconClass : i.nodeCss.closeNodeIconClass
            };
            i.bindTree = function (r, f, e) {
                var c, s, w, a, k, h, o;
                if (r.isOpenRow = angular.isUndefined(f) ? r.isOpenRow == undefined ? !0 : !r.isOpenRow : !0, r.isOpenRow) {
                    c = t.find(i[i.currentSourceNameFilter], {
                        parentObjectId: r.objectId
                    });
                    c != null && c.length > 0 && (i["nodeIconCss" + r.objectId] = i.nodeCss.closeNodeIconClass);
                    c.length == 0 && (r.caret = "no-subfolder folder-margin-left", r.isOpenRow = !1, i.getTreeIcon(r), o = "nodeIconCss" + r.objectId, s = "subCaretIcon" + r.objectId, b = i.nodeCss.closeNodeIconClass, i[o] = i.nodeCss.closeNodeIconClass, i[s] = "no-subfolder folder-margin-left");
                    var v = "<ul>",
                        d = i.treeOption.treeMaster.checkBoxCss != undefined ? i.treeOption.treeMaster.checkBoxCss : "",
                        y = undefined,
                        p = undefined;
                    for (w = 0; w < c.length; w++) {
                        dataObject = c[w];
                        y = "loader" + dataObject.objectId;
                        p = "loaderSpan" + dataObject.objectId;
                        e && (dataObject.isOpenRow = !0);
                        h = t.find(i[i.currentSourceNameFilter], {
                            parentObjectId: dataObject.objectId
                        });
                        var g = h.length > 0 ? "icon-caret-right" : "no-subfolder folder-margin-left",
                            o = "nodeIconCss" + dataObject.objectId,
                            b = "",
                            s = "subCaretIcon" + dataObject.objectId;
                        b = h.length > 0 ? dataObject.isOpenRow ? i.nodeCss.closeNodeIconClass : i.nodeCss.openNodeIconClass : i.nodeCss.closeNodeIconClass;
                        i[o] = b;
                        i[s] = g;
                        a = "";
                        dataObject.active || (a = i.nodeCss.inactiveIconClass);
                        objectName = !angular.isUndefined(i.treeOption.treeMaster.isSafeHtml) && i.treeOption.treeMaster.isSafeHtml ? rx.utils.safeHtml(dataObject.objectName) : dataObject.objectName;
                        entityType = !angular.isUndefined(i.treeOption.treeMaster.isEntityType) && i.treeOption.treeMaster.isEntityType ? 'data-entity-type="' + dataObject.auditEntityTypeId + '"' : "";
                        i.treeOption.treeMaster.showCheckbox != undefined ? (k = dataObject.checkedRow == null, v += "<li><div " + entityType + ' id="selected' + dataObject.objectId + '{{treeName}}" rx-right-click="subTextMenu(' + dataObject.objectId + ')" ><i ng-click="treeEvent(' + dataObject.objectId + ')" ng-class="' + s + '"><\/i><input rx-indeterminate="' + k + '" id="checkboxRow' + l + dataObject.objectId + '" type="checkbox" ng-hide="treeCheckboxRow.hideCheckModel' + dataObject.objectId + '" ng-model="treeCheckboxRow.checkModel' + dataObject.objectId + '" ng-change="checkboxChange(treeCheckboxRow.checkModel' + dataObject.objectId + "," + dataObject.objectId + ',false)" class="' + d + '"  folder-margin-left"><i ng-class="' + o + '" class=" ' + i.nodeCss.nodeColorClass + " " + a + '  folder-margin-left" ng-click="treeEvent(' + dataObject.objectId + ')"><\/i><span ng-click="treeEvent(' + dataObject.objectId + ')">' + objectName + i.getNodeLinksHtml(dataObject.objectId) + '<\/div><div id="rxattachment' + dataObject.objectId + '{{treeName}}" class="close-tree" ><\/div><\/li>') : v += i.treeOption.treeMaster.isLabelClick == undefined || i.treeOption.treeMaster.isLabelClick ? dataObject.isOpenRow && h.length > 0 ? "<li><div " + entityType + ' id="selected' + dataObject.objectId + '{{treeName}}" rx-right-click="subTextMenu(' + dataObject.objectId + ')" ng-click="treeEvent(' + dataObject.objectId + ')"  ><i ng-click="getSubTreeBind(' + dataObject.objectId + ',$element)" ng-class="' + s + '"><\/i><i ng-class="' + o + '" class=" ' + i.nodeCss.nodeColorClass + " " + a + '  folder-margin-left"><\/i><i ng-class="' + y + '"><\/i><span ng-class="' + p + '">' + u("highlight")(objectName, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml(dataObject.objectId) + '<\/div><div id="rxattachment' + dataObject.objectId + '{{treeName}}" class="close-tree" >' + i.getChildTreeBind(dataObject.objectId, !0, e) + "<\/div><\/li>" : "<li><div " + entityType + ' id="selected' + dataObject.objectId + '{{treeName}}" rx-right-click="subTextMenu(' + dataObject.objectId + ')" ng-click="treeEvent(' + dataObject.objectId + ')"  ><i ng-click="getSubTreeBind(' + dataObject.objectId + ',$element)" ng-class="' + s + '"><\/i><i ng-class="' + o + '" class=" ' + i.nodeCss.nodeColorClass + " " + a + '  folder-margin-left"><\/i><i ng-class="' + y + '"><\/i><span ng-class="' + p + '">' + u("highlight")(objectName, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml(dataObject.objectId) + '<\/div><div id="rxattachment' + dataObject.objectId + '{{treeName}}" class="close-tree" ><\/div><\/li>' : "<li><div " + entityType + ' id="selected' + dataObject.objectId + l + '" rx-right-click="subTextMenu(' + dataObject.objectId + ')" ><i ng-click="treeEvent(' + dataObject.objectId + ')" ng-class="' + s + '"><\/i><i ng-class="' + o + '" class=" ' + i.nodeCss.nodeColorClass + " " + a + '  folder-margin-left"><\/i><i ng-class="' + y + '"><\/i><span ng-class="' + p + '" ng-click="treeLabelEvent(' + dataObject.objectId + ',undefined,$event)"><span>' + u("highlight")(objectName, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml(dataObject.objectId) + '<\/div><div id="rxattachment' + dataObject.objectId + l + '" class="close-tree" ><\/div><\/li>'
                    }
                    v += "<\/ul>";
                    $("#rxattachment" + r.objectId + i.treeName).html(n(v)(i));
                    i.treeOption.treeMaster.autoSelectChild == undefined || i.treeOption.treeMaster.autoSelectChild || i.selectAllChildCheckbox(r.objectId)
                } else h = t.find(i[i.currentSourceNameFilter], {
                    parentObjectId: r.objectId
                }), i.deSelectOpenRow(r.objectId), o = "nodeIconCss" + r.objectId, i[o] = h != null && h.length > 0 ? i.nodeCss.openNodeIconClass : i.nodeCss.closeNodeIconClass, $("#rxattachment" + r.objectId + i.treeName).html(""), $("#rxExplorers" + i.treeName).removeClass("open")
            };
            i.selectAllChildCheckbox = function (n) {
                for (var e = t.find(i.treeSource, {
                    objectId: n
                }), u = t.find(i.treeSource, {
                    parentObjectId: n
                }), f = i.treeCheckboxRow["checkModel" + n], r = 0; r < u.length; r++) i.treeCheckboxRow["checkModel" + u[r].objectId] = f, u[r].checkedRow = f, i.checkboxChangeData(f, u[r].objectId)
            };
            i.getTreeBind = function (n, r, u, f) {
                var c, h, o, s;
                i.treeOption.treeMaster.showLoader != undefined && i.treeOption.treeMaster.showLoader ? (c = t.find(i[i.currentSourceNameFilter], {
                    parentObjectId: n.objectId
                }), h = c.length, h > 0 && (n.objectId == i.rxTreeRoot[0].objectId ? (o = "loaderRoot", s = "loaderSpanRoot") : (o = "loader" + n.objectId, s = "loaderSpan" + n.objectId), angular.isUndefined(f) && !f ? (i[o] = "tree-loader", i[s] = "tree-loader-span") : (i[o] = "", i[s] = "")), n.isOpenRow ? e(function () {
                    i.bindTree(n, r, u);
                    h > 0 && (i[o] = "", i[s] = "")
                }, 0) : e(function () {
                    i.bindTree(n, r, u);
                    h > 0 && (i[o] = "", i[s] = "")
                }, 500)) : i.bindTree(n, r, u)
            };
            i.treeLabelEvent = function (n, r, u) {
                var e, o, f, s;
                if (u.ctrlKey && i.treeOption.treeMaster.isMultiple) {
                    for (i.selectedNodes.indexOf("," + n) == -1 && i.selectedNodes.indexOf(n) ? (i.selectedNodes += "," + n, $("#selected").removeClass("selected")) : (i.selectedNodes = i.selectedNodes.replace(n, ""), i.selectedNodes = i.selectedNodes.replace(",,", ","), $("#selected" + n + i.treeName).removeClass("selected")), e = i.selectedNodes.split(","), f = 0; f < e.length; f++) o = t.find(i[i.currentSourceNameFilter], {
                        objectId: parseInt(e[f])
                    }), o.length > 0 && i.treeSource.selectFolder(o[0], undefined);
                    i.$parent.rxtreeMultileId = i.selectedNodes;
                    i.$parent.$eval(i.treeOption.treeMaster.callbacks.select + "(rxtreeMultileId)");
                    i.isOpenDropdown = !1
                } else i.selectedNodes = n.toString(), $(".selected").removeClass("selected"), s = t.find(i[i.currentSourceNameFilter], {
                    objectId: n
                }), s.length > 0 && ($("#selected" + n + i.treeName).addClass("selected"), i.$parent.rxtreeId = n, i.treeSource.selectFolder(s[0], undefined)), i.$parent.$eval(i.treeOption.treeMaster.callbacks.select + "(rxtreeId)"), i.isOpenDropdown = !1;
                $("#rxExplorers" + i.treeName).removeClass("open")
            };
            i.deSelectOpenRow = function (n) {
                for (var u = t.find(i[i.currentSourceNameFilter], {
                    parentObjectId: n,
                    isOpenRow: !0
                }), r = 0; r < u.length; r++) u[r].isOpenRow = undefined, i.deSelectOpenRow(u[r].objectId)
            };
            i.getCaretCss = function (n) {
                n.caret = angular.isUndefined(n.caret) ? "" : n.caret;
                var r = t.find(i.treeSource, {
                    parentObjectId: n.objectId
                });
                n.caret = r.length > 0 ? i.treeOption.treeMaster.iconCss == undefined ? "icon-caret-right" : i.treeOption.treeMaster.iconCss : "no-subfolder folder-margin-left"
            };
            i.getChildTreeBind = function (n, r, f) {
                var e, y, h, it, p, w, o, v, tt, b, k, rt;
                if ($("#rxattachment" + n).hasClass("close-tree") || r != undefined) {
                    if (e = [], y = {}, a ? (e = s[n], y = c[n]) : (e = t.find(i[i.currentSourceNameFilter], {
                        parentObjectId: n
                    }), y = t.find(i[i.currentSourceNameFilter], {
                        objectId: n
                    })[0]), e == undefined && (e = []), h = "", it = i.treeOption.treeMaster.checkBoxCss != undefined ? i.treeOption.treeMaster.checkBoxCss : "", e.length > 0) {
                        for (p = undefined, w = undefined, h = "<ul>", o = 0; o < e.length; o++) {
                            p = "loader" + e[o].objectId;
                            w = "loaderSpan" + e[o].objectId;
                            f && (e[o].isOpenRow = !0);
                            v = [];
                            v = a ? s[e[o].objectId] : t.find(i[i.currentSourceNameFilter], {
                                parentObjectId: e[o].objectId
                            });
                            v == undefined && (v = []);
                            var d = "",
                                g = "nodeIconCss" + e[o].objectId,
                                nt = "subCaretIcon" + e[o].objectId;
                            e[o].active || (d = i.nodeCss.inactiveIconClass);
                            tt = v.length > 0 ? "icon-caret-right" : "no-subfolder folder-margin-left";
                            treeIcon = !angular.isUndefined(i.treeOption.treeMaster.isOpenAll) && i.treeOption.treeMaster.isOpenAll && i.treeOption.treeMaster.isOpen == undefined ? i.nodeCss.closeNodeIconClass : v.length > 0 ? e[o].isOpenRow ? i.nodeCss.closeNodeIconClass : i.nodeCss.openNodeIconClass : i.nodeCss.closeNodeIconClass;
                            i[g] = treeIcon;
                            i[nt] = tt;
                            b = !angular.isUndefined(i.treeOption.treeMaster.isSafeHtml) && i.treeOption.treeMaster.isSafeHtml ? rx.utils.safeHtml(e[o].objectName) : e[o].objectName;
                            k = !angular.isUndefined(i.treeOption.treeMaster.isEntityType) && i.treeOption.treeMaster.isEntityType ? 'data-entity-type="' + e[o].auditEntityTypeId + '"' : "";
                            i.treeOption.treeMaster.showCheckbox != undefined ? (rt = e[o].checkedRow == null, h += "<li><div " + k + ' id="selected' + e[o].objectId + '{{treeName}}" rx-right-click="subTextMenu(' + e[o].objectId + ')" ><i ng-click="treeEvent(' + e[o].objectId + ',$element)" class="' + tt + '"><\/i><input rx-indeterminate="' + rt + '" id="checkboxRow' + l + e[o].objectId + '" type="checkbox" ng-hide="treeCheckboxRow.hideCheckModel' + e[o].objectId + '" ng-model="treeCheckboxRow.checkModel' + e[o].objectId + '" ng-change="checkboxChange(treeCheckboxRow.checkModel' + e[o].objectId + "," + e[o].objectId + ')" class="' + it + '"  folder-margin-left"><label ng-click="treeEvent(' + e[o].objectId + ')"><span>' + u("highlight")(b, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml(e[o].objectId) + '<\/div><div id="rxattachment' + e[o].objectId + '{{treeName}}" class="close-tree" ><\/div><\/li>') : (y.isOpenRow || !angular.isUndefined(i.treeOption.treeMaster.isOpenAll) && i.treeOption.treeMaster.isOpenAll && i.treeOption.treeMaster.isOpen == undefined) && (h += v.length > 0 ? "<li><div " + k + ' id="selected' + e[o].objectId + '{{treeName}}" rx-right-click="subTextMenu(' + e[o].objectId + ')" ng-click="treeEvent(' + e[o].objectId + ')"><i ng-click="getSubTreeBind(' + e[o].objectId + ',$element)" ng-class="' + nt + '"><\/i><i ng-class="' + g + '" class="' + d + " " + i.nodeCss.nodeIconClass + " " + i.nodeCss.nodeColorClass + '  folder-margin-left"><\/i><i ng-class="' + p + '"><\/i><span ng-class="' + w + '">' + u("highlight")(b, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml(e[o].objectId) + '<\/div><div id="rxattachment' + e[o].objectId + '{{treeName}}" class="close-tree" >' + i.getChildTreeBind(e[o].objectId, r, f) + "<\/div><\/li>" : "<li><div " + k + ' id="selected' + e[o].objectId + '{{treeName}}" rx-right-click="subTextMenu(' + e[o].objectId + ')" ng-click="treeEvent(' + e[o].objectId + ')"><i ng-click="getSubTreeBind(' + e[o].objectId + ',$element)" ng-class="' + nt + '"><\/i><i ng-class="' + g + '" class="' + d + " " + i.nodeCss.nodeIconClass + " " + i.nodeCss.nodeColorClass + '  folder-margin-left"><\/i><i ng-class="' + p + '"><\/i><span ng-class="' + w + '">' + u("highlight")(b, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml(e[o].objectId) + '<\/div><div id="rxattachment' + e[o].objectId + '{{treeName}}" class="close-tree" ><\/div><\/li>')
                        }
                        h += "<\/ul>";
                        h = h.replace("<ul><\/ul>", "")
                    }
                    r == undefined && ($("#rxattachment" + n + i.treeName).removeClass("close-tree"), $("#rxattachment" + n + i.treeName).addClass("open-tree"))
                } else $("#rxattachment" + n + i.treeName).addClass("close-tree"), $("#rxattachment" + n + i.treeName).removeClass("open-tree"), $("#rxattachment" + n + i.treeName).html(""), $("#rxExplorers" + i.treeName).removeClass("open");
                return h
            };
            i.getSubTreeBind = function (r, f) {
                var s, o, d, g, a, v, nt;
                if ($("#rxattachment" + r).hasClass("close-tree") || f != undefined) {
                    s = t.find(i[i.currentSourceNameFilter], {
                        objectId: r
                    });
                    subCaretIcon = "subCaretIcon" + s[0].objectId;
                    i.getCaretCss(s[0]);
                    i[subCaretIcon] = s[0].caret;
                    var h = t.find(i[i.currentSourceNameFilter], {
                        parentObjectId: r
                    }),
                        c = "",
                        tt = i.treeOption.treeMaster.checkBoxCss != undefined ? i.treeOption.treeMaster.checkBoxCss : "";
                    if (h.length > 0) {
                        s[0].isOpenRow = !0;
                        c += "<ul>";
                        var e = undefined,
                            y = undefined,
                            p = undefined;
                        for (o = 0; o < h.length; o++) {
                            y = "loader" + h[o].objectId;
                            p = "loaderSpan" + h[o].objectId;
                            e = h[o];
                            var k = t.find(i[i.currentSourceNameFilter], {
                                parentObjectId: e.objectId
                            }),
                                w = "",
                                b = "nodeIconCss" + e.objectId;
                            e.active || (w = i.nodeCss.inactiveIconClass);
                            d = k.length > 0 ? "icon-caret-right" : "no-subfolder folder-margin-left";
                            g = !angular.isUndefined(i.treeOption.treeMaster.isOpenAll) && i.treeOption.treeMaster.isOpenAll && i.treeOption.treeMaster.isOpen == undefined ? i.nodeCss.closeNodeIconClass : k.length > 0 ? e.isOpenRow ? i.nodeCss.closeNodeIconClass : i.nodeCss.openNodeIconClass : i.nodeCss.closeNodeIconClass;
                            i[b] = g;
                            subCaretIcon = "subCaretIcon" + e.objectId;
                            i.getCaretCss(e);
                            i[subCaretIcon] = e.caret;
                            a = !angular.isUndefined(i.treeOption.treeMaster.isSafeHtml) && i.treeOption.treeMaster.isSafeHtml ? rx.utils.safeHtml(e.objectName) : e.objectName;
                            v = !angular.isUndefined(i.treeOption.treeMaster.isEntityType) && i.treeOption.treeMaster.isEntityType ? 'data-entity-type="' + e.auditEntityTypeId + '"' : "";
                            i.treeOption.treeMaster.showCheckbox != undefined ? (nt = e.checkedRow == null, c += "<li><div " + v + ' id="selected' + e.objectId + '{{treeName}}" rx-right-click="subTextMenu(' + e.objectId + ')" ><i ng-click="treeEvent(' + e.objectId + ',$element)" class="' + d + '"><\/i><input  rx-indeterminate="' + nt + '" id="checkboxRow' + l + e.objectId + '" type="checkbox" ng-hide="treeCheckboxRow.hideCheckModel' + e.objectId + '" ng-model="treeCheckboxRow.checkModel' + e.objectId + '" ng-change="checkboxChange(treeCheckboxRow.checkModel' + e.objectId + "," + e.objectId + ')" class="' + tt + '"  folder-margin-left"><label ng-click="treeEvent(' + e.objectId + ')"><span>' + a + " <\/span> " + i.getNodeLinksHtml(e.objectId) + '<\/div><div id="rxattachment' + e.objectId + '{{treeName}}" class="close-tree" ><\/div><\/li>') : c += !angular.isUndefined(i.treeOption.treeMaster.isOpenAll) && i.treeOption.treeMaster.isOpenAll && i.treeOption.treeMaster.isOpen == undefined || !angular.isUndefined(e.isOpenRow) && e.isOpenRow ? k.length > 0 ? "<li><div " + v + ' id="selected' + e.objectId + '{{treeName}}" rx-right-click="subTextMenu(' + e.objectId + ')" ng-click="treeEvent(' + e.objectId + ')"><i ng-click="getSubTreeBind(' + e.objectId + ',$element)" ng-class="' + subCaretIcon + '"><\/i><i ng-class="' + b + '" class="' + w + " " + i.nodeCss.nodeIconClass + " " + i.nodeCss.nodeColorClass + '  folder-margin-left"><\/i><i ng-class="' + y + '"><\/i><span ng-class="' + p + '">' + u("highlight")(a, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml(e.objectId) + '<\/div><div id="rxattachment' + e.objectId + '{{treeName}}" class="close-tree" >' + i.getChildTreeBind(e.objectId, f) + "<\/div><\/li>" : "<li><div " + v + ' id="selected' + e.objectId + '{{treeName}}" rx-right-click="subTextMenu(' + e.objectId + ')" ng-click="treeEvent(' + e.objectId + ')"><i ng-click="getSubTreeBind(' + e.objectId + ',$element)" ng-class="' + subCaretIcon + '"><\/i><i ng-class="' + b + '" class="' + w + " " + i.nodeCss.nodeIconClass + " " + i.nodeCss.nodeColorClass + '  folder-margin-left"><\/i><i ng-class="' + y + '"><\/i><span ng-class="' + p + '">' + u("highlight")(a, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml(e.objectId) + '<\/div><div id="rxattachment' + e.objectId + '{{treeName}}" class="close-tree" ><\/div><\/li>' : "<li><div " + v + ' id="selected' + e.objectId + '{{treeName}}" rx-right-click="subTextMenu(' + e.objectId + ')" ng-click="treeEvent(' + e.objectId + ')"><i ng-click="getSubTreeBind(' + e.objectId + ',$element)" ng-class="' + subCaretIcon + '"><\/i><i ng-class="' + b + '" class="' + w + " " + i.nodeCss.nodeIconClass + " " + i.nodeCss.nodeColorClass + '  folder-margin-left"><\/i><i ng-class="' + y + '"><\/i><span ng-class="' + p + '">' + u("highlight")(a, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml(e.objectId) + '<\/div><div id="rxattachment' + e.objectId + '{{treeName}}" class="close-tree" ><\/div><\/li>'
                        }
                        c += "<\/ul>";
                        f == undefined && ($("#rxattachment" + r + i.treeName).removeClass("close-tree"), $("#rxattachment" + r + i.treeName).addClass("open-tree"));
                        $("#rxattachment" + r + i.treeName).html(n(c)(i))
                    }
                } else $("#rxattachment" + r + i.treeName).addClass("close-tree"), $("#rxattachment" + r + i.treeName).removeClass("open-tree"), $("#rxattachment" + r + i.treeName).html(""), $("#rxExplorers" + i.treeName).removeClass("open")
            };
            i.checkboxChange = function (n, r, u) {
                var f, e, o;
                if (i.treeOption.treeMaster.autoSelectChild != undefined && i.treeOption.treeMaster.autoSelectChild)
                    for (f = t.find(i.treeSource, {
                        parentObjectId: r
                    }), e = 0; e < f.length; e++) i.treeCheckboxRow["checkModel" + f[e].objectId] = n, f[e].checkedRow = n, i.checkboxChangeData(n, f[e].objectId);
                o = u == undefined ? "checkModel" : "rootCheckboxModel";
                i.treeCheckboxRow[o + r] = n;
                f = t.find(i.treeSource, {
                    objectId: r
                })[0];
                f.checkedRow = n;
                i.treeOption.treeMaster.isTriStateCheckBox != undefined && i.treeOption.treeMaster.isTriStateCheckBox && f != undefined && i.checkForTriStateCheckBox(f, l);
                i.treeOption.treeMaster.deSelectParent != undefined && i.treeOption.treeMaster.deSelectParent && (n || (f = t.find(i.treeSource, {
                    objectId: r
                }), i.deSelectParentRows(f[0].parentObjectId)));
                i.treeOption.treeMaster.callbacks.checkboxChangeEvent != undefined && (i.$parent.objectId = r, i.$parent.$eval(i.treeOption.treeMaster.callbacks.checkboxChangeEvent + "(objectId)"))
            };
            i.checkboxChangeData = function (n, r) {
                var f, e, u;
                if (i.treeOption.treeMaster.autoSelectChild != undefined && i.treeOption.treeMaster.autoSelectChild)
                    for (f = t.find(i.treeSource, {
                        parentObjectId: r
                    }), e = $("#checkboxRow" + l + r)[0], e != undefined && (e.indeterminate = !1), u = 0; u < f.length; u++) i.treeCheckboxRow["checkModel" + f[u].objectId] = n, f[u].checkedRow = n, i.checkboxChangeData(n, f[u].objectId)
            };
            i.deSelectParentRows = function (n) {
                var r = t.find(i[i.currentSourceNameFilter], {
                    objectId: n
                });
                r.length > 0 && (n == 1 ? i.treeCheckboxRow.rootCheckboxModel = !1 : i.treeCheckboxRow["checkModel" + r[0].objectId] = !1, r[0].checkedRow = !1, i.deSelectParentRows(r[0].parentObjectId))
            };
            i.treeEvent = function (n, r, u) {
                var e, f;
                if ((i.treeOption.treeMaster.isLabelClick == undefined || i.treeOption.treeMaster.isLabelClick) && ($("#rxExplorers" + i.treeName).removeClass("open"), $(".selected").removeClass("selected"), $("#selected" + n + i.treeName).addClass("selected")), angular.isUndefined(r) && (r = t.find(i[i.currentSourceNameFilter], {
                    objectId: n
                })[0]), i.getTreeBind(r, undefined, undefined, u), i.treeOption.treeMaster.isLabelClick != undefined && !i.treeOption.treeMaster.isLabelClick && r.isOpenRow && (i.treeSource.selectFolder(r, !0), i.selectedNodes != undefined))
                    for (e = i.selectedNodes.split(","), f = 0; f < e.length; f++) t.find(i.treeSource, {
                        objectId: parseInt(e[f])
                    })[0] != null && $("#selected" + e[f] + i.treeName).addClass("selected");
                u == undefined && (i.$parent.rxtreeId = n, (i.treeOption.treeMaster.isLabelClick == undefined || i.treeOption.treeMaster.isLabelClick) && i.$parent.$eval(i.treeOption.treeMaster.callbacks.select + "(rxtreeId)"))
            };
            i.setCurrentFilterSource = [];
            i.bindFilterTreeSource = function (n) {
                h = [];
                for (var t = 0; t < n.length; t++) n[t].isOpenRow = !1, h.indexOf(n[t]) == -1 && (n[t].parentObjectId != 0 && n[t].parentObjectId != null ? i.getParentObjects(n[t]) : n[t].parentObjectId != null && h.push(n[t]))
            };
            h = [];
            s = {};
            i.getParentObjects = function (n) {
                h.indexOf(n) == -1 && h.push(n);
                var r = t.find(i.treeSource, {
                    objectId: n.parentObjectId
                })[0];
                r.isOpenRow = !1;
                h.indexOf(r) == -1 && (r.parentObjectId != 0 ? (h.push(r), i.getParentObjects(r)) : h.push(r))
            };
            i.currentSourceNameFilter = "treeSource";
            i.setFunctions = function () {
                function e(n) {
                    var v, f, r, e, t, l;
                    a = !0;
                    i.currentSourceNameFilter = "setFindObjectSource";
                    var o = u("filter")(i.treeSource, {
                        objectName: n
                    }),
                        h = [];
                    for (c = {}, v = {}, s = {}, f = 0; f < o.length; f++) r = o[f], c[r.objectId] = r, s[r.parentObjectId] == undefined && (s[r.parentObjectId] = []), s[r.parentObjectId].push(r);
                    for (f = 0; f < o.length; f++)
                        if (r = o[f], h.push(r), e = r.parentObjectId == 0 ? -1 : r.parentObjectId, c[e] == undefined && (t = i.dicJObject[e], c[t.objectId] = t, h.push(t), s[t.parentObjectId] == undefined && (s[t.parentObjectId] = []), s[t.parentObjectId].push(t), t.parentObjectId != 0))
                            for (l = 0; l < 3e4; l++)
                                if (e = t.parentObjectId == 0 ? -1 : t.parentObjectId, c[e] == undefined) {
                                    if (t = i.dicJObject[e], c[t.objectId] = t, h.push(t), s[t.parentObjectId] == undefined && (s[t.parentObjectId] = []), s[t.parentObjectId].push(t), t.parentObjectId == 0) break
                                } else break;
                    return i.setFindObjectSource = h, {
                        name: n,
                        nodes: i.setFindObjectSource
                    }
                }

                function o() {
                    var f = "";
                    if (i.setFindObjectSource.length > 0) {
                        i.rxTreeRoot = t.find(i.setFindObjectSource, {
                            parentObjectId: 0
                        });
                        i.rxTreeRoot[0].isOpenRow = !0;
                        var e = !angular.isUndefined(i.treeOption.treeMaster.isSafeHtml) && i.treeOption.treeMaster.isSafeHtml ? rx.utils.safeHtml(i.rxTreeRoot[0].objectName) : i.rxTreeRoot[0].objectName,
                            o = !angular.isUndefined(i.treeOption.treeMaster.isEntityType) && i.treeOption.treeMaster.isEntityType ? 'data-entity-type="{{attachmenttree.auditEntityTypeId}}"' : "";
                        f = '<div id="exTree{{treeName}}"><div class="explorer-listing"><ul class="nav nav-pills nav-stacked"><li ng-repeat="attachmenttree in rxTreeRoot" ><div ' + o + ' id="selected{{attachmenttree.objectId}}{{treeName}}" rx-right-click="textMenu(attachmenttree)" class="rootfolder" ng-click="treeEvent(attachmenttree.objectId,attachmenttree)"><i ng-init="getCaretCss(attachmenttree)" ng-class="attachmenttree.caret" ng-click="getTreeBind(attachmenttree); $event.stopPropagation();"><\/i><i ng-class="getTreeIcon(attachmenttree)" class="  ' + i.nodeCss.openIconClass + " " + i.nodeCss.nodeColorClass + ' folder-margin-left"><\/i><i ng-class="loaderRoot"><\/i><span ng-class="loaderSpanRoot"> ' + u("highlight")(e, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml() + ' <\/div><div id="rxattachment{{attachmenttree.objectId}}{{treeName}}" class="close-tree" >' + i.getChildTreeBind(i.rxTreeRoot[0].objectId, !0, !0) + '<\/div><div id="rxattachment{{attachmenttree.objectId}}{{treeName}}"><\/ul><\/div>';
                        i.treeOption.treeMaster.showContextMenu != undefined && i.treeOption.treeMaster.showContextMenu && (f += '<div id="rxExplorers{{treeName}}" class="dropdown "><ul aria-labelledby="drop4" role="menu" class="dropdown-menu" id="menu1"><li role="presentation" ng-repeat="contextmenu in contextmenus" ng-click="contextEvent(contextmenu)" class="cursor"><a  tabindex="-1" role="menuitem">{{contextmenu.itemName}}<\/a><\/li><\/ul><\/div>');
                        f += "<\/div>"
                    } else f = '<div id="exTree{{treeName}}">No Records Found <\/div>';
                    return $(r).html(n(f)(i)), i.$apply(), !0
                }
                i.treeSource.expandCollapseTree = function (n) {
                    i.getTreeBind(n)
                };
                i.treeSource.expandCollapseAllNode = function (n) {
                    i.getTreeBind(n, undefined, !0)
                };
                i.treeSource.addTreeFolder = function (n) {
                    n.isOpenRow = !1;
                    i.treeSource.push(n);
                    i.getSubTreeBind(n.parentObjectId, !1)
                };
                i.treeSource.resetFilter = function () {
                    var r, n;
                    for (i.treeSearchData = undefined, i.setFindObjectSource = [], i.currentSourceNameFilter = "treeSource", r = t.find(i[i.currentSourceNameFilter], {
                        isOpenRow: !0
                    }), n = 0; n < r.length; n++) r[n].isOpenRow = !1;
                    i.setTree()
                };
                i.treeSource.resetTree = function (n) {
                    i.isCustomChange = !1;
                    i.treeSource = n;
                    i.setTree()
                };
                i.treeSource.search = function (n) {
                    if (n != "" && n != undefined && n.length >= 1) {
                        i.treeSearchData = n;
                        var t, r;
                        $.Deferred(function (n) {
                            rx.progress.show();
                            r = setTimeout(function () {
                                n.resolve()
                            }, 1e3)
                        }).promise().then(function () {
                            $.Deferred(function (i) {
                                t = e(n);
                                t != undefined ? i.resolve(t) : i.reject()
                            }).promise().then(function (n) {
                                $.Deferred(function (t) {
                                    var i = o(n);
                                    i && t.resolve(n)
                                }).promise().then(function () {
                                    clearTimeout(r);
                                    rx.progress.hide();
                                    a = !1;
                                    c = {};
                                    $("#exTree" + i.treeName).mousemove(function (n) {
                                        var t = $(this).parent().offset(),
                                            r = n.pageX - t.left,
                                            u = n.pageY - t.top;
                                        i.leftPosition = r;
                                        i.topPosition = u
                                    })
                                })
                            })
                        })
                    } else angular.isUndefined(i.treeOption.treeMaster.search) ? rx.log.warning("Minimum 1 character is required") : angular.isUndefined(i.treeOption.treeMaster.search.requiredMessage) ? rx.log.warning("Minimum 1 character is required") : rx.rxString.first(i.treeOption.treeMaster.search.requiredMessage, 1) == "@" ? rx.log.warning(i.treeOption.treeMaster.search.requiredMessage) : rx.log.warning("Minimum 1 character is required")
                };
                i.treeSource.filterTree = function (f) {
                    var e, l;
                    i.currentSourceNameFilter = "setFindObjectSource";
                    e = u("filter")(i.treeSource, f);
                    i.bindFilterTreeSource(e);
                    i.setFindObjectSource = [];
                    i.setFindObjectSource = h;
                    i.rxTreeRoot = t.find(i.setFindObjectSource, {
                        parentObjectId: 0
                    });
                    var s = !angular.isUndefined(i.treeOption.treeMaster.isSafeHtml) && i.treeOption.treeMaster.isSafeHtml ? rx.utils.safeHtml(i.rxTreeRoot[0].objectName) : i.rxTreeRoot[0].objectName,
                        c = !angular.isUndefined(i.treeOption.treeMaster.isEntityType) && i.treeOption.treeMaster.isEntityType ? 'data-entity-type="{{attachmenttree.auditEntityTypeId}}"' : "",
                        o = '<div id="exTree{{treeName}}"><div class="explorer-listing"><ul class="nav nav-pills nav-stacked"><li ng-repeat="attachmenttree in rxTreeRoot" ><div ' + c + ' id="selected{{attachmenttree.objectId}}{{treeName}}" rx-right-click="textMenu(attachmenttree)" class="rootfolder" ng-click="treeEvent(attachmenttree.objectId,attachmenttree)"><i ng-init="getCaretCss(attachmenttree)" ng-class="attachmenttree.caret" ng-click="getTreeBind(attachmenttree); $event.stopPropagation();"><\/i><i class="  ' + i.nodeCss.openIconClass + " " + i.nodeCss.nodeColorClass + ' folder-margin-left"><\/i><i ng-class="loaderRoot"><\/i><span ng-class="loaderSpanRoot"> ' + u("highlight")(s, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml() + ' <\/div><div id="rxattachment{{attachmenttree.objectId}}{{treeName}}"><\/ul><\/div>';
                    return i.treeOption.treeMaster.showContextMenu != undefined && i.treeOption.treeMaster.showContextMenu && (o += '<div id="rxExplorers{{treeName}}" class="dropdown "><ul aria-labelledby="drop4" role="menu" class="dropdown-menu" id="menu1"><li role="presentation" ng-repeat="contextmenu in contextmenus" ng-click="contextEvent(contextmenu)" class="cursor"><a  tabindex="-1" role="menuitem">{{contextmenu.itemName}}<\/a><\/li><\/ul><\/div>'), o += "<\/div>", $(r).html(n(o)(i)), l = setTimeout(function () {
                        i.treeOption.treeMaster.isOpen != undefined && i.treeOption.treeMaster.isOpen && i.treeEvent(i.rxTreeRoot[0].objectId, i.rxTreeRoot[0]);
                        $("#exTree" + i.treeName).mousemove(function (n) {
                            var t = $(this).parent().offset(),
                                r = n.pageX - t.left,
                                u = n.pageY - t.top;
                            i.leftPosition = r;
                            i.topPosition = u;
                            i.$apply()
                        })
                    }, 500), e.length
                };
                i.getNodeLinksHtml = function (n) {
                    var u, r, t;
                    if (i.treeOption.treeMaster.showNodeLinks != undefined && i.treeOption.treeMaster.showNodeLinks) {
                        for (u = "", r = 0; r < i.treeOption.treeMaster.nodeLinks.length; r++) t = i.treeOption.treeMaster.nodeLinks[r], u += n != null ? "<a class='rxtree-anchor' ng-show=isLinkVisible(" + n + ",'" + t.itemName + "')  ng-click=callLinkEvent(" + n + ",'" + t.itemName + "')>" + t.itemName + "<\/a>" : "<a class='rxtree-anchor' ng-show=isLinkVisible(attachmenttree.objectId,'" + t.itemName + "')  ng-click=callLinkEvent(attachmenttree.objectId,'" + t.itemName + "') >" + t.itemName + "<\/a>";
                        return u
                    }
                    return ""
                };
                i.isLinkVisible = function (n, t) {
                    return i.$parent.linkObjectId = n, i.$parent.linkName = t, i.$parent.$eval(i.treeOption.treeMaster.callbacks.isLinkVisible + "(linkObjectId,linkName)")
                };
                i.callLinkEvent = function (n, t) {
                    i.$parent.linkObjectId = n;
                    i.$parent.linkName = t;
                    i.$parent.$eval(i.treeOption.treeMaster.callbacks.nodeClickEvent + "(linkObjectId,linkName)")
                };
                i.treeSource.selectFolder = function (n, t) {
                    i.isSelectedNodeFolder = !0;
                    i.setSelectedNode(n, t)
                };
                i.treeSource.inactiveFolder = function (n) {
                    var r = t.find(i.treeSource, {
                        objectId: n
                    })[0];
                    r.active = !1;
                    r.objectName = r.objectName + " (Inactive)";
                    $("#selected" + n + i.treeName + " ." + i.nodeCss.nodeIconClass).addClass(i.nodeCss.inactiveIconClass)
                };
                i.treeSource.activeFolder = function (n) {
                    var r = t.find(i.treeSource, {
                        objectId: n
                    })[0];
                    r.active = !0;
                    r.objectName = r.objectName.replace(" (Inactive)", "");
                    $("#selected" + n + i.treeName + " ." + i.nodeCss.nodeIconClass).removeClass(i.nodeCss.inactiveIconClass)
                };
                i.treeSource.renameTreeFolder = function (n, r) {
                    var u = t.find(i.treeSource, {
                        objectId: n
                    })[0];
                    u.objectName = r;
                    i.getSubTreeBind(u.parentObjectId, !1)
                };
                i.treeSource.renameEntityTreeFolder = function (n, t) {
                    var r = rx.json.filter("auditEntityTypeId", n, i.treeSource);
                    r.length > 0 && angular.forEach(r, function (n, i) {
                        r[i].objectName = n.auditEntityName + " [" + t + "]";
                        r[i].auditEntityTypeName = t
                    });
                    $("div[data-entity-type='" + n + "']").each(function () {
                        var t = $(this).attr("id").replace("selected", "").replace("tree", ""),
                            n = rx.json.find(i.treeSource, {
                                objectId: parseInt(t)
                            })[0];
                        n != null && $($(this).find("span")).text(n.objectName)
                    })
                };
                i.treeSource.removeTreeFolder = function (n) {
                    var r = t.find(i.treeSource, {
                        objectId: n
                    })[0],
                        o, e, u, f;
                    if (r != null) {
                        if (o = r.parentObjectId, e = i.treeSource.indexOf(r), e != -1) {
                            if (i.treeSource.splice(e, 1), i.childArray = [], i.getAllChildObjects(r.objectId), i.childArray != null && i.childArray.length > 0)
                                for (u = 0; u < i.childArray.length; u++) i.treeSource = t.del(i.treeSource, {
                                    objectId: i.childArray[u]
                                });
                            i.childArray = []
                        }
                        f = t.find(i.treeSource, {
                            objectId: o
                        })[0];
                        f.isOpenRow = undefined;
                        i.treeEvent(f.objectId, f)
                    }
                };
                i.getAllChildObjects = function (n) {
                    var r = t.find(i.treeSource, {
                        parentObjectId: n
                    }),
                        u, f;
                    if (r != null && r.length > 0)
                        for (u = 0; u < r.length; u++) f = r[u].objectId, i.childArray.indexOf(f) == -1 && i.childArray.push(f), i.getAllChildObjects(f)
                };
                i.treeSource.getCheckedObjects = function () {
                    if (i.treeOption.treeMaster.showCheckbox != null) return t.find(f[i.treeOption.treeMaster.treeName].source, {
                        checkedRow: !0
                    })
                };
                i.treeSource.getCurrentNodeLevel = function (n) {
                    for (var u = t.find(i.treeSource, {
                        objectId: n
                    })[0], f = !1, e = 1, r = undefined; !f;) r = t.find(i.treeSource, {
                        objectId: u.parentObjectId
                    })[0], r != undefined ? (u = angular.copy(r), e += 1) : f = !0;
                    return e
                }
            };
            i.treeSelecteds = [];
            i.setSelectedNode = function (n, r) {
                var u, f;
                if (i.selected = [], n.parentObjectId == 0)
                    for (i.isSelectedNodeFolder && (i.treeSelecteds = [], i.treeSelecteds.push(n)), u = i.treeSelecteds.length - 1; u >= 0; --u) i.getTreeBind(i.treeSelecteds[u], !0), r == undefined ? i.selected.indexOf(i.treeSelecteds[u].objectId.toString()) != -1 && $("#selected" + i.treeSelecteds[u].objectId + i.treeName).addClass("selected") : $(".selected").removeClass("selected");
                else i.isSelectedNodeFolder && (i.treeSelecteds = [], i.treeSelecteds.push(n), i.selected = i.selectedNodes != undefined ? i.selectedNodes.split(",") : []), i.isSelectedNodeFolder = !1, f = t.find(i.treeSource, {
                    objectId: n.parentObjectId
                })[0], i.treeSelecteds.push(f), i.setSelectedNode(f, r)
            };
            i.contextmenus = [];
            i.checkboxChangeRoot = function (n, t) {
                i.checkboxChange(n, t)
            };
            i.openAllTreeRows = function (n) {
                var r = setTimeout(function () {
                    for (var u = t.find(i.treeSource, {
                        parentObjectId: n
                    }), r = 0; r < u.length; r++) i.treeEvent(u[r].objectId, u[r], !0), i.openAllTreeRows(u[r].objectId);
                    i.$apply()
                }, 400)
            };
            i.setTree = function () {
                var s, y, o, h, p, e, w;
                for (i.treeCheckboxRow = {}, f.setTreeName(i.treeOption.treeMaster.treeName), i.setFunctions(), i.isCustomChange = !0, i.treeName = i.treeOption.treeMaster.treeName, i.rxTreeRoot = t.find(i.treeSource, {
                    parentObjectId: 0
                }), i.treeCheckboxRow.rootHideCheckboxModel = i.rxTreeRoot.length > 0 ? i.rxTreeRoot[0].hideRow : !1, s = "loaderRoot", y = "loaderSpanRoot", i.rxTreeRoot[0].isOpenRow = !1, f.setTreeSource(i.treeOption.treeMaster.treeName, i.treeSource), i.dicJObject = {}, o = 0; o < i.treeSource.length; o++) h = i.treeSource[o], i.dicJObject[h.objectId] = h;
                var c = "",
                    a = !angular.isUndefined(i.treeOption.treeMaster.isSafeHtml) && i.treeOption.treeMaster.isSafeHtml ? rx.utils.safeHtml(i.rxTreeRoot[0].objectName) : i.rxTreeRoot[0].objectName,
                    v = !angular.isUndefined(i.treeOption.treeMaster.isEntityType) && i.treeOption.treeMaster.isEntityType ? 'data-entity-type="' + i.rxTreeRoot[0].auditEntityTypeId + '"' : "";
                i.treeOption.treeMaster.showCheckbox != undefined ? (p = i.treeOption.treeMaster.checkBoxCss != undefined ? i.treeOption.treeMaster.checkBoxCss : "", c = "<div " + v + ' id="selected{{attachmenttree.objectId}}{{treeName}}" rx-right-click="textMenu(attachmenttree)"  class="rootfolder" ><i ng-init="getCaretCss(attachmenttree)" ng-class="attachmenttree.caret" ng-click="getTreeBind(attachmenttree); $event.stopPropagation();"><\/i><input rx-indeterminate="attachmenttree.checkedRow == null" id="checkboxRow{{treeName}}{{attachmenttree.objectId}}" type="checkbox" class="  ' + p + '" ng-hide="treeCheckboxRow.rootHideCheckboxModel" ng-model="treeCheckboxRow.rootCheckboxModel" ng-change="checkboxChangeRoot(treeCheckboxRow.rootCheckboxModel,attachmenttree.objectId)"  /><\/i><i ng-class="getTreeIcon(attachmenttree)" class="  ' + i.nodeCss.nodeColorClass + ' folder-margin-left" ng-click="treeEvent(attachmenttree.objectId,attachmenttree)"><\/i><label ng-click="treeEvent(attachmenttree.objectId,attachmenttree)"><span>' + u("highlight")(a, i.treeSearchData) + "<\/span> <\/label> " + i.getNodeLinksHtml() + "<\/div>") : c = i.treeOption.treeMaster.isLabelClick == undefined || i.treeOption.treeMaster.isLabelClick ? "<div " + v + ' id="selected{{attachmenttree.objectId}}{{treeName}}" rx-right-click="textMenu(attachmenttree)" class="rootfolder" ng-click="treeEvent(attachmenttree.objectId,attachmenttree)"><i ng-init="getCaretCss(attachmenttree)" ng-class="attachmenttree.caret" ng-click="getTreeBind(attachmenttree); $event.stopPropagation();"><\/i><i ng-class="getTreeIcon(attachmenttree)" class="  ' + i.nodeCss.nodeColorClass + ' folder-margin-left"><\/i><i ng-class="' + s + '"><\/i><span ng-class="' + y + '"> ' + u("highlight")(a, i.treeSearchData) + " <\/span> " + i.getNodeLinksHtml() + "<\/div>" : "<div " + v + ' id="selected{{attachmenttree.objectId}}{{treeName}}" rx-right-click="textMenu(attachmenttree)" class="rootfolder"><i ng-init="getCaretCss(attachmenttree)" ng-class="attachmenttree.caret" ng-click="treeEvent(attachmenttree.objectId,attachmenttree)"><\/i><i ng-class="getTreeIcon(attachmenttree)" class="  ' + i.nodeCss.nodeColorClass + ' folder-margin-left"><\/i><span ng-click="treeLabelEvent(attachmenttree.objectId,attachmenttree,$event); $event.stopPropagation();">' + u("highlight")(a, i.treeSearchData) + "<\/span> " + i.getNodeLinksHtml() + "<\/div>";
                e = '<div id="exTree{{treeName}}"><div class="explorer-listing"><ul class="nav nav-pills nav-stacked"><li ng-repeat="attachmenttree in rxTreeRoot" >' + c + '<div id="rxattachment{{attachmenttree.objectId}}{{treeName}}"><\/ul><\/div>';
                i.treeOption.treeMaster.showContextMenu != undefined && i.treeOption.treeMaster.showContextMenu && (e += '<div id="rxExplorers{{treeName}}" class="dropdown ">', e += '<ul aria-labelledby="drop4" role="menu" class="dropdown-menu" id="menu1">', e += '<li role="presentation" ng-repeat="contextmenu in contextmenus" ng-click="contextEvent(contextmenu)" class="cursor">', e += i.treeOption.treeMaster.showContextTemplate != undefined && i.treeOption.treeMaster.showContextTemplate ? i.treeOption.treeMaster.showContextTemplate : '<a  tabindex="-1" role="menuitem">{{contextmenu.itemName}}<\/a>', e += "<\/li>", e += "<\/ul>", e += "<\/div>");
                e += "<\/div>";
                $(r).html(n(e)(i));
                w = setTimeout(function () {
                    var r, u, n;
                    if (i.treeOption.treeMaster.isOpen != undefined && i.treeOption.treeMaster.isOpen && (i.rxTreeRoot[0].isOpenRow = !1, i.treeEvent(i.rxTreeRoot[0].objectId, i.rxTreeRoot[0], !0)), i.treeOption.treeMaster.isOpenAll != undefined && i.treeOption.treeMaster.isOpenAll && i.treeOption.treeMaster.isOpen == undefined && (i.rxTreeRoot[0].isOpenRow = !1, i.treeEvent(i.rxTreeRoot[0].objectId, i.rxTreeRoot[0], !0), i.openAllTreeRows(i.rxTreeRoot[0].objectId)), i.selectedNodes != undefined)
                        for (r = i.selectedNodes.split(","), n = 0; n < r.length; n++) u = t.find(i.treeSource, {
                            objectId: parseInt(r[n])
                        })[0], u != null && i.treeSource.selectFolder(u, undefined);
                    if (!angular.isUndefined(i.treeOption.treeMaster.isTriStateCheckBox) && i.treeOption.treeMaster.isTriStateCheckBox)
                        for (n = 0; n < i.treeSource.length; n++) i.checkForTriStateCheckBox(i.treeSource[n], l);
                    for (n = 0; n < i.treeSource.length; n++) i.treeSource[n].checkedRow && (i.treeCheckboxRow["checkModel" + i.treeSource[n].objectId] = i.treeSource[n].checkedRow, i.treeSource[n].checkedRow = i.treeSource[n].checkedRow), i.treeCheckboxRow["hideCheckModel" + i.treeSource[n].objectId] = i.treeSource[n].hideRow;
                    i[s] = "";
                    $("#exTree" + i.treeName).mousemove(function (n) {
                        var t = $(this).parent().offset(),
                            r = n.pageX - t.left,
                            u = n.pageY - t.top;
                        i.leftPosition = r;
                        i.topPosition = u;
                        i.$apply()
                    })
                }, 500)
            };
            i.checkForTriStateCheckBox = function (n, t) {
                var u;
                if (n.parentObjectId > 0) {
                    var o = rx.json.find(i.treeSource, {
                        parentObjectId: n.parentObjectId
                    }),
                        r = rx.json.find(i.treeSource, {
                            objectId: n.parentObjectId
                        })[0],
                        f = !0,
                        e = !0;
                    for (u = 0; u < o.length; u++)
                        if (o[u].checkedRow ? f = !1 : o[u].checkedRow == null ? (e = !1, f = !1) : e = !1, !f && !e) break;
                    indeterminantCheckbox = angular.element("#checkboxRow" + t + r.objectId)[0];
                    e ? (r.checkedRow = !0, r.parentObjectId == 0 ? i.treeCheckboxRow.rootCheckboxModel = !0 : i.treeCheckboxRow["checkModel" + r.objectId] = !0, indeterminantCheckbox != undefined && (indeterminantCheckbox.indeterminate = !1), i.checkForTriStateCheckBox(r, t)) : f ? (r.checkedRow = !1, r.parentObjectId == 0 ? i.treeCheckboxRow.rootCheckboxModel = !1 : i.treeCheckboxRow["checkModel" + r.objectId] = !1, indeterminantCheckbox != undefined && (indeterminantCheckbox.indeterminate = !1), i.checkForTriStateCheckBox(r, t)) : (r.checkedRow = null, r.parentObjectId == 0 ? i.treeCheckboxRow.rootCheckboxModel = null : i.treeCheckboxRow["checkModel" + r.objectId] = null, indeterminantCheckbox != undefined && (indeterminantCheckbox.indeterminate = !0), i.checkForTriStateCheckBox(r, t))
                }
            };
            i.contextEvent = function (n) {
                $("#rxExplorers" + i.treeName).removeClass("open");
                i.treeOption.treeMaster.callbacks != undefined && i.treeOption.treeMaster.callbacks.contextEvent != undefined && (i.$parent.objectD = i.activeObject, i.$parent.cMenu = n, i.$parent.$eval(i.treeOption.treeMaster.callbacks.contextEvent + "(objectD,cMenu)"))
            };
            i.subTextMenu = function (n) {
                var r = t.find(i.treeSource, {
                    objectId: n
                })[0];
                r != undefined && ($(".selected").removeClass("selected"), $("#selected" + n + i.treeName).addClass("selected"), i.textMenu(r))
            };
            i.textMenu = function (n) {
                i.activeObject = n;
                i.treeOption.treeMaster.callbacks != undefined && i.treeOption.treeMaster.callbacks.contextBindEvent != undefined && (i.$parent.objectD = n, i.contextmenus = i.$parent.$eval(i.treeOption.treeMaster.callbacks.contextBindEvent + "(objectD)"));
                i.contextmenus.length > 0 ? ($("#rxExplorers" + i.treeName).removeClass("open"), document.getElementById("rxExplorers" + i.treeName).style.position = "absolute", document.getElementById("rxExplorers" + i.treeName).style.display = "inline", document.getElementById("rxExplorers" + i.treeName).style.left = i.leftPosition + 30 + "px", document.getElementById("rxExplorers" + i.treeName).style.top = i.topPosition + 8 + "px", $("#rxExplorers" + i.treeName).addClass("open")) : $("#rxExplorers" + i.treeName).removeClass("open")
            };
            i.$watch("treeSource", function (n) {
                angular.isUndefined(n) || i.isCustomChange || i.setTree()
            })
        }],
        link: function () { },
        replace: !0
    }
}]);
radix.directive("rxDate", ["$parse", "rxJson", "appConfig", function (n) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (t, i, r, u) {
            function o(n, t, i) {
                return angular.isUndefined(t) && (t = rx.appConfiguration.rxDateConfig.format.displayFormat), angular.isUndefined(i) && (i = rx.appConfiguration.rxDateConfig.format.valueFormat), moment(n, t.toUpperCase()).format(i.toUpperCase())
            }
            var e, s, h, f;
            if (rx.appConfiguration != undefined && rx.appConfiguration.customControl != undefined && rx.appConfiguration.customControl.rxDate != undefined) {
                rx.appConfiguration.customControl.rxDate.link(t, i, r, u);
                return
            }
            $(i).attr("maxlength", "10");
            e = r.rxModel.split(".");
            s = e[e.length - 1];
            $(i).blur(function () {
                if (this.value.length == 10 && (f.format != "yyyy年m月dd日" || f.format != "m月dd日yyyy年" || f.format != "dd日m月yyyy年") || this.value.length == 11 && (f.format == "yyyy年m月dd日" || f.format == "m月dd日yyyy年" || f.format == "dd日m月yyyy年")) {
                    var i = this.value;
                    t.$apply(function () {
                        if (!angular.isUndefined(r.rxModel)) {
                            var u = n(r.rxModel);
                            u.assign(t, o(i))
                        }
                    })
                } else this.value == null || this.value == "" ? t.$apply(function () {
                    var u = n(r.rxModel),
                        i;
                    u.assign(t, "");
                    i = n(r.ngModel);
                    i.assign(t, "")
                }) : !angular.isUndefined(r.rxModel)
            });
            t.$watch(r.rxModel, function (u) {
                var f;
                if (!angular.isUndefined(u) && u != null && u.length > 2)
                    if (u.indexOf("NaN") != -1) f = n(r.ngModel), $(i).val(""), f.assign(t, undefined), $(i).datepicker("update", "");
                    else {
                        var s = u.split("/"),
                            e = o(u, rx.appConfiguration.rxDateConfig.format.valueFormat, rx.appConfiguration.rxDateConfig.format.displayFormat),
                            f = n(r.ngModel);
                        $(i).val(e);
                        f.assign(t, e);
                        $(i).datepicker("update", new Date(Date.parse(u)))
                    }
            }, !0);
            h = "";
            f = {
                format: rx.appConfiguration.rxDateConfig.format.displayFormat,
                weekStart: rx.appConfiguration.rxDateConfig.weekStartDay,
                startDate: rx.appConfiguration.rxDateConfig.minDate,
                endDate: rx.appConfiguration.rxDateConfig.maxDate,
                startView: rx.appConfiguration.rxDateConfig.defaultView,
                clearBtn: rx.appConfiguration.rxDateConfig.clearButtonEnabled,
                orientation: rx.appConfiguration.rxDateConfig.orientation,
                daysOfWeekDisabled: rx.appConfiguration.rxDateConfig.daysOfWeekDisabled,
                calendarWeeks: rx.appConfiguration.rxDateConfig.weekOfYearEnabled,
                autoclose: rx.appConfiguration.rxDateConfig.autoCloseOnSelection,
                todayHighlight: rx.appConfiguration.rxDateConfig.todayHighlight,
                keyboardNavigation: rx.appConfiguration.rxDateConfig.keyboardNavigation,
                toggleActive: rx.appConfiguration.rxDateConfig.toggleActive,
                beforeShowDay: function (n) {
                    return angular.isUndefined(r.ondayShown) || r.ondayShown == "" ? !0 : (t.$parent.beforeShowDate = n, t.$eval(r.ondayShown + "(beforeShowDate)"))
                },
                datesDisabled: rx.appConfiguration.rxDateConfig.datesDisabled,
                defaultViewDate: rx.appConfiguration.rxDateConfig.defaultViewDate
            };
            rx.appConfiguration.rxDateConfig.todayButtonEnabled && (f.todayBtn = "linked");
            $(i).datepicker(f).on("changeDate", function () {
                if (this.value.length == 10 && (f.format != "yyyy年m月dd日" || f.format != "m月dd日yyyy年" || f.format != "dd日m月yyyy年") || this.value.length == 11 && (f.format == "yyyy年m月dd日" || f.format == "m月dd日yyyy年" || f.format == "dd日m月yyyy年")) {
                    var i = this.value;
                    t.$apply(function () {
                        if (!angular.isUndefined(r.rxModel)) {
                            var u = n(r.rxModel);
                            u.assign(t, o(i))
                        }
                        if (!angular.isUndefined(r.ngChange)) {
                            t.$eval(r.ngChange);
                            return
                        }
                        if (!angular.isUndefined(r.rxChange)) {
                            t.$eval(r.rxChange);
                            return
                        }
                        angular.isUndefined(r.rxChanged) || t.$eval(r.rxChanged)
                    })
                }
            }).on("click", function () {
                this.value == "" && $(i).val("").datepicker("update");
                $(i).datepicker("show")
            }).css("z-index", 3335)
        }
    }
}]);
radix.directive("rxPopover", ["$compile", "cacheData", "rxJson", function (n, t, i) {
    return {
        restrict: "A",
        link: function (r, u, f) {
            var o, s, e;
            r.templateString = "";
            r.ispopover = !0;
            o = "";
            r.popoverUniqueCss = "popovercss" + i.uniqueNumber();
            r.hidePopoverUnique = !1;
            r.hidePopover = function () {
                $("." + r.popoverUniqueCss).popover("hide")
            };
            r.hidePopoverUniques = function () {
                $("." + r.popoverUniqueCss).remove()
            };
            r.showPopoverMenu = function () {
                r.hidePopoverUnique = !0
            };
            s = setTimeout(function () {
                $(u).on("shown.bs.popover", function () {
                    var n = $(".popover");
                    $(".popover").addClass(r.popoverUniqueCss)
                });
                $(u).popover({
                    placement: angular.isUndefined(f.placement) ? "top" : f.placement,
                    title: f.rxPopovertitle,
                    html: !0,
                    container: "body",
                    trigger: f.rxTrigger,
                    delay: {
                        show: angular.isUndefined(rx.appConfiguration.popoverOption) || angular.isUndefined(rx.appConfiguration.popoverOption.delay.show) ? 200 : rx.appConfiguration.popoverOption.delay.show,
                        hide: angular.isUndefined(rx.appConfiguration.popoverOption) || angular.isUndefined(rx.appConfiguration.popoverOption.delay.hide) ? 100 : rx.appConfiguration.popoverOption.delay.hide
                    },
                    content: function () {
                        if (f.rxPopovercontent == undefined) {
                            if ($(".popover").popover("hide"), !angular.isUndefined(f.popoverid)) {
                                var i = f.popoverid.split(".");
                                t.save("popoverId", r[i[0]][i[1]])
                            }
                            return r.$apply(function () {
                                var t = '<div ng-mouseover="showPopoverMenu()">' + e + "<\/div>";
                                return n(t)(r)
                            })
                        }
                        return f.rxPopovercontent
                    }
                })
            }, 500);
            f.rxTemplatepath != undefined && (e = "", $.get(f.rxTemplatepath, function (n) {
                e = n;
                r.$apply()
            }))
        }
    }
}]);
radix.directive("rxRuleTree", ["$compile", "rxJson", "rxTreeData", "$rootScope", "$window", "rxUserPermission", "rxAlert", "appConfig", function (n, t, i, r, u, f, e, o) {
    return {
        restrict: "E",
        scope: {
            treeSource: "=",
            treeOption: "="
        },
        controller: ["$scope", "$element", function (u, s) {
            u.treeCall = !0;
            u.getTreeIcon = function (n) {
                return n.showParent ? "icon-minus" : "icon-plus"
            };
            u.showParent = function (n) {
                n.showParent = !n.showParent;
                i.setCurrentObject(u.treeOption.treeMaster.treeName, n);
                u.treeOption.treeMaster.callbacks != undefined && u.treeOption.treeMaster.callbacks.selectEvent != undefined && (u.$parent.objectD = n, u.$parent.$eval(u.treeOption.treeMaster.callbacks.selectEvent + "(objectD)"))
            };
            u.childTreeEvent = function (n, t) {
                var r, f;
                for (u.treeSource[0].textBold = "", i.setTreeName(u.treeOption.treeMaster.treeName), r = 0; r < t.length; r++)
                    for (t[r].textBold = "", f = 0; f < t[r].parentObjects.length; f++) t[r].parentObjects[f].cssClass = "icon-remove", t[r].parentObjects[f].childSelectedCss = "";
                i.setTreeChildObject(n, u.treeOption.treeMaster.treeName);
                n.cssClass = n.cssClass == "icon-remove" ? "icon-ok" : "icon-remove";
                n.childSelectedCss = n.childSelectedCss == "" ? "text-bold" : "";
                u.$parent.$eval(u.treeOption.treeMaster.childObjectEvent)
            };
            u.showRootPopup = function (n, t) {
                i[i.activeTree].currentEvent = "add";
                u.rootObjectEvent(n, t);
                r.entityFlagChanged = !0;
                i.setTreeName(u.treeOption.treeMaster.treeName);
                i.setTreeRootObject(n, u.treeOption.treeMaster.treeName, t);
                u.popupTemplate = {
                    popupCss: u.treeOption.treeMaster.rootPopupCss
                };
                u.popupTemplateSrc = {
                    src: u.treeOption.treeMaster.rootPopupTemplatePath
                };
                $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal({
                    backdrop: "static",
                    keyboard: !1
                });
                $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal("show")
            };
            u.rootObjectEvent = function (n, t) {
                var f, r, e;
                for (u.treeSource[0].textBold = "text-bold", f = u.treeSource[0].parentObjects, r = 0; r < f.length; r++)
                    for (f[r].textBold = "", e = 0; e < f[r].parentObjects.length; e++) f[r].parentObjects[e].cssClass = "icon-remove", f[r].parentObjects[e].childSelectedCss = "";
                i.setTreeName(u.treeOption.treeMaster.treeName);
                i.setTreeRootObject(n, u.treeOption.treeMaster.treeName, t);
                u.$parent.$eval(u.treeOption.treeMaster.rootObjectEvent)
            };
            u.showParentPopup = function (n, t, f, e) {
                n.active ? (u.updateParentEvent(n, t), i.setTreeRootObject(f, u.treeOption.treeMaster.treeName, e), r.entityFlagChanged = !0, i.setTreeName(u.treeOption.treeMaster.treeName), i.setTreeParentObject(n, u.treeOption.treeMaster.treeName, t), u.popupTemplate = {
                    popupCss: u.treeOption.treeMaster.parentPopupCss
                }, u.popupTemplateSrc = {
                    src: u.treeOption.treeMaster.parentPopupTemplatePath
                }, i[i.activeTree].currentEvent = "addchild", $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal({
                    backdrop: "static",
                    keyboard: !1
                }), $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal("show")) : u.$parent.$eval(u.treeOption.treeMaster.inactiveMessage)
            };
            u.updateParent = function (n, t, f, e) {
                activeGridJson = "skillGroup";
                i[i.activeTree].currentEvent = "edit";
                u.updateParentEvent(n, t);
                i.setTreeRootObject(f, u.treeOption.treeMaster.treeName, e);
                r.entityFlagChanged = !0;
                i.setTreeName(u.treeOption.treeMaster.treeName);
                i.setTreeParentObject(n, u.treeOption.treeMaster.treeName, t);
                u.popupTemplate = {
                    popupCss: u.treeOption.treeMaster.parentPopupCss
                };
                u.popupTemplateSrc = {
                    src: u.treeOption.treeMaster.editParentPopupTemplatePath
                };
                $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal({
                    backdrop: "static",
                    keyboard: !1
                });
                $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal("show")
            };
            u.updateParentEvent = function (n, t) {
                var f, r, e;
                for (u.treeSource[0].textBold = "", f = u.treeSource[0].parentObjects, r = 0; r < f.length; r++)
                    for (f[r].textBold = "", e = 0; e < f[r].parentObjects.length; e++) f[r].parentObjects[e].cssClass = "icon-remove", f[r].parentObjects[e].childSelectedCss = "";
                n.textBold = "text-bold";
                i.setTreeName(u.treeOption.treeMaster.treeName);
                i.setTreeParentObject(n, u.treeOption.treeMaster.treeName, t);
                u.$parent.$eval(u.treeOption.treeMaster.parentObjectEvent)
            };
            u.showChildElementPopup = function (n, t, f, e, o, s) {
                activeGridJson = "skillType";
                i[i.activeTree].currentEvent = "editchild";
                u.childTreeEvent(n, t);
                i.setTreeRootObject(o, u.treeOption.treeMaster.treeName, s);
                i.setTreeParentObject(f, u.treeOption.treeMaster.treeName, e);
                r.entityFlagChanged = !0;
                i.setTreeName(u.treeOption.treeMaster.treeName);
                i.setTreeChildObject(n, u.treeOption.treeMaster.treeName, t);
                u.popupTemplate = {
                    popupCss: u.treeOption.treeMaster.childPopupCss
                };
                u.popupTemplateSrc = {
                    src: u.treeOption.treeMaster.childPopupTemplatePath
                };
                $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal({
                    backdrop: "static",
                    keyboard: !1
                });
                $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal("show")
            };
            u.showChildAddElementPopup = function (n, t, f, e, o, s) {
                n.active && f.active ? (u.childTreeEvent(n, t), i.setTreeRootObject(o, u.treeOption.treeMaster.treeName, s), i.setTreeParentObject(f, u.treeOption.treeMaster.treeName, e), r.entityFlagChanged = !0, i.setTreeName(u.treeOption.treeMaster.treeName), i.setTreeChildObject(n, u.treeOption.treeMaster.treeName, t), u.popupTemplate = {
                    popupCss: u.treeOption.treeMaster.childPopupCss
                }, u.popupTemplateSrc = {
                    src: u.treeOption.treeMaster.childAddPopupTemplatePath
                }, i[i.activeTree].currentEvent = "addKeyword", $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal({
                    backdrop: "static",
                    keyboard: !1
                }), $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).modal("show")) : u.$parent.$eval(u.treeOption.treeMaster.inactiveMessage)
            };
            u.showEdit = function (n) {
                var i = t.find(f.permissionContext, {
                    permissionItemName: "Keyword Library"
                })[0];
                i != undefined && (i.canView ? n.showEditIcon = !0 : i.canEdit && (n.showEditIcon = !0), i.canAdd && (n.showEditAddIcon = !0))
            };
            u.showEditLeave = function (n) {
                n.showEditIcon = !1;
                n.showEditAddIcon = !1
            };
            u.contextEvent = function (n) {
                u.treeOption.treeMaster.callbacks != undefined && u.treeOption.treeMaster.callbacks.contextEvent != undefined && (u.$parent.objectD = u.activeObject, u.$parent.cMenu = n, u.$parent.$eval(u.treeOption.treeMaster.callbacks.contextEvent + "(objectD,cMenu)"))
            };
            u.onSelect = function (n) {
                for (var r, f, e, o, s, h, c, t = 0; t < u.treeSourceData.length; t++)
                    for (r = u.treeSourceData[t], r.selectedRow = "", f = 0; f < r.parentObjects.length; f++)
                        for (e = r.parentObjects[f], e.selectedRow = "", o = 0; o < e.parentObjects.length; o++)
                            for (s = e.parentObjects[o], s.selectedRow = "", h = 0; h < s.parentObjects.length; h++) c = s.parentObjects[h], c.selectedRow = "";
                n.selectedRow = "text-bold";
                i.setCurrentObject(u.treeOption.treeMaster.treeName, n);
                u.treeOption.treeMaster.callbacks != undefined && u.treeOption.treeMaster.callbacks.selectEvent != undefined && (u.$parent.objectD = n, u.$parent.$eval(u.treeOption.treeMaster.callbacks.selectEvent + "(objectD)"))
            };
            u.additionalObject = function () {
                u.treeSourceData.addObject = function (n, r) {
                    var o, e, f, s;
                    for (r ? u.treeSource.unshift(n) : u.treeSource.push(n), u.groupByJson = t.groupBy(u.treeSource, "parentObjectId"), o = [], e = 0; e < u.groupByJson[0].length; e++) f = u.groupByJson[0][e], s = angular.isUndefined(u.groupByJson[f.objectId]) ? [] : u.groupByJson[f.objectId], o.push({
                        title: f.title,
                        objectId: f.objectId,
                        showParent: !0,
                        textBold: "",
                        showEditIcon: !1,
                        showContext: f.showAddPopup != undefined,
                        parentObjects: u.firstLevelObjects(s)
                    });
                    u.treeSourceData = o;
                    i.setRuleTreeObject(u.treeOption.treeMaster.treeName, u.treeSourceData);
                    u.additionalObject()
                };
                u.treeSourceData.hideContext = function () {
                    u.hideContextMenu()
                };
                u.treeSourceData.removeObject = function (n) {
                    var s = t.find(u.treeSource, {
                        objectId: n
                    })[0],
                        e, o, f, r, h;
                    for (s != undefined && (e = u.treeSource.indexOf(s), e != -1 && u.treeSource.splice(e, 1)), u.groupByJson = t.groupBy(u.treeSource, "parentObjectId"), o = [], f = 0; f < u.groupByJson[0].length; f++) r = u.groupByJson[0][f], h = angular.isUndefined(u.groupByJson[r.objectId]) ? [] : u.groupByJson[r.objectId], o.push({
                        title: r.title,
                        objectId: r.objectId,
                        showParent: !0,
                        textBold: "",
                        showEditIcon: !1,
                        showContext: r.showAddPopup != undefined,
                        parentObjects: u.firstLevelObjects(h)
                    });
                    u.treeSourceData = o;
                    i.setRuleTreeObject(u.treeOption.treeMaster.treeName, u.treeSourceData);
                    u.additionalObject()
                };
                u.treeSourceData.manageMoveUp = function (n) {
                    var c = [],
                        f = t.find(u.treeSource, {
                            objectId: n
                        })[0],
                        e = t.find(u.treeSource, {
                            parentObjectId: f.parentObjectId
                        }),
                        h, s, i, a;
                    if (f != undefined && e != null && e.length > 1) {
                        var v = e.indexOf(f),
                            l = e[v - 1],
                            r = u.treeSource.indexOf(f),
                            o = u.treeSource.indexOf(l),
                            y = u.treeSource[r].orderNo,
                            p = u.treeSource[o].orderNo;
                        for (u.treeSource[o] = u.treeSource[r], u.treeSource[o].orderNo = p, u.treeSource[r] = l, u.treeSource[r].orderNo = y, u.groupByJson = t.groupBy(u.treeSource, "parentObjectId"), h = [], s = 0; s < u.groupByJson[0].length; s++) i = u.groupByJson[0][s], a = angular.isUndefined(u.groupByJson[i.objectId]) ? [] : u.groupByJson[i.objectId], h.push({
                            title: i.title,
                            objectId: i.objectId,
                            showParent: !0,
                            textBold: "",
                            showEditIcon: !1,
                            showContext: i.showAddPopup != undefined,
                            parentObjects: u.firstLevelObjects(a)
                        });
                        u.treeSourceData = h;
                        c = [u.treeSource[o], u.treeSource[r]]
                    }
                    return c
                };
                u.treeSourceData.manageMoveDown = function (n) {
                    var c = [],
                        f = t.find(u.treeSource, {
                            objectId: n
                        })[0],
                        e = t.find(u.treeSource, {
                            parentObjectId: f.parentObjectId
                        }),
                        h, s, i, a;
                    if (f != undefined && e != null && e.length > 1) {
                        var v = e.indexOf(f),
                            l = e[v + 1],
                            r = u.treeSource.indexOf(f),
                            o = u.treeSource.indexOf(l),
                            y = u.treeSource[r].orderNo,
                            p = u.treeSource[o].orderNo;
                        for (u.treeSource[o] = u.treeSource[r], u.treeSource[o].orderNo = p, u.treeSource[r] = l, u.treeSource[r].orderNo = y, u.groupByJson = t.groupBy(u.treeSource, "parentObjectId"), h = [], s = 0; s < u.groupByJson[0].length; s++) i = u.groupByJson[0][s], a = angular.isUndefined(u.groupByJson[i.objectId]) ? [] : u.groupByJson[i.objectId], h.push({
                            title: i.title,
                            objectId: i.objectId,
                            showParent: !0,
                            textBold: "",
                            showEditIcon: !1,
                            showContext: i.showAddPopup != undefined,
                            parentObjects: u.firstLevelObjects(a)
                        });
                        u.treeSourceData = h;
                        c = [u.treeSource[o], u.treeSource[r]]
                    }
                    return c
                };
                u.treeSource.resetTree = function () {
                    u.treeCall = !0
                }
            };
            u.setTree = function () {
                var h, e, f, l, c, a, v, y;
                for (u.groupByJson = t.groupBy(u.treeSource, "parentObjectId"), h = [], e = 0; e < u.groupByJson[0].length; e++) f = u.groupByJson[0][e], l = angular.isUndefined(u.groupByJson[f.objectId]) ? [] : u.groupByJson[f.objectId], h.push({
                    title: f.title,
                    objectId: f.objectId,
                    showParent: !0,
                    textBold: "",
                    showEditIcon: !1,
                    showContext: f.showAddPopup != undefined,
                    parentObjects: u.firstLevelObjects(l)
                });
                u.treeSourceData = h;
                u.additionalObject();
                i.setRuleTreeObject(u.treeOption.treeMaster.treeName, u.treeSourceData);
                c = "";
                u.showLineClass = angular.isUndefined(u.treeOption.treeMaster.showLine) || u.treeOption.treeMaster.showLine ? "" : "-line";
                a = !angular.isUndefined(u.treeOption.treeMaster.toolTip) && !angular.isUndefined(u.treeOption.treeMaster.toolTip.firstLevelColumn) ? 'rx-tip main-object="treeParentObject" property="' + u.treeOption.treeMaster.toolTip.firstLevelColumn + '" tip-trigger="hover" tip-placement="top"' : "";
                v = !angular.isUndefined(u.treeOption.treeMaster.textTruncate) && !angular.isUndefined(u.treeOption.treeMaster.textTruncate.firstLevelLength) ? u.treeOption.treeMaster.textTruncate.firstLevelLength : 0;
                c = '<div id="ab' + u.treeOption.treeMaster.treeName + '" style="clear:both;" class="tree tree-unselectable" ng-click="hideContextMenu()"><div style="display: block;" class="tree-folder tree-folder{{showLineClass}}" ng-repeat="treeObject in treeSourceData"><div class="tree-folder-header"><i ng-class="getTreeIcon(treeObject)" ng-click="showParent(treeObject)"><\/i><div  ng-click="onSelect(treeObject)" ng-class="treeObject.selectedRow" rx-right-click="textMenu(treeObject)" class="tree-folder-name ">{{treeObject.title}} <\/div><\/div><div class="tree-folder-content tree-folder-content{{showLineClass}}" ng-show="treeObject.parentObjects.length > 0 && treeObject.showParent"><div style="display: block;" id="{{treeParentObject.objectId}}"   class="tree-folder tree-folder{{showLineClass}}" ng-repeat="treeParentObject in treeObject.parentObjects"><div  class="tree-folder-header"><i ng-class="getTreeIcon(treeParentObject)" ng-click="showParent(treeParentObject)"><\/i><div class="tree-folder-name" ' + a + ' ng-class="treeParentObject.selectedRow" ng-click="onSelect(treeParentObject)" rx-right-click="textMenu(treeParentObject)" >{{treeParentObject.title | texttruncate : ' + v + '}} <\/div><\/div><div class="tree-folder-content tree-folder-content{{showLineClass}}"  ng-show="treeParentObject.parentObjects.length > 0 && treeParentObject.showParent"><div style="display: block;" id="{{treeChildObject.objectId}}"  class="tree-folder tree-folder{{showLineClass}}"  ng-repeat="treeChildObject in treeParentObject.parentObjects"><div  class="tree-folder-header"><i ng-class="getTreeIcon(treeChildObject)" ng-click="showParent(treeChildObject)"><\/i><div class="tree-folder-name" ng-class="treeChildObject.selectedRow" ng-click="onSelect(treeChildObject)"  rx-right-click="textMenu(treeChildObject)"  >{{treeChildObject.title}}<\/div><\/div><div class="tree-folder-content tree-folder-content{{showLineClass}}" ng-show="treeChildObject.parentObjects.length > 0 && treeChildObject.showParent"><div style="display: block;" class="tree-item tree-item{{showLineClass}}" ng-class="treeSecondChildObject.mainObjectClass" id="{{treeSecondChildObject.objectId}}" ng-repeat="treeSecondChildObject in treeChildObject.parentObjects"><i ng-class="getTreeIcon(treeSecondChildObject)" ng-click="setChecked(treeSecondChildObject)" ><\/i><div class="tree-item-name" ng-class="treeSecondChildObject.selectedRow" rx-right-click="textMenu(treeSecondChildObject)"  ng-click="onSelect(treeSecondChildObject)" style="padding-right:5px;" >{{treeSecondChildObject.title}}<\/div><\/div><\/div><\/div><\/div><\/div><\/div><\/div><div id="rxExplorers' + u.treeOption.treeMaster.treeName + '" class="dropdown " style="position:absolute !important;"><ul aria-labelledby="drop4" role="menu" class="dropdown-menu" id="menu1"><li role="presentation" ng-repeat="contextmenu in contextmenus" ng-click="contextEvent(contextmenu)" class="cursor"><a  tabindex="-1" role="menuitem">{{contextmenu.itemName}}<\/a><\/li><\/ul><\/div><div  id="treePopupTemplate' + u.treeOption.treeMaster.treeName + '" class="modal fade {{popupTemplate.popupCss}}"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true"><div ng-include src="popupTemplateSrc.src"><\/div><\/div><\/div>';
                u.contextmenus = [{
                    itemName: "Add Rule"
                }];
                $(s).html(n(c)(u));
                y = setTimeout(function () {
                    $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).on("hide.bs.modal", function (t) {
                        if (o.alert.dataLost && !angular.isUndefined(r.isEntityChanged) && r.isEntityChanged) {
                            t.preventDefault();
                            $("#rxload").removeClass("rxloadout").addClass("rxloadin");
                            $("#rxload").html(n(' <div class="mainOverlayout"><div class="alertbox"><div id="rxAlert" class="alertbox" style="max-height: 417.6px;"><div class="modal-header"><h5>Data Lost<\/h5><\/div><div class="modal-body">Do you want to save changes made to this record?<\/div><div class="modal-footer"><button  class="btn btn-primary" ng-click="alertEventProcess()">Save<\/button><button  class="btn btn-primary" ng-click="dataLossPopup(true)">Dont Save<\/button><button  class="btn btn-primary" ng-click="dataLossPopup(false)">Cancel<\/button><\/div><\/div><\/div><\/div>')(u))
                        }
                    });
                    $("#treePopupTemplate" + u.treeOption.treeMaster.treeName).on("hidden.bs.modal", function () {
                        r.isEntityChanged = !1;
                        r.entityFlagChanged = !1;
                        r.$apply();
                        u.$apply(function () {
                            r.entityFlagChanged = !1;
                            u.popupTemplateSrc = {
                                src: "Scripts/lib/rxapp/template/blank.html",
                                popupCss: ""
                            }
                        })
                    });
                    $("#ab" + u.treeOption.treeMaster.treeName).mousemove(function (n) {
                        var t = $(this).parent().offset(),
                            i = n.pageX - t.left,
                            r = n.pageY - t.top;
                        u.leftPosition = i;
                        u.topPosition = r;
                        u.$apply()
                    })
                }, 500)
            };
            u.hideContextMenu = function () {
                $("#rxExplorers" + u.treeOption.treeMaster.treeName).removeClass("open")
            };
            u.textMenu = function (n) {
                if (i.setCurrentObject(u.treeOption.treeMaster.treeName, n), u.activeObject = n, n.showContext) {
                    u.treeOption.treeMaster.callbacks != undefined && u.treeOption.treeMaster.callbacks.contextBindEvent != undefined && (u.$parent.objectD = n, u.contextmenus = u.$parent.$eval(u.treeOption.treeMaster.callbacks.contextBindEvent + "(objectD)"));
                    var t = $("#ruletree" + n.objectId),
                        r = t.position();
                    $("#rxExplorers" + u.treeOption.treeMaster.treeName).removeClass("open");
                    document.getElementById("rxExplorers" + u.treeOption.treeMaster.treeName).style.position = "absolute";
                    document.getElementById("rxExplorers" + u.treeOption.treeMaster.treeName).style.display = "inline";
                    document.getElementById("rxExplorers" + u.treeOption.treeMaster.treeName).style.left = u.leftPosition + "px";
                    document.getElementById("rxExplorers" + u.treeOption.treeMaster.treeName).style.top = u.topPosition + 10 + "px";
                    $("#rxExplorers" + u.treeOption.treeMaster.treeName).addClass("open")
                } else $("#rxExplorers" + u.treeOption.treeMaster.treeName).removeClass("open")
            };
            u.inactiveClassSetChild = function (n) {
                return n.active ? n.childSelectedCss : n.childSelectedCss + " in-active-color"
            };
            u.inactiveClassSet = function (n) {
                return n.active ? n.textBold : n.textBold + " in-active-color"
            };
            u.dataLossPopup = function (n) {
                n && (r.isEntityChanged = !1, r.entityFlagChanged = !1, u.gridSource.hidePopup(), r.$apply())
            };
            u.alertEventProcess = function () {
                i[i.activeTree].currentEvent == "edit" ? angular.isUndefined(u.treeOption.treeMaster.alertEvent.update) || (e.scopeOption.$eval(u.treeOption.treeMaster.alertEvent.update), u.dataLossPopup(!0)) : i[i.activeTree].currentEvent == "editchild" ? angular.isUndefined(u.treeOption.treeMaster.alertEvent.updateChild) || (e.scopeOption.$eval(u.treeOption.treeMaster.alertEvent.updateChild), u.dataLossPopup(!0)) : i[i.activeTree].currentEvent == "add" ? angular.isUndefined(u.treeOption.treeMaster.alertEvent.add) || (e.scopeOption.$eval(u.treeOption.treeMaster.alertEvent.add), u.dataLossPopup(!0)) : i[i.activeTree].currentEvent == "addchild" ? angular.isUndefined(u.treeOption.treeMaster.alertEvent.addChild) || (e.scopeOption.$eval(u.treeOption.treeMaster.alertEvent.addChild), u.dataLossPopup(!0)) : i[i.activeTree].currentEvent == "addKeyword" && (angular.isUndefined(u.treeOption.treeMaster.alertEvent.addKeyword) || (e.scopeOption.$eval(u.treeOption.treeMaster.alertEvent.addKeyword), u.dataLossPopup(!0)))
            };
            u.dataLossPopup = function (n) {
                $("#rxload").removeClass("rxloadin").addClass("rxloadout");
                n && (r.isEntityChanged = !1, r.entityFlagChanged = !1, i[i.activeTree].hidePopup(), r.$apply())
            };
            u.firstLevelObjects = function (n, t) {
                for (var f, r = [], i = 0; i < n.length; i++) f = angular.isUndefined(u.groupByJson[n[i].objectId]) ? [] : u.groupByJson[n[i].objectId], r.push({
                    objectId: n[i].objectId,
                    title: n[i].title,
                    mainTitle: t,
                    showParent: !0,
                    textBold: "",
                    active: n[i].active,
                    url: n[i].url,
                    showContext: n[i].showAddPopup != undefined,
                    parentObjects: u.secondLevelObjects(f)
                });
                return r
            };
            u.secondLevelObjects = function (n, t) {
                var i, r;
                if (n != undefined) {
                    for (i = 0; i < n.length; i++) r = angular.isUndefined(u.groupByJson[n[i].objectId]) ? [] : u.groupByJson[n[i].objectId], n[i].cssClass = "icon-remove", n[i].childSelectedCss = "", n[i].showEditIcon = !1, n[i].showParent = !0, n[i].mainTitle = t, n[i].active = n[i].active, n[i].showContext = n[i].showAddPopup != undefined, n[i].parentObjects = u.thirdLevelObjects(n[i].objectId);
                    return n
                }
                return []
            };
            u.thirdLevelObjects = function (n, t) {
                var i, r;
                if (n != undefined) {
                    for (i = angular.isUndefined(u.groupByJson[n]) ? [] : u.groupByJson[n], r = 0; r < i.length; r++) i[r].showParent = !1, i[r].cssClass = "icon-remove", i[r].showEditIcon = !1, i[r].mainTitle = t, i[r].active = i[r].active, i[r].showContext = i[r].showAddPopup != undefined;
                    return i
                }
                return []
            };
            u.setChecked = function (n) {
                var i = t.find(u.treeOption.treeMaster.fourthLevel, {
                    objectId: n.objectId
                })[0];
                n.childSelectedCss == "icon-remove" ? (i.isSelected = !0, n.childSelectedCss = "icon-ok", n.mainObjectClass = "tree-selected") : (i.isSelected = !1, n.childSelectedCss = "icon-remove", n.mainObjectClass = "")
            };
            u.$watch("treeSource", function (n) {
                angular.isUndefined(n) || u.treeCall && (u.treeCall = !1, u.setTree())
            })
        }],
        link: function () { },
        replace: !0
    }
}]);
radix.filter("texttruncate", function () {
    return function (n, t, i) {
        var r = "...",
            e, o, s, u, f;
        return angular.isString(t) ? (e = $("#theading" + t + i).width() / 8, o = e / 2, String(n).length > e ? (s = String(n).substring(0, o - r.length) + r, String(n).substring(0, o - r.length) + r) : n) : (u = t, n != undefined && u > 0) ? (f = "", f = n.substring(0, u), n.length > u ? f + r : f) : n
    }
});
radix.directive("rxCodeEditor", ["$parse", function (n) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (t, i, r) {
            t.$watch(r.showEditor, function (i) {
                if (!angular.isUndefined(i) && i) var u = setTimeout(function () {
                    var i = CodeMirror.fromTextArea(document.getElementById(r.id), {
                        extraKeys: {
                            "Ctrl-Space": "autocomplete"
                        },
                        mode: "text/javascript",
                        matchBrackets: !0
                    });
                    $(".cm-s-default").addClass("form-control");
                    CodeMirror.on(i, "keydown", function (i) {
                        var u = i.doc.cm.getValue();
                        t.$apply(function () {
                            if (!angular.isUndefined(r.ngModel)) {
                                var i = n(r.ngModel);
                                i.assign(t, u)
                            }
                        })
                    })
                }, 50)
            })
        }
    }
}]);
radix.directive("rxIndeterminate", function () {
    return {
        restrict: "A",
        link: function (n, t, i) {
            n.$watch(i.rxIndeterminate, function (n) {
                t.prop("indeterminate", n)
            })
        }
    }
});
radix.filter("rxAfter", ["rxJson", function (n) {
    return function (t, i) {
        if (t != null && t.length > 0 && i != null && i != "") {
            if (typeof i == "number") return t.slice(i, t.length);
            var u = n.find(t, i)[0],
                r = t.indexOf(u);
            if (r >= 0) return t.slice(r, t.length)
        }
    }
}]);
radix.filter("rxReverse", function () {
    return function (n) {
        var i, t;
        if (isNaN(n)) {
            for (i = "", t = n.length - 1; t >= 0; t--) i += n[t];
            return i
        }
    }
});
radix.filter("rxStartsWith", function () {
    return function (n, t, i) {
        var r = i || !1;
        return !angular.isString(n) || angular.isUndefined(t) ? n : (n = r ? n : n.toLowerCase(), !n.indexOf(r ? t : t.toLowerCase()))
    }
});
radix.filter("rxEndsWith", function () {
    return function (n, t, i) {
        var r = i || !1,
            u;
        return !angular.isString(n) || angular.isUndefined(t) ? n : (n = r ? n : n.toLowerCase(), u = n.length - t.length, n.indexOf(r ? t : t.toLowerCase(), u) !== -1)
    }
});
radix.filter("rxMatch", function () {
    return function (n, t, i) {
        var r = new RegExp(t, i);
        return angular.isString(n) ? n.match(r) : null
    }
});
radix.filter("rxTest", function () {
    return function (n, t, i) {
        var r = new RegExp(t, i);
        return angular.isString(n) ? r.test(n) : n
    }
});
radix.filter("rxBetween", function () {
    return function (n, t, i) {
        return rx.rxString.between(n, t, i)
    }
});
radix.filter("rxCamelCase", function () {
    return function (n) {
        return n.replace(/\s(.)/g, function (n) {
            return n.toUpperCase()
        }).replace(/\s/g, "").replace(/^(.)/, function (n) {
            return n.toLowerCase()
        })
    }
});
radix.filter("rxPascalCase", function () {
    return function (n) {
        return n.replace(/(\w)(\w*)/g, function (n, t, i) {
            return t.toUpperCase() + i.toLowerCase()
        })
    }
});
radix.filter("rxCapitalize", function () {
    return function (n) {
        return rx.rxString.capitalize(n)
    }
});
radix.filter("rxCompare", function () {
    return function (n, t) {
        return Boolean(rx.rxString.compare(n, t))
    }
});
radix.filter("rxContains", function () {
    return function (n, t) {
        return rx.rxString.contains(n, t)
    }
});
radix.filter("rxStartCharacterPicker", function () {
    return function (n, t) {
        return rx.rxString.first(n, t)
    }
});
radix.filter("rxLastCharacterPicker", function () {
    return function (n, t) {
        return rx.rxString.last(n, t)
    }
});
radix.filter("rxNormalizeSpace", function () {
    return function (n) {
        return rx.rxString.normalizeSpaces(n)
    }
});
radix.filter("rxPad", function () {
    return function (n, t, i) {
        return rx.rxString.pad(n, t, i)
    }
});
radix.filter("rxPadLeft", function () {
    return function (n, t, i) {
        return rx.rxString.padLeft(n, t, i)
    }
});
radix.filter("rxPadRight", function () {
    return function (n, t, i) {
        return rx.rxString.padRight(n, t, i)
    }
});
radix.filter("rxTrim", function () {
    return function (n) {
        return rx.rxString.trim(n)
    }
});
radix.filter("rxTrimLeft", function () {
    return function (n) {
        return rx.rxString.trimLeft(n)
    }
});
radix.filter("rxTrimRight", function () {
    return function (n) {
        return rx.rxString.trimRight(n)
    }
});
radix.filter("rxTruncate", function () {
    return function (n, t) {
        return rx.rxString.truncate(n, t)
    }
});
radix.filter("rxOrdinal", function () {
    return function (n) {
        if (isNaN(n) || n < 1) return n;
        var t = n % 10,
            i = n % 100;
        return 11 <= i && i <= 13 ? n + "th" : t === 1 ? n + "st" : t === 2 ? n + "nd" : t === 3 ? n + "rd" : t > 3 ? n + "th" : void 0
    }
});
radix.filter("rxCurrency", function () {
    return function (n, t, i) {
        if (isNaN(n)) return n;
        var t = t || "$",
            i = i === undefined ? !0 : i;
        return i === !0 ? t + n : n + t
    }
});
radix.filter("rxPercent", ["$window", function (n) {
    return function (t, i, r) {
        var u = angular.isString(t) ? Number(t) : t;
        return (i = i || 100, r = r || !1, !angular.isNumber(u) || isNaN(u)) ? t : r ? n.Math.round(u * i / 100) : u * i / 100
    }
}]);
radix.filter("rxEncode", ["rxEncode", function (n) {
    return function (t) {
        return angular.isString(t) ? n.encode(t) : t
    }
}]);
radix.filter("rxDecode", ["rxEncode", function (n) {
    return function (t) {
        return angular.isString(t) ? n.decode(t) : t
    }
}]);
radix.filter("rxUnique", ["rxJson", function (n) {
    return function (t, i) {
        var u, r, f;
        if (angular.isUndefined(t) || i < 1) return t;
        if (t.length) {
            if (angular.isObject(t)) {
                if (u = [], angular.isObject(t[0]))
                    for (r = 0; r < t.length; r++) f = n.find(u, t[r]), f.length <= 0 && u.push(t[r]);
                else
                    for (r = 0; r < t.length; r++) u.indexOf(t[r]) == -1 && u.push(t[r]);
                return u
            }
            return t
        }
        return t
    }
}]);
radix.filter("rxremoveColumn", ["rxJson", function (n) {
    return function (t, i) {
        return !angular.isArray(t) || angular.isUndefined(t) ? t : (angular.forEach(t, function (r, u) {
            t[u] = n.removeColumn(r, i)
        }), t)
    }
}]);
radix.filter("rxEvery", ["$parse", function (n) {
    return function (t, i) {
        return (t = angular.isObject(t) ? toArray(t) : t, !angular.isArray(t) || angular.isUndefined(i)) ? !0 : t.every(function (t) {
            return angular.isObject(t) || angular.isFunction(i) ? n(i)(t) : t === i
        })
    }
}]);
radix.filter("rxSome", ["$parse", function (n) {
    return function (t, i) {
        return (t = angular.isObject(t) ? toArray(t) : t, !angular.isArray(t) || angular.isUndefined(i)) ? !0 : t.some(function (t) {
            return angular.isObject(t) || angular.isFunction(i) ? n(i)(t) : t === i
        })
    }
}]);
radix.filter("rxNullOrEmpty", function () {
    return function (n) {
        return n == null || n == "" ? !0 : !1
    }
});
radix.filter("rxStartsWith", function () {
    return function (n, t, i) {
        var r = i || !1;
        return !angular.isString(n) || angular.isUndefined(t) ? n : (n = r ? n : n.toLowerCase(), !n.indexOf(r ? t : t.toLowerCase()))
    }
});
radix.filter("rxEndsWith", function () {
    return function (n, t, i) {
        var r = i || !1,
            u;
        return !angular.isString(n) || angular.isUndefined(t) ? n : (n = r ? n : n.toLowerCase(), u = n.length - t.length, n.indexOf(r ? t : t.toLowerCase(), u) !== -1)
    }
});
radix.filter("rxContains", function () {
    return function (n, t) {
        return rx.rxString.contains(n, t)
    }
});
radix.directive("rxSwitchbox", ["$parse", function (n) {
    return {
        require: "ngModel",
        link: function (t, i, r) {
            var f = n(r.ngModel),
                u = !1;
            $(i).bootstrapSwitch();
            $(i).on("switchChange.bootstrapSwitch", function (n, i) {
                t.$apply(function () {
                    u = !0;
                    f.assign(t, i);
                    angular.isUndefined(r.changeEvent) || (t.changeValue = i, t.$eval(r.changeEvent + "(changeValue)"))
                })
            });
            t.$watch(r.ngModel, function (n) {
                angular.isUndefined(n) || u || (n ? $(i).bootstrapSwitch("state", !0) : $(i).bootstrapSwitch("state", !1))
            })
        }
    }
}]);
radix.filter("rxLocalisation", function () {
    return function (n, t) {
        if (!angular.isUndefined(n) && n != null && rx.appConfiguration.userPreference.userTimezone != null && rx.appConfiguration.userPreference != null) return angular.isUndefined(t) && (t = rx.appConfiguration.rxDateConfig.format.displayFormat), moment.utc(n).tz(rx.appConfiguration.userPreference.userTimezone).format(t)
    }
});
radix.filter("rxDateTimeFormatter", function () {
    return function (n, t, i) {
        if (!angular.isUndefined(n) && n != null) return (angular.isUndefined(t) || t == "") && (t = rx.appConfiguration.rxDateConfig.format.displayFormat), (angular.isUndefined(i) || i == "") && (i = rx.appConfiguration.userPreference.userDateFormat + " " + rx.appConfiguration.userPreference.userTimeFormat), moment(n, i).format(t)
    }
});
radix.filter("rxGroupArray", function () {
    return function (n, t, i, r) {
        var f;
        if (angular.isUndefined(n) || n == null || angular.isUndefined(t) || t == null || angular.isUndefined(i) || i == null) return n;
        var e = [],
            o = [],
            s = {},
            u = rx.linq(n).where("t => t." + t + " == 0").toList();
        for (r != undefined && (u = rx.json.sortBy(u, r)), f = 0; f < u.length; f++) s[t] = u[f][i], o = rx.json.find(n, s), r != undefined && (o = rx.json.sortBy(o, r)), e.push(u[f]), e = e.concat(o);
        return e
    }
});
radix.filter("rxGroupPaging", function () {
    return function (n, t, i, r, u, f) {
        var e, l;
        if (!angular.isUndefined(n) && n != null && !angular.isUndefined(t) && t != null && !angular.isUndefined(i) && i != null) {
            var o = [],
                s = [],
                w = rx.linq(n).where("t => t." + t + " == 0").toList(),
                s = rx.linq(n).where("t => t." + t + " > 0").toList(),
                p = u * r,
                b = r,
                r = r * (u + 1),
                h = [];
            s = f != undefined ? rx.json.sortBy(s, f) : rx.json.sortBy(s, t);
            var a = s.slice(p, r),
                c = rx.json.uniqueByProperty(a, t),
                v = {},
                y = {};
            for (e = 0; e < c.length; e++) y[i] = c[e][t], l = rx.json.find(n, y)[0], l != undefined && (v[t] = c[e][t], h = rx.json.find(a, v), h.length > 0 && (o.push(l), o = o.concat(h)))
        }
        return o
    }
});
radix.directive("rxIndeterminate", function () {
    return {
        restrict: "A",
        link: function (n, t, i) {
            n.$watch(i.rxIndeterminate, function (n) {
                t.prop("indeterminate", n)
            })
        }
    }
});
radix.filter("rxOrderBy", ["$filter", function (n) {
    return function (t, i, r, u, f) {
        if (!angular.isUndefined(u) && u) (t.sortProcessDone != r || t.lastSortColumnName != i) && (r ? t.sort(function (n, t) {
            return n[i] == null || n[i] == "" ? 1 : t[i] == null || t[i] == "" ? -1 : moment(t[i], f).diff(moment(n[i], f))
        }) : t.sort(function (n, t) {
            return n[i] == null || n[i] == "" ? 1 : t[i] == null || t[i] == "" ? -1 : moment(n[i], f).diff(moment(t[i], f))
        })), t.lastSortColumnName = i, t.sortProcessDone = r;
        else {
            var e = n("orderBy");
            t = e(t, i, r)
        }
        return t
    }
}]);
radix.directive("rxBind", function () {
    return {
        restrict: "A",
        link: function (n, t, i) {
            n.$watch(i.rxBind, function (n) {
                !angular.isUndefined(n) && n && (typeof n == "string" && (n = n.replace(/\s/g, "&nbsp;")), $(t).html(n))
            })
        }
    }
});
radix.filter("highlight", ["$sce", function (n) {
    return function (t, i) {
        return i && typeof t == "string" && (t = t.replace(new RegExp("(" + i + ")", "gi"), '<span class="highlighted">$1<\/span>')), n.trustAsHtml(t)
    }
}])