import { createTranslator } from "next-intl";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import enMessages from "@/../messages/en.json";
import zhMessages from "@/../messages/zh.json";

type Translator = ReturnType<typeof createTranslator>;

export const languages = [
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
] as const;

const languagesMap = new Map(
  languages.map((data) => [data.name as string, data] as const),
);

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
