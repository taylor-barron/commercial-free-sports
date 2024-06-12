import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import BestOfsContent from './BestOfsContent';
import { Head } from '@inertiajs/react';

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

            </AuthenticatedLayout>
        );
    } else return (
        
        <GuestLayout>

            <Head title={head} />

            <BestOfsContent
                header='Current Week Games'
                games={games}
            />

        </GuestLayout>
    );
}