import { Card } from 'antd';
import { getPayload } from 'payload';
import config from '@payload-config';
import { format } from 'date-fns';

const payload = await getPayload({ config });

export default async function Announcements() {
    

    const fetchAnnouncements = async () => {
        try {
            const response = await payload.find({ collection: 'announcements', sort: '-createdAt' });
            return response.docs
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const announcements = await fetchAnnouncements() || [];


    return (
        <div className='p-10 min-h-screen'>
            <h1 className='text-3xl font-bold mb-6'>Announcements</h1>
            <div className='mt-4'>
                {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <Card key={announcement.id} className='w-full'>
                            <div className='flex justify-between items-start'>
                                <div>{announcement.title}</div>
                                <span className='text-gray-500'>
                                    {format(new Date(announcement.createdAt), 'MM/dd/yyyy')}
                                </span>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className='text-center text-gray-500'>No announcements available.</p>
                )}
            </div>
        </div>
    );
}
