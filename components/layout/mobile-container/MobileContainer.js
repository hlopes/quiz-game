import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Media } from '../../media/Media';

import useUserContext from '../../../hooks/useUserContext';

import styles from './MobileContainer.module.css';

const MobileContainer = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated, logout } = useUserContext();
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);

    const handleSidebarHide = useCallback(() => setIsSidebarOpened(false), []);
    const handleToggle = useCallback(() => setIsSidebarOpened(true), []);

    const logoutAction = useCallback(() => {
        logout();
        handleSidebarHide();
    }, [handleSidebarHide, logout]);

    return (
        <Media as={Sidebar.Pushable} at="xs">
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    inverted
                    onHide={handleSidebarHide}
                    vertical
                    visible={isSidebarOpened}
                >
                    <Link href={'/'}>
                        <Menu.Item active={router?.pathname === '/'}>
                            Home
                        </Menu.Item>
                    </Link>
                    <Link href={'/game'}>
                        <Menu.Item active={router?.pathname === '/game'}>
                            New Game
                        </Menu.Item>
                    </Link>
                    <Link href={isAuthenticated ? '/account' : '/login'}>
                        <Menu.Item
                            active={['/account', '/login'].includes(
                                router?.pathname
                            )}
                        >
                            {isAuthenticated ? (
                                <>
                                    <Icon
                                        name="user"
                                        className={styles.userIcon}
                                    />
                                    Account
                                </>
                            ) : (
                                <>
                                    <Icon
                                        name="user outline"
                                        className={styles.userIcon}
                                    />
                                    Login
                                </>
                            )}
                        </Menu.Item>
                    </Link>
                    {!isAuthenticated && (
                        <Link href={'/register'}>
                            <Menu.Item
                                active={router?.pathname === '/register'}
                            >
                                <Icon
                                    name="add user"
                                    className={styles.userIcon}
                                />
                                Register
                            </Menu.Item>
                        </Link>
                    )}
                    {isAuthenticated && (
                        <Menu.Item onClick={logoutAction}>Logout</Menu.Item>
                    )}
                </Sidebar>
                <Sidebar.Pusher dimmed={isSidebarOpened}>
                    <Segment
                        inverted
                        textAlign="center"
                        style={{ minHeight: '100vh' }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size="large">
                                <Menu.Item onClick={handleToggle}>
                                    <Icon name="sidebar" />
                                </Menu.Item>
                            </Menu>
                            {children}
                        </Container>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Media>
    );
};

MobileContainer.propTypes = {
    children: PropTypes.node,
};

export default MobileContainer;
