import React from 'react'
import { Box, Chip, Typography } from '@mui/material'
import s from './repositoryDetails.module.scss'
import { ReactComponent as StarIcon } from '../../assets/icons/StarIcon.svg'
import { Repository } from '../../features/repoSlice'

type RepositoryDetailsProps = {
  repo: Repository
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({ repo }) => {

  return (
    <Box className={ s.repDetails }>
      <Typography className={ s.name }>
        { repo.name }
      </Typography>
      <Box className={ s.overview }>
        <Chip className={ s.lang } label={ repo.language } color="primary"/>
        <Box className={ s.stars }>
          <StarIcon/>
          <Typography className={ s.starsCount }>
            { repo.stargazers_count }
          </Typography>
        </Box>
      </Box>
      <Box className={ s.topics }>
        { repo.topics.map((topic: string, index: number) => <Chip key={index} label={ topic }/>) }
      </Box>
      <Typography className={ s.description }>
        { repo.description }
      </Typography>
      <Typography className={ s.license }>
        { repo.license ? repo.license.name : 'Лицензия не указана' }
      </Typography>
    </Box>
  )
}

export default RepositoryDetails
