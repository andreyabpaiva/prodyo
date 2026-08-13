#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DB_PATH="${DUCKDB_LOCAL_PATH:-$ROOT/data/prodyo.duckdb}"
BACKUP_DIR="$ROOT/data/backups"
KEEP=10

if ! command -v duckdb >/dev/null 2>&1; then
  echo "duckdb CLI nao encontrado. Instale com: brew install duckdb" >&2
  exit 1
fi

if [ ! -f "$DB_PATH" ]; then
  echo "banco nao encontrado em: $DB_PATH" >&2
  echo "rode a API uma vez para criar o arquivo, ou defina DUCKDB_LOCAL_PATH" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_PATH="$BACKUP_DIR/prodyo-$STAMP.duckdb"
cp "$DB_PATH" "$BACKUP_PATH"
echo "backup: ${BACKUP_PATH#"$ROOT"/}"

ls -1t "$BACKUP_DIR"/prodyo-*.duckdb 2>/dev/null | tail -n "+$((KEEP + 1))" | while read -r old; do
  rm -f "$old"
done

echo "abrindo em modo read-only (o arquivo nao sera modificado)"
exec duckdb -readonly -ui "$DB_PATH"
