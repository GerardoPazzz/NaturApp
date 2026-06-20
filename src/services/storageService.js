import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER_NAME: 'user_name',
  USER_EMAIL: 'user_email',
  LAST_CATEGORY: 'last_category',
  DARK_THEME: 'dark_theme',
  NOTIFICATIONS: 'notifications_enabled',
};

const StorageService = {
  async saveToken(token) {
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  async getToken() {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  async removeToken() {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  async saveUserProfile(name, email) {
    if (name) await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, name);
    if (email) await AsyncStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
  },

  async getUserProfile() {
    const name = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME);
    const email = await AsyncStorage.getItem(STORAGE_KEYS.USER_EMAIL);
    return { name, email };
  },

  async clearUserProfile() {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_NAME);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
  },

  async saveLastCategory(category) {
    if (category && category !== 'todos') {
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_CATEGORY, category);
    }
  },

  async getLastCategory() {
    return await AsyncStorage.getItem(STORAGE_KEYS.LAST_CATEGORY);
  },

  async setDarkTheme(value) {
    await AsyncStorage.setItem(STORAGE_KEYS.DARK_THEME, JSON.stringify(value));
  },

  async isDarkTheme() {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.DARK_THEME);
    return val ? JSON.parse(val) : false;
  },

  async setNotifications(value) {
    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(value));
  },

  async getNotifications() {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return val ? JSON.parse(val) : true;
  },
};

export default StorageService;
