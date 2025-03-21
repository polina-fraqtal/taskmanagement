import config from '@payload-config';
import { getPayload } from 'payload';

export default async function ProjectPage({params}: {params: {slug: string}}) {
    

    const payload = await getPayload({ config });

    const fetchProject = async (slug: string) => {
        try {
            const response = await payload.find({
                collection: 'projects',
                where: {
                    id: {
                        equals: slug,
                    }
                },
            });
            return response.docs[0];
        } catch (error) {
            console.error('Error fetching a project:', error);
        }
    }   

    const project = await fetchProject((await params).slug);


    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            {project ? (
                <div className="bg-white p-5 rounded-lg shadow-lg max-w-xl w-full text-center">
                    <h1 className="text-2xl mb-5">Project: {project.title}</h1>
                    <p className="text-lg mb-2">Description: {project.description}</p>
                    <p className="text-lg mb-2">Due Date: {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'N/A'}</p>
                    <p className="text-lg mb-2">Status: {project.status}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}