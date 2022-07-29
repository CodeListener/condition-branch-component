import { Button, Select } from "antd";
import ConditionItem from "./ConditionItem";
import { getLastPos, getNewPos } from "./utils";

const { Option } = Select;
export const posSeparator = "_";
export const defaultOpsValue = "and";

interface IConditionGroup {
  data: Condition.Group;
  pos: any;
  setElementTerm: Condition.ElementTermRender;
  onAddGroup: Condition.ChangeTypeHandle;
  onAddTerm: Condition.ChangeTypeHandle;
  onOpsChange: Condition.ChangeTypeHandle;
  onDeleteTerm: Condition.ChangeTypeHandle;
  onTermChange: Condition.ChangeTypeHandle;
}
function ConditionGroup({
  data,
  pos,
  setElementTerm,
  onAddGroup,
  onAddTerm,
  onDeleteTerm,
  onOpsChange,
  onTermChange,
}: IConditionGroup) {
  const { children, ops } = data;
  const conditionValue = ops || defaultOpsValue;

  const handleAddGroup = () => {
    const record: Condition.Group = { ops: "and", children: [{}] };
    const curPos = getLastPos(pos, `${data.children.length - 1}`);
    onAddGroup?.(curPos, record);
  };

  const handleAddTerm = () => {
    const record: Condition.Item = {};
    const curPos = getLastPos(pos, `${data.children.length - 1}`);
    onAddTerm?.(curPos, record);
  };

  return (
    <div className="vui-condition-group">
      <div className="conditional">
        <Select className="condition-sign" value={conditionValue}>
          <Option value="and">且</Option>
          <Option value="or">或</Option>
        </Select>
      </div>
      <div className="conditions">
        {children.map((record, i) => {
          const { children: list } = record;
          const newPos = getNewPos(pos, i);

          return list && list.length ? (
            // 包含 children 的项使用 ConditionGroup 进行渲染
            <ConditionGroup
              pos={newPos}
              key={newPos}
              data={record as Condition.Group}
              setElementTerm={setElementTerm}
              onAddGroup={onAddGroup}
              onAddTerm={onAddTerm}
              onDeleteTerm={onDeleteTerm}
              onOpsChange={onOpsChange}
              onTermChange={onTermChange}
            />
          ) : (
            // 未包含 children 的使用 ConditionItem 进行渲染
            <ConditionItem
              pos={newPos}
              key={newPos}
              data={record as Condition.Item}
              setElementTerm={setElementTerm}
              onDeleteTerm={onDeleteTerm}
              onTermChange={onTermChange}
            />
          );
        })}
        <div className="operators">
          <Button
            size="small"
            type="primary"
            ghost
            className="add-term"
            style={{ marginRight: 10 }}
            onClick={handleAddTerm}
          >
            加条件
          </Button>
          <Button size="small" className="add-group" onClick={handleAddGroup}>
            加条件组
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConditionGroup;
