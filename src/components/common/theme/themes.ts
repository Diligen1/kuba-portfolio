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
  { id: "base", name: "Lagoon", bg: "#00a19a", text: "#ffffff", second: "#2e282a", third: "#001524", onSecond: "#ffffff", onThird: "#ffffff" },
  { id: "red", name: "Crimson", bg: "#e3173a", text: "#fdfffc", second: "#011627", third: "#0f6e75", onSecond: "#fdfffc", onThird: "#fdfffc" },
  { id: "white", name: "Cobalt", bg: "#3772ff", text: "#080708", second: "#fdca40", third: "#ffc857", onSecond: "#080708", onThird: "#080708" },
  { id: "pink", name: "Noir", bg: "#1d1d1d", text: "#fdfffc", second: "#a3cef1", third: "#b45309", onSecond: "#1d1d1d", onThird: "#fdfffc" },
  { id: "matcha", name: "Matcha", bg: "#2d5a3d", text: "#f1f7ed", second: "#e9f5db", third: "#1b3a26", onSecond: "#0f2418", onThird: "#c9e265" },
  { id: "sunset", name: "Sunset", bg: "#ff6b35", text: "#1b0e2e", second: "#fff1d6", third: "#ffd23f", onSecond: "#1b0e2e", onThird: "#1b0e2e" },
  { id: "violet", name: "Ultraviolet", bg: "#7b5cff", text: "#ffffff", second: "#14102a", third: "#c2185b", onSecond: "#ffffff", onThird: "#ffffff" },
  { id: "paper", name: "Paper", bg: "#f4efe6", text: "#1a1a1a", second: "#d62839", third: "#f2c14e", onSecond: "#ffffff", onThird: "#1a1a1a" },
  { id: "arctic", name: "Arctic", bg: "#0e2a47", text: "#e8f1ff", second: "#9ad1ff", third: "#c2410c", onSecond: "#0e2a47", onThird: "#ffffff" },
  { id: "acid", name: "Acid", bg: "#121212", text: "#f2f2f2", second: "#c6ff3d", third: "#262626", onSecond: "#121212", onThird: "#c6ff3d" },
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
