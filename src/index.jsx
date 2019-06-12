import React, { useState, useEffect } from "react";
import { Tree, Input } from "antd";
import PropTypes from "prop-types";

const { TreeNode } = Tree;
const Search = Input.Search;

const getParentKey = (key, tree) => {
  let parentKey;
  for(let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if(node.children) {
      if(node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if(getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const SearchTree = (props) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const [dataList, setDataList] = useState([]);

  const {
    dataSource,
    parentCheckedAble,
    parentNodeHide,
    childNodeHide,
    checkStrictly,
    placeholder
  } = props;

  useEffect(() => {
    setDataList(generateList(dataSource));
  }, [dataSource]);

  const onExpand = (keys) => {
    setExpandedKeys(keys);
    setAutoExpandParent(false);
  };

  const onChange = (e) => {
    const value = e.target.value;
    if(!value || value === "") {
      setSearchValue(value);
      setExpandedKeys([]);
      return setAutoExpandParent(false);
    }
    const keys = dataList
      .map((item) => {
        if(item.title.indexOf(value) > -1) {
          return getParentKey(item.key, dataSource);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(keys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const loop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: "#f50" }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if(item.children) {
        return (
          index > -1 ?
            <TreeNode
              key={item.key}
              title={title}
              disableCheckbox={!parentCheckedAble}
            >
              {loop(item.children)}
            </TreeNode> :
            <TreeNode
              style={parentNodeHide ? { display: "none" } : {}}
              key={item.key}
              title={title}
              disableCheckbox={!parentCheckedAble}
            >
              {loop(item.children)}
            </TreeNode>
        );
      }
      return (
        index > -1 ?
          <TreeNode
            key={item.key}
            title={title}
          /> :
          <TreeNode
            style={childNodeHide ? { display: "none" } : {}}
            key={item.key}
            title={title}
          />
      );
    });

  // 节点选择事件
  const nodeCheck = (keys, info) => {
    let checked = info.checked;
    let key = info.node.props.eventKey;
    return props.onCheck(keys, key, checked);
  };

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Tree
        {...props}
        checkStrictly={checkStrictly}
        onCheck={nodeCheck}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
      >
        {loop(dataSource)}
      </Tree>
    </div>
  );
};

function generateList(list) {
  let dataList = [];

  const loop = (data) => {
    for(let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.key;
      dataList.push({ key, title: node.title });
      if(node.children) {
        loop(node.children);
      }
    }
  };
  loop(list);
  return dataList;
}

export default SearchTree;

SearchTree.propTypes = {
  dataSource: PropTypes.array,
  parentCheckedAble: PropTypes.bool,
  parentNodeHide: PropTypes.bool,
  childNodeHide: PropTypes.bool,
  placeholder: PropTypes.string
};

SearchTree.defaultProps = {
  checkable: true,
  checkStrictly: true,
  parentCheckedAble: true,
  parentNodeHide: false,
  childNodeHide: true,
  placeholder: "Search"
};

