# ブランチの切り方
1. issueを切る
2. ブランチを切る```feature/issue[issue番号]```
3. developブランチにマージする

# バックエンド環境構築
1. .envファイル作成
2. firebaseの秘密鍵(.json)を設置
3. dockerのビルド・立ち上げ
```
cd back
docker compose --env-file ./api/.env up --build
```
4. DBのマイグレーション
```
docker exec fast_api python db_migrate.py
```

# フロントエンド環境構築
1. .envファイル作成
2. パッケージインストール
```
cd front
npm i
```
3. dockerのビルド・立ち上げ
```
cd front
docker compose up --build -d
```