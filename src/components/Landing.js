import React, { useReducer } from 'react';

import { Grid, Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { stateUpdater } from '../logic/state';

import Teams from './Teams';
import History from './History';
import CreatePairings from './CreatePairings';
import LoadJson from './LoadJson';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}));

// TODO: setup the imported state and provide it
const Landing = () => {
  const classes = useStyles();
  const [state, updateState] = useReducer(stateUpdater, null);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container>
        {state ? (
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <CreatePairings state={state} updateState={updateState} />
            </Grid>
            <Grid item>
              <Teams state={state} updateState={updateState} />
            </Grid>
            <Grid item>
              <History state={state} />
            </Grid>
          </Grid>
        ) : (
          <LoadJson updateState={updateState} />
        )}
      </Container>
    </div>
  );
};

export default Landing;
