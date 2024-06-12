import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import GameContent from './GameContent';
import { Head } from '@inertiajs/react';

export default function CurrentWeek({ auth, games, head }) {

    if (auth.user) {
        return (

            <AuthenticatedLayout
                user={auth.user}
                header='Current Week Games'
            >

                <Head title={head} />

                <GameContent
                    user={auth.user}
                    games={games}
                />

            </AuthenticatedLayout>
        );
    } else return (
        
        <GuestLayout>

            <Head title={head} />

            <GameContent
                header='Current Week Games'
                games={games}
            />

        </GuestLayout>
    );
}