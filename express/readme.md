GET /contatore
restituisce:
{
  conto: n
}

POST /contatore
// INCREMENTA IL CONTATORE
restituisce:
{
  ok: boolean
}

-----
VERSIONE 2

GET /v2/contatori/:nomeFile
restituisce:
{
  conto: n
}

POST /v2/contatori
BODY json
{
  nomeFile: string
  incremento: number
}
restituisce:
{
  ok: boolean
}

DELETE /v2/contatori/:nomeFile
restituisce: STATI
