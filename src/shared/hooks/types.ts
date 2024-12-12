// /utils/types.ts
export type Locale = 'en' | 'ru'; // Список поддерживаемых локалей
export type Namespace = 'intro'; // Пространства имен переводов

// Тип данных для каждого JSON-файла перевода
export type Translations = {
  [key: string]: string; // Ключ — строка, значение — строка
};

// Тип для всех переводов
export type TranslationData = Record<Namespace, Translations>;
