import React, { useState } from 'react';
import TimeSlot from './Components/TimeSlot';
import ScrollUpArrow from '@/Components/ScrollUpArrow';
import Announcment from '@/Components/Announcement';

export default function GameContent({ user, games }) {
    
    const [ scoreType, setScoreType ] = useState( games.version );

    const toggleScoreType = () => {
        setScoreType(prevState => prevState === 'default' ? 'custom' : 'default');
    };

    return (

        <div>
            
            {user ? (
                <Announcment 
                    text="Toggle custom and default sliders"
                    isChecked={scoreType === 'custom'}
                    toggleAction={toggleScoreType}
                />
            ):(
                <Announcment
                    leadingLink="Create an account"
                    leadingLinkHref="/register"
                    text=" to set custom sliders, make comments, and hide scores for favorite teams."
                />
            )}

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {games.time_slots.map((time_slot) => (
                    <TimeSlot key={time_slot.id} auth={user} time_slot={time_slot} scoreType={scoreType} />
                ))}
            </div>

            <ScrollUpArrow />
        </div>
    );
}