import React, { useState, useEffect, useContext } from 'react';

export const HydrationRenderContext = React.createContext(true);

function useHydrationRenderProviderValue() {
    const [isHydrationRender, setIsHydrationRender] = useState(true);

    useEffect(() => {
        setIsHydrationRender(false);
    }, []);

    return isHydrationRender;
}

export function HydrationRenderProvider(props) {
    const isHydrationRender = useHydrationRenderProviderValue();

    return (
        <HydrationRenderContext.Provider value={isHydrationRender} {...props} />
    );
}

export function useHydrationRender() {
    return useContext(HydrationRenderContext);
}

export default useHydrationRender;
