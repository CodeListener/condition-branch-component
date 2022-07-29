import { Button } from "antd";

interface IConditionItem {
  data: Condition.Item;
  pos: string;
  setElementTerm: Condition.ElementTermRender;
  onTermChange: Condition.ChangeTypeHandle;
  onDeleteTerm: Condition.ChangeTypeHandle;
}
function ConditionItem({
  data,
  pos,
  setElementTerm,
  onTermChange,
  onDeleteTerm,
}: IConditionItem) {
  const handleTermChange = (value: Condition.Item) => {
    onTermChange?.(pos, { ...data, ...value });
  };

  const handleDeleteTermClick = () => {
    onDeleteTerm?.(pos, data);
  };

  return (
    <div
      className="vui-condition-item"
      style={{ display: "flex", alignItems: "center" }}
    >
      {setElementTerm?.(data, pos, handleTermChange)}
      <Button className="delete-term" onClick={handleDeleteTermClick}>
        删除
      </Button>
    </div>
  );
}

export default ConditionItem;
