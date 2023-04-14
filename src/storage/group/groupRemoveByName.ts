import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupsGetAll';

export async function groupRemoveByName(groupForDelete: string) {
  try {
    const storedGroups = await groupsGetAll();
    const filteredGroups = storedGroups.filter(
      (group) => group !== groupForDelete
    );

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify(filteredGroups)
    );
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupForDelete}`);
  } catch (error) {
    throw error;
  }
}
