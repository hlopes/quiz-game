import React from 'react';
import PropTypes from 'prop-types';

import { MediaContextProvider } from '../../media/Media';
import DesktopContainer from '../desktop-container/DesktopContainer';
import MobileContainer from '../mobile-container/MobileContainer';

const ResponsiveContainer = ({ children }) => (
    <MediaContextProvider>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

export default ResponsiveContainer;
