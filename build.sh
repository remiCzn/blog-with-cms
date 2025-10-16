rm -rf dist

yarn install --frozen-lockfile
yarn run build

cd frontend
yarn install --frozen-lockfile
yarn run build

cd ../
mkdir -p ./dist/src/public
mv frontend/dist/* ./dist/src/public

cp .env ./dist/.env
cp package.json ./dist/package.json
cp yarn.lock ./dist/yarn.lock
cp pm2.json ./dist/pm2.json