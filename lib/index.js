"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/tree/style/css");

var _tree = _interopRequireDefault(require("antd/es/tree"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TreeNode = _tree["default"].TreeNode;
var Search = _input["default"].Search;

var getParentKey = function getParentKey(key, tree) {
  var parentKey;

  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];

    if (node.children) {
      if (node.children.some(function (item) {
        return item.key === key;
      })) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }

  return parentKey;
};

var SearchTree = function SearchTree(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      expandedKeys = _useState2[0],
      setExpandedKeys = _useState2[1];

  var _useState3 = (0, _react.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      searchValue = _useState4[0],
      setSearchValue = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      autoExpandParent = _useState6[0],
      setAutoExpandParent = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      dataList = _useState8[0],
      setDataList = _useState8[1];

  var dataSource = props.dataSource,
      parentCheckedAble = props.parentCheckedAble,
      parentNodeHide = props.parentNodeHide,
      childNodeHide = props.childNodeHide,
      checkStrictly = props.checkStrictly,
      placeholder = props.placeholder;
  (0, _react.useEffect)(function () {
    setDataList(generateList(dataSource));
  }, [dataSource]);

  var onExpand = function onExpand(keys) {
    setExpandedKeys(keys);
    setAutoExpandParent(false);
  };

  var onChange = function onChange(e) {
    var value = e.target.value;

    if (!value || value === "") {
      setSearchValue(value);
      setExpandedKeys([]);
      return setAutoExpandParent(false);
    }

    var keys = dataList.map(function (item) {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, dataSource);
      }

      return null;
    }).filter(function (item, i, self) {
      return item && self.indexOf(item) === i;
    });
    setExpandedKeys(keys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  var loop = function loop(data) {
    return data.map(function (item) {
      var index = item.title.indexOf(searchValue);
      var beforeStr = item.title.substr(0, index);
      var afterStr = item.title.substr(index + searchValue.length);
      var title = index > -1 ? _react["default"].createElement("span", null, beforeStr, _react["default"].createElement("span", {
        style: {
          color: "#f50"
        }
      }, searchValue), afterStr) : _react["default"].createElement("span", null, item.title);

      if (item.children) {
        return index > -1 ? _react["default"].createElement(TreeNode, {
          key: item.key,
          title: title,
          disableCheckbox: !parentCheckedAble
        }, loop(item.children)) : _react["default"].createElement(TreeNode, {
          style: parentNodeHide ? {
            display: "none"
          } : {},
          key: item.key,
          title: title,
          disableCheckbox: !parentCheckedAble
        }, loop(item.children));
      }

      return index > -1 ? _react["default"].createElement(TreeNode, {
        key: item.key,
        title: title
      }) : _react["default"].createElement(TreeNode, {
        style: childNodeHide ? {
          display: "none"
        } : {},
        key: item.key,
        title: title
      });
    });
  }; // 节点选择事件


  var nodeCheck = function nodeCheck(keys, info) {
    var checked = info.checked;
    var key = info.node.props.eventKey;
    return props.onCheck(keys, key, checked);
  };

  return _react["default"].createElement("div", null, _react["default"].createElement(Search, {
    style: {
      marginBottom: 8
    },
    placeholder: placeholder,
    onChange: onChange
  }), _react["default"].createElement(_tree["default"], _extends({}, props, {
    checkStrictly: checkStrictly,
    onCheck: nodeCheck,
    onExpand: onExpand,
    expandedKeys: expandedKeys,
    autoExpandParent: autoExpandParent
  }), loop(dataSource)));
};

function generateList(list) {
  var dataList = [];

  var loop = function loop(data) {
    for (var i = 0; i < data.length; i++) {
      var node = data[i];
      var key = node.key;
      dataList.push({
        key: key,
        title: node.title
      });

      if (node.children) {
        loop(node.children);
      }
    }
  };

  loop(list);
  return dataList;
}

var _default = SearchTree;
exports["default"] = _default;
SearchTree.propTypes = {
  dataSource: _propTypes["default"].array,
  parentCheckedAble: _propTypes["default"].bool,
  parentNodeHide: _propTypes["default"].bool,
  childNodeHide: _propTypes["default"].bool,
  placeholder: _propTypes["default"].string
};
SearchTree.defaultProps = {
  checkable: true,
  checkStrictly: true,
  parentCheckedAble: true,
  parentNodeHide: false,
  childNodeHide: true,
  placeholder: "Search"
};