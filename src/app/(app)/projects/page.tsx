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
        <div className='projects-container'>
            <h1 className='projects-title'>Projects</h1>
            <div className='projects-list'>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <Card key={project.id} className='project-card'>
                            <div className='project-header'>
                                <div>{project.title}</div>
                                <span className='project-date'>
                                    {new Date(project.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p>{project.description}</p>
                        </Card>
                    ))
                ) : (
                    <p className='no-projects'>No projects available.</p>
                )}
            </div>
        </div>
    );
}
