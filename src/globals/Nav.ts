import { GlobalConfig } from "payload";

export const Nav: GlobalConfig = {
    slug: 'nav',
    fields: [
        {
            name: 'links',
            type: 'array',
            labels: {
                singular: 'Link',
                plural: 'Links',
            },
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
};