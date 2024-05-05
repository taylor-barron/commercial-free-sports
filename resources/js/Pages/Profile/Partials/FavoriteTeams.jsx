import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function FavoriteTeams({ profile, className = '' }) {
    const favoriteTeamsInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        // favoriteTeams: profile.favorite_teams
        // favoriteTeams: profile.favorite_teams.map((team) => team.id),
        favoriteTeams: [],
        teams: [
            { id: 1, name: 'Team 1' },
            { id: 2, name: 'Team 2' },
            { id: 3, name: 'Team 3' },
        ]
    });

    const selectFavoriteTeam = (e) => {
        const selectedTeamId = Number(e.target.value);
    
        const selectedTeam = data.teams.find((team) => team.id === selectedTeamId);
        const newTeams = data.teams.filter((team) => team.id !== selectedTeamId);
    
        const newFavoriteTeams = [...data.favoriteTeams, selectedTeam];

        newTeams.sort((a, b) => a.name.localeCompare(b.name));
        newFavoriteTeams.sort((a, b) => a.name.localeCompare(b.name));
    
        setData({
            teams: newTeams,
            favoriteTeams: newFavoriteTeams,
        });
    };

    const removeFavoriteTeam = (teamId) => {
        const newFavoriteTeams = data.favoriteTeams.filter((team) => team.id !== teamId);
        const newTeams = [...data.teams, data.favoriteTeams.find((team) => team.id === teamId)];

        newTeams.sort((a, b) => a.name.localeCompare(b.name));
        newFavoriteTeams.sort((a, b) => a.name.localeCompare(b.name));
    
        setData({
            teams: newTeams,
            favoriteTeams: newFavoriteTeams,
        });
    };
    
    const updateFavoriteTeams = (e) => {
        e.preventDefault();
    
        put(route('favorite-teams.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    favoriteTeamsInput.current.focus();
                }
    
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Select Favorite Teams</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Select favorite teams to automatically push to the top of rankings and omit scores to avoid all spoilers for teams whose games you would rather watch than any other games.
                </p>
            </header>

            <form onSubmit={updateFavoriteTeams} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="Favorite Teams" />

                    {data.favoriteTeams.map((team) => (
                        <div key={team.id} className="inline-flex items-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2">
                            <span>{team.name}</span>
                            <button
                                onClick={() => removeFavoriteTeam(team.id)}
                                className="ml-2 text-sm text-gray-500 hover:text-gray-600"
                            >
                                x
                            </button>
                        </div>
                    ))}

                    <div className='mt-6'>
                        <select
                            value=""
                            onChange={selectFavoriteTeam}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        >
                            <option value="">Add a Favorite Team</option>
                            {data.teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
