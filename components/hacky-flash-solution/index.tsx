import React from 'react';
import useHydrationRender from '@helpers/useHydrationRender';

const HackyFlashSolution = ({ children }) => {
    const isHydrationRender = useHydrationRender();

    if (isHydrationRender) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>;
    }

    return children;
};

export default HackyFlashSolution;
