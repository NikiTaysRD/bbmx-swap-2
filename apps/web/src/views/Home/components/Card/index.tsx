import { StaticImageData } from 'next/image'
import React, { Children } from 'react'
import styled from 'styled-components'

interface HomeCardProps {
  image: StaticImageData
  header: string
}

const Card = styled.div`
  padding: 18px 30px;
  min-height: 300px;
  max-width: 414px;
  border-radius: 15px;
  transition: 0.3s all;
  -webkit-transition: 0.3s all;
  -moz-transition: 0.3s all;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.03);
  text-align: center;

  width: 110%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    min-height: 374px;
  }

  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: 15px;

  img {
    max-width: 64px;
    vertical-align: middle;
  }

  span {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 15px;
    color: white;
  }

  p {
    font-size: 15px;
    color: #a0a3c4;
    line-height: 30px;
  }
`

const HomeCard: React.FC<React.PropsWithChildren<HomeCardProps>> = ({ image, header, children }) => {
  return (
    <>
      <Card>
        <img src={image.src} alt="" />
        <span>{header}</span>
        <p>{children}</p>
      </Card>
    </>
  )
}

export default HomeCard
