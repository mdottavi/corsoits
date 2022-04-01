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

-----
# VERSIONE 3

## restitusce il conteggio di un contatore se esistente

GET /v3/contatori/:nomeFile
restituisce:
{
  conto: n
}

## crea un contatore se non esiste

POST /v3/contatori
BODY json
{
  nomeFile: string
}
restituisce:
{
  ok: boolean
}

## setta un contatore se esiste ad un nuovo valore

PUT /v3/contatori/:nomeFile
BODY json
{
  nuovoValore: numero
}
restituisce:
{
  ok: boolean
}

## incrementa un contatore se esiste

PATCH /v3/contatori/:nomeFile
BODY json
{
  incremento: numero
}
restituisce:
{
  ok: boolean
}

## elimina un contatore se esiste

DELETE /v3/contatori/:nomeFile
restituisce: STATI (204, 404, 500)

## restituisce la lista di tutti i file esistenti

GET /v3/contatori
restituisce:
[
  ...nome file
]
