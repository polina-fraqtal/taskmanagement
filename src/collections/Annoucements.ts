import { CollectionConfig } from "payload";

export const Announcements: CollectionConfig = {
    slug:'announcements',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'importance',
            type: 'select',
            options: ['Low', 'Medium', 'High'],
        }
    ],
};
