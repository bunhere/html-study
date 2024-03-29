var webVitals = function(e) {
    "use strict";
    var n, t, r, i, a, o = -1, c = function(e) {
        addEventListener("pageshow", (function(n) {
            n.persisted && (o = n.timeStamp,
            e(n))
        }
        ), !0)
    }, u = function() {
        return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
    }, f = function() {
        var e = u();
        return e && e.activationStart || 0
    }, s = function(e, n) {
        var t = u()
          , r = "navigate";
        return o >= 0 ? r = "back-forward-cache" : t && (r = document.prerendering || f() > 0 ? "prerender" : t.type.replace(/_/g, "-")),
        {
            name: e,
            value: void 0 === n ? -1 : n,
            rating: "good",
            delta: 0,
            entries: [],
            id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
            navigationType: r
        }
    }, d = function(e, n, t) {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                var r = new PerformanceObserver((function(e) {
                    n(e.getEntries())
                }
                ));
                return r.observe(Object.assign({
                    type: e,
                    buffered: !0
                }, t || {})),
                r
            }
        } catch (e) {}
    }, l = function(e, n) {
        var t = function t(r) {
            "pagehide" !== r.type && "hidden" !== document.visibilityState || (e(r),
            n && (removeEventListener("visibilitychange", t, !0),
            removeEventListener("pagehide", t, !0)))
        };
        addEventListener("visibilitychange", t, !0),
        addEventListener("pagehide", t, !0)
    }, p = function(e, n, t, r) {
        var i, a;
        return function(o) {
            n.value >= 0 && (o || r) && ((a = n.value - (i || 0)) || void 0 === i) && (i = n.value,
            n.delta = a,
            n.rating = function(e, n) {
                return e > n[1] ? "poor" : e > n[0] ? "needs-improvement" : "good"
            }(n.value, t),
            e(n))
        }
    }, v = -1, m = function() {
        return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0
    }, h = function() {
        l((function(e) {
            var n = e.timeStamp;
            v = n
        }
        ), !0)
    }, g = function() {
        return v < 0 && (v = m(),
        h(),
        c((function() {
            setTimeout((function() {
                v = m(),
                h()
            }
            ), 0)
        }
        ))),
        {
            get firstHiddenTime() {
                return v
            }
        }
    }, y = function(e, n) {
        n = n || {};
        var t, r = [1800, 3e3], i = g(), a = s("FCP"), o = function(e) {
            e.forEach((function(e) {
                "first-contentful-paint" === e.name && (l && l.disconnect(),
                e.startTime < i.firstHiddenTime && (a.value = e.startTime - f(),
                a.entries.push(e),
                t(!0)))
            }
            ))
        }, u = window.performance && window.performance.getEntriesByName && window.performance.getEntriesByName("first-contentful-paint")[0], l = u ? null : d("paint", o);
        (u || l) && (t = p(e, a, r, n.reportAllChanges),
        u && o([u]),
        c((function(i) {
            a = s("FCP"),
            t = p(e, a, r, n.reportAllChanges),
            requestAnimationFrame((function() {
                requestAnimationFrame((function() {
                    a.value = performance.now() - i.timeStamp,
                    t(!0)
                }
                ))
            }
            ))
        }
        )))
    }, T = !1, E = -1, C = function(e, n) {
        n = n || {};
        var t = [.1, .25];
        T || (y((function(e) {
            E = e.value
        }
        )),
        T = !0);
        var r, i = function(n) {
            E > -1 && e(n)
        }, a = s("CLS", 0), o = 0, u = [], f = function(e) {
            e.forEach((function(e) {
                if (!e.hadRecentInput) {
                    var n = u[0]
                      , t = u[u.length - 1];
                    o && e.startTime - t.startTime < 1e3 && e.startTime - n.startTime < 5e3 ? (o += e.value,
                    u.push(e)) : (o = e.value,
                    u = [e]),
                    o > a.value && (a.value = o,
                    a.entries = u,
                    r())
                }
            }
            ))
        }, v = d("layout-shift", f);
        v && (r = p(i, a, t, n.reportAllChanges),
        l((function() {
            f(v.takeRecords()),
            r(!0)
        }
        )),
        c((function() {
            o = 0,
            E = -1,
            a = s("CLS", 0),
            r = p(i, a, t, n.reportAllChanges)
        }
        )))
    }, w = {
        passive: !0,
        capture: !0
    }, L = new Date, S = function(e, i) {
        n || (n = i,
        t = e,
        r = new Date,
        F(removeEventListener),
        b())
    }, b = function() {
        if (t >= 0 && t < r - L) {
            var e = {
                entryType: "first-input",
                name: n.type,
                target: n.target,
                cancelable: n.cancelable,
                startTime: n.timeStamp,
                processingStart: n.timeStamp + t
            };
            i.forEach((function(n) {
                n(e)
            }
            )),
            i = []
        }
    }, A = function(e) {
        if (e.cancelable) {
            var n = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
            "pointerdown" == e.type ? function(e, n) {
                var t = function() {
                    S(e, n),
                    i()
                }
                  , r = function() {
                    i()
                }
                  , i = function() {
                    removeEventListener("pointerup", t, w),
                    removeEventListener("pointercancel", r, w)
                };
                addEventListener("pointerup", t, w),
                addEventListener("pointercancel", r, w)
            }(n, e) : S(n, e)
        }
    }, F = function(e) {
        ["mousedown", "keydown", "touchstart", "pointerdown"].forEach((function(n) {
            return e(n, A, w)
        }
        ))
    }, I = function(e, r) {
        r = r || {};
        var a, o = [100, 300], u = g(), f = s("FID"), v = function(e) {
            e.startTime < u.firstHiddenTime && (f.value = e.processingStart - e.startTime,
            f.entries.push(e),
            a(!0))
        }, m = function(e) {
            e.forEach(v)
        }, h = d("first-input", m);
        a = p(e, f, o, r.reportAllChanges),
        h && l((function() {
            m(h.takeRecords()),
            h.disconnect()
        }
        ), !0),
        h && c((function() {
            var c;
            f = s("FID"),
            a = p(e, f, o, r.reportAllChanges),
            i = [],
            t = -1,
            n = null,
            F(addEventListener),
            c = v,
            i.push(c),
            b()
        }
        ))
    }, P = 0, M = 1 / 0, k = 0, B = function(e) {
        e.forEach((function(e) {
            e.interactionId && (M = Math.min(M, e.interactionId),
            k = Math.max(k, e.interactionId),
            P = k ? (k - M) / 7 + 1 : 0)
        }
        ))
    }, D = function() {
        return a ? P : performance.interactionCount || 0
    }, N = function() {
        "interactionCount"in performance || a || (a = d("event", B, {
            type: "event",
            buffered: !0,
            durationThreshold: 0
        }))
    }, R = 0, q = function() {
        return D() - R
    }, H = [], O = {}, x = function(e) {
        var n = H[H.length - 1]
          , t = O[e.interactionId];
        if (t || H.length < 10 || e.duration > n.latency) {
            if (t)
                t.entries.push(e),
                t.latency = Math.max(t.latency, e.duration);
            else {
                var r = {
                    id: e.interactionId,
                    latency: e.duration,
                    entries: [e]
                };
                O[r.id] = r,
                H.push(r)
            }
            H.sort((function(e, n) {
                return n.latency - e.latency
            }
            )),
            H.splice(10).forEach((function(e) {
                delete O[e.id]
            }
            ))
        }
    }, _ = function(e, n) {
        n = n || {};
        var t = [200, 500];
        N();
        var r, i = s("INP"), a = function(e) {
            e.forEach((function(e) {
                (e.interactionId && x(e),
                "first-input" === e.entryType) && (!H.some((function(n) {
                    return n.entries.some((function(n) {
                        return e.duration === n.duration && e.startTime === n.startTime
                    }
                    ))
                }
                )) && x(e))
            }
            ));
            var n, t = (n = Math.min(H.length - 1, Math.floor(q() / 50)),
            H[n]);
            t && t.latency !== i.value && (i.value = t.latency,
            i.entries = t.entries,
            r())
        }, o = d("event", a, {
            durationThreshold: n.durationThreshold || 40
        });
        r = p(e, i, t, n.reportAllChanges),
        o && (o.observe({
            type: "first-input",
            buffered: !0
        }),
        l((function() {
            a(o.takeRecords()),
            i.value < 0 && q() > 0 && (i.value = 0,
            i.entries = []),
            r(!0)
        }
        )),
        c((function() {
            H = [],
            R = D(),
            i = s("INP"),
            r = p(e, i, t, n.reportAllChanges)
        }
        )))
    }, j = {}, V = function(e, n) {
        n = n || {};
        var t, r = [2500, 4e3], i = g(), a = s("LCP"), o = function(e) {
            var n = e[e.length - 1];
            if (n) {
                var r = n.startTime - f();
                r < i.firstHiddenTime && (a.value = r,
                a.entries = [n],
                t())
            }
        }, u = d("largest-contentful-paint", o);
        if (u) {
            t = p(e, a, r, n.reportAllChanges);
            var v = function() {
                j[a.id] || (o(u.takeRecords()),
                u.disconnect(),
                j[a.id] = !0,
                t(!0))
            };
            ["keydown", "click"].forEach((function(e) {
                addEventListener(e, v, {
                    once: !0,
                    capture: !0
                })
            }
            )),
            l(v, !0),
            c((function(i) {
                a = s("LCP"),
                t = p(e, a, r, n.reportAllChanges),
                requestAnimationFrame((function() {
                    requestAnimationFrame((function() {
                        a.value = performance.now() - i.timeStamp,
                        j[a.id] = !0,
                        t(!0)
                    }
                    ))
                }
                ))
            }
            ))
        }
    }, z = function e(n) {
        document.prerendering ? addEventListener("prerenderingchange", (function() {
            return e(n)
        }
        ), !0) : "complete" !== document.readyState ? addEventListener("load", (function() {
            return e(n)
        }
        ), !0) : setTimeout(n, 0)
    }, G = function(e, n) {
        n = n || {};
        var t = [800, 1800]
          , r = s("TTFB")
          , i = p(e, r, t, n.reportAllChanges);
        z((function() {
            var a = u();
            if (a) {
                if (r.value = Math.max(a.responseStart - f(), 0),
                r.value < 0 || r.value > performance.now())
                    return;
                r.entries = [a],
                i(!0),
                c((function() {
                    r = s("TTFB", 0),
                    (i = p(e, r, t, n.reportAllChanges))(!0)
                }
                ))
            }
        }
        ))
    };
    return e.getCLS = C,
    e.getFCP = y,
    e.getFID = I,
    e.getINP = _,
    e.getLCP = V,
    e.getTTFB = G,
    e.onCLS = C,
    e.onFCP = y,
    e.onFID = I,
    e.onINP = _,
    e.onLCP = V,
    e.onTTFB = G,
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e
}({});
