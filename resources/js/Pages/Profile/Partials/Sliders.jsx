import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function Sliders({ profile, className = '' }) {

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        
        score_score: profile.score_score,
        importance_score: profile.importance_score,
        explosiveness_score: profile.explosiveness_score,
        talent_score: profile.talent_score,
        penalty_score: profile.penalty_score,
    });

    const handleSliderChange = (name, event) => {
        const newValue = Number(event.target.value);
        let diff = newValue - data[name];
        let newData = {...data};
        newData[name] = newValue;
    
        if (name === 'score_score') {
            if (newData['penalty_score'] >= diff) {
                newData['penalty_score'] -= diff;
            } else if (newData['talent_score'] >= diff) {
                newData['talent_score'] -= diff;
            } else if (newData['explosiveness_score'] >= diff) {
                newData['explosiveness_score'] -= diff;
            } else if (newData['importance_score'] >= diff) {
                newData['importance_score'] -= diff;
            }
        } else if (name === 'importance_score') {
            if (newData['penalty_score'] >= diff) {
                newData['penalty_score'] -= diff;
            } else if (newData['talent_score'] >= diff) {
                newData['talent_score'] -= diff;
            } else if (newData['explosiveness_score'] >= diff) {
                newData['explosiveness_score'] -= diff;
            } else if (newData['score_score'] >= diff) {
                newData['score_score'] -= diff;
            }
        } else if (name === 'explosiveness_score') {
            if (newData['penalty_score'] >= diff) {
                newData['penalty_score'] -= diff;
            } else if (newData['talent_score'] >= diff) {
                newData['talent_score'] -= diff;
            } else if (newData['importance_score'] >= diff) {
                newData['importance_score'] -= diff;
            } else if (newData['score_score'] >= diff) {
                newData['score_score'] -= diff;
            }
        } else if (name === 'talent_score') {
            if (newData['penalty_score'] >= diff) {
                newData['penalty_score'] -= diff;
            } else if (newData['explosiveness_score'] >= diff) {
                newData['explosiveness_score'] -= diff;
            } else if (newData['importance_score'] >= diff) {
                newData['importance_score'] -= diff;
            } else if (newData['score_score'] >= diff) {
                newData['score_score'] -= diff;
            }
        } else if (name === 'penalty_score') {
            if (newData['talent_score'] >= diff) {
                newData['talent_score'] -= diff;
            } else if (newData['explosiveness_score'] >= diff) {
                newData['explosiveness_score'] -= diff;
            } else if (newData['importance_score'] >= diff) {
                newData['importance_score'] -= diff;
            } else if (newData['score_score'] >= diff) {
                newData['score_score'] -= diff;
            }
        }
    
        setData(newData);
    };

    const updateSliders = (e) => {
        e.preventDefault();

        put(route('sliders.update'), {
            preserveScroll: true,
            onSuccess: (response) => {
            },
            onError: (errors) => {

                if (errors.score_score) {
                    reset('score_score', 'importance_score', 'explosiveness_score', 'talent_score', 'penalty_score');
                    scoreScoreInput.current.focus();
                }

                if (errors.importance_score) {
                    reset('importance_score', 'explosiveness_score', 'talent_score', 'penalty_score');
                    importanceScoreInput.current.focus();
                }

                if (errors.explosiveness_score) {
                    reset('explosiveness_score', 'talent_score', 'penalty_score');
                    explosivenessScoreInput.current.focus();
                }

                if (errors.talent_score) {
                    reset('talent_score', 'penalty_score');
                    talentScoreInput.current.focus();
                }

                if (errors.penalty_score) {
                    reset('penalty_score');
                    penaltyScoreInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Sliders</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Use sliders to choose what is important for you in rating games.
                </p>
            </header>

            <form onSubmit={updateSliders} className="mt-6 space-y-6">

                <div className="mt-6">
                    
                    <div>
                        <label htmlFor="scoreScore" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Score Score: { data.score_score }
                        </label>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Score score rates how entertaining the score is. Close games or comebacks score higher.
                        </p>

                        <input
                            type="range"
                            id="scoreScore"
                            value={ data.score_score }
                            onChange={(event) => handleSliderChange('score_score', event)}
                            min="0"
                            max="100"
                            step="1"
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div className='mt-6'>
                        <label htmlFor="importanceScore" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Importance Score: { data.importance_score }
                        </label>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Importance score rates the records for each team. Better records score higher.
                        </p>

                        <input
                            type="range"
                            id="importanceScore"
                            value={ data.importance_score }
                            onChange={(event) => handleSliderChange('importance_score', event)}
                            min="0"
                            max="100"
                            step="1"
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div className='mt-6'>
                        <label htmlFor="explosivenessScore" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Explosivness Score: { data.explosiveness_score }
                        </label>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Explosiveness score rates how many big plays there are. Big plays score higher.
                        </p>

                        <input
                            type="range"
                            id="explosivenessScore"
                            value={ data.explosiveness_score }
                            onChange={(event) => handleSliderChange('explosiveness_score', event)}
                            min="0"
                            max="100"
                            step="1"
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div className='mt-6'>
                        <label htmlFor="talentScore" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Talent Score: { data.talent_score }
                        </label>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Talent score rates recruiting scores for the players. More highly rated players score higher.
                        </p>

                        <input
                            type="range"
                            id="talentScore"
                            value={ data.talent_score }
                            onChange={(event) => handleSliderChange('talent_score', event)}
                            min="0"
                            max="100"
                            step="1"
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div className='mt-6'>
                        <label htmlFor="penaltyScore" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Penalty Score: { data.penalty_score }
                        </label>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Penalty score rates how many penalties there are. Fewer penalties score higher.
                        </p>

                        <input
                            type="range"
                            id="penaltyScore"
                            value={ data.penalty_score }
                            onChange={(event) => handleSliderChange('penalty_score', event)}
                            min="0"
                            max="100"
                            step="1"
                            className="mt-1 block w-full"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-150"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}