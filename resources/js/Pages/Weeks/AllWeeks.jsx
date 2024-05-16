import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import Year from './Year';
import Announcement from '@/Components/Announcement';

export default function AllWeeks({ auth, years }) {

    if (auth.user) {
        return (

            <AuthenticatedLayout
                user={auth.user}
                header='All Weeks'
            >
                <Announcement
                    text="You're logged in!"
                />

                <div className="pb-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {years.map((year) => (
                            <Year key={year.id} auth={auth} year={year} />
                        ))}
                    </div>
                </div>

            </AuthenticatedLayout>
        );
    } else return (
        
        <GuestLayout>

            <Announcement
                text="You're not logged in!"
            />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {years.map((year) => (
                        <Year key={year.id} auth={auth} year={year} />
                    ))}
                </div>
            </div>

        </GuestLayout>
    );
}