import React, { FC, useState, useEffect, useContext } from 'react';

export const HydrationRenderContext = React.createContext<boolean>(true);

function useHydrationRenderProviderValue() {
    const [isHydrationRender, setIsHydrationRender] = useState(true);

    useEffect(() => {
        setIsHydrationRender(false);
    }, []);

    return isHydrationRender;
}

export const HydrationRenderProvider: FC = (props) => {
    const isHydrationRender = useHydrationRenderProviderValue();

    return (
        <HydrationRenderContext.Provider value={isHydrationRender} {...props} />
    );
};

export function useHydrationRender() {
    return useContext<boolean>(HydrationRenderContext);
}

export default useHydrationRender;
