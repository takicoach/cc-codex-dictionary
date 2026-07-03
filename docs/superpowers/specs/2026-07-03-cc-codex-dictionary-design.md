# Claude Code & Codex 辞典・講座サイト 設計書

日付: 2026-07-03 / 承認: ユーザー離席のため自律判断で推奨案を採用（後から変更可能）

## 目的
https://claude-code-dictionary.pages.dev/ を参考に、Claude Code と Codex CLI の
使い方を「辞書（引く）」と「講座（学ぶ）」の2本立てで提供する日本語サイト。
UI は Downloads の design handoff（Soft Cards 案）を忠実に再現する。

## 構成
- 技術: ビルド不要の静的サイト（HTML + CSS + Vanilla JS）。DB・API なし。
- 配置: `~/Projects/cc-codex-dictionary/`
- 将来のデプロイ: Cloudflare Pages / Vercel などにフォルダごと置くだけで公開可能。

## ページ
1. `index.html` — 辞書トップ。Claude / Codex のプロダクト切替ピル、検索バー、
   カテゴリチップ、カードグリッド。デザインハンドオフのトークンを完全再現。
2. `course.html` — 講座ページ。`?p=claude|codex` でプロダクト切替。
   章立てステップ式（インストール → 初期化 → 基本操作 → 設定 → 拡張）。
   サイドバー目次 + 本文カード + コードブロック。

## データ
- `assets/data.js` — 辞書エントリ（claude: 24件前後 / codex: 16件前後）と
  講座の章データを JS 配列で保持。追記はこのファイル編集のみで完結。

## デザイントークン
ハンドオフ README のとおり（--bg #faf9f5 系ライト / #262421 系ダーク、
accent #c15f3c、Zen Kaku Gothic New + JetBrains Mono、カード radius 16px、
ホバー浮き上がり 0.18s ease、カテゴリドット oklch）。

## 状態
- `dark`（localStorage 永続化）/ `product`（claude|codex）/ `cat` / `q`
- フィルタは name+role+desc+cat の部分一致 AND カテゴリ。

## テスト
- ブラウザで開いて検索・カテゴリ・テーマ切替・プロダクト切替・講座遷移を目視確認。
