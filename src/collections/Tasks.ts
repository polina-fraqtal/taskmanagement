import { lexicalHTML, lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature, HTMLConverterFeature } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload';
import payload from 'payload';

export const Tasks: CollectionConfig = {
    slug: 'tasks',
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
            name: 'dueDate',
            type: 'date',
        },
        {
            name: 'project',
            type: 'relationship',
            relationTo: 'projects',
            required: true,
        },
        {
            name: 'assignees',
            type: 'relationship',
            relationTo: 'users',
            filterOptions: async (siblingData: any) => {
                const projectId = siblingData['project'];
        
                if (!projectId) return false;
        
                try {
                    const project = await payload.findByID({
                        collection: 'projects',
                        id: projectId,
                    });
        
                    if (!project || !project.assignees) return false;
        
                    return true;
                } catch (error) {
                    return false;
                }
            },
            hasMany: true,
        },
        {
            name: 'status',
            type: 'select',
            options: ['To Do', 'In Progress', 'Done'],
            defaultValue: 'To Do',
        },
        lexicalHTML ( 'content', {name: 'lexical html' }),
                {
                    name: 'content',
                    type: 'richText',
                    editor: lexicalEditor({
                        admin: {
                            placeholder: 'Enter your content here...',
                        },
                        features: ({ defaultFeatures }) => {
                            return [
                                ...defaultFeatures,
                                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                                FixedToolbarFeature(),
                                InlineToolbarFeature(),
                                HorizontalRuleFeature(),
                                HTMLConverterFeature(),
                            ];
                        },
                    }),
                    label: "Details about the task",
                },
    ],
};