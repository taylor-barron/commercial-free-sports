import React, { useState } from 'react';
import Button from '@/Components/Button';
import GameComments from './GameComments';

const Game = ({ auth, game }) => {

    const [isHidden, setIsHidden] = useState(game.favorite ? true : false);

    const toggleGame = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div key={game.id} className="p-6 bg-white dark:bg-gray-800/20 text-gray-800 dark:text-gray-200 text-xl font-bold flex flex-row w-full mt-0 mb-0">

            <div className='w-1/2'>

                <div className="mx-4 flex justify-between rounded-t">
                    <span style={{ background: `${game.away_color}` }} className="p-6 w-2/5 flex items-center justify-center rounded-tl">{ game.away_team }</span>
                    <span style={{ background: `linear-gradient(to right, ${game.away_color}, ${game.home_color})` }} className="p-6 w-1/5 flex items-center justify-center"></span>
                    <span style={{ background: `${game.home_color}` }} className="p-6 w-2/5 flex items-center justify-center rounded-tr">{ game.home_team }</span>
                </div>

                { !game.favorite ? (
            
                    <div className="mx-4 flex flex-col justify-betwen bg-slate-700 bg-opacity-90 rounded-b">

                        <div className='mx-4 p-4 flex flex-row justify-between'>
                            <span>Overall Score</span>
                            <span>{ game.overall_score }</span>
                        </div>

                        { !isHidden && (
                            <div className="flex flex-col justify-between">
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
                                text={isHidden ? "Show More" : "Show Less"}
                                color="bg-black"
                                opacity="0.8"
                                action={toggleGame}
                            />
                        </div>

                    </div>
                ):(
                    <div style={{ background: `${game.favorite_color}` }} className="mx-4 flex flex-col justify-betwen rounded-b">

                        { !isHidden ? (

                            <div>
                                <div className='mx-4 p-4 flex flex-row justify-between'>
                                    <span>Overall Score</span>
                                    <span>{ game.overall_score }</span>
                                </div>

                                <div className="flex flex-col justify-between">
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
                            </div>
                        ):(    
                            <div className='mx-4 p-4 flex flex-row justify-center'>
                                <span>All Spoilers Hidden</span>
                            </div>
                        )
                    }

                        <div className='mx-4 pt-0 pr-4 pb-4 pl-4 flex flex-row justify-center'>
                            <Button
                                text={isHidden ? "Show More" : "Show Less"}
                                color="bg-black"
                                opacity="0.8"
                                action={toggleGame}
                            />
                        </div>

                    </div>
                )}

            </div>

            <div className='w-1/2'>
                <GameComments auth={auth} game={game} />
            </div>
        </div>
    );
}

export default Game;