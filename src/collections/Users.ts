import { CollectionConfig, getPayload } from 'payload';
import config from '@payload-config';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername : {
      allowEmailLogin: true,
      requireEmail: false,
      requireUsername: true
    }
  },
  fields: [
    {
      name: 'id',
      type: 'number',
      required: true,
      unique: true,
      access: {
        update: () => false,
        create: () => false,
      },  
      defaultValue: async() => {
        const payload = await getPayload({ config });
        const users = await payload.find({
          collection: 'users',
          limit: 1,
          sort: ['-id'],
        });

        return users.docs[0]?.id + 1 || 1;
      }
    },
    {
      name: 'username',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'assigned projects',
      type: 'relationship',
      hasMany: true,
      relationTo: 'projects',
    },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user'],
      defaultValue: 'user',
    },
  ],
};
