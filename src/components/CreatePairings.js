import React, { useState, useCallback } from 'react';

import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HistoryContent from './HistoryContent';
import { createPairings } from '../logic/pairings';
import { jsonFromState } from '../logic/serialization';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const CreatePairings = ({ state, updateState }) => {
  const classes = useStyles();

  const { teams, history, peopleToTeam } = state;

  const [pairings, setPairings] = useState(null);
  const [changed, setChanged] = useState(false);
  const pairingInHistory = pairings
    ? history.findIndex(({ date }) => date === pairings.date) !== -1
    : false;

  const downloadAction = useCallback(() => {
    const json = JSON.stringify(jsonFromState(state), null, 2);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const blobURL = window.URL.createObjectURL(blob);
    const tmp = document.createElement('a');
    tmp.href = blobURL;
    tmp.setAttribute('download', '1x1-data.json');
    document.body.appendChild(tmp);
    tmp.click();
  }, [state]);

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant="h2">Create new pairings</Typography>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="body1" component="div">
                <ol>
                  <li>
                    Go to the "teams" section and unselect the person
                    unavailable.
                  </li>
                  <li>Create the pairings by clicking the button below</li>
                  <li>
                    If you are not happy about them, go back to step 2,
                    otherwise proceed with the next step.
                  </li>
                  <li>Copy paste them in a new draft email.</li>
                  <li>Add them to history by clicking the button below.</li>
                  <li>
                    Download the data, and keep them to generate the next
                    pairings.
                  </li>
                </ol>
              </Typography>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setPairings(createPairings(teams, peopleToTeam, history))
                  }
                >
                  Create the pairings
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!pairings || pairingInHistory}
                  onClick={() => {
                    updateState({ type: 'addHistory', data: pairings });
                    setChanged(true);
                  }}
                >
                  Add to history
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!changed}
                  onClick={downloadAction}
                >
                  Download the data
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              {pairings && (
                <HistoryContent
                  peopleToTeam={peopleToTeam}
                  history={[pairings]}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePairings;
