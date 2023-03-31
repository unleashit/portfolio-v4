#!/usr/bin/env bash

if [[ -z "${DIRECTUS_PASSWORD}" ]]; then
  echo "DIRECTUS_PASSWORD env var not set"
  exit 1
fi

host=${DIRECTUS_HOST:-https://content.jasongallagher.org}
email=${DIRECTUS_ADMIN_EMAIL:-jg@jasongallagher.org}
outFile="directus-collections.d.ts"

npx directus-typescript-gen \
  --host "$host" \
  --email "$email" \
  --password "$DIRECTUS_PASSWORD" \
  --typeName DirectusCollections \
  --outFile "$outFile" \
  && echo "${outFile} successfully created"
