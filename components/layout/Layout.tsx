import React, { FC } from 'react';

import { MediaContextProvider } from '@components/media/Media';
import DocumentHead from '@components/layout/document-head';
import MobileNavigation from '@components/layout/navigation/mobile';
import DesktopNavigation from '@components/layout/navigation/desktop';
import Footer from '@components/layout/footer';

import { Main } from './Layout.styles';

type Props = {
    children: any;
};

const Layout: FC<Props> = ({ children }: Props) => {
    return (
        <Main>
            <DocumentHead />
            <MediaContextProvider>
                <DesktopNavigation />
                <MobileNavigation />
            </MediaContextProvider>
            {children}
            <Footer />
        </Main>
    );
};

export default Layout;
