var TAFFY, exports, T;

(function() {
    "use strict";
    var typeList, makeTest, idx, typeKey, version, TC, idpad, cmax, API, protectJSON, each, eachin, isIndexable, returnFilter, runFilters, numcharsplit, orderByCol, run;
    if (!TAFFY) {
        version = "2.6.2";
        TC = 1;
        idpad = "000000";
        cmax = 1e3;
        API = {};
        protectJSON = function(t) {
            return TAFFY.isArray(t) || TAFFY.isObject(t) ? t : JSON.parse(t);
        };
        each = function(a, fun, u) {
            var r, i, x, y;
            if (a && (T.isArray(a) && 1 === a.length || !T.isArray(a))) fun(T.isArray(a) ? a[0] : a, 0); else for (r, 
            i, x = 0, a = T.isArray(a) ? a : [ a ], y = a.length; y > x; x++) {
                i = a[x];
                if (!T.isUndefined(i) || u || false) {
                    r = fun(i, x);
                    if (r === T.EXIT) break;
                }
            }
        };
        eachin = function(o, fun) {
            var r, i, x = 0;
            for (i in o) if (o.hasOwnProperty(i)) {
                r = fun(o[i], i, x++);
                if (r === T.EXIT) break;
            }
        };
        API.extend = function(m, f) {
            API[m] = function() {
                return f.apply(this, arguments);
            };
        };
        isIndexable = function(f) {
            var i;
            if (T.isString(f) && /[t][0-9]*[r][0-9]*/i.test(f)) return true;
            if (T.isObject(f) && f.___id && f.___s) return true;
            if (T.isArray(f)) {
                i = true;
                each(f, function(r) {
                    if (!isIndexable(r)) {
                        i = false;
                        return TAFFY.EXIT;
                    }
                });
                return i;
            }
            return false;
        };
        runFilters = function(r, filter) {
            var match = true;
            each(filter, function(mf) {
                switch (T.typeOf(mf)) {
                  case "function":
                    if (!mf.apply(r)) {
                        match = false;
                        return TAFFY.EXIT;
                    }
                    break;

                  case "array":
                    match = 1 === mf.length ? runFilters(r, mf[0]) : 2 === mf.length ? runFilters(r, mf[0]) || runFilters(r, mf[1]) : 3 === mf.length ? runFilters(r, mf[0]) || runFilters(r, mf[1]) || runFilters(r, mf[2]) : 4 === mf.length ? runFilters(r, mf[0]) || runFilters(r, mf[1]) || runFilters(r, mf[2]) || runFilters(r, mf[3]) : false;
                    mf.length > 4 && each(mf, function(f) {
                        runFilters(r, f) && (match = true);
                    });
                }
            });
            return match;
        };
        returnFilter = function(f) {
            var nf = [];
            T.isString(f) && /[t][0-9]*[r][0-9]*/i.test(f) && (f = {
                ___id: f
            });
            if (T.isArray(f)) {
                each(f, function(r) {
                    nf.push(returnFilter(r));
                });
                f = function() {
                    var that = this, match = false;
                    each(nf, function(f) {
                        runFilters(that, f) && (match = true);
                    });
                    return match;
                };
                return f;
            }
            if (T.isObject(f)) {
                T.isObject(f) && f.___id && f.___s && (f = {
                    ___id: f.___id
                });
                eachin(f, function(v, i) {
                    T.isObject(v) || (v = {
                        is: v
                    });
                    eachin(v, function(mtest, s) {
                        var looper, c = [];
                        looper = "hasAll" === s ? function(mtest, func) {
                            func(mtest);
                        } : each;
                        looper(mtest, function(mtest) {
                            var matchFunc, su = true;
                            matchFunc = function() {
                                var r, mvalue = this[i], eqeq = "==", bangeq = "!=", eqeqeq = "===", lt = "<", gt = ">", lteq = "<=", gteq = ">=", bangeqeq = "!==";
                                if (0 === s.indexOf("!") && s !== bangeq && s !== bangeqeq) {
                                    su = false;
                                    s = s.substring(1, s.length);
                                }
                                r = "regex" === s ? mtest.test(mvalue) : "lt" === s || s === lt ? mtest > mvalue : "gt" === s || s === gt ? mvalue > mtest : "lte" === s || s === lteq ? mtest >= mvalue : "gte" === s || s === gteq ? mvalue >= mtest : "left" === s ? 0 === mvalue.indexOf(mtest) : "leftnocase" === s ? 0 === mvalue.toLowerCase().indexOf(mtest.toLowerCase()) : "right" === s ? mvalue.substring(mvalue.length - mtest.length) === mtest : "rightnocase" === s ? mvalue.toLowerCase().substring(mvalue.length - mtest.length) === mtest.toLowerCase() : "like" === s ? mvalue.indexOf(mtest) >= 0 : "likenocase" === s ? mvalue.toLowerCase().indexOf(mtest.toLowerCase()) >= 0 : s === eqeqeq || "is" === s ? mvalue === mtest : s === eqeq ? mvalue == mtest : s === bangeqeq ? mvalue !== mtest : s === bangeq ? mvalue != mtest : "isnocase" === s ? mvalue.toLowerCase ? mvalue.toLowerCase() === mtest.toLowerCase() : mvalue === mtest : "has" === s ? T.has(mvalue, mtest) : "hasall" === s ? T.hasAll(mvalue, mtest) : -1 !== s.indexOf("is") || TAFFY.isNull(mvalue) || TAFFY.isUndefined(mvalue) || TAFFY.isObject(mtest) || TAFFY.isArray(mtest) ? T[s] && T.isFunction(T[s]) && 0 === s.indexOf("is") ? T[s](mvalue) === mtest : T[s] && T.isFunction(T[s]) ? T[s](mvalue, mtest) : false : mtest === mvalue[s];
                                r = r && !su ? false : r || su ? r : true;
                                return r;
                            };
                            c.push(matchFunc);
                        });
                        1 === c.length ? nf.push(c[0]) : nf.push(function() {
                            var that = this, match = false;
                            each(c, function(f) {
                                f.apply(that) && (match = true);
                            });
                            return match;
                        });
                    });
                });
                f = function() {
                    var that = this, match = true;
                    match = 1 !== nf.length || nf[0].apply(that) ? 2 !== nf.length || nf[0].apply(that) && nf[1].apply(that) ? 3 !== nf.length || nf[0].apply(that) && nf[1].apply(that) && nf[2].apply(that) ? 4 !== nf.length || nf[0].apply(that) && nf[1].apply(that) && nf[2].apply(that) && nf[3].apply(that) ? true : false : false : false : false;
                    nf.length > 4 && each(nf, function(f) {
                        runFilters(that, f) || (match = false);
                    });
                    return match;
                };
                return f;
            }
            if (T.isFunction(f)) return f;
        };
        orderByCol = function(ar, o) {
            var sortFunc = function(a, b) {
                var r = 0;
                T.each(o, function(sd) {
                    var o, col, dir, c, d;
                    o = sd.split(" ");
                    col = o[0];
                    dir = 1 === o.length ? "logical" : o[1];
                    if ("logical" === dir) {
                        c = numcharsplit(a[col]);
                        d = numcharsplit(b[col]);
                        T.each(c.length <= d.length ? c : d, function(x, i) {
                            if (c[i] < d[i]) {
                                r = -1;
                                return TAFFY.EXIT;
                            }
                            if (c[i] > d[i]) {
                                r = 1;
                                return TAFFY.EXIT;
                            }
                        });
                    } else if ("logicaldesc" === dir) {
                        c = numcharsplit(a[col]);
                        d = numcharsplit(b[col]);
                        T.each(c.length <= d.length ? c : d, function(x, i) {
                            if (c[i] > d[i]) {
                                r = -1;
                                return TAFFY.EXIT;
                            }
                            if (c[i] < d[i]) {
                                r = 1;
                                return TAFFY.EXIT;
                            }
                        });
                    } else {
                        if ("asec" === dir && a[col] < b[col]) {
                            r = -1;
                            return T.EXIT;
                        }
                        if ("asec" === dir && a[col] > b[col]) {
                            r = 1;
                            return T.EXIT;
                        }
                        if ("desc" === dir && a[col] > b[col]) {
                            r = -1;
                            return T.EXIT;
                        }
                        if ("desc" === dir && a[col] < b[col]) {
                            r = 1;
                            return T.EXIT;
                        }
                    }
                    0 === r && "logical" === dir && c.length < d.length ? r = -1 : 0 === r && "logical" === dir && c.length > d.length ? r = 1 : 0 === r && "logicaldesc" === dir && c.length > d.length ? r = -1 : 0 === r && "logicaldesc" === dir && c.length < d.length && (r = 1);
                    if (0 !== r) return T.EXIT;
                });
                return r;
            };
            return ar && ar.push ? ar.sort(sortFunc) : ar;
        };
        (function() {
            var cache = {}, cachcounter = 0;
            numcharsplit = function(thing) {
                if (cachcounter > cmax) {
                    cache = {};
                    cachcounter = 0;
                }
                return cache["_" + thing] || function() {
                    var x, xx, c, nthing = String(thing), na = [], rv = "_", rt = "";
                    for (x = 0, xx = nthing.length; xx > x; x++) {
                        c = nthing.charCodeAt(x);
                        if (c >= 48 && 57 >= c || 46 === c) {
                            if ("n" !== rt) {
                                rt = "n";
                                na.push(rv.toLowerCase());
                                rv = "";
                            }
                            rv += nthing.charAt(x);
                        } else {
                            if ("s" !== rt) {
                                rt = "s";
                                na.push(parseFloat(rv));
                                rv = "";
                            }
                            rv += nthing.charAt(x);
                        }
                    }
                    na.push("n" === rt ? parseFloat(rv) : rv.toLowerCase());
                    na.shift();
                    cache["_" + thing] = na;
                    cachcounter++;
                    return na;
                }();
            };
        })();
        run = function() {
            this.context({
                results: this.getDBI().query(this.context())
            });
        };
        API.extend("filter", function() {
            var nc = TAFFY.mergeObj(this.context(), {
                run: null
            }), nq = [];
            each(nc.q, function(v) {
                nq.push(v);
            });
            nc.q = nq;
            each(arguments, function(f) {
                nc.q.push(returnFilter(f));
                nc.filterRaw.push(f);
            });
            return this.getroot(nc);
        });
        API.extend("order", function(o) {
            o = o.split(",");
            var nc, x = [];
            each(o, function(r) {
                x.push(r.replace(/^\s*/, "").replace(/\s*$/, ""));
            });
            nc = TAFFY.mergeObj(this.context(), {
                sort: null
            });
            nc.order = x;
            return this.getroot(nc);
        });
        API.extend("limit", function(n) {
            var limitedresults, nc = TAFFY.mergeObj(this.context(), {});
            nc.limit = n;
            if (nc.run && nc.sort) {
                limitedresults = [];
                each(nc.results, function(i, x) {
                    if (x + 1 > n) return TAFFY.EXIT;
                    limitedresults.push(i);
                });
                nc.results = limitedresults;
            }
            return this.getroot(nc);
        });
        API.extend("start", function(n) {
            var limitedresults, nc = TAFFY.mergeObj(this.context(), {});
            nc.start = n;
            if (nc.run && nc.sort && !nc.limit) {
                limitedresults = [];
                each(nc.results, function(i, x) {
                    x + 1 > n && limitedresults.push(i);
                });
                nc.results = limitedresults;
            } else nc = TAFFY.mergeObj(this.context(), {
                run: null,
                start: n
            });
            return this.getroot(nc);
        });
        API.extend("update", function(arg0, arg1, arg2) {
            var that, runEvent = true, o = {}, args = arguments;
            if (!TAFFY.isString(arg0) || 2 !== arguments.length && 3 !== arguments.length) {
                o = arg0;
                2 === args.length && (runEvent = arg1);
            } else {
                o[arg0] = arg1;
                3 === arguments.length && (runEvent = arg2);
            }
            that = this;
            run.call(this);
            each(this.context().results, function(r) {
                var c = o;
                TAFFY.isFunction(c) ? c = c.apply(TAFFY.mergeObj(r, {})) : T.isFunction(c) && (c = c(TAFFY.mergeObj(r, {})));
                TAFFY.isObject(c) && that.getDBI().update(r.___id, c, runEvent);
            });
            this.context().results.length && this.context({
                run: null
            });
            return this;
        });
        API.extend("remove", function(runEvent) {
            var that = this, c = 0;
            run.call(this);
            each(this.context().results, function(r) {
                that.getDBI().remove(r.___id);
                c++;
            });
            if (this.context().results.length) {
                this.context({
                    run: null
                });
                that.getDBI().removeCommit(runEvent);
            }
            return c;
        });
        API.extend("count", function() {
            run.call(this);
            return this.context().results.length;
        });
        API.extend("callback", function(f, delay) {
            if (f) {
                var that = this;
                setTimeout(function() {
                    run.call(that);
                    f.call(that.getroot(that.context()));
                }, delay || 0);
            }
            return null;
        });
        API.extend("get", function() {
            run.call(this);
            return this.context().results;
        });
        API.extend("stringify", function() {
            return JSON.stringify(this.get());
        });
        API.extend("first", function() {
            run.call(this);
            return this.context().results[0] || false;
        });
        API.extend("last", function() {
            run.call(this);
            return this.context().results[this.context().results.length - 1] || false;
        });
        API.extend("sum", function() {
            var total = 0, that = this;
            run.call(that);
            each(arguments, function(c) {
                each(that.context().results, function(r) {
                    total += r[c];
                });
            });
            return total;
        });
        API.extend("min", function(c) {
            var lowest = null;
            run.call(this);
            each(this.context().results, function(r) {
                (null === lowest || lowest > r[c]) && (lowest = r[c]);
            });
            return lowest;
        });
        (function() {
            var innerJoinFunction = function() {
                var fnCompareList, fnCombineRow, fnMain;
                fnCompareList = function(left_row, right_row, arg_list) {
                    var data_lt, data_rt, op_code;
                    if (2 === arg_list.length) {
                        data_lt = left_row[arg_list[0]];
                        op_code = "===";
                        data_rt = right_row[arg_list[1]];
                    } else {
                        data_lt = left_row[arg_list[0]];
                        op_code = arg_list[1];
                        data_rt = right_row[arg_list[2]];
                    }
                    switch (op_code) {
                      case "===":
                        return data_lt === data_rt;

                      case "!==":
                        return data_lt !== data_rt;

                      case "<":
                        return data_rt > data_lt;

                      case ">":
                        return data_lt > data_rt;

                      case "<=":
                        return data_rt >= data_lt;

                      case ">=":
                        return data_lt >= data_rt;

                      case "==":
                        return data_lt == data_rt;

                      case "!=":
                        return data_lt != data_rt;

                      default:
                        throw String(op_code) + " is not supported";
                    }
                };
                fnCombineRow = function(left_row, right_row) {
                    var i, prefix, out_map = {};
                    for (i in left_row) left_row.hasOwnProperty(i) && (out_map[i] = left_row[i]);
                    for (i in right_row) if (right_row.hasOwnProperty(i) && "___id" !== i && "___s" !== i) {
                        prefix = TAFFY.isUndefined(out_map[i]) ? "" : "right_";
                        out_map[prefix + String(i)] = right_row[i];
                    }
                    return out_map;
                };
                fnMain = function(table) {
                    var right_table, i, arg_list = arguments, arg_length = arg_list.length, result_list = [];
                    if ("function" != typeof table.filter) {
                        if (!table.TAFFY) throw "TAFFY DB or result not supplied";
                        right_table = table();
                    } else right_table = table;
                    this.context({
                        results: this.getDBI().query(this.context())
                    });
                    TAFFY.each(this.context().results, function(left_row) {
                        right_table.each(function(right_row) {
                            var arg_data, is_ok = true;
                            CONDITION: for (i = 1; arg_length > i; i++) {
                                arg_data = arg_list[i];
                                is_ok = "function" == typeof arg_data ? arg_data(left_row, right_row) : "object" == typeof arg_data && arg_data.length ? fnCompareList(left_row, right_row, arg_data) : false;
                                if (!is_ok) break CONDITION;
                            }
                            is_ok && result_list.push(fnCombineRow(left_row, right_row));
                        });
                    });
                    return TAFFY(result_list)();
                };
                return fnMain;
            }();
            API.extend("join", innerJoinFunction);
        })();
        API.extend("max", function(c) {
            var highest = null;
            run.call(this);
            each(this.context().results, function(r) {
                (null === highest || r[c] > highest) && (highest = r[c]);
            });
            return highest;
        });
        API.extend("select", function() {
            var ra = [], args = arguments;
            run.call(this);
            1 === arguments.length ? each(this.context().results, function(r) {
                ra.push(r[args[0]]);
            }) : each(this.context().results, function(r) {
                var row = [];
                each(args, function(c) {
                    row.push(r[c]);
                });
                ra.push(row);
            });
            return ra;
        });
        API.extend("distinct", function() {
            var ra = [], args = arguments;
            run.call(this);
            1 === arguments.length ? each(this.context().results, function(r) {
                var v = r[args[0]], dup = false;
                each(ra, function(d) {
                    if (v === d) {
                        dup = true;
                        return TAFFY.EXIT;
                    }
                });
                dup || ra.push(v);
            }) : each(this.context().results, function(r) {
                var row = [], dup = false;
                each(args, function(c) {
                    row.push(r[c]);
                });
                each(ra, function(d) {
                    var ldup = true;
                    each(args, function(c, i) {
                        if (row[i] !== d[i]) {
                            ldup = false;
                            return TAFFY.EXIT;
                        }
                    });
                    if (ldup) {
                        dup = true;
                        return TAFFY.EXIT;
                    }
                });
                dup || ra.push(row);
            });
            return ra;
        });
        API.extend("supplant", function(template, returnarray) {
            var ra = [];
            run.call(this);
            each(this.context().results, function(r) {
                ra.push(template.replace(/\{([^\{\}]*)\}/g, function(a, b) {
                    var v = r[b];
                    return "string" == typeof v || "number" == typeof v ? v : a;
                }));
            });
            return returnarray ? ra : ra.join("");
        });
        API.extend("each", function(m) {
            run.call(this);
            each(this.context().results, m);
            return this;
        });
        API.extend("map", function(m) {
            var ra = [];
            run.call(this);
            each(this.context().results, function(r) {
                ra.push(m(r));
            });
            return ra;
        });
        T = function(d) {
            var DBI, runIndexes, root, TOb = [], ID = {}, RC = 1, settings = {
                template: false,
                onInsert: false,
                onUpdate: false,
                onRemove: false,
                onDBChange: false,
                storageName: false,
                forcePropertyCase: null,
                cacheSize: 100,
                name: ""
            }, dm = new Date(), CacheCount = 0, CacheClear = 0, Cache = {};
            runIndexes = function(indexes) {
                var records = [], UniqueEnforce = false;
                if (0 === indexes.length) return TOb;
                each(indexes, function(f) {
                    if (T.isString(f) && /[t][0-9]*[r][0-9]*/i.test(f) && TOb[ID[f]]) {
                        records.push(TOb[ID[f]]);
                        UniqueEnforce = true;
                    }
                    if (T.isObject(f) && f.___id && f.___s && TOb[ID[f.___id]]) {
                        records.push(TOb[ID[f.___id]]);
                        UniqueEnforce = true;
                    }
                    T.isArray(f) && each(f, function(r) {
                        each(runIndexes(r), function(rr) {
                            records.push(rr);
                        });
                    });
                });
                UniqueEnforce && records.length > 1 && (records = []);
                return records;
            };
            DBI = {
                dm: function(nd) {
                    if (nd) {
                        dm = nd;
                        Cache = {};
                        CacheCount = 0;
                        CacheClear = 0;
                    }
                    settings.onDBChange && setTimeout(function() {
                        settings.onDBChange.call(TOb);
                    }, 0);
                    settings.storageName && setTimeout(function() {
                        localStorage.setItem("taffy_" + settings.storageName, JSON.stringify(TOb));
                    });
                    return dm;
                },
                insert: function(i, runEvent) {
                    var columns = [], records = [], input = protectJSON(i);
                    each(input, function(v, i) {
                        var nv, o;
                        if (T.isArray(v) && 0 === i) {
                            each(v, function(av) {
                                columns.push("lower" === settings.forcePropertyCase ? av.toLowerCase() : "upper" === settings.forcePropertyCase ? av.toUpperCase() : av);
                            });
                            return true;
                        }
                        if (T.isArray(v)) {
                            nv = {};
                            each(v, function(av, ai) {
                                nv[columns[ai]] = av;
                            });
                            v = nv;
                        } else if (T.isObject(v) && settings.forcePropertyCase) {
                            o = {};
                            eachin(v, function(av, ai) {
                                o["lower" === settings.forcePropertyCase ? ai.toLowerCase() : "upper" === settings.forcePropertyCase ? ai.toUpperCase() : ai] = v[ai];
                            });
                            v = o;
                        }
                        RC++;
                        v.___id = "T" + String(idpad + TC).slice(-6) + "R" + String(idpad + RC).slice(-6);
                        v.___s = true;
                        records.push(v.___id);
                        settings.template && (v = T.mergeObj(settings.template, v));
                        TOb.push(v);
                        ID[v.___id] = TOb.length - 1;
                        settings.onInsert && (runEvent || TAFFY.isUndefined(runEvent)) && settings.onInsert.call(v);
                        DBI.dm(new Date());
                    });
                    return root(records);
                },
                sort: function(o) {
                    TOb = orderByCol(TOb, o.split(","));
                    ID = {};
                    each(TOb, function(r, i) {
                        ID[r.___id] = i;
                    });
                    DBI.dm(new Date());
                    return true;
                },
                update: function(id, changes, runEvent) {
                    var or, nr, tc, hasChange, nc = {};
                    if (settings.forcePropertyCase) {
                        eachin(changes, function(v, p) {
                            nc["lower" === settings.forcePropertyCase ? p.toLowerCase() : "upper" === settings.forcePropertyCase ? p.toUpperCase() : p] = v;
                        });
                        changes = nc;
                    }
                    or = TOb[ID[id]];
                    nr = T.mergeObj(or, changes);
                    tc = {};
                    hasChange = false;
                    eachin(nr, function(v, i) {
                        if (TAFFY.isUndefined(or[i]) || or[i] !== v) {
                            tc[i] = v;
                            hasChange = true;
                        }
                    });
                    if (hasChange) {
                        settings.onUpdate && (runEvent || TAFFY.isUndefined(runEvent)) && settings.onUpdate.call(nr, TOb[ID[id]], tc);
                        TOb[ID[id]] = nr;
                        DBI.dm(new Date());
                    }
                },
                remove: function(id) {
                    TOb[ID[id]].___s = false;
                },
                removeCommit: function(runEvent) {
                    var x;
                    for (x = TOb.length - 1; x > -1; x--) if (!TOb[x].___s) {
                        settings.onRemove && (runEvent || TAFFY.isUndefined(runEvent)) && settings.onRemove.call(TOb[x]);
                        ID[TOb[x].___id] = void 0;
                        TOb.splice(x, 1);
                    }
                    ID = {};
                    each(TOb, function(r, i) {
                        ID[r.___id] = i;
                    });
                    DBI.dm(new Date());
                },
                query: function(context) {
                    var returnq, cid, results, indexed, limitq, ni;
                    if (settings.cacheSize) {
                        cid = "";
                        each(context.filterRaw, function(r) {
                            if (T.isFunction(r)) {
                                cid = "nocache";
                                return TAFFY.EXIT;
                            }
                        });
                        "" === cid && (cid = JSON.stringify(T.mergeObj(context, {
                            q: false,
                            run: false,
                            sort: false
                        })));
                    }
                    if (!context.results || !context.run || context.run && DBI.dm() > context.run) {
                        results = [];
                        if (settings.cacheSize && Cache[cid]) {
                            Cache[cid].i = CacheCount++;
                            return Cache[cid].results;
                        }
                        if (0 === context.q.length && 0 === context.index.length) {
                            each(TOb, function(r) {
                                results.push(r);
                            });
                            returnq = results;
                        } else {
                            indexed = runIndexes(context.index);
                            each(indexed, function(r) {
                                (0 === context.q.length || runFilters(r, context.q)) && results.push(r);
                            });
                            returnq = results;
                        }
                    } else returnq = context.results;
                    !(context.order.length > 0) || context.run && context.sort || (returnq = orderByCol(returnq, context.order));
                    if (returnq.length && (context.limit && context.limit < returnq.length || context.start)) {
                        limitq = [];
                        each(returnq, function(r, i) {
                            if (!context.start || context.start && i + 1 >= context.start) if (context.limit) {
                                ni = context.start ? i + 1 - context.start : i;
                                if (context.limit > ni) limitq.push(r); else if (ni > context.limit) return TAFFY.EXIT;
                            } else limitq.push(r);
                        });
                        returnq = limitq;
                    }
                    if (settings.cacheSize && "nocache" !== cid) {
                        CacheClear++;
                        setTimeout(function() {
                            var bCounter, nc;
                            if (CacheClear >= 2 * settings.cacheSize) {
                                CacheClear = 0;
                                bCounter = CacheCount - settings.cacheSize;
                                nc = {};
                                eachin(function(r, k) {
                                    r.i >= bCounter && (nc[k] = r);
                                });
                                Cache = nc;
                            }
                        }, 0);
                        Cache[cid] = {
                            i: CacheCount++,
                            results: returnq
                        };
                    }
                    return returnq;
                }
            };
            root = function() {
                var iAPI, context;
                iAPI = TAFFY.mergeObj(TAFFY.mergeObj(API, {
                    insert: void 0
                }), {
                    getDBI: function() {
                        return DBI;
                    },
                    getroot: function(c) {
                        return root.call(c);
                    },
                    context: function(n) {
                        n && (context = TAFFY.mergeObj(context, n.hasOwnProperty("results") ? TAFFY.mergeObj(n, {
                            run: new Date(),
                            sort: new Date()
                        }) : n));
                        return context;
                    },
                    extend: void 0
                });
                context = this && this.q ? this : {
                    limit: false,
                    start: false,
                    q: [],
                    filterRaw: [],
                    index: [],
                    order: [],
                    results: false,
                    run: null,
                    sort: null,
                    settings: settings
                };
                each(arguments, function(f) {
                    isIndexable(f) ? context.index.push(f) : context.q.push(returnFilter(f));
                    context.filterRaw.push(f);
                });
                return iAPI;
            };
            TC++;
            d && DBI.insert(d);
            root.insert = DBI.insert;
            root.merge = function(i, key, runEvent) {
                var search = {}, finalSearch = [], obj = {};
                runEvent = runEvent || false;
                key = key || "id";
                each(i, function(o) {
                    var existingObject;
                    search[key] = o[key];
                    finalSearch.push(o[key]);
                    existingObject = root(search).first();
                    existingObject ? DBI.update(existingObject.___id, o, runEvent) : DBI.insert(o, runEvent);
                });
                obj[key] = finalSearch;
                return root(obj);
            };
            root.TAFFY = true;
            root.sort = DBI.sort;
            root.settings = function(n) {
                if (n) {
                    settings = TAFFY.mergeObj(settings, n);
                    n.template && root().update(n.template);
                }
                return settings;
            };
            root.store = function(n) {
                var i, r = false;
                if (localStorage) {
                    if (n) {
                        i = localStorage.getItem("taffy_" + n);
                        if (i && i.length > 0) {
                            root.insert(i);
                            r = true;
                        }
                        TOb.length > 0 && setTimeout(function() {
                            localStorage.setItem("taffy_" + settings.storageName, JSON.stringify(TOb));
                        });
                    }
                    root.settings({
                        storageName: n
                    });
                }
                return root;
            };
            return root;
        };
        TAFFY = T;
        T.each = each;
        T.eachin = eachin;
        T.extend = API.extend;
        TAFFY.EXIT = "TAFFYEXIT";
        TAFFY.mergeObj = function(ob1, ob2) {
            var c = {};
            eachin(ob1, function(v, n) {
                c[n] = ob1[n];
            });
            eachin(ob2, function(v, n) {
                c[n] = ob2[n];
            });
            return c;
        };
        TAFFY.has = function(var1, var2) {
            var n, re = true;
            if (var1.TAFFY) {
                re = var1(var2);
                return re.length > 0 ? true : false;
            }
            switch (T.typeOf(var1)) {
              case "object":
                if (T.isObject(var2)) eachin(var2, function(v, n) {
                    if (true !== re || T.isUndefined(var1[n]) || !var1.hasOwnProperty(n)) {
                        re = false;
                        return TAFFY.EXIT;
                    }
                    re = T.has(var1[n], var2[n]);
                }); else if (T.isArray(var2)) each(var2, function(v, n) {
                    re = T.has(var1, var2[n]);
                    if (re) return TAFFY.EXIT;
                }); else if (T.isString(var2)) return TAFFY.isUndefined(var1[var2]) ? false : true;
                return re;

              case "array":
                if (T.isObject(var2)) each(var1, function(v, i) {
                    re = T.has(var1[i], var2);
                    if (true === re) return TAFFY.EXIT;
                }); else if (T.isArray(var2)) each(var2, function(v2, i2) {
                    each(var1, function(v1, i1) {
                        re = T.has(var1[i1], var2[i2]);
                        if (true === re) return TAFFY.EXIT;
                    });
                    if (true === re) return TAFFY.EXIT;
                }); else if (T.isString(var2) || T.isNumber(var2)) for (n = 0; var1.length > n; n++) {
                    re = T.has(var1[n], var2);
                    if (re) return true;
                }
                return re;

              case "string":
                if (T.isString(var2) && var2 === var1) return true;
                break;

              default:
                if (T.typeOf(var1) === T.typeOf(var2) && var1 === var2) return true;
            }
            return false;
        };
        TAFFY.hasAll = function(var1, var2) {
            var ar, T = TAFFY;
            if (T.isArray(var2)) {
                ar = true;
                each(var2, function(v) {
                    ar = T.has(var1, v);
                    if (false === ar) return TAFFY.EXIT;
                });
                return ar;
            }
            return T.has(var1, var2);
        };
        TAFFY.typeOf = function(v) {
            var s = typeof v;
            "object" === s && (v ? "number" != typeof v.length || v.propertyIsEnumerable("length") || (s = "array") : s = "null");
            return s;
        };
        TAFFY.getObjectKeys = function(ob) {
            var kA = [];
            eachin(ob, function(n, h) {
                kA.push(h);
            });
            kA.sort();
            return kA;
        };
        TAFFY.isSameArray = function(ar1, ar2) {
            return TAFFY.isArray(ar1) && TAFFY.isArray(ar2) && ar1.join(",") === ar2.join(",") ? true : false;
        };
        TAFFY.isSameObject = function(ob1, ob2) {
            var T = TAFFY, rv = true;
            T.isObject(ob1) && T.isObject(ob2) ? T.isSameArray(T.getObjectKeys(ob1), T.getObjectKeys(ob2)) ? eachin(ob1, function(v, n) {
                if (!(T.isObject(ob1[n]) && T.isObject(ob2[n]) && T.isSameObject(ob1[n], ob2[n]) || T.isArray(ob1[n]) && T.isArray(ob2[n]) && T.isSameArray(ob1[n], ob2[n]) || ob1[n] === ob2[n])) {
                    rv = false;
                    return TAFFY.EXIT;
                }
            }) : rv = false : rv = false;
            return rv;
        };
        typeList = [ "String", "Number", "Object", "Array", "Boolean", "Null", "Function", "Undefined" ];
        makeTest = function(thisKey) {
            return function(data) {
                return TAFFY.typeOf(data) === thisKey.toLowerCase() ? true : false;
            };
        };
        for (idx = 0; typeList.length > idx; idx++) {
            typeKey = typeList[idx];
            TAFFY["is" + typeKey] = makeTest(typeKey);
        }
    }
})();

"object" == typeof exports && (exports.taffy = function(dbName, settings) {
    if (!dbName) throw "Invalid TaffyDb file";
    var db, taffFolder;
    if (settings && settings.taffFolder) taffFolder = settings.taffFolder; else {
        var parent = settings && settings.taffParentFolder ? settings.taffParentFolder : Ti.Filesystem.applicationDataDirectory;
        "/" !== parent.charAt(parent.length - 1) && (parent += "/");
        taffFolder = Ti.Filesystem.getFile(parent, "titaffydb");
        taffFolder.exists() || taffFolder.createDirectory();
        taffFolder = parent + "titaffydb";
    }
    var taffyFile = Ti.Filesystem.getFile(taffFolder, dbName.toUpperCase());
    if (taffyFile.exists()) try {
        var contents = taffyFile.read();
        if (null == contents) {
            db = TAFFY();
            return null;
        }
        db = TAFFY(JSON.parse(contents.text));
    } catch (err) {
        Ti.API.error("TaffyDb Load Error: " + err);
        throw "Invalid TaffyDb file";
    } else db = TAFFY();
    db.settings(settings || null);
    db.save = function() {
        taffyFile.write(JSON.stringify(db().get()));
    };
    if (settings && settings.autocommit) {
        var _onDBChange = settings.onDBChange || function() {};
        settings.onDBChange = function() {
            db.save();
            _onDBChange(this);
        };
        db.settings(settings);
    }
    return db;
});