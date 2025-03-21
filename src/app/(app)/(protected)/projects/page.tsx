import { Card } from 'antd';
import { getPayload } from 'payload';
import config from '@payload-config';
import { format } from 'date-fns';

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
        <div className='p-10 min-h-screen'>
            <h1 className='text-3xl font-bold mb-6'>Projects</h1>
            <div className='mt-4'>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <Card key={project.id} className='w-full'>
                            <a href={`projects/${project.id}`}>
                                <div className='flex justify-between items-start text-black'>
                                    <div>{project.title}</div>
                                    <span className='text-gray-500'>
                                    {format(new Date(project.createdAt), 'MM/dd/yyyy')}
                                    </span>
                                </div>
                                <p className='text-black'>{project.description}</p>
                            </a>
                        </Card>
                    ))
                ) : (
                    <p className='text-center text-gray-500'>No projects available.</p>
                )}
            </div>
        </div>
    );
}
