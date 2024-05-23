import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import BestOfsContent from './BestOfsContent';

export default function BestOfs({ auth, games }) {

    if (auth.user) {
        return (

            <AuthenticatedLayout
                user={auth.user}
                header='Current Week Games'
            >

                <BestOfsContent
                    user={auth.user}
                    games={games}
                />

            </AuthenticatedLayout>
        );
    } else return (
        
        <GuestLayout>

            <BestOfsContent
                header='Current Week Games'
                games={games}
            />

        </GuestLayout>
    );
}