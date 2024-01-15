import { defineStore } from 'pinia';
import { store } from '@/store';
import { localeSetting, SizeType } from '@/settings/localeSetting';

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

interface AppState {
  size: SizeType;
  language: string;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      size: localeSetting.size,
      language: localeSetting.language,
    };
  },
  getters: {
    getLocal(): any {
      return this.language === 'en' ? en : zhCn;
    },
  },
  actions: {
    setLanguage(info: string) {
      this.language = info;
    },
  },
  persist: {
    key: 'app',
    // 存储在localstorage还是sessionStorage中
    storage: localStorage,
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
