package handlers

import (
	"net/http"

	"github.com/andreyapaiva/prodyo/apps/api/internal/docs"
)

const scalarHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Prodyo API</title>
</head>
<body>
  <script
    id="api-reference"
    data-url="/docs/openapi.yaml"
    src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
</body>
</html>`

func docsUIHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte(scalarHTML))
}

func docsSpecHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/yaml")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(docs.Spec)
}
