import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import classnames from 'classnames';

import styles from './HomepageHeading.module.css';

const HomepageHeading = ({ isMobile }) => {
    return (
        <Container text>
            <Header
                as="h1"
                content="Welcome to Quiz Game!"
                inverted
                className={classnames(styles.header, {
                    [styles.headerNotMobile]: isMobile,
                })}
            />
            <Button primary size="huge">
                New Game
                <Icon name="right arrow" />
            </Button>
        </Container>
    );
};

HomepageHeading.propTypes = {
    isMobile: PropTypes.bool,
};

export default HomepageHeading;
