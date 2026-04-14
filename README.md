# YouTubeコンテメーカー

ブラウザでそのまま開ける、旅Vlog向けの戦略コンテ作成アプリです。スマホ表示に合わせてレイアウトが変わり、Web公開するとPWAとしてホーム画面追加できます。

## 使い方

1. `index.html` をブラウザで開く
2. `新規コンテ作成` で新しいコンテを始める
3. 企画の核、CTRパッケージ、冒頭30秒設計を入力する
4. テンプレート追加や `シーン追加` で構成を組む
5. `コンテ保存` でJSON保存し、必要なときに `コンテ読込` で再開する
6. Web公開後は `ホーム画面に追加` からスマホのWebアプリとして使う
7. スマホで撮影中に確認したいときは `スマホ確認モード` に切り替える
8. `?mode=viewer` をURL末尾につけると、確認モードで直接開ける
9. Google Drive 同期を使う場合は OAuth クライアントIDを入力して `Drive接続` を押す
10. `Driveへ保存` で appDataFolder に保存し、別端末では `Driveから読込` で同じ内容を取得する

## Netlify公開

1. このフォルダをGitHubリポジトリに置く
2. Netlifyで `Add new site` → `Import an existing project` を選ぶ
3. GitHubリポジトリを選ぶ
4. Build command は空欄、Publish directory は `.` のままで公開する
5. 公開URLにスマホからアクセスして `ホーム画面に追加` を使う

## Netlify向け補足

- `netlify.toml` を追加済みです
- `sw.js` と `manifest.webmanifest` は更新が反映されやすいように no-cache にしています
- 静的サイトなので、Netlify無料プランでもそのまま公開できます

## 主な機能

- 複数コンテ向けのJSON保存と読み込み
- スマホ向けレスポンシブUI
- PWA対応
- スマホ確認用の簡易表示モード
- Google Drive appDataFolder への最小同期
- 旅Vlog向けテンプレートの追加
- PDFダウンロード
- テキスト書き出し
- 投稿前チェックと公開後初動のカード表示

## Google Drive同期の準備

1. Google Cloud でプロジェクトを作成する
2. Google Drive API を有効化する
3. OAuth 同意画面を設定する
4. `OAuth クライアント ID` を `ウェブアプリ` で作成する
5. 使用する公開URLを `承認済みの JavaScript 生成元` に追加する

例:

- Netlify: `https://your-site.netlify.app`
- GitHub Pages: `https://carnel0423.github.io`

このアプリでは、クライアントIDだけを使ってブラウザ上で Google Drive の `appDataFolder` に JSON を保存します。

## 注意

- コンテ管理の正式保存形式はJSONです
- PDFは共有用の補助出力です
- スマホ確認モードも、端末ごとのローカル保存内容を表示します
- PCで作った内容をスマホで見るには、JSONを共有してスマホ側で `コンテ読込` してください
- Google Drive 同期を使うには、公開URLが OAuth クライアントIDの JavaScript 生成元に登録されている必要があります
- `appDataFolder` は Google Drive 上のアプリ専用領域なので、通常のマイドライブ一覧には直接見えません
- `file://` で直接開いている間はホーム画面追加ボタンは有効になりません
- PDF内の日本語は簡易PDF生成の都合で一部文字置換される場合があります
