import React, { useState } from 'react';
import Game from './Game';
import Button from '@/Components/Button';

const TimeSlot = ({ auth, time_slot, scoreType }) => {

    const [isHidden, setIsHidden] = useState(false);

    const toggleTimeSlot = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div key={time_slot.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-4">

            <div className="p-6 bg-red-50 dark:bg-red-800/20 text-white text-s sm:text-2xl font-bold flex justify-between items-center">

                <div>
                    { time_slot.time_slot } { time_slot.date }
                </div>

                <Button 
                    text={isHidden ? "Show" : "Hide"} 
                    color="bg-black"
                    opacity="0.8"
                    action={toggleTimeSlot}
                />
            </div>

            {!isHidden && (
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-full">
                        {time_slot.games[scoreType].map((game) => (
                            <Game key={game.id} auth={auth} game={game} />
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

export default TimeSlot;