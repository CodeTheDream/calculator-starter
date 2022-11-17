import Link from 'next/link'
 import React from 'react'
 import { Button } from '@mui/material'
 import PropTypes from 'prop-types'
 
 function LinkButton({children, path, variant, color, ...props}) {
   return (
    <Link href={{ pathname: `${path}`, }} style={{ textDecoration: 'none' }} passHref>
    <Button variant={variant} color={color} id='otherPageBtn'>{children}</Button>
  </Link>
   )
 }

 LinkButton.propTypes = {
    children: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary']),
    path: PropTypes.string,
 }
 
 export default LinkButton



