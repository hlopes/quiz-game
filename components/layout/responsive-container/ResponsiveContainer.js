import React from 'react';
import PropTypes from 'prop-types';

import { MediaContextProvider } from '../../media/Media';
import DesktopContainer from '../desktop-container/DesktopContainer';
import MobileContainer from '../mobile-container/MobileContainer';

const ResponsiveContainer = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

export default ResponsiveContainer;
