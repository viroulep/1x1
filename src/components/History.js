import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HistoryContent from './HistoryContent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  pairing: {
    padding: theme.spacing(2),
  },
}));

const History = ({ history, peopleToTeam }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h2">History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HistoryContent history={history} peopleToTeam={peopleToTeam} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default History;
