export interface Task {
  id?: string;
  title: string;
  description: string;
  completed?: boolean;
  creationDate?: string;
  userId?: string;
}
