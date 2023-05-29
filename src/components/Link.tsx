import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React from 'react'

import isLocalUrl from '@utilities/isLocalUrl'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  nextLinkProps?: NextLinkProps
  muiLinkProps?: MuiLinkProps
}

const Link: React.FC<LinkProps> = ({ children, href, muiLinkProps, nextLinkProps, ...rest }) => {
  if (href && isLocalUrl(href)) {
    return (
      <MuiLink href={href} component={NextLink} >
        {children}
      </MuiLink>
    )
  } else {
    return (
      <MuiLink href={href} {...muiLinkProps}>
        {children}
      </MuiLink>
    )
  }
}

export default Link
