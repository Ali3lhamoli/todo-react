import { v4 as uuidv4 } from "uuid";

export function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "add": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.inputvalue,
        description: "",
        completed: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "complete": {
      const updatedTodos = currentTodos.map((todoo) => {
        if (todoo.id === action.payload.id) {
          return { ...todoo, completed: !todoo.completed };
        }

        return todoo;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "edit": {
      const formData = new FormData(action.payload.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const title = formJson.title;
      const description = formJson.description;
      const updatedTodos = currentTodos.map((todoo) => {
        if (todoo.id === action.payload.id) {
          return { ...todoo, title: title, description: description };
        }
        return todoo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "delete": {
      const updatedTodos = currentTodos.filter(
        (todoo) => todoo.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "render": {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        return JSON.parse(storedTodos);
      }
      break;
    }

    default: {
      throw Error("Unknow Action " + action.type);
    }
  }
}
