import React, { FC } from 'react';
import useDarkMode from 'use-dark-mode';

import useBreakpoints from '@helpers/useBreakpoints';
import getAboutData from '@lib/about';
import Layout from '@components/layout/Layout';

import { StyledSegment } from '@theme/pages/About.styles';

export const getStaticProps = async () => {
    const aboutData = await getAboutData();

    return {
        props: {
            aboutData,
        },
    };
};

type AboutProps = {
    aboutData: any;
};

const About: FC<AboutProps> = ({ aboutData }: AboutProps) => {
    const { value: isDark } = useDarkMode(false);
    const { lteSmall } = useBreakpoints();

    return (
        <Layout>
            <StyledSegment
                inverted={isDark}
                raised
                padded={lteSmall ? true : 'very'}
            >
                <div dangerouslySetInnerHTML={{ __html: aboutData }} />
            </StyledSegment>
        </Layout>
    );
};

export default About;
