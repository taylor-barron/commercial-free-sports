import React from 'react';

const Comment = ({ username, comment, timestamp, upvotes, userUpvoted, handleUpvote, downvotes, userDownvoted, handleDownvote }) => {
    return (
        <div className='w-full mb-2 flex flex-col'>

            <p className='text-base'>
                <span className='text-slate-500 text-xl'>{username}</span>: {comment}
            </p>

            <div className='text-xs text-slate-300 flex flex-row justify-between'>
                <div>{timestamp}</div>
                <div className='flex flex-row'>
                    <div className='flex flex-row'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={userUpvoted ? 'red' : 'currentColor'} className='h-4 w-4 mr-1 cursor-pointer' onClick={handleUpvote}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        {upvotes}
                    </div>
                    <div className='ml-2 flex flex-row cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={userDownvoted ? 'red' : 'currentColor'} className='h-4 w-4 transform rotate-180 mr-1 cursor-pointer' onClick={handleDownvote}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        {downvotes}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;