import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'; //entre chaves para importar multiplos valores

function ProfileSidebar(props) { //proriedades 

  console.log(props)

  return(
    <Box>
        <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
  </Box>
  )
}

export default function Home() {

  const githubUser = "fabiolimadiogenes";

  const pessoasFavoritas = [
    "EDNILSON-NASCIMENTO",
    "Pietra-Santos",
    "Igorbit01",
    "Mnobren",
    "thalitsms",
    "Vini-Melo01",
  ];

  //colocar os parenteses apenas para poder usar quebra de linha
  return (
  <>
    <AlurakutMenu/>
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
      </div>  

      <div className="profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>

      
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({pessoasFavoritas.length})
          </h2>
          
          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
          </ul>

        </ProfileRelationsBoxWrapper>
     
        <Box>
          Comunidades
        </Box>
      </div>

    </MainGrid>) 
  </>
)
}
