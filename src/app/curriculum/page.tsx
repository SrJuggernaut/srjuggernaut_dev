import { formatDate } from '@/utilities/dates'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import NextImage from 'next/image'
import { FC } from 'react'

const experienceTypes = [
  {
    id: 'fad0f945-2c3e-4005-b8e1-01586fa33fac',
    title: 'Freelance',
    items: [
      {
        id: '4635e1b3-c3b6-43ae-9494-1f8e83dd8b57',
        title: 'Desarrollo de aplicaciones web',
        description: 'Desarrollo de aplicaciones web en React, NextJS, NodeJS, MongoDB, GraphQL, AWS, Docker, Kubernetes, etc.',
        startDate: '2021',
        endDate: undefined
      },
      {
        id: '77d18f34-5336-4895-b347-a7cd223c0aab',
        description: 'Manejo de blogs y sitios web propios usando Wordpress, con temas y algunos plugins creados por mi, además del uso de plugins de terceros.',
        startDate: '2014',
        endDate: undefined
      },
      {
        id: 'f94d843f-406a-46ca-aa57-788c5cd25145',
        description: 'Creación de sitios web estáticos para individuales y pequeños negocios usando HTML y CSS.',
        startDate: '2013',
        endDate: undefined
      },
      {
        id: '363b23a7-c0c1-471a-9954-3f40a47a7e9f',
        description: 'Desarrollo de aplicaciones web para pequeños negocios usando JavaScript, HTML, CSS y frameworks como jQuery, Angular, React, etc.',
        startDate: '2013',
        endDate: undefined
      }
    ]
  },
  {
    id: 'f5cee521-10ec-4712-a24c-bdd9c07982e6',
    title: 'Comunidades',
    items: [
      {
        id: 'f94d843f-406a-46ca-aa57-788c5cd25145',
        description: 'Manejo los servidores web y de juegos de múltiples comunidades.',
        startDate: '2014',
        endDate: undefined
      },
      {
        id: '9174b12b-4f34-4a9a-b2a1-b09c63938b1f',
        description: 'Gestión de comunidades.',
        startDate: '2015',
        endDate: undefined
      }
    ]
  }
]
const knowledgements = [
  { id: 'c74ed3d7-d6cd-4e2f-b651-b003ff79ac41', title: 'HTML5', children: [] },
  { id: 'ea5696cf-717b-43fb-8bd5-0622bc4e25ac', title: 'CSS3', children: [] },
  {
    id: '9cddc727-7d81-498e-9c3b-9b8f52e0bb4a',
    title: 'Javascript',
    children: [
      { id: '452273d3-6273-4aeb-9b62-571fe0100ec8', title: 'Typescript' },
      { id: '1ae7cd78-6dd6-4c91-a6a1-cbe707001525', title: 'React' },
      { id: '2f8b006d-75e3-43a6-bc0a-3c41475177cd', title: 'NextJs' },
      { id: '9aab63db-5113-4b11-b4d9-736fa97e18f2', title: 'Express' }
    ]
  },
  {
    id: '2e5ab813-4f1c-4dfe-8c24-b29532c8bd37',
    title: 'Wordpress',
    children: [
      { id: '6a472d0d-3f84-4710-a1fb-19fe42c6c147', title: 'PHP' },
      { id: 'c5ccfe1b-434c-4bac-8bd5-e576efe593a6', title: 'MySQL' },
      { id: '45afd93e-475a-449a-aeb5-135f0b1d96dc', title: 'Plugins' },
      { id: 'aa97810a-1ec0-45da-b65b-d2381b352346', title: 'Temas' }
    ]
  },
  {
    id: '40ef213f-3cee-4ae9-aefc-b2c2efdc1f52',
    title: 'Prototipado',
    children: [
      { id: '073d0b6f-438e-481d-b370-0f940133596f', title: 'AdobeXD' },
      { id: 'bf9f0885-e97b-47ae-9c19-9a63a92897b3', title: 'Figma' }
    ]
  },
  { id: '8998c743-ed42-4db1-8899-73555601399f', title: 'Git', children: [] },
  {
    id: 'd39671f1-f8b3-4ca7-80d4-3625d81e7637',
    title: 'Cloud',
    children: [
      { id: '82b02cd9-d373-4a34-abe2-4aedf3c23106', title: 'DigitalOcean' },
      { id: 'e7d04e91-2f8c-4bae-b6e1-cc02ddf49d4b', title: 'Heroku' },
      { id: '67a70d9b-8a95-432b-87ec-067a2ffc4222', title: 'AWS' },
      { id: 'e84a8492-fb9b-4476-b057-398495d6596a', title: 'GoogleCloud' }
    ]
  },
  {
    id: 'a42ebd12-b541-4f6a-b912-9efcd6398f68',
    title: 'Graficos',
    children: [
      { id: 'a42ebd12-b541-4f6a-b912-9efcd6398f68', title: 'Adobe Illustrator' },
      { id: '6ab33a5a-3240-41bf-b2fc-f94d3bad2baa', title: 'Adobe Photoshop' }
    ]
  },
  {
    id: 'a09ef6fc-0da7-4f58-8e1a-b1ab1973de55',
    title: 'Server management',
    children: [
      { id: 'ce6b6bb0-211d-48aa-a097-83ad771cc265', title: 'Docker' },
      { id: 'e1b3ad01-1f0c-4989-b113-ad72e120b5a0', title: 'Nginx' },
      { id: '3aad2165-70d3-423e-9b53-e16a2d23c6f4', title: 'Apache' }

    ]
  }
]
const education = [
  {
    id: '062c2ac5-7070-4612-97be-df34a81071f5',
    title: 'Frontend con React.js',
    description: 'Desarrollo aplicaciones web, móviles y de escritorio.',
    date: '2021-07-08T12:00:00',
    certUrl: 'https://platzi.com/p/JCsanchez993/ruta/8-desarrollo-react/diploma/detalle/',
    school: 'Platzi'
  },
  {
    id: '8fbcfaa8-6f3e-4e74-a3b7-0650c0913af5',
    title: 'Diseño de Interfaces (UI)',
    description: 'Creación de interfaces intuitivas, usables, interactivas e impactantes.',
    date: '2021-04-20T12:00:00',
    certUrl: 'https://platzi.com/p/JCsanchez993/ruta/19-interfaces-ui/diploma/detalle/',
    school: 'Platzi'
  },
  {
    id: 'f92c572b-7fd5-4104-a5fb-43f0c0890d79',
    title: 'Escuela de JavaScript',
    description: 'Desarrollador FullStack con el stack MERN.',
    date: '2021-06-09T12:00:00',
    certUrl: 'https://platzi.com/p/JCsanchez993/ruta/100-escuela-javascript/diploma/detalle/',
    school: 'Platzi'
  }
]
const languages = [
  { id: '1', name: 'Inglés', level: 'B1 Preliminary' },
  { id: '2', name: 'Español', level: 'Nativo' }
]

const CurriculumPage:FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: {
            xs: '1fr',
            md: '30% 1fr',
            lg: '25% 1fr'
          }
        }}
      >
        <Box>
          {/* TODO: Check image sizing */}
          <NextImage
            src="/img/Juan_Carlos_Sanchez.png"
            alt="Juan Carlos Sánchez Méndez"
            width={600}
            height={600}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ order: 2 }} variant="h2" component="h1" align="center">Juan Carlos Sánchez Mendez</Typography>
          <Typography sx={{ order: 1 }} variant="h1" component="h2" color="secondary" align="center">Diseñador Web Fullstack</Typography>
          <Typography sx={{ order: 3 }}variant="body1" align="center">Soy un FullStack developer Javascript. Quiero crear sitios web y sistemas que impacten positivamente a negocios y comunidades, ganándome la vida con lo que me gusta hacer.</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '80% 1fr'
          }
        }}
      >
        <Box>
          <Typography variant="h2" color="secondary">Experiencia</Typography>
          {experienceTypes.map((experienceType) => (
            <Box
              key={experienceType.id}
              sx={{
                paddingLeft: 1
              }}
            >
              <Typography variant="h3" gutterBottom>{experienceType.title}</Typography>
              {experienceType.items.map((experienceItem) => (
                <Box
                  key={experienceItem.id}
                  sx={{
                    paddingLeft: 1,
                    marginBottom: 1
                  }}
                >
                  {/* <Typography variant="h4">{`${formatDate(experienceItem.startDate)} - ${experienceItem.endDate ? experienceItem.endDate : 'actualidad'}`}</Typography> */}
                  <Typography variant="h4" >{`${experienceItem.startDate} - ${experienceItem.endDate ? experienceItem.endDate : 'actualidad'}`}</Typography>
                  <Typography variant="body1">{experienceItem.description}</Typography>
                </Box>
              ))}
            </Box>
          ))}
          <Typography variant="h2" color="secondary">Educación</Typography>
          {education.map((educationItem) => (
            <Box
              sx={{
                paddingLeft: 1,
                marginBottom: 1
              }}
              key={educationItem.id}
            >
              <Typography variant="h3" gutterBottom>{educationItem.title}</Typography>
              <Typography variant="body2" component="span">{`${formatDate(educationItem.date)} - ${educationItem.school}`}</Typography>
              <Typography variant="body1">{educationItem.description}</Typography>
              <Button
                sx={{
                  marginBlock: 1
                }}
                variant="contained"
                href={educationItem.certUrl}
              >
              Ver certificado
              </Button>
            </Box>
          ))}
        </Box>
        <Box>
          <Typography variant="h2" color="secondary">Conocimientos</Typography>
          <Box className="fa-ul" component="ul" >
            {knowledgements.map((knowledgement) => (
              <li key={knowledgement.id}>
                <FontAwesomeIcon icon={faChevronRight} listItem />
                <Typography variant="body1">{knowledgement.title}</Typography>
                {knowledgement.children.length > 0 && (
                  <ul className='fa-ul'>
                    {knowledgement.children.map((childKnowledgement) => (
                      <li key={childKnowledgement.id} >
                        <FontAwesomeIcon icon={faChevronDown} listItem />
                        <Typography variant="body1">{childKnowledgement.title}</Typography>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </Box>
          <Typography variant="h2" color="secondary">Idiomas</Typography>
          <Box className="fa-ul" component="ul" >
            {languages.map((language) => (
              <li key={language.id}>
                <FontAwesomeIcon icon={faChevronRight} listItem />
                <Typography variant="body1">{language.name} ({language.level})</Typography>
              </li>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CurriculumPage
