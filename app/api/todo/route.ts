
import { createPB } from "@/lib/pocketbase";

export async function GET() {
  try {
    const pb = createPB();
    const todos = await pb.collection("todo").getFullList({ sort: "created" });
    return Response.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return Response.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const pb = createPB();
    const body = await req.json();

    if (!body.titel || typeof body.titel !== "string" || body.titel.trim() === "") {
      return Response.json(
        { error: "Titel is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const todo = await pb.collection("todo").create({
      titel: body.titel.trim(),
      completed: false,
    });

    return Response.json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    return Response.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}