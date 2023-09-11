// fetch the posts for a specific creator
import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request, {params}) => {
    try {
        await connectToDB()
        // with the dynamic route [id] we have access to the user's id as param
        const prompts = await Prompt.find({creator: params.id}).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {

        return new Response('Error al cargar los comandos', {status: 500})
        
    }
}