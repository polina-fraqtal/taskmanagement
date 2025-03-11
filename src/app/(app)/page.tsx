import '../globals.css'
import { Geist, Geist_Mono } from "next/font/google";
import { Button, Flex, Space } from "antd";
import Title from "antd/es/typography/Title";
import  Navigation from "../components/Navigation.component";

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
                    style={{ height: '100vh' }}
                >
                    <Title level={1} style={{ fontWeight: 'bold' }}>
                        Welcome to Task Management
                    </Title>
                    <Space direction="vertical" size="large" align="center" className='link-button'>
                        <Button href="/projects" className='link-button'>
                            View available projects
                        </Button>
                        <Button href="/tasks" className='link-button'>
                            View available tasks
                        </Button>
                        <Button href="/announcements" className='link-button' >
                            Read the announcements
                        </Button>
                        <Button
                            href="/admin"
                            target="_blank"
                            className='link-button'
                        >
                            Login as an admin
                        </Button>
                    </Space>
                </Flex>
            </main>
        </div>
    );
}