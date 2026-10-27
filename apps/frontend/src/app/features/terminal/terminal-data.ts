import { TerminalLine } from './terminal.model';

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

export function buildScreenfetchLines(uptimeStr: string): readonly TerminalLine[] {
  const rawInfo: readonly [string, string][] = [
    ['User:', 'igni@desktop'],
    ['OS:', 'NixOS 26.05.20261025.1f607aa (Yarara)'],
    ['Kernel:', 'x86_64 Linux 7.2.11'],
    ['Uptime:', uptimeStr],
    ['Packages:', '4188'],
    ['Shell:', 'fish 4.7.1'],
    ['Disk:', '2.2T / 3.4T (68%)'],
    ['CPU:', 'AMD Ryzen 9 9950X 16-Core @ 32x 5.75645GHz'],
    ['GPU:', 'AMD/ATI Navi 48 [Radeon RX 9070/9070 XT/9070 GRE]'],
    ['RAM:', '18722MiB / 61884MiB']
  ];

  return NIXOS_LOGO.map((logo, i) => {
    const info = rawInfo[i];
    if (info) {
      return [
        { text: logo.padEnd(46, ' '), color: '#7ebae4', bold: true },
        { text: `${info[0]} `, color: '#7ebae4', bold: true },
        { text: info[1] }
      ];
    }
    return [{ text: logo, color: '#7ebae4', bold: true }];
  });
}

export function formatUptime(sessionStart: number): string {
  const totalMins = Math.floor((Date.now() - sessionStart) / 60000);
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return ` ${new Date().toTimeString().slice(0, 8)} up ${hrs} hours, ${mins} mins, 1 user, load average: 0.05, 0.03, 0.01`;
}

export function formatUptimeDuration(sessionStart: number): string {
  const totalMins = Math.floor((Date.now() - sessionStart) / 60000);
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return `${hrs}h ${mins}m`;
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

export const SKILLS_JSON = JSON.stringify(
  {
    engineer: 'IgnI',
    stack: ['Angular 22', 'Signals', 'Zoneless', 'NestJS', 'Rust', 'NixOS']
  },
  null,
  2
);

export const HELP_LINES: readonly TerminalLine[] = [
  [{ text: 'Isotope Terminal (NixOS Interactive Shell TTY)', bold: true, color: '#7ebae4' }],
  '',
  [{ text: 'ФАЙЛЫ И НАВИГАЦИЯ:', bold: true, color: 'var(--color-green)' }],
  '  pwd               Вывести текущую директорию',
  '  cd [path]         Сменить директорию (cd .., cd ~, cd projects, cd /etc)',
  '  ls [-la] | ll     Список файлов с подсветкой и правами',
  '  cat [file]        Просмотр файла (markdown, json, os-release)',
  '  tree [path]       Дерево файлов и папок',
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
  '  history           История введенных команд',
  '  clear             Очистить терминал (Ctrl+L)',
  '  help | man [cmd]  Справка по командам',
  '  exit              Закрыть терминал и вернуться в GUI (Esc)'
];

export const BIN_COMMANDS: readonly string[] = [
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
  'pwd',
  'screenfetch',
  'tree',
  'uname',
  'uptime',
  'whoami'
];
