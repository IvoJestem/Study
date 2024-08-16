# Wielodostępowa aplikacja internetowa do zarządzania transferami piłkarzy

Ten projekt jest przykładem aplikacji webowej zbudowanej przy użyciu React, TypeScript i Vite. Projekt korzysta z najnowszych technologii i narzędzi, aby zapewnić szybki rozwój i wydajność.

## Spis treści

- [Wymagania](#wymagania)
- [Instalacja](#instalacja)
- [Konfiguracja ESLint](#konfiguracja-eslint)
- [Struktura projektu](#struktura-projektu)
- [Przykładowe komponenty](#przykładowe-komponenty)
- [Uruchamianie aplikacji](#uruchamianie-aplikacji)
- [Użyte technologie](#użyte-technologie)

## Wymagania

- Node.js w wersji 16 lub nowszej
- npm lub yarn

## Instalacja

1. Klonuj repozytorium:

   ```bash
   git clone https://github.com/IvoJestem/Study.git
   ```

2. Przejdź do katalogu projektu:

   ```bash
   cd Study
   ```

3. Zainstaluj zależności:

   ```bash
   npm install
   # lub
   yarn install
   ```

## Konfiguracja ESLint

Projekt korzysta z ESLint do zapewnienia wysokiej jakości kodu. Oto podstawowa konfiguracja:

1. Plik `.eslintrc.js`:

   ```javascript
   module.exports = {
     parserOptions: {
       ecmaVersion: "latest",
       sourceType: "module",
       project: [
         "./tsconfig.json",
         "./tsconfig.node.json",
         "./tsconfig.app.json",
       ],
       tsconfigRootDir: __dirname,
     },
     extends: [
       "plugin:react/recommended",
       "plugin:@typescript-eslint/recommended",
       "plugin:@typescript-eslint/recommended-type-checked",
       "plugin:@typescript-eslint/strict-type-checked",
     ],
     plugins: ["react", "@typescript-eslint"],
     rules: {},
   };
   ```

2. Instalacja wymaganych pakietów:

   ```bash
   npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react
   # lub
   yarn add --dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react
   ```

## Struktura projektu

Projekt jest zorganizowany w następujący sposób:

- `src/` - Katalog z kodem źródłowym aplikacji
  - `components/` - Komponenty React
  - `pages/` - Strony aplikacji
  - `utils/` - Narzędzia pomocnicze
- `public/` - Statyczne pliki, takie jak favicon
- `index.html` - Punkt wejścia aplikacji
- `vite.config.ts` - Konfiguracja Vite
- `tsconfig.json` - Konfiguracja TypeScript
- `.eslintrc.js` - Konfiguracja ESLint

## Przykładowe komponenty

- **Komponent Rejestracji (`Register.tsx`)**: Ten komponent pozwala użytkownikom na rejestrację. Używa stanu lokalnego do przechowywania wartości formularza i obsługi błędów.
- **Komponent Logowania (`Login.tsx`)**: Komponent logowania weryfikuje dane logowania użytkownika i przekierowuje do strony głównej lub wyświetla błąd.
- **Tabela Zawodników (`PlayerTable.tsx`)**: Wyświetla listę zawodników w formie tabeli z możliwością sortowania.
- **Formularz Wyszukiwania (`SearchForm.tsx`)**: Umożliwia użytkownikom wyszukiwanie zawodników na podstawie różnych kryteriów.
- **Tabela Kart (`CardTable.tsx`)**: Prezentuje karty zawodników z możliwością sortowania według różnych właściwości.

## Uruchamianie aplikacji

Aby uruchomić aplikację w trybie deweloperskim, użyj:

```bash
npm run dev
# lub
yarn dev
```

Aby zbudować aplikację do produkcji, użyj:

```bash
npm run build
# lub
yarn build
```

## Użyte technologie

- **React** - Biblioteka do budowy interfejsów użytkownika.
- **TypeScript** - Język programowania wzbogacający JavaScript o typowanie statyczne.
- **Vite** - Szybki budowniczy dla aplikacji webowych.
- **ESLint** - Narzędzie do analizy kodu i utrzymania wysokiej jakości kodu.
