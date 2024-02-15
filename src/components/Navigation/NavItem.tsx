"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'

type NavItemProps = {
    href: string;
    src?: string;
    alt?: string;
    label: string;
};

export function NavItem({ href, src, alt, label }: NavItemProps) {

    const pathname = usePathname()
    const isActive = pathname === href;
    const itemStyle = isActive ? 'opacity-100' : 'opacity-50';
    return (
        <Link href={href} shallow={true} >
            <div className={`flex flex-col items-center ${itemStyle} hover:opacity-100`}>
                {src ? (
                    <Image src={src} alt={alt || ""} width={50} height={50} />
                ) : (
                    <div className="flex items-center dots-wrapper">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                )}
                <span className='text-sm'>{label}</span>
            </div>
        </Link>
    );
}