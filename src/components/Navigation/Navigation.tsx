
import "./styles.css"
import { NavItem } from './NavItem';

function Navigation() {
    return (
        <div className="flex justify-center sticky top-12 z-2 bg-white bottom-shadow md:px-10 mb-8">
            <div className="flex items-center justify-center">
                <div className="flex hide-scrollbar p-2 items-center gap-8">
                    <NavItem href="/all" label="Wszystko" />
                    <NavItem href="/paintball" src="/icons/paintball.svg" alt="Paintball" label="Paintball" />
                    <NavItem href="/quady" src="/icons/quady.svg" alt="Quady" label="Quady" />
                    <NavItem href="/gokarty" src="/icons/gokarty.svg" alt="Gokarty" label="Gokarty" />
                </div>
            </div>
        </div>
    );
}

export default Navigation; 