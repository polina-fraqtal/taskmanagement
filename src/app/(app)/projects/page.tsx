'use client'
import { useEffect, useState } from 'react';
import { Project } from '../../../payload-types'
import { Card } from 'antd';
export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/projects');
                const data = await response.json();
                setProjects(data.docs);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Projects</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {projects.map((project) => (
                    <li key={project.id} style={{ marginBottom: '20px' }}>
                        <a href={'projects/' + project.id.toString()} style={{ textDecoration: 'none' }}>
                            <Card title={project.title} style={{ border: '1px solid #e8e8e8', borderRadius: '4px', padding: '16px' }}>
                                <p>{project.description}</p>
                            </Card>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
