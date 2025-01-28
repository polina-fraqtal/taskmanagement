import { BlocksFeature, FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, HTMLConverterFeature, InlineToolbarFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
    slug: 'projects',
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
            required: true,
        },
        {
            name: 'assignees',
            type: 'relationship',
            relationTo: 'users',
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
            label: "Details about the project",
        },
    ],
};