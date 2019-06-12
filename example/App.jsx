import React from "react";
import SearchTree from "../src";

const App = () => {
  return (
    <div style={styles.example}>
      <SearchTree
        placeholder="输入节点名称"
        checkable={true}
        dataSource={mock()}
        onCheck={(keys, key, checked) => console.log(keys, key, checked)}
      />
    </div>
  );
};

const styles = {
  example: {
    maxWidth: 300,
    height: "calc(100% - 100px)",
    margin: "0 auto",
    padding: 15,
    border: "1px solid #e8e8e8",
    borderRadius: 5
  }
};

export default App;

function mock() {
  return [
    {
      key: "global",
      title: "global",
      children: []
    },
    {
      key: "dx",
      title: "电信",
      children: [
        {
          key: "dx-huadong",
          title: "电信-华东"
        },
        {
          key: "dx-xian",
          title: "电信-西安"
        },
        {
          key: "dx-huanan",
          title: "电信-华南"
        },
        {
          key: "dx-huazhong",
          title: "电信-华中"
        },
        {
          key: "dx-xibei",
          title: "电信-西北"
        },
        {
          key: "dx-dongbei",
          title: "电信-东北"
        }
      ]
    },
    {
      key: "lt",
      title: "联通",
      children: [
        {
          key: "lt-xibu",
          title: "联通-西部"
        },
        {
          key: "lt-dongbei",
          title: "联通-东北"
        },
        {
          key: "lt-huanan",
          title: "联通-华南"
        },
        {
          key: "lt-huadong",
          title: "联通-华东"
        },
        {
          key: "lt-huazhong",
          title: "联通-华中"
        },
        {
          key: "lt-huabei",
          title: "联通-华北"
        },
      ]
    },
    {
      key: "yd",
      title: "移动",
      children: [
        {
          key: "yd-xibu",
          title: "移动-西部"
        },
        {
          key: "yd-dongbei",
          title: "移动-东北"
        },
        {
          key: "yd-huanan",
          title: "移动-华南"
        },
        {
          key: "yd-huadong",
          title: "移动-华东"
        },
        {
          key: "yd-huazhong",
          title: "移动-华中"
        },
        {
          key: "yd-huabei",
          title: "移动-华北"
        },
      ]
    }
  ];
}
