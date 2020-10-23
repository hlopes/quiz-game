import React from 'react';

import withAuth from '../../hooks/withAuth';
import Layout from '../../components/layout/Layout';

const Account = () => {
    return <Layout>$$$ Account</Layout>;
};

Account.propTypes = {};

export default withAuth(Account);
