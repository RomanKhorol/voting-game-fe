export async function DELETE(
  req: Request,
  { params }: { params: { jokeid: string } }
) {
   
    const { jokeid } = await params;
  try {
    const response = await fetch(`http://localhost:5000/api/jokes/${jokeid}`,
      {
        method: "DELETE",
      }
    );

      if (!response.ok) {
        
      throw new Error(`Failed to delete joke: ${response.statusText}`);
    }

    return new Response(
      JSON.stringify({ message: "Joke deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting joke:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
export async function PATCH(req: Request, { params }: { params: { jokeid: string } }) {
  const { jokeid } = await params;
  try {
    const body = await req.json();
    const { votes } = body;

    if (!Array.isArray(votes)) {
      return new Response(
        JSON.stringify({ message: "Votes must be an array" }),
        { status: 400 }
      );
    }

    const response = await fetch(
      `http://localhost:5000/api/jokes/${jokeid}/votes`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update votes: ${response.statusText}`);
    }

    const updatedJoke = await response.json();
    return new Response(JSON.stringify(updatedJoke), { status: 200 });
  } catch (error) {
    console.error("Error updating votes:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
