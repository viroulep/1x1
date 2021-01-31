export const loadStateFromJson = (json) => {
  const state = {
    ...json,
  };
  // Compute it now, will be useful later.
  const peopleToTeam = {};

  // The rest is pretty much a direct match, we just want to add the "active"
  // state to all people.
  Object.entries(state.teams).forEach((entry) => {
    const [, team] = entry;
    team.people.forEach((p) => {
      p.active = p.participate;
      peopleToTeam[p.name] = team.name;
    });
    team.peopleSet = new Set(team.people.map(({ name }) => name));
  });
  state.peopleToTeam = peopleToTeam;
  return state;
};

export const jsonFromState = (state) => {
  const cleanedUp = {
    teams: {},
    history: state.history,
  };
  for (const [id, { name, people }] of Object.entries(state.teams)) {
    cleanedUp.teams[id] = {
      name,
      people: people.map(({ name, participate }) => ({ name, participate })),
    };
  }
  return cleanedUp;
};
