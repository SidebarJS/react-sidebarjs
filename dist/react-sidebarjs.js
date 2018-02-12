/*
 * ReactSidebarJS
 * Version 1.0.0
 * https://github.com/SidebarJS/react-sidebarjs#readme
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('react-proptypes'));

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sidebarjs = createCommonjsModule(function (module, exports) {
/*
 * SidebarJS
 * Version 5.0.0
 * https://github.com/SidebarJS/sidebarjs#readme
 */

(function (global, factory) {
	factory(exports);
}(commonjsGlobal, (function (exports) { function unwrapExports$$1 (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sidebarElement = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var SIDEBARJS = 'sidebarjs';
var IS_VISIBLE = SIDEBARJS + "--is-visible";
var IS_MOVING = SIDEBARJS + "--is-moving";
var LEFT_POSITION = 'left';
var RIGHT_POSITION = 'right';
var POSITIONS = [LEFT_POSITION, RIGHT_POSITION];
var SidebarElement = /** @class */ (function () {
    function SidebarElement(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this.toggle = function () {
            _this.isVisible() ? _this.close() : _this.open();
        };
        this.open = function () {
            _this.component.classList.add(IS_VISIBLE);
            _this.setBackdropOpacity(_this.backdropOpacity);
        };
        this.close = function () {
            _this.component.classList.remove(IS_VISIBLE);
            _this.backdrop.removeAttribute('style');
        };
        this.__onTouchStart = function (e) {
            _this.initialTouch = e.touches[0].pageX;
        };
        this.__onTouchMove = function (e) {
            var documentSwiped = Math.abs(_this.initialTouch - e.touches[0].clientX);
            var sidebarMovement = _this.container.clientWidth - documentSwiped;
            if (sidebarMovement <= _this.container.clientWidth) {
                _this.touchMoveSidebar = documentSwiped;
                _this.moveSidebar(_this.hasLeftPosition() ? -documentSwiped : documentSwiped);
            }
        };
        this.__onTouchEnd = function () {
            _this.component.classList.remove(IS_MOVING);
            _this.container.removeAttribute('style');
            _this.backdrop.removeAttribute('style');
            _this.touchMoveSidebar > (_this.container.clientWidth / 3.5) ? _this.close() : _this.open();
            _this.initialTouch = null;
            _this.touchMoveSidebar = null;
        };
        this.__onSwipeOpenStart = function (e) {
            if (_this.targetElementIsBackdrop(e)) {
                return;
            }
            var touchPositionX = e.touches[0].clientX;
            var documentTouch = _this.hasLeftPosition() ? touchPositionX : document.body.clientWidth - touchPositionX;
            if (documentTouch < _this.documentSwipeRange) {
                _this.__onTouchStart(e);
            }
        };
        this.__onSwipeOpenMove = function (e) {
            if (!_this.targetElementIsBackdrop(e) && _this.initialTouch && !_this.isVisible()) {
                var documentSwiped = e.touches[0].clientX - _this.initialTouch;
                var hasLeftPosition = _this.hasLeftPosition();
                var sidebarMovement = _this.container.clientWidth - (hasLeftPosition ? documentSwiped : -documentSwiped);
                if (sidebarMovement > 0) {
                    _this.openMovement = hasLeftPosition ? -sidebarMovement : sidebarMovement;
                    _this.moveSidebar(_this.openMovement);
                }
            }
        };
        this.__onSwipeOpenEnd = function () {
            if (_this.openMovement) {
                _this.openMovement = null;
                _this.__onTouchEnd();
            }
        };
        this.__onTransitionEnd = function () {
            var isVisible = _this.isVisible();
            if (isVisible && !_this.__wasVisible) {
                _this.__wasVisible = true;
                if (_this.__emitOnOpen) {
                    _this.__emitOnOpen();
                }
            }
            else if (!isVisible && _this.__wasVisible) {
                _this.__wasVisible = false;
                if (_this.__emitOnClose) {
                    _this.__emitOnClose();
                }
            }
            if (_this.__emitOnChangeVisibility) {
                _this.__emitOnChangeVisibility({ isVisible: isVisible });
            }
        };
        var component = config.component, container = config.container, backdrop = config.backdrop, _a = config.documentMinSwipeX, documentMinSwipeX = _a === void 0 ? 10 : _a, _b = config.documentSwipeRange, documentSwipeRange = _b === void 0 ? 40 : _b, nativeSwipe = config.nativeSwipe, nativeSwipeOpen = config.nativeSwipeOpen, _c = config.position, position = _c === void 0 ? 'left' : _c, _d = config.backdropOpacity, backdropOpacity = _d === void 0 ? 0.3 : _d, onOpen = config.onOpen, onClose = config.onClose, onChangeVisibility = config.onChangeVisibility;
        var hasCustomTransclude = container && backdrop;
        this.component = component || document.querySelector("[" + SIDEBARJS + "]");
        this.container = hasCustomTransclude ? container : SidebarElement.create(SIDEBARJS + "-container");
        this.backdrop = hasCustomTransclude ? backdrop : SidebarElement.create(SIDEBARJS + "-backdrop");
        this.documentMinSwipeX = documentMinSwipeX;
        this.documentSwipeRange = documentSwipeRange;
        this.nativeSwipe = nativeSwipe !== false;
        this.nativeSwipeOpen = nativeSwipeOpen !== false;
        this.backdropOpacity = backdropOpacity;
        this.backdropOpacityRatio = 1 / backdropOpacity;
        this.__emitOnOpen = onOpen;
        this.__emitOnClose = onClose;
        this.__emitOnChangeVisibility = onChangeVisibility;
        if (!hasCustomTransclude) {
            try {
                this.transcludeContent();
            }
            catch (e) {
                throw new Error('You must define an element with [sidebarjs] attribute');
            }
        }
        if (this.nativeSwipe) {
            this.addNativeGestures();
            if (this.nativeSwipeOpen) {
                this.addNativeOpenGestures();
            }
        }
        this.setPosition(position);
        this.addAttrsEventsListeners(this.component.getAttribute(SIDEBARJS));
        this.addTransitionListener();
        this.backdrop.addEventListener('click', this.close, { passive: true });
    }
    SidebarElement.prototype.isVisible = function () {
        return this.component.classList.contains(IS_VISIBLE);
    };
    SidebarElement.prototype.destroy = function () {
        var _this = this;
        this.component.removeEventListener('touchstart', this.__onTouchStart, { passive: true });
        this.component.removeEventListener('touchmove', this.__onTouchMove, { passive: true });
        this.component.removeEventListener('touchend', this.__onTouchEnd, { passive: true });
        this.container.removeEventListener('transitionend', this.__onTransitionEnd, { passive: true });
        this.backdrop.removeEventListener('click', this.close, { passive: true });
        document.removeEventListener('touchstart', this.__onSwipeOpenStart, { passive: true });
        document.removeEventListener('touchmove', this.__onSwipeOpenMove, { passive: true });
        document.removeEventListener('touchend', this.__onSwipeOpenEnd, { passive: true });
        this.removeAttrsEventsListeners(this.component.getAttribute(SIDEBARJS));
        this.removeComponentClassPosition();
        while (this.container.firstElementChild) {
            this.component.appendChild(this.container.firstElementChild);
        }
        this.component.removeChild(this.container);
        this.component.removeChild(this.backdrop);
        Object.keys(this).forEach(function (key) { return _this[key] = null; });
    };
    SidebarElement.prototype.setPosition = function (position) {
        var _this = this;
        this.component.classList.add(IS_MOVING);
        this.position = POSITIONS.indexOf(position) >= 0 ? position : LEFT_POSITION;
        this.removeComponentClassPosition();
        this.component.classList.add(SIDEBARJS + "--" + (this.hasRightPosition() ? RIGHT_POSITION : LEFT_POSITION));
        setTimeout(function () { return _this.component.classList.remove(IS_MOVING); }, 200);
    };
    SidebarElement.prototype.addAttrsEventsListeners = function (sidebarName) {
        var _this = this;
        this.forEachActionElement(sidebarName, function (element, action) {
            if (!SidebarElement.elemHasListener(element)) {
                element.addEventListener('click', _this[action], { passive: true });
                SidebarElement.elemHasListener(element, true);
            }
        });
    };
    SidebarElement.prototype.removeAttrsEventsListeners = function (sidebarName) {
        var _this = this;
        this.forEachActionElement(sidebarName, function (element, action) {
            if (SidebarElement.elemHasListener(element)) {
                element.removeEventListener('click', _this[action]);
                SidebarElement.elemHasListener(element, false);
            }
        });
    };
    SidebarElement.prototype.addTransitionListener = function () {
        this.__wasVisible = this.isVisible();
        this.container.addEventListener('transitionend', this.__onTransitionEnd, { passive: true });
    };
    SidebarElement.prototype.forEachActionElement = function (sidebarName, func) {
        var actions = ['toggle', 'open', 'close'];
        for (var i = 0; i < actions.length; i++) {
            var elements = document.querySelectorAll("[" + SIDEBARJS + "-" + actions[i] + "=\"" + sidebarName + "\"]");
            for (var j = 0; j < elements.length; j++) {
                func(elements[j], actions[i]);
            }
        }
    };
    SidebarElement.prototype.removeComponentClassPosition = function () {
        for (var i = 0; i < POSITIONS.length; i++) {
            this.component.classList.remove(SIDEBARJS + "--" + POSITIONS[i]);
        }
    };
    SidebarElement.prototype.hasLeftPosition = function () {
        return this.position === LEFT_POSITION;
    };
    SidebarElement.prototype.hasRightPosition = function () {
        return this.position === RIGHT_POSITION;
    };
    SidebarElement.prototype.transcludeContent = function () {
        while (this.component.firstChild) {
            this.container.appendChild(this.component.firstChild);
        }
        while (this.component.firstChild) {
            this.component.removeChild(this.component.firstChild);
        }
        this.component.appendChild(this.container);
        this.component.appendChild(this.backdrop);
    };
    SidebarElement.prototype.addNativeGestures = function () {
        this.component.addEventListener('touchstart', this.__onTouchStart, { passive: true });
        this.component.addEventListener('touchmove', this.__onTouchMove, { passive: true });
        this.component.addEventListener('touchend', this.__onTouchEnd, { passive: true });
    };
    SidebarElement.prototype.addNativeOpenGestures = function () {
        document.addEventListener('touchstart', this.__onSwipeOpenStart, { passive: true });
        document.addEventListener('touchmove', this.__onSwipeOpenMove, { passive: true });
        document.addEventListener('touchend', this.__onSwipeOpenEnd, { passive: true });
    };
    SidebarElement.prototype.moveSidebar = function (movement) {
        this.component.classList.add(IS_MOVING);
        SidebarElement.vendorify(this.container, 'transform', "translate(" + movement + "px, 0)");
        this.updateBackdropOpacity(movement);
    };
    SidebarElement.prototype.updateBackdropOpacity = function (movement) {
        var swipeProgress = 1 - (Math.abs(movement) / this.container.clientWidth);
        var opacity = swipeProgress / this.backdropOpacityRatio;
        this.setBackdropOpacity(opacity);
    };
    SidebarElement.prototype.setBackdropOpacity = function (opacity) {
        this.backdrop.style.opacity = opacity.toString();
    };
    SidebarElement.prototype.targetElementIsBackdrop = function (e) {
        return e.target.hasAttribute(SIDEBARJS + "-backdrop");
    };
    SidebarElement.create = function (element) {
        var el = document.createElement('div');
        el.setAttribute(element, '');
        return el;
    };
    SidebarElement.vendorify = function (el, prop, val) {
        el.style['Webkit' + prop.charAt(0).toUpperCase() + prop.slice(1)] = val;
        el.style[prop] = val;
    };
    SidebarElement.elemHasListener = function (elem, value) {
        return elem && typeof value === 'boolean' ? elem.sidebarjsListener = value : !!elem.sidebarjsListener;
    };
    return SidebarElement;
}());
exports.SidebarElement = SidebarElement;

});

unwrapExports$$1(sidebarElement);
var sidebarElement_1 = sidebarElement.SidebarElement;

var sidebarService = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var SidebarService = /** @class */ (function () {
    function SidebarService() {
        this.instances = {};
    }
    SidebarService.prototype.create = function (options) {
        if (options === void 0) { options = {}; }
        var name = options.component && options.component.getAttribute('sidebarjs') || '';
        this.instances[name] = new sidebarElement.SidebarElement(options);
        return this.instances[name];
    };
    SidebarService.prototype.open = function (sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        if (this.instances[sidebarName]) {
            this.instances[sidebarName].open();
        }
    };
    SidebarService.prototype.close = function (sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        if (this.instances[sidebarName]) {
            this.instances[sidebarName].close();
        }
    };
    SidebarService.prototype.toggle = function (sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        if (this.instances[sidebarName]) {
            this.instances[sidebarName].toggle();
        }
    };
    SidebarService.prototype.isVisible = function (sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        return !!this.instances[sidebarName] && this.instances[sidebarName].isVisible();
    };
    SidebarService.prototype.setPosition = function (position, sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        if (this.instances[sidebarName]) {
            this.instances[sidebarName].setPosition(position);
        }
    };
    SidebarService.prototype.elemHasListener = function (elem, value) {
        return sidebarElement.SidebarElement.elemHasListener(elem, value);
    };
    SidebarService.prototype.destroy = function (sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        if (this.instances[sidebarName]) {
            this.instances[sidebarName].destroy();
            this.instances[sidebarName] = null;
            delete this.instances[sidebarName];
        }
    };
    return SidebarService;
}());
exports.SidebarService = SidebarService;

});

unwrapExports$$1(sidebarService);
var sidebarService_1 = sidebarService.SidebarService;

var src = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.SidebarElement = sidebarElement.SidebarElement;

exports.SidebarService = sidebarService.SidebarService;

});

var index = unwrapExports$$1(src);
var src_1 = src.SidebarElement;
var src_2 = src.SidebarService;

exports.default = index;
exports.SidebarElement = src_1;
exports.SidebarService = src_2;

Object.defineProperty(exports, '__esModule', { value: true });

})));
});

unwrapExports(sidebarjs);

var sidebarjs$2 = sidebarjs;

var sidebarjs_1 = sidebarjs$2.SidebarService;
var sidebarjs_2 = sidebarjs$2.SidebarElement;

var instance = new sidebarjs_1();

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
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



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var SidebarJS = function (_Component) {
  inherits(SidebarJS, _Component);

  function SidebarJS() {
    classCallCheck(this, SidebarJS);
    return possibleConstructorReturn(this, (SidebarJS.__proto__ || Object.getPrototypeOf(SidebarJS)).apply(this, arguments));
  }

  createClass(SidebarJS, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var userConfig = this.props.sidebarjsConfig || {};
      var baseConfig = {
        component: this.component,
        container: this.container,
        backdrop: this.backdrop
      };
      var onOpen = userConfig.onOpen || this.props.onOpen;
      var onClose = userConfig.onClose || this.props.onClose;
      var onChangeVisibility = userConfig.onChangeVisibility || this.props.onChangeVisibility;
      instance.create(_extends({}, baseConfig, userConfig, {
        onOpen: onOpen,
        onClose: onClose,
        onChangeVisibility: onChangeVisibility
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          sidebarjsName = _props.sidebarjsName,
          children = _props.children;

      return React__default.createElement(
        'div',
        { sidebarjs: sidebarjsName, ref: function ref(node) {
            return _this2.component = node;
          } },
        React__default.createElement(
          'div',
          { 'sidebarjs-container': 'true', ref: function ref(node) {
              return _this2.container = node;
            } },
          children
        ),
        React__default.createElement('div', { 'sidebarjs-backdrop': 'true', ref: function ref(node) {
            return _this2.backdrop = node;
          } })
      );
    }
  }]);
  return SidebarJS;
}(React.Component);

SidebarJS.propTypes = {
  sidebarjsName: PropTypes.string.isRequired,
  sidebarjsConfig: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onChangeVisibility: PropTypes.func
};

exports.SidebarJS = SidebarJS;
exports.sidebarService = instance;
