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

GET /contatore/:nomeFile
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