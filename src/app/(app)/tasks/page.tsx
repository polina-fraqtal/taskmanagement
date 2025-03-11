import { getPayload } from 'payload';
import config from '@payload-config';
import Card from 'antd/es/card/Card';
import { format } from 'date-fns';

const payload = await getPayload({ config });

const fetchTask = async () => {
    try {
        const response = await payload.find({ collection: 'tasks' });
        return response.docs;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

const tasks = await fetchTask() || [];

export default function Tasks() {

    return (
        <div className='p-10 min-h-screen'>
            <h1 className='text-3xl font-bold mb-6'>Tasks</h1>
            <div className='mt-4'>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                <Card key={task.id} className='w-full'>
                    <a href={`tasks/${task.id}`}> <div className='flex justify-between items-start text-black'>
                    <div>{task.title}</div>
                    <span className='text-gray-500'>
                        {format(new Date(task.createdAt), 'MM/dd/yyyy')}
                    </span>
                    </div>
                    <p className='text-black'>{task.description}</p></a>
                   
                </Card>
                ))
            ) : (
                <p className='text-center text-gray-500'>No tasks available.</p>
            )}
            </div>
        </div>
    );
}
