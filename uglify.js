! function(e, t) {
    function n(e) {
        setTimeout(e, 0)
    }

    function o(e) {
        for (var t = e.toString(16); t.length < 4;) t = "0" + t;
        return t
    }

    function i(e) {
        return unescape(encodeURIComponent(e))
    }

    function r(e) {
        return decodeURIComponent(escape(e))
    }

    function s(e) {
        return "ArrayBuffer" == e.constructor.name && (e = new Uint8Array(e)), r(String.fromCharCode.apply(null, e))
    }

    function c(e, t, n) {
        e = i(e);
        var o = e.length;
        n && o++, t || (t = new ArrayBuffer(o));
        var r = new Uint8Array(t);
        n && (r[e.length] = 0);
        for (var s = 0, c = e.length; s < c; s++) r[s] = e.charCodeAt(s);
        return t
    }

    function a(e, t, n) {
        "Object" == t.constructor.name && (t = JSON.stringify(t)), u(e, t + "\n", n)
    }

    function d(e, t) {
        function n() {
            e.read(function(i) {
                for (var r = 0; r < i.byteLength; r++)
                    if (i[r] == we) {
                        var c = i.subarray(0, r);
                        o.push(c);
                        var a = "";
                        for (var d in o) d = o[d], a += s(d);
                        var l = i.subarray(r + 1);
                        return e.unshift(l), void t(a)
                    } o.push(i), n()
            })
        }
        var o = [];
        n()
    }

    function l(e, t) {
        function n(t) {
            o += s(t), e.read(n)
        }
        var o = "";
        e.onClose = function() {
            t(o)
        }, e.read(n)
    }

    function u(e, t, n) {
        "Object" == t.constructor.name && (t = JSON.stringify(t)), e.write(c(t), n)
    }

    function h(e, t) {
        var n = new Uint8Array(e.byteLength + t.byteLength);
        return n.set(e, 0), n.set(t, e.byteLength), n
    }

    function f(e) {
        for (var t = window.atob(e), n = t.length, o = new Uint8Array(n), i = 0; i < n; i++) {
            var r = t.charCodeAt(i);
            o[i] = r
        }
        return o.buffer
    }

    function p(e) {
        var t, n, o = "";
        for (t = 0; t + 3 <= e.length; t += 3) n = parseInt(e.substring(t, t + 3), 16), o += be.charAt(n >> 6) + be.charAt(63 & n);
        for (t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16), o += be.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16), o += be.charAt(n >> 2) + be.charAt((3 & n) << 4));
            (3 & o.length) > 0;) o += ke;
        return o
    }

    function v(e, t) {
        t || (t = window.location);
        for (var n = t.search.substring(1), o = n.split("&"), i = 0; i < o.length; i++) {
            var r = o[i].split("=");
            if (decodeURIComponent(r[0]) == e) return decodeURIComponent(r[1])
        }
    }

    function g(e, t, n, o) {
        return e || (e = {
            items: []
        }), e.items.push(t), e.timeout || (e.timeout = setTimeout(function() {
            delete e.timeout, o(e.items), e.items = []
        }, n)), e
    }

    function m(e, t) {
        if (console.log("notification:", e), window.chrome && window.chrome.notifications) {
            var n = chrome.runtime.getManifest(),
                o = n.name;
            t = t || n.icons[128], chrome.notifications.create({
                type: "basic",
                iconUrl: t,
                title: o,
                message: e
            })
        }
    }

    function y() {}

    function w(e, t) {
        return window.chrome && window.chrome.identity ? void chrome.identity.getAuthToken({
            interactive: e,
            scopes: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/chromewebstore.readonly"]
        }, function(e) {
            e || console.error("unable to get authToken", chrome.runtime.lastError), t(e)
        }) : (console.error("no auth token implemented"), void process.nextTick(t))
    }

    function b(e) {
        e && (this.dataReceived(e), this.dataReceived(null))
    }

    function k(e, t) {
        this.promise = fetch(e).then(function(e) {
            this.connected = !0, this.response = e, this.reader = this.response.body.getReader(), this.reader.closed.then(function() {
                this.onClose && this.dataReceived(null)
            }.bind(this)), this.onResume(), t(this)
        }.bind(this), function(e) {
            t(null, e)
        })
    }

    function C(e, t, n, o, i) {
        o = f(o), n = c(n), window.crypto.subtle.importKey("jwk", {
            kty: "RSA",
            e: e,
            n: t,
            alg: "RS1"
        }, {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
                name: "SHA-1"
            }
        }, !0, ["verify"]).then(function(e) {
            window.crypto.subtle.verify({
                name: "RSASSA-PKCS1-v1_5",
                hash: {
                    name: "SHA-1"
                }
            }, e, o, n).then(function(e) {
                return e ? void i() : void i("invalid signature")
            }).catch(function(e) {
                i("failure to verify", e)
            })
        }).catch(function(e) {
            i("key import failed", e)
        })
    }

    function S() {}

    function A(e, t, n) {
        this.adbSocketFactory = e, this.conn = n, this.conn.openSocket = this.openSocket.bind(this);
        var o = t.properties.substring(t.properties.indexOf("product")).replace(/ /g, ";").replace("device", "ro.product.device").replace("model", "ro.product.model").replace("product", "ro.product.name").replace(/:/g, "=");
        this.properties = "device::" + o + ";"
    }

    function D(e) {
        chrome.storage.local.get("whitelist", function(t) {
            var n = {};
            return t.whitelist && "Array" == t.whitelist.constructor.name ? ($.each(t.whitelist, function(e, t) {
                n[t] = !0
            }), void e(n)) : void e(n)
        })
    }

    function I(e, t) {
        chrome.storage.local.set({
            whitelist: Object.keys(e)
        }, t)
    }

    function L(e, t) {
        D(function(n) {
            n[e] = !0, I(n, t)
        })
    }

    function O(e, t) {
        chrome.storage.local.get(["whitelist", "serverMode"], function(n) {
            if (1 == n.serverMode) return void t(!0);
            if (2 != n.serverMode) {
                return n.whitelist && "Array" == n.whitelist.constructor.name ? void t(n.whitelist.indexOf(e) != -1, !0) : void t(!1, !0)
            }
            w(!1, function(n) {
                return n ? void $.ajax({
                    type: "get",
                    url: "https://billing.vysor.io/whitelist",
                    headers: {
                        Authorization: "Bearer " + n
                    },
                    data: {
                        email: e
                    },
                    error: function() {
                        console.error("failure checking vysor enterprise whitelist", arguments), t(!1)
                    },
                    success: function(n) {
                        n.whitelist || console.error("access denied to", e, n), t(n.whitelist, !1)
                    }
                }) : (console.error("unable to get token for vysor enterprise whitelist check"), void t(!1))
            })
        })
    }

    function R(e) {
        return e ? (e.friendlyName && !e.friendlyName.length && delete e.friendlyName, e) : null
    }

    function E(e) {
        window.chrome && window.chrome.storage ? chrome.storage.local.get("device-settings", function(t) {
            e(t["device-settings"] || {})
        }) : e({})
    }

    function U(e) {
        e.contentWindow._lm = {
            _il: We.a(),
            _ilc: We.c(),
            _cl: We.b.bind(We),
            _md: We.getManageData(),
            refresh: We.refresh.bind(We),
            startPurchase: We.startPurchase.bind(We)
        }, e.contentWindow._rl && e.contentWindow._rl()
    }

    function T(e, t) {
        if (De) {
            var n = De.contentWindow.shortModal;
            n && n(e, t)
        }
    }

    function W() {
        T(null, Pe)
    }

    function P() {
        De && De.contentWindow.updateVysorShareServer && De.contentWindow.updateVysorShareServer(Ae)
    }

    function M(e, t) {
        var n = K(e);
        console.log(e, n, "status", t);
        var o = chrome.app.window.get(n);
        o && o.contentWindow.updateWindowStatusText && o.contentWindow.updateWindowStatusText(t)
    }

    function N(e, t) {
        M(e, "Installing Vysor APK..."), AdbUtils.installApk("/Vysor-release.apk", e, t)
    }

    function _(e, t, n) {
        function o(o) {
            var i = Math.round(Math.random() * (1 << 30)).toString(16),
                r = "echo -n " + i + " > /data/local/tmp/vysor.pwd ; chmod 600 /data/local/tmp/vysor.pwd";
            AdbUtils.runMain(e, o, "com.koushikdutta.vysor.Main password=" + i + " keyboard=" + Se, function(o) {
                Adb.shell({
                    serialno: e,
                    command: 'sh -c "' + r + '"'
                }, function(e) {
                    Socket.eat(o), n(t, i)
                })
            }, function(e, t) {
                e.command = "shell:" + e.command, Adb.sendClientCommand(e, t)
            })
        }

        function i(t) {
            M(e, "Connecting..."), AdbUtils.getApkPath(e, "com.koushikdutta.vysor", function(n) {
                return n ? void AdbUtils.runMain(e, n, "com.koushikdutta.vysor.ProtocolVersionMain", function(e) {
                    var o = e.match(/vysor-io-.*?[\r\n]/);
                    return o && o.length ? (e = o[0], e && (e = e.trim()), console.log("protocol version: " + e), void t("vysor-io-52" != e ? null : n)) : void t(null)
                }) : void t()
            })
        }
        M(e, "Connecting..."), i(function(t) {
            return t ? void o(t) : (console.log("uninstalling old apk if exists"), void Adb.shell({
                command: "pm uninstall com.koushikdutta.vysor",
                serialno: e
            }, function(t) {
                console.log("uninstall result", t), console.log("installing apk"), N(e, function(t) {
                    i(function(n) {
                        return n ? void o(n) : (t || (t = ""), m("Error installing APK:\n" + t.trim()), void x(e))
                    })
                })
            }))
        })
    }

    function x(e) {
        var t = K(e),
            n = chrome.app.window.get(t);
        n && n.close()
    }

    function B(e, t) {
        return void _(e, null, t)
    }

    function F(e, t, n, o) {
        isElectron() ? (console.log("adb client socket factory path"), e.contentWindow.adbSocketFactory = null, e.contentWindow.adbSocketFactoryFactory = {
            type: "adb-client",
            arguments: {
                serialno: t
            }
        }) : Le[t] ? (console.log("vysor socket fast path"), e.contentWindow.adbSocketFactory = Le[t]) : Ie.isRunning() ? (console.log("adb server socket path"), e.contentWindow.adbSocketFactory = Ie.adbDevices[t]) : (console.log("adb client socket path"), e.contentWindow.adbSocketFactory = Adb.createSocketFactory(t)), U(e), e.contentWindow.openList = G, e.contentWindow.password = o, e.contentWindow.port = n, Me && Me.socket && (e.contentWindow.httpPort = Me.socket.localPort), e.contentWindow.device = Le[t] || $e[t], e.contentWindow.tracker = Ue
    }

    function V() {
        setTimeout(function() {
            chrome.app.window.getAll().length || chrome.runtime.reload()
        }, 5e3)
    }

    function K(e) {
        var t = e;
        return Le[e] && Le[e].id ? t = Le[e].id : $e[e] && $e[e].id ? t = $e[e].id : Je[e] && (t = Je[e]), t
    }

    function j(e, t, n) {
        ee();
        var o = K(e),
            i = chrome.app.window.get(o);
        return i ? (i.show(), t && B(e, function(t, n) {
            F(i, e, t, n), i.contentWindow.connectionReady()
        }), void(n && n(i))) : void chrome.app.window.create("screen.html", {
            id: o,
            innerBounds: {
                width: 576,
                height: 1024
            }
        }, function(t) {
            var o;
            t.onClosed.addListener(o = function() {
                t.onClosed.removeListener(o), V(), t.contentWindow.h264Socket && (console.log("cleaning up h264 socket"), t.contentWindow.h264Socket.destroy(), t.contentWindow.h264Socket = null), t.contentWindow.inputWebSocket && (console.log("cleaning up input websocket"), t.contentWindow.inputWebSocket.close(), t.contentWindow.inputWebSocket = null)
            }), F(t, e, null, null), t.contentWindow.onload = function() {
                return n && n(t), $e[e] ? void B(e, function(n, o) {
                    F(t, e, n, o), t.contentWindow.connectionReady()
                }) : void console.log("Vysor requested for", e, "which is not available yet")
            }
        })
    }

    function q() {
        Ae = null, _e && _e.stopListen("share"), P()
    }

    function H(e) {
        var t = Re[e];
        t && t.gcmConn.destroy()
    }

    function Y(e, t, n) {
        var o = Re[e];
        if (o && o.devices[t]) {
            o.gcmConn.gcmConns[t] && o.gcmConn.gcmConns[t].destroy();
            var i, r = o.gcmConn.gcmConns[t] = {
                id: t,
                farm: !0,
                newSocket: function(e, n) {
                    i || o.gcmConn.newSocket(t + ":" + e, n)
                },
                destroy: function() {
                    i = !0, o.gcmConn.gcmConns[t] == r && delete o.gcmConn.gcmConns[t], delete $e[r.serialno], o.gcmConn.newSocket("close:" + t, function(e) {
                        e && e.destroy()
                    });
                    var e = r.onClose;
                    e && (delete r.onClose, e()), ue()
                }
            };
            Q(t, function(e) {
                e(r)
            }, n), ue()
        }
    }

    function J(e, t, n) {
        function o(e) {
            n && n(null, e)
        }

        function i(e) {
            return _e ? void _e.connect({
                senderId: "64148182473",
                registrationId: e.registration,
                port: "share"
            }, function(i) {
                function s() {
                    i.newSocket("devices:", function(e) {
                        l(e, function(e) {
                            var t = JSON.parse(e),
                                n = t.devices,
                                o = t.sharedDevices;
                            h.devices ? ($.each(Object.keys(n), function(e, t) {
                                delete h.devices[t]
                            }), $.each(Object.keys(h.devices), function(e, t) {
                                var n = i.gcmConns[t];
                                n && n.destroy()
                            }), h.devices = n) : h.devices = n, h.sharedDevices = o, ue()
                        })
                    })
                }
                Ue.sendEvent("connected-device-farm");
                var c, u = Re[r];
                u && u.gcmConn.destroy();
                var h = Re[r] = {
                    info: e,
                    gcmConn: i
                };
                i.gcmConns = {}, i.openSocket = function(e, r) {
                    function l() {
                        c.read(function() {
                            s(), l()
                        })
                    }
                    if (e.startsWith("challenge:")) {
                        console.log("received challenge", e);
                        var u = e.split(":")[1];
                        $.ajax({
                            type: "post",
                            url: "https://billing.vysor.io/verifyauth",
                            headers: {
                                Authorization: "Bearer " + t
                            },
                            data: {
                                nonce: u
                            },
                            dataType: "json",
                            success: function(e) {
                                Ne = JSON.parse(e.signed_data), console.log("sending challenge response", e), a(r, e, function() {
                                    d(r, function(e) {
                                        return r.destroy(), "ok" == e ? (s(), void(n && n(h.info))) : void o("Access denied: " + e)
                                    })
                                })
                            },
                            error: function(e, t) {
                                o("Unable to verify identity."), r.destroy()
                            }
                        })
                    } else if (e.startsWith("close:")) {
                        r.destroy();
                        var f = e.split(":")[1],
                            p = i.gcmConns[f];
                        if (!p) return void console.log("can't close unknown subconn");
                        p.destroy()
                    } else e.startsWith("tracker:") ? (console.log("got tracker socket"), c = r, l()) : (console.log("got unknown socket request", e), r.destroy())
                }, i.onClose = function() {
                    Re[r] == h && delete Re[r], $.each(Object.keys(i.gcmConns), function(e, t) {
                        var n = i.gcmConns[t];
                        n && n.destroy()
                    }), ue()
                }, console.log("Connection to device farm established", i)
            }) : void o(Pe)
        }
        e = new URL(e);
        var r = e.hash.replace("#", "");
        $.ajax({
            url: "https://billing.vysor.io/gcm/" + r,
            dataType: "json",
            success: i,
            error: function(e, t) {
                m("Unable to find server: " + t)
            }
        })
    }

    function X(e, t) {
        function n(e) {
            ue(), t ? t(null, e) : m(e)
        }

        function o() {
            ue(), t && t(Ae)
        }
        q(), w(e, function(e) {
            function t() {
                console.log("registering vysor share server"), $.ajax({
                    type: "post",
                    url: "https://billing.vysor.io/gcm",
                    headers: {
                        Authorization: "Bearer " + e
                    },
                    data: {
                        registration: _e.registrationId
                    },
                    dataType: "json",
                    success: function(e) {
                        console.log("vysor share server", e), chrome.storage.local.set({
                            lastDeviceFarmRegistrationId: _e.registrationId,
                            lastDeviceFarmServerId: e.id
                        }), Ae = "https://vysor.clockworkmod.com/server#" + e.id, o(Ae)
                    }.bind(this),
                    error: function(e, t) {
                        q(), n("Unable to register server: " + t)
                    }
                })
            }

            function i() {
                r = g(r, null, 500, function() {
                    $.each(l, function(e, t) {
                        t.trackerSocket && t.trackerSocket.write(c("0000\n"), function() {})
                    }), ue()
                })
            }
            if (!e) return void n("Unable to get Auth Token.");
            if (!_e) return void n(Pe);
            _e.onRegistrationIdChanged = t, chrome.storage.local.get(["lastDeviceFarmRegistrationId", "lastDeviceFarmServerId"], function(e) {
                return e && e.lastDeviceFarmRegistrationId == _e.registrationId && e.lastDeviceFarmServerId ? (console.log("device farm registration unchanged, not registering with server."), Ae = "https://vysor.clockworkmod.com/server#" + e.lastDeviceFarmServerId, void o(Ae)) : void t()
            });
            var r, s, l = [];
            _e.listen("share", function(e) {
                var t, n, o, r = {},
                    c = Math.round(Math.random() * (1 << 30)).toString(16) + Math.round(Math.random() * (1 << 30)).toString(16);
                e.onClose = function() {
                    var t = l.indexOf(e);
                    t != -1 && l.splice(t, 1), e.trackerSocket && (e.trackerSocket.destroy(), delete e.trackerSocket), $.each(Object.keys(r), function(e, t) {
                        var n = r[t];
                        n.destroy()
                    })
                }, e.newSocket("challenge:" + c, function(i) {
                    return i ? void d(i, function(r) {
                        function s(e) {
                            e = e || "fail", console.log("Remote user failed to authorize", e), a(i, e, function() {
                                i.destroy()
                            })
                        }
                        console.log("received challenge response", r);
                        var d = JSON.parse(r);
                        C("AQAB", "hDuGsIhbjLYXteQX3F3KNriQHwUSZurS5voCkdpA1733A65pqtGOrk9g_yLiF94_vSK0VmL-4stq7WAYEbn6nw", d.signed_data, d.signature, function(r) {
                            function u() {
                                function r() {
                                    l.push(e), t = !0, a(i, "ok", function() {
                                        i.destroy()
                                    }), m("Vysor is sharing Android devices with " + n.name, o), Adb.sendHostCommand("host:track-devices", function(t) {
                                        return t ? void e.newSocket("tracker:", function(n) {
                                            return n ? (e.trackerSocket = n, void Socket.stream(n, t)) : (t.destroy(), void console.error("unable to open remote tracker"))
                                        }) : void console.error("unable to track adb devices", chrome.runtime.lastError)
                                    })
                                }
                                O(n.email, function(e, t) {
                                    if (e) return void r();
                                    if (!t) return void s("Denied by policy.");
                                    var i = chrome.runtime.getManifest().name;
                                    chrome.notifications.create({
                                        type: "basic",
                                        iconUrl: o,
                                        title: i,
                                        message: n.name + " is requesting access to Vysor shared Android devices.",
                                        buttons: [{
                                            title: "Allow"
                                        }, {
                                            title: "Deny"
                                        }]
                                    }, function(e) {
                                        var t, o = function(n) {
                                                n == e && (chrome.notifications.onClosed.removeListener(o), chrome.notifications.onButtonClicked.removeListener(i), t || s("Denied by user."))
                                            },
                                            i = function(o, i) {
                                                o == e && (chrome.notifications.clear(o), t = !0, 0 == i ? (L(n.email, function() {
                                                    P()
                                                }), r()) : s("Denied by user."))
                                            };
                                        chrome.notifications.onClosed.addListener(o), chrome.notifications.onButtonClicked.addListener(i)
                                    })
                                })
                            }
                            return r ? void s("Identify signature verification failed.") : (n = JSON.parse(d.signed_data), n.nonce != c ? void s("Mismatched nonce in authentication.") : void(n.picture ? Ce(n.picture, function(e) {
                                o = e, u()
                            }) : (o = "/icon.png", u())))
                        })
                    }) : (console.error("challenge socket failed"), void e.destroy())
                }), e.openSocket = function(o, c) {
                    if (!t) return void c.destroy();
                    if ("devices:" == o) s = g(s, c, 500, function(e) {
                        E(function(t) {
                            Adb.devices(function(n) {
                                n || (n = {}), $.each(Object.keys(n), function(e, o) {
                                    Le[o] && delete n[o], R(t[o]), t[o] && t[o].friendlyName && (n[o].name = t[o].friendlyName)
                                });
                                var o = {};
                                $.each(Object.keys(Oe), function(e, t) {
                                    o[t] = {
                                        userInfo: Oe[t].userInfo
                                    }
                                }), $(e).each(function(e, t) {
                                    u(t, {
                                        devices: n,
                                        sharedDevices: o
                                    }, function() {
                                        t.destroy()
                                    })
                                })
                            })
                        })
                    });
                    else if (o.startsWith("close:")) {
                        c.destroy();
                        var a = o.split(":")[1],
                            d = r[a];
                        d && d.destroy()
                    } else {
                        var l = o.indexOf(":");
                        if (l == -1) return console.error("unexpected command received by device farm server"), void c.destroy();
                        var a = o.substring(0, l);
                        if (!$e[a]) {
                            if (l = o.indexOf(":", l + 1), l == -1) return void c.destroy();
                            if (a = o.substring(0, l), !$e[a]) return void console.error("request for unknown device", a)
                        }
                        var d = r[a];
                        if (!d) {
                            var h = Adb.createSocketFactory(a);
                            d = r[a] = new A(h, $e[a], {}), d.destroy = function() {
                                try {
                                    e.newSocket("close:" + a, function(e) {
                                        e && e.destroy()
                                    })
                                } catch (e) {}
                                var t = Oe[a];
                                t && (t.userInfo == n && delete t.userInfo, t.gcmConn == this && delete t.gcmConn, t.key || t.gcmConn || delete Oe[a]);
                                var o = this.onClose;
                                o && (delete this.onClose, o()), i()
                            }.bind(d)
                        }
                        var f = Oe[a];
                        f || (f = Oe[a] = {}), f.gcmConn != d && (te(a), f.gcmConn = d, f.userInfo = n, Oe[a] = f), i();
                        var p = o.substring(l + 1);
                        d.openSocket(p, c)
                    }
                }
            })
        })
    }

    function z(e) {
        Se = e
    }

    function G() {
        return De ? void De.focus() : void chrome.app.window.create("list.html", {
            id: "list",
            innerBounds: {
                width: 768,
                height: 868,
                minWidth: 768,
                minHeight: 868
            }
        }, function(e) {
            De = e, De.contentWindow.openList = G, U(De), De.contentWindow.disconnectSharedDevice = ae, De.contentWindow.toggleShare = de, De.contentWindow.unshareDevice = ne, De.contentWindow.quietSerial = ce, De.contentWindow.openWindow = j, De.contentWindow.closeWindow = x, De.contentWindow.createDeviceFarmConnection = Y, De.contentWindow.destroyDeviceFarmConnection = H, De.contentWindow.adbServer = Ie, De.contentWindow.tracker = Ue, De.contentWindow.startWireless = le, De.contentWindow.startDeviceFarm = X, De.contentWindow.stopDeviceFarm = q, De.contentWindow.updateKeyboard = z, De.contentWindow.onload = function() {
                U(De), P(), ue()
            }, De.onClosed.addListener(function() {
                De = null, V()
            })
        })
    }

    function Q(e, t, n) {
        Ie.start();
        var o = new Server;
        o.listen({
            port: 0,
            address: "127.0.0.1"
        }, function(e) {
            o.destroy();
            var i = new AdbDaemon(new AdbTcpTransport(e));
            t(function(e) {
                Ue.sendEvent("connected-shared-device");
                var t = "127.0.0.1:" + o.localPort;
                e.serialno = t, e.id || (e.id = t), Le[t] = e, console.log("connected gcm socket"), e.openSocket = function() {
                    console.log("got a new socket? this should not happen..."), e.destroy()
                }, i.onClose = e.onClose = function() {
                    delete Le[t], i.destroy(), e.destroy()
                }, e.onClose = function() {
                    delete Le[t], i.destroy(), e.destroy(), m("Disconnected from shared Android device.")
                }, i.openSocket = function(t, n) {
                    e.newSocket(t, function(e) {
                        Socket.stream(n, e, function() {})
                    })
                }, e.newSocket("properties", function(o) {
                    l(o, function(o) {
                        var r = AdbDevice.parseConnectionPayload(o);
                        e.name = e.name || r["ro.product.model"].replace("_", " "), i.start(o), console.log("got properties", o), n(t)
                    })
                })
            })
        }.bind(this), function(t) {
            if (t) return void console.log("adb daemon failed to listen: " + t);
            var n = "127.0.0.1:" + o.localPort;
            Le[n] = {
                id: e || n,
                destroy: function() {}
            }, console.log("mapping", n, e), ue(), Adb.sendHostCommand("host:connect:" + n, function(e, t) {
                e && (e.destroy(), t = s(t), console.log("adb connect result", t))
            })
        }.bind(this))
    }

    function Z(e, t) {
        if (m("Vysor is connecting to a remote Android device"), De && De.show(), console.log("attempting to connect to shared device", e), !_e) return void W();
        var n = new URL(e),
            o = v("senderId", n),
            i = v("registrationId", n),
            r = v("channel", n);
        o || (o = "64148182473"), Q(null, function(e) {
            _e.connect({
                senderId: o,
                registrationId: i,
                port: r
            }, e)
        }, t)
    }

    function ee() {
        chrome.runtime.requestUpdateCheck(function(e, t) {
            console.log("update check", arguments), "update_available" == e && ye()
        })
    }

    function te(e) {
        var t = Oe[e];
        if (t && t.gcmConn) {
            var n = t.gcmConn;
            delete t.gcmConn, n.destroy()
        }
    }

    function ne(e) {
        te(e), delete Oe[e], ue()
    }

    function oe(e, t) {
        function n(e) {
            t && t(null, e)
        }
        var o = $e[e];
        if (!_e) return void n(Pe);
        var i = Math.round(Math.random() * (1 << 30)).toString(16);
        Oe[e] || (Oe[e] = {}), Oe[e].key = i, ue();
        var r = "https://vysor.clockworkmod.com/redirect/?registrationId=" + encodeURIComponent(_e.registrationId) + "&channel=" + i;
        console.log(r), _e.listen(i, function(t) {
            Ue.sendEvent("shared-device");
            var n = Oe[e];
            if (!n || n.key != i) return t.destroy(), void console.log("device is no longer being shared.");
            n.gcmConn && n.gcmConn.destroy(), n.gcmConn = t, n.userInfo = {
                name: "Someone"
            }, ue(), console.log("accepted gcm socket");
            var r = Adb.createSocketFactory(e),
                s = new A(r, o, t);
            s.onOpenSocket = function(t, n) {
                if ("webstart" == t) return _(e, null, function(e, t) {
                    a(n, t, function() {
                        console.log("sent password", t), n.destroy()
                    })
                }), !0
            }
        });
        var s = "https://tu3ph.app.goo.gl/?ad=0&apn=com.koushikdutta.inkwire&link=" + encodeURIComponent(r);
        t(s)
    }

    function ie() {
        return xe ? xe : (console.log("creating persistent gcm connection"), xe = new Promise(function(e, t) {
            GcmRtcManager.start({
                3505780036: "AIzaSyDt0GimPRhk8_d_4XjOYzQUn50UkvXhMtE",
                64148182473: "AIzaSyDd7k1v017osyYbIC92fyf-36s3pv0z73U"
            }, {
                iceServers: [{
                    url: "turn:n0.clockworkmod.com",
                    username: "foo",
                    credential: "bar"
                }, {
                    url: "turn:n1.clockworkmod.com",
                    username: "foo",
                    credential: "bar"
                }]
            }, function(t) {
                return _e = t, console.log("persistent gcm connection created", null != t), _e ? (_e.defaultSenderId = "64148182473", void e(_e)) : (xe = null, void e())
            })
        }))
    }

    function re(e) {
        return function() {
            var t = arguments;
            ie().then(function() {
                e.apply(null, t)
            })
        }
    }

    function se(e) {
        var t = ze[e];
        clearTimeout(t), ze[e] = setTimeout(function() {
            delete ze[e]
        }, 1e4), delete Xe[e]
    }

    function ce(e) {
        var t = Xe[e];
        clearTimeout(t), Xe[e] = setTimeout(function() {
            delete Xe[e]
        }, 1e4), delete ze[e]
    }

    function ae(e) {
        x(e);
        var t = Le[e];
        t && t.destroy()
    }

    function de(e, t) {
        Oe[e] ? ne(e) : oe(e, t), ue()
    }

    function le(e) {
        var t = Adb.createSocketFactory(e);
        t.newSocket("shell:ifconfig wlan0", function(n) {
            return n ? void l(n, function(n) {
                function o(e, t) {
                    Adb.sendHostCommand("host:disconnect:" + a, function(n, o) {
                        n && n.destroy(), delete $e[a], Adb.sendHostCommand("host:connect:" + a, function(n, o) {
                            return n ? (n.destroy(), o = s(o), o.indexOf("unable to connect") != -1 ? (m("Unable to connect via wireless. Is your Android on the same network as your PC?"), void(t && t(o))) : (t && t(), chrome.storage.local.set({
                                lastConnectAddress: a
                            }), console.log("adb connect result", o), void(e && i()))) : (m("Unable to connect via wireless. Is your Android on the same network as your PC?"), void(t && t("host connect failed")))
                        })
                    })
                }

                function i() {
                    ue(), m("Vysor is connected wirelessly. You may disconnect your device."), Ue.sendEvent("go-wireless"), ce(a), j(a, !0, function(e) {
                        se(a), e.contentWindow.tryReconnect = function() {
                            se(a), o(!1)
                        }
                    })
                }
                console.log("ifconfig result", n);
                var r = n.match("inet addr:(.*?) ");
                if (r || (r = n.match("wlan0: ip (.*?) ")), !r) return void m("Unable to switch to wireless mode. Is your Android connected to Wifi?");
                var c = r[1],
                    a = c + ":5555";
                Ye[e] = a, Je[a] = e;
                var d = $e[a];
                return d && (d.id = e), Je[e] && (device.id = Je[e]), d && "device" == d.status ? void i() : (ce(e), void t.newSocket("tcpip:5555", function(e) {
                    return e ? void l(e, function(e) {
                        console.log("tcpip:5555 result", e), o(!0, function(e) {
                            e && (console.error("host:connect failed, trying again in a few seconds", e), setTimeout(function() {
                                o(!0, function(e) {
                                    e && console.err("host:connect failed again, giving up.", e)
                                })
                            }, 3e3))
                        })
                    }) : void m("Failure while switching to wireless mode.")
                }))
            }) : void console.log("error running tcpip:5555")
        })
    }

    function ue() {
        Fe || (Fe = n(function() {
            Fe = null, De && De.contentWindow.refreshList && De.contentWindow.refreshList($e, Le, Ne, Re, Oe, Je, Ye, _e && _e.isListening("share"), Be, Ie.isRunning(), Ke)
        }))
    }

    function he() {
        chrome.storage.local.get("connect-automatically", function(e) {
            var t;
            t = e["connect-automatically"] === !1 ? 2 : e["connect-automatically"] === !0 ? 0 : e["connect-automatically"] || 1, Adb.devices(function(e) {
                if (e) {
                    var n;
                    $.each(e, function(o, i) {
                        function r() {
                            return "unauthorized" != s.status || (m("Vysor has detected an Android device. Please Allow USB Debugging on your Android device to continue."), !1)
                        }
                        n = !0;
                        var s = e[o];
                        Je[o] && (s.id = Je[o]);
                        var c = $e[o];
                        if (!c || s.status != c.status) {
                            ne(o);
                            var a = s.properties.indexOf("emulator") != -1 || s.properties.indexOf("vbox") != -1,
                                d = K(o);
                            if (!a && Ve && !Xe[d]) {
                                if (chrome.app.window.get(d) || Ie.isRunning() || ze[d]) return void(r() && j(o, !0));
                                if (2 != t && r() && "device" == s.status) {
                                    var l = chrome.runtime.getManifest().name;
                                    return 1 != t ? (chrome.notifications.create("never-start-automatically", {
                                        type: "basic",
                                        iconUrl: "/icon.png",
                                        title: l,
                                        message: "Vysor has connected to an Android device and is starting.",
                                        buttons: [{
                                            title: "Never Start Automatically"
                                        }]
                                    }), void j(o, !0)) : void chrome.notifications.create("never-start-automatically-" + Math.random(), {
                                        type: "basic",
                                        iconUrl: "/icon.png",
                                        title: l,
                                        message: "Vysor has detected an Android device.",
                                        buttons: [{
                                            title: "View Android with Vysor"
                                        }, {
                                            title: "Never Start Automatically"
                                        }]
                                    }, function(e) {
                                        var t = function(o) {
                                                o == e && (chrome.notifications.onClosed.removeListener(t), chrome.notifications.onButtonClicked.removeListener(n))
                                            },
                                            n = function(t, n) {
                                                t == e && (chrome.notifications.clear(t), 0 == n ? j(o, !0) : chrome.storage.local.set({
                                                    "connect-automatically": !1
                                                }))
                                            };
                                        chrome.notifications.onClosed.addListener(t), chrome.notifications.onButtonClicked.addListener(n)
                                    })
                                }
                            }
                        }
                    }), $e = e
                } else $e = {};
                ue(), Ve = !0
            })
        })
    }

    function fe() {
        if (!Be) {
            if (isElectron()) {
                var e = require("os").platform(),
                    t = chrome.runtime.getAppDirectory(),
                    n = require("path").join(t, "native", e, "adb");
                return "win32" == e ? n += ".exe" : require("fs").chmodSync(n, "755"), console.log("attempting to start built in adb binary", n), void require("child_process").execFile(n, ["start-server"])
            }
            Ke || window.chrome && window.chrome.runtime && window.chrome.runtime.connectNative && (Ke = chrome.runtime.connectNative("com.clockworkmod.adb"), Ke.onDisconnect.addListener(function() {
                Ke = null
            }), Ke.postMessage({
                command: "start-server"
            }))
        }
    }

    function pe() {
        je || fe(), je = g(je, null, 1e4, fe)
    }

    function ve() {
        He = g(He, null, 300, function() {
            he()
        })
    }

    function ge() {
        function e(t) {
            t.read(function(n) {
                ve(), e(t)
            })
        }
        qe || (Adb.sendHostCommand("host:version", function(e, t) {
            e && (e.destroy(), t = s(t), console.log("ADB Server Version: ", t))
        }), Adb.sendHostCommand("host:track-devices", function(t) {
            return qe ? void t.destroy() : void(t && (console.log("Connected to ADB Server"), Ie.isRunning() ? console.log("Using Vysor ADB") : console.log("Using Android SDK ADB"), Be = !0, t.onClose = function() {
                qe = null, Be = !1, ve()
            }, qe = t, e(t), ve()))
        }))
    }

    function me() {
        ge(), pe(), setTimeout(me, 1e3)
    }

    function ye() {
        Ge = g(Ge, null, 1e4, function() {
            var e = chrome.runtime.getManifest().name;
            chrome.notifications.create("reload", {
                type: "basic",
                iconUrl: "/icon.png",
                title: e,
                message: "There is an update available for Vysor.",
                buttons: [{
                    title: "Reload"
                }]
            })
        })
    }
    var we = "\n".charCodeAt(0),
        be = ((new Date).getTime(), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
        ke = "=";
    String.prototype.startsWith || Object.defineProperty(String.prototype, "startsWith", {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: function(e, t) {
            return t = t || 0, this.lastIndexOf(e, t) === t
        }
    }), Object.fromArray = function(e) {
        var t = {};
        for (var n in e) {
            var o = e[n];
            t[o] = o
        }
        return t
    }, $.ajaxTransport("+binary", function(e, t, n) {
        if (window.FormData && (e.dataType && "binary" == e.dataType || e.data && (window.ArrayBuffer && e.data instanceof ArrayBuffer || window.Blob && e.data instanceof Blob))) return {
            send: function(t, n) {
                var o = new XMLHttpRequest,
                    i = e.url,
                    r = e.type,
                    s = e.async || !0,
                    c = e.responseType || "blob",
                    a = e.data || null,
                    d = e.username || null,
                    l = e.password || null;
                o.addEventListener("load", function() {
                    var t = {};
                    t[e.dataType] = o.response, n(o.status, o.statusText, t, o.getAllResponseHeaders())
                }), o.open(r, i, s, d, l);
                for (var u in t) o.setRequestHeader(u, t[u]);
                o.responseType = c, o.send(a)
            },
            abort: function() {
                n.abort()
            }
        }
    });
    var Ce = function() {
        var e = {};
        return function(t, n) {
            if (e[t]) return void n(e[t]);
            var o = new XMLHttpRequest;
            o.open("GET", t, !0), o.responseType = "blob", o.onload = function(o) {
                n(e[t] = window.URL.createObjectURL(this.response))
            }, o.send()
        }
    }();
    ! function() {
        function* e() {}
        var t = e();
        t.constructor.prototype.async = function() {
            function e() {
                i = o.throw(new Error(arguments)), n()
            }

            function t() {
                var e = arguments[0];
                i = o.next(e), n()
            }

            function n(n) {
                var r, s;
                if (!i.done) {
                    if (!i.value) return void(i = o.next(t));
                    if (i.value.constructor == Promise) return void i.value.then(t).catch(e);
                    if (i.value == Error) r = !0, i = o.next(e);
                    else {
                        if (i.value != y) throw new Error("Unexpected yield value for callback. Only Error and Success allowed.");
                        s = !0, i = o.next(t)
                    }
                    if (!i.value) throw new Error("Double yield callbacks must explicitly define both Error and Success");
                    if (i.value == Error && r) throw new Error("Error callback already defined");
                    if (i.value == y && s) throw new Error("Success callback already defined");
                    if (i.value != Error && i.value != y) throw new Error("Unexpected yield value for callback. Only Error and Success allowed.");
                    i = r ? o.next(t) : o.next(e)
                }
            }
            var o = this,
                i = o.next();
            i.done || n()
        }
    }(), window.isElectron = function() {
            return navigator.userAgent.indexOf("Electron") != -1
        }, isElectron() || (window.sharedGlobals = window),
        function() {
            function e(e) {
                try {
                    for (var t in e) e[t] && e[t].constructor != String && (e[t] = JSON.stringify(e[t]));
                    i += e.join(" ") + "\n"
                } catch (e) {}
            }

            function t(e) {
                return new Promise(function(t, n) {
                    return e.getConsoleLog ? void e.getConsoleLog(function(e) {
                        t({
                            content: e && e.length ? e : "log is empty"
                        })
                    }) : void t("getConsoleLog not found")
                })
            }
            var n = console.log,
                o = console.error,
                i = "";
            console.error = function() {
                o.apply(console, arguments), e(Array.prototype.slice.call(arguments))
            }, console.log = function() {
                n.apply(console, arguments), e(Array.prototype.slice.call(arguments))
            }, sharedGlobals.getConsoleLog = function(e) {
                e(i)
            }, window.gistConsoleLog = function(e, n) {
                chrome.runtime.getBackgroundPage(function(o) {
                    t(o).then(function(n) {
                        e["background.txt"] = n;
                        var o = chrome.app.window.getAll(),
                            i = o.map(function(n) {
                                return t(n.contentWindow).then(function(t) {
                                    e["window-" + n.id + ".txt"] = t
                                })
                            });
                        return Promise.all(i)
                    }).then(function() {
                        var t = {
                            description: chrome.runtime.getManifest().name + " console log",
                            public: !1,
                            files: e
                        };
                        fetch("https://vysor.io/gist", {
                            method: "POST",
                            body: JSON.stringify(t)
                        }).then(function(e) {
                            e.json().then(function(e) {
                                n(e.html_url)
                            })
                        })
                    })
                })
            }
        }(),
        function() {
            function e(e) {
                this.buffer = new ArrayBuffer(e), this.dataView = new DataView(this.buffer), this.uint8array = new Uint8Array(this.buffer), this.littleEndian = !1, this.position = 0, this.limit = e, this.capacity = e
            }

            function t(t, n) {
                var o = 8 * n,
                    i = t + o,
                    r = "get" + i,
                    s = "set" + i,
                    c = "put" + i;
                e.prototype[r] = function() {
                    if (this.position + n > this.limit) throw new Error("Not enough room in byte buffer");
                    var e = this.dataView[r](this.position, this.littleEndian);
                    return this.position += n, e
                }, e.prototype[c] = function(e) {
                    if (this.position + n > this.limit) throw new Error("Not enough room in byte buffer");
                    if (null == e || void 0 == e || NaN == e || e.constructor != Number) throw new Error("no value provided");
                    return this.dataView[s](this.position, e, this.littleEndian), this.position += n, this
                }
            }
            e.prototype.flip = function() {
                this.limit = this.position, this.position = 0
            }, e.prototype.asUint8Array = function() {
                return this.uint8array.subarray(this.position, this.limit)
            };
            var n = {
                Int: [1, 2, 4],
                Uint: [1, 2, 4],
                Float: [4, 8]
            };
            for (var o in n) {
                var i = n[o];
                for (var r in i) {
                    var r = i[r];
                    t(o, r)
                }
            }
            e.prototype.put = function(e) {
                if (e.constructor == Number) return this.putInt8(e);
                if (e.constructor == String && (e = c(e)), e.constructor == ArrayBuffer && (e = new Uint8Array(e)), this.position + e.byteLength > this.limit) throw new Error("Not enough room in byte buffer");
                return this.uint8array.set(e, this.position), this.position += e.byteLength, this
            }, e.prototype.putByte = e.prototype.putInt8, e.prototype.putShort = e.prototype.putInt16, e.prototype.putInt = e.prototype.putInt32, e.prototype.putFloat = e.prototype.putFloat32, e.prototype.putDouble = e.prototype.putFloat64, window.ByteBuffer = e
        }(), window.chrome && window.chrome.sockets && (chrome.sockets.tcp.onReceive.addListener(function(e) {
            var t = Socket.readers[e.socketId];
            null != t && t.dataReceived(new Uint8Array(e.data))
        }), chrome.sockets.tcp.onReceiveError.addListener(function(e) {
            var t = Socket.readers[e.socketId];
            null != t && (t.destroy(), t.dataReceived(null))
        }), chrome.sockets.tcpServer.onAccept.addListener(function(e) {
            chrome.sockets.tcp.setPaused(e.clientSocketId, !1);
            var t = Server.listeners[e.socketId];
            null != t && t(new Socket({
                socketId: e.clientSocketId
            }))
        })),
        function() {
            function e(t, n) {
                if (t.socketId) this.socketId = t.socketId, e.readers[this.socketId] = this;
                else if (window.chrome && window.chrome.sockets) chrome.sockets.tcp.create(function(o) {
                    this.socketId = o.socketId, chrome.sockets.tcp.connect(this.socketId, t.host, t.port, function(t) {
                        t ? (chrome.runtime.lastError, this.destroy(), n(null)) : (e.readers[o.socketId] = this, n(this))
                    }.bind(this))
                }.bind(this));
                else {
                    var o;
                    t.ns ? (this.ns = t.ns, o = !0) : (this.ns = new require("net").Socket(), this.ns.connect({
                        port: t.port,
                        host: t.host
                    }, function() {
                        o = !0, n(this)
                    }.bind(this))), this.ns.on("close", function() {
                        this.destroy(), o || n(null)
                    }.bind(this)), this.ns.on("data", function(e) {
                        this.dataReceived(e)
                    }.bind(this))
                }
            }

            function t() {}
            e.readers = {}, e.connect = function(t, n) {
                return new e(t, n)
            }, e.pump = function(e, t, n) {
                if (!e || !t) return console.error("Socket.pump called with null socket", e, t), void n();
                var o = function() {
                        e.read(i)
                    }.bind(e),
                    i = function(e) {
                        var n = e.buffer;
                        (e.byteOffset || e.length != n.byteLength) && (n = n.slice(e.byteOffset, e.byteOffset + e.length)), t.write(n, o)
                    }.bind(t);
                e.read(i), e.onClose = n
            }, e.stream = function(t, n, o) {
                e.pump(t, n, function() {
                    if (n && n.destroy(), o) {
                        var e = o;
                        o = null, e()
                    }
                }), e.pump(n, t, function() {
                    if (t && t.destroy(), o) {
                        var e = o;
                        o = null, e()
                    }
                })
            }, e.eat = function(e) {
                function t() {
                    e.read(t)
                }
                t()
            }, e.prototype.read = function() {
                if (this.pendingCallback) throw new Error("double callback");
                if (this.closed && !this.pending) {
                    var e = this.onClose;
                    return void(e && (delete this.onClose, e()))
                }
                var t = 0;
                "Number" == arguments[t].constructor.name ? this.pendingLength = arguments[t++] : this.pendingLength = 0;
                var e = arguments[t];
                if (!this.pending || this.paused) return void(this.pendingCallback = e);
                if (this.pendingLength) {
                    if (this.pendingLength > this.buffered()) return void(this.pendingCallback = e)
                } else this.pendingLength = this.buffered();
                for (var n, o = 0; o < this.pendingLength;) {
                    var i = this.pending.shift();
                    this.bufferedLength -= i.length,
                        this.pending.length || delete this.pending;
                    var r = i,
                        s = Math.min(r.byteLength, this.pendingLength - o);
                    if (s != r.byteLength) {
                        var c = r.subarray(0, s),
                            a = r.subarray(s);
                        this.unshift(a), r = c
                    }
                    n || r.byteLength == this.pendingLength || (n = new Uint8Array(this.pendingLength)), n ? n.set(r, o) : n = r, o += r.byteLength
                }
                e(n)
            }, e.prototype.write = function(e, t) {
                if (this.pendingWrite && console.error("write is already in progress!"), null == t && (console.error("write callback is null?"), t = function() {}), this.pendingWrite = t, window.chrome && window.chrome.sockets) chrome.sockets.tcp.send(this.socketId, e, function(n) {
                    return chrome.runtime.lastError, !n || n.resultCode ? void delete this.pendingWrite : void(n.bytesSent < e.byteLength ? this.write(e.slice(n.bytesSent), t) : (delete this.pendingWrite, t()))
                }.bind(this));
                else {
                    if (!this.ns) return;
                    if (!e.byteLength) return void require("process").nextTick(function() {
                        delete this.pendingWrite, t()
                    }.bind(this));
                    const n = window.Buffer || require("buffer").Buffer;
                    this.ns.write(n.from(e), function() {
                        delete this.pendingWrite, t()
                    }.bind(this))
                }
            }, e.prototype.destroy = function(e, t) {
                window.chrome && window.chrome.sockets ? chrome.sockets.tcp.close(this.socketId, function() {
                    chrome.runtime.lastError
                }) : (this.dataReceived(null), this.ns && (this.ns.destroy(), delete this.ns))
            }, e.prototype.unshift = function(e) {
                0 != e.byteLength && (this.pending ? this.pending.unshift(e) : this.pending = [e], this.bufferedLength || (this.bufferedLength = 0), this.bufferedLength += e.length)
            }, e.prototype.dataReceived = function(e) {
                if (e && (e.asUint8Array && (e = e.asUint8Array()), e.constructor == ArrayBuffer && (e = new Uint8Array(e))), e && e.length) {
                    var t = new Uint8Array(e);
                    this.pending ? this.pending.push(t) : this.pending = [t]
                }
                if (null == e ? this.closed = !0 : (this.bufferedLength || (this.bufferedLength = 0), this.bufferedLength += e.length), this.paused || !this.pending || !this.pending.length) {
                    var n = this.onClose;
                    return void(this.closed && n && (delete this.onClose, n()))
                }
                var o = this.pendingLength,
                    n = this.pendingCallback;
                n && (delete this.pendingCallback, this.read(o, n))
            }, e.prototype.buffered = function() {
                return this.bufferedLength
            }, e.prototype.pause = function() {
                this.paused || (this.paused = !0, this.onPause())
            }, e.prototype.resume = function() {
                this.paused && (this.paused = !1, this.onResume())
            }, e.prototype.onResume = function() {
                chrome.sockets.tcp.setPaused(this.socketId, !1, function() {})
            }, e.prototype.onPause = function() {
                chrome.sockets.tcp.setPaused(this.socketId, !0, function() {})
            }, t.listeners = {}, t.prototype.__proto__ = e.prototype, t.prototype.destroy = function() {
                window.chrome && window.chrome.sockets ? chrome.sockets.tcpServer.close(this.socketId, function() {
                    chrome.runtime.lastError
                }) : this.ns && (this.ns.close(), delete this.ns)
            }, t.prototype.listen = function(n, o, i) {
                var r, s;
                "Number" == n.constructor.name ? (r = n, s = "0.0.0.0") : (s = n.address, r = n.port), window.chrome && window.chrome.sockets ? chrome.sockets.tcpServer.create(function(e) {
                    this.socketId = e.socketId, t.listeners[this.socketId] = o, chrome.sockets.tcpServer.listen(e.socketId, s, r, function(e) {
                        return chrome.runtime.lastError, e ? (this.destroy(), void(i && i(e))) : void chrome.sockets.tcpServer.getInfo(this.socketId, function(t) {
                            this.localAddress = t.localAddress, this.localPort = t.localPort, i && i(e)
                        }.bind(this))
                    }.bind(this))
                }.bind(this)) : (this.ns = require("net").createServer(function(t) {
                    o(new e({
                        ns: t
                    }))
                }.bind(this)), this.ns.on("close", function() {
                    this.destroy()
                }.bind(this)), this.ns.on("error", function(e) {
                    i && i(e)
                }.bind(this)), this.ns.on("listening", function() {
                    var e = this.ns.address();
                    this.localAddress = e.address, this.localPort = e.port, i && i()
                }.bind(this)), this.ns.listen({
                    port: r,
                    host: s
                }))
            }, window.Socket = e, window.Server = t
        }(),
        function() {
            function e() {}

            function t(e) {
                this.request = e, this.statusLine = "HTTP/1.1 200 OK", this.headers = {
                    Date: (new Date).toUTCString()
                }
            }

            function n(e, n, o) {
                this.server = e, this.socket = n, this.headers = {}, this.parseRequest(function() {
                    o(this, new t(this))
                }.bind(this))
            }
            e.prototype.listen = function(e, t, n) {
                this.socket = new Server, this.requestCallback = t, this.socket.listen(e, this.onSocket.bind(this), n)
            }, e.prototype.onSocket = function(e) {
                new n(this, e, this.requestCallback)
            }, e.prototype.destroy = function() {
                this.socket.destroy()
            }, t.prototype.code = function(e) {
                this.statusLine = "HTTP/1.1 " + e + " " + HttpResponseCodes[e]
            }, t.prototype.write = function(e, t) {
                if (e.constructor.name == Object.prototype.constructor.name && (e = JSON.stringify(e)), e.constructor.name == String.prototype.constructor.name && (e = c(e)), !this.hasWritten) {
                    this.hasWritten = !0, this.headers["Content-Length"] || "close" == this.headers.Connection || (this.headers["Content-Length"] = e.byteLength);
                    var n = [this.statusLine];
                    for (var o in this.headers) n.push(o + ": " + this.headers[o]);
                    var i = n.join("\r\n") + "\r\n\r\n";
                    return void this.request.socket.write(c(i), function() {
                        this.write(e, t)
                    }.bind(this))
                }
                this.request.socket.write(e, t)
            }, t.prototype.end = function() {
                "close" == this.headers.Connection ? this.request.socket.destroy() : this.request.server.onSocket(this.request.socket), this.request.socket = null
            }, n.prototype.parseRequest = function(e) {
                var t = function() {
                    d(this.socket, function(n) {
                        if (n = n.trim(), !n.length) {
                            var o = this.headers["content-length"];
                            return o ? (o = Number.parseInt(o), void this.socket.read(o, function(t) {
                                this.body = t, "application/json" === this.headers["content-type"] && (this.body = JSON.parse(s(this.body))), e()
                            }.bind(this))) : void e()
                        }
                        if (this.statusLine) {
                            var i = n.split(":", 2);
                            2 == i.length && (this.headers[i[0].toLowerCase()] = i[1].trim())
                        } else {
                            this.statusLine = n;
                            var i = n.split(" ");
                            if (i.length > 2 && (i = i[1].split("?"), this.path = i[0], this.queries = {}, i.length > 1))
                                for (var r = this.query = i[1], c = r.split("&"), a = 0; a < c.length; a++) {
                                    var d, l = c[a].split("="),
                                        u = l[0];
                                    l.length > 1 && (d = l[1]), this.queries[u] = d
                                }
                        }
                        t()
                    }.bind(this))
                }.bind(this);
                t()
            }, window.HttpRequestParser = n, window.HttpServer = e, window.HttpResponseCodes = {
                200: "OK",
                202: "Accepted",
                206: "Partial Content",
                101: "Switching Protocols",
                301: "Moved Permanently",
                302: "Found",
                402: "Payment Required",
                404: "Not Found"
            }
        }(), b.prototype.write = function(e, t) {
            throw new Error("write not supported on dummy socket")
        }, b.prototype.destroy = function() {
            this.dataReceived(null)
        }, b.prototype.buffered = Socket.prototype.buffered, b.prototype.unshift = Socket.prototype.unshift, b.prototype.dataReceived = Socket.prototype.dataReceived, b.prototype.read = Socket.prototype.read, b.prototype.pause = Socket.prototype.pause, b.prototype.resume = Socket.prototype.resume, b.prototype.buffered = Socket.prototype.buffered, b.prototype.onPause = function() {}, b.prototype.onResume = function() {}, k.connect = function(e, t) {
            new k(e, t)
        }, k.prototype.write = function(e, t) {
            throw new Error("write not supported on fetch socket")
        }, k.prototype.destroy = function() {
            this.promise && this.promise.cancel && this.promise.cancel()
        }, k.prototype.unshift = Socket.prototype.unshift, k.prototype.dataReceived = Socket.prototype.dataReceived, k.prototype.read = Socket.prototype.read, k.prototype.pause = Socket.prototype.pause, k.prototype.resume = Socket.prototype.resume, k.prototype.buffered = Socket.prototype.buffered, k.prototype.onPause = function() {}, k.prototype.onResume = function() {
            this.reader.read().then(function(e) {
                e.value && (this.dataReceived(e.value), this.paused || this.onResume())
            }.bind(this))
        },
        function() {
            function e(e, t) {
                this.conn = e, this.dc = t, this.gotEof = !1, t.onmessage = function(e) {
                    var t = new Uint8Array(e.data),
                        n = 1 == t[t.byteLength - 1];
                    this.dataReceived(t.subarray(0, t.byteLength - 1)), n && (this.gotEof = !0, this.destroy())
                }.bind(this), t.onclose = t.onerror = this.destroy.bind(this), this.needsBufferShim = !0
            }

            function t(e, t, n) {
                this.manager = e, this.pc = t, this.key = n, this.pc.oniceconnectionstatechange = function() {
                    "new" != this.pc.iceConnectionState && "checking" != this.pc.iceConnectionState && delete e.gcmRtcConnections[n], "disconnected" != this.pc.iceConnectionState && "closed" != this.pc.iceConnectionState || this.destroy()
                }.bind(this)
            }

            function n(e, t, n) {
                this.senders = e, this.registrationId = t, this.rtcc = n, this.gcmRtcConnections = {}, this.gcmRtcListeners = {}
            }
            e.prototype.buffered = Socket.prototype.buffered, e.prototype.unshift = Socket.prototype.unshift, e.prototype.dataReceived = Socket.prototype.dataReceived, e.prototype.read = Socket.prototype.read, e.prototype.pause = Socket.prototype.pause, e.prototype.resume = Socket.prototype.resume, e.prototype.buffered = Socket.prototype.buffered, e.prototype.writeable = function() {
                var e = this.writeCallback;
                e && (delete this.writeCallback, e())
            }, e.prototype.write = function(e, t) {
                if (!this.dc || "open" != this.dc.readyState) return void this.destroy();
                this.writeCallback = t;
                var n = new Uint8Array(e.byteLength + 1);
                if (n.set(new Uint8Array(e)), this.dc.send(n.buffer), !this.reentrantWrite) try {
                    for (this.reentrantWrite = !0; this.writeCallback && (0 == this.dc.bufferedAmount || this.needsBufferShim);) this.writeable()
                } finally {
                    this.reentrantWrite = !1
                }
            }, e.prototype.destroy = function() {
                if (this.dataReceived(null), null != this.dc) {
                    var e = this.dc;
                    if (this.dc = null, e.onclose = null, e.onerror = null, "open" == e.readyState) try {
                        e.send(new Uint8Array([1])), this.gotEof ? this.conn.recycleChannel(e) : this.conn.waitForEof(e)
                    } catch (e) {}
                }
            }, t.prototype.waitForCommand = function(t) {
                t.onmessage = function(n) {
                    if (1 != n.data.byteLength) {
                        this.removeChannel(t);
                        var o = s(n.data),
                            i = new e(this, t);
                        this.openSocket(o, i)
                    }
                }.bind(this)
            }, t.prototype.compactChannels = function() {
                this.inboundChannels && !this.inboundChannels.length && (this.inboundChannels = null), this.outboundChannels && !this.outboundChannels.length && (this.outboundChannels = null)
            }, t.prototype.getAppropriateChannels = function(e, t) {
                var n;
                return e.inbound ? (!this.inboundChannels && t && (this.inboundChannels = []), n = this.inboundChannels) : (!this.outboundChannels && t && (this.outboundChannels = []), n = this.outboundChannels), n
            }, t.prototype.removeChannel = function(e) {
                if (channels = this.getAppropriateChannels(e), channels) {
                    var t = channels.indexOf(e);
                    t != -1 && (channels.splice(t, 1), this.compactChannels())
                }
            }, t.prototype.waitForEof = function(e) {
                e.onmessage = function(t) {
                    var n = new Uint8Array(t.data),
                        o = 1 == n[n.byteLength - 1];
                    o && this.recycleChannel(e)
                }.bind(this)
            }, t.prototype.recycleChannel = function(e) {
                var t = this.getAppropriateChannels(e, !0);
                t.push(e), e.onclose = e.onerror = function() {
                    this.removeChannel(e)
                }.bind(this), this.waitForCommand(e)
            }, t.prototype.addCandidates = function(e) {
                for (var t in e.candidates) this.pc.addIceCandidate(new RTCIceCandidate(e.candidates[t]))
            }, t.prototype.setupPinger = function(e) {
                function t() {
                    e.send(c("ping")), n = setTimeout(t, 1e3)
                }
                var n;
                e.onmessage = function(e) {}, e.onclose = e.onerror = function() {
                    clearTimeout(n), this.destroy()
                }.bind(this), t()
            }, t.prototype.listenSockets = function() {
                this.pc.ondatachannel = function(e) {
                    e.channel.inbound = !0, this.waitForCommand(e.channel)
                }.bind(this)
            }, t.prototype.prepareChannel = function(e) {
                var t = this.pc.createDataChannel(e || "gcm", {
                    reliable: !0,
                    ordered: !0
                });
                return t.binaryType = "arraybuffer", t
            }, t.prototype.newSocket = function(t, n) {
                if ("closed" == this.pc.signalingState) return void n();
                if (this.outboundChannels) {
                    var o = this.outboundChannels.shift();
                    this.compactChannels(), o.send(c(t));
                    var i = new e(this, o);
                    return void n(i, this)
                }
                var o = this.prepareChannel("gcm");
                o.onopen = function() {
                    o.send(c(t));
                    var i = new e(this, o);
                    n(i, this)
                }.bind(this)
            }, t.prototype.destroy = function() {
                delete this.manager.gcmRtcConnections[this.key], "closed" != this.pc.signalingState && this.pc.close();
                var e = this.onClose;
                e && (delete this.onClose, e())
            }, n.prototype.onMessage = function(e) {
                var t = JSON.parse(e.message),
                    o = e.type,
                    i = e.senderId,
                    r = e.src,
                    s = e.srcPort,
                    c = e.dstPort;
                if ("offer" == o) {
                    var a = this.gcmRtcListeners[c];
                    return void(a ? a.listener.incoming(i, r, s, c, t, a.listenCallback) : console.log("not listening on " + c))
                }
                if ("answer" == o) {
                    var d = n.getKey(r, s, c),
                        l = this.gcmRtcConnections[d];
                    return l ? void l.manager.incoming(i, r, s, c, t) : void console.log("pending connection not found")
                }
                n.onUnknownMessage ? n.onUnknownMessage(e) : console.log("unknown message " + o)
            }, n.hasLoadedChannels = !1, n.start = function(e, t, o) {
                if (console.log("starting GtcRtcManger"), window.chrome && window.chrome.gcm) {
                    var i = Object.keys(e);
                    chrome.gcm.register(i, function(i) {
                        if (chrome.runtime.lastError, !i) return void o();
                        var r = new n(e, i, t);
                        chrome.gcm.onMessage.addListener(function(e) {
                            r.onMessage(e.data)
                        }), o(r)
                    })
                } else {
                    var r = new n(e, null, t);
                    $.getScript("https://push.clockworkmod.com/socket.io/socket.io.js", function() {
                        var e = io("https://push.clockworkmod.com");
                        e.on("registration", function(e) {
                            e = "web:" + e, r.registrationId ? (r.registrationId = e, r.onRegistrationIdChanged && r.onRegistrationIdChanged(e)) : (r.registrationId = e, o(r))
                        }), e.on("data", function(e) {
                            r.onMessage(e)
                        })
                    })
                }
            }, n.prototype.ensureChannel = function() {
                function e() {
                    return delete n.channelPromise, n.gcmRtcConnections = {}, n.channel && (delete n.channel, !Object.keys(n.gcmRtcListeners).length) ? void console.log("not reconnecting, no listeners") : void t()
                }

                function t() {
                    console.error("scheduling gcm reconnect"), n.reconnectTimeout = g(n.reconnectTimeout, null, 3e5, function() {
                        console.error("reconnecting gcm"), n.ensureChannel()
                    })
                }
                if (this.channel) return Promise.resolve();
                var n = this;
                return this.channelPromise ? this.channelPromise : this.channelPromise = new Promise(function(o, i) {
                    $.ajax({
                        type: "GET",
                        url: "https://vysor-1026.appspot.com/listen",
                        error: function() {
                            delete n.channelPromise, console.error("error ensuring gcm channe", error), t()
                        },
                        success: function(t) {
                            var i = new goog.appengine.Channel(t.token),
                                r = {
                                    onopen: function() {
                                        n.channel = i;
                                        var e = "web:" + t.channel;
                                        n.registrationId = e, n.onRegistrationIdChanged && n.onRegistrationIdChanged(e), o()
                                    },
                                    onmessage: function(e) {
                                        n.onMessage(JSON.parse(e.data))
                                    },
                                    onerror: function() {
                                        console.error("gcm onerror", arguments), e()
                                    },
                                    onclose: function() {
                                        console.error("gcm onclose", arguments), e()
                                    }
                                };
                            i.open(r)
                        }
                    })
                })
            }, n.prototype.sendGcm = function(e, t, n, o, i, r) {
                e || (e = this.defaultSenderId), t.startsWith("web:") ? $.ajax({
                    type: "POST",
                    url: "https://vysor-1026.appspot.com/send",
                    data: JSON.stringify({
                        channel: t.substring(4),
                        data: {
                            senderId: e,
                            src: this.registrationId,
                            srcPort: o,
                            dstPort: n,
                            type: i,
                            message: JSON.stringify(r)
                        }
                    }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function() {}
                }) : $.ajax({
                    type: "POST",
                    url: "https://gcm-http.googleapis.com/gcm/send",
                    headers: {
                        Authorization: "key=" + this.senders[e]
                    },
                    data: JSON.stringify({
                        to: t,
                        data: {
                            senderId: e,
                            src: this.registrationId,
                            srcPort: o,
                            dstPort: n,
                            type: i,
                            message: JSON.stringify(r)
                        }
                    }),
                    contentType: "application/json",
                    dataType: "json",
                    error: function() {
                        console.log("gcm error", arguments)
                    },
                    success: function() {
                        console.log("gcm", arguments)
                    }
                })
            }, n.getKey = function(e, t, n) {
                return n + ":" + t + ":" + e
            }, n.prototype.setupPeerConnection = function(e, o, i, r, s, c) {
                var a, d = window.RTCPeerConnection || window.webkitRTCPeerConnection,
                    l = new d(this.rtcc),
                    u = function(t) {
                        var n = [];
                        for (var a in t) a = t[a], n.push(a), JSON.stringify(n).length > 3200 && (this.sendGcm(o, i, r, s, e, {
                            desc: c(),
                            candidates: n
                        }), n = []);
                        n.length > 0 && this.sendGcm(o, i, r, s, e, {
                            desc: c(),
                            candidates: n
                        })
                    }.bind(this);
                l.onicecandidate = function(e) {
                    null != e.candidate && (console.log(e.candidate), a = g(a, e.candidate, 500, u))
                }.bind(this);
                var h = n.getKey(i, r, s),
                    f = new t(this, l, h);
                return l.onsignalingstatechange = function(e) {
                    "stable" == l.signalingState ? this.gcmRtcConnections[h] == f : "closed" == l.signalingState && f.destroy()
                }.bind(this), this.gcmRtcConnections[h] = f, f
            }, n.gcmPortCount = 0, n.prototype.connect = function(e, t) {
                function o(e) {
                    l.createOffer(e).then(function(e) {
                        i = e, l.setLocalDescription(e)
                    })
                }
                var i, r = e.senderId,
                    s = e.registrationId,
                    c = e.port,
                    a = n.gcmPortCount++,
                    d = this.setupPeerConnection("offer", r, s, c, a, function() {
                        return i
                    }),
                    l = d.pc;
                if (e.audio) navigator.webkitGetUserMedia({
                    audio: !0,
                    video: !1
                }, function(e) {
                    l.addStream(e), l.onaddstream = function(e) {
                        console.log("got the remote stream"), t(d, e)
                    }, o({
                        offerToReceiveAudio: !0,
                        offerToReceiveVideo: !1,
                        voiceActivityDetection: !1
                    })
                }, function() {
                    console.error("audio fail", arguments), o({
                        offerToReceiveAudio: !0,
                        offerToReceiveVideo: !1,
                        voiceActivityDetection: !1
                    })
                });
                else {
                    var u = d.prepareChannel("pinger");
                    u.onopen = function() {
                        console.log("got rtc pinger"), d.setupPinger(u), t(d)
                    }, d.listenSockets(), o({})
                }
            }, n.prototype.isListening = function(e) {
                return null != this.gcmRtcListeners[e]
            }, n.prototype.stopListen = function(e) {
                delete this.gcmRtcListeners[e]
            }, n.prototype.listen = function(e, t) {
                return this.gcmRtcListeners[e] ? void console.log("already listening on gcm port " + e) : void(this.gcmRtcListeners[e] = {
                    listener: this,
                    listenCallback: t
                })
            }, n.prototype.incoming = function(e, t, o, i, r, s) {
                var c = n.getKey(t, o, i),
                    a = this.gcmRtcConnections[c];
                if (a) {
                    if (!a.remoteDesc) {
                        a.remoteDesc = new RTCSessionDescription(r.desc);
                        var d = a.pc;
                        d.setRemoteDescription(a.remoteDesc)
                    }
                } else {
                    var l;
                    a = this.setupPeerConnection("answer", e, t, o, i, function() {
                        return l
                    }), a.remoteDesc = new RTCSessionDescription(r.desc);
                    var d = a.pc;
                    d.ondatachannel = function(e) {
                        console.log("got rtc pinger"), this.setupPinger(e.channel), s(a), this.listenSockets()
                    }.bind(a), d.setRemoteDescription(a.remoteDesc, function() {
                        d.createAnswer().then(function(e) {
                            l = e, d.setLocalDescription(e)
                        }, function() {
                            console.error("answer error", arguments)
                        })
                    })
                }
                a.addCandidates(r)
            }, window.GcmRtcSocket = e, window.GcmRtcManager = n
        }(),
        function() {
            function e(e, t) {
                this.handle = e, this.iface = t, this.type = "usb";
                for (var n in t.endpoints) n = t.endpoints[n], "bulk" == n.type && (this.zero_mask = n.maximumPacketSize - 1, "in" == n.direction ? this.in = n : this.out = n)
            }

            function t(e) {
                this.socket = e, this.zero_mask = (1 << 30) - 1, this.type = "tcp", e.onClose = function() {
                    var e = this.currentRead;
                    e && (delete this.currentRead, e({
                        resultCode: -1
                    }))
                }.bind(this)
            }

            function n(e, t) {
                this.onConnected = t, this.transport = e, this.currentSocketId = 0, this.sockets = {}, this.forwards = {}, this.maxPayload = n.MAX_PAYLOAD
            }

            function i(e) {
                var t = {};
                "String" != e.constructor.name && (e = s(e));
                var n = e.replace("device::", "").split(";");
                for (var o in n) {
                    o = n[o];
                    var i = o.split("=");
                    2 == i.length && (t[i[0]] = i[1])
                }
                return t
            }

            function r(e, t, n) {
                n || (n = function() {}), this.device = e, this.localId = t, this.onConnected = n
            }

            function a(t, o, i) {
                console.log("connecting");
                var r = new n(new e(t, o), i);
                console.log("sending CNXN"), r.sendMessage(n.kCommandCNXN, n.ADB_PROTOCOL_VERSION, n.MAX_PAYLOAD, "host::"), console.log("starting receive loop"), r.receiveMessages()
            }

            function d(e) {
                var e = e || {},
                    t = e.port || 5037,
                    n = e.start !== !1;
                this.currentSocketId = 0, this.pendingDevices = {}, this.port = t, this.adbDevices = {}, this.clients = {}, n && this.start()
            }

            function u() {
                return (new Date).getTime()
            }

            function f(e, t) {
                this.server = e, this.socket = t
            }
            e.prototype.destroy = function() {
                chrome.usb.releaseInterface(this.handle, this.iface.interfaceNumber, function() {
                    chrome.runtime.lastError, chrome.usb.closeDevice(this.handle, function() {
                        chrome.runtime.lastError
                    })
                }.bind(this))
            }, e.prototype.write = function(e, t) {
                if (this.writing) return this.pendingWrites || (this.pendingWrites = []), void this.pendingWrites.push({
                    data: e,
                    callback: t
                });
                var n = {
                    direction: "out",
                    endpoint: this.out.address,
                    data: e
                };
                this.writing = !0, chrome.usb.bulkTransfer(this.handle, n, function(e) {
                    if (chrome.runtime.lastError, this.writing = !1, t(e), this.pendingWrites) {
                        var n = this.pendingWrites.shift();
                        this.pendingWrites.length || (this.pendingWrites = null), this.write(n.data, n.callback)
                    }
                }.bind(this))
            }, e.prototype.read = function(e, t) {
                var n = {
                    direction: "in",
                    endpoint: this.in.address,
                    length: e
                };
                chrome.usb.bulkTransfer(this.handle, n, function(e) {
                    chrome.runtime.lastError, t(e)
                })
            }, t.prototype.destroy = function() {
                this.socket.destroy()
            }, t.prototype.write = function(e, t) {
                return this.writing ? (this.pendingWrites || (this.pendingWrites = []), void this.pendingWrites.push({
                    data: e,
                    callback: t
                })) : (this.writing = !0, void this.socket.write(e, function() {
                    if (this.writing = !1, t({
                            resultCode: 0
                        }), this.pendingWrites) {
                        var e = this.pendingWrites.shift();
                        this.pendingWrites.length || (this.pendingWrites = null), this.write(e.data, e.callback)
                    }
                }.bind(this)))
            }, t.prototype.read = function(e, t) {
                this.currentRead = t, this.socket.read(e, function(e) {
                    delete this.currentRead, t({
                        resultCode: 0,
                        data: e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
                    })
                })
            }, n.prototype.fatal = function(e) {
                console.log("fatal error", JSON.stringify(e));
                var t = this.onConnected;
                t ? (delete this.onConnected, t()) : this.onError && (this.onError(), delete this.onError), this.destroy()
            }, n.prototype.destroy = function() {
                for (var e in this.sockets) e = this.sockets[e], e.dataReceived(null);
                this.forwards && $.each(this.forwards, function(e, t) {
                    t.destroy()
                }), this.transport.destroy()
            }, n.kCommandSYNC = 1129208147, n.kCommandCNXN = 1314410051, n.kCommandOPEN = 1313165391, n.kCommandOKAY = 1497451343, n.kCommandCLSE = 1163086915, n.kCommandWRTE = 1163154007, n.kCommandAUTH = 1213486401, n.kAuthToken = 1, n.kAuthSignature = 2, n.kAuthRSAPublicKey = 3, n.ADB_PROTOCOL_VERSION = 16777216, n.ADB_VERSION = 39, n.MAX_PAYLOAD = 4096, n.checksum = function(e) {
                e = new Uint8Array(e);
                for (var t = 0, n = 0; n < e.byteLength; n++) t += e[n];
                return 4294967295 & t
            }, n.prototype.sendMessage = function(e, t, o, i, r) {
                i || (i = ""), "String" == i.constructor.name && (i = c(i));
                var s = !0;
                i.byteLength || (s = !1), e == n.kCommandAUTH && t == n.kAuthSignature && (s = !1), e == n.kCommandWRTE && (s = !1);
                var a = i.byteLength;
                if (s && a++, s) {
                    var d = new ArrayBuffer(i.byteLength + 1),
                        l = new Uint8Array(d);
                    l.set(new Uint8Array(i)), l[d.byteLength - 1] = 0, i = d
                }
                var u = new ArrayBuffer(24),
                    l = new DataView(u);
                l.setUint32(0, e, !0), l.setUint32(4, t, !0), l.setUint32(8, o, !0), l.setUint32(12, a, !0), l.setUint32(16, n.checksum(i), !0), l.setUint32(20, 4294967295 ^ e, !0), this.transport.write(u, function(e) {
                    e.resultCode && this.fatal(e), !i.byteLength && r && r()
                }.bind(this)), i.byteLength && this.transport.write(i, function(e) {
                    e.resultCode && this.fatal(e), r && r()
                }.bind(this))
            }, n.prototype.getKey = function(e) {
                chrome.storage.local.get("adbkey", function(t) {
                    var n = t.adbkey,
                        o = new JSEncrypt({
                            default_key_size: 2048
                        });
                    n ? o.setPrivateKey(n) : (n = o.getPrivateKeyB64(), o.setPrivateKey(n), chrome.storage.local.set({
                        adbkey: n
                    })), e(o)
                })
            }, n.prototype._convertToMinCrypt = function(e) {
                var t = 2048,
                    n = t / 8 / 4,
                    o = BigInteger.ONE.shiftLeft(32),
                    i = e.n.clone(),
                    r = BigInteger.ONE.shiftLeft(1).pow(t),
                    s = r.multiply(r).mod(i),
                    c = new Uint32Array(3 + 2 * n);
                c[0] = n, c[1] = o.subtract(i.modInverse(o)).intValue();
                for (var a = n + 2, d = 2, l = 2 + n; d < a; ++d, ++l) c[d] = i.mod(o).intValue(), i = i.divide(o), c[l] = s.mod(o).intValue(), s = s.divide(o);
                c[c.length - 1] = e.e;
                for (var u = "", h = new Uint8Array(c.buffer), d = 0; d < h.length; ++d) {
                    var f = h[d].toString(16);
                    1 == f.length && (u += "0"), u += f
                }
                return p(u) + " adb@chrome"
            }, n.prototype.sign = function(e, t) {
                if (null == e) throw "AuthManager is not initialized";
                var n = 256,
                    o = new Uint8Array(n);
                o[0] = 0, o[1] = 1;
                for (var i = [0, 48, 33, 48, 9, 6, 5, 43, 14, 3, 2, 26, 5, 0, 4, 20], r = n - i.length - t.byteLength, s = 2; s < r; s++) o[s] = 255;
                o.set(new Uint8Array(i), r), r += i.length, o.set(new Uint8Array(t), r);
                var c = new BigInteger(Array.apply([], o));
                return new Uint8Array(e.doPrivate(c).toByteArray()).buffer
            }, n.parseConnectionPayload = i, n.prototype.handleUnknown = function(e, t) {
                console.log("no idea what this socket is."), this.sendMessage(n.kCommandCLSE, e, t)
            }, n.prototype.handleMessage = function(e, t) {
                var o = e.getUint32(0, !0),
                    r = e.getUint32(4, !0),
                    c = e.getUint32(8, !0);
                e.getUint32(12, !0), e.getUint32(16, !0);
                switch (o) {
                    case n.kCommandOPEN:
                        this.onOpenSocket && this.onOpenSocket(t, r);
                        break;
                    case n.kCommandAUTH:
                        console.log("auth:", this), this.getKey(function(e) {
                            if (this.sentSignature) {
                                var o = this._convertToMinCrypt(e.getKey());
                                this.sendMessage(n.kCommandAUTH, n.kAuthRSAPublicKey, 0, o), m('Check your Android device and click "Allow USB Debugging".')
                            } else {
                                this.sentSignature = !0;
                                var i = this.sign(e.getKey(), t);
                                this.sendMessage(n.kCommandAUTH, n.kAuthSignature, 0, i, function() {})
                            }
                        }.bind(this));
                        break;
                    case n.kCommandOKAY:
                        var a = r,
                            d = c,
                            l = this.sockets[d];
                        if (!l) return void this.handleUnknown(d, a);
                        var u = l.onConnected;
                        u && (delete l.onConnected, l.remoteId = a, u(l));
                        var h = l.pendingWrite;
                        if (h) return u = l.wrote, delete l.wrote, delete l.pendingWrite, void l.write(h, u);
                        u = l.wrote, u && (delete l.wrote, u());
                        break;
                    case n.kCommandCNXN:
                        this.rawProperties = s(t), this.properties = i(t);
                        var u = this.onConnected;
                        u && (delete this.onConnected, u(this));
                        break;
                    case n.kCommandWRTE:
                        var a = r,
                            d = c,
                            l = this.sockets[d];
                        if (!l) return void this.handleUnknown(d, a);
                        l.paused || this.sendMessage(n.kCommandOKAY, l.localId, l.remoteId), l.dataReceived(new Uint8Array(t));
                        break;
                    case n.kCommandCLSE:
                        var a = r,
                            d = c,
                            l = this.sockets[d];
                        if (!l) return void console.log("asked to close unknown socket?");
                        delete this.sockets[d], l.destroy();
                        var u = l.onConnected;
                        u && (delete l.onConnected, u());
                        break;
                    default:
                        console.log("unknown command: ", o.toString(16), r, c, t)
                }
            }, n.prototype.onReceiveMessage = function(e) {
                if (e.resultCode) return void this.fatal(e);
                var t = new DataView(e.data),
                    o = t.getUint32(12, !0);
                if (o) this.transport.read(o, function(e) {
                    if (e.resultCode) return void this.fatal(e);
                    var o = e.data;
                    if (n.checksum(o) != t.getUint32(16, !0)) return void this.receiveMessages();
                    try {
                        this.handleMessage(t, o)
                    } finally {
                        this.receiveMessages()
                    }
                }.bind(this));
                else try {
                    this.handleMessage(t, null)
                } finally {
                    this.receiveMessages()
                }
            }, n.prototype.receiveMessages = function() {
                this.transport.read(24, this.onReceiveMessage.bind(this))
            }, n.prototype.forwardPort = function(e) {
                var t = new Server;
                t.listen({
                    port: e.fromPort,
                    address: "127.0.0.1"
                }, function(t) {
                    this.newSocket(e.to, function(e) {
                        e ? Socket.stream(t, e) : t.destroy()
                    }.bind(this))
                }.bind(this), function() {
                    this.forwards[e.fromPort] = t
                }.bind(this))
            }, n.prototype.newAdbSocket = function(e, t) {
                var n;
                return n = this.createSocket ? this.createSocket(e, t) : new r(this, e, t)
            }, n.prototype.newSocket = function(e, t) {
                var o = ++this.currentSocketId;
                this.sockets[o] = this.newAdbSocket(o, t), this.sendMessage(n.kCommandOPEN, o, 0, e)
            }, r.prototype.write = function(e, t) {
                if (this.pendingWrite || this.wrote) throw console.log("bad adb socket state, already writing"), new Error("bad adb socket state, already writing");
                var o = Math.min(this.device.transport.zero_mask, this.device.maxPayload);
                o < e.byteLength ? (this.pendingWrite = e.slice(o), e = e.slice(0, o)) : this.pendingWrite = null, this.wrote = t, this.device.sendMessage(n.kCommandWRTE, this.localId, this.remoteId, e)
            }, r.prototype.destroy = function() {
                this.device.sendMessage(n.kCommandCLSE, this.localId, this.remoteId), this.dataReceived(null)
            }, r.prototype.buffered = Socket.prototype.buffered, r.prototype.dataReceived = Socket.prototype.dataReceived, r.prototype.read = Socket.prototype.read, r.prototype.pause = Socket.prototype.pause, r.prototype.resume = Socket.prototype.resume, r.prototype.unshift = Socket.prototype.unshift, r.prototype.onPause = function() {}, r.prototype.onResume = function() {
                this.device.sendMessage(n.kCommandOKAY, this.localId, this.remoteId)
            }, d.prototype.onOpenSocket = function(e, t) {
                var o = this,
                    i = s(e),
                    r = i.split(":"),
                    c = Number.parseInt(r[1]);
                Socket.connect({
                    host: "127.0.0.1",
                    port: c
                }, function(e) {
                    if (!e) return void o.sendMessage(n.kCommandOKAY, 0, t);
                    var i = ++o.currentSocketId,
                        r = o.newAdbSocket(i);
                    r.remoteId = t, o.sockets[i] = r, o.sendMessage(n.kCommandOKAY, i, t), Socket.stream(e, r)
                })
            }, d.prototype.start = function() {
                if (this.server) return void console.log("ADB Server started while already started");
                this.clients = {}, this.adbDevices = {}, this.pendingDevices = {}, this.refreshing = {};
                var e = new Server;
                e.listen({
                    port: this.port,
                    address: "127.0.0.1"
                }, function(e) {
                    var t = new f(this, e),
                        n = ++this.currentSocketId;
                    this.clients[n] = t, e.onClose = function() {
                        delete this.clients[n]
                    }.bind(this), t.receiveHeader()
                }.bind(this), function(t) {
                    return t ? void console.log("adb server failed to listen: " + t) : (console.log("ADB Server started"), this.server = e, void this.refresh())
                }.bind(this))
            }, d.prototype.isRunning = function() {
                return null != this.server
            }, d.prototype.kill = function() {
                this.server.destroy(), this.server = null, this.refreshing = {};
                for (var e in this.clients) e = this.clients[e], e.socket.destroy();
                this.clients = {};
                for (var t in this.adbDevices) t = this.adbDevices[t], t.destroy();
                this.adbDevices = {}, this.pendingDevices = {}
            }, d.prototype.selectDevice = function(e) {
                chrome.usb.getUserSelectedDevices({
                    filters: [{
                        interfaceClass: 255,
                        interfaceSubclass: 66,
                        interfaceProtocol: 1
                    }]
                }, function(t) {
                    for (var n in t) n = t[n], this.refreshDevice(n, e)
                }.bind(this))
            }, d.prototype.withAdbDevice = function(e, t) {
                e.onError = function() {
                    delete this.adbDevices[e.serialno], this.internalOnDevicesChanged()
                }.bind(this);
                var n = function(n) {
                    e.serialno = n.trim(), this.adbDevices[e.serialno] = e, console.log("found device: " + e.serialno), this.internalOnDevicesChanged(), t(e)
                }.bind(this);
                return e.serialno ? void n(e.serialno) : void e.newSocket("shell:getprop ro.serialno", function(e) {
                    l(e, function(e) {
                        n(e)
                    }.bind(this))
                }.bind(this))
            }, d.prototype.tryDevice = function(e, t, n) {
                function o(o) {
                    var s = o.interfaceNumber;
                    return !i[s] && (i[s] = e, console.log("claiming:", JSON.stringify(e), JSON.stringify(o)), chrome.usb.claimInterface(e, o.interfaceNumber, function() {
                        console.log("claimed:", JSON.stringify(chrome.runtime.lastError)), a(e, o, function(e) {
                            return e ? (e.serialno = t, e.onOpenSocket = r.onOpenSocket, void r.withAdbDevice(e, function(e) {
                                delete i[s], n(e)
                            })) : (delete i[s], void n())
                        })
                    }), !0)
                }
                var i = (this.adbDevices, this.pendingDevices),
                    r = this;
                chrome.usb.listInterfaces(e, function(t) {
                    if (!t) return console.log("unable list interfaces", JSON.stringify(chrome.runtime.lastError)), void(n && n());
                    console.log("got interfaces", JSON.stringify(t));
                    var i = !1;
                    for (var r in t) r = t[r], 255 == r.interfaceClass && 66 == r.interfaceSubclass && 1 == r.interfaceProtocol && (i |= o(r));
                    i || chrome.usb.closeDevice(e)
                })
            }, d.prototype.refreshDevice = function(e, t) {
                chrome.usb.openDevice(e, function(n) {
                    return n ? (this.start(), void this.tryDevice(n, e.serialNumber, function(n) {
                        n && (n.usbDevice = e), t(n)
                    })) : (console.log("unable to open device", JSON.stringify(chrome.runtime.lastError)), void(t && t()))
                }.bind(this))
            }, d.prototype.refresh = function() {
                if (!this.server) return void console.log("adb server refresh requested while server killed");
                var e = u();
                if (!(this.server.lastRefresh && this.server.lastRefresh > e - 1e4)) {
                    this.server.lastRefresh = e;
                    var t = chrome.runtime.getManifest().permissions.pop().usbDevices;
                    $(t).each(function(e, t) {
                        var n = t.vendorId + "&" + t.productId;
                        this.refreshing[n] || (this.refreshing[n] = !0, chrome.usb.findDevices({
                            productId: t.productId,
                            vendorId: t.vendorId
                        }, function(e) {
                            var o = e.length;
                            if (!o) return void delete this.refreshing[n];
                            console.log("found:", t, e);
                            for (var i in e) console.log("trying:", e[i]), this.tryDevice(e[i], e[i].serialNumber, function() {
                                o--, o || delete this.refreshing[n]
                            }.bind(this))
                        }.bind(this)))
                    }.bind(this))
                }
            }, d.prototype.internalOnDevicesChanged = function() {
                for (var e in this.clients)
                    if (e = this.clients[e], e.tracking) {
                        var t = e.getDevicesString();
                        t.length || (t = "0000\n"), e.socket.write(c(t), function() {})
                    }
            }, d.prototype.stop = function() {
                this.server.destroy()
            }, f.prototype.resolveTransport = function(e, t) {
                if (t) {
                    var n = this.server.adbDevices[t];
                    return n ? n : "device not found"
                }
                var o = Object.keys(this.server.adbDevices);
                if (o > 1) return "more than one device";
                if (0 == o) return "no devices connected";
                for (var i in this.server.adbDevices) return this.server.adbDevices[i]
            }, f.prototype.write = function(e, t, n) {
                t || (t = "OKAY"), e = c(e);
                var i = e.byteLength,
                    r = o(i);
                r = c(t + r);
                var s = h(new Uint8Array(r), new Uint8Array(e)).buffer;
                n || (n = function() {
                    this.socket.destroy()
                }.bind(this)), this.socket.write(s, n)
            }, f.prototype.getDevicesString = function(e) {
                var e = e || {},
                    t = e.longformDevices,
                    n = "";
                for (var o in this.server.adbDevices) o = this.server.adbDevices[o], n += o.serialno + "\tdevice", t && (n += "usb" == o.transport.type ? " usb:" + o.transport.iface.interfaceNumber : " tpcip:something", n += " product:" + o.properties["ro.product.name"], n += " model:" + o.properties["ro.product.model"], n += " device:" + o.properties["ro.product.device"]), n += "\n";
                return n
            }, f.prototype.writeDevices = function(e, t) {
                this.write(this.getDevicesString(e), null, t)
            }, f.prototype.handlePayload = function(e) {
                e = s(e);
                var i, r = e.split(":"),
                    a = e;
                switch ("host-serial" == r[0] && (r[0] = "host", i = r.splice(1, 1)[0], Number.isInteger(parseInt(r[1])) && (i += ":" + r.splice(1, 1)[0])), r.length >= 2 && (a = r[0] + ":" + r[1]), a) {
                    case "host:version":
                        this.write(o(n.ADB_VERSION));
                        break;
                    case "host:devices-l":
                    case "host:devices":
                        var d = "host:devices-l" == e;
                        this.server.refresh(), this.writeDevices({
                            longformDevices: d
                        });
                        break;
                    case "host:features":
                        var l = this.resolveTransport(e, i);
                        if ("String" == l.constructor.name) {
                            this.write(l, "FAIL");
                            break
                        }
                        var h = l.properties.features;
                        h || (h = ""), this.write(o(h));
                        break;
                    case "host:transport-usb":
                    case "host:transport-any":
                        var l = this.resolveTransport(e, i);
                        if ("String" == l.constructor.name) {
                            this.write(l, "FAIL");
                            break
                        }
                        this.transport = l, this.socket.write(c("OKAY"), function() {});
                        break;
                    case "host:kill":
                        this.server.kill();
                        break;
                    case "host:disconnect":
                        if (r.length > 4) {
                            this.write("host:disconnect only takes 1 argument", "FAIL");
                            break
                        }
                        if (r.length > 2) {
                            var f = r[2];
                            if (f.length) {
                                var p = 5555;
                                r.length > 3 && (p = Number.parseInt(r[3]));
                                var v = f + ":" + p,
                                    g = this.server.adbDevices[v];
                                g && "tcp" == g.transport.type && g.destroy(), this.write("disconnected");
                                break
                            }
                        }
                        for (var g in this.server.adbDevices) g = this.server.adbDevices[g], "tcp" == g.transport.type && g.destroy();
                        this.write("disconnected");
                        break;
                    case "host:connect":
                        if (r.length < 3) {
                            this.write("need more arguments for connect <host>[:<port>]", "FAIL");
                            break
                        }
                        var f = r[2],
                            p = 5555;
                        r.length > 3 && (p = Number.parseInt(r[3])),
                            Socket.connect({
                                host: f,
                                port: p
                            }, function(e, o) {
                                if (!e) return console.error("connect failed"), this.write("unable to connect to " + f + " " + p + ": " + o, "FAIL"), this;
                                var i = new n(new t(e), function(e) {
                                    this.server.withAdbDevice(e, function() {
                                        var e = "connected to " + f + ":" + p;
                                        console.log(e), this.write(e)
                                    }.bind(this))
                                }.bind(this));
                                i.onOpenSocket = this.onOpenSocket, i.serialno = f + ":" + p, e.onClose = function() {
                                    i.fatal("socket closed")
                                }.bind(this), i.sendMessage(n.kCommandCNXN, n.ADB_PROTOCOL_VERSION, n.MAX_PAYLOAD, "host::"), i.receiveMessages()
                            }.bind(this));
                        break;
                    case "host:track-devices":
                        this.tracking = u(), this.writeDevices({}, function() {});
                        break;
                    case "host:forward":
                        var m = r.join(":").substring(a.length + 1).split(";"),
                            y = m[0].split(":"),
                            w = parseInt(y[1]),
                            l = this.resolveTransport(e, i);
                        if ("String" == l.constructor.name) {
                            this.write(l, "FAIL");
                            break
                        }
                        l.forwardPort({
                            fromPort: w,
                            to: m[1]
                        }), this.socket.write(c("OKAYOKAY"), function() {}.bind(this));
                        break;
                    default:
                        if (this.transport) {
                            var l = this.transport;
                            return void l.newSocket(e, function(e) {
                                return e ? (this.socket.write(c("OKAY"), function() {}), void Socket.stream(e, this.socket)) : void this.socket.write(c("OKAY"), function() {
                                    this.socket.destroy()
                                }.bind(this))
                            }.bind(this))
                        }
                        var b = "host:transport:";
                        if (e.startsWith(b)) {
                            var i = e.substr(b.length),
                                g = this.server.adbDevices[i];
                            if (!g) return void this.write("device not found", "FAIL");
                            this.transport = g, this.socket.write(c("OKAY"), function() {});
                            break
                        }
                        console.log("unknown request: " + e), this.write("unknown command: " + e, "FAIL");
                        var k = chrome.runtime.getManifest().name;
                        chrome.notifications.create({
                            type: "basic",
                            iconUrl: "/icon.png",
                            title: k,
                            message: k + "'s adb server encountered an unknown adb command.\nYou may want to close " + k + " and start your adb binary manually."
                        })
                }
                this.receiveHeader()
            }, f.prototype.receivePayload = function(e) {
                var t = parseInt(s(e), 16);
                this.socket.read(t, this.handlePayload.bind(this))
            }, f.prototype.receiveHeader = function() {
                this.socket.read(4, this.receivePayload.bind(this))
            }, window.AdbDevice = n, window.AdbServer = d, window.AdbTcpTransport = t
        }(),
        function() {
            function e() {}
            var t = {};
            t.sendHostCommand = function(e, t) {
                Socket.connect({
                    host: "127.0.0.1",
                    port: 5037
                }, function(n) {
                    if (!n) return void t();
                    var i = e;
                    e = o(e.length) + e, n.read(4, function(e) {
                        var o = s(e);
                        return "OKAY" != o ? (console.error("error in response to adb host command", i, o), n.destroy(), void t()) : void n.read(4, function(e) {
                            var o = s(e);
                            return e = parseInt(o, 16), 0 == e || "OKAY" == o ? void t(n, new ArrayBuffer(0)) : void n.read(e, function(e) {
                                t(n, e)
                            })
                        })
                    }), n.write(c(e), function() {})
                })
            }, t.devices = function(e) {
                function n(e) {
                    var t = e;
                    e = e.replace("\t", " ");
                    var n = e.indexOf(" ");
                    if (n != -1) {
                        var i = e.substring(0, n);
                        e = e.substring(n).trim();
                        for (var r; r != e;) r = e, e = e.replace("  ", " ");
                        var s = {},
                            c = e.indexOf(" ");
                        c == -1 && (c = e.length);
                        var a = e.substring(0, c);
                        for (e = e.substring(c + 1); e.length && (n = e.indexOf(":"), n != -1);) {
                            var d, l = e.substring(0, n),
                                u = e.substring(n + 1),
                                h = u.indexOf(" "),
                                f = u.indexOf(":");
                            if (h == -1 || f == -1) d = u, e = "";
                            else
                                for (; h != -1 && h < f;) d = u.substring(0, h), e = u.substring(h + 1), h = u.indexOf(" ", h + 1);
                            s[l] = d
                        }
                        var p;
                        p = s.model ? s.model.replace("_", " ") : i, o[i] = {
                            serialno: i,
                            name: p,
                            status: a,
                            properties: t
                        }
                    }
                }
                var o = {};
                t.sendHostCommand("host:devices-l", function(t, i) {
                    if (!t) return void e();
                    t.destroy(), i = s(i), console.log("ADB devices:", i), i = i.trim();
                    var r = i.split("\n");
                    for (var c in r) c = r[c], n(c);
                    console.log("parsed ADB devices:", o), e(o)
                })
            }, t.killServer = function(e) {
                t.sendHostCommand("host:kill-server", function(t, n) {
                    return t ? (t.destroy(), n = s(n), void(e && e())) : void e()
                })
            }, t.sendClientCommand = function(e, t) {
                var n = e.command,
                    i = e.serialno;
                Socket.connect({
                    host: "127.0.0.1",
                    port: 5037
                }, function(e) {
                    if (!e) return void t();
                    e.read(4, function(i) {
                        var r = s(i);
                        if ("OKAY" != r) return e.destroy(), void t(null);
                        var a = n;
                        a = o(a.length) + a, e.read(4, function(n) {
                            var o = s(n);
                            return "OKAY" != o ? (e.destroy(), void t(null)) : void t(e)
                        }), e.write(c(a), function() {})
                    });
                    var r = "host:transport:" + i;
                    r = o(r.length) + r, e.write(c(r), function() {})
                })
            }, t.shell = function(e, n) {
                var o = e.command;
                e.serialno;
                t.getOrCreateSockFactory(e).newSocket("shell:" + o, function(e) {
                    return e ? void l(e, function(e) {
                        n(e)
                    }) : void n()
                })
            }, t.forward = function(e, n) {
                var o = "host-serial:" + e.serialno + ":forward:" + e.from + ";" + e.to;
                t.sendHostCommand(o, function(e, t) {
                    e && e.destroy(), n(e, t)
                })
            }, e.MKID = function(e, t, n, o) {
                return e.charCodeAt(0) | t.charCodeAt(0) << 8 | n.charCodeAt(0) << 16 | o.charCodeAt(0) << 24
            }, e.ID_RECV = e.MKID("R", "E", "C", "V"), e.ID_SEND = e.MKID("S", "E", "N", "D"), e.ID_DONE = e.MKID("D", "O", "N", "E"), e.ID_DATA = e.MKID("D", "A", "T", "A"), e.DATA_MAX = 65536, t.pull = function(n, o) {
                var i = n.file,
                    r = (n.serialno, n.fileEntry),
                    s = n.socket;
                s || ! function() {
                    var e;
                    s = {
                        write: function(t, n) {
                            return e ? (e.onwriteend = n, void e.write(new Blob([t]))) : void r.createWriter(function(o) {
                                e = o, s.write(t, n)
                            })
                        }
                    }
                }();
                var a = new b;
                Socket.pump(a, s, function() {
                    o(r)
                }), t.getOrCreateSockFactory(n).newSocket("sync:", function(t) {
                    function n(e) {
                        t.read(e, function(e) {
                            a.dataReceived(e), r()
                        })
                    }

                    function r() {
                        t.read(8, function(i) {
                            var r = new DataView(i.buffer, i.byteOffset, i.byteLength),
                                s = r.getUint32(0, !0);
                            if (s == e.ID_DATA) {
                                var c = r.getUint32(4, !0);
                                return void n(c)
                            }
                            return t.destroy(), s == e.ID_DONE ? void a.dataReceived(null) : void o()
                        })
                    }
                    if (!t) return void o();
                    var s = new ArrayBuffer(8),
                        d = new DataView(s);
                    d.setUint32(0, e.ID_RECV, !0), d.setUint32(4, i.length, !0), t.write(s, function() {
                        t.write(c(i), function() {
                            r()
                        })
                    })
                })
            }, t.createSocketFactory = function(e) {
                return {
                    newSocket: function(n, o) {
                        t.sendClientCommand({
                            serialno: e,
                            command: n
                        }, o)
                    }
                }
            }, t.getOrCreateSockFactory = function(e) {
                return e.socketFactory || t.createSocketFactory(e.serialno)
            }, t.push = function(n, o) {
                var i = n.file,
                    r = (n.serialno, n.socket);
                t.getOrCreateSockFactory(n).newSocket("sync:", function(t) {
                    if (!t) return void o();
                    var n = new ArrayBuffer(8),
                        s = new DataView(n),
                        a = i + ",0644";
                    s.setUint32(0, e.ID_SEND, !0), s.setUint32(4, a.length, !0), t.write(n, function() {
                        t.write(c(a), function() {
                            function n() {
                                r.read(function(t) {
                                    if (t.byteLength > e.DATA_MAX) {
                                        var n = t.subarray(e.DATA_MAX);
                                        t = t.subarray(0, e.DATA_MAX), r.unshift(n)
                                    }
                                    i(t)
                                })
                            }

                            function i(o) {
                                var i = new ArrayBuffer(8),
                                    r = new DataView(i);
                                r.setUint32(0, e.ID_DATA, !0), r.setUint32(4, o.byteLength, !0), t.write(i, function() {
                                    var e = o.buffer;
                                    (o.byteOffset || o.length != e.byteLength) && (e = e.slice(o.byteOffset, o.byteOffset + o.byteLength)), t.write(e, function() {
                                        n()
                                    })
                                })
                            }
                            r.onClose = function() {
                                var n = new ArrayBuffer(8),
                                    i = new DataView(n);
                                i.setUint32(0, e.ID_DONE, !0), i.setUint32(4, 0, !0), t.write(n, function() {
                                    t.read(8, function() {
                                        o()
                                    })
                                })
                            }, n()
                        })
                    })
                })
            }, window.Adb = t
        }(),
        function() {
            function e(e, t) {
                this.transport = e, this.sockets = {}, this.currentSocketId = 0, this.maxPayload = t || AdbDevice.MAX_PAYLOAD
            }
            e.prototype.start = function(e) {
                var t = c(e, void 0, !0);
                this.sendMessage(AdbDevice.kCommandCNXN, AdbDevice.ADB_PROTOCOL_VERSION, this.maxPayload, t), this.receiveMessages()
            }, e.prototype.fatal = function(e) {
                console.log("fatal error", e);
                var t = this.onClose;
                t && (delete this.onClose, t())
            }, e.prototype.sendMessage = AdbDevice.prototype.sendMessage, e.prototype.receiveMessages = AdbDevice.prototype.receiveMessages, e.prototype.onReceiveMessage = AdbDevice.prototype.onReceiveMessage, e.prototype.handleMessage = AdbDevice.prototype.handleMessage, e.prototype.handleUnknown = AdbDevice.prototype.handleUnknown, e.prototype.newAdbSocket = AdbDevice.prototype.newAdbSocket, e.prototype.destroy = AdbDevice.prototype.destroy, e.prototype.onOpenSocket = function(e, t) {
                if (this.openSocket) {
                    var n = ++this.currentSocketId,
                        o = this.newAdbSocket(n);
                    o.remoteId = t, this.sockets[n] = o, this.sendMessage(AdbDevice.kCommandOKAY, n, t), this.openSocket(s(e), o)
                }
            }, window.AdbDaemon = e
        }(),
        function() {
            function e(e, t, n) {
                $.ajax({
                    url: e,
                    dataType: "binary",
                    responseType: "arraybuffer",
                    success: function(e) {
                        var o = new Uint8Array(e),
                            i = new b(o),
                            r = "/data/local/tmp/apk" + (new Date).getTime() + ".apk";
                        Adb.push({
                            serialno: t,
                            file: r,
                            socket: i
                        }, function() {
                            Adb.shell({
                                command: "pm install -r " + r,
                                serialno: t
                            }, n)
                        })
                    },
                    error: function(e) {
                        console.error("error fetching apk", e), n()
                    }
                })
            }

            function t(e, t, n) {
                Adb.shell({
                    command: "pm path " + t,
                    serialno: e
                }, function(e) {
                    if ("" == e || !e) return void n(null);
                    var t = e.match(/package:\/.*?[\r\n]/);
                    return t && t.length ? (e = t[0], e = e.replace("package:", "").trim(), void n(e)) : void n(null)
                })
            }

            function n(e, t, n, o, i) {
                i || (i = Adb.shell), Adb.shell({
                    command: "ls -l /system/bin/app_process*",
                    serialno: e
                }, function(r) {
                    var s = "/system/bin/app_process";
                    r && r.indexOf("app_process32") != -1 && (s += "32"), i({
                        command: 'sh -c "CLASSPATH=' + t + " " + s + " /system/bin " + n + '"',
                        serialno: e
                    }, o)
                })
            }
            window.AdbUtils = {
                runMain: n,
                installApk: e,
                getApkPath: t
            }
        }(),
        function() {
            var e = function(e) {
                this.authorization = e
            };
            e.prototype.shorten = function(e, t) {
                $.ajax({
                    type: "POST",
                    url: "https://www.googleapis.com/urlshortener/v1/url?key=" + this.authorization,
                    data: JSON.stringify({
                        longUrl: e
                    }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function(e) {
                        t(e.id)
                    }
                })
            }, window.Googl = e
        }(),
        function() {
            var e, t = !1,
                o = !1,
                i = "Account Management";
            S.prototype.refresh = function(e, t) {
                console.log("interactive", t), this.refreshInternal(e, t).async()
            }, S.prototype.refreshInternal = function*(r, s) {
                var c, a = function() {
                        n(function() {
                            if (this.a()) {
                                var e, t = chrome.app.window.getAll().filter(function(e) {
                                    return e && "purchase" == e.id
                                });
                                t && t.length, e = t[0], null != e && (e.close(), m("Vysor subscription is active. Thank you for your support!"))
                            }
                        }.bind(this)), this.globalRefresh ? this.globalRefresh() : console.error("no global refresh?"), c || (c = !0, r && r(this.a()))
                    }.bind(this),
                    d = !1,
                    l = !1,
                    u = !1,
                    h = !1;
                window.chrome && window.chrome.runtime && window.chrome.runtime.connect || (u = !0);
                var f, p, v, g = function(e, t) {
                        return !!t.licensed && (e != t.email ? (console.log("email mismatch"), !1) : (console.log("enterprise license retrieved"), !0))
                    }.bind(this),
                    b = function(e, t) {
                        if (t.sandbox != d) return console.log("sandbox mismatch"), !1;
                        if (e != t.buyer_id) return console.log("id mismatch"), !1;
                        if ("koushd@gmail.com" != t.seller_id) return console.log("seller mismatch"), !1;
                        var n = !1;
                        return t.subscriptions && $.each(t.subscriptions, function(e, t) {
                            return console.log("subscription found", t), t.remote_plan_id.startsWith("vysor") ? void(t.subscription_active && (console.log("clockwork subscription retrieved"), n = t.license_first_retrieved)) : void console.log("skipping non-vysor subscription")
                        }.bind(this)), $.each(t.orders, function(e, t) {
                            return console.log("purchase found", t), t.product_id.startsWith("vysor") ? void(t.is_purchased && (console.log("clockwork license retrieved"), n = t.order_date)) : void console.log("skipping non-vysor purchase")
                        }.bind(this)), n
                    }.bind(this),
                    k = function(e) {
                        $.each(e, function(e, n) {
                            console.log("subscription status", n), "ACTIVE" == n.state && (console.log("chrome license retrieved"), t = !0)
                        }.bind(this))
                    }.bind(this),
                    S = function*() {
                        if (h) return void console.log("skipping enterprise");
                        if (v && !s) return console.log("Skipping enterprise license server check."), void console.log("Use Retrieve License from the purchase page to force refresh.");
                        console.log("checking chrome enterprise licenses");
                        var n = yield w(!1, yield);
                        if (!n) return chrome.runtime.lastError, void console.error("No auth token for enterprise licensing");
                        try {
                            var r = yield chrome.identity.getProfileUserInfo(yield);
                            if (!U) return void console.log("unable to retrieve user info for enterprise");
                            var c = (r.id, r.email);
                            try {
                                var r = yield $.ajax({
                                    url: "https://billing.vysor.io/license",
                                    headers: {
                                        Authorization: "Bearer " + n
                                    },
                                    dataType: "json",
                                    success: yield y, error: yield Error
                                }), d = JSON.parse(r.signed_data);
                                yield chrome.storage.local.set({
                                    cachedEnterpriseLicense: r
                                }, yield);
                                var l = g(c, d);
                                if (!l) return void console.log("No enterprise license found on server");
                                e = "https://billing.vysor.io", i = "Enterprise Account (" + d.licensing_accounts[0] + ")", t = !0, o = !0, a()
                            } catch (e) {
                                yield chrome.identity.removeCachedAuthToken({
                                    token: n
                                }, yield), console.error("Error communicating with vysor enterprise", e)
                            }
                        } catch (e) {
                            yield chrome.identity.removeCachedAuthToken({
                                token: n
                            }, yield), console.error("Unable to get email for enterprise", e)
                        }
                    }.bind(this),
                    A = function*() {
                        if (l) return void console.log("skipping clockwork");
                        if (p && !s) return console.log("Skipping clockwork license server check."), void console.log("Use Retrieve License from the purchase page to force refresh.");
                        console.log("checking clockwork purchases");
                        var n = yield w(!1, yield);
                        if (!n) return chrome.runtime.lastError, void console.error("No auth token for clockwork billing");
                        try {
                            var i = yield chrome.identity.getProfileUserInfo(yield);
                            if (!U) return void console.log("unable to retrieve user info for clockwork");
                            var r = i.id,
                                c = "https://billing.clockworkmod.com/api/v1/purchase/koushd@gmail.com?sandbox=" + d + "&nonce=" + Date.now();
                            try {
                                var i = yield $.ajax({
                                    url: c,
                                    dataType: "json",
                                    headers: {
                                        Authorization: "Bearer " + n
                                    },
                                    error: yield Error, success: yield y
                                }), u = JSON.parse(i.signed_data);
                                yield chrome.storage.local.set({
                                    cachedClockworkLicense: i
                                }, yield);
                                var h = b(r, u);
                                if (!h) return void console.log("no clockwork license found on server");
                                e = "https://billing.clockworkmod.com", t = !0, o = !0, a()
                            } catch (e) {
                                console.error("error requesting purchases", e)
                            }
                        } catch (e) {
                            yield chrome.identity.removeCachedAuthToken({
                                token: n
                            }, yield), console.error("Unable to get buyer id for clockworkbilling", e)
                        }
                    }.bind(this),
                    D = function*() {
                        if (!u) {
                            console.log("checking chrome store purchases");
                            var t;
                            try {
                                t = yield google.payments.inapp.getPurchases({
                                    parameters: {
                                        env: "prod"
                                    },
                                    success: yield y, failure: yield Error
                                })
                            } catch (e) {
                                if (console.error("Failed to query license from chrome store.", e), !s) return console.log("Skipping Chrome license server fallback check."), void console.log("Use Retrieve License from the purchase page to force refresh.");
                                console.log("Falling back to server proxied query.");
                                try {
                                    yield this.b(!1, yield), yield* O()
                                } catch (e) {
                                    console.error("failed to do fallback server check", e)
                                }
                                return
                            }
                            if (k(t.response.details), !this.a()) return void console.log("no chrome license found on server");
                            e = "https://payments.google.com/payments/home#subscriptionsAndServices", a(), console.log("Caching Vysor license."), yield this.b(!1, yield), this.c() && a()
                        }
                    }.bind(this),
                    I = 4,
                    L = I / 2,
                    O = function*() {
                        if (!u) {
                            console.log("checking cached chrome license");
                            var t = yield chrome.storage.local.get("cachedLicense", yield);
                            if (!t) return void console.error("storage access failed?", chrome.runtime.lastError);
                            if (!t.cachedLicense) return void console.log("no cached chrome license found");
                            if (!U) return void console.log("unable to retrieve user info for cache");
                            var n = yield C("AQAB", "vMGBBmLcMO4lOmg-YAHq2DjZKHTaW-xs9KPNXU_zKJ7ZhFhWH3I6skF9ZO8lKeXOSwVEIW4HVMa7m16S6WTrUw", t.cachedLicense.signed_data, t.cachedLicense.signature, yield);
                            if (n) return void console.error("error verifying cached signature", n);
                            var i = JSON.parse(t.cachedLicense.signed_data);
                            f = !1;
                            var r = Date.now();
                            if ($.each(i.payments, function(e, t) {
                                    "ACTIVE" == t.state && (f = !0, r = Math.min(r, t.createdTime))
                                }.bind(this)), i.date > Date.now()) return void console.log("cached license date from future?");
                            var s, c = new Date - new Date(r),
                                d = c / 1e3 / 60 / 60 / 24;
                            s = d < 14 ? 4 : Math.min(30, 4 + (d - 14) / 7);
                            var l = s / 2;
                            if (i.date + 24 * s * 60 * 60 * 1e3 < Date.now()) return void console.log("cached license is expired.");
                            if (U.id != i.userinfo.id) return void console.log("id mismatch");
                            if (k(i.payments), !this.a()) return void console.log("no chrome license found in cache");
                            if (e = "https://payments.google.com/payments/home#subscriptionsAndServices", console.log("cached license is valid for " + (i.date + 24 * s * 60 * 60 * 1e3 - Date.now()) / 36e5 + " hours"), o = !0, a(), i.date + 24 * l * 60 * 60 * 1e3 < Date.now()) {
                                console.log("Refreshing cached license");
                                try {
                                    yield this.b(!1, yield)
                                } catch (e) {
                                    console.warn("Failed to re-cache license.", e)
                                }
                            }
                        }
                    }.bind(this),
                    R = function*() {
                        if (!l) {
                            console.log("Checking cached Clockwork license.");
                            var n = yield chrome.storage.local.get("cachedClockworkLicense", yield);
                            if (!n) return void console.error("storage access failed?", chrome.runtime.lastError);
                            if (!n.cachedClockworkLicense) return void console.log("Cached Clockwork payload not found.");
                            if (!U) return void console.error("Unable to retrieve user info for cached Clockwork license.");
                            var i = U.id,
                                r = yield C("AQAB", "vMGBBmLcMO4lOmg-YAHq2DjZKHTaW-xs9KPNXU_zKJ7ZhFhWH3I6skF9ZO8lKeXOSwVEIW4HVMa7m16S6WTrUw", n.cachedClockworkLicense.signed_data, n.cachedClockworkLicense.signature, yield);
                            if (r) return void console.error("Error verifying cached clockwork signature", r);
                            var s = JSON.parse(n.cachedClockworkLicense.signed_data),
                                c = b(i, s);
                            if (!c) return console.log("No Clockwork license found in cache."), void(p = !0);
                            e = "https://billing.clockworkmod.com";
                            var d, u = new Date - new Date(c),
                                h = u / 1e3 / 60 / 60 / 24;
                            d = h < 14 ? 4 : Math.min(30, 4 + (h - 14) / 7);
                            var f = d / 2;
                            if (s.timestamp + 24 * d * 60 * 60 * 1e3 < Date.now()) return void console.log("Cached Clockwork license is expired. Requires server check.");
                            if (s.timestamp > Date.now()) return void console.error("Cached Clockwork license date from future?");
                            t = !0, console.log("Cached Clockwork license is valid for " + (s.timestamp + 24 * d * 60 * 60 * 1e3 - Date.now()) / 36e5 + " hours"), o = !0, a(), s.timestamp + 24 * f * 60 * 60 * 1e3 < Date.now() && (p = !1, yield* A())
                        }
                    }.bind(this),
                    E = function*() {
                        if (!h) {
                            console.log("Checking cached enterprise license.");
                            var n = yield chrome.storage.local.get("cachedEnterpriseLicense", yield);
                            var r = yield C("AQAB", "hDuGsIhbjLYXteQX3F3KNriQHwUSZurS5voCkdpA1733A65pqtGOrk9g_yLiF94_vSK0VmL-4stq7WAYEbn6nw", n.cachedEnterpriseLicense.signed_data, n.cachedEnterpriseLicense.signature, yield);
                            var s = JSON.parse(n.cachedEnterpriseLicense.signed_data),
                                c = g(U.email, s);
                            e = "https://billing.vysor.io", i = "Enterprise Account", t = !0, console.log("Cached Enterprise license is valid for " + (Date.now() + 24 * I * 60 * 60 * 1e3 - Date.now()) / 36e5 + " hours"), o = !0, a(), Date.now() + 24 * L * 60 * 60 * 1e3 < Date.now() && (v = !1, yield* S())
                        }
                    }.bind(this);
                if (this.a()) return void a();
                console.log("starting license check");
                var U = yield chrome.identity.getProfileUserInfo(yield);
                U ? console.log("user info", U) : console.log("unable to retrieve user info"), yield* E(), this.a() || (yield* R(), this.a() || (yield* O(), this.a() || (yield* S(), this.a() || (yield* A(), this.a() || (yield* D(), this.a() || a())))))
            }, S.prototype.b = function(e, t) {
                console.log("caching chrome license"), w(e, function(n) {
                    return n ? void $.ajax({
                        type: "post",
                        url: "https://billing.clockworkmod.com/api/v1/verify/google/koushd@gmail.com",
                        data: {
                            token: n,
                            item: chrome.runtime.id,
                            version: chrome.runtime.getManifest().version
                        },
                        dataType: "json",
                        success: function(e) {
                            console.log("chrome license cached"), o = !0, chrome.storage.local.set({
                                cachedLicense: e
                            }, t)
                        }.bind(this),
                        error: function(e, o) {
                            console.error("unable to cache license", o), chrome.identity.removeCachedAuthToken({
                                token: n
                            }, function() {
                                t && t(o)
                            })
                        }
                    }) : (chrome.runtime.lastError, e && m("Unable to get auth token: " + chrome.runtime.lastError), console.error("Unable to get auth token while caching license", chrome.runtime.lastError), void(t && t(chrome.runtime.lastError)))
                }.bind(this))
            }, S.prototype.a = function() {
                return t
            }, S.prototype.c = function() {
                return o
            }, S.prototype.getManageData = function() {
                return {
                    managementUrl: e,
                    managementText: i
                }
            }, S.prototype.startPurchase = function() {
                chrome.app.window.create("purchase.html", {
                    id: "purchase",
                    innerBounds: {
                        minWidth: 800,
                        minHeight: 860
                    }
                }, function(e) {
                    this.refresh(), e.contentWindow._rlm = function(e) {
                        chrome.storage.local.remove(["cachedLicense", "cachedClockworkLicense", "cachedEnterpriseLicense"], function() {
                            this.refresh(e, !0)
                        }.bind(this))
                    }.bind(this)
                }.bind(this))
            }
        }(), A.prototype.openSocket = function(e, t) {
            if (!this.onOpenSocket || !this.onOpenSocket(e, t)) {
                if ("properties" == e) {
                    var n = this.properties;
                    return void t.write(c(n), function() {
                        console.log("sent properties", n), t.destroy()
                    })
                }
                this.adbSocketFactory.newSocket(e, function(n) {
                    return n ? void Socket.stream(n, t, function() {}) : (console.log("unable to execute adb proxy command?", e), void t.destroy())
                })
            }
        };
    console.log("Vysor version", chrome.runtime.getManifest().version), console.log(navigator.userAgent), console.log("Electron", isElectron());
    var Se, Ae, De, Ie = new AdbServer({
            start: !1
        }),
        Le = {},
        Oe = {},
        Re = {},
        Ee = analytics.getService("vysor_app"),
        Ue = Ee.getTracker("UA-4956323-6");
    if (isElectron()) {
        var Te = Ue;
        Ue = {
            sendEvent: Te.sendEvent.bind(Te),
            sendAppView: Te.sendAppView.bind(Te)
        };
        const {
            screen
        } = require("electron");
        console.log("getAllDisplays", screen.getAllDisplays()), console.log("getPrimaryDisplay", screen.getPrimaryDisplay())
    }
    var We = new S,
        Pe = "Chrome GCM Service is unavailable. Try restarting Chrome?",
        Me = new HttpServer;
    We.globalRefresh = function() {
        console.log("license global refresh");
        var e = chrome.app.window.getAll();
        for (var t in e) t = e[t], U(t)
    }, chrome.identity.onSignInChanged.addListener(function() {
        console.log("onSignInChanged, refreshing license"), We.refresh(null, !0)
    }), chrome.storage.local.get("keyboard", function(e) {
        Se = e.keyboard
    }), chrome.storage.local.get("vysorHttp", function(e) {
        function t() {
            Me.listen({
                port: n.port || 0,
                address: "127.0.0.1"
            }, function(e, t) {
                console.log("http request", e.path);
                var n, i;
                for (var r in o)
                    if (n = e.path.match(r), i = o[r], n) break;
                return n ? void i(e, t, n) : (t.code(404), void t.write("", function() {}))
            }, function(e) {
                return e ? (console.error("http server failed to listen", e), void(n.port && (console.log("trying port 0"), n.port = 0, t()))) : (n.port = Me.socket.localPort, console.log("vysor http port: " + n.port), void chrome.storage.local.set({
                    vysorHttp: n
                }))
            })
        }
        if (!e) return void console.error("unable to start vysor httpServer, no dict");
        var n = e.vysorHttp || {};
        n.password = n.password || Math.round(Math.random() * (1 << 30)).toString(16);
        var o = {
            "/device/(.*?)/screenshot-?(.*?).jpg": function(e, t, n) {
                var o = n[1],
                    i = chrome.app.window.get(o);
                if (!i) return console.error("device window", o, "not found"), t.code(404), void t.write("", function() {
                    t.end()
                });
                o = i.contentWindow.device.serialno;
                var r = i.contentWindow.password,
                    s = Adb.createSocketFactory(o);
                s.newSocket("tcp:53516", function(e) {
                    if (!e) return console.error("no socket", o, "for screenshot"), t.code(404), void t.write("", function() {
                        t.end()
                    });
                    t.headers.Connection = "close", t.headers["Content-Type"] = "application/binary", t.headers["Cache-Control"] = "no-cache";
                    var n = new HttpRequestParser(null, e, function() {
                        var e = n.body.buffer.slice(n.body.byteOffset, n.body.byteOffset + n.body.byteLength);
                        t.write(e, function() {
                            t.end()
                        })
                    });
                    e.write(c("GET /screenshot.jpg?password=" + r + " HTTP/1.1\r\nConnection: close\r\n\r\n"), function(e) {})
                })
            },
            "/device/(.*?)/sdcard-vysor/(.*)": function(e, t, n) {
                var o = n[1],
                    i = chrome.app.window.get(o);
                if (!i) return console.error("device window", o, "not found"), t.code(404), void t.write("", function() {
                    t.end()
                });
                o = i.contentWindow.device.serialno;
                var r = n[2];
                t.headers.Connection = "close", t.headers["Cache-Control"] = "no-cache", t.headers["Content-Type"] = "application/binary", Adb.pull({
                    file: "/sdcard/vysor/" + r,
                    serialno: o,
                    socket: t
                }, function() {
                    t.end()
                })
            },
            "/device/(.*?)/video.flv": function(e, t, n) {
                var o = n[1],
                    i = chrome.app.window.get(o);
                if (!We.a()) return console.error("ignoring request, not licensed"), t.code(402), void t.write("This feature is only available in Vysor Pro", function() {
                    t.end()
                });
                if (!i) return console.error("device window", o, "not found"), t.code(404), void t.write("", function() {
                    t.end()
                });
                if (!i.contentWindow.siphonFlv) return console.error("siphonFlv", o, "not found"), t.code(404), void t.write("", function() {
                    t.end()
                });
                var r = new b;
                if (t.headers.Connection = "close", t.headers["Content-Type"] = "video/x-flv", Socket.pump(r, t, function() {
                        console.log("flv source closed")
                    }), isElectron()) {
                    var s = r;
                    r = {
                        dataReceived: function(e) {
                            s.dataReceived(e)
                        },
                        destroy: s.destroy.bind(r)
                    }
                }
                i.contentWindow.siphonFlv(r)
            }
        };
        t()
    }), We.refresh();
    var Ne;
    chrome.app.runtime.onLaunched.addListener(function(e) {
        G(), e && "vysor_purchase" == e.id && We.refresh(null, !0), e && "vysor_presentation" == e.id && Z(e.url, function(e) {
            j(e)
        }), e && "vysor_device_farm" == e.id && (console.log("device farm", e.url), De && De.show(), G(), m("Vysor is connecting to shared Android devices"), w(!0, function(t) {
            return t ? void J(e.url, t, function(e, t) {
                return t ? void T("Vysor Share", "Unable to connect to shared devices. " + t) : void T("Vysor Share", "Connected to " + e.name + "'s remote devices.")
            }) : void m("Unable to get auth token")
        })), ee()
    });
    var _e, xe;
    J = re(J), X = re(X), oe = re(oe), Z = re(Z), chrome.storage.local.get("share-all-devices", function(e) {
        e["share-all-devices"] && X(!1, function() {
            P()
        })
    });
    var Be, Fe, Ve, Ke, je, qe, He, Ye = {},
        Je = {},
        $e = {},
        Xe = {},
        ze = {};
    me(), ve();
    var Ge;
    chrome.runtime.onUpdateAvailable.addListener(function() {
        V()
    }), chrome.notifications.onButtonClicked.addListener(function(e, t) {
        "reload" == e ? chrome.runtime.reload() : "never-start-automatically" == e && (chrome.storage.local.set({
            "connect-automatically": !1
        }), chrome.notifications.clear(e))
    }), chrome.notifications.onClicked.addListener(function(e, t) {}), t[""] = e
}({}, function() {
    return this
}());
