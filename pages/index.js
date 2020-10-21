import React from 'react';

import { Button, Grid } from 'semantic-ui-react';

import withAuth from '../hooks/withAuth';
import Layout from '../components/Layout';

function Home() {
    return (
        <Layout>
            <Grid.Row>
                <Grid.Column
                    width={5}
                    only="tablet computer large screen widescreen"
                >
                    <h1>Welcome to Quiz Game!</h1>
                    <Button primary fluid size="large">
                        New Game
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Layout>
    );
}

export default withAuth(Home);
