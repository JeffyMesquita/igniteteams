import { playersGetByGroup } from './playersGetByGroup';

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playersGetByGroup(group);

    const playerByTeam = storage.filter((player) => player.team === team);

    const sortedPlayers = playerByTeam.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    return sortedPlayers;
  } catch (error) {
    throw error;
  }
}
