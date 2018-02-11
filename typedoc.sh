#!/bin/sh
if [ "$TRAVIS_PULL_REQUEST" == "true" ]; then
  exit 0
fi
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
yarn add typedoc
git clone -b gh-pages https://${GH_TOKEN}@github.com/kaplanmaxe/kraken-api.git typedoc
typedoc --out docs/ src/**/*.ts
cd docs
git add .
git commit -m "adding documentation"
git push -u origin gh-pages
