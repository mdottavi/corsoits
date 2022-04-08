import { Router } from 'express';
import { listPersona } from '../db/dao/persona.dao';
const routerPersona = Router();

routerPersona.get('/', async (req, res) => {
    const persone = await listPersona();
    return res.json(persone).send()
})


export default {
    routerPersona
}