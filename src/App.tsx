import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  IconButton
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { GameOfLife } from './shared/utils';
import { GameBoard } from './components/GameBoard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4caf50',
    },
    background: {
      default: '#0a1929',
      paper: '#001e3c',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
  },
});

function App() {
  const [game] = useState(() => new GameOfLife());
  const [rows, setRows] = useState([...game.state.map(row => [...row])]);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const [generation, setGeneration] = useState(0);

  const step = useCallback(() => {
    game.evolve();
    setRows([...game.state.map(row => [...row])]);
    setGeneration((prev) => prev + 1);
  }, [game]);

  const togglePlay = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    const newGame = new GameOfLife();
    game.state = newGame.state;
    setGeneration(0);
    setRows([...game.state.map(row => [...row])]);
  };


  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(step, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, step]);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Container maxWidth="sm">
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              GAME OF LIFE
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Generation: {generation}
            </Typography>

            <Paper elevation={4} sx={{ p: 3, mb: 3, display: 'inline-block' }}>
              <GameBoard grid={rows} onCellClick={(x: number, y: number) => {
                console.log('x: ', x, 'y: ', y);
              }} />
            </Paper>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
                onClick={togglePlay}
                color={isRunning ? "error" : "primary"}
              >
                {isRunning ? 'Pause' : 'Start'}
              </Button>

              <IconButton onClick={step} disabled={isRunning} color="primary" title="Step">
                <SkipNextIcon />
              </IconButton>

              <IconButton onClick={reset} color="warning" title="Reset to Default">
                <RestartAltIcon />
              </IconButton>
            </Stack>
          </Box>
        </Container>
      </Box>

    </ThemeProvider>
  );
}

export default App;
