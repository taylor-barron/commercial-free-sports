import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import HowItWorksContent from '@/PageContent/HowItWorksContent';

export default function HowItWorks({ auth }) {
    if (auth.user) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header='How It Works'
            >

                <HowItWorksContent user={auth.user} />

            </AuthenticatedLayout>
        );
    } else return (
        
        <GuestLayout>

            <HowItWorksContent
                header='How It Works'
            />

        </GuestLayout>
    );
}