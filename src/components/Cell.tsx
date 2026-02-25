import React from 'react';
import { Box } from '@mui/material';

interface CellProps {
    alive: boolean;
    onClick?: () => void;
}

export const Cell: React.FC<CellProps> = ({ alive, onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: 40,
                height: 40,
                backgroundColor: alive ? 'primary.main' : 'grey.900',
                border: '1px solid',
                borderColor: 'grey.800',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: alive ? 'primary.light' : 'grey.800',
                },
            }}
        />
    );
};
