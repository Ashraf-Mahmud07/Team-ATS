import { model, Schema } from 'mongoose';
import { TActivitiesCategory } from './Category.interfaces';

const categorySchema = new Schema<TActivitiesCategory>(
    {
        categoryBanner: {
            type: String,
            required: [false, ' Category Banner is required!']
        },
        categoryName: {
            type: String,
            required: [true, ' Category Name is required!']
        },
        description: {
            type: String,
            required: [true, ' Description is required!']
        },



    },
    { timestamps: true }
);


export const Categories = model<TActivitiesCategory>('Category', categorySchema);
