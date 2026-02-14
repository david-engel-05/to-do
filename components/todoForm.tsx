"use client"

import { useState } from "react";

type Props = {
  onAdd: (titel: string) => Promise<void>;
};

export default function TodoForm({ onAdd }: Props) {
  const [titel, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!titel.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd(titel);
      setTitle("");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="flex gap-3">
      <input
        value={titel}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Neue Aufgabe hinzufügen..."
        disabled={isSubmitting}
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 text-gray-900 placeholder-gray-400"
      />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !titel.trim()}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {isSubmitting ? "Hinzufügen..." : "Hinzufügen"}
      </button>
    </div>
  );
}