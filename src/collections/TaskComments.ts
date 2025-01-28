import { CollectionConfig } from "payload";

export const TaskComments: CollectionConfig = {
  slug: 'task-comments',
  access: {
    read: () => true
  },
  fields: [
    {
        name: 'comment',
        type: 'textarea',
        required: true,
    },
    {
        name: 'task',
        type: 'relationship',
        relationTo: 'tasks',
    },
    {
        name: 'author',
        type: 'relationship',
        relationTo: 'users',
    },
  ]
};