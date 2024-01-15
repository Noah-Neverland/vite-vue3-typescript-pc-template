export type LocaleType = 'zh-cn' | 'en' | 'ru' | 'ja' | 'ko';
export type SizeType = '' | 'default' | 'small' | 'large';

interface LocaleSetting {
  // Current language
  language: LocaleType;
  // element-plus size
  size: SizeType;
}

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh-cn',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  // Locale
  language: LOCALE.ZH_CN,
  size: 'default',
};
