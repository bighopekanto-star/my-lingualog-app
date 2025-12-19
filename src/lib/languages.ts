export type LanguageCode = 'en' | 'ja' | 'es' | 'fr' | 'pt' | 'ko' | 'de';

export type Language = {
  code: LanguageCode;
  name: string;
};

// Full list for post generation, but UI will only toggle between en and ja
export const allLanguages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'ja', name: 'Japanese' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ko', name: 'Korean' },
  { code: 'de', name: 'German' },
];

export const getLanguageInfo = (code: string): Language | undefined => {
    return allLanguages.find(lang => lang.code === code);
}
