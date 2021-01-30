import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Teams = ({ teams, updateState }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h2">Teams</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {Object.values(teams).map((team) => (
              <Grid item key={team.name} xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {team.name}
                    </Typography>
                    <List dense>
                      {team.people.map((p) => (
                        <ListItem
                          key={p.name}
                          role={undefined}
                          button
                          onClick={() =>
                            p.participate &&
                            updateState({
                              type: 'toggleActive',
                              data: { name: p.name, teamId: team.name },
                            })
                          }
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={p.active}
                              disabled={!p.participate}
                            />
                          </ListItemIcon>
                          <ListItemText primary={p.name} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
/*j
 */

export default Teams;
