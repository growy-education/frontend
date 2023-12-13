# frontend プロジェクトについて

## frontend プロジェクトの概要

このプロジェクトは、Growy の Web ページの表示を行なうためのものです。現在は React によって開発を進めていますが、NextJS へと移行する可能性があります。

### 実際の運用環境

---

#### backend サーバー（API サーバー）について

API サーバーは、<https://api.growy.education/>で外部に公開されています。詳細は growy-education/backend のプロジェクトを参照してください。

#### frontend サーバーについて

本番前環境は、staging ブランチに push されたコードが実行されています。
このコードは CloudBuild のトリガーによって、stg(staging)ブランチに push される度に自動でインスタンスがアップデートされてデプロイされます。
外部に公開されているアドレスは、<https://staging.web.growy.education>です。
このアドレスには、@growy.education のドメインを持つ Google アカウントでのみアクセスすることができます。

本番環境は、prod(production)ブランチに push されたコードが実行されています。
このコードは CloudBuild のトリガーによって、prod ブランチに push される度に自動でインスタンスがアップデートされてデプロイされます。
外部に公開されているアドレスは、<https://web.growy.education>です。

---

### 使用しているフレームワーク

- WEB サーバーとして、React を使用しています。

React は現在最も Web 業界で使われているライブラリと言っても過言ではありません。このライブラリを継続的に運用することは、皆さんのキャリアにおいても重要でしょう。

### 開発者が知っておくべき知識

以下に、開発者が知っておいてほしい最低限の知識を単語ベースで載せています。これらについて説明できることが最低限必要です。

- Git
  - Syntax(commit,branch)
  - GitHub(GitHub のアクセス管理やトリガーについて)
- TypeScript
  - Syntax
  - Nodejs
  - Eslint
- React
  - コンポーネントへの理解
  - state, context
- Docker
  - CLI
  - Docker file
  - Docker Compose
- Google Cloud
  - Container Registry
  - Cloud Build
  - Cloud Run

## Growy の開発サイクル

- Step0. 追加する機能やアップデート内容を決める
  - Growy メンバーで議論し追加する機能を選定する
  - エンジニアメンバーでコードの問題を議論する
  - 追加する機能とコード修正（バグ修正）を決定
- Step1. 開発環境(dev)ブランチの作成
  - 本番環境（prod）ブランチから開発環境(dev)ブランチを作成
  - エンジニアチームによる開発を行う
  - ローカル環境で問題が発生しないことを確認
- Step2. 本番前環境（staging）ブランチの作成とデプロイ
  - 開発環境（dev）ブランチから本番前環境（staging）ブランチを作成
  - Growy メンバーに使用してもらい、バグの確認を行う
  - 問題があれば、エンジニアチームによる修正を行う
- Step3. 本番環境（prod）へのマージとデプロイ
  - 本番前環境（staging）ブランチから本番環境（prod）へのマージを行う
  - デプロイ済みの本番環境(prod)のログを確認し、問題がなければトラフィックを流す

## ファイル構成の説明

| ファイル            | 説明                                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| /public             | React アプリケーションにおける static ファイルの保存先。                                                                                     |
| /node_modules       | NodeJS におけるパッケージライブラリの保存先。                                                                                                |
| /src                | React の実行コード群                                                                                                                         |
| .dockerignore       | CloudRun にデプロイするときの Dockerfile によってデプロイされるファイルを制限する。                                                          |
| .env.development    | ローカル開発環境で参照される環境変数。                                                                                                       |
| .env.production     | 本番環境に設定すべき環境変数。実際にこのファイルを参照して、環境変数を設定することはない。設定すべき環境変数についてのメモ書きとして用いる。 |
| .env.test           | TypeScript のコードルールのための ESLint 設定ファイル。デプロイ時には無視する。                                                              |
| .gitignore          | Git に保存する必要のないファイルを記述する。                                                                                                 |
| cloudbuild.yaml     | CloudBuild で指定した、開発前環境（staging）へのデプロイと本番環境へのトリガーによるデプロイの設定ファイル。                                 |
| Dockerfile          | CloudRun によるデプロイ時に参照されるファイル。ローカル開発環境におけるセットアップでも参照されることに注意する。                            |
| package.json        | モジュールのバージョン管理や実行コードの保存するファイル。アプリケーションで実行するコードが分からなくなった時は、見てみると良い。           |
| README.md           | この文章を生成している Markdown ファイル。                                                                                                   |
| tsconfig.build.json | Build する際の TypeScript 設定ファイル。                                                                                                     |
| tsconfig.json       | TypeScript 設定ファイル。                                                                                                                    |
| yarn-error.log      | パッケージ管理ソフト Yarn のエラーログ。                                                                                                     |
| yarn.lock           | パッケージ管理ソフトの Yarn のバージョン関係を記述したファイル。                                                                             |

## プロジェクトに参加するとき

### インストールが必要なアプリケーション

<dl>
<dt>Yarn</dt>
<dd>上述の通り、このプロジェクトのパッケージ管理ソフトはYarnを用います。</dd>
<dt>Node</dt>
<dd>Reactアプリケーションの実行のためには、Nodeの実行環境が必要です。</dd>
<dt>VScode</dt>
<dd>コードエディターとしてはVScodeで統一したいと考えています。</dd>

### ローカル開発環境の準備

レポジトリをクローンしたい場所まで移動して、プロジェクトを GitHub からクローンする。

```bash
cd $directory_you_want_to_clone
git clone . https://github.com/growy-education/frontend
```

```bash
# watch mode
$ yarn start
```

```bash
# Update auth
gcloud auth application-default login
# Listen forward to production database
./cloud-sql-proxy --port 1234 growyapp:asia-northeast1:postgresql-production
```

以上で開発環境の立ち上げは終了です。

## テストを実行する

この章はまだ未完成です。

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
