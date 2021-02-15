import styled from '@emotion/styled';

import { Button, Item, Statistic } from 'semantic-ui-react';
import { gteSmallMedia } from '@theme/custom-media';

export const StyledItemGroup = styled(Item.Group)`
    display: flex;
    justify-content: center;
`;

export const StyledStatisticGroup = styled(Statistic.Group)`
    justify-content: center;
`;

export const StyledLogoutButton = styled(Button)`
    &.ui.button {
        margin-top: 1rem;

        ${gteSmallMedia} {
            margin-top: 0;
        }
    }
`;

export const StyledSaveButton = styled(Button)`
    &.ui.button {
        width: 100%;

        ${gteSmallMedia} {
            width: auto;
        }
    }
`;
