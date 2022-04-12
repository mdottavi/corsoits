import { getConnection } from './connection.singleton';


const listaPersone = async () => {
  const connection = await getConnection();

  let results;
  try {
    const query = await connection.query('select * from persona');
    results = query[0];
  } catch(e) {
    console.log(err);
  }

  return results;
}

export default {
  listaPersone
}