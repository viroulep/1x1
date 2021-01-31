import { Grid, Typography, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pairing: {
    padding: theme.spacing(2),
  },
}));

const stringForTeam = (t) => (t ? ` from team ${t}` : '');

const Pair = ({ map, a, b }) => (
  <div>
    {a}
    {stringForTeam(map[a])}, with {b}
    {stringForTeam(map[b])}
  </div>
);

const HistoryContent = ({ history, peopleToTeam }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {history.map(({ date, pairings, unpaired }) => (
        <Grid item key={date} xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Pairing on {new Date(date).toUTCString()}
          </Typography>
          <Paper variant="outlined" square className={classes.pairing}>
            <Typography variant="body2" component="div">
              {pairings.map(([a, b]) => (
                <Pair key={`${a}-${b}`} a={a} b={b} map={peopleToTeam} />
              ))}
              {unpaired.length > 0 && (
                <div>Not paired: {unpaired.join(', ')}</div>
              )}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default HistoryContent;
