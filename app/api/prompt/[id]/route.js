import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// functionalities to read, edit and delete posts

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Comando no encontrado", { status: 404 });
    } else {
      return new Response(JSON.stringify(prompt), { status: 200 });
    }
  } catch (error) {
    return new Response("Error al cargar los comandos", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json()

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt) {
            return new Response('Comando no encontrado', {status: 404})
        }

        // update the prompt. Existing prompt = new prompt
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })

    } catch (error) {
        return new Response("Error al actualizar el comando", { status: 500 })
    }
}

//DELETE
export const DELETE = async (request, {params}) => {
    
    try {
       await connectToDB()

       await Prompt.findByIdAndRemove(params.id)

       return new Response("Comando eliminado con éxito", {status: 200})
    } catch (error) {
        return new Response("Error al borrar el comando", { status: 500 })
    }
}