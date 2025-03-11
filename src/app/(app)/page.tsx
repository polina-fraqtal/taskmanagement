import '../globals.css'
import { Geist, Geist_Mono } from "next/font/google";
import { Button, Flex, Space } from "antd";
import Title from "antd/es/typography/Title";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Home() {
    return (
        <div>
            <main>
                <Flex
                    vertical
                    justify="center"
                    align="center"
                    className='h-screen'
                >
                    <Title level={1} className='bold'>
                        Welcome to Task Management
                    </Title>
                    <Space direction="vertical" size="large" align="center" className='w-72'>
                        <Button href="/projects" className='w-72'>
                            View available projects
                        </Button>
                        <Button href="/tasks" className='w-72'>
                            View available tasks
                        </Button>
                        <Button href="/announcements" className='w-72'>
                            Read the announcements
                        </Button>
                        <Button
                            href="/admin"
                            target="_blank"
                            className='w-72'
                        >
                            Login as an admin
                        </Button>
                    </Space>
                </Flex>
            </main>
        </div>
    );
}