function EsempioDiView(res,dati) {
    res.write("<html><head><title>Esempio di View</title></head>\n<body>\n  <table>\n");
    res.write("<tr><th>Nome</th><th>Cognome</th><th>Codice Fiscale</th><th>Data di Nascita</th><th>Tessera Sanitaria</th></tr>\n");

    dati.forEach( p => {
        res.write("    <tr>");
        res.write("<td>"+p.getNome()+"</td>");
        res.write("<td>"+p.getCognome()+"</td>");
        res.write("<td>"+p.getCodFis()+"</td>");
        res.write("<td>"+p.getDataNascita()+"</td>");
        res.write("<td>"+p.getTesseraSanitaria()+"</td>");
        
        res.write("</tr>\n");
    })
    res.write("  </table></body></html>");
    res.end();
}

module.exports = EsempioDiView;