export type Language = {
  code: 'en' | 'ja' | 'es' | 'fr' | 'pt' | 'ko';
  name: string;
  hello: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', hello: 'Hello, World!' },
  { code: 'ja', name: 'Japanese', hello: 'こんにちは、世界！' },
  { code: 'es', name: 'Spanish', hello: '¡Hola, Mundo!' },
  { code: 'fr', name: 'French', hello: 'Bonjour, le monde !' },
  { code: 'pt', name: 'Portuguese', hello: 'Olá, Mundo!' },
  { code: 'ko', name: 'Korean', hello: '안녕하세요, 세계!' },
];

export const getLanguage = (code: string): Language | undefined => {
    return languages.find(lang => lang.code === code);
}
