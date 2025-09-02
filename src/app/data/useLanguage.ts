import { createTranslator } from "next-intl";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import enMessages from "@/../messages/en.json";
import zhMessages from "@/../messages/zh.json";

type Translator = ReturnType<typeof createTranslator>;

interface LanguageInfo {
  name: string;
  display: string;
  translator: Translator;
}

export const languages: LanguageInfo[] = [
  {
    name: "zh",
    display: "中文",
    translator: createTranslator({ locale: "zh", messages: zhMessages }),
  },
  {
    name: "en",
    display: "English",
    translator: createTranslator({ locale: "en", messages: enMessages }),
  },
];

const languagesMap = new Map(languages.map((data) => [data.name, data]));

interface LanguageState {
  language: string;
  setLanguage: (input: string) => void;
  getDisplay: () => string;
  getTranslator: () => Translator;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: languages[0].name,
      setLanguage: (input: string) => {
        set({ language: input });
      },
      getDisplay: () => {
        const language = get().language;
        const info = languagesMap.get(language);
        return info ? info.display : "";
      },
      getTranslator: () => {
        const language = get().language;
        const info = languagesMap.get(language);
        return info ? info.translator : languages[0].translator;
      },
    }),
    {
      name: "language", // unique name
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
