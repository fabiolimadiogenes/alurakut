import React from "react";
import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'; //entre chaves para importar multiplos valores

function ProfileSidebar(props) { //proriedades 

  return(
    <Box as="aside">
        <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
        <hr/>

        <p>
          <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
            @{props.githubUser}
          </a>
        </p>
        <hr/>

        <AlurakutProfileSidebarMenuDefault/>
  </Box>
  )
}

function ProfileRelationsBox(props){
  return (
    <ProfileRelationsBoxWrapper>

      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>

      <ul>
          {/* {seguidores.map((itemAtual) => {
            return (
              <li key={itemAtual}>
                <a href={`https://github.com/${itemAtual}.png`} >
                <img src={itemAtual} />
                <span>{itemAtual}</span>
                </a>
              </li>
            )
          })} */}
        </ul>

    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([]);
  const githubUser = "fabiolimadiogenes";
  // const comunidades = [`Alurakut`];
  const pessoasFavoritas = [
    "EDNILSON-NASCIMENTO",
    "Pietra-Santos",
    "Igorbit01",
    "Mnobren",
    "thalitsms",
    "Vini-Melo01",
  ];
  
  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - pegar os arrays dos dados do github
  React.useEffect(function(){
    // GET
    fetch('https://api.github.com/users/fabiolimadiogenes/followers')
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta)
    })

    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        "Authorization": "82a4b912a72f4eb0f1182307bab047",
        "Content-Type": "aplication/jscon",
        "Accept": "application/json",
      },
      body: JSON.stringify ({ "query": `query {
        allCommunities{
          title
          id
          imageUrl
          creatorSlug
        }
      }` })
    })

    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;

      setComunidades(comunidadesVindasDoDato)
    })
  }, [])
  
  // 1- Criar um box que vai ter um map, baseado nos items do array que pegamos do github

  //colocar os parenteses apenas para poder usar quebra de linha
  return (
  <>
    <AlurakutMenu githubUser={githubUser}/>
    <MainGrid>

      <div className="profileArea" style={{gridArea: "profileArea"}}>
        <ProfileSidebar githubUser={githubUser} />
      </div>

      <div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h2 className="subTitle">O que voc?? deseja fazer?</h2>
          <form onSubmit={function handleCraComunidade(e) {
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);

            // console.log('Campo', dadosDoForm.get('title'));
            // console.log('Campo', dadosDoForm.get('image'));

            const comunidade = {
              title: dadosDoForm.get('title'),
              imageUrl: dadosDoForm.get('image'),
              creatorSlug: githubUser,
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async(response) =>{
              const dados = await response.json();

              // comunidades.push("Alura Stars");
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
            })
            
          }}>


            <div>
              <input placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title" 
              aria-label="Qual vai ser o nome da sua comunidade?"/>
            </div>

            <div>
              <input placeholder="Coloque uma URL para usarmos de capa" 
              name="image" 
              aria-label="Coloque uma URL para usarmos de capa"/>
            </div>

            <button>
              Criar comunidade
            </button>

          </form>
        </Box>
      </div>  

      <div className="profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>

        <ProfileRelationsBox title="Seguidores" items={seguidores}/>

        <ProfileRelationsBoxWrapper>

          <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>

          <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.title.id}`} >
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({pessoasFavoritas.length})
          </h2>
          
          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
          </ul>

        </ProfileRelationsBoxWrapper>
     
      </div>

    </MainGrid>) 
  </>
)
}
