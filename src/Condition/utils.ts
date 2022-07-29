import produce from "immer";

export const POS_SEPARATOR = "_";

export const getNewPos = (pos: string, i: number) => {
  // 如果当前项是整个 value (即组件的起始项)时，新位置即当前序号
  return pos ? `${pos}${POS_SEPARATOR}${i}` : String(i);
};

export const getArrPos = (pos: string, posSeparator = POS_SEPARATOR) => {
  return (pos && pos.split(posSeparator)) || [];
};

export function getLastPos(
  pos: string,
  v: string,
  posSeparator = POS_SEPARATOR
) {
  const arr = getArrPos(pos);
  arr.push(v);
  return arr.join(posSeparator);
}

export const getNewValue = function (
  data: Condition.Group = {} as Condition.Group,
  pos: string = "",
  type: Condition.ChangeType,
  record: Condition.Item
) {
  if (!pos) return record as Condition.Group;

  const arrPos = getArrPos(pos);
  const last = arrPos.length - 1;

  return produce(data, (draft) => {
    let prev: { data: Condition.Item; idx: number } = {
      data: draft,
      idx: 0,
    };
    let current = draft.children || [];
    arrPos.forEach((strIdx, i) => {
      const idx = Number(strIdx);
      if (i === last) {
        switch (type) {
          case "addTerm":
          case "addGroup":
            current.splice(idx + 1, 0, record);
            break;
          case "deleteTerm":
            current.splice(idx, 1);
            // 如果删除了组的最后一项，则删除整个组
            if (!current.length) {
              prev.data.splice(prev.idx, 1);
            }
            break;
          default: // 变更逻辑连接符或条件项内容
            current[idx] = record;
        }
      } else {
        prev = { data: current, idx };
        current = (current[idx] && current[idx].children) || [];
      }
    });
  });
};
