import { Todo } from "@/types/todo";

export async function getTodos(): Promise<Todo[]> {
  try {
    const res = await fetch("/api/todo");
    if (!res.ok) {
      throw new Error(`Failed to fetch todos: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

export async function createTodo(titel: string) {
  try {
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titel }),
    });
    if (!res.ok) {
      throw new Error(`Failed to create todo: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
}

export async function updateTodo(id: string, data: Partial<Todo>) {
  try {
    const res = await fetch(`/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Failed to update todo: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

export async function deleteTodo(id: string) {
  try {
    const res = await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete todo: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}