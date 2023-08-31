import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
    title: string;
    description: string;
    status: boolean;
}

const TodoSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
});

const TodoModel = mongoose.model<ITodo>('TodoNew', TodoSchema);

export default TodoModel;
