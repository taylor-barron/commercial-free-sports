import React, { useState } from 'react';
import TimeSlot from '../Pages/Games/Components/TimeSlot';
import Toggle from '../Components/Toggle';

export default function GameContent({ user, games }) {
    
    const [ scoreType, setScoreType ] = useState( games.version );

    const toggleScoreType = () => {
        setScoreType(prevState => prevState === 'default' ? 'custom' : 'default');
    };

    return (

        <div className="py-12">

            {user ? (
                <div className="pb-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100 flex justify-between">
                                Toggle custom and default sliders
                                <Toggle 
                                    checkedText="Custom Sliders"
                                    uncheckedText="Default Sliders"  
                                    uncheckedColor="bg-slate-500"
                                    checkedColor="bg-slate-900" 
                                    isChecked={scoreType === 'custom'}
                                    handleCheckboxChange={toggleScoreType}
                                    name="toggleScoreType"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                <div className="pb-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100"><a className='text-gray-500' href='/register'>Create an account</a> to set custom sliders, make comments, and hide scores for favorite teams.</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {games.time_slots.map((time_slot) => (
                    <TimeSlot key={time_slot.id} auth={user} time_slot={time_slot} scoreType={scoreType} />
                ))}
            </div>
        </div>
    );
}