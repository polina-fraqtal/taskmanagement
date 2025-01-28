'use client'
import { useEffect, useState } from 'react';
import { Task } from '@/payload-types';
import { Card, Spin } from 'antd';
import dayjs from 'dayjs';

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tasks');
                const data = await response.json();
                setTasks(data.docs);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);
    

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Tasks</h1>
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>In Progress</h2>
                <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px' }}>
                    {tasks.filter(task => task.status === 'In Progress').length === 0 ? (
                        <p style={{ color: 'gray', textAlign: 'center' }}>No tasks in progress</p>
                    ) : (
                        tasks.filter(task => task.status === 'In Progress').map((task) => (
                            <li key={task.id} style={{ marginBottom: '20px' }}>
                                <a href={'tasks/' + task.id.toString()} style={{ textDecoration: 'none' }}>
                                    <Card title={
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {task.title}
                                            <div style={{ fontSize: '0.75rem', margin: 'auto 0', color: 'gray' }}>
                                                Due: {dayjs(task.dueDate).format('DD-MM-YYYY')}
                                            </div>
                                        </div>
                                    } style={{ border: '1px solid #e8e8e8', borderRadius: '4px', padding: '16px' }}>
                                        <p>{task.description}</p>
                                    </Card>
                                </a>
                            </li>
                        ))
                    )}
                </ul>
                <hr style={{ border: '1px solid #e8e8e8', margin: '20px 0' }} />
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>To Do</h2>
                <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px' }}>
                    {tasks.filter(task => task.status === 'To Do').length === 0 ? (
                        <p style={{ color: 'gray', textAlign: 'center' }}>No tasks to do</p>
                    ) : (
                        tasks.filter(task => task.status === 'To Do').map((task) => (
                            <li key={task.id} style={{ marginBottom: '20px' }}>
                                <a href={'tasks/' + task.id.toString()} style={{ textDecoration: 'none' }}>
                                    <Card title={
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {task.title}
                                            <div style={{ fontSize: '0.75rem', margin: 'auto 0', color: 'gray' }}>
                                                Due: {dayjs(task.dueDate).format('DD-MM-YYYY')}
                                            </div>
                                        </div>
                                    } style={{ border: '1px solid #e8e8e8', borderRadius: '4px', padding: '16px' }}>
                                        <p>{task.description}</p>
                                    </Card>
                                </a>
                            </li>
                        ))
                    )}
                </ul>
                <hr style={{ border: '1px solid #e8e8e8', margin: '20px 0' }} />
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Done</h2>
                <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px' }}>
                    {tasks.filter(task => task.status === 'Done').length === 0 ? (
                        <p style={{ color: 'gray', textAlign: 'center' }}>No tasks done</p>
                    ) : (
                        tasks.filter(task => task.status === 'Done').map((task) => (
                            <li key={task.id} style={{ marginBottom: '20px' }}>
                                <a href={'tasks/' + task.id.toString()} style={{ textDecoration: 'none' }}>
                                    <Card title={
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {task.title}
                                            <div style={{ fontSize: '0.75rem', margin: 'auto 0', color: 'gray' }}>
                                                Due: {dayjs(task.dueDate).format('DD-MM-YYYY')}
                                            </div>
                                        </div>
                                    } style={{ border: '1px solid #e8e8e8', borderRadius: '4px', padding: '16px' }}>
                                        <p>{task.description}</p>
                                    </Card>
                                </a>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
