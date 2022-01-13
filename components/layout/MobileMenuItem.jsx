import Link from 'next/link';
import { useRouter } from 'next/router';

const MobileMenuItem = ({ Ikona, path }) => {
    const router = useRouter();
    let className = 'text-white cursor-pointer';
    if (router.pathname === path) {
        className += ' text-slate-900';
    }
    return (
        <div className={className}>
            <Link href={path} passHref>
                <a>
                    <Ikona size={35} />
                </a>
            </Link>
        </div>
    );
};

export default MobileMenuItem;
