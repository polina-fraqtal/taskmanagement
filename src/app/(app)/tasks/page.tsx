import { getPayload } from 'payload';
import config from '@payload-config';
import Card from 'antd/es/card/Card';

const payload = await getPayload({ config });

const fetchTask = async () => {
    try {
        const response = await payload.find({ collection: 'tasks'});
        return response.docs;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

const tasks = await fetchTask() || [];

export default function Tasks() {

    return (
        <div className='tasks-container'>
            <h1 className='tasks-title'>Tasks</h1>
            <div className='tasks-list'>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Card key={task.id} className='task-card'>
                            <div className='task-header'>
                                <div>{task.title}</div>
                                <span className='task-date'>
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p>{task.description}</p>
                        </Card>
                    ))
                ) : (
                    <p className='no-tasks'>No tasks available.</p>
                )}
            </div>
        </div>
    );
}
