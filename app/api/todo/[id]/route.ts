import { createPB } from "@/lib/pocketbase";


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const pb = createPB();
    const body = await req.json();
    const { id } = await params;

    if (!id) {
      return Response.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    const updated = await pb.collection("todo").update(id, body);
    return Response.json(updated);
  } catch (error) {
    console.error("Error updating todo:", error);
    return Response.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const pb = createPB();
    const { id } = await params;

    if (!id) {
      return Response.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    await pb.collection("todo").delete(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return Response.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}