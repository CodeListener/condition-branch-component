declare namespace Condition {
  export interface Group {
    ops: "and" | "or";
    children: (Item | Group)[];
  }
  export type ChangeType =
    | "addTerm"
    | "addGroup"
    | "deleteTerm"
    | "deleteTerm"
    | "changeOps"
    | "changeTerm";

  export interface Item {
    [key: string]: any;
  }
  export type ChangeTypeHandle = (pos: string, record: Item) => void;
  export type ElementTermRender = (
    record: Condition.Item,
    pos: string,
    onChange: (res: any) => void
  ) => React.ReactNode;
}
