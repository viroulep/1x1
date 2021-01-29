import React, { useReducer } from 'react';

import { Button, Grid, Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const dispatcher = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case 'toggleActive':
      const { name, team } = data;
      const newState = {
        ...state,
      };
      const person = newState.teams[team].find((t) => t.name === name);
      person.active = !person.active;
      return newState;
    default:
      throw new Error();
  }
};

const sampleState = {
  // This should be basically readonly atm!
  teams: {
    epona: [
      {
        name: 'fifi',
        active: true,
      },
      {
        name: 'guiton',
        active: true,
      },
      {
        name: 'jmmartinez',
        active: false,
      },
    ],
    sales: [
      {
        name: 'kingtoto',
        active: true,
      },
    ],
  },
  history: [
    {
      date: '2021-01-25',
      pairings: [
        ['fifi', 'guiton'],
        ['kingtoto', 'iomumu'],
      ],
    },
  ],
};

// TODO: setup the imported state and provide it
// TODO: usedispatcher to partially update state
const Landing = () => {
  const classes = useStyles();
  const [state, updateState] = useReducer(dispatcher, sampleState);
  const toto = () =>
    updateState({
      type: 'toggleActive',
      data: { team: 'epona', name: 'fifi' },
    });
  console.log(state.teams.epona);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container direction="column" className={classes.grow}>
        <Grid item>coucou menuuuu</Grid>
        <Grid item>
          <Container>
            recoucou
            <Button variant="contained" onClick={toto}>
              test
            </Button>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
