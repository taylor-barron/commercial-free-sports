import React from 'react';
import Toggle from './Toggle';

const Announcment = ({ leadingLink, leadingLinkHref, text, closingLink, closingLinkHref, toggleAction }) => {
    return (
        <div className="pt-12 pb-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100 flex justify-between">
                        <p>
                            <a href={ leadingLinkHref }>{ leadingLink && ( leadingLink )}</a>
                            { text }
                            <a href={ closingLinkHref }>{ closingLink && ( closingLink )}</a>
                        </p>
                        { toggleAction && (
                            <Toggle 
                                checkedText="Custom Sliders"
                                uncheckedText="Default Sliders"  
                                uncheckedColor="bg-slate-500"
                                checkedColor="bg-slate-900" 
                                isChecked={scoreType === 'custom'}
                                handleCheckboxChange={toggleAction}
                                name="toggleScoreType"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Announcment;