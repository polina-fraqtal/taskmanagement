import { getPayload } from 'payload';
import config from '@payload-config';
import '../globals.css';

export default async function Navigation() {
const payload = await getPayload({ config });
const fetchNav = async() => {
    try {
        const response = await payload.findGlobal({ slug: 'nav' });
        console.log(response);
        return response.links;
    } catch (error) {
        console.error('Error fetching nav:', error);
    }
}
const navLinks = await fetchNav() || [];
    return (
        <nav className="navigation">
            <ul>
                {navLinks.map((link: any, index: number) => (
                    <li key={index} style={{ marginLeft: index === navLinks.length - 1 ? 'auto' : 'initial' }}>
                        <a href={link.url}>{link.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
