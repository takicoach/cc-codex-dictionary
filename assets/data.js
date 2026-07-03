// 辞書エントリと講座データ。追記・修正はこのファイルだけでOK。
// cat は CATS のラベルと一致させること。

const CATS = ["すべて", "はじめ方", "基本操作", "設定", "ファイル", "連携・自動化", "コマンド"];

const CAT_COLORS = {
  "はじめ方": "oklch(0.68 0.11 45)",
  "基本操作": "oklch(0.66 0.09 155)",
  "設定": "oklch(0.66 0.09 250)",
  "ファイル": "oklch(0.70 0.10 85)",
  "連携・自動化": "oklch(0.64 0.10 305)",
  "コマンド": "oklch(0.64 0.12 25)",
};

const ENTRIES = {
  claude: [
    { name: "claude", cat: "はじめ方", kind: "CLI", role: "対話セッションを開始", desc: "ターミナルでClaude Codeを起動し、対話を始める基本コマンド。", ex: "$ claude" },
    { name: "claude -c", cat: "はじめ方", kind: "CLI", role: "前回の続きから再開", desc: "直前のセッションの文脈を引き継いで会話を続ける。-r で過去一覧から選択も可能。", ex: "$ claude -c" },
    { name: "/init", cat: "はじめ方", kind: "cmd", role: "プロジェクトを初期化", desc: "リポジトリを解析し、CLAUDE.md を自動生成する。", ex: "> /init" },
    { name: "/help", cat: "はじめ方", kind: "cmd", role: "ヘルプを表示", desc: "使えるコマンドやショートカットの一覧を確認できる。迷ったらまずこれ。", ex: "> /help" },
    { name: "CLAUDE.md", cat: "ファイル", kind: ".md", role: "プロジェクトの記憶", desc: "規約・構成・作法をClaudeへ伝える文脈ファイル。プロジェクト直下に配置。", ex: "./CLAUDE.md" },
    { name: "~/.claude/CLAUDE.md", cat: "ファイル", kind: ".md", role: "全プロジェクト共通の指示", desc: "どのプロジェクトでも読み込まれる個人用のグローバル指示ファイル。", ex: "~/.claude/CLAUDE.md" },
    { name: "settings.json", cat: "設定", kind: "json", role: "権限と環境の定義", desc: "許可コマンド・モデル・環境変数を .claude/ 配下で管理。", ex: ".claude/settings.json" },
    { name: "settings.local.json", cat: "設定", kind: "json", role: "個人ローカル設定", desc: "gitに含めない個人用設定。チーム共有のsettings.jsonを上書きできる。", ex: ".claude/settings.local.json" },
    { name: "commands/", cat: "コマンド", kind: "dir", role: "カスタムコマンド", desc: "Markdownを置くだけで独自のスラッシュコマンドを追加。", ex: ".claude/commands/" },
    { name: "/clear", cat: "基本操作", kind: "cmd", role: "会話履歴をリセット", desc: "現在の文脈をクリアし、まっさらな状態から再開する。", ex: "> /clear" },
    { name: "/compact", cat: "基本操作", kind: "cmd", role: "文脈を圧縮", desc: "長い履歴を要約し、トークンを節約しながら続行する。", ex: "> /compact" },
    { name: "/model", cat: "設定", kind: "cmd", role: "モデルを切替", desc: "タスクに応じて使用するモデル（Opus / Sonnet / Haiku 等）を選択する。", ex: "> /model" },
    { name: "/config", cat: "設定", kind: "cmd", role: "設定画面を開く", desc: "テーマ・通知・モデルなどの設定を対話画面で変更できる。", ex: "> /config" },
    { name: "Plan Mode", cat: "基本操作", kind: "ext", role: "計画してから実行", desc: "Shift+Tabで権限モードを循環切替。コード変更前に計画を提示させ、承認してから実行する安全な進め方。", ex: "Shift+Tab → plan" },
    { name: "claude -r / /resume", cat: "基本操作", kind: "cmd", role: "過去セッションを再開", desc: "過去のセッション一覧から選んで会話を再開する。-c は直前、-r は一覧から選択。", ex: "$ claude -r" },
    { name: "Esc / Esc×2", cat: "基本操作", kind: "key", role: "中断と巻き戻し", desc: "Escで作業を中断、Esc2回で過去のメッセージに戻ってやり直せる。", ex: "Esc Esc" },
    { name: "/review", cat: "コマンド", kind: "cmd", role: "PRをレビュー", desc: "GitHubのプルリクエストを指定してコードレビューを実行する。", ex: "> /review 123" },
    { name: "/memory", cat: "基本操作", kind: "cmd", role: "記憶ファイルを編集", desc: "CLAUDE.mdなどの記憶ファイルをその場で開いて編集する。#で素早く追記も。", ex: "> /memory" },
    { name: ".mcp.json", cat: "連携・自動化", kind: "json", role: "外部ツール接続", desc: "MCPサーバーとの連携を宣言し、能力を拡張する。", ex: "./.mcp.json" },
    { name: "Skills", cat: "連携・自動化", kind: "ext", role: "再利用スキル", desc: "手順やナレッジをスキルとして与え、作業を定型化。SKILL.mdを置くだけ。", ex: ".claude/skills/*" },
    { name: "Subagents", cat: "連携・自動化", kind: "ext", role: "タスクの委任", desc: "専門のサブエージェントに調査や実装を分担させる。並列実行も可能。", ex: ".claude/agents/*" },
    { name: "Hooks", cat: "連携・自動化", kind: "ext", role: "イベント自動実行", desc: "ツール実行前後などのイベント発火時に任意コマンドを自動で走らせる。", ex: "hooks: {}" },
    { name: "claude -p", cat: "連携・自動化", kind: "CLI", role: "ワンショット実行", desc: "対話せずに1回だけ指示を実行して結果を出力。シェルスクリプトへの組み込みに。", ex: "$ claude -p \"テスト実行して\"" },
    { name: "/permissions", cat: "設定", kind: "cmd", role: "許可ルールを管理", desc: "どのコマンドを確認なしで実行してよいかを一覧・編集する。", ex: "> /permissions" },
    { name: "/usage", cat: "設定", kind: "cmd", role: "利用量を確認", desc: "現在のセッションで使ったトークン量・コストを確認する（/cost はこの別名）。", ex: "> /usage" },
  ],
  codex: [
    { name: "codex", cat: "はじめ方", kind: "CLI", role: "対話セッションを開始", desc: "ターミナルでCodex CLIを起動し、対話を始める基本コマンド。", ex: "$ codex" },
    { name: "npm i -g @openai/codex", cat: "はじめ方", kind: "CLI", role: "インストール", desc: "npm または brew install --cask codex で導入。公式インストールスクリプトも利用可。", ex: "$ npm install -g @openai/codex" },
    { name: "codex resume", cat: "はじめ方", kind: "CLI", role: "セッションを再開", desc: "過去のセッション一覧から選んで続きを再開する。--last で直前を即再開。", ex: "$ codex resume --last" },
    { name: "AGENTS.md", cat: "ファイル", kind: ".md", role: "プロジェクトの記憶", desc: "規約・構成・作法をCodexへ伝える文脈ファイル。Claude CodeのCLAUDE.mdに相当。", ex: "./AGENTS.md" },
    { name: "config.toml", cat: "設定", kind: "toml", role: "全体設定", desc: "モデル・承認モード・MCPなどを ~/.codex/config.toml で管理する。", ex: "~/.codex/config.toml" },
    { name: "/model", cat: "設定", kind: "cmd", role: "モデルと推論強度を切替", desc: "使用モデルとreasoning effort（low/medium/high）をセッション中に変更する。", ex: "> /model" },
    { name: "/permissions", cat: "設定", kind: "cmd", role: "承認モードを切替", desc: "Read Only / Auto / Full Access を切り替え、Codexがどこまで自動で動けるかを決める。既定はAuto。", ex: "> /permissions" },
    { name: "codex exec", cat: "連携・自動化", kind: "CLI", role: "非対話で実行", desc: "対話なしで指示を実行して終了する自動化向けモード。CIやスクリプトに組み込める。", ex: "$ codex exec \"lintを直して\"" },
    { name: "codex exec review", cat: "連携・自動化", kind: "CLI", role: "コードレビュー実行", desc: "差分やブランチを対象に自動コードレビュー。--base や --uncommitted で対象を指定する。", ex: "$ codex exec review --base main" },
    { name: "/review", cat: "コマンド", kind: "cmd", role: "変更をレビュー", desc: "現在の差分をレビューさせる。コミット前のセルフチェックに便利。", ex: "> /review" },
    { name: "/init", cat: "はじめ方", kind: "cmd", role: "AGENTS.mdを生成", desc: "リポジトリを解析してAGENTS.mdの雛形を自動生成する。", ex: "> /init" },
    { name: "/compact", cat: "基本操作", kind: "cmd", role: "文脈を圧縮", desc: "長い履歴を要約してトークンを節約しながら続行する。", ex: "> /compact" },
    { name: "/new", cat: "基本操作", kind: "cmd", role: "新しい会話を開始", desc: "文脈をリセットして新しいセッションを始める。", ex: "> /new" },
    { name: "/diff", cat: "基本操作", kind: "cmd", role: "変更差分を表示", desc: "Codexが加えた変更をgit diff形式で確認する。", ex: "> /diff" },
    { name: "Skills", cat: "連携・自動化", kind: "ext", role: "再利用スキル", desc: "~/.codex/skills/ に手順を登録して作業を定型化。旧カスタムプロンプトの後継。/skills で確認。", ex: "~/.codex/skills/*" },
    { name: "prompts/", cat: "コマンド", kind: "dir", role: "カスタムプロンプト（非推奨）", desc: "~/.codex/prompts/ のMarkdownをスラッシュコマンド化。現在は非推奨で、後継はSkills。", ex: "~/.codex/prompts/" },
    { name: "mcp_servers", cat: "連携・自動化", kind: "toml", role: "MCPサーバー接続", desc: "config.tomlにMCPサーバーを宣言して外部ツール連携を追加。codex mcp add でも登録可。", ex: "[mcp_servers.playwright]" },
    { name: "codex mcp add", cat: "連携・自動化", kind: "CLI", role: "MCPをコマンドで追加", desc: "config.tomlを直接編集せずにMCPサーバーを追加・一覧管理できる。", ex: "$ codex mcp add playwright -- npx @playwright/mcp@latest" },
    { name: "/status", cat: "設定", kind: "cmd", role: "状態を確認", desc: "現在のモデル・承認モード・セッション状態を確認する。/usage でトークン使用量も見られる。", ex: "> /status" },
  ],
};

const PRODUCT_META = {
  claude: {
    label: "Claude Code",
    title: "Claude Code 辞典",
    lead: "はじめ方・設定・ファイル構成・連携まで、日本語でひける実用図鑑。",
  },
  codex: {
    label: "Codex",
    title: "Codex CLI 辞典",
    lead: "OpenAI Codex CLI のコマンド・設定・自動化を日本語でひける実用図鑑。",
  },
};

// ---- 講座データ ----
const COURSES = {
  claude: {
    title: "はじめての Claude Code 講座",
    lead: "インストールから拡張機能まで、非エンジニアでも順番に進めれば使えるようになるステップ式講座。",
    chapters: [
      {
        title: "インストールと起動",
        lead: "まずは Claude Code を手元のパソコンに入れて、最初の一言を投げるところまで。",
        steps: [
          { h: "インストールする", p: "ターミナル（Macなら「ターミナル.app」）を開いて、公式のインストールスクリプトを実行します（Homebrew の場合は brew install --cask claude-code）。", code: "curl -fsSL https://claude.ai/install.sh | bash" },
          { h: "起動してログインする", p: "作業したいプロジェクトのフォルダに移動してから起動します。初回はブラウザが開いてログインを求められます。", code: "cd ~/Projects/my-app\nclaude" },
          { h: "最初の質問をしてみる", p: "起動したら日本語でそのまま話しかけられます。まずはプロジェクトについて聞いてみましょう。", code: "> このプロジェクトは何をするアプリ？構成を教えて", tip: "<b>ポイント:</b> Claude Code は「どのフォルダで起動したか」が重要。作業対象のプロジェクト直下で起動するのが基本です。" },
        ],
      },
      {
        title: "プロジェクトの初期化と CLAUDE.md",
        lead: "Claude にプロジェクトの「前提知識」を持たせると、回答の精度が大きく上がります。",
        steps: [
          { h: "/init で CLAUDE.md を作る", p: "リポジトリを解析して、プロジェクトの説明書（CLAUDE.md）を自動生成してくれます。", code: "> /init" },
          { h: "ルールを追記する", p: "「テストは必ず実行して」「日本語で応答して」など、毎回伝えたいことを CLAUDE.md に書いておくと、以後自動で守ってくれます。", code: "# CLAUDE.md の例\n- 日本語で応答すること\n- コミット前に npm test を実行すること", tip: "<b>ポイント:</b> 会話中に「これをCLAUDE.mdに追記して」と頼めばその場で記憶させられます。/memory で直接編集も可能です。" },
        ],
      },
      {
        title: "基本操作を身につける",
        lead: "日々の作業で最もよく使う操作。この章だけで普段使いには十分です。",
        steps: [
          { h: "Plan Mode で安全に進める", p: "Shift+Tab で権限モード（通常 / 自動編集 / Plan Mode など）が切り替わります。Plan Mode ではコードを変更する前に計画を見せてくれるので、大きな変更ほどおすすめです。", code: "Shift+Tab → 「決済機能を追加したい」→ 計画を確認 → 承認" },
          { h: "会話をリセット・圧縮する", p: "話題が変わったら /clear、長くなってきたら /compact。文脈を整理するとClaude の精度と速度が保てます。", code: "> /clear     # まっさらにする\n> /compact   # 要約して続ける" },
          { h: "中断とやり直し", p: "暴走したと感じたら Esc で即中断。Esc を2回押すと過去の発言に戻ってやり直せます。", code: "Esc      # 中断\nEsc Esc  # 巻き戻してやり直し", tip: "<b>ポイント:</b> 失敗を恐れなくてOK。git と組み合わせれば変更はいつでも戻せます。「今の変更を取り消して」と頼むこともできます。" },
        ],
      },
      {
        title: "設定と権限",
        lead: "毎回の確認ダイアログを減らしつつ、危険な操作だけは止める。快適さと安全のバランスを設定しましょう。",
        steps: [
          { h: "許可ルールを設定する", p: "/permissions で「確認なしで実行してよいコマンド」を管理できます。よく使う安全なコマンドを許可しておくと作業が速くなります。", code: "> /permissions" },
          { h: "モデルを切り替える", p: "軽い作業は速いモデル、難しい設計は賢いモデル、と使い分けられます。", code: "> /model" },
          { h: "設定ファイルの場所を知る", p: "チーム共有の設定は .claude/settings.json、自分だけの設定は settings.local.json に書きます。", code: ".claude/settings.json        # チーム共有（git管理）\n.claude/settings.local.json  # 自分専用（git対象外）" },
        ],
      },
      {
        title: "拡張: スキル・サブエージェント・MCP",
        lead: "Claude Code の真価は拡張にあります。よく使う手順を「部品」として登録していきましょう。",
        steps: [
          { h: "カスタムコマンドを作る", p: ".claude/commands/ にMarkdownファイルを置くだけで、/ファイル名 で呼び出せる自分専用コマンドになります。", code: "# .claude/commands/weekly.md\n今週のコミットを要約してレポートを作成して" },
          { h: "スキルで手順を定型化する", p: "SKILL.md に手順書を書いておくと、Claude が必要な場面で自動的に参照します。「毎回同じ説明をしている」作業はスキル化のサインです。", code: ".claude/skills/my-skill/SKILL.md" },
          { h: "MCP で外部ツールとつなぐ", p: ".mcp.json にMCPサーバーを登録すると、ブラウザ操作・DB・各種SaaSなど外部ツールを Claude が直接操作できるようになります。", code: "> claude mcp add playwright -- npx @playwright/mcp@latest", tip: "<b>次のステップ:</b> 辞書ページで「連携・自動化」カテゴリを眺めると、拡張機能の全体像がつかめます。" },
        ],
      },
    ],
  },
  codex: {
    title: "はじめての Codex CLI 講座",
    lead: "OpenAI の Codex CLI をゼロから。インストール、AGENTS.md、承認モード、自動化まで順番に学べます。",
    chapters: [
      {
        title: "インストールと起動",
        lead: "Codex CLI を導入して最初の対話を始めます。",
        steps: [
          { h: "インストールする", p: "npm または Homebrew でインストールします。", code: "npm install -g @openai/codex\n# または\nbrew install codex" },
          { h: "起動してサインインする", p: "プロジェクトフォルダで起動し、初回は ChatGPT アカウント（または API キー）でサインインします。", code: "cd ~/Projects/my-app\ncodex" },
          { h: "話しかけてみる", p: "日本語でそのまま指示できます。", code: "> このリポジトリの構成を説明して" },
        ],
      },
      {
        title: "AGENTS.md でプロジェクトを教える",
        lead: "Claude Code の CLAUDE.md にあたるのが AGENTS.md。プロジェクトの前提を書いておきます。",
        steps: [
          { h: "/init で自動生成する", p: "リポジトリを解析して AGENTS.md の雛形を作ってくれます。", code: "> /init" },
          { h: "ルールを書き足す", p: "コーディング規約やテストコマンドなど、毎回守ってほしいことを追記します。", code: "# AGENTS.md の例\n- 日本語で応答すること\n- 変更後は npm test を実行すること", tip: "<b>ポイント:</b> CLAUDE.md と AGENTS.md の両方を用意すれば、同じプロジェクトを Claude Code と Codex の両方で扱えます。" },
        ],
      },
      {
        title: "承認モードを理解する",
        lead: "Codex がどこまで自動で動けるかは承認モードで決まります。安全に使う鍵になる章です。",
        steps: [
          { h: "3つのモード", p: "Read Only（読むだけ）/ Auto（作業フォルダ内は自動、外は確認）/ Full Access（全部自動）。既定は Auto で、普段もこれがバランス良好です。", code: "> /permissions" },
          { h: "モデルと推論強度を選ぶ", p: "/model でモデルと reasoning effort（low / medium / high）を切り替えられます。難しいタスクほど high に。", code: "> /model" },
          { h: "変更を確認する", p: "Codex が何を変えたかは /diff でいつでも確認できます。", code: "> /diff" },
        ],
      },
      {
        title: "自動化: codex exec",
        lead: "対話せずに1発実行する codex exec は、スクリプトや CI への組み込みに最適です。",
        steps: [
          { h: "ワンショットで実行する", p: "指示を渡すと非対話で実行して終了します。", code: "codex exec \"lintエラーを全部直して\"" },
          { h: "コードレビューを自動化する", p: "ブランチの差分をレビューさせられます。コミット前の習慣にすると品質が安定します。", code: "codex exec review --base main" },
          { h: "セッションを再開する", p: "続きから作業したいときは resume。", code: "codex resume --last" },
        ],
      },
      {
        title: "拡張: スキルと MCP",
        lead: "よく使う指示の登録と、外部ツール連携で Codex を育てます。",
        steps: [
          { h: "スキルを登録する", p: "~/.codex/skills/ に手順書を置くと再利用できます（/skills で一覧確認）。旧来の ~/.codex/prompts/ のカスタムプロンプトは非推奨になり、スキルが後継です。", code: "~/.codex/skills/review-jp/SKILL.md" },
          { h: "MCP サーバーをつなぐ", p: "config.toml に宣言すると外部ツールを操作できます。", code: "# ~/.codex/config.toml\n[mcp_servers.playwright]\ncommand = \"npx\"\nargs = [\"@playwright/mcp@latest\"]", tip: "<b>使い分けの目安:</b> 実装の主担当は Claude Code、セカンドオピニオンのレビュー役に Codex、という併用が相性抜群です。" },
        ],
      },
    ],
  },
};
