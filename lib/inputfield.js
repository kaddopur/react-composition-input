'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// detect whether it is chrome 
var isChrome = !!window.chrome && !!window.chrome.webstore;

var InputField = function (_Component) {
    _inherits(InputField, _Component);

    function InputField(props, context) {
        _classCallCheck(this, InputField);

        var _this = _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).call(this, props, context));

        _this.handleInputChange = function (event) {
            console.log('触发input事件' + new Date().getTime() + 'this.emittedInput ' + _this.emittedInput);
            var userInputValue = event.target.value;
            if (!_this.isOnComposition) {
                _this.setState({
                    tempInput: userInputValue
                });
                event.target.value = userInputValue;
                _this.props.onInputChange(event);
                _this.emittedInput = true;
            } else {
                _this.setState({
                    tempInput: userInputValue
                });
                _this.emittedInput = false;
            }
        };

        _this.handleComposition = function (event) {
            console.log('触发composition event', event.type);
            if (event.type === 'compositionstart') {
                _this.isOnComposition = true;
                _this.emittedInput = false;
            } else if (event.type === 'compositionend') {
                _this.isOnComposition = false;
                // fixed for Chrome v53+ and detect all Chrome
                // https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
                // also fixed for the native Apple keyboard which emit input event before composition event
                // subscribe this issue: https://github.com/facebook/react/issues/8683
                if (!_this.emittedInput) {
                    _this.handleInputChange(event);
                }
            }
        };

        _this.state = {
            tempInput: _this.props.defaultValue || ''
        };
        _this.isOnComposition = false;
        _this.emittedInput = true;
        return _this;
    }

    _createClass(InputField, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                onInputChange = _props.onInputChange,
                restProps = _objectWithoutProperties(_props, ['onInputChange']);

            return _react2.default.createElement('input', _extends({
                type: 'text',
                ref: function ref(input) {
                    _this2.input = input;
                },
                value: this.state.tempInput,
                onChange: this.handleInputChange,
                onCompositionStart: this.handleComposition,
                onCompositionEnd: this.handleComposition
            }, restProps));
        }
    }]);

    return InputField;
}(_react.Component);

exports.default = InputField;