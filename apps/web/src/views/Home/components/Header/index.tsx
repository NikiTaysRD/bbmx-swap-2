import styled from 'styled-components'

import AngleDownIcon from '../../../../../public/images/home/angle-down.svg'
import BarsIcon from '../../../../../public/images/home/bars.svg'

const StyledHeader = styled.header`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 40px 0 0;
  z-index: 9;

  @media (max-width: 1680px) {
    padding-top: 25px;
  }

  @media (max-width: 1399.98px) {
    padding-top: 15px;
  }
`

const Logo = styled.a`
  display: block;

  img {
    display: block;
    width: auto;
    height: 36px;
  }

  @media (max-width: 1399.98px) {
    img {
      height: 30px;
    }
  }
`

const Container = styled.div`
  flex: 0 0 auto;
  width: 100%;

  @media (min-width: 992px) {
    width: 50%;
  }

  padding-left: 15px;
  padding-right: 15px;

  margin-right: auto;
  margin-left: auto;
`

const Button = styled.a`
  padding: 0 25px;
  line-height: 44px;
  font-size: 14px;

  background: #4e09f8;
  color: #fff;

  border-radius: 6px;
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
  outline: none;
  box-shadow: none !important;
  text-align: center;
  border: none;

  display: inline-block;

  @media (max-width: 1399.98px) {
    padding: 0 20px;
    line-height: 36px;
    font-size: 12px;
  }
`

const MainMenu = styled.ul`
  position: relative;

  margin: 0;
  padding: 0;
  list-style: none;

  > li {
    float: left;
    margin: 0 10px;
    position: relative;

    &.parent::before {
      background: url(${AngleDownIcon.src}) no-repeat 0 0;
      font-weight: 900;
      position: absolute;
      bottom: -8px;
      font-size: 12px;
      left: 50%;
      transform: translateX(-50%);
    }

    > a {
      display: block;
      font-size: 15px;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 1);
      transition: 0.3s all;
      line-height: 44px;

      &:hover {
        color: #4e09f8;
      }
    }
  }

  @media (max-width: 800px) {
    display: none;
  }
`

const SubMenu = styled.ol`
  position: absolute;
  width: 220px;
  top: 100%;
  left: 0;
  background: rgba(164, 187, 234, 0.08);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: 0.3s all;
  z-index: -1;
`

const HeaderRight = styled.div`
  margin-right: 10px;

  @media (max-width: 1399.98px) {
    margin-left: auto;
    margin-right: 10px;
  }
`

const HeaderContainer = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 100%;
`

const BurgerButton = styled.a`
  display: block;
  width: 34px;
  height: 34px;
  line-height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  text-align: center;
  padding-top: 3px;

  @media (min-width: 800px) {
    display: none;
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <HeaderContainer>
          <Logo href="#">
            <img src="images/logo.png" alt="Logo" />
          </Logo>

          <MainMenu>
            <li className="parent">
              <a href="#">Trade</a>
              <SubMenu>
                <li>
                  <a href="#">
                    BBMXSwap <span>(Coming Soon)</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Futures <span>(Coming Soon)</span>
                  </a>
                </li>
              </SubMenu>
            </li>
            <li className="parent">
              <a href="#">Earn</a>
              <SubMenu>
                <li>
                  <a href="#">
                    Farms <span>(Coming Soon)</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Pools <span>(Coming Soon)</span>
                  </a>
                </li>
              </SubMenu>
            </li>
            <li className="parent">
              <a href="#">Bridge</a>
              <SubMenu>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://bridge.base.org/deposit">
                    Base
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.orbiter.finance/?source=Ethereum&dest=Base"
                  >
                    Orbiter
                  </a>
                </li>
              </SubMenu>
            </li>
            <li>
              <a href="#">BBMXStarter</a>
            </li>
            <li>
              <a href="#">Governance</a>
            </li>
          </MainMenu>

          <HeaderRight>
            <Button href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Coming Soon">
              Launch App
            </Button>
          </HeaderRight>

          <BurgerButton href="javascript:void(0)" id="menu-toggle">
            <img src={BarsIcon.src} style={{ paddingTop: '2px' }} />
          </BurgerButton>
        </HeaderContainer>
      </Container>
    </StyledHeader>
  )
}

export default Header
