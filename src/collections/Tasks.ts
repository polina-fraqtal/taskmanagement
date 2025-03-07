import { lexicalHTML, lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature, HTMLConverterFeature } from '@payloadcms/richtext-lexical';
import { CollectionConfig, getPayload } from 'payload';
import config from '@payload-config';
import { User } from '@/payload-types';

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
            filterOptions: async ({data}) => {
                const payload = await getPayload({ config });

                if (!data.project) {
                    return { id: { in: [] } };
                }

                const projectId = data.project;
    
                const project = await payload.find({
                    collection: 'projects',
                    where: {
                        id : {
                            equals: projectId
                        },
                }
                });

                const projectAssignees: User[] = (project.docs[0]?.assignees ?? []) as User[];


                if (projectAssignees.length == 0)  {return { id: { in: [] } }};

    
                return {
                        id: { in: projectAssignees.filter(user => user && user.id).map(user => user.id) }
                };
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