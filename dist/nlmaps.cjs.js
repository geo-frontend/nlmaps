'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
  : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var hasOwnProperty = {}.hasOwnProperty;

var _has = function _has(it, key) {
  return hasOwnProperty.call(it, key);
};

var _fails = function _fails(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

var _core = createCommonjsModule(function (module) {
  var core = module.exports = {
    version: '2.5.3'
  };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _isObject = function _isObject(it) {
  return _typeof(it) === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function _anObject(it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var document$1 = _global.document; // typeof document.createElement is 'object' in old IE

var is = _isObject(document$1) && _isObject(document$1.createElement);

var _domCreate = function _domCreate(it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var _toPrimitive = function _toPrimitive(it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;
var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var _objectDp = {
  f: f
};

var _propertyDesc = function _propertyDesc(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var id = 0;
var px = Math.random();

var _uid = function _uid(key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid('src');
  var TO_STRING = 'toString';
  var $toString = Function[TO_STRING];
  var TPL = ('' + $toString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return $toString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

    if (O === _global) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      _hide(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      _hide(O, key, val);
    } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
});

var _aFunction = function _aFunction(it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

var _ctx = function _ctx(fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;

  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

    out = (own ? target : source)[key]; // bind timers to global for call from export context

    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out; // extend global

    if (target) _redefine(target, key, out, type & $export.U); // export

    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};

_global.core = _core; // type bitmap

$export.F = 1; // forced

$export.G = 2; // global

$export.S = 4; // static

$export.P = 8; // proto

$export.B = 16; // bind

$export.W = 32; // wrap

$export.U = 64; // safe

$export.R = 128; // real proto method for `library`

var _export = $export;

var _meta = createCommonjsModule(function (module) {
  var META = _uid('meta');
  var setDesc = _objectDp.f;
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var FREEZE = !_fails(function () {
    return isExtensible(Object.preventExtensions({}));
  });

  var setMeta = function setMeta(it) {
    setDesc(it, META, {
      value: {
        i: 'O' + ++id,
        // object ID
        w: {} // weak collections IDs

      }
    });
  };

  var fastKey = function fastKey(it, create) {
    // return primitive with prefix
    if (!_isObject(it)) return _typeof(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMeta(it); // return object ID
    }

    return it[META].i;
  };

  var getWeak = function getWeak(it, create) {
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMeta(it); // return hash weak collections IDs
    }

    return it[META].w;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function onFreeze(it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
    return it;
  };

  var meta = module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };
});

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

var _shared = function _shared(key) {
  return store[key] || (store[key] = {});
};

var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');
  var _Symbol = _global.Symbol;
  var USE_SYMBOL = typeof _Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
});

var def = _objectDp.f;
var TAG = _wks('toStringTag');

var _setToStringTag = function _setToStringTag(it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
    configurable: true,
    value: tag
  });
};

var f$1 = _wks;
var _wksExt = {
  f: f$1
};

var _library = false;

var defineProperty = _objectDp.f;

var _wksDefine = function _wksDefine(name) {
  var $Symbol = _core.Symbol || (_core.Symbol =  _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {
    value: _wksExt.f(name)
  });
};

var toString = {}.toString;

var _cof = function _cof(it) {
  return toString.call(it).slice(8, -1);
};

// eslint-disable-next-line no-prototype-builtins

var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function _defined(it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

var _toIobject = function _toIobject(it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;

var _toInteger = function _toInteger(it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

var min = Math.min;

var _toLength = function _toLength(it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

var _toAbsoluteIndex = function _toAbsoluteIndex(index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// true  -> Array#includes

var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }
    return !IS_INCLUDES && -1;
  };
};

var shared = _shared('keys');

var _sharedKey = function _sharedKey(key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function _objectKeysInternal(object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    if (key != IE_PROTO) _has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }

  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$2 = Object.getOwnPropertySymbols;
var _objectGops = {
  f: f$2
};

var f$3 = {}.propertyIsEnumerable;
var _objectPie = {
  f: f$3
};

var _enumKeys = function _enumKeys(it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;

  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;

    while (symbols.length > i) {
      if (isEnum.call(it, key = symbols[i++])) result.push(key);
    }
  }

  return result;
};

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;

  while (length > i) {
    _objectDp.f(O, P = keys[i++], Properties[P]);
  }

  return O;
};

var document$2 = _global.document;

var _html = document$2 && document$2.documentElement;

var IE_PROTO$1 = _sharedKey('IE_PROTO');

var Empty = function Empty() {
  /* empty */
};

var PROTOTYPE$1 = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);

  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;

  while (i--) {
    delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];
  }

  return _createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO$1] = O;
  } else result = _createDict();

  return Properties === undefined ? result : _objectDps(result, Properties);
};

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
  f: f$4
};

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;
var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function getWindowNames(it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
  f: f$5
};

var gOPD = Object.getOwnPropertyDescriptor;
var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) {
    /* empty */
  }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};
var _objectGopd = {
  f: f$6
};

var META = _meta.KEY;
var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;

var _stringify = $JSON && $JSON.stringify;

var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function get() {
      return dP$1(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
} : dP$1;

var wrap = function wrap(tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);

  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
  return _typeof(it) == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);

  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, {
        enumerable: _propertyDesc(0, false)
      });
    }

    return setSymbolDesc(it, key, D);
  }

  return dP$1(it, key, D);
};

var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;

  while (l > i) {
    $defineProperty(it, key = keys[i++], P[key]);
  }

  return it;
};

var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};

var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};

var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;

  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  }

  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;

  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  }

  return result;
}; // 19.4.1.1 Symbol([description])


if (!USE_NATIVE) {
  $Symbol = function _Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);

    var $set = function $set(value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };

    if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: $set
    });
    return wrap(tag);
  };

  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });
  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, {
  Symbol: $Symbol
});

for (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
  _wks(es6Symbols[j++]);
}

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) {
  _wksDefine(wellKnownSymbols[k++]);
}

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function _for(key) {
    return _has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

    for (var key in SymbolRegistry) {
      if (SymbolRegistry[key] === sym) return key;
    }
  },
  useSetter: function useSetter() {
    setter = true;
  },
  useSimple: function useSimple() {
    setter = false;
  }
});
_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // 24.3.2 JSON.stringify(value [, replacer [, space]])

$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol(); // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols

  return _stringify([S]) != '[null]' || _stringify({
    a: S
  }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;

    while (arguments.length > i) {
      args.push(arguments[i++]);
    }

    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

    if (!_isArray(replacer)) replacer = function replacer(key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
}); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)

$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]

_setToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]

_setToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]

_setToStringTag(_global.JSON, 'JSON', true);

_export(_export.S, 'Object', {
  create: _objectCreate
});

_export(_export.S + _export.F * !_descriptors, 'Object', {
  defineProperty: _objectDp.f
});

_export(_export.S + _export.F * !_descriptors, 'Object', {
  defineProperties: _objectDps
});

var _objectSap = function _objectSap(KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () {
    fn(1);
  }), 'Object', exp);
};

var $getOwnPropertyDescriptor$1 = _objectGopd.f;
_objectSap('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
  };
});

var _toObject = function _toObject(it) {
  return Object(_defined(it));
};

var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto$1 = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectProto$1 : null;
};

_objectSap('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

_objectSap('getOwnPropertyNames', function () {
  return _objectGopnExt.f;
});

var meta = _meta.onFreeze;
_objectSap('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
  };
});

var meta$1 = _meta.onFreeze;
_objectSap('seal', function ($seal) {
  return function seal(it) {
    return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
  };
});

var meta$2 = _meta.onFreeze;
_objectSap('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
  };
});

_objectSap('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

_objectSap('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

_objectSap('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;

  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }

  return T;
} : $assign;

_export(_export.S + _export.F, 'Object', {
  assign: _objectAssign
});

// 7.2.9 SameValue(x, y)
var _sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

_export(_export.S, 'Object', {
  is: _sameValue
});

/* eslint-disable no-proto */

var check = function check(O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};

var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }

    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};

_export(_export.S, 'Object', {
  setPrototypeOf: _setProto.set
});

var TAG$1 = _wks('toStringTag'); // ES3 wrong here

var ARG = _cof(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {
    /* empty */
  }
};

var _classof = function _classof(it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T // builtinTag case
  : ARG ? _cof(O) // ES3 arguments fallback
  : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var test = {};
test[_wks('toStringTag')] = 'z';

if (test + '' != '[object z]') {
  _redefine(Object.prototype, 'toString', function toString() {
    return '[object ' + _classof(this) + ']';
  }, true);
}

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function _invoke(fn, args, that) {
  var un = that === undefined;

  switch (args.length) {
    case 0:
      return un ? fn() : fn.call(that);

    case 1:
      return un ? fn(args[0]) : fn.call(that, args[0]);

    case 2:
      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

    case 3:
      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

    case 4:
      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
  }

  return fn.apply(that, args);
};

var arraySlice = [].slice;
var factories = {};

var construct = function construct(F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) {
      n[i] = 'a[' + i + ']';
    } // eslint-disable-next-line no-new-func


    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }

  return factories[len](F, args);
};

var _bind = Function.bind || function bind(that
/* , ...args */
) {
  var fn = _aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);

  var bound = function bound()
  /* args... */
  {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
  };

  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

_export(_export.P, 'Function', {
  bind: _bind
});

var dP$2 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // 19.2.4.2 name

NAME in FProto || _descriptors && dP$2(FProto, NAME, {
  configurable: true,
  get: function get() {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

var HAS_INSTANCE = _wks('hasInstance');
var FunctionProto = Function.prototype; // 19.2.3.6 Function.prototype[@@hasInstance](V)

if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, {
  value: function value(O) {
    if (typeof this != 'function' || !_isObject(O)) return false;
    if (!_isObject(this.prototype)) return O instanceof this; // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:

    while (O = _objectGpo(O)) {
      if (this.prototype === O) return true;
    }

    return false;
  }
});

var _stringWs = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

var space = '[' + _stringWs + ']';
var non = "\u200B\x85";
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function exporter(KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = _fails(function () {
    return !!_stringWs[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  _export(_export.P + _export.F * FORCE, 'String', exp);
}; // 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim


var trim = exporter.trim = function (string, TYPE) {
  string = String(_defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

var _stringTrim = exporter;

var $parseInt = _global.parseInt;
var $trim = _stringTrim.trim;
var hex = /^[-+]?0[xX]/;

var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
} : $parseInt;

_export(_export.G + _export.F * (parseInt != _parseInt), {
  parseInt: _parseInt
});

var $parseFloat = _global.parseFloat;
var $trim$1 = _stringTrim.trim;

var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim$1(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

_export(_export.G + _export.F * (parseFloat != _parseFloat), {
  parseFloat: _parseFloat
});

var setPrototypeOf = _setProto.set;

var _inheritIfRequired = function _inheritIfRequired(that, target, C) {
  var S = target.constructor;
  var P;

  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  }

  return that;
};

var gOPN$2 = _objectGopn.f;
var gOPD$2 = _objectGopd.f;
var dP$3 = _objectDp.f;
var $trim$2 = _stringTrim.trim;
var NUMBER = 'Number';
var $Number = _global[NUMBER];
var Base = $Number;
var proto = $Number.prototype; // Opera ~12 has broken Object#toString

var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
var TRIM = ('trim' in String.prototype); // 7.1.3 ToNumber(argument)

var toNumber = function toNumber(argument) {
  var it = _toPrimitive(argument, false);

  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim$2(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal /^0o[0-7]+$/i

        default:
          return +it;
      }

      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number // check on 1..constructor(foo) case
    && (BROKEN_COF ? _fails(function () {
      proto.valueOf.call(that);
    }) : _cof(that) != NUMBER) ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };

  for (var keys = _descriptors ? gOPN$2(Base) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES6 (in case, if modules with ES6 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
    if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
      dP$3($Number, key, gOPD$2(Base, key));
    }
  }

  $Number.prototype = proto;
  proto.constructor = $Number;
  _redefine(_global, NUMBER, $Number);
}

var _aNumberValue = function _aNumberValue(it, msg) {
  if (typeof it != 'number' && _cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

var _stringRepeat = function repeat(count) {
  var str = String(_defined(this));
  var res = '';
  var n = _toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");

  for (; n > 0; (n >>>= 1) && (str += str)) {
    if (n & 1) res += str;
  }

  return res;
};

var $toFixed = 1.0.toFixed;
var floor$1 = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function multiply(n, c) {
  var i = -1;
  var c2 = c;

  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor$1(c2 / 1e7);
  }
};

var divide = function divide(n) {
  var i = 6;
  var c = 0;

  while (--i >= 0) {
    c += data[i];
    data[i] = floor$1(c / n);
    c = c % n * 1e7;
  }
};

var numToString = function numToString() {
  var i = 6;
  var s = '';

  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
    }
  }

  return s;
};

var pow = function pow(x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function log(x) {
  var n = 0;
  var x2 = x;

  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }

  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }

  return n;
};

_export(_export.P + _export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !_fails(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = _aNumberValue(this, ERROR);
    var f = _toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR); // eslint-disable-next-line no-self-compare

    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);

    if (x < 0) {
      s = '-';
      x = -x;
    }

    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;

      if (e > 0) {
        multiply(0, z);
        j = f;

        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }

        multiply(pow(10, j, 1), 0);
        j = e - 1;

        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }

        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + _stringRepeat.call(ZERO, f);
      }
    }

    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    }

    return m;
  }
});

var $toPrecision = 1.0.toPrecision;
_export(_export.P + _export.F * (_fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !_fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

_export(_export.S, 'Number', {
  EPSILON: Math.pow(2, -52)
});

var _isFinite = _global.isFinite;
_export(_export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

var floor$2 = Math.floor;

var _isInteger = function isInteger(it) {
  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
};

_export(_export.S, 'Number', {
  isInteger: _isInteger
});

_export(_export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

var abs = Math.abs;
_export(_export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

_export(_export.S, 'Number', {
  MAX_SAFE_INTEGER: 0x1fffffffffffff
});

_export(_export.S, 'Number', {
  MIN_SAFE_INTEGER: -0x1fffffffffffff
});

_export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', {
  parseFloat: _parseFloat
});

_export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', {
  parseInt: _parseInt
});

// 20.2.2.20 Math.log1p(x)
var _mathLog1p = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

var sqrt = Math.sqrt;
var $acosh = Math.acosh;
_export(_export.S + _export.F * !($acosh // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
&& Math.floor($acosh(Number.MAX_VALUE)) == 710 // Tor Browser bug: Math.acosh(Infinity) -> NaN
&& $acosh(Infinity) == Infinity), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
} // Tor Browser bug: Math.asinh(0) -> -0


_export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {
  asinh: asinh
});

var $atanh = Math.atanh; // Tor Browser bug: Math.atanh(-0) -> 0

_export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

// 20.2.2.28 Math.sign(x)
var _mathSign = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

_export(_export.S, 'Math', {
  cbrt: function cbrt(x) {
    return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

_export(_export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

var exp = Math.exp;
_export(_export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;

var _mathExpm1 = !$expm1 // Old FF bug
|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168 // Tor Browser bug
|| $expm1(-2e-17) != -2e-17 ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

_export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', {
  expm1: _mathExpm1
});

var pow$1 = Math.pow;
var EPSILON = pow$1(2, -52);
var EPSILON32 = pow$1(2, -23);
var MAX32 = pow$1(2, 127) * (2 - EPSILON32);
var MIN32 = pow$1(2, -126);

var roundTiesToEven = function roundTiesToEven(n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

var _mathFround = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = _mathSign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs); // eslint-disable-next-line no-self-compare

  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

_export(_export.S, 'Math', {
  fround: _mathFround
});

var abs$1 = Math.abs;
_export(_export.S, 'Math', {
  hypot: function hypot(value1, value2) {
    // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;

    while (i < aLen) {
      arg = abs$1(arguments[i++]);

      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }

    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

var $imul = Math.imul; // some WebKit versions fails with big numbers, some has wrong arity

_export(_export.S + _export.F * _fails(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

_export(_export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

_export(_export.S, 'Math', {
  log1p: _mathLog1p
});

_export(_export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

_export(_export.S, 'Math', {
  sign: _mathSign
});

var exp$1 = Math.exp; // V8 near Chromium 38 has a problem with very small numbers

_export(_export.S + _export.F * _fails(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1 ? (_mathExpm1(x) - _mathExpm1(-x)) / 2 : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
  }
});

var exp$2 = Math.exp;
_export(_export.S, 'Math', {
  tanh: function tanh(x) {
    var a = _mathExpm1(x = +x);
    var b = _mathExpm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
  }
});

_export(_export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint; // length should be 1, old FF problem

_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) {
    // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;

    while (aLen > i) {
      code = +arguments[i++];
      if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
    }

    return res.join('');
  }
});

_export(_export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = _toIobject(callSite.raw);
    var len = _toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;

    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    }

    return res.join('');
  }
});

_stringTrim('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

// false -> String#codePointAt

var _stringAt = function _stringAt(TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _iterators = {};

var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

_hide(IteratorPrototype, _wks('iterator'), function () {
  return this;
});

var _iterCreate = function _iterCreate(Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, {
    next: _propertyDesc(1, next)
  });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);

  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];

    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };

      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }

    return function entries() {
      return new Constructor(this, kind);
    };
  };

  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = !BUGGY && $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype; // Fix native

  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));

    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

      if ( !_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;

    $default = function values() {
      return $native.call(this);
    };
  } // Define iterator


  if ( (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  } // Plug for library


  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;

  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }

  return methods;
};

var $at = _stringAt(true); // 21.1.3.27 String.prototype[@@iterator]()

_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target

  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return {
    value: undefined,
    done: true
  };
  point = $at(O, index);
  this._i += point.length;
  return {
    value: point,
    done: false
  };
});

var $at$1 = _stringAt(false);
_export(_export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at$1(this, pos);
  }
});

var MATCH = _wks('match');

var _isRegexp = function _isRegexp(it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

var _stringContext = function _stringContext(that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');

var _failsIsRegexp = function _failsIsRegexp(KEY) {
  var re = /./;

  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) {
      /* empty */
    }
  }

  return true;
};

var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];
_export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString
  /* , endPosition = @length */
  ) {
    var that = _stringContext(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = _toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
  }
});

var INCLUDES = 'includes';
_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~_stringContext(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_export(_export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: _stringRepeat
});

var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];
_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString
  /* , position = 0 */
  ) {
    var that = _stringContext(this, searchString, STARTS_WITH);
    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});

var quot = /"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)

var createHTML = function createHTML(string, tag, attribute, value) {
  var S = String(_defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

var _stringHtml = function _stringHtml(NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  _export(_export.P + _export.F * _fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

_stringHtml('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

_stringHtml('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

_stringHtml('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

_stringHtml('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

_stringHtml('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

_stringHtml('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

_stringHtml('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

_stringHtml('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

_stringHtml('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

_stringHtml('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

_stringHtml('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

_stringHtml('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

_stringHtml('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

_export(_export.S, 'Date', {
  now: function now() {
    return new Date().getTime();
  }
});

_export(_export.P + _export.F * _fails(function () {
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({
    toISOString: function toISOString() {
      return 1;
    }
  }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = _toObject(this);
    var pv = _toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function lz(num) {
  return num > 9 ? num : '0' + num;
}; // PhantomJS / old WebKit has a broken implementations


var _dateToIsoString = _fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !_fails(function () {
  $toISOString.call(new Date(NaN));
}) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

// PhantomJS / old WebKit has a broken implementations

_export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
  toISOString: _dateToIsoString
});

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime$1 = DateProto.getTime;

if (new Date(NaN) + '' != INVALID_DATE) {
  _redefine(DateProto, TO_STRING, function toString() {
    var value = getTime$1.call(this); // eslint-disable-next-line no-self-compare

    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

var NUMBER$1 = 'number';

var _dateToPrimitive = function _dateToPrimitive(hint) {
  if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
  return _toPrimitive(_anObject(this), hint != NUMBER$1);
};

var TO_PRIMITIVE$1 = _wks('toPrimitive');
var proto$1 = Date.prototype;
if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

_export(_export.S, 'Array', {
  isArray: _isArray
});

var _iterCall = function _iterCall(iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function _isArrayIter(it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var _createProperty = function _createProperty(object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else object[index] = value;
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || _iterators[_classof(it)];
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();

  riter['return'] = function () {
    SAFE_CLOSING = true;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {
  /* empty */
}

var _iterDetect = function _iterDetect(exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;

  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();

    iter.next = function () {
      return {
        done: safe = true
      };
    };

    arr[ITERATOR$3] = function () {
      return iter;
    };

    exec(arr);
  } catch (e) {
    /* empty */
  }

  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) {
  Array.from(iter);
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);

      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }

    result.length = index;
    return result;
  }
});

_export(_export.S + _export.F * _fails(function () {
  function F() {
    /* empty */
  }

  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of()
  /* ...args */
  {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);

    while (aLen > index) {
      _createProperty(result, index, arguments[index++]);
    }

    result.length = aLen;
    return result;
  }
});

var _strictMethod = function _strictMethod(method, arg) {
  return !!method && _fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () {
      /* empty */
    }, 1) : method.call(null);
  });
};

var arrayJoin = [].join; // fallback for not array-like strings

_export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
  }
});

var arraySlice$1 = [].slice; // fallback for not array-like ES3 strings and DOM objects

_export(_export.P + _export.F * _fails(function () {
  if (_html) arraySlice$1.call(_html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = _toLength(this.length);
    var klass = _cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
    var start = _toAbsoluteIndex(begin, len);
    var upTo = _toAbsoluteIndex(end, len);
    var size = _toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;

    for (; i < size; i++) {
      cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
    }

    return cloned;
  }
});

var $sort = [].sort;
var test$1 = [1, 2, 3];
_export(_export.P + _export.F * (_fails(function () {
  // IE8-
  test$1.sort(undefined);
}) || !_fails(function () {
  // V8 bug
  test$1.sort(null); // Old WebKit
}) || !_strictMethod($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined ? $sort.call(_toObject(this)) : $sort.call(_toObject(this), _aFunction(comparefn));
  }
});

var SPECIES = _wks('species');

var _arraySpeciesConstructor = function _arraySpeciesConstructor(original) {
  var C;

  if (_isArray(original)) {
    C = original.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;

    if (_isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array : C;
};

var _arraySpeciesCreate = function _arraySpeciesCreate(original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex

var _arrayMethods = function _arrayMethods(TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;

    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);

        if (TYPE) {
          if (IS_MAP) result[index] = res; // map
          else if (res) switch (TYPE) {
              case 3:
                return true;
              // some

              case 5:
                return val;
              // find

              case 6:
                return index;
              // findIndex

              case 2:
                result.push(val);
              // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var $forEach = _arrayMethods(0);
var STRICT = _strictMethod([].forEach, true);
_export(_export.P + _export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

var $map = _arrayMethods(1);
_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments[1]);
  }
});

var $filter = _arrayMethods(2);
_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

var $some = _arrayMethods(3);
_export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn
  /* , thisArg */
  ) {
    return $some(this, callbackfn, arguments[1]);
  }
});

var $every = _arrayMethods(4);
_export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn
  /* , thisArg */
  ) {
    return $every(this, callbackfn, arguments[1]);
  }
});

var _arrayReduce = function _arrayReduce(that, callbackfn, aLen, memo, isRight) {
  _aFunction(callbackfn);
  var O = _toObject(that);
  var self = _iobject(O);
  var length = _toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }

    index += i;

    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }

  for (; isRight ? index >= 0 : length > index; index += i) {
    if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
  }

  return memo;
};

_export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

_export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn
  /* , initialValue */
  ) {
    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

var $indexOf = _arrayIncludes(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
  }
});

var $native$1 = [].lastIndexOf;
var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;
_export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement
  /* , fromIndex = @[*-1] */
  ) {
    // convert -0 to +0
    if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;
    var O = _toIobject(this);
    var length = _toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
    if (index < 0) index = length + index;

    for (; index >= 0; index--) {
      if (index in O) if (O[index] === searchElement) return index || 0;
    }

    return -1;
  }
});

var _arrayCopyWithin = [].copyWithin || function copyWithin(target
/* = 0 */
, start
/* = 0, end = @length */
) {
  var O = _toObject(this);
  var len = _toLength(O.length);
  var to = _toAbsoluteIndex(target, len);
  var from = _toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;

  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }

  while (count-- > 0) {
    if (from in O) O[to] = O[from];else delete O[to];
    to += inc;
    from += inc;
  }

  return O;
};

var UNSCOPABLES = _wks('unscopables');
var ArrayProto$1 = Array.prototype;
if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});

var _addToUnscopables = function _addToUnscopables(key) {
  ArrayProto$1[UNSCOPABLES][key] = true;
};

_export(_export.P, 'Array', {
  copyWithin: _arrayCopyWithin
});
_addToUnscopables('copyWithin');

var _arrayFill = function fill(value
/* , start = 0, end = @length */
) {
  var O = _toObject(this);
  var length = _toLength(O.length);
  var aLen = arguments.length;
  var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);

  while (endPos > index) {
    O[index++] = value;
  }

  return O;
};

_export(_export.P, 'Array', {
  fill: _arrayFill
});
_addToUnscopables('fill');

var $find = _arrayMethods(5);
var KEY = 'find';
var forced = true; // Shouldn't skip holes

if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
_export(_export.P + _export.F * forced, 'Array', {
  find: function find(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

var $find$1 = _arrayMethods(6);
var KEY$1 = 'findIndex';
var forced$1 = true; // Shouldn't skip holes

if (KEY$1 in []) Array(1)[KEY$1](function () {
  forced$1 = false;
});
_export(_export.P + _export.F * forced$1, 'Array', {
  findIndex: function findIndex(callbackfn
  /* , that = undefined */
  ) {
    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY$1);

var SPECIES$1 = _wks('species');

var _setSpecies = function _setSpecies(KEY) {
  var C = _global[KEY];
  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

_setSpecies('Array');

var _iterStep = function _iterStep(done, value) {
  return {
    value: value,
    done: !!done
  };
};

// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()


var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target

  this._i = 0; // next index

  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;

  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }

  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

_iterators.Arguments = _iterators.Array;
_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var _flags = function _flags() {
  var that = _anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var dP$4 = _objectDp.f;
var gOPN$3 = _objectGopn.f;
var $RegExp = _global.RegExp;
var Base$1 = $RegExp;
var proto$2 = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g; // "new" creates a new object, old webkit buggy here

var CORRECT_NEW = new $RegExp(re1) !== re1;

if (_descriptors && (!CORRECT_NEW || _fails(function () {
  re2[_wks('match')] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = _isRegexp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : _inheritIfRequired(CORRECT_NEW ? new Base$1(piRE && !fiU ? p.source : p, f) : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f), tiRE ? this : proto$2, $RegExp);
  };

  var proxy = function proxy(key) {
    key in $RegExp || dP$4($RegExp, key, {
      configurable: true,
      get: function get() {
        return Base$1[key];
      },
      set: function set(it) {
        Base$1[key] = it;
      }
    });
  };

  for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) {
    proxy(keys$1[i++]);
  }

  proto$2.constructor = $RegExp;
  $RegExp.prototype = proto$2;
  _redefine(_global, 'RegExp', $RegExp);
}

_setSpecies('RegExp');

if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _flags
});

var TO_STRING$1 = 'toString';
var $toString$1 = /./[TO_STRING$1];

var define = function define(fn) {
  _redefine(RegExp.prototype, TO_STRING$1, fn, true);
}; // 21.2.5.14 RegExp.prototype.toString()


if (_fails(function () {
  return $toString$1.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
})) {
  define(function toString() {
    var R = _anObject(this);
    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
  }); // FF44- RegExp#toString has a wrong name
} else if ($toString$1.name != TO_STRING$1) {
  define(function toString() {
    return $toString$1.call(this);
  });
}

var _fixReWks = function _fixReWks(KEY, length, exec) {
  var SYMBOL = _wks(KEY);
  var fns = exec(_defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];

  if (_fails(function () {
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  })) {
    _redefine(String.prototype, KEY, strfn);
    _hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return rxfn.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return rxfn.call(string, this);
    });
  }
};

_fixReWks('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {

    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

_fixReWks('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {

    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

_fixReWks('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {

    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

_fixReWks('split', 2, function (defined, SPLIT, $split) {

  var isRegExp = _isRegexp;
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';

  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it

    $split = function $split(separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i; // Doesn't need flags gy, but they don't hurt

      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);

      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index)); // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func

          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }

        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }

      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    }; // Chakra, V8

  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function $split(separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  } // 21.1.3.17 String.prototype.split(separator, limit)


  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

var _anInstance = function _anInstance(it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }

  return it;
};

var _forOf = createCommonjsModule(function (module) {
  var BREAK = {};
  var RETURN = {};

  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () {
      return iterable;
    } : core_getIteratorMethod(iterable);
    var f = _ctx(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!'); // fast case for arrays with default iterator

    if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
      result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      if (result === BREAK || result === RETURN) return result;
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      result = _iterCall(iterator, f, step.value, entries);
      if (result === BREAK || result === RETURN) return result;
    }
  };

  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
});

var SPECIES$2 = _wks('species');

var _speciesConstructor = function _speciesConstructor(O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES$2]) == undefined ? D : _aFunction(S);
};

var process = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function run() {
  var id = +this; // eslint-disable-next-line no-prototype-builtins

  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var listener = function listener(event) {
  run.call(event.data);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;

    while (arguments.length > i) {
      args.push(arguments[i++]);
    }

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };

    defer(counter);
    return counter;
  };

  clearTask = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (_cof(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(_ctx(run, id, 1));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(_ctx(run, id, 1));
    }; // Browsers with MessageChannel, includes WebWorkers

  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
    defer = function defer(id) {
      _global.postMessage(id + '', '*');
    };

    _global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function defer(id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    }; // Rest old browsers

  } else {
    defer = function defer(id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}

var _task = {
  set: setTask,
  clear: clearTask
};

var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$1 = _global.process;
var Promise$1 = _global.Promise;
var isNode = _cof(process$1) == 'process';

var _microtask = function _microtask() {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode && (parent = process$1.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (e) {
        if (head) notify();else last = undefined;
        throw e;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // Node.js


  if (isNode) {
    notify = function notify() {
      process$1.nextTick(flush);
    }; // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339

  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, {
      characterData: true
    }); // eslint-disable-line no-new

    notify = function notify() {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (Promise$1 && Promise$1.resolve) {
    var promise = Promise$1.resolve();

    notify = function notify() {
      promise.then(flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function (fn) {
    var task = {
      fn: fn,
      next: undefined
    };
    if (last) last.next = task;

    if (!head) {
      head = task;
      notify();
    }

    last = task;
  };
};

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

var f$7 = function f(C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
  f: f$7
};

var _perform = function _perform(exec) {
  try {
    return {
      e: false,
      v: exec()
    };
  } catch (e) {
    return {
      e: true,
      v: e
    };
  }
};

var _promiseResolve = function _promiseResolve(C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var _redefineAll = function _redefineAll(target, src, safe) {
  for (var key in src) {
    _redefine(target, key, src[key], safe);
  }

  return target;
};

var task = _task.set;
var microtask = _microtask();
var PROMISE = 'Promise';
var TypeError$1 = _global.TypeError;
var process$2 = _global.process;
var $Promise = _global[PROMISE];
var isNode$1 = _classof(process$2) == 'process';

var empty = function empty() {
  /* empty */
};

var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;
var USE_NATIVE$1 = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);

    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    }; // unhandled rejections tracking support, NodeJS Promise without it fails @@species test


    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) {
    /* empty */
  }
}(); // helpers

var isThenable = function isThenable(it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function notify(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;

    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;

      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }

          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };

    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach


    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};

var onUnhandled = function onUnhandled(promise) {
  task.call(_global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;

    if (unhandled) {
      result = _perform(function () {
        if (isNode$1) {
          process$2.emit('unhandledRejection', value, promise);
        } else if (handler = _global.onunhandledrejection) {
          handler({
            promise: promise,
            reason: value
          });
        } else if ((console = _global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    }

    promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};

var isUnhandled = function isUnhandled(promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};

var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(_global, function () {
    var handler;

    if (isNode$1) {
      process$2.emit('rejectionHandled', promise);
    } else if (handler = _global.onrejectionhandled) {
      handler({
        promise: promise,
        reason: promise._v
      });
    }
  });
};

var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap

  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};

var $resolve = function $resolve(value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap

  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");

    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = {
          _w: promise,
          _d: false
        }; // wrap

        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({
      _w: promise,
      _d: false
    }, e); // wrap
  }
}; // constructor polyfill


if (!USE_NATIVE$1) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);

    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  }; // eslint-disable-next-line no-unused-vars


  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions

    this._a = undefined; // <- checked in isUnhandled reactions

    this._s = 0; // <- state

    this._d = false; // <- done

    this._v = undefined; // <- value

    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled

    this._n = false; // <- notify
  };

  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode$1 ? process$2.domain : undefined;

      this._c.push(reaction);

      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };

  _newPromiseCapability.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, {
  Promise: $Promise
});
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE]; // statics

_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * ( !USE_NATIVE$1), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve( this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = _perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      _forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = _perform(function () {
      _forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

var _validateCollection = function _validateCollection(it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$5 = _objectDp.f;
var fastKey = _meta.fastKey;
var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function getEntry(that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index]; // frozen object case

  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type

      that._i = _objectCreate(null); // index

      that._f = undefined; // first entry

      that._l = undefined; // last entry

      that[SIZE] = 0; // size

      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }

        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function _delete(key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);

        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }

        return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn
      /* , that = undefined */
      ) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;

        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this); // revert to the last existing entry

          while (entry && entry.r) {
            entry = entry.p;
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$5(C.prototype, 'size', {
      get: function get() {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index; // change existing entry

    if (entry) {
      entry.v = value; // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true),
        // <- index
        k: key,
        // <- key
        v: value,
        // <- value
        p: prev = that._l,
        // <- previous entry
        n: undefined,
        // <- next entry
        r: false // <- removed

      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++; // add to index

      if (index !== 'F') that._i[index] = entry;
    }

    return that;
  },
  getEntry: getEntry,
  setStrong: function setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target

      this._k = kind; // kind

      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l; // revert to the last existing entry

      while (entry && entry.r) {
        entry = entry.p;
      } // get next entry


      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      } // return step by kind


      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

    _setSpecies(NAME);
  }
};

var _collection = function _collection(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};

  var fixMethod = function fixMethod(KEY) {
    var fn = proto[KEY];
    _redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);
      return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);
      return this;
    });
  };

  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    var instance = new C(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = _fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly

    var ACCEPT_ITERABLES = _iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;

      while (index--) {
        $instance[ADDER](index, index);
      }

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        _anInstance(target, C, NAME);
        var that = _inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  _setToStringTag(C, NAME);
  O[NAME] = C;
  _export(_export.G + _export.W + _export.F * (C != Base), O);
  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
  return C;
};

var MAP = 'Map'; // 23.1 Map Objects

var es6_map = _collection(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

var SET = 'Set'; // 23.2 Set Objects

var es6_set = _collection(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
  }
}, _collectionStrong);

var getWeak = _meta.getWeak;
var arrayFind = _arrayMethods(5);
var arrayFindIndex = _arrayMethods(6);
var id$1 = 0; // fallback for uncaught frozen keys

var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function UncaughtFrozenStore() {
  this.a = [];
};

var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function get(key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function has(key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function set(key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.a.push([key, value]);
  },
  'delete': function _delete(key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};
var _collectionWeak = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type

      that._i = id$1++; // collection id

      that._l = undefined; // leak store for uncaught frozen objects

      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function _delete(key) {
        if (!_isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
        return data && _has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!_isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
        return data && _has(data, this._i);
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var data = getWeak(_anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

var es6_weakMap = createCommonjsModule(function (module) {

  var each = _arrayMethods(0);
  var WEAK_MAP = 'WeakMap';
  var getWeak = _meta.getWeak;
  var isExtensible = Object.isExtensible;
  var uncaughtFrozenStore = _collectionWeak.ufstore;
  var tmp = {};
  var InternalMap;

  var wrapper = function wrapper(get) {
    return function WeakMap() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  };

  var methods = {
    // 23.3.3.3 WeakMap.prototype.get(key)
    get: function get(key) {
      if (_isObject(key)) {
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
        return data ? data[this._i] : undefined;
      }
    },
    // 23.3.3.5 WeakMap.prototype.set(key, value)
    set: function set(key, value) {
      return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
    }
  }; // 23.3 WeakMap Objects

  var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true); // IE11 WeakMap frozen keys fix

  if (_fails(function () {
    return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7;
  })) {
    InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
    _objectAssign(InternalMap.prototype, methods);
    _meta.NEED = true;
    each(['delete', 'has', 'get', 'set'], function (key) {
      var proto = $WeakMap.prototype;
      var method = proto[key];
      _redefine(proto, key, function (a, b) {
        // store frozen objects on internal weakmap shim
        if (_isObject(a) && !isExtensible(a)) {
          if (!this._f) this._f = new InternalMap();

          var result = this._f[key](a, b);

          return key == 'set' ? this : result; // store all the rest on native weakmap
        }

        return method.call(this, a, b);
      });
    });
  }
});

var WEAK_SET = 'WeakSet'; // 23.4 WeakSet Objects

_collection(WEAK_SET, function (get) {
  return function WeakSet() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
  }
}, _collectionWeak, false, true);

var TYPED = _uid('typed_array');
var VIEW = _uid('view');
var ABV = !!(_global.ArrayBuffer && _global.DataView);
var CONSTR = ABV;
var i$1 = 0;
var l = 9;
var Typed;
var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

while (i$1 < l) {
  if (Typed = _global[TypedArrayConstructors[i$1++]]) {
    _hide(Typed.prototype, TYPED, true);
    _hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

var _typed = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

var _toIndex = function _toIndex(it) {
  if (it === undefined) return 0;
  var number = _toInteger(it);
  var length = _toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

var _typedBuffer = createCommonjsModule(function (module, exports) {

  var gOPN = _objectGopn.f;
  var dP = _objectDp.f;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE = 'prototype';
  var WRONG_LENGTH = 'Wrong length!';
  var WRONG_INDEX = 'Wrong index!';
  var $ArrayBuffer = _global[ARRAY_BUFFER];
  var $DataView = _global[DATA_VIEW];
  var Math = _global.Math;
  var RangeError = _global.RangeError; // eslint-disable-next-line no-shadow-restricted-names

  var Infinity = _global.Infinity;
  var BaseBuffer = $ArrayBuffer;
  var abs = Math.abs;
  var pow = Math.pow;
  var floor = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;
  var BUFFER = 'buffer';
  var BYTE_LENGTH = 'byteLength';
  var BYTE_OFFSET = 'byteOffset';
  var $BUFFER = _descriptors ? '_b' : BUFFER;
  var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
  var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET; // IEEE754 conversions based on https://github.com/feross/ieee754

  function packIEEE754(value, mLen, nBytes) {
    var buffer = new Array(nBytes);
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
    var i = 0;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    var e, m, c;
    value = abs(value); // eslint-disable-next-line no-self-compare

    if (value != value || value === Infinity) {
      // eslint-disable-next-line no-self-compare
      m = value != value ? 1 : 0;
      e = eMax;
    } else {
      e = floor(log(value) / LN2);

      if (value * (c = pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }

      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * pow(2, 1 - eBias);
      }

      if (value * c >= 2) {
        e++;
        c /= 2;
      }

      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * pow(2, eBias - 1) * pow(2, mLen);
        e = 0;
      }
    }

    for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {
    }

    e = e << mLen | m;
    eLen += mLen;

    for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {
    }

    buffer[--i] |= s * 128;
    return buffer;
  }

  function unpackIEEE754(buffer, mLen, nBytes) {
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = eLen - 7;
    var i = nBytes - 1;
    var s = buffer[i--];
    var e = s & 127;
    var m;
    s >>= 7;

    for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {
    }

    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;

    for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {
    }

    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : s ? -Infinity : Infinity;
    } else {
      m = m + pow(2, mLen);
      e = e - eBias;
    }

    return (s ? -1 : 1) * m * pow(2, e - mLen);
  }

  function unpackI32(bytes) {
    return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
  }

  function packI8(it) {
    return [it & 0xff];
  }

  function packI16(it) {
    return [it & 0xff, it >> 8 & 0xff];
  }

  function packI32(it) {
    return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
  }

  function packF64(it) {
    return packIEEE754(it, 52, 8);
  }

  function packF32(it) {
    return packIEEE754(it, 23, 4);
  }

  function addGetter(C, key, internal) {
    dP(C[PROTOTYPE], key, {
      get: function get() {
        return this[internal];
      }
    });
  }

  function get(view, bytes, index, isLittleEndian) {
    var numIndex = +index;
    var intIndex = _toIndex(numIndex);
    if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
    var store = view[$BUFFER]._b;
    var start = intIndex + view[$OFFSET];
    var pack = store.slice(start, start + bytes);
    return isLittleEndian ? pack : pack.reverse();
  }

  function set(view, bytes, index, conversion, value, isLittleEndian) {
    var numIndex = +index;
    var intIndex = _toIndex(numIndex);
    if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
    var store = view[$BUFFER]._b;
    var start = intIndex + view[$OFFSET];
    var pack = conversion(+value);

    for (var i = 0; i < bytes; i++) {
      store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
    }
  }

  if (!_typed.ABV) {
    $ArrayBuffer = function ArrayBuffer(length) {
      _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
      var byteLength = _toIndex(length);
      this._b = _arrayFill.call(new Array(byteLength), 0);
      this[$LENGTH] = byteLength;
    };

    $DataView = function DataView(buffer, byteOffset, byteLength) {
      _anInstance(this, $DataView, DATA_VIEW);
      _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
      var bufferLength = buffer[$LENGTH];
      var offset = _toInteger(byteOffset);
      if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
      byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
      if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
      this[$BUFFER] = buffer;
      this[$OFFSET] = offset;
      this[$LENGTH] = byteLength;
    };

    if (_descriptors) {
      addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
      addGetter($DataView, BUFFER, '_b');
      addGetter($DataView, BYTE_LENGTH, '_l');
      addGetter($DataView, BYTE_OFFSET, '_o');
    }

    _redefineAll($DataView[PROTOTYPE], {
      getInt8: function getInt8(byteOffset) {
        return get(this, 1, byteOffset)[0] << 24 >> 24;
      },
      getUint8: function getUint8(byteOffset) {
        return get(this, 1, byteOffset)[0];
      },
      getInt16: function getInt16(byteOffset
      /* , littleEndian */
      ) {
        var bytes = get(this, 2, byteOffset, arguments[1]);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      },
      getUint16: function getUint16(byteOffset
      /* , littleEndian */
      ) {
        var bytes = get(this, 2, byteOffset, arguments[1]);
        return bytes[1] << 8 | bytes[0];
      },
      getInt32: function getInt32(byteOffset
      /* , littleEndian */
      ) {
        return unpackI32(get(this, 4, byteOffset, arguments[1]));
      },
      getUint32: function getUint32(byteOffset
      /* , littleEndian */
      ) {
        return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
      },
      getFloat32: function getFloat32(byteOffset
      /* , littleEndian */
      ) {
        return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
      },
      getFloat64: function getFloat64(byteOffset
      /* , littleEndian */
      ) {
        return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
      },
      setInt8: function setInt8(byteOffset, value) {
        set(this, 1, byteOffset, packI8, value);
      },
      setUint8: function setUint8(byteOffset, value) {
        set(this, 1, byteOffset, packI8, value);
      },
      setInt16: function setInt16(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 2, byteOffset, packI16, value, arguments[2]);
      },
      setUint16: function setUint16(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 2, byteOffset, packI16, value, arguments[2]);
      },
      setInt32: function setInt32(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 4, byteOffset, packI32, value, arguments[2]);
      },
      setUint32: function setUint32(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 4, byteOffset, packI32, value, arguments[2]);
      },
      setFloat32: function setFloat32(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 4, byteOffset, packF32, value, arguments[2]);
      },
      setFloat64: function setFloat64(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 8, byteOffset, packF64, value, arguments[2]);
      }
    });
  } else {
    if (!_fails(function () {
      $ArrayBuffer(1);
    }) || !_fails(function () {
      new $ArrayBuffer(-1); // eslint-disable-line no-new
    }) || _fails(function () {
      new $ArrayBuffer(); // eslint-disable-line no-new

      new $ArrayBuffer(1.5); // eslint-disable-line no-new

      new $ArrayBuffer(NaN); // eslint-disable-line no-new

      return $ArrayBuffer.name != ARRAY_BUFFER;
    })) {
      $ArrayBuffer = function ArrayBuffer(length) {
        _anInstance(this, $ArrayBuffer);
        return new BaseBuffer(_toIndex(length));
      };

      var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];

      for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
        if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
      }

      ArrayBufferProto.constructor = $ArrayBuffer;
    } // iOS Safari 7.x bug


    var view = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = $DataView[PROTOTYPE].setInt8;
    view.setInt8(0, 2147483648);
    view.setInt8(1, 2147483649);
    if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8.call(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint8(byteOffset, value) {
        $setInt8.call(this, byteOffset, value << 24 >> 24);
      }
    }, true);
  }

  _setToStringTag($ArrayBuffer, ARRAY_BUFFER);
  _setToStringTag($DataView, DATA_VIEW);
  _hide($DataView[PROTOTYPE], _typed.VIEW, true);
  exports[ARRAY_BUFFER] = $ArrayBuffer;
  exports[DATA_VIEW] = $DataView;
});

var ArrayBuffer = _global.ArrayBuffer;
var $ArrayBuffer = _typedBuffer.ArrayBuffer;
var $DataView = _typedBuffer.DataView;
var $isView = _typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW$1 = _typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';
_export(_export.G + _export.W + _export.F * (ArrayBuffer !== $ArrayBuffer), {
  ArrayBuffer: $ArrayBuffer
});
_export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
  }
});
_export(_export.P + _export.U + _export.F * _fails(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix

    var len = _anObject(this).byteLength;
    var first = _toAbsoluteIndex(start, len);

    var _final = _toAbsoluteIndex(end === undefined ? len : end, len);

    var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(_final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;

    while (first < _final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    }

    return result;
  }
});
_setSpecies(ARRAY_BUFFER);

_export(_export.G + _export.W + _export.F * !_typed.ABV, {
  DataView: _typedBuffer.DataView
});

var _typedArray = createCommonjsModule(function (module) {

  if (_descriptors) {
    var LIBRARY = _library;
    var global = _global;
    var fails = _fails;
    var $export = _export;
    var $typed = _typed;
    var $buffer = _typedBuffer;
    var ctx = _ctx;
    var anInstance = _anInstance;
    var propertyDesc = _propertyDesc;
    var hide = _hide;
    var redefineAll = _redefineAll;
    var toInteger = _toInteger;
    var toLength = _toLength;
    var toIndex = _toIndex;
    var toAbsoluteIndex = _toAbsoluteIndex;
    var toPrimitive = _toPrimitive;
    var has = _has;
    var classof = _classof;
    var isObject = _isObject;
    var toObject = _toObject;
    var isArrayIter = _isArrayIter;
    var create = _objectCreate;
    var getPrototypeOf = _objectGpo;
    var gOPN = _objectGopn.f;
    var getIterFn = core_getIteratorMethod;
    var uid = _uid;
    var wks = _wks;
    var createArrayMethod = _arrayMethods;
    var createArrayIncludes = _arrayIncludes;
    var speciesConstructor = _speciesConstructor;
    var ArrayIterators = es6_array_iterator;
    var Iterators = _iterators;
    var $iterDetect = _iterDetect;
    var setSpecies = _setSpecies;
    var arrayFill = _arrayFill;
    var arrayCopyWithin = _arrayCopyWithin;
    var $DP = _objectDp;
    var $GOPD = _objectGopd;
    var dP = $DP.f;
    var gOPD = $GOPD.f;
    var RangeError = global.RangeError;
    var TypeError = global.TypeError;
    var Uint8Array = global.Uint8Array;
    var ARRAY_BUFFER = 'ArrayBuffer';
    var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
    var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
    var PROTOTYPE = 'prototype';
    var ArrayProto = Array[PROTOTYPE];
    var $ArrayBuffer = $buffer.ArrayBuffer;
    var $DataView = $buffer.DataView;
    var arrayForEach = createArrayMethod(0);
    var arrayFilter = createArrayMethod(2);
    var arraySome = createArrayMethod(3);
    var arrayEvery = createArrayMethod(4);
    var arrayFind = createArrayMethod(5);
    var arrayFindIndex = createArrayMethod(6);
    var arrayIncludes = createArrayIncludes(true);
    var arrayIndexOf = createArrayIncludes(false);
    var arrayValues = ArrayIterators.values;
    var arrayKeys = ArrayIterators.keys;
    var arrayEntries = ArrayIterators.entries;
    var arrayLastIndexOf = ArrayProto.lastIndexOf;
    var arrayReduce = ArrayProto.reduce;
    var arrayReduceRight = ArrayProto.reduceRight;
    var arrayJoin = ArrayProto.join;
    var arraySort = ArrayProto.sort;
    var arraySlice = ArrayProto.slice;
    var arrayToString = ArrayProto.toString;
    var arrayToLocaleString = ArrayProto.toLocaleString;
    var ITERATOR = wks('iterator');
    var TAG = wks('toStringTag');
    var TYPED_CONSTRUCTOR = uid('typed_constructor');
    var DEF_CONSTRUCTOR = uid('def_constructor');
    var ALL_CONSTRUCTORS = $typed.CONSTR;
    var TYPED_ARRAY = $typed.TYPED;
    var VIEW = $typed.VIEW;
    var WRONG_LENGTH = 'Wrong length!';
    var $map = createArrayMethod(1, function (O, length) {
      return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
    });
    var LITTLE_ENDIAN = fails(function () {
      // eslint-disable-next-line no-undef
      return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
    });
    var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
      new Uint8Array(1).set({});
    });

    var toOffset = function toOffset(it, BYTES) {
      var offset = toInteger(it);
      if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
      return offset;
    };

    var validate = function validate(it) {
      if (isObject(it) && TYPED_ARRAY in it) return it;
      throw TypeError(it + ' is not a typed array!');
    };

    var allocate = function allocate(C, length) {
      if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
        throw TypeError('It is not a typed array constructor!');
      }

      return new C(length);
    };

    var speciesFromList = function speciesFromList(O, list) {
      return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
    };

    var fromList = function fromList(C, list) {
      var index = 0;
      var length = list.length;
      var result = allocate(C, length);

      while (length > index) {
        result[index] = list[index++];
      }

      return result;
    };

    var addGetter = function addGetter(it, key, internal) {
      dP(it, key, {
        get: function get() {
          return this._d[internal];
        }
      });
    };

    var $from = function from(source
    /* , mapfn, thisArg */
    ) {
      var O = toObject(source);
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var iterFn = getIterFn(O);
      var i, length, values, result, step, iterator;

      if (iterFn != undefined && !isArrayIter(iterFn)) {
        for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
          values.push(step.value);
        }

        O = values;
      }

      if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);

      for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
        result[i] = mapping ? mapfn(O[i], i) : O[i];
      }

      return result;
    };

    var $of = function of()
    /* ...items */
    {
      var index = 0;
      var length = arguments.length;
      var result = allocate(this, length);

      while (length > index) {
        result[index] = arguments[index++];
      }

      return result;
    }; // iOS Safari 6.x fails here


    var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
      arrayToLocaleString.call(new Uint8Array(1));
    });

    var $toLocaleString = function toLocaleString() {
      return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
    };

    var proto = {
      copyWithin: function copyWithin(target, start
      /* , end */
      ) {
        return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
      },
      every: function every(callbackfn
      /* , thisArg */
      ) {
        return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      fill: function fill(value
      /* , start, end */
      ) {
        // eslint-disable-line no-unused-vars
        return arrayFill.apply(validate(this), arguments);
      },
      filter: function filter(callbackfn
      /* , thisArg */
      ) {
        return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
      },
      find: function find(predicate
      /* , thisArg */
      ) {
        return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
      },
      findIndex: function findIndex(predicate
      /* , thisArg */
      ) {
        return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
      },
      forEach: function forEach(callbackfn
      /* , thisArg */
      ) {
        arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      indexOf: function indexOf(searchElement
      /* , fromIndex */
      ) {
        return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
      },
      includes: function includes(searchElement
      /* , fromIndex */
      ) {
        return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
      },
      join: function join(separator) {
        // eslint-disable-line no-unused-vars
        return arrayJoin.apply(validate(this), arguments);
      },
      lastIndexOf: function lastIndexOf(searchElement
      /* , fromIndex */
      ) {
        // eslint-disable-line no-unused-vars
        return arrayLastIndexOf.apply(validate(this), arguments);
      },
      map: function map(mapfn
      /* , thisArg */
      ) {
        return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      reduce: function reduce(callbackfn
      /* , initialValue */
      ) {
        // eslint-disable-line no-unused-vars
        return arrayReduce.apply(validate(this), arguments);
      },
      reduceRight: function reduceRight(callbackfn
      /* , initialValue */
      ) {
        // eslint-disable-line no-unused-vars
        return arrayReduceRight.apply(validate(this), arguments);
      },
      reverse: function reverse() {
        var that = this;
        var length = validate(that).length;
        var middle = Math.floor(length / 2);
        var index = 0;
        var value;

        while (index < middle) {
          value = that[index];
          that[index++] = that[--length];
          that[length] = value;
        }

        return that;
      },
      some: function some(callbackfn
      /* , thisArg */
      ) {
        return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      sort: function sort(comparefn) {
        return arraySort.call(validate(this), comparefn);
      },
      subarray: function subarray(begin, end) {
        var O = validate(this);
        var length = O.length;
        var $begin = toAbsoluteIndex(begin, length);
        return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
      }
    };

    var $slice = function slice(start, end) {
      return speciesFromList(this, arraySlice.call(validate(this), start, end));
    };

    var $set = function set(arrayLike
    /* , offset */
    ) {
      validate(this);
      var offset = toOffset(arguments[1], 1);
      var length = this.length;
      var src = toObject(arrayLike);
      var len = toLength(src.length);
      var index = 0;
      if (len + offset > length) throw RangeError(WRONG_LENGTH);

      while (index < len) {
        this[offset + index] = src[index++];
      }
    };

    var $iterators = {
      entries: function entries() {
        return arrayEntries.call(validate(this));
      },
      keys: function keys() {
        return arrayKeys.call(validate(this));
      },
      values: function values() {
        return arrayValues.call(validate(this));
      }
    };

    var isTAIndex = function isTAIndex(target, key) {
      return isObject(target) && target[TYPED_ARRAY] && _typeof(key) != 'symbol' && key in target && String(+key) == String(key);
    };

    var $getDesc = function getOwnPropertyDescriptor(target, key) {
      return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
    };

    var $setDesc = function defineProperty(target, key, desc) {
      if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set') // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
        target[key] = desc.value;
        return target;
      }

      return dP(target, key, desc);
    };

    if (!ALL_CONSTRUCTORS) {
      $GOPD.f = $getDesc;
      $DP.f = $setDesc;
    }

    $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
      getOwnPropertyDescriptor: $getDesc,
      defineProperty: $setDesc
    });

    if (fails(function () {
      arrayToString.call({});
    })) {
      arrayToString = arrayToLocaleString = function toString() {
        return arrayJoin.call(this);
      };
    }

    var $TypedArrayPrototype$ = redefineAll({}, proto);
    redefineAll($TypedArrayPrototype$, $iterators);
    hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
    redefineAll($TypedArrayPrototype$, {
      slice: $slice,
      set: $set,
      constructor: function constructor() {
        /* noop */
      },
      toString: arrayToString,
      toLocaleString: $toLocaleString
    });
    addGetter($TypedArrayPrototype$, 'buffer', 'b');
    addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
    addGetter($TypedArrayPrototype$, 'byteLength', 'l');
    addGetter($TypedArrayPrototype$, 'length', 'e');
    dP($TypedArrayPrototype$, TAG, {
      get: function get() {
        return this[TYPED_ARRAY];
      }
    }); // eslint-disable-next-line max-statements

    module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
      CLAMPED = !!CLAMPED;
      var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + KEY;
      var SETTER = 'set' + KEY;
      var TypedArray = global[NAME];
      var Base = TypedArray || {};
      var TAC = TypedArray && getPrototypeOf(TypedArray);
      var FORCED = !TypedArray || !$typed.ABV;
      var O = {};
      var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];

      var getter = function getter(that, index) {
        var data = that._d;
        return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
      };

      var setter = function setter(that, index, value) {
        var data = that._d;
        if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
        data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
      };

      var addElement = function addElement(that, index) {
        dP(that, index, {
          get: function get() {
            return getter(this, index);
          },
          set: function set(value) {
            return setter(this, index, value);
          },
          enumerable: true
        });
      };

      if (FORCED) {
        TypedArray = wrapper(function (that, data, $offset, $length) {
          anInstance(that, TypedArray, NAME, '_d');
          var index = 0;
          var offset = 0;
          var buffer, byteLength, length, klass;

          if (!isObject(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new $ArrayBuffer(byteLength);
          } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
            buffer = data;
            offset = toOffset($offset, BYTES);
            var $len = data.byteLength;

            if ($length === undefined) {
              if ($len % BYTES) throw RangeError(WRONG_LENGTH);
              byteLength = $len - offset;
              if (byteLength < 0) throw RangeError(WRONG_LENGTH);
            } else {
              byteLength = toLength($length) * BYTES;
              if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
            }

            length = byteLength / BYTES;
          } else if (TYPED_ARRAY in data) {
            return fromList(TypedArray, data);
          } else {
            return $from.call(TypedArray, data);
          }

          hide(that, '_d', {
            b: buffer,
            o: offset,
            l: byteLength,
            e: length,
            v: new $DataView(buffer)
          });

          while (index < length) {
            addElement(that, index++);
          }
        });
        TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
        hide(TypedArrayPrototype, 'constructor', TypedArray);
      } else if (!fails(function () {
        TypedArray(1);
      }) || !fails(function () {
        new TypedArray(-1); // eslint-disable-line no-new
      }) || !$iterDetect(function (iter) {
        new TypedArray(); // eslint-disable-line no-new

        new TypedArray(null); // eslint-disable-line no-new

        new TypedArray(1.5); // eslint-disable-line no-new

        new TypedArray(iter); // eslint-disable-line no-new
      }, true)) {
        TypedArray = wrapper(function (that, data, $offset, $length) {
          anInstance(that, TypedArray, NAME);
          var klass; // `ws` module bug, temporarily remove validation length for Uint8Array
          // https://github.com/websockets/ws/pull/645

          if (!isObject(data)) return new Base(toIndex(data));

          if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
            return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
          }

          if (TYPED_ARRAY in data) return fromList(TypedArray, data);
          return $from.call(TypedArray, data);
        });
        arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
          if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
        });
        TypedArray[PROTOTYPE] = TypedArrayPrototype;
        if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
      }

      var $nativeIterator = TypedArrayPrototype[ITERATOR];
      var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
      var $iterator = $iterators.values;
      hide(TypedArray, TYPED_CONSTRUCTOR, true);
      hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
      hide(TypedArrayPrototype, VIEW, true);
      hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

      if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
        dP(TypedArrayPrototype, TAG, {
          get: function get() {
            return NAME;
          }
        });
      }

      O[NAME] = TypedArray;
      $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
      $export($export.S, NAME, {
        BYTES_PER_ELEMENT: BYTES
      });
      $export($export.S + $export.F * fails(function () {
        Base.of.call(TypedArray, 1);
      }), NAME, {
        from: $from,
        of: $of
      });
      if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
      $export($export.P, NAME, proto);
      setSpecies(NAME);
      $export($export.P + $export.F * FORCED_SET, NAME, {
        set: $set
      });
      $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
      if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;
      $export($export.P + $export.F * fails(function () {
        new TypedArray(1).slice();
      }), NAME, {
        slice: $slice
      });
      $export($export.P + $export.F * (fails(function () {
        return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
      }) || !fails(function () {
        TypedArrayPrototype.toLocaleString.call([1, 2]);
      })), NAME, {
        toLocaleString: $toLocaleString
      });
      Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
      if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
    };
  } else module.exports = function () {
    /* empty */
  };
});

_typedArray('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

_typedArray('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var rApply = (_global.Reflect || {}).apply;
var fApply = Function.apply; // MS Edge argumentsList argument is optional

_export(_export.S + _export.F * !_fails(function () {
  rApply(function () {
    /* empty */
  });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = _aFunction(target);
    var L = _anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

var rConstruct = (_global.Reflect || {}).construct; // MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it

var NEW_TARGET_BUG = _fails(function () {
  function F() {
    /* empty */
  }

  return !(rConstruct(function () {
    /* empty */
  }, [], F) instanceof F);
});
var ARGS_BUG = !_fails(function () {
  rConstruct(function () {
    /* empty */
  });
});
_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args
  /* , newTarget */
  ) {
    _aFunction(Target);
    _anObject(args);
    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);

    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();

        case 1:
          return new Target(args[0]);

        case 2:
          return new Target(args[0], args[1]);

        case 3:
          return new Target(args[0], args[1], args[2]);

        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      } // w/o altered newTarget, lot of arguments case


      var $args = [null];
      $args.push.apply($args, args);
      return new (_bind.apply(Target, $args))();
    } // with altered newTarget, not support built-in constructors


    var proto = newTarget.prototype;
    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return _isObject(result) ? result : instance;
  }
});

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false

_export(_export.S + _export.F * _fails(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(_objectDp.f({}, 1, {
    value: 1
  }), 1, {
    value: 2
  });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    _anObject(target);
    propertyKey = _toPrimitive(propertyKey, true);
    _anObject(attributes);

    try {
      _objectDp.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

var gOPD$3 = _objectGopd.f;
_export(_export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD$3(_anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

var Enumerate = function Enumerate(iterated) {
  this._t = _anObject(iterated); // target

  this._i = 0; // next index

  var keys = this._k = []; // keys

  var key;

  for (key in iterated) {
    keys.push(key);
  }
};

_iterCreate(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;

  do {
    if (that._i >= keys.length) return {
      value: undefined,
      done: true
    };
  } while (!((key = keys[that._i++]) in that._t));

  return {
    value: key,
    done: false
  };
});
_export(_export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

function get(target, propertyKey
/* , receiver */
) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (_anObject(target) === receiver) return target[propertyKey];
  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
}

_export(_export.S, 'Reflect', {
  get: get
});

_export(_export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return _objectGopd.f(_anObject(target), propertyKey);
  }
});

_export(_export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return _objectGpo(_anObject(target));
  }
});

_export(_export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

var $isExtensible = Object.isExtensible;
_export(_export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    _anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

var Reflect$1 = _global.Reflect;

var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
  var keys = _objectGopn.f(_anObject(it));
  var getSymbols = _objectGops.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

_export(_export.S, 'Reflect', {
  ownKeys: _ownKeys
});

var $preventExtensions = Object.preventExtensions;
_export(_export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    _anObject(target);

    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

function set(target, propertyKey, V
/* , receiver */
) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = _objectGopd.f(_anObject(target), propertyKey);
  var existingDescriptor, proto;

  if (!ownDesc) {
    if (_isObject(proto = _objectGpo(target))) {
      return set(proto, propertyKey, V, receiver);
    }

    ownDesc = _propertyDesc(0);
  }

  if (_has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !_isObject(receiver)) return false;
    existingDescriptor = _objectGopd.f(receiver, propertyKey) || _propertyDesc(0);
    existingDescriptor.value = V;
    _objectDp.f(receiver, propertyKey, existingDescriptor);
    return true;
  }

  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

_export(_export.S, 'Reflect', {
  set: set
});

if (_setProto) _export(_export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    _setProto.check(target, proto);

    try {
      _setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

var $includes = _arrayIncludes(true);
_export(_export.P, 'Array', {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables('includes');

var IS_CONCAT_SPREADABLE = _wks('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? _ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
      spreadable = false;

      if (_isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : _isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, _toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
}

var _flattenIntoArray = flattenIntoArray;

_export(_export.P, 'Array', {
  flatMap: function flatMap(callbackfn
  /* , thisArg */
  ) {
    var O = _toObject(this);
    var sourceLen, A;
    _aFunction(callbackfn);
    sourceLen = _toLength(O.length);
    A = _arraySpeciesCreate(O, 0);
    _flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});
_addToUnscopables('flatMap');

_export(_export.P, 'Array', {
  flatten: function flatten()
  /* depthArg = 1 */
  {
    var depthArg = arguments[0];
    var O = _toObject(this);
    var sourceLen = _toLength(O.length);
    var A = _arraySpeciesCreate(O, 0);
    _flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : _toInteger(depthArg));
    return A;
  }
});
_addToUnscopables('flatten');

var $at$2 = _stringAt(true);
_export(_export.P, 'String', {
  at: function at(pos) {
    return $at$2(this, pos);
  }
});

var _stringPad = function _stringPad(that, maxLength, fillString, left) {
  var S = String(_defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = _toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

var navigator$1 = _global.navigator;

var _userAgent = navigator$1 && navigator$1.userAgent || '';

// https://github.com/zloirock/core-js/issues/280


_export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
  padStart: function padStart(maxLength
  /* , fillString = ' ' */
  ) {
    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

// https://github.com/zloirock/core-js/issues/280


_export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
  padEnd: function padEnd(maxLength
  /* , fillString = ' ' */
  ) {
    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

_stringTrim('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

_stringTrim('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
  this._r = regexp;
  this._s = string;
};

_iterCreate($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);

  return {
    value: match,
    done: match === null
  };
});
_export(_export.P, 'String', {
  matchAll: function matchAll(regexp) {
    _defined(this);
    if (!_isRegexp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : _flags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = _toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

_wksDefine('asyncIterator');

_wksDefine('observable');

_export(_export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = _toIobject(object);
    var getDesc = _objectGopd.f;
    var keys = _ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;

    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) _createProperty(result, key, desc);
    }

    return result;
  }
});

var isEnum$1 = _objectPie.f;

var _objectToArray = function _objectToArray(isEntries) {
  return function (it) {
    var O = _toIobject(it);
    var keys = _objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      if (isEnum$1.call(O, key = keys[i++])) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

var $values = _objectToArray(false);
_export(_export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

var $entries = _objectToArray(true);
_export(_export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

var _objectForcedPam =  !_fails(function () {
  var K = Math.random(); // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call

  __defineSetter__.call(null, K, function () {
    /* empty */
  });

  delete _global[K];
});

_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    _objectDp.f(_toObject(this), P, {
      get: _aFunction(getter),
      enumerable: true,
      configurable: true
    });
  }
});

_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    _objectDp.f(_toObject(this), P, {
      set: _aFunction(setter),
      enumerable: true,
      configurable: true
    });
  }
});

var getOwnPropertyDescriptor = _objectGopd.f; // B.2.2.4 Object.prototype.__lookupGetter__(P)

_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = _toObject(this);
    var K = _toPrimitive(P, true);
    var D;

    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = _objectGpo(O));
  }
});

var getOwnPropertyDescriptor$1 = _objectGopd.f; // B.2.2.5 Object.prototype.__lookupSetter__(P)

_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = _toObject(this);
    var K = _toPrimitive(P, true);
    var D;

    do {
      if (D = getOwnPropertyDescriptor$1(O, K)) return D.set;
    } while (O = _objectGpo(O));
  }
});

var _arrayFromIterable = function _arrayFromIterable(iter, ITERATOR) {
  var result = [];
  _forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

var _collectionToJson = function _collectionToJson(NAME) {
  return function toJSON() {
    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return _arrayFromIterable(this);
  };
};

_export(_export.P + _export.R, 'Map', {
  toJSON: _collectionToJson('Map')
});

_export(_export.P + _export.R, 'Set', {
  toJSON: _collectionToJson('Set')
});

var _setCollectionOf = function _setCollectionOf(COLLECTION) {
  _export(_export.S, COLLECTION, {
    of: function of() {
      var length = arguments.length;
      var A = new Array(length);

      while (length--) {
        A[length] = arguments[length];
      }

      return new this(A);
    }
  });
};

_setCollectionOf('Map');

_setCollectionOf('Set');

_setCollectionOf('WeakMap');

_setCollectionOf('WeakSet');

var _setCollectionFrom = function _setCollectionFrom(COLLECTION) {
  _export(_export.S, COLLECTION, {
    from: function from(source
    /* , mapFn, thisArg */
    ) {
      var mapFn = arguments[1];
      var mapping, A, n, cb;
      _aFunction(this);
      mapping = mapFn !== undefined;
      if (mapping) _aFunction(mapFn);
      if (source == undefined) return new this();
      A = [];

      if (mapping) {
        n = 0;
        cb = _ctx(mapFn, arguments[2], 2);
        _forOf(source, false, function (nextItem) {
          A.push(cb(nextItem, n++));
        });
      } else {
        _forOf(source, false, A.push, A);
      }

      return new this(A);
    }
  });
};

_setCollectionFrom('Map');

_setCollectionFrom('Set');

_setCollectionFrom('WeakMap');

_setCollectionFrom('WeakSet');

_export(_export.G, {
  global: _global
});

_export(_export.S, 'System', {
  global: _global
});

_export(_export.S, 'Error', {
  isError: function isError(it) {
    return _cof(it) === 'Error';
  }
});

_export(_export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

_export(_export.S, 'Math', {
  DEG_PER_RAD: Math.PI / 180
});

var RAD_PER_DEG = 180 / Math.PI;
_export(_export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

// https://rwaldron.github.io/proposal-math-extensions/
var _mathScale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (arguments.length === 0 // eslint-disable-next-line no-self-compare
  || x != x // eslint-disable-next-line no-self-compare
  || inLow != inLow // eslint-disable-next-line no-self-compare
  || inHigh != inHigh // eslint-disable-next-line no-self-compare
  || outLow != outLow // eslint-disable-next-line no-self-compare
  || outHigh != outHigh) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

_export(_export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return _mathFround(_mathScale(x, inLow, inHigh, outLow, outHigh));
  }
});

_export(_export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

_export(_export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

_export(_export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

_export(_export.S, 'Math', {
  RAD_PER_DEG: 180 / Math.PI
});

var DEG_PER_RAD = Math.PI / 180;
_export(_export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

_export(_export.S, 'Math', {
  scale: _mathScale
});

_export(_export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

_export(_export.S, 'Math', {
  signbit: function signbit(x) {
    // eslint-disable-next-line no-self-compare
    return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
  }
});

_export(_export.P + _export.R, 'Promise', {
  'finally': function _finally(onFinally) {
    var C = _speciesConstructor(this, _core.Promise || _global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return _promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return _promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  }
});

_export(_export.S, 'Promise', {
  'try': function _try(callbackfn) {
    var promiseCapability = _newPromiseCapability.f(this);
    var result = _perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  }
});

var shared$1 = _shared('metadata');
var store$1 = shared$1.store || (shared$1.store = new es6_weakMap());

var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
  var targetMetadata = store$1.get(target);

  if (!targetMetadata) {
    if (!create) return undefined;
    store$1.set(target, targetMetadata = new es6_map());
  }

  var keyMetadata = targetMetadata.get(targetKey);

  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new es6_map());
  }

  return keyMetadata;
};

var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};

var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};

var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};

var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) {
    keys.push(key);
  });
  return keys;
};

var toMetaKey = function toMetaKey(it) {
  return it === undefined || _typeof(it) == 'symbol' ? it : String(it);
};

var exp$3 = function exp(O) {
  _export(_export.S, 'Reflect', O);
};

var _metadata = {
  store: store$1,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp$3
};

var toMetaKey$1 = _metadata.key;
var ordinaryDefineOwnMetadata$1 = _metadata.set;
_metadata.exp({
  defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
    ordinaryDefineOwnMetadata$1(metadataKey, metadataValue, _anObject(target), toMetaKey$1(targetKey));
  }
});

var toMetaKey$2 = _metadata.key;
var getOrCreateMetadataMap$1 = _metadata.map;
var store$2 = _metadata.store;
_metadata.exp({
  deleteMetadata: function deleteMetadata(metadataKey, target
  /* , targetKey */
  ) {
    var targetKey = arguments.length < 3 ? undefined : toMetaKey$2(arguments[2]);
    var metadataMap = getOrCreateMetadataMap$1(_anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
    if (metadataMap.size) return true;
    var targetMetadata = store$2.get(target);
    targetMetadata['delete'](targetKey);
    return !!targetMetadata.size || store$2['delete'](target);
  }
});

var ordinaryHasOwnMetadata$1 = _metadata.has;
var ordinaryGetOwnMetadata$1 = _metadata.get;
var toMetaKey$3 = _metadata.key;

var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata$1(MetadataKey, O, P);
  var parent = _objectGpo(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

_metadata.exp({
  getMetadata: function getMetadata(metadataKey, target
  /* , targetKey */
  ) {
    return ordinaryGetMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$3(arguments[2]));
  }
});

var ordinaryOwnMetadataKeys$1 = _metadata.keys;
var toMetaKey$4 = _metadata.key;

var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
  var oKeys = ordinaryOwnMetadataKeys$1(O, P);
  var parent = _objectGpo(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? _arrayFromIterable(new es6_set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

_metadata.exp({
  getMetadataKeys: function getMetadataKeys(target
  /* , targetKey */
  ) {
    return ordinaryMetadataKeys(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$4(arguments[1]));
  }
});

var ordinaryGetOwnMetadata$2 = _metadata.get;
var toMetaKey$5 = _metadata.key;
_metadata.exp({
  getOwnMetadata: function getOwnMetadata(metadataKey, target
  /* , targetKey */
  ) {
    return ordinaryGetOwnMetadata$2(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$5(arguments[2]));
  }
});

var ordinaryOwnMetadataKeys$2 = _metadata.keys;
var toMetaKey$6 = _metadata.key;
_metadata.exp({
  getOwnMetadataKeys: function getOwnMetadataKeys(target
  /* , targetKey */
  ) {
    return ordinaryOwnMetadataKeys$2(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$6(arguments[1]));
  }
});

var ordinaryHasOwnMetadata$2 = _metadata.has;
var toMetaKey$7 = _metadata.key;

var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = _objectGpo(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

_metadata.exp({
  hasMetadata: function hasMetadata(metadataKey, target
  /* , targetKey */
  ) {
    return ordinaryHasMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$7(arguments[2]));
  }
});

var ordinaryHasOwnMetadata$3 = _metadata.has;
var toMetaKey$8 = _metadata.key;
_metadata.exp({
  hasOwnMetadata: function hasOwnMetadata(metadataKey, target
  /* , targetKey */
  ) {
    return ordinaryHasOwnMetadata$3(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$8(arguments[2]));
  }
});

var toMetaKey$9 = _metadata.key;
var ordinaryDefineOwnMetadata$2 = _metadata.set;
_metadata.exp({
  metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, targetKey) {
      ordinaryDefineOwnMetadata$2(metadataKey, metadataValue, (targetKey !== undefined ? _anObject : _aFunction)(target), toMetaKey$9(targetKey));
    };
  }
});

var microtask$1 = _microtask();
var process$3 = _global.process;
var isNode$2 = _cof(process$3) == 'process';
_export(_export.G, {
  asap: function asap(fn) {
    var domain = isNode$2 && process$3.domain;
    microtask$1(domain ? domain.bind(fn) : fn);
  }
});

var microtask$2 = _microtask();
var OBSERVABLE = _wks('observable');
var RETURN = _forOf.RETURN;

var getMethod = function getMethod(fn) {
  return fn == null ? undefined : _aFunction(fn);
};

var cleanupSubscription = function cleanupSubscription(subscription) {
  var cleanup = subscription._c;

  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function subscriptionClosed(subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function closeSubscription(subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function Subscription(observer, subscriber) {
  _anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);

  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;

    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
        subscription.unsubscribe();
      };else _aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  }

  if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = _redefineAll({}, {
  unsubscribe: function unsubscribe() {
    closeSubscription(this);
  }
});

var SubscriptionObserver = function SubscriptionObserver(subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = _redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;

    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;

      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;

    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    }

    cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;

    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;

      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      }

      cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  _anInstance(this, $Observable, 'Observable', '_f')._f = _aFunction(subscriber);
};

_redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (_core.Promise || _global.Promise)(function (resolve, reject) {
      _aFunction(fn);
      var subscription = that.subscribe({
        next: function next(value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});
_redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(_anObject(x)[OBSERVABLE]);

    if (method) {
      var observable = _anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }

    return new C(function (observer) {
      var done = false;
      microtask$2(function () {
        if (!done) {
          try {
            if (_forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          }

          observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) {
      items[i] = arguments[i++];
    }

    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask$2(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          }

          observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  }
});
_hide($Observable.prototype, OBSERVABLE, function () {
  return this;
});
_export(_export.G, {
  Observable: $Observable
});
_setSpecies('Observable');

var slice = [].slice;
var MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check

var wrap$1 = function wrap(set) {
  return function (fn, time
  /* , ...args */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};

_export(_export.G + _export.B + _export.F * MSIE, {
  setTimeout: wrap$1(_global.setTimeout),
  setInterval: wrap$1(_global.setInterval)
});

_export(_export.G + _export.B, {
  setImmediate: _task.set,
  clearImmediate: _task.clear
});

var ITERATOR$4 = _wks('iterator');
var TO_STRING_TAG = _wks('toStringTag');
var ArrayValues = _iterators.Array;
var DOMIterables = {
  CSSRuleList: true,
  // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true,
  // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true,
  // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
  var NAME$1 = collections[i$2];
  var explicit = DOMIterables[NAME$1];
  var Collection = _global[NAME$1];
  var proto$3 = Collection && Collection.prototype;
  var key$1;

  if (proto$3) {
    if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
    if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
    _iterators[NAME$1] = ArrayValues;
    if (explicit) for (key$1 in es6_array_iterator) {
      if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
    }
  }
}

var runtime = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */
  !function (global) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var runtime = global.regeneratorRuntime;

    if (runtime) {
      {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      } // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.


      return;
    } // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.


    runtime = global.regeneratorRuntime =  module.exports ;

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    runtime.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    runtime.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            resolve(result);
          }, reject);
        }
      }

      if (_typeof(global.process) === "object" && global.process.domain) {
        invoke = global.process.domain.bind(invoke);
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    runtime.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };
  }( // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  _typeof(commonjsGlobal) === "object" ? commonjsGlobal : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : commonjsGlobal);
});

var _replacer = function _replacer(regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

var $re = _replacer(/[\\^$*+?.()|[\]{}]/g, '\\$&');
_export(_export.S, 'RegExp', {
  escape: function escape(it) {
    return $re(it);
  }
});

var _escape = _core.RegExp.escape;

if (commonjsGlobal._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}

commonjsGlobal._babelPolyfill = true;
var DEFINE_PROPERTY = "defineProperty";

function define$1(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define$1(String.prototype, "padLeft", "".padStart);
define$1(String.prototype, "padRight", "".padEnd);
"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define$1(Array, key, Function.call.bind([][key]));
});

var emitonoff = createCommonjsModule(function (module) {
var EmitOnOff = module.exports = function(thing){
  if (!thing) thing = {};

  thing._subs = [];
  thing._paused = false;
  thing._pending = [];

  /**
   * Sub of pubsub
   * @param  {String}   name name of event
   * @param  {Function} cb   your callback
   */
  thing.on = function(name, cb){
    thing._subs[name] = thing._subs[name] || [];
    thing._subs[name].push(cb);
  };

  /**
   * remove sub of pubsub
   * @param  {String}   name name of event
   * @param  {Function} cb   your callback
   */
  thing.off = function(name, cb){
    if (!thing._subs[name]) return;
    for (var i in thing._subs[name]){
      if (thing._subs[name][i] === cb){
        thing._subs[name].splice(i);
        break;
      }
    }
  };

  /**
   * Pub of pubsub
   * @param  {String}   name name of event
   * @param  {Mixed}    data the data to publish
   */
  thing.emit = function(name){
    if (!thing._subs[name]) return;

    var args = Array.prototype.slice.call(arguments, 1);

    if (thing._paused) {
      thing._pending[name] = thing._pending[name] || [];
      thing._pending[name].push(args);
      return
    }

    for (var i in thing._subs[name]){
      thing._subs[name][i].apply(thing, args);
    }
  };

  thing.pause = function() {
    thing._paused = true;
  };

  thing.resume = function() {
    thing._paused = false;

    for (var name in thing._pending) {
      for (var i = 0; i < thing._pending[name].length; i++) {
        thing.emit(name, thing._pending[name][i]);
      }
    }
  };

  return thing;
};
});

var config = {
  "version": 0.2,
  "basemaps": {
    "defaults": {
      "crs": "EPSG:3857",
      "attribution": "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | \
            <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
      "minZoom": 6,
      "maxZoom": 19,
      "type": "wmts",
      "format": "png",
      "url": "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0"
    },
    "layers": [{
      "url": "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
      "crs": "EPSG:3857",
      "format": "png",
      "name": "standaard",
      "layerName": "standaard"
    }, {
      "url": "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
      "crs": "EPSG:3857",
      "format": "png",
      "name": "grijs",
      "layerName": "grijs"
    }, {
      "url": "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
      "crs": "EPSG:3857",
      "format": "png",
      "name": "pastel",
      "layerName": "pastel"
    }, {
      "name": "luchtfoto",
      "crs": "EPSG:3857",
      "layerName": "Actueel_ortho25",
      "url": "https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0",
      "format": "jpeg"
    }]
  },
  "wms": {
    "defaults": {
      "url": "https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",
      "version": "1.1.1",
      "transparent": true,
      "format": "image/png",
      "minZoom": 0,
      "maxZoom": 24
    },
    "layers": [{
      "name": "percelen",
      "url": "https://geodata.nationaalgeoregister.nl/kadastralekaart/wms/v4_0?",
      "layerName": "kadastralekaart"
    }, {
      "name": "gebouwen",
      "url": "https://service.pdok.nl/lv/bag/wms/v2_0?",
      "layerName": "pand"
    }, {
      "name": "drone-no-fly-zones",
      "url": "https://geodata.nationaalgeoregister.nl/dronenoflyzones/wms?",
      "layerName": "luchtvaartgebieden,landingsite"
    }, {
      "name": "hoogte",
      "url": "https://geodata.nationaalgeoregister.nl/ahn3/wms?",
      "layerName": "ahn3_05m_dsm",
      "styleName": "ahn3:ahn3_05m_detail"
    }, {
      "name": "gemeenten",
      "url": "https://geodata.nationaalgeoregister.nl/bestuurlijkegrenzen/wms?",
      "layerName": "gemeenten",
      "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"
    }, {
      "name": "provincies",
      "url": "https://geodata.nationaalgeoregister.nl/bestuurlijkegrenzen/wms?",
      "layerName": "provincies",
      "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"
    }]
  },
  "geocoder": {
    "suggestUrl": "https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?",
    "lookupUrl": "https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?",
    "placeholder": "Zoomen naar adres ..."
  },
  "map": {
    "style": 'standaard',
    "center": {
      "latitude": 52.093249,
      "longitude": 5.111994
    },
    "zoom": 8,
    "attribution": true,
    "extent": [-180, -90, 180, 90],
    "zoomposition": "topright"
  },
  "marker": {
    "url": "https://rawgit.com/geo-frontend/nlmaps/master/dist/assets/img/marker_icon.svg",
    "iconSize": [64, 64],
    "iconAnchor": [32, 64]
  },
  "classnames": {
    'geocoderContainer': ['nlmaps-geocoder-control-container'],
    'geocoderSearch': ['nlmaps-geocoder-control-search'],
    'geocoderButton': ['nlmaps-geocoder-control-button'],
    'geocoderResultList': ['nlmaps-geocoder-result-list'],
    'geocoderResultItem': ['nlmaps-geocoder-result-item'],
    'geocoderResultSelected': ['nlmaps-geocoder-result-selected']
  }
};

var CONFIG = {};
CONFIG.BASE_DEFAULTS = {
  crs: "EPSG:3857",
  attr: "",
  minZoom: 0,
  maxZoom: 19,
  type: "wmts",
  format: "png",
  url: ""
};
CONFIG.WMS_DEFAULTS = {
  url: "",
  version: "1.1.1",
  transparent: true,
  format: "image/png",
  minZoom: 0,
  maxZoom: 24,
  styleName: ""
};
CONFIG.BASEMAP_PROVIDERS = {};
CONFIG.WMS_PROVIDERS = {};
CONFIG.GEOCODER = {};
CONFIG.MAP = {
  "zoomposition": "bottomleft"
};
CONFIG.MARKER = {};
CONFIG.CLASSNAMES = {
  'geocoderContainer': ['nlmaps-geocoder-control-container'],
  'geocoderSearch': ['nlmaps-geocoder-control-search'],
  'geocoderButton': ['nlmaps-geocoder-control-button'],
  'geocoderResultList': ['nlmaps-geocoder-result-list'],
  'geocoderResultItem': ['nlmaps-geocoder-result-item']
};

function err(err) {
  throw err;
}

function mergeConfig(defaults, config) {
  return _extends({}, defaults, config);
}

function parseBase(basemaps) {
  console.log(basemaps);
  var defaults = mergeConfig(CONFIG.BASE_DEFAULTS, basemaps.defaults);

  if (!basemaps.layers || basemaps.layers.length < 0) {
    err('no basemap defined, please define a basemap in the configuration');
  }

  basemaps.layers.forEach(function (layer) {
    if (!layer.name || CONFIG.BASEMAP_PROVIDERS[layer.name] !== undefined) {
      err('basemap names need to be defined and unique: ' + layer.name);
    }

    CONFIG.BASEMAP_PROVIDERS[layer.name] = formatBasemapUrl(mergeConfig(defaults, layer));
  });
}

function parseWMS(wms) {
  var defaults = mergeConfig(CONFIG.WMS_DEFAULTS, wms.defaults);

  if (wms.layers) {
    wms.layers.forEach(function (layer) {
      if (!layer.name || CONFIG.WMS_PROVIDERS[layer.name] !== undefined) {
        err('wms names need to be defined and unique: ' + layer.name);
      }

      CONFIG.WMS_PROVIDERS[layer.name] = applyTemplate(mergeConfig(defaults, layer));
    });
  }
}

function parseGeocoder(geocoder) {
  CONFIG.GEOCODER.lookupUrl = geocoder.lookupUrl;
  CONFIG.GEOCODER.suggestUrl = geocoder.suggestUrl;
  CONFIG.GEOCODER.placeholder = geocoder.placeholder;
}

function parseMap(map) {
  CONFIG.MAP = mergeConfig(CONFIG.MAP, map);
}

function formatBasemapUrl(layer) {
  switch (layer.type) {
    case 'wmts':
      layer.url = "".concat(layer.url, "/").concat(layer.layerName, "/").concat(layer.crs, "/{z}/{x}/{y}.").concat(layer.format);
      break;

    case 'tms':
      layer.url = "".concat(layer.url, "/").concat(layer.layerName, "/{z}/{x}/{y}.").concat(layer.format);
      break;

    default:
      layer.url = "".concat(layer.url, "/").concat(layer.type, "/").concat(layer.layerName, "/").concat(layer.crs, "/{z}/{x}/{y}.").concat(layer.format);
  }

  return layer;
}

function applyTemplate(layer) {
  //Check if the url is templated
  var start = layer.url.indexOf('{');

  if (start > -1) {
    var end = layer.url.indexOf('}');
    var template = layer.url.slice(start + 1, end);

    if (template.toLowerCase() === "workspacename") {
      layer.url = layer.url.slice(0, start) + layer.workSpaceName + layer.url.slice(end + 1, -1);
    } else {
      err('only workspacename templates are supported for now');
    }
  }

  return layer;
}

function parseClasses(classes) {
  CONFIG.CLASSNAMES = mergeConfig(CONFIG.CLASSNAMES, classes);
}

function parseMarker(marker) {
  CONFIG.MARKER = marker;
}
if (config.map !== undefined) parseMap(config.map);
parseBase(config.basemaps);
if (config.wms !== undefined) parseWMS(config.wms);
if (config.geocoder !== undefined) parseGeocoder(config.geocoder);
if (config.marker !== undefined) parseMarker(config.marker);
if (config.classnames !== undefined) parseClasses(config.classnames);

var geocoder = CONFIG.GEOCODER;

function httpGetAsync(url) {
  // eslint-disable-next-line no-unused-vars
  return new Promise(function (resolve, reject) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
      // eslint-disable-next-line eqeqeq
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        resolve(JSON.parse(xmlHttp.responseText));
      }
    };

    xmlHttp.open("GET", url, true); // true for asynchronous

    xmlHttp.send(null);
  });
}

function wktPointToGeoJson(wktPoint) {
  if (!wktPoint.includes('POINT')) {
    throw TypeError('Provided WKT geometry is not a point.');
  }

  var coordinateTuple = wktPoint.split('(')[1].split(')')[0];
  var x = parseFloat(coordinateTuple.split(' ')[0]);
  var y = parseFloat(coordinateTuple.split(' ')[1]);
  return {
    type: 'Point',
    coordinates: [x, y]
  };
}

geocoder.resultList = [];
geocoder.selectedResult = -1;
/**
 * Make a call to PDOK locatieserver v3 suggest service. This service is meant for geocoder autocomplete functionality. For
 * additional documentation, check https://github.com/PDOK/locatieserver/wiki/API-Locatieserver.
 * @param {string} searchTerm The term which to search for
 */

geocoder.doSuggestRequest = function (searchTerm) {
  return httpGetAsync("".concat(this.suggestUrl, "q=").concat(encodeURIComponent(searchTerm)));
};
/**
 * Make a call to PDOK locatieserver v3 lookup service. This service provides information about objects found through the suggest service. For additional
 * documentation, check: https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
 * @param {string} id The id of the feature that is to be looked up.
 */


geocoder.doLookupRequest = function (id) {
  return httpGetAsync("".concat(this.lookupUrl, "id=").concat(encodeURIComponent(id))).then(function (lookupResult) {
    // A lookup request should always return 1 result
    var geocodeResult = lookupResult.response.docs[0];
    geocodeResult.centroide_ll = wktPointToGeoJson(geocodeResult.centroide_ll);
    geocodeResult.centroide_rd = wktPointToGeoJson(geocodeResult.centroide_rd);
    return geocodeResult;
  });
};

geocoder.createControl = function (zoomFunction, map, nlmaps) {
  var _this = this;

  this.zoomTo = zoomFunction;
  this.map = map;
  this.nlmaps = nlmaps;
  var container = document.createElement('div');
  var searchDiv = document.createElement('form');
  var input = document.createElement('input');
  var button = document.createElement('button');
  var results = document.createElement('div');
  parseClasses$1(container, CONFIG.CLASSNAMES.geocoderContainer);
  parseClasses$1(searchDiv, CONFIG.CLASSNAMES.geocoderSearch);
  container.addEventListener('click', function (e) {
    return e.stopPropagation();
  });
  container.addEventListener('dblclick', function (e) {
    return e.stopPropagation();
  });
  input.id = 'nlmaps-geocoder-control-input';
  input.placeholder = geocoder.placeholder;
  input.setAttribute('aria-label', geocoder.placeholder);
  input.setAttribute('type', 'text');
  input.setAttribute('autocapitalize', 'off');
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('autocorrect', 'off');
  input.setAttribute('spellcheck', 'false');
  input.addEventListener('keydown', function (e) {
    var results = _this.resultList;

    if (_this.resultList.length > 0) {
      if (e.code === 'ArrowDown' || e.keyCode === 40) {
        if (_this.selectedResult < _this.resultList.length - 1) {
          _this.selectedResult++;
        }

        _this.showLookupResult(results[_this.selectedResult]);
      }

      if (e.code === 'ArrowUp' || e.keyCode === 38) {
        if (_this.selectedResult > 0) {
          _this.selectedResult--;
        }

        _this.showLookupResult(results[_this.selectedResult]);
      }

      if (e.code === 'Escape') {
        _this.clearSuggestResults(true);
      }
    }
  });
  input.addEventListener('input', function (e) {
    _this.suggest(e.target.value);
  });
  input.addEventListener('focus', function (e) {
    _this.suggest(e.target.value);
  });
  button.setAttribute('type', 'submit');
  searchDiv.addEventListener('submit', function (e) {
    e.preventDefault();

    if (_this.resultList.length > 0) {
      _this.lookup(_this.resultList[_this.selectedResult < 0 ? 0 : _this.selectedResult].id);
    }
  });
  button.setAttribute('aria-label', geocoder.placeholder);
  parseClasses$1(button, CONFIG.CLASSNAMES.geocoderButton);
  results.id = 'nlmaps-geocoder-control-results';
  parseClasses$1(results, CONFIG.CLASSNAMES.geocoderResultList);
  results.classList.add('nlmaps-hidden');
  container.appendChild(searchDiv);
  searchDiv.appendChild(input);
  searchDiv.appendChild(button);
  container.appendChild(results);
  return container;
};

geocoder.suggest = function (query) {
  var _this2 = this;

  if (query.length < 3) {
    this.clearSuggestResults();
    return;
  }

  this.doSuggestRequest(query).then(function (results) {
    _this2.resultList = results.response.docs;

    _this2.showSuggestResults(_this2.resultList);
  });
};

geocoder.lookup = function (id) {
  var _this3 = this;

  this.doLookupRequest(id).then(function (result) {
    _this3.zoomTo(result.centroide_ll, _this3.map);

    _this3.nlmaps.emit('search-select', {
      location: result.weergavenaam,
      latlng: result.centroide_ll,
      resultObject: result
    });

    _this3.showLookupResult(result);

    _this3.clearSuggestResults();
  });
};

geocoder.clearSuggestResults = function (input) {
  this.selectedResult = -1;
  if (input) document.getElementById('nlmaps-geocoder-control-input').value = '';
  document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
  document.getElementById('nlmaps-geocoder-control-results').classList.add('nlmaps-hidden');
};

geocoder.showLookupResult = function (result) {
  var resultNodes = document.getElementsByClassName(CONFIG.CLASSNAMES.geocoderResultItem);
  Array.prototype.map.call(resultNodes, function (i) {
    return i.classList.remove(CONFIG.CLASSNAMES.geocoderResultSelected);
  });
  var resultNode = document.getElementById(result.id);
  if (resultNode) resultNode.classList.add(CONFIG.CLASSNAMES.geocoderResultSelected);
  document.getElementById('nlmaps-geocoder-control-input').value = result.weergavenaam;
};

function parseClasses$1(el, classes) {
  classes.forEach(function (classname) {
    el.classList.add(classname);
  });
}

geocoder.showSuggestResults = function (results) {
  var _this4 = this;

  this.clearSuggestResults();

  if (results.length > 0) {
    var resultList = document.createElement('ul');
    results.forEach(function (result) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.innerHTML = result.weergavenaam;
      a.id = result.id;
      parseClasses$1(a, CONFIG.CLASSNAMES.geocoderResultItem);
      a.setAttribute('href', '#');
      a.addEventListener('click', function (e) {
        e.preventDefault();

        _this4.lookup(e.target.id);
      });
      li.appendChild(a);
      resultList.appendChild(li);
    });
    document.getElementById('nlmaps-geocoder-control-results').classList.remove('nlmaps-hidden');
    document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
  }
};

function getMarker() {
  return CONFIG.MARKER;
}

function getExtent() {
  return CONFIG.MAP.extent;
}
/*
 * Get the named provider, or throw an exception if it doesn't exist.
 **/


function getProvider(name) {
  if (name in CONFIG.BASEMAP_PROVIDERS) {
    var provider = CONFIG.BASEMAP_PROVIDERS[name]; // eslint-disable-next-line no-console

    if (provider.deprecated && console && console.warn) {
      // eslint-disable-next-line no-console
      console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

    return provider;
  } else {
    // eslint-disable-next-line no-console
    console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' + Object.keys(CONFIG.BASEMAP_PROVIDERS).join(', '));
  }
}
/*
 * Get the named wmsProvider, or throw an exception if it doesn't exist.
 **/


function getWmsProvider(name, options) {
  var wmsProvider;

  if (name in CONFIG.WMS_PROVIDERS) {
    wmsProvider = CONFIG.WMS_PROVIDERS[name]; // eslint-disable-next-line no-console

    if (wmsProvider.deprecated && console && console.warn) {
      // eslint-disable-next-line no-console
      console.warn(name + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }
  } else {
    wmsProvider = _extends({}, CONFIG.WMS_DEFAULTS, options); // eslint-disable-next-line no-console

    console.log('NL Maps: You asked for a wms which does not exist! Available wmses: ' + Object.keys(CONFIG.WMS_PROVIDERS).join(', ') + '. Provide an options object to make your own WMS.');
  }

  return wmsProvider;
}

function mapPointerStyle(map) {
  if (map.hasOwnProperty('_container')) {
    var classList = map._container.classList;
    classList.add('nlmaps-marker-cursor');
  }
} //use named export instead of default because we might want

function extentLeafletFormat() {
  var extent = getExtent();
  var lowerLeft = L.latLng(extent[0], extent[1]);
  var upperRight = L.latLng(extent[2], extent[3]);
  var bounds = L.latLngBounds(lowerLeft, upperRight);
  return bounds;
} //TODO 'standaard' vervangen door eerste layer van baselayers


if (typeof L !== 'undefined' && (typeof L === "undefined" ? "undefined" : _typeof(L)) === 'object') {
  L.NlmapsBgLayer = L.TileLayer.extend({
    initialize: function initialize() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standaard';
      var options = arguments.length > 1 ? arguments[1] : undefined;
      var provider = getProvider(name);
      var opts = L.Util.extend({}, options, {
        'minZoom': provider.minZoom,
        'maxZoom': provider.maxZoom,
        'scheme': 'xyz',
        'attribution': provider.attribution,
        'subdomains': provider.subdomains ? provider.subdomains : 'abc',
        sa_id: name
      });
      L.TileLayer.prototype.initialize.call(this, provider.url, opts);
    }
  });
  /*
   * Factory function for consistency with Leaflet conventions
   **/

  L.nlmapsBgLayer = function (options, source) {
    return new L.NlmapsBgLayer(options, source);
  };

  L.NlmapsOverlayLayer = L.TileLayer.WMS.extend({
    initialize: function initialize() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var options = arguments.length > 1 ? arguments[1] : undefined;
      var wmsProvider = getWmsProvider(name, options);
      var url = wmsProvider.url;
      delete wmsProvider.url;
      var wmsParams = L.Util.extend({}, options, {
        layers: wmsProvider.layerName,
        maxZoom: 24,
        minZoom: 1,
        styles: wmsProvider.styleName,
        version: wmsProvider.version,
        transparent: wmsProvider.transparent,
        format: wmsProvider.format
      });
      L.TileLayer.WMS.prototype.initialize.call(this, url, wmsParams);
    }
  });
  /*
   * Factory function for consistency with Leaflet conventions
   **/

  L.nlmapsOverlayLayer = function (options, source) {
    return new L.NlmapsOverlayLayer(options, source);
  };

  L.Control.GeoLocatorControl = L.Control.extend({
    options: {
      position: 'topright'
    },
    initialize: function initialize(options) {
      // set default options if nothing is set (merge one step deep)
      for (var i in options) {
        if (_typeof(this.options[i]) === 'object') {
          L.extend(this.options[i], options[i]);
        } else {
          this.options[i] = options[i];
        }
      }
    },
    onAdd: function onAdd(map) {
      var div = L.DomUtil.create('div');
      div.id = 'nlmaps-geolocator-control';
      div.className = 'nlmaps-geolocator-control';
      var img = document.createElement('img');
      div.append(img);

      if (this.options.geolocator.isStarted()) {
        L.DomUtil.addClass(div, 'started');
      }

      function moveMap(position) {
        map.panTo([position.coords.latitude, position.coords.longitude]);
      }

      L.DomEvent.on(div, 'click', function () {
        this.options.geolocator.start();
        L.DomUtil.addClass(div, 'started');
      }, this);
      this.options.geolocator.on('position', function (d) {
        L.DomUtil.removeClass(div, 'started');
        L.DomUtil.addClass(div, 'has-position');
        moveMap(d);
      });
      return div;
    },
    onRemove: function onRemove(map) {
      return map;
    }
  });

  L.geoLocatorControl = function (geolocator) {
    return new L.Control.GeoLocatorControl({
      geolocator: geolocator
    });
  };
}

function markerLayer(latLngObject) {
  if (typeof L !== 'undefined' && (typeof L === "undefined" ? "undefined" : _typeof(L)) === 'object') {
    var lat;
    var lng; // LatLngObject should always be defined when it is called from the main package.
    // eslint-disable-next-line eqeqeq

    if (typeof latLngObject == 'undefined') {
      var center = getMapCenter(map);
      lat = center.latitude;
      lng = center.longitude;
    } else {
      lat = latLngObject.latitude;
      lng = latLngObject.longitude;
    }

    return new L.marker([lat, lng], {
      alt: 'marker',
      icon: new L.icon({
        iconUrl: getMarker().url,
        iconSize: getMarker().iconSize,
        iconAnchor: getMarker().iconAnchor
      })
    });
  }
}

function bgLayer(name) {
  if (typeof L !== 'undefined' && (typeof L === "undefined" ? "undefined" : _typeof(L)) === 'object') {
    return L.nlmapsBgLayer(name);
  }
}

function overlayLayer(name, options) {
  if (typeof L !== 'undefined' && (typeof L === "undefined" ? "undefined" : _typeof(L)) === 'object') {
    return L.nlmapsOverlayLayer(name, options);
  }
}

function geoLocatorControl(geolocator) {
  if (typeof L !== 'undefined' && (typeof L === "undefined" ? "undefined" : _typeof(L)) === 'object') {
    return L.geoLocatorControl(geolocator);
  }
}

function zoomTo(point, map) {
  map.fitBounds(L.geoJSON(point).getBounds(), {
    maxZoom: 18
  });
}

function geocoderControl(map, nlmaps) {
  var control = geocoder.createControl(zoomTo, map, nlmaps);
  map.getContainer().parentElement.insertBefore(control, map.getContainer().parentElement[0]);
}

function getMapCenter(map) {
  var latLngObject = map.getCenter();
  return {
    latitude: latLngObject.lat,
    longitude: latLngObject.lng
  };
} // Until the building works properly, this is here. Should be in browser-test.js ///

function bgLayer$1() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standaard';
  var provider = getProvider(name); //replace leaflet style subdomain to OL style

  if (provider.subdomains) {
    var sub = provider.subdomains;
    provider.url = provider.url.replace('{s}', '{' + sub.slice(0, 1) + '-' + sub.slice(-1) + '}');
  }

  if ((typeof ol === "undefined" ? "undefined" : _typeof(ol)) === "object") {
    return new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: provider.url,
        attributions: [new ol.Attribution({
          html: provider.attribution
        })]
      })
    });
  } else {
    throw 'openlayers is not defined';
  }
}

function markerLayer$1(latLngObject) {
  var markerStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [32, 63],
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      src: getMarker().url,
      scale: 1
    })
  });
  var lat;
  var lng; // eslint-disable-next-line eqeqeq

  if (typeof latLngObject == 'undefined') {
    var mapCenter = getMapCenter$1(map);
    lat = mapCenter.latitude;
    lng = mapCenter.longitude;
  } else {
    lat = latLngObject.latitude;
    lng = latLngObject.longitude;
  }

  var center = ol.proj.fromLonLat([lng, lat]);
  var markerFeature = new ol.Feature({
    geometry: new ol.geom.Point(center),
    name: 'marker'
  });
  markerFeature.setStyle(markerStyle);
  var markerSource = new ol.source.Vector({
    features: [markerFeature]
  });
  return new ol.layer.Vector({
    source: markerSource
  });
}

function overlayLayer$1(name, options) {
  var wmsProvider = getWmsProvider(name, options);

  if ((typeof ol === "undefined" ? "undefined" : _typeof(ol)) === "object") {
    return new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: wmsProvider.url,
        serverType: 'geoserver',
        params: {
          LAYERS: wmsProvider.layerName,
          VERSION: wmsProvider.version,
          STYLES: wmsProvider.styleName
        }
      })
    });
  } else {
    throw 'openlayers is not defined';
  }
}

function geoLocatorControl$1(geolocator, map) {
  var myControlEl = document.createElement('div');
  myControlEl.className = 'nlmaps-geolocator-control ol-control';
  myControlEl.addEventListener('click', function () {
    geolocator.start();
  });

  function moveMap(d) {
    var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : map;
    var oldZoom = map.getView().getZoom();
    var view = new ol.View({
      center: ol.proj.fromLonLat([d.coords.longitude, d.coords.latitude]),
      zoom: oldZoom
    });
    map.setView(view);
  }

  geolocator.on('position', function (d) {
    moveMap(d, map);
  });
  var control = new ol.control.Control({
    element: myControlEl
  });
  return control;
}

function zoomTo$1(point, map) {
  var newCenter = ol.proj.fromLonLat(point.coordinates);
  map.getView().setCenter(newCenter);
  map.getView().setZoom(18);
}

function getMapCenter$1(map) {
  var EPSG3857Coords = map.getView().getCenter();
  var lngLatCoords = ol.proj.toLonLat(EPSG3857Coords);
  return {
    longitude: lngLatCoords[0],
    latitude: lngLatCoords[1]
  };
}

function geocoderControl$1(map, nlmaps) {
  var control = geocoder.createControl(zoomTo$1, map, nlmaps);
  control = new ol.control.Control({
    element: control
  });
  map.addControl(control);
} /// Until the building works properly, this is here. Should be in browser-test.js ///

function AttributionControl(controlDiv, attrControlText) {
  if ((typeof google === "undefined" ? "undefined" : _typeof(google)) === 'object' && _typeof(google.maps) === 'object') {
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.opacity = '0.7';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.cursor = 'pointer';
    controlDiv.appendChild(controlUI); // Set CSS for the control interior.

    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '10px';
    controlText.innerHTML = attrControlText;
    controlUI.appendChild(controlText);
    controlDiv.index = 1;
    return controlDiv;
  } else {
    var error = 'google is not defined';
    throw error;
  }
}

function geoLocatorControl$2(geolocator, map) {
  var controlUI = document.createElement('div');
  controlUI.id = 'nlmaps-geolocator-control';
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.cursor = 'pointer';
  controlUI.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
  controlUI.style.height = '26px';
  controlUI.style.width = '26px';
  controlUI.style.borderRadius = '26px 26px';
  controlUI.style.margin = '.5em';
  controlUI.addEventListener('click', function () {
    geolocator.start();
  }, this);
  geolocator.on('position', function (position) {
    map.setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  });
  return controlUI;
}

function zoomTo$2(point, map) {
  map.setCenter({
    lat: point.coordinates[1],
    lng: point.coordinates[0]
  });
  map.setZoom(18);
}

function indexOfMapControl(controlArray, control) {
  return controlArray.getArray().indexOf(control);
}

function toggleAttrControl(attrControl, map) {
  var currentMapId = map.getMapTypeId();
  var controlArray = map.controls[google.maps.ControlPosition.BOTTOM_RIGHT];
  var indexToRemove = indexOfMapControl(controlArray, attrControl);

  if (currentMapId === 'roadmap' || currentMapId === 'hybrid' || currentMapId === 'sattelite') {
    if (indexToRemove > -1) {
      controlArray.removeAt(indexToRemove);
    }
  } else {
    if (indexToRemove === -1) {
      controlArray.push(attrControl);
    }
  }
}

function makeGoogleAttrControl() {
  var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : map;
  var attr = arguments.length > 1 ? arguments[1] : undefined;
  var attrControlDiv = document.createElement('div');
  var attrControlText = attr;
  var attrControl = new AttributionControl(attrControlDiv, attrControlText);
  map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(attrControl);
  map.addListener('maptypeid_changed', function () {
    return toggleAttrControl(attrControl, map);
  });
}

function makeGoogleLayerOpts(provider) {
  return {
    getTileUrl: function getTileUrl(coord, zoom) {
      var url = provider.url;
      var properties = {
        z: zoom,
        x: coord.x,
        y: coord.y
      };

      for (var i in properties) {
        url = url.replace("{" + i + "}", properties[i]);
      }

      return url;
    },
    tileSize: new google.maps.Size(256, 256),
    isPng: true,
    name: provider.name,
    maxZoom: provider.maxZoom,
    minZoom: provider.minZoom
  };
}

function getWmsTiledOptions(wmsProvider) {
  return {
    baseUrl: wmsProvider.url.indexOf('?') < 0 ? wmsProvider.url + '?' : wmsProvider.url,
    layers: wmsProvider.layerName,
    styles: wmsProvider.styleName,
    format: wmsProvider.format,
    transparent: wmsProvider.transparent,
    // todo maybe: add opacity to wmsProvider params
    opacity: 0.7
  };
}

function bgLayer$2(map) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'standaard';

  if ((typeof google === "undefined" ? "undefined" : _typeof(google)) === 'object' && _typeof(google.maps) === 'object') {
    var provider = getProvider(name);
    var GoogleLayerOpts = makeGoogleLayerOpts(provider);
    var layer = new google.maps.ImageMapType(GoogleLayerOpts); // warning: tight coupling with nlmaps.createMap

    var ourmap = map || this.map || 'undefined';

    if (typeof ourmap !== 'undefined') {
      makeGoogleAttrControl(ourmap, provider.attribution);
    }

    return layer;
  } else {
    var error = 'google is not defined';
    throw error;
  }
}

function toMercator(coord) {
  var lat = coord.lat();
  var lng = coord.lng();
  if (Math.abs(lng) > 180 || Math.abs(lat) > 90) return;
  var num = lng * 0.017453292519943295;
  var x = 6378137.0 * num;
  var a = lat * 0.017453292519943295;
  var merc_lon = x;
  var merc_lat = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
  return {
    x: merc_lon,
    y: merc_lat
  };
}

function WMSTiled(mapObject, wmsTiledOptions) {
  var options = {
    getTileUrl: function getTileUrl(coord, zoom) {
      var proj = mapObject.getProjection();
      var zfactor = Math.pow(2, zoom);
      var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
      var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));
      var ne = toMercator(top);
      var sw = toMercator(bot);
      var bbox = ne.x + ',' + sw.y + ',' + sw.x + ',' + ne.y;
      var url = wmsTiledOptions.baseUrl;
      url += 'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:3857';
      url += '&WIDTH=256';
      url += '&HEIGHT=256';
      url += '&LAYERS=' + wmsTiledOptions.layers;
      url += '&STYLES=' + wmsTiledOptions.styles;
      url += '&BBOX=' + bbox;
      url += '&FORMAT=' + wmsTiledOptions.format;
      url += '&TRANSPARENT=' + wmsTiledOptions.transparent;
      return url;
    },
    tileSize: new google.maps.Size(256, 256),
    isPng: true
  };
  var layer = new google.maps.ImageMapType(options);
  layer.setOpacity(wmsTiledOptions.opacity);
  return mapObject.overlayMapTypes.push(layer);
}

function overlayLayer$2() {
  var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : map;
  var name = arguments.length > 1 ? arguments[1] : undefined;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var wmsProvider = getWmsProvider(name, options);
  var wmsTiledOptions = getWmsTiledOptions(wmsProvider);
  var wmsLayer = new WMSTiled(map, wmsTiledOptions);
  wmsLayer.name = 'wms';
  return wmsLayer;
}

function markerLayer$2(latLngObject) {
  var lat;
  var lng; // eslint-disable-next-line eqeqeq

  if (typeof latLngObject == 'undefined') {
    var mapCenter = getMapCenter$2(map);
    lat = mapCenter.latitude;
    lng = mapCenter.longitude;
  } else {
    lat = latLngObject.latitude;
    lng = latLngObject.longitude;
  }

  var markerLocationLatLng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
    title: 'marker',
    position: markerLocationLatLng,
    icon: getMarker().url
  });
  return marker;
}

function getMapCenter$2(map) {
  return {
    latitude: map.getCenter().lat(),
    longitude: map.getCenter().lng()
  };
}

function geocoderControl$2(map, nlmaps) {
  var control = geocoder.createControl(zoomTo$2, map, nlmaps);
  map.getDiv().appendChild(control);
} // Until the building works properly, this is here. Should be in browser-test.js ///

var emitonoff$1 = createCommonjsModule(function (module) {
  var EmitOnOff = module.exports = function (thing) {
    if (!thing) thing = {};
    thing._subs = [];
    thing._paused = false;
    thing._pending = [];
    /**
     * Sub of pubsub
     * @param  {String}   name name of event
     * @param  {Function} cb   your callback
     */

    thing.on = function (name, cb) {
      thing._subs[name] = thing._subs[name] || [];

      thing._subs[name].push(cb);
    };
    /**
     * remove sub of pubsub
     * @param  {String}   name name of event
     * @param  {Function} cb   your callback
     */


    thing.off = function (name, cb) {
      if (!thing._subs[name]) return;

      for (var i in thing._subs[name]) {
        if (thing._subs[name][i] === cb) {
          thing._subs[name].splice(i);

          break;
        }
      }
    };
    /**
     * Pub of pubsub
     * @param  {String}   name name of event
     * @param  {Mixed}    data the data to publish
     */


    thing.emit = function (name) {
      if (!thing._subs[name]) return;
      var args = Array.prototype.slice.call(arguments, 1);

      if (thing._paused) {
        thing._pending[name] = thing._pending[name] || [];

        thing._pending[name].push(args);

        return;
      }

      for (var i in thing._subs[name]) {
        thing._subs[name][i].apply(thing, args);
      }
    };

    thing.pause = function () {
      thing._paused = true;
    };

    thing.resume = function () {
      thing._paused = false;

      for (var name in thing._pending) {
        for (var i = 0; i < thing._pending[name].length; i++) {
          thing.emit(name, thing._pending[name][i]);
        }
      }
    };

    return thing;
  };
});

var geoLocateDefaultOpts = {
  follow: false
};

function positionHandler(position) {
  this.emit('position', position);
}

function positionErrorHandler(error) {
  this.emit('error', error);
}

var GeoLocator = function GeoLocator(opts) {
  var state = _extends({}, geoLocateDefaultOpts, opts);

  return {
    start: function start() {
      state.started = true;
      navigator.geolocation.getCurrentPosition(positionHandler.bind(this), positionErrorHandler.bind(this), {
        maximumAge: 60000
      });
      return this;
    },
    stop: function stop() {
      state.started = false;
      return this;
    },
    isStarted: function isStarted() {
      return state.started;
    },
    log: function log() {
      // eslint-disable-next-line no-console
      console.log(state);
      return this;
    }
  };
};

function geoLocator(opts) {
  var navigator = typeof window !== 'undefined' ? window.navigator || {} : {};

  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    var geolocator = emitonoff$1(GeoLocator(opts));
    geolocator.on('position', function () {
      this.stop();
    });
    return geolocator;
  } else {
    var error = 'geolocation is not available in your browser.';
    throw error;
  }
}

function query(url) {
  var promise = new Promise(function (resolve, reject) {
    fetch(url).then(function (res) {
      return resolve(res.json());
    })["catch"](function (err) {
      return reject(err);
    });
  });
  return promise;
} //transforming operator
//returns an object with original latlng and queryResult:
// {
//   queryResult: {},
//   latlng: d.latlng
// }
// user-supplied responseFormatter is used to create queryResult.


var pointToQuery = function pointToQuery(url, requestFormatter, responseFormatter) {
  return function (inputSource) {
    return function outputSource(start, outputSink) {
      if (start !== 0) return;
      inputSource(0, function (t, d) {
        if (t === 1) {
          var queryUrl = requestFormatter(url, {
            x: d.latlng.lng,
            y: d.latlng.lat
          });
          query(queryUrl).then(function (res) {
            var output = {
              queryResult: responseFormatter(res),
              latlng: d.latlng
            };
            outputSink(1, output);
          });
        } else {
          outputSink(t, d);
        }
      });
    };
  };
}; //constructor to create a 'clickpricker' in one go.


var queryFeatures = function queryFeatures(source, baseUrl, requestFormatter, responseFormatter) {
  var querier = pointToQuery(baseUrl, requestFormatter, responseFormatter)(source);

  querier.subscribe = function (callback) {
    querier(0, callback);
  };

  return querier;
};

var markerStore = {
  markers: [],
  removeMarker: function removeMarker(marker) {
    var idx = markerStore.markers.findIndex(function (x) {
      return x === marker;
    });
    markerStore.markers[idx].remove();
    markerStore.markers.splice(idx, 1);
  },
  addMarker: function addMarker(marker) {
    var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    markerStore.markers.push(marker);

    if (marker.hasOwnProperty('on')) {
      if (remove) {
        marker.on('click', function () {
          markerStore.removeMarker(marker);
        });
      }
    }
  }
};

function createAndAddMarker(map, d, popupCreator, unclickable) {
  var newmarker = L.marker([d.latlng.lat, d.latlng.lng], {
    alt: 'marker',
    icon: new L.icon({
      iconUrl: getMarker().url,
      iconSize: getMarker().iconSize,
      iconAnchor: getMarker().iconAnchor
    })
  });
  newmarker.addTo(map);

  if (popupCreator) {
    var div = popupCreator.call(markerStore, d, newmarker);
    var popup = L.popup({
      offset: [0, -50]
    }).setContent(div);
    newmarker.bindPopup(popup).openPopup();
    markerStore.addMarker(newmarker);
  } else if (unclickable) {
    markerStore.addMarker(newmarker);
  } else {
    markerStore.addMarker(newmarker, true);
  }
} //TODO: discuss the various function parameters


function singleMarker(map, popupCreator, unclickable) {
  mapPointerStyle(map);
  return function (t, d, p, u) {
    if (t === 1) {
      if (markerStore.markers[0]) {
        markerStore.removeMarker(markerStore.markers[0]);
      }

      createAndAddMarker(map, d, popupCreator, u);
    }
  };
}

function multiMarker(map, popupCreator, unclickable) {
  mapPointerStyle(map);
  return function (t, d) {
    if (t === 1) {
      createAndAddMarker(map, d, popupCreator, unclickable);
    }
  };
}

var nlmaps = {
  leaflet: {
    bgLayer: bgLayer,
    overlayLayer: overlayLayer,
    markerLayer: markerLayer,
    geocoderControl: geocoderControl,
    geoLocatorControl: geoLocatorControl
  },
  openlayers: {
    bgLayer: bgLayer$1,
    overlayLayer: overlayLayer$1,
    markerLayer: markerLayer$1,
    geocoderControl: geocoderControl$1,
    geoLocatorControl: geoLocatorControl$1
  },
  googlemaps: {
    bgLayer: bgLayer$2,
    overlayLayer: overlayLayer$2,
    markerLayer: markerLayer$2,
    geoLocatorControl: geoLocatorControl$2,
    geocoderControl: geocoderControl$2
  }
}; //set nlmaps up as event bus

emitonoff(nlmaps); //for future use

var geoLocateDefaultOpts$1 = {};

function testWhichLib() {
  var defined = [];

  if ((typeof L === "undefined" ? "undefined" : _typeof(L)) === 'object') {
    defined.push('leaflet');
  }

  if ((typeof google === "undefined" ? "undefined" : _typeof(google)) === 'object' && _typeof(google.maps) === 'object') {
    defined.push('googlemaps');
  }

  if ((typeof ol === "undefined" ? "undefined" : _typeof(ol)) === 'object') {
    defined.push('openlayers');
  }

  if (defined.length > 1) {
    return 'too many libs';
  } else if (defined.length === 0) {
    return 'too few libs';
  } else {
    return defined[0];
  }
}

function initMap(lib, opts) {
  var map, rootdiv, el, options;

  switch (lib) {
    case 'leaflet':
      //work-around to prevent mapdragging at text selection
      rootdiv = document.getElementById(opts.target);
      rootdiv.style.position = 'relative';
      rootdiv.style.padding = '0px';
      rootdiv.style.margin = '0px';
      options = {};

      if (!opts.attribution) {
        options.attributionControl = false;
      }

      el = L.DomUtil.create('div');
      el.style.height = '100%';
      rootdiv.appendChild(el);
      options.maxBounds = extentLeafletFormat();
      map = L.map(el, options).setView([opts.center.latitude, opts.center.longitude], opts.zoom);

      if (opts.attribution) {
        map.attributionControl.setPrefix(false);
      }

      map.zoomControl.setPosition(CONFIG.MAP.zoomposition);
      break;

    case 'googlemaps':
      map = new google.maps.Map(document.getElementById(opts.target), {
        center: {
          lat: opts.center.latitude,
          lng: opts.center.longitude
        },
        zoom: opts.zoom,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        fullscreenControl: false
      });
      break;

    case 'openlayers':
      map = new ol.Map({
        view: new ol.View({
          center: ol.proj.fromLonLat([opts.center.longitude, opts.center.latitude]),
          zoom: opts.zoom
        }),
        controls: ol.control.defaults({
          attribution: false
        }).extend([new ol.control.Attribution({
          collapsible: false
        })]),
        target: opts.target
      });
      map.getTargetElement().getElementsByClassName('ol-zoom')[0].style.cssText = "left: 5px !important; bottom: 5px !important";
      map.getTargetElement().getElementsByClassName('ol-zoom')[0].classList.remove('ol-zoom');
      break;
  }

  return map;
} // can set center, with optional zoom.

function addGoogleLayer(layer, map) {
  // Markers are not considered to be a layer in google maps. Therefore, they must be added differently.
  // It is important that a layer has the title 'marker' in order to be recognized as a layer.
  if (layer.title === 'marker') {
    layer.setMap(map);
    return;
  }

  var mapTypeIds = [layer.name, 'roadmap'];

  if (layer.name === 'wms') {
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds,
        position: google.maps.ControlPosition.BOTTOM_LEFT
      }
    });
    return;
  }

  map.setOptions({
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: mapTypeIds,
      position: google.maps.ControlPosition.BOTTOM_LEFT
    }
  });
  map.mapTypes.set(layer.name, layer);
  map.setMapTypeId(layer.name);
}

function addLayerToMap(lib, layer, map) {
  switch (lib) {
    case 'leaflet':
      map.addLayer(layer);
      break;

    case 'googlemaps':
      addGoogleLayer(layer, map);
      break;

    case 'openlayers':
      map.addLayer(layer);
      break;
  }
}

function createBackgroundLayer(lib, map, name) {
  var bgLayer;

  switch (lib) {
    case 'leaflet':
      bgLayer = nlmaps.leaflet.bgLayer(name);
      break;

    case 'googlemaps':
      bgLayer = nlmaps.googlemaps.bgLayer(map, name);
      break;

    case 'openlayers':
      bgLayer = nlmaps.openlayers.bgLayer(name);
      break;
  }

  return bgLayer;
}

function createOverlayLayer(lib, map, name) {
  var overlayLayer;

  switch (lib) {
    case 'leaflet':
      overlayLayer = nlmaps.leaflet.overlayLayer(name);
      break;

    case 'googlemaps':
      overlayLayer = nlmaps.googlemaps.overlayLayer(map, name);
      break;

    case 'openlayers':
      overlayLayer = nlmaps.openlayers.overlayLayer(name);
      break;
  }

  return overlayLayer;
}

function createMarkerLayer(lib, map, latLngObject) {
  var markerLayer;

  switch (lib) {
    case 'leaflet':
      markerLayer = nlmaps.leaflet.markerLayer(latLngObject);
      break;

    case 'googlemaps':
      markerLayer = nlmaps.googlemaps.markerLayer(latLngObject);
      break;

    case 'openlayers':
      markerLayer = nlmaps.openlayers.markerLayer(latLngObject);
      break;
  }

  return markerLayer;
}

function getMapCenter$3(lib, map) {
  var mapCenter;

  switch (lib) {
    case 'leaflet':
      mapCenter = getMapCenter(map);
      break;

    case 'googlemaps':
      mapCenter = getMapCenter$2(map);
      break;

    case 'openlayers':
      mapCenter = getMapCenter$1(map);
      break;
  }

  return mapCenter;
}

function mergeOpts(defaultopts, useropts) {
  return _extends({}, defaultopts, useropts);
}

nlmaps.lib = testWhichLib();

nlmaps.createMap = function () {
  var useropts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opts = mergeOpts(CONFIG.MAP, useropts);

  try {
    if (nlmaps.lib == 'too many libs' || nlmaps.lib === 'too few libs') {
      throw {
        message: 'one and only one map library can be defined. Please Refer to the documentation to see which map libraries are supported.'
      };
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }

  var map = initMap(nlmaps.lib, opts); // Background layer

  var backgroundLayer = createBackgroundLayer(nlmaps.lib, map, opts.style);
  addLayerToMap(nlmaps.lib, backgroundLayer, map, opts.style); // Geocoder

  if (opts.search) {
    addGeocoderControlToMap(nlmaps.lib, map);
  } // Marker layer


  if (opts.marker) {
    var markerLocation = opts.marker;

    if (typeof opts.marker === "boolean") {
      markerLocation = getMapCenter$3(nlmaps.lib, map);
    }

    var marker = createMarkerLayer(nlmaps.lib, map, markerLocation);
    markerStore.addMarker(marker, true);
    addLayerToMap(nlmaps.lib, marker, map);
  } // Overlay layer


  if (opts.overlay && opts.overlay !== 'false') {
    var overlayLayer = createOverlayLayer(nlmaps.lib, map, opts.overlay);
    addLayerToMap(nlmaps.lib, overlayLayer, map);
  } //add click event passing through L click event


  if (map !== undefined) {
    if (nlmaps.lib === 'leaflet') {
      map.on('click', function (e) {
        nlmaps.emit('mapclick', e);
      });
    }
  }

  return map;
};

function addGeoLocControlToMap(lib, geolocator, map) {
  var control;

  switch (lib) {
    case 'leaflet':
      nlmaps[lib].geoLocatorControl(geolocator).addTo(map);
      break;

    case 'googlemaps':
      control = nlmaps[lib].geoLocatorControl(geolocator, map);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);
      break;

    case 'openlayers':
      control = nlmaps[lib].geoLocatorControl(geolocator, map);
      map.addControl(control);
      break;
  }
}

function addGeocoderControlToMap(lib, map) {
  nlmaps[lib].geocoderControl(map, nlmaps);
}

nlmaps.geoLocate = function (map) {
  var useropts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var opts = mergeOpts(geoLocateDefaultOpts$1, useropts);
  var geolocator = geoLocator(opts);
  addGeoLocControlToMap(nlmaps.lib, geolocator, map);
};

nlmaps.clickProvider = function (map) {
  if (nlmaps.lib === 'leaflet') {
    mapPointerStyle(map);

    var clickSource = function clickSource(start, sink) {
      if (start !== 0) return;
      map.on('click', function (e) {
        sink(1, e);
      });

      var talkback = function talkback(t, d) {};

      sink(0, talkback);
    };

    clickSource.subscribe = function (callback) {
      clickSource(0, callback);
    };

    return clickSource;
  }
};

nlmaps.queryFeatures = queryFeatures;
nlmaps.singleMarker = singleMarker;
nlmaps.multiMarker = multiMarker;

exports.nlmaps = nlmaps;
//# sourceMappingURL=nlmaps.cjs.js.map
