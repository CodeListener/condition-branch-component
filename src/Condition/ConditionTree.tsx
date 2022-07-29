import { useEffect, useState } from "react";
import ConditionGroup from "./ConditionGroup";
import { getNewValue } from "./utils";

interface IConditionTree {
  value: Condition.Group;
  setElementTerm: Condition.ElementTermRender;
  onChange: (
    res: Condition.Group,
    type: Condition.ChangeType,
    record: Condition.Item
  ) => void;
}

function ConditionTree({ value, setElementTerm, onChange }: IConditionTree) {
  const [conditions, setConditions] = useState(value);

  const setOnChange = (
    pos: string,
    record: Condition.Item,
    type: Condition.ChangeType
  ) => {
    const value = getNewValue(conditions, pos, type, record);
    onChange?.(value, type, record);
    setConditions(value);
  };

  const handleAddGroup: Condition.ChangeTypeHandle = (pos, record) => {
    setOnChange(pos, record, "addGroup");
  };
  const handleAddTerm: Condition.ChangeTypeHandle = (pos, record) => {
    setOnChange(pos, record, "addTerm");
  };
  const handleOpsChange: Condition.ChangeTypeHandle = (pos, record) => {
    setOnChange(pos, record, "changeOps");
  };
  const handleDeleteTerm: Condition.ChangeTypeHandle = (pos, record) => {
    setOnChange(pos, record, "deleteTerm");
  };
  const handleTermChange: Condition.ChangeTypeHandle = (pos, record) => {
    setOnChange(pos, record, "changeTerm");
  };

  useEffect(() => {
    setConditions(value);
  }, [value]);
  return (
    <div className="vui-condition-tree">
      <ConditionGroup
        // 还未开始渲染任何控件，所以 pos 为空
        pos=""
        data={conditions}
        setElementTerm={setElementTerm}
        onAddGroup={handleAddGroup}
        onAddTerm={handleAddTerm}
        onDeleteTerm={handleDeleteTerm}
        onOpsChange={handleOpsChange}
        onTermChange={handleTermChange}
      />
    </div>
  );
}

export default ConditionTree;
