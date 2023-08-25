import styled from 'styled-components'
import { ReactNode, useState } from 'react'
import AngleDownIcon from '../../../../../public/images/home/angle-down.svg'

interface MobileLinkProps {
  linkName: string
  children: ReactNode
}

const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  img {
    width: 12px;
  }
`

const LinkContent = styled.div`
  width: 100%;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * {
    color: rgba(255, 255, 255, 0.75);
  }

  line-height: 44px;
  color: rgba(255, 255, 255, 0.75);
`

const MobileNavLinks: React.FC<React.PropsWithChildren<MobileLinkProps>> = ({ linkName, children }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  return (
    <>
      <LinkWrapper onClick={() => setIsClicked(!isClicked)}>
        <p style={{ color: `${isClicked ? '#4E09F8' : 'white'}` }}>{linkName}</p>
        <img src={AngleDownIcon.src} alt="" />
      </LinkWrapper>

      {isClicked && <LinkContent>{children}</LinkContent>}
    </>
  )
}

export default MobileNavLinks
