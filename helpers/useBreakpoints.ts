import { useMemo, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

import { findBreakpointAtWidth } from '@components/media/Media';

import useHydrationRender from './useHydrationRender';

type Breakpoints = {
    isExtraSmall?: boolean;
    isSmall?: boolean;
    isMedium?: boolean;
    isLarge?: boolean;
    isExtraLarge?: boolean;
    gteSmall?: boolean;
    gteMedium?: boolean;
    lteSmall?: boolean;
    lteMedium?: boolean;
};

const useBreakpoints = (): Breakpoints => {
    const isHydrationRender = useHydrationRender();

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = debounce(
            () => setWindowWidth(window.innerWidth),
            200
        );

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return useMemo(() => {
        if (isHydrationRender) {
            return {};
        }

        const currentBreakpoint = findBreakpointAtWidth(windowWidth);

        const isExtraSmall = currentBreakpoint === 'xs';
        const isSmall = currentBreakpoint === 'sm';
        const isMedium = currentBreakpoint === 'md';
        const isLarge = currentBreakpoint === 'lg';
        const isExtraLarge = currentBreakpoint === 'xl';

        return {
            isExtraSmall,
            isSmall,
            isMedium,
            isLarge,
            isExtraLarge,
            gteSmall: isSmall || isMedium || isLarge || isExtraLarge,
            gteMedium: isMedium || isLarge || isExtraLarge,
            lteSmall: isExtraSmall || isSmall,
            lteMedium: isExtraSmall || isSmall || isMedium,
        };
    }, [isHydrationRender, windowWidth]);
};

export default useBreakpoints;
