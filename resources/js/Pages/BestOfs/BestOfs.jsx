import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import BestOfsContent from './BestOfsContent';
import { Head } from '@inertiajs/react';
import ScrollUpArrow from '@/Components/ScrollUpArrow';

export default function BestOfs({ auth, games, head }) {

    if (auth.user) {
        return (

            <AuthenticatedLayout
                user={auth.user}
                header='Current Week Games'
            >

                <Head title={head} />

                <BestOfsContent
                    user={auth.user}
                    games={games}
                />

                <ScrollUpArrow />

            </AuthenticatedLayout>
        );
    } else return (
        
        <GuestLayout>

            <Head title={head} />

            <BestOfsContent
                header='Current Week Games'
                games={games}
            />

            <ScrollUpArrow />

        </GuestLayout>
    );
}