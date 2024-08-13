import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import s from './loader.module.scss'

const Loader = () => {
  return (
    <Box className={s.loaderContainer}>
      <CircularProgress size={80}/>
    </Box>
  )
}

export default Loader
