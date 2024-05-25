import React from "react";
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";

export default function CommonMobileLinks() {

    return (
        <div>
            <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                Home
            </ResponsiveNavLink>

            <ResponsiveNavLink href={route('next-week')} active={route().current('next-week')}>
                Next Week
            </ResponsiveNavLink>

            <ResponsiveNavLink href={route('this-week')} active={route().current('this-week')}>
                This Week
            </ResponsiveNavLink>

            <ResponsiveNavLink href={route('all-weeks')} active={route().current('all-weeks')}>
                All Weeks
            </ResponsiveNavLink>

            <ResponsiveNavLink href={route('best-ofs')} active={route().current('best-ofs')}>
                Best Ofs
            </ResponsiveNavLink>
        </div>
    );
}