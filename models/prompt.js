// model for the prompt
import mongoose, {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Se requiere un comando']
    }, 
    tag: {
        type: String,
        required: [true, 'Se requiere una etiqueta']
    }
})

// use either the prompt already exists or a new one based on the prompt schema
const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt