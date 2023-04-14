import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function groupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    const groups: string[] = storage ? JSON.parse(storage) : [];

    const sortedGroups = groups.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });


    return sortedGroups;
  } catch (error) {
    throw error;
  }
}
