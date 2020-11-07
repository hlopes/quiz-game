import React from 'react';
import {
    Button,
    Divider,
    Item,
    Form,
    Input,
    List,
    Segment,
    Statistic,
    Icon,
} from 'semantic-ui-react';

import useBreakpoints from '../../common/useBreakpoints';
import withAuth from '../../common/withAuth';
import Layout from '../../components/layout/Layout';
import useUserContext from '../../common/useUserContext';

import styles from './Account.module.css';

const Account = () => {
    const { user } = useUserContext();
    const { lteSmall } = useBreakpoints();

    const userImage = user.image
        ? user.image
        : 'https://react.semantic-ui.com/images/wireframe/image.png';

    return (
        <Layout>
            <Segment raised padded={lteSmall ? true : 'very'}>
                <Item.Group className={styles.userWrapper}>
                    <Item className={styles.user}>
                        <Item.Image size="tiny" src={userImage} circular />
                        <Item.Content verticalAlign="middle">
                            <List>
                                <List.Item>
                                    <Icon name="user circle" />
                                    {user.name}
                                </List.Item>
                                <List.Item>
                                    <Icon name="mail" />
                                    {user.email}
                                </List.Item>
                            </List>
                        </Item.Content>
                    </Item>
                </Item.Group>
                <Divider />
                <Statistic.Group
                    className={styles.statistics}
                    size={lteSmall ? 'mini' : 'small'}
                >
                    <Statistic
                        label="Score"
                        color="yellow"
                        value={`${user.score}%`}
                    />
                    <Statistic
                        label="Correct"
                        color="olive"
                        value={user.points}
                    />
                    <Statistic
                        label="Questions"
                        color="teal"
                        value={user.questionsAnswered}
                    />
                </Statistic.Group>
                <Divider />
                <Form>
                    <Form.Field inline>
                        <label>Nº of questions</label>
                        <Input type={'number'} max={5} />
                    </Form.Field>
                    <Button primary size="big">
                        Save
                    </Button>
                </Form>
            </Segment>
        </Layout>
    );
};

Account.propTypes = {};

export default withAuth(Account);
