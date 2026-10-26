import { TerminalLine, TerminalSpan } from './terminal.model';

export const NIXOS_LOGO: readonly string[] = [
  "          ::::.    ':::::     ::::'",
  "          ':::::    ':::::.  ::::'",
  "            :::::     '::::.:::::",
  "      .......:::::..... ::::::::",
  "     ::::::::::::::::::. ::::::    ::::.",
  "    ::::::::::::::::::::: :::::.  .::::'",
  "           .....           ::::' :::::'",
  "          :::::            '::' :::::'",
  " ........:::::               ' :::::::::::.",
  ":::::::::::::                 :::::::::::::",
  " ::::::::::: ..              :::::",
  "     .::::: .:::            :::::",
  "    .:::::  :::::          '''''    .....",
  "    :::::   ':::::.  ......:::::::::::::'",
  "     :::     ::::::. ':::::::::::::::::'",
  "            .:::::::: '::::::::::",
  "           .::::''::::.     '::::.",
  "          .::::'   ::::.     '::::.",
  "         .::::      ::::      '::::."
];

export function buildScreenfetchLines(uptimeStr = '1d 11h 37m'): readonly TerminalLine[] {
  const rawInfo: readonly (readonly TerminalSpan[])[] = [
    [
      { text: 'igni', color: '#7ebae4', bold: true },
      { text: '@', color: 'var(--text-white)' },
      { text: 'desktop', color: '#7ebae4', bold: true }
    ],
    [{ text: 'OS: ', color: '#7ebae4', bold: true }, { text: 'NixOS 26.05.20261025.1f607aa (Yarara)' }],
    [{ text: 'Kernel: ', color: '#7ebae4', bold: true }, { text: 'x86_64 Linux 7.2.11' }],
    [{ text: 'Uptime: ', color: '#7ebae4', bold: true }, { text: uptimeStr }],
    [{ text: 'Packages: ', color: '#7ebae4', bold: true }, { text: '4188' }],
    [{ text: 'Shell: ', color: '#7ebae4', bold: true }, { text: 'fish 4.7.1' }],
    [{ text: 'Disk: ', color: '#7ebae4', bold: true }, { text: '2.2T / 3.4T (68%)' }],
    [{ text: 'CPU: ', color: '#7ebae4', bold: true }, { text: 'AMD Ryzen 9 9950X 16-Core @ 32x 5.75645GHz' }],
    [
      { text: 'GPU: ', color: '#7ebae4', bold: true },
      { text: 'AMD/ATI Navi 48 [Radeon RX 9070/9070 XT/9070 GRE], AMD/ATI Granite Ridge [Radeon Graphics]' }
    ],
    [{ text: 'RAM: ', color: '#7ebae4', bold: true }, { text: '18722MiB / 61884MiB' }]
  ];

  return NIXOS_LOGO.map((logo, i) => {
    const infoSpans = rawInfo[i];
    if (infoSpans) {
      return [{ text: logo.padEnd(46, ' '), color: '#7ebae4', bold: true }, ...infoSpans];
    }
    return [{ text: logo, color: '#7ebae4', bold: true }];
  });
}

export const NIXOS_OS_RELEASE = [
  'NAME=NixOS',
  'PRETTY_NAME="NixOS 26.05 (Yarara)"',
  'ID=nixos',
  'BUILD_ID="26.05.20261025.1f607aa"',
  'ANSI_COLOR="0;38;2;126;186;228"',
  'HOME_URL="https://nixos.org/"',
  'DOCUMENTATION_URL="https://nixos.org/learn.html"',
  'SUPPORT_URL="https://nixos.org/community.html"',
  'BUG_REPORT_URL="https://github.com/NixOS/nixpkgs/issues"',
  'LOGO="nix-snowflake"'
].join('\n');

export const BIO_TEXT = [
  '# IgnI — Frontend / Angular Developer (Middle / Middle+)',
  '',
  '* Specialization: Enterprise Angular 22 & TypeScript Architecture',
  '* Core: Signals-First State, Signal Forms, Zoneless Change Detection',
  '* Fullstack & Systems: NestJS, Drizzle ORM, Rust Axum, Pure Wayland protocols',
  '',
  'Telegram: @IVKLCD | GitHub: https://github.com/IVKLD'
].join('\n');

export const HELP_LINES: readonly TerminalLine[] = [
  [{ text: 'Isotope Terminal (NixOS Interactive Shell TTY)', bold: true, color: '#7ebae4' }],
  '',
  [{ text: 'ФАЙЛЫ И НАВИГАЦИЯ:', bold: true, color: 'var(--color-green)' }],
  '  pwd               Вывести текущую директорию',
  '  cd [path]         Сменить директорию (cd .., cd ~, cd projects, cd /etc)',
  '  ls [-la] | ll     Список файлов с подсветкой и правами',
  '  cat [file]        Просмотр файла (markdown, json, os-release)',
  '  tree [path]       Дерево файлов и папок',
  '  projects          Список проектов со стеком и описанием',
  '  blog              Список статей и публикаций',
  '',
  [{ text: 'СИСТЕМА И ТЕЛЕМЕТРИЯ:', bold: true, color: 'var(--color-green)' }],
  '  screenfetch       Инфо о системе с логотипом NixOS',
  '  neofetch          Инфо о системе (алиас screenfetch)',
  '  fastfetch         Быстрый аналог screenfetch',
  '  whoami            Текущий пользователь (igni)',
  '  id                UID и группы разработчика',
  '  uptime            Время работы сессии',
  '  uname [-a]        Строка ядра Linux',
  '  date              Текущее время UTC',
  '',
  [{ text: 'УТИЛИТЫ И GUI:', bold: true, color: 'var(--color-green)' }],
  '  open [name]       Открыть проект или статью в GUI',
  '  theme [name]      Сменить тему: dark, matrix, amber',
  '  history           История введенных команд',
  '  clear             Очистить терминал (Ctrl+L)',
  '  help | man [cmd]  Справка по командам',
  '  exit              Закрыть терминал и вернуться в GUI (Esc)'
];

export const BIN_COMMANDS: readonly string[] = [
  'blog',
  'cat',
  'cd',
  'clear',
  'date',
  'exit',
  'fastfetch',
  'help',
  'history',
  'id',
  'll',
  'ls',
  'man',
  'neofetch',
  'open',
  'projects',
  'pwd',
  'screenfetch',
  'theme',
  'tree',
  'uname',
  'uptime',
  'whoami'
];

