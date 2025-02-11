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
      <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Tasks</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => (
              <li key={task.id} style={{ marginBottom: '20px' }}>
                  <a href={'tasks/' + task.id.toString()} style={{ textDecoration: 'none' }}>
                      <Card title={task.title} style={{ border: '1px solid #e8e8e8', borderRadius: '4px', padding: '16px' }}>
                          <p>{task.description}</p>
                      </Card>
                  </a>
              </li>
          ))}
      </ul>
  </div>
    );
}
