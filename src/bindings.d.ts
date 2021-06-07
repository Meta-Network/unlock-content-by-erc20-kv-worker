export {};

declare global {
  const MY_ENV_VAR: string
  const MY_SECRET: string

  // Workers KV db
  const SnippetToKey: KVNamespace
  const SNIPPETS_STORAGE: KVNamespace
  const SNIPPETS_REQUIREMENT: KVNamespace
}