# 目的

AstroとSupabaseを使用したユーザー認証とwebアプリケーションのデプロイ動作検証である。

## app概要

create astro@latest -- --template basicsとSupabaseで構築されたwebアプリケーションプロジェクトです。

- 登録、ログイン、ログアウトの認証
- 認証はSupabaseのauthを使用
- DBはSupabaseのdatabaseを使用
- emailとpassword認証とソーシャルOAuth認証を使う
- フォームはJSとsvelteの2つ
- フォームのバリデーションもJSとzodの2つ
- ログイン後はsvelteを使用
- ミドルウェアによる認証状態管理
- svelteのstoreによるDBデータ状態管理
- ヘッダー変化はastroとsvelteの2つ
- デプロイ先はnetlify

## 開発環境

- astro 4.1.1
- svelte 4.2.8
- supabase 2.39.3
- zod 3.22.4

```text
/ 
├── public 
├── src
│    │── components
│    │── layouts
│    │── lib
│    │── pages
│    │     │─── api
│    │     │     │──── auth
│    │     │     └──── database
│    │     └────────── callback
│    │── store
│    │── types
│    └── middleware.ts
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## 注意点

- ユーザー情報を取得するにはsetSessionとonAuthStateChangeとなるが、こちらもサーバー側でしかsupabaseがimportできないのでapiから呼ぶ必要がある。
- コンポーネントからfetchで呼ぶのでonAuthStateChangedはpromiseを作成する必要がある。どちらも速度的には変わらない。
- ユーザー情報だけならミドルウェアとcookiesでastro側で処理した方が良いかもしれないが、localsで管理するのはどうなのかと感じるのでプロジェクトによる。
- formのactionなどの属性はSSRでないとデプロイ時に消えてしまうので注意が必要。
- 属性を取得する場合でもノードの存在確認をしてから取得しないとデプロイ時にエラーとなる。
- ミドルウェアはSSGだと機能しないので、コードフェンス内での処理にも注意。
- ヘッダーナビなどミドルウェアで認証状態で分岐させる場合、SSG用に作成したページでもSSRにしないと動かないので注意が必要。別途fetchする。
- 開発モードだとコンポーネント別にSSG/SSRが効いてしまうが、ビルド/デプロイ後はpages以下のファイルに統合されるので注意。
- SSGのコードフェンス内で外部APIは呼べるが/api/はSSRでないと出来ない。
- UIフレームワークでslotを使用する場合、フラグメントを使わないと配置が変わる。
- OAuth認証でのredirectToとSite URLの連携に注意
- ルートにcallbackは機能するが、/auth/callbackなどにするとcookieが消える
- Astro.reqestでhashが取得できないなどルートで受け取らないと少し難解になる

## 結論

- 注意点でも挙げている通り、開発モードでは動作するがデプロイすると動かない事が多々ある。原因としてはastroのトランスパイルによってastroファイルのコードが消失する場合がある。特にformの属性が消える事が公式にも書いてあった。
- 基本的にアプリケーション開発するのであればSSRもしくはUIフレームワークを使用したほうが問題は起き難い。
- デプロイに関してはアダプターをインストールすれば滞りなく進行する。env設定もすればsupabaseも問題なく連携できる。
- ミドルウェアでグローバルステートとして認証管理をする場合、astroからUIフレームワークへのpropsがコード内に見える。
- UIフレームワークでstoreやライブラリに入れても更新すると値が初期化されるので、結局ローカルストレージやindexDBが選択肢となる。どちらにしても値は見える。
- svelteのstoreとnanostoresは殆ど同じであるので、svelteだけなら入れる必要はない。他のUIフレームワークも使用するなら入れるという形になる。
- 認証からDBまでの大枠のアプリの形は整ったので、後は内部で個別のアプリを作って入れていく事になる。

[astroの動作検証はコチラ](https://github.com/k-gitest/astro-basic-ui-operation)
[astroの認証はコチラ](https://github.com/k-gitest/astro-supa-auth)