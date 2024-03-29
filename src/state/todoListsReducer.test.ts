import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todoListsReducer
} from "./todoListsReducer";
import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App";

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListsType>

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
})

test("todolist should be removed", () => {
  const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
})

test('todolist should be added', () => {
  let newTodolistId = v1()

  let newTodolistTitle = "New Todolist";

  const endState = todoListsReducer(startState, addTodolistAC(newTodolistId, newTodolistTitle))

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
});

test('todolist should change its name', () => {
  let newTodolistTitle = "New Todolist";

  const action = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId2,
    title: newTodolistTitle
  };

  const endState = todoListsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = "completed";

  const endState = todoListsReducer(startState, changeFilterAC(todolistId2, newFilter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
