import styled from '@emotion/styled';

import { Card, Statistic } from 'semantic-ui-react';
import { gteSmallMedia } from '@theme/custom-media';

export const DifficultyLabel = styled(Card.Description)`
    position: absolute;
    top: 0;
    right: 0;

    ${gteSmallMedia} {
        transform: translate3d(50%, -50%, 0);
    }
`;

export const Category = styled(Card.Description)`
    margin-bottom: 0.5rem;
    color: ${({ theme }) => `${theme.text.primary} !important`};
`;

export const ImageWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const CardContent = styled(Card.Content)`
    background-color: ${({ theme }) => `${theme.bg.primary} !important`};
`;

export const CardHeader = styled(Card.Header)`
    color: ${({ theme }) => `${theme.text.primary} !important`};

    & h2 {
        color: ${({ theme }) => `${theme.text.primary} !important`};
    }
`;

export const StatisticValue = styled(Statistic.Value)`
    color: ${({ theme }) => `${theme.text.primary} !important`};
`;
