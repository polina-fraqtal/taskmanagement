'use client'
import { useEffect, useState } from 'react';
import { Announcement } from './../../../../../task-management/src/payload-types';
import { Card } from 'antd';

export default function Announcements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/announcements');
                const data = await response.json();
                setAnnouncements(data.docs);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className='px-20 py-6 min-h-screen'>
            <h1 className='text-3xl font-bold mb-6'>Announcements</h1>
            <div className='space-y-4'>
            {announcements.length > 0 ? (
            announcements.map((announcement) => (
            <Card key={announcement.id} className='w-full'>
                <div className='flex justify-between items-start'>
                <Card.Meta
                    title={announcement.title}
                    description={announcement.description}
                />
                <span className='text-gray-500'>
                    {new Date(announcement.createdAt).toLocaleDateString()}
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
