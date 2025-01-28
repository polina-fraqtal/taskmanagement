'use client'
import { Project } from '@/payload-types';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<Project>();

    useEffect(() => {
        console.log(slug);
    }, [slug]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/projects/${slug}`);
                const data = await response.json();
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        fetchProject();
        console.log(project);
    }, [slug]);

    return (
        <div style={styles.container}>
            {project ? (
                <div style={styles.card}>
                    <h1 style={styles.title}>Project: {project.title}</h1>
                    <p style={styles.info}>Description: {project.description}</p>
                    <p style={styles.info}>Due Date: {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'N/A'}</p>
                    <p style={styles.info}>Status: {project.status}</p>
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