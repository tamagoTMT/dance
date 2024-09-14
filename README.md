# 電子パンフレット

## 開発環境構築

- VSCodeのインストール
- GitHubのアカウント作成

## デバッグ方法

- VSCodeの拡張機能「Live Server」をローカル開発環境にインストール
- 画面右下の[GoLive]をクリックするとデバッグが開始できます

## json定義の作成方法

### 出演者情報の作成

- Find meで出演者に提出してもらうエントリーシートにパンフ用の項目を設置
- GASを起動させ、jsonファイルを自動生成
  - performer.json（出演者情報の定義ファイル）

### 振付者情報の作成

- TODO エントリーフォーム同様、振付者にも回答してもらった方がよさそう

## パフォーマンス測定方法

- Chormeの拡張機能lightHouseを使用
- [2024/09/14時点の診断結果](https://pagespeed.web.dev/analysis/https-ebrochure-nekokanpjt-jp-test-page-test-html/42bnj84yti?hl=ja&form_factor=mobile)

割と的確なアドバイスをくれている感じなので、ある程度有効だと思われる。
