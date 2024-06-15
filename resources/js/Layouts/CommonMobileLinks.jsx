import React from "react";
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";

export default function CommonMobileLinks() {

    return (
        <div>
            <ResponsiveNavLink href='/' active={route().current('home')}>
                Home
            </ResponsiveNavLink>

            <ResponsiveNavLink href='/next-week' active={route().current('next-week')}>
                Next Week
            </ResponsiveNavLink>

            <ResponsiveNavLink href='/this-week' active={route().current('this-week')}>
                This Week
            </ResponsiveNavLink>

            <ResponsiveNavLink href='/all-weeks' active={route().current('all-weeks')}>
                All Weeks
            </ResponsiveNavLink>

            <ResponsiveNavLink href='/bestOfs' active={route().current('best-ofs')}>
                Best Ofs
            </ResponsiveNavLink>
        </div>
    );
}