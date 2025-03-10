import { Card } from 'antd';
import { getPayload } from 'payload'
import config from '@payload-config'

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
        <div className='announcements-container'>
            <h1 className='announcements-title'>Announcements</h1>
            <div className='announcements-list'>
                {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <Card key={announcement.id} className='announcement-card'>
                            <div className='announcement-header'>
                                <div>{announcement.title}</div>
                                <span className='announcement-date'>
                                    {new Date(announcement.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className='no-announcements'>No announcements available.</p>
                )}
            </div>
        </div>
    );
}
