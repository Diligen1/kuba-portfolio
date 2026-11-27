export type Theme = {
  id: string;
  name: string;
  bg: string;
  text: string;
  second: string;
  third: string;
  onSecond: string;
  onThird: string;
};

// Порядок = порядок переключения по клику на лого "CK".
export const THEMES: Theme[] = [
  { id: "base", name: "Lagoon", bg: "#3a7671", text: "#f7f5ef", second: "#d7e6e1", third: "#2a5a56", onSecond: "#1f3b3a", onThird: "#f7f5ef" },
  { id: "sage", name: "Sage", bg: "#c9d3c0", text: "#2b3328", second: "#4f5e4a", third: "#b3c1a8", onSecond: "#f1f4ec", onThird: "#2b3328" },
  { id: "rose", name: "Dusty Rose", bg: "#dcbfba", text: "#3b2a2c", second: "#6e4b50", third: "#cba6a1", onSecond: "#f6ece9", onThird: "#3b2a2c" },
  { id: "sand", name: "Sand", bg: "#e6d9c3", text: "#3d3427", second: "#75624a", third: "#d5c4a6", onSecond: "#f8f2e8", onThird: "#3d3427" },
  { id: "fog", name: "Fog", bg: "#d6dce1", text: "#2c3640", second: "#56636f", third: "#bfc8d0", onSecond: "#f2f5f7", onThird: "#2c3640" },
  { id: "lavender", name: "Lavender", bg: "#d3cbe2", text: "#342e45", second: "#5f577a", third: "#bcb1d3", onSecond: "#f3f0f8", onThird: "#342e45" },
  { id: "mint", name: "Mint", bg: "#d0e6db", text: "#24413a", second: "#4a7366", third: "#b4d5c6", onSecond: "#f1f8f4", onThird: "#24413a" },
  { id: "twilight", name: "Twilight", bg: "#2f3a52", text: "#e4e7ef", second: "#c4cbe0", third: "#3f4b67", onSecond: "#2a3349", onThird: "#e4e7ef" },
  { id: "mocha", name: "Mocha", bg: "#5e4b3f", text: "#f3ebe2", second: "#e6d9c9", third: "#4c3c32", onSecond: "#45362d", onThird: "#f3ebe2" },
  { id: "graphite", name: "Graphite", bg: "#36383c", text: "#e6e4df", second: "#d3cfc6", third: "#46494f", onSecond: "#33353a", onThird: "#e6e4df" },
];

export const STORAGE_KEY = "ck-theme";

// Скрипт до отрисовки: применяет сохранённую тему без мигания.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var ok=${JSON.stringify(
  THEMES.map((t) => t.id)
)};if(t&&ok.indexOf(t)>-1){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;

export function themeCss(): string {
  return THEMES.map(
    (t) =>
      `${t.id === "base" ? ':root,[data-theme="base"]' : `[data-theme="${t.id}"]`}{--background-color:${t.bg};--text-color:${t.text};--second-color:${t.second};--third-color:${t.third};--on-second:${t.onSecond};--on-third:${t.onThird};}`
  ).join("\n");
}
