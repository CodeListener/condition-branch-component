import { Input, Select } from "antd";
import { ChangeEvent } from "react";

interface IConditionTerm {
  data: Condition.Item;
  onChange: (res: any) => void;
}

const { Option } = Select;

// 包含具体业务逻辑的 Term
const ConditionTerm = ({ data, onChange }: IConditionTerm) => {
  const { key, op, value } = data;

  const handleKeyChange = (val: string) => {
    onChange?.({ key: val });
  };

  const handleOpsChange = (val: string) => {
    onChange?.({ op: val });
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.({ value: event.target.value });
  };

  return (
    <div className="term" style={{ display: "flex", alignItems: "center" }}>
      <span className="element" style={{ marginRight: "10px" }}>
        <Select
          placeholder="请选择条件项"
          value={key}
          onChange={handleKeyChange}
        >
          <Option value="Key1">Key1</Option>
          <Option value="Key2">Key2</Option>
          <Option value="Key3">Key3</Option>
        </Select>
      </span>
      <span className="comparison" style={{ marginRight: "10px" }}>
        <Select
          placeholder="请选择关系符"
          value={op}
          onChange={handleOpsChange}
        >
          <Option value="==">等于</Option>
          <Option value="!=">不等于</Option>
          <Option value=">">大于</Option>
          <Option value=">=">大于等于</Option>
          <Option value="<">小于</Option>
          <Option value="<=">小于等于</Option>
        </Select>
      </span>
      <span className="value">
        <Input
          placeholder="请输入条件值"
          value={value}
          onInput={handleValueChange}
        />
      </span>
    </div>
  );
};

export default ConditionTerm;
