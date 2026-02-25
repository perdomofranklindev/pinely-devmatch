import React from 'react';
import { Box } from '@mui/material';
import { Cell } from './Cell';

interface GameBoardProps {
    grid: number[][];
    onCellClick: (row: number, col: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ grid, onCellClick }) => {
    return (
        <Box
            sx={{
                display: 'inline-grid',
                gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 40px)`,
                gap: 0.5,
                padding: 2,
                backgroundColor: 'grey.950',
                borderRadius: 1,
                border: '4px solid',
                borderColor: 'grey.800',
                boxShadow: 3,
            }}
        >
            {grid.map((row, i) =>
                row.map((cell, j) => (
                    <Cell
                        key={`${i}-${j}`}
                        alive={cell === 1}
                        onClick={() => onCellClick(i, j)}
                    />
                ))
            )}
        </Box>
    );
};
