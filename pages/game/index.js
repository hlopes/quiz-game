import React from 'react';

import Layout from '../../components/layout/Layout';
import withAuth from '../../hooks/withAuth';

const Game = () => {
    return <Layout>GAME</Layout>;
};

export default withAuth(Game);
