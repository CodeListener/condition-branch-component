import ConditionTree from "./ConditionTree";
import "./index.less";
import ConditionTerm from "./ConditionTerm";

// 渲染函数
const setElementTerm: Condition.ElementTermRender = (record, _pos, onChange) => {
  return <ConditionTerm data={record} onChange={onChange} />;
};

const data: Condition.Group = {
  ops: "and",
  children: [
    { key: "Key1", op: ">", value: 0 },
    { key: "Key1", op: ">", value: 0 },
    // {
    //   ops: "or",
    //   children: [
    //     { key: "Key2", op: "<", value: 20 },
    //     { key: "Key3", op: ">", value: 10 },
    //     {
    //       ops: "or",
    //       children: [
    //         { key: "Key2", op: "<", value: 20 },
    //         { key: "Key3", op: ">", value: 10 },
    //         {
    //           ops: "or",
    //           children: [
    //             { key: "Key2", op: "<", value: 20 },
    //             { key: "Key3", op: ">", value: 10 },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // { key: "Key1", op: ">", value: 0 },
    // {
    //   ops: "or",
    //   children: [
    //     { key: "Key2", op: "<", value: 20 },
    //     {
    //       ops: "or",
    //       children: [
    //         { key: "Key2", op: "<", value: 20 },
    //         { key: "Key3", op: ">", value: 10 },
    //       ],
    //     },
    //     // { key: "Key3", op: ">", value: 10 },
    //   ],
    // },
    // { key: "Key1", op: ">", value: 0 },
    // { key: "Key1", op: ">", value: 0 },
    // {
    //   ops: "or",
    //   children: [
    //     { key: "Key2", op: "<", value: 20 },
    //     { key: "Key3", op: ">", value: 10 },
    //   ],
    // },
  ],
};

export default function () {
  return (
    <ConditionTree
      value={data}
      setElementTerm={setElementTerm}
      onChange={(...args) => {
        console.log(args);
      }}
    />
  );
}
