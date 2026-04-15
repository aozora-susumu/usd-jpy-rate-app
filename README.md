# USD/JPY Exchange Rate App

## 概要

複数の通貨ペア（USD/JPY, EUR/JPY, GBP/JPY）の為替レートを取得して表示する Web アプリです。  
通貨切り替えボタンで直感的にレートを確認できるシンプルな UI を備えています。

---

## 🚀 Features

- 為替レートの取得（ボタンクリック時）
- 通貨ペアの切り替え（USD/JPY, EUR/JPY, GBP/JPY）
- 選択中の通貨ペアのハイライト表示
- 流動的レイアウト対応のシンプルな UI
- エラーハンドリング（タイムアウト対応）

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- CSS
- ExchangeRate API (open.er-api.com)

---

## 📷 Screenshot

**PC版**  
通貨ペア（USD/JPY, EUR/JPY, GBP/JPY）の切り替えボタンと為替レート表示。選択中の通貨はハイライトされます。

![USD/JPYレートの通貨切り替え画面（PC版）](assets/screenshots/image.png)

**モバイル版**  
流動的なレイアウト対応により、スマートフォンでもレートを確認できます。

![スマホ表示での為替レート画面（iPhone 14 Pro Max）](assets/screenshots/image-1.png)

---

## 💡 Implementation Highlights（工夫したポイント）

- **Reactコンポーネントの構造化**: App.tsxをシンプルなエントリーポイントとし、為替表示ロジックをRateCardコンポーネントに集中させて保守性を向上
- **CSSの整理**: インラインスタイルをRateCard.cssに移動し、グローバルスタイルを最小限に抑えてコンポーネントごとのスタイリングを実現
- **エラーハンドリングの強化**: AbortControllerを使用したタイムアウト（10秒）対応と、StrictModeでの競合状態を防ぐためのisMountedフラグの実装
- **コードのクリーンアップ**: 不要なファイルの削除と、フォルダ構造の整理
- **API統合**: ExchangeRate API（open.er-api.com）を使用した為替レート取得の実装
- **UI/UXの改善**: 通貨切り替えボタンのハイライト表示と、読み込み中/エラー状態の明示

---

## 🔗 Demo

https://usd-jpy-rate-app.vercel.app/

---

## 📁 Project Structure

```text
usd-jpy-rate-app/
├─ src/
│  ├─ api/
│  │  └─ fetchRates.ts      # 為替レート取得・タイムアウト制御
│  ├─ components/
│  │  ├─ RateCard.tsx       # レート表示UI（通貨切り替え対応）
│  │  └─ RateCard.css       # RateCard専用スタイル
│  ├─ App.tsx               # アプリのルートコンポーネント
│  ├─ main.tsx              # Reactエントリーポイント
│  └─ index.css             # グローバルスタイル
├─ assets/                  # 画像など静的アセット
├─ index.html               # HTMLテンプレート
├─ package.json             # 依存関係・npm scripts
├─ vite.config.ts           # Vite設定
├─ tsconfig*.json           # TypeScript設定
└─ eslint.config.js         # ESLint設定
```

### 設計の意図

- `src/api` と `src/components` を分離し、データ取得と表示責務を明確化
- コンポーネント単位でCSSを分割し、スタイルの影響範囲を最小化
- `App.tsx` は最小のエントリーポイントとして保ち、為替表示ロジックを `RateCard.tsx` に集約

---

## 🔌 API

為替レートは ExchangeRate API（open.er-api.com）から Fetch API を用いて取得しています。

---

## 🧪 Setup（ローカルでの動作方法）

1. このリポジトリを clone
2. `npm install` を実行
3. `npm run dev` を実行し、表示されたローカルURLをブラウザで開く

本番ビルド: `npm run build`  
ローカルプレビュー（build後）: `npm run preview`

---

## 📈 補足

本アプリは学習目的で作成したもので、現状の機能をもって完成としています。

---
