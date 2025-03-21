import '../globals.css'
import { Button, Flex, Space } from "antd";
import Title from "antd/es/typography/Title";


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
                    <Space direction="vertical" size="large" align="center" className='w-72 mt-12'>
                        <Button href="/login" className='w-72'>
                           Log in
                        </Button>
                    </Space>
                </Flex>
            </main>
        </div>
    );
}