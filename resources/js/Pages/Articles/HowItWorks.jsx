import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import HowItWorksContent from '@/Pages/Articles/HowItWorksContent';
import { Head } from '@inertiajs/react';

export default function HowItWorks({ auth }) {
    if (auth.user) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header='How It Works'
            >

                <Head title='How It Works' />

                <HowItWorksContent user={auth.user} />

            </AuthenticatedLayout>
        );
    } else return (
        
        <GuestLayout>

            <Head title='How It Works' />

            <HowItWorksContent
                header='How It Works'
            />

        </GuestLayout>
    );
}