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
- [Konfiguracja bazy danych OracleDB](#konfiguracja-bazy-danych)

## Wymagania

- Node.js w wersji 16 lub nowszej
- npm lub yarn
- Baza danych Oracle DB

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
   rules: {"Rule"},
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

- `public/` - Statyczne pliki, takie jak favicon
  - `index.html` - Punkt wejścia aplikacji
- `src/` - Katalog z kodem źródłowym aplikacji
  - `components/` - Komponenty React
  - `pages/` - Strony aplikacji
  - `utils/` - Narzędzia pomocnicze
  - `index.tsx` - Punkt wejścia aplikacji (zawiera kod do uruchamiania React)
  - `Route1.tsx` - Przykładowa trasa aplikacji
- `tests/` - Testy
  - `playwright.config.ts` - Konfiguracja dla Playwright
- `package.json` - Zawiera informacje o projekcie i jego zależnościach
- `package-lock.json` - Lockfile dla npm
- `vite.config.ts` - Konfiguracja Vite
- `tsconfig.json` - Konfiguracja TypeScript
- `tsconfig.app.json` - Konfiguracja TypeScript dla aplikacji
- `tsconfig.node.json` - Konfiguracja TypeScript dla środowiska Node.js
- `server.js` - Skrypt serwera dla backendu (jeśli używany)
- `.gitignore` - Ignorowane pliki i katalogi przez Git
- `.eslintrc.cjs` - Konfiguracja ESLint w formacie CommonJS

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

## Konfiguracja bazy danych

1. Instalacja klienta Oracle DB:
   - Upewnij się, że masz zainstalowany klient Oracle DB. Możesz pobrać go z oficjalnej strony Oracle.
2. Konfiguracja połączenia:
   - Skonfiguruj połączenie z bazą danych w pliku konfiguracyjnym serwera. Przykład konfiguracji w pliku `server.js`:

```js
const oracledb = require("oracledb");

async function initDB() {
  try {
    await oracledb.createPool({
      user: "your_db_user",
      password: "your_db_password",
      connectString: "your_db_connect_string",
    });
    console.log("Connected to Oracle DB");
  } catch (err) {
    console.error("Error connecting to Oracle DB:", err);
  }
}

initDB();
```

Zamień `your_db_user`, `your_db_password` i `your_db_connect_string` na odpowiednie dane dostępu do Twojej bazy danych.

3. Tworzenie tabel i danych:

   - Uruchom skrypty SQL dostarczone z projektem, aby stworzyć wymagane tabele i dane w bazie danych. Skrypty SQL powinny znajdować się w katalogu projektu

4. Testowanie połączenia:
   - Sprawdź, czy połączenie z bazą danych działa poprawnie, uruchamiając aplikację i weryfikując, czy dane są poprawnie pobierane i zapisywane. W przypadku problemów z połączeniem, sprawdź konfigurację i upewnij się, że baza danych jest dostępna.
