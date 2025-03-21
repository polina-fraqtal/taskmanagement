import { getPayload } from 'payload';
import config from '@payload-config';      

export default async function TaskPage({ params }: { params: { slug: string } }) {
   
    const payload = await getPayload({ config });

    const fetchTask = async (slug: string) => {
        try {
            const response = await payload.find({
                collection: 'tasks',
                where: {
                    id: {
                        equals: slug,
                    }
                },

            })
            return response.docs[0];
        } catch (error) {
            console.error('Error fetching a task:', error);
        }
    }

    const task = await fetchTask((await params).slug);

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
