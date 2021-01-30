import React from 'react';

import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const CreatePairings = ({ teams, peopleToTeam }) => {
  const classes = useStyles();
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
            <Grid item>
              <Button variant="contained" color="primary">
                Create the pairings
              </Button>
            </Grid>
            <Grid item>the pairings</Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Add to history
              </Button>
              <Button variant="contained" color="primary">
                Download the data
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePairings;
