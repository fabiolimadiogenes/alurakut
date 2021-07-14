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
  const [comunidades, setComunidades] = React.useState([{
    id: '1222222222212331324',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
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
    fetch('https://api.github.com/users/fabiolimadiogenes/followers')
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta)
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
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCraComunidade(e) {
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);

            // console.log('Campo', dadosDoForm.get('title'));
            // console.log('Campo', dadosDoForm.get('image'));

            const comunidade = {
              id: new Date().toISOString(),
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image'),
            }
            // comunidades.push("Alura Stars");
            const comunidadesAtualizadas = [...comunidades, comunidade]
            setComunidades(comunidadesAtualizadas)
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
                    <a href={`/users/${itemAtual.title}`} >
                    <img src={itemAtual.image} />
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
