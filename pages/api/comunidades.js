import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request,responde){

    if(request.method === 'POST'){

        const TOKEN = 'b1f4fe75e680797286a1644d90dfcc';

        const client = new SiteClient(TOKEN);

        const registroCriado = client.items.create({
            itemType: "967989", // ID do Model de 'Communities' criado pelo dado
            ...request.body,
            // title: "Comunidade de teste",
            // imageUrl: "https://i.imgur.com/UBRFELe.jpg",
            // creatorSlug: "fabiolimadiogenes"
        })

        console.log(registroCriado);

        Response.json({
            dados: "Algum dado qualquer",
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    })
}