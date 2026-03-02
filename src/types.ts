export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  groupId: string | null;
}

export interface Group {
  id: string;
  name: string;
}