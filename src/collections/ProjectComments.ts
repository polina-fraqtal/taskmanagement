import { CollectionConfig } from "payload";

export const ProjectComments: CollectionConfig = {
    slug: 'project-comments',
    access: {
        read: () => true,
    },
    fields: [
        {
        name: 'comment',
        type: 'textarea',
        required: true,
        },
        {
        name: 'project',
        type: 'relationship',
        relationTo: 'projects',
        },
        {
        name: 'user',
        type: 'relationship',
        relationTo: 'users',
        },
    ], 
};