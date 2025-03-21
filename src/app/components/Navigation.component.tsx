import { getPayload } from 'payload';
import config from '@payload-config';
import '../globals.css';
import LogoutButton from './LogoutButton';

export default async function Navigation() {
    const payload = await getPayload({ config });
    const fetchNav = async () => {
        try {
            const response = await payload.findGlobal({ slug: 'nav' });
            return response.links;
        } catch (error) {
            console.error('Error fetching nav:', error);
        }
    };

    const navLinks = await fetchNav() || [];

    return (
        <nav className="flex justify-start items-center bg-black text-white text-xl p-10 h-15 text-center sticky top-0 z-100 shadow-md">
            <ul className="flex gap-10 w-full">
                {navLinks.map((link: any, index: number) => (
                    <li key={index} className={`list-none`}>
                        <a href={link.url} className="no-underline text-white">{link.text}</a>
                    </li>
                ))}
                <li className="list-none ml-auto">
                    <LogoutButton />
                </li>
            </ul>
        </nav>
    );
}
