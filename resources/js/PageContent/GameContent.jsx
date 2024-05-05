import React, { useState } from 'react';
import Button from '../Components/Button';

export default function GameContent({ user, games }) {
    console.log(games); // REMovE LATER

    const [ hiddenTimeSlots, setHiddenTimeSlots ] = useState([]);
    const [ shownGames, setShownGames ] = useState([]);

    const toggleTimeSlot = id => {
        setHiddenTimeSlots(prevState => 
            prevState.includes(id) ? prevState.filter(slotId => slotId !== id) : [...prevState, id]
        );
    };

    const toggleGame = id => {
        setShownGames(prevState => 
            prevState.includes(id) ? prevState.filter(gameId => gameId !== id) : [...prevState, id]
        );
    }
    return (

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {games.time_slots.map((time_slot) => (
                    <div key={time_slot.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-4">

                        <div className="p-6 bg-red-50 dark:bg-red-800/20 text-white text-2xl font-bold flex justify-between items-center">

                            <div>
                                { time_slot.time_slot } { time_slot.date }
                            </div>

                            <Button 
                                text={hiddenTimeSlots.includes(time_slot.id) ? "Show" : "Hide"} 
                                color="bg-black"
                                opacity="0.8"
                                action={() => toggleTimeSlot(time_slot.id)}
                            />
                        </div>

                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col w-1/2">
                                {!hiddenTimeSlots.includes(time_slot.id) && time_slot.games.map((game) => (
                                    <div key={game.id} className="p-6 bg-white dark:bg-gray-800/20 text-gray-800 dark:text-gray-200 text-xl font-bold flex flex-col w-full mt-0 mb-0">
                                        
                                        <div className="mx-4 flex justify-between rounded-t">
                                            <span style={{ background: `${game.away_color}` }} className="p-6 w-2/5 flex items-center justify-center rounded-tl">{ game.away_team }</span>
                                            <span style={{ background: `linear-gradient(to right, ${game.away_color}, ${game.home_color})` }} className="p-6 w-1/5 flex items-center justify-center"></span>
                                            <span style={{ background: `${game.home_color}` }} className="p-6 w-2/5 flex items-center justify-center rounded-tr">{ game.home_team }</span>
                                        </div>
                                    
                                        <div className="mx-4 flex flex-col justify-betwen bg-slate-700 bg-opacity-90 rounded-b">

                                            <div className='mx-4 p-4 flex flex-row justify-between'>
                                                <span>Overall Score</span>
                                                <span>{ game.overall_score }</span>
                                            </div>

                                            { shownGames.includes(game.id) && (
                                                <div className="flex flex-col justify-betwen bg-slate-700 bg-opacity-90">
                                                    <div className='mx-4 pt-0 pr-4 pb-4 pl-4 flex flex-row justify-between'>
                                                        <span>Score Score</span>
                                                        <span>{ game.score_score }</span>
                                                    </div>

                                                    <div className='mx-4 pt-0 pr-4 pb-4 pl-4 flex flex-row justify-between'>
                                                        <span>Importance Score</span>
                                                        <span>{ game.importance_score }</span>
                                                    </div>

                                                    <div className='mx-4 pt-0 pr-4 pb-4 pl-4 flex flex-row justify-between'>
                                                        <span>Explosiveness Score</span>
                                                        <span>{ game.explosiveness_score }</span>
                                                    </div>

                                                    <div className='mx-4 pt-0 pr-4 pb-4 pl-4 flex flex-row justify-between'>
                                                        <span>Talent Score</span>
                                                        <span>{ game.talent_score }</span>
                                                    </div>

                                                    <div className='mx-4 pt-0 pr-4 pb-4 pl-4 flex flex-row justify-between'>
                                                        <span>Penalty Score</span>
                                                        <span>{ game.penalty_score }</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className='mx-4 pt-0 pr-4 pb-4 pl-4 flex flex-row justify-center'>
                                                <Button
                                                    text={shownGames.includes(game.id) ? "Show Less" : "Show More"}
                                                    color="bg-black"
                                                    opacity="0.8"
                                                    action={() => toggleGame(game.id)}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex items-center justify-center">
                                I go to the right
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}