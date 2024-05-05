import React, { useEffect } from 'react';

const DefaultHead = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
};

export default DefaultHead;