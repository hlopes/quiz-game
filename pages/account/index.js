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
} from 'semantic-ui-react';

import useBreakpoints from '../../common/useBreakpoints';
import withAuth from '../../common/withAuth';
import Layout from '../../components/layout/Layout';
import useUserContext from '../../common/useUserContext';

const Account = () => {
    const { user } = useUserContext();
    const { lteSmall } = useBreakpoints();

    const userImage = user.image
        ? user.image
        : 'https://react.semantic-ui.com/images/wireframe/image.png';

    return (
        <Layout>
            <Segment
                raised
                padded="very"
                compact
                style={{ backgroundColor: '#fff', margin: '0 auto' }}
            >
                <Item>
                    <Item.Image size="tiny" src={userImage} circular />
                    <Item.Content verticalAlign="middle">
                        <List>
                            <List.Item>
                                <List.Icon name="user circle" />
                                <List.Content>{user.name}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name="mail" />
                                <List.Content>{user.email}</List.Content>
                            </List.Item>
                        </List>
                    </Item.Content>
                </Item>
                <Divider />
                <Statistic.Group size={lteSmall ? 'mini' : 'medium'}>
                    <Statistic label="Score" value={`${user.score}%`} />
                    <Statistic label="Correct" value={user.points} />
                    <Statistic
                        label="Questions"
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
