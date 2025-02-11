import { Card } from 'antd';
import { getPayload } from 'payload';
import config from '@payload-config';

const payload = await getPayload({ config });

export default async function Projects() {

    const fetchProjects = async () => {
        try {
            const response = await payload.find({ collection: 'projects'});
            return response.docs;
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const projects = await fetchProjects() || [];


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
