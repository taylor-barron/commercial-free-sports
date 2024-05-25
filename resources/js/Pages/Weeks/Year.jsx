import React, { useState } from 'react';
import Button from '@/Components/Button';
import Week from './Week';

export default function Year({ year }) {

    const [isHidden, setIsHidden] = useState(false);

    const toggleYear = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div key={year.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-4">

            <div className="p-6 bg-red-50 dark:bg-red-800/20 text-white text-2xl font-bold flex justify-between items-center">

                <div>
                    { year.year }
                </div>

                <Button 
                    text={isHidden ? "Show" : "Hide"} 
                    color="bg-black"
                    opacity="0.8"
                    action={toggleYear}
                />
            </div>

            {!isHidden && (
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row w-1/8 flex-wrap">
                        {year.weeks.map((week) => (
                            <Week key={week.id} week={week} />
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
    
}