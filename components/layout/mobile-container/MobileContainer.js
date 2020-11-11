import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Media } from '../../media/Media';

import useUserContext from '../../../common/useUserContext';

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
                    <Link href={isAuthenticated ? '/account' : '/signin'}>
                        <Menu.Item
                            active={['/account', '/signin'].includes(
                                router?.pathname
                            )}
                        >
                            {isAuthenticated ? (
                                <>
                                    <Icon name="user" />
                                    Account
                                </>
                            ) : (
                                <>
                                    <Icon name="user outline" />
                                    Login
                                </>
                            )}
                        </Menu.Item>
                    </Link>
                    <Link href={'/about'}>
                        <Menu.Item
                            active={['/about'].includes(router?.pathname)}
                        >
                            About
                        </Menu.Item>
                    </Link>
                    {!isAuthenticated && (
                        <Link href={'/register'}>
                            <Menu.Item
                                active={router?.pathname === '/register'}
                            >
                                <Icon name="add user" />
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
                        textAlign="center"
                        style={{ minHeight: '100vh' }}
                        vertical
                    >
                        <Container>
                            <Menu
                                pointing
                                secondary
                                size="large"
                                style={{
                                    backgroundColor: '#fff',
                                }}
                            >
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
