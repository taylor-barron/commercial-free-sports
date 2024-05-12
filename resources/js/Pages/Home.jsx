import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import HomeContent from '@/PageContent/HomeContent';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    if (auth.user) {
        return (
            <AuthenticatedLayout
                user={auth.user}
            >
                <Head title="Home" />

                <div className="pt-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                        </div>
                    </div>
                </div>

                <HomeContent user={auth.user} />

            </AuthenticatedLayout>
        );
    } else return (
        
        <GuestLayout>

            <Head title="Home" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're not logged in!</div>
                    </div>
                </div>
            </div>

            <HomeContent user={auth.user} />

        </GuestLayout>
    );
}
