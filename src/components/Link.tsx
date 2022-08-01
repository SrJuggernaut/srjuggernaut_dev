import React from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'

import isLocalUrl from '@utilities/isLocalUrl'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  nextLinkProps?: NextLinkProps
  muiLinkProps?: MuiLinkProps
}

const Link: React.FC<LinkProps> = ({ children, href, muiLinkProps, nextLinkProps }) => {
  if (href && isLocalUrl(href)) {
    return (
      <NextLink href={href} {...nextLinkProps} passHref>
        <MuiLink {...muiLinkProps}>{children}</MuiLink>
      </NextLink>
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
