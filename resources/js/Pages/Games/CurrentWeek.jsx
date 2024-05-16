import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import GameContent from '@/PageContent/GameContent';

export default function CurrentWeek({ auth, games }) {

    if (auth.user) {
        return (

            <AuthenticatedLayout
                user={auth.user}
                header='Current Week Games'
            >

                <GameContent
                    user={auth.user}
                    games={games}
                />

            </AuthenticatedLayout>
        );
    } else return (
        
        <GuestLayout>

            <GameContent
                header='Current Week Games'
                games={games}
            />

        </GuestLayout>
    );
}