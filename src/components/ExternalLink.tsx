import React, { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  href: string
  domain?: string | undefined
}

export default function ExternalLink({ children, href, domain, ...props }: Props) {
  if (!domain) domain = 'www.sasja-antwerpen.be'
  return (
    <a href={`https://${domain}${href}`} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  )
}
