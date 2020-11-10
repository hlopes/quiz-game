import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import getAboutData from '../../lib/about';
import useBreakpoints from '../../common/useBreakpoints';
import Layout from '../../components/layout/Layout';

import styles from './About.module.css';

const About = ({ aboutData }) => {
    const { lteSmall } = useBreakpoints();

    return (
        <Layout>
            <Segment
                raised
                padded={lteSmall ? true : 'very'}
                className={styles.wrapper}
            >
                <div dangerouslySetInnerHTML={{ __html: aboutData }} />
            </Segment>
        </Layout>
    );
};

export async function getStaticProps() {
    const aboutData = await getAboutData();

    return {
        props: {
            aboutData,
        },
    };
}

About.propTypes = {
    aboutData: PropTypes.string,
};

export default About;
