import React, { useReducer } from 'react';

import { Grid, Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { loadStateFromJson } from '../logic/serialization';
import { stateUpdater } from '../logic/state';

import Teams from './Teams';
import History from './History';
import CreatePairings from './CreatePairings';

// FIXME: tmp
import sampledata from '../data.json';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  grow: {
    flexGrow: 1,
  },
}));

// TODO: setup the imported state and provide it
const Landing = () => {
  const classes = useStyles();
  const [state, updateState] = useReducer(
    stateUpdater,
    loadStateFromJson(sampledata)
  );

  const { teams, history, peopleToTeam } = state;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <CreatePairings
              teams={teams}
              peopleToTeam={peopleToTeam}
              history={history}
              updateState={updateState}
            />
          </Grid>
          <Grid item>
            <Teams teams={teams} updateState={updateState} />
          </Grid>
          <Grid item>
            <History history={history} peopleToTeam={peopleToTeam} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Landing;
