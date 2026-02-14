"use client"

import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/lib/api";
import TodoForm from "@/components/todoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError("Fehler beim Laden der Todos. Bitte versuche es erneut.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(titel: string) {
    try {
      setError(null);
      await createTodo(titel);
      await load();
    } catch (err) {
      setError("Fehler beim Erstellen des Todos. Bitte versuche es erneut.");
      console.error(err);
    }
  }

  async function handleToggle(todo: Todo) {
    try {
      setError(null);
      await updateTodo(todo.id, { completed: !todo.completed });
      await load();
    } catch (err) {
      setError("Fehler beim Aktualisieren des Todos. Bitte versuche es erneut.");
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    try {
      setError(null);
      await deleteTodo(id);
      await load();
    } catch (err) {
      setError("Fehler beim Löschen des Todos. Bitte versuche es erneut.");
      console.error(err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Meine Aufgaben
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="mb-6">
          <TodoForm onAdd={handleAdd} />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Laden...</p>
          </div>
        ) : (
          <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
}