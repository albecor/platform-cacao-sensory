import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

export const saveItem = async (key, value) => setItemAsync(key, value);

export const getItem = async key => getItemAsync(key);

export const deleteItem = async key => deleteItemAsync(key);
