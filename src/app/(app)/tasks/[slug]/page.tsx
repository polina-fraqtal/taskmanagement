'use client'
import { Task } from '@/payload-types';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TaskPage() {
    const router = useRouter();
    const { slug } = useParams();
    const [task, setTask] = useState<Task>();

    useEffect(() => {
        console.log(slug);
    }, [slug]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/tasks/${slug}`);
                const data = await response.json();
                setTask(data);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };
        fetchTask();
        console.log(task);
    }, [slug]);

    return (
        <div style={styles.container}>
            {task ? (
                <div style={styles.card}>
                    <h1 style={styles.title}>Task: {task.title}</h1>
                    <p style={styles.info}>Description: {task.description}</p>
                    <p style={styles.info}>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
                    <p style={styles.info}>Status: {task.status}</p>
                    <div dangerouslySetInnerHTML={{ __html: task['lexical html'] || '' }} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center' as 'center',
    },
    title: {
        fontSize: '2em',
        marginBottom: '20px',
    },
    info: {
        fontSize: '1.2em',
        marginBottom: '10px',
    },
};
