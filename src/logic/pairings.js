// Return an int in [low, high[
const randomInt = (low, high) => Math.floor(Math.random() * (high - low) + low);

class DefaultMap extends Map {
  get(key) {
    if (!this.has(key)) super.set(key, this.default());
    return super.get(key);
  }

  constructor(defaultFunction, entries) {
    super(entries);
    this.default = defaultFunction;
  }
}

export const createPairings = (teams, peopleToTeam, history) => {
  const candidates = [];
  const newCandidatesPerPerson = new Map();
  const historyPerPerson = new DefaultMap(() => new Set());

  // Gather candidates to mix and match
  Object.values(teams).forEach(({ people }) => {
    people.forEach(({ name, active }) => {
      if (active) {
        candidates.push(name);
      }
    });
  });

  // Build history per person
  history.forEach(({ pairings }) => {
    pairings.forEach(([a, b]) => {
      historyPerPerson.get(a).add(b);
      historyPerPerson.get(b).add(a);
    });
  });

  // Compute legal *new* candidates per person
  // This is a bit expensive as we will maintain this as we create pairs,
  // however this is a fairly straightforward way of figuring out who has the
  // most constraints and making sure we don't end up with multiple people
  // of the same team unassigned.
  candidates.forEach((name) => {
    newCandidatesPerPerson.set(
      name,
      new Set(
        [...candidates].filter((c) => {
          return (
            !historyPerPerson.get(name).has(c) &&
            !teams[peopleToTeam[name]].peopleSet.has(c)
          );
        })
      )
    );
  });

  const pairings = [];
  const unpaired = [];
  const markCandidate = (c) => {
    for (const persons of newCandidatesPerPerson.values()) {
      persons.delete(c);
    }
  };

  while (candidates.length !== 0) {
    // Sort candidates by available candidates, lowest first.
    // Do it each time, because new pairs affect the sort!
    candidates.sort((a, b) => {
      // If one of them has size 0, we should actually reverse the value:
      // we want people without new candidates to be handled last, as this
      // means they have a softer constraint.
      const sizeA = newCandidatesPerPerson.get(a).size;
      const sizeB = newCandidatesPerPerson.get(b).size;
      let diff = sizeA - sizeB;
      if (!sizeA || !sizeB) diff = -diff;
      return diff;
    });

    const currentCandidate = candidates.shift();

    // Remove current candidate from potential candidates for everyone.
    markCandidate(currentCandidate);

    // Compute potential matches: take new candidates if any, otherwise
    // fallback to any candidates not in the same team.
    const potentialMatches = newCandidatesPerPerson.get(currentCandidate).size
      ? [...newCandidatesPerPerson.get(currentCandidate)]
      : candidates.filter((c) => historyPerPerson.get(currentCandidate).has(c));

    if (potentialMatches.length === 0) {
      // Damn, just give up :(
      unpaired.push(currentCandidate);
      continue;
    }

    // Pick a random potential match, create the pair, and perform some cleanup
    // before going to next candidate.
    const match = potentialMatches[randomInt(0, potentialMatches.length)];
    markCandidate(match);
    pairings.push([currentCandidate, match]);
    candidates.splice(candidates.indexOf(match), 1);
  }

  return {
    date: new Date().toJSON(),
    pairings,
    unpaired,
  };
};
