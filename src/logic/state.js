// Fed to useReducer, update the react state based on the action.
export const stateUpdater = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case 'addHistory':
      return {
        ...state,
        history: [data, ...state.history],
      };
    case 'toggleActive':
      const { name, teamId } = data;
      // FIXME: if more person updates are needed, it would be nice to have a
      // helper with a callback with the actions to make on the person.
      return {
        ...state,
        teams: {
          ...state.teams,
          [teamId]: {
            ...state.teams[teamId],
            people: state.teams[teamId].people.map((p) => {
              if (p.name === name) {
                p.active = !p.active;
              }
              return {
                ...p,
              };
            }),
          },
        },
      };
    default:
      throw new Error();
  }
};
