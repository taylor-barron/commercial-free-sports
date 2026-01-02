import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";

export default function CommonLinks() {

    return (
        <div className="flex">
            <div className="shrink-0 flex items-center">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </Link>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">

                <NavLink href="/" active={route().current('home')}>
                    Home
                </NavLink>

                {/* <NavLink href="/next-week" active={route().current('next-week')}>
                    Next Week
                </NavLink> */}

                <NavLink href='/this-week' active={route().current('this-week')}>
                    This Week
                </NavLink>

                <NavLink href='/all-weeks' active={route().current('all-weeks')}>
                    All Weeks
                </NavLink>

                <NavLink href='/bestOfs' active={route().current('best-ofs')}>
                    Best Ofs
                </NavLink>
            </div>
        </div>
    );
}