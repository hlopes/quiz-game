import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Icon,
    Menu,
    Segment,
    Visibility,
} from 'semantic-ui-react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { Media } from '../../media/Media';
import useUserContext from '../../../common/useUserContext';

const DesktopContainer = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated, logout } = useUserContext();
    const [isFixed, setIsFixed] = useState(false);

    const hideFixedMenu = useCallback(() => setIsFixed(false), [setIsFixed]);
    const showFixedMenu = useCallback(() => setIsFixed(true), [setIsFixed]);

    return (
        <Media greaterThan="xs">
            <Visibility
                once={false}
                onBottomPassed={showFixedMenu}
                onBottomPassedReverse={hideFixedMenu}
            >
                <Segment
                    textAlign="center"
                    style={{
                        minHeight: '100vh',
                        padding: 0,
                    }}
                    vertical
                >
                    <Menu
                        fixed={isFixed ? 'top' : null}
                        pointing={!isFixed}
                        secondary={!isFixed}
                        size="large"
                        style={{
                            backgroundColor: '#fff',
                        }}
                    >
                        <Container>
                            <Link href={'/'}>
                                <Menu.Item
                                    as="a"
                                    active={router?.pathname === '/'}
                                >
                                    Home
                                </Menu.Item>
                            </Link>
                            {isAuthenticated && (
                                <Link href={'/game'}>
                                    <Menu.Item
                                        active={router?.pathname === '/game'}
                                    >
                                        New Game
                                    </Menu.Item>
                                </Link>
                            )}
                            <Menu.Item position="right">
                                <Link
                                    href={
                                        isAuthenticated ? '/account' : '/signin'
                                    }
                                >
                                    {isAuthenticated ? (
                                        <Button>
                                            <Icon name="user" />
                                            Account
                                        </Button>
                                    ) : (
                                        <Button>
                                            <Icon name="user outline" />
                                            Login
                                        </Button>
                                    )}
                                </Link>
                                {!isAuthenticated && (
                                    <Link href={'/register'}>
                                        <Button
                                            primary={isFixed}
                                            style={{ marginLeft: '0.5em' }}
                                        >
                                            <Icon name="add user" />
                                            Register
                                        </Button>
                                    </Link>
                                )}
                                {isAuthenticated && (
                                    <Button
                                        onClick={logout}
                                        primary={isFixed}
                                        style={{ marginLeft: '0.5em' }}
                                    >
                                        Logout
                                    </Button>
                                )}
                            </Menu.Item>
                        </Container>
                    </Menu>
                    {children}
                </Segment>
            </Visibility>
        </Media>
    );
};

DesktopContainer.propTypes = {
    children: PropTypes.node,
};

export default DesktopContainer;
