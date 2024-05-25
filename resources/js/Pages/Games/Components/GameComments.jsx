import React, { useState } from 'react';
import Button from '@/Components/Button';
import logo from '/public/images/icons/navbar.png';
import Comment from '@/Components/Comment';
import CommentInput from '@/Components/CommentInput';

const GameComment = ({ auth, game }) => {

    const [isHidden, setIsHidden] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const toggleComments = (game) => {

        setIsHidden(!isHidden);
        setIsLoading(true);

        getComments(game);
    };

    const getComments = (game) => {

        axios.get(route('comments.get', {game_id: game.id}))
            .then(response => {
                
                setComments(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    };

    const handleUpvote = (auth, commentId) => {

        if (!auth) {
            return;
        }

        axios.post(route('comments.like', {comment_id: commentId}), { commentId: commentId })
            .then(response => {
                getComments(game);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const handleDownvote = (auth, commentId) => {

        if (!auth) {
            return;
        }

        axios.post(route('comments.dislike', {comment_id: commentId}), { commentId: commentId })
            .then(response => {
                getComments(game);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const handleCommentSubmit = (game, inputValue) => {
        
        setIsLoading(true);

        axios.post(route('comments.create', {game_id: game.id}), { comment: inputValue })
            .then(response => {
                getComments(game);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });

        setComments('');
    };

    return (
        <div className='w-full h-full mt-8 sm:mt-0 flex flex-col items-center justify-center'>
            { !isHidden ? (
                    isLoading ? (
                        <div className='w-full h-4/5 flex flex-col items-center justify-center'>
                            <img src={logo} alt="Logo" className="w-20 h-20 animate-bounce" />
                            Comments may contain spoilers
                        </div>
                    ):(
                        <div className='w-full h-full flex flex-col'>
                            <div className='overflow-auto h-full max-h-80 overflow-auto'>
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <Comment
                                            key={comment.id}
                                            username={comment.username}
                                            comment={comment.comment}
                                            timestamp={comment.timestamp}
                                            upvotes={comment.upvotes}
                                            userUpvoted={comment.user_upvoted}
                                            handleUpvote={() => handleUpvote(auth, comment.id)}
                                            downvotes={comment.downvotes}
                                            userDownvoted={comment.user_downvoted}
                                            handleDownvote={() => handleDownvote(auth, comment.id)}
                                        />
                                    ))
                                ) : (
                                    <div className='w-full h-4/5 flex flex-col items-center justify-center'>
                                        <img src={logo} alt="Logo" className="w-20 h-20" />
                                        No comments yet...
                                    </div>
                                )}
                            </div>
                            <div>
                                {auth && (
                                    <CommentInput onSubmit={(inputValue) => handleCommentSubmit(game, inputValue)} />
                                )}
                            </div>
                        </div>
                    )
                ):(
                    <div className='w-full h-4/5 flex flex-col items-center justify-center'>
                        <div className='w-full h-4/5 flex flex-col items-center justify-center'>
                            <img src={logo} alt="Logo" className="w-20 h-20" />
                            Comments may contain spoilers
                        </div>
                    </div>
                )
            }

            { isHidden && (
                <div className='m-8 sm:m-0'>
                    <Button
                        text={isHidden ? "Show Comments" : "Hide"}
                        color="bg-black"
                        opacity="0.8"
                        action={() => toggleComments(game)}
                    />
                </div>
            )}
        </div>
    );
}

export default GameComment;