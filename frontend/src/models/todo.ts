export interface ITodo {
    id: number,
    todo: string,
    done: boolean,
}

export interface IResponse {
    success: boolean;
    result: { todos: ITodo[] | null} ;
  }