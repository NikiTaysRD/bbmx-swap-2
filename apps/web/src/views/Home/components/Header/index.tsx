import styled from 'styled-components'

import { baseDisplay } from 'pages/_app'
import { Flex, Logo } from '@pancakeswap/uikit'
import { useState } from 'react'
import MobileNavLinks from 'views/Home/components/MobileNavLinks'
import AngleDownIcon from '../../../../../public/images/home/angle-down.svg'
import BarsIcon from '../../../../../public/images/home/bars.svg'
import React from 'react'

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

// const Logo = styled.a`
//   display: block;
//
//   img {
//     display: block;
//     width: auto;
//     height: 40px;
//   }
//
//   @media (max-width: 1399.98px) {
//     img {
//       height: 30px;
//     }
//   }
// `

const Container = styled.div`
  flex: 0 0 auto;
  width: 100%;

  @media (min-width: 992px) {
    display: flex;
    justify-content: center;
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

  display: flex;
  align-items: baseline;
  color: white;

  > li {
    float: left;
    margin: 0 10px;
    position: relative;
    color: white;

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
  height: 92px;
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

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;

  letter-spacing: 0 !important;

  li {
    list-style-type: none;
    color: rgba(255, 255, 255, 0.75);
    transition: 0.3s all;
    padding: 0 20px;
    font-size: 14px;

    a {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      letter-spacing: 0 !important;
    }

    &:hover {
      color: white;
    }
  }
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
  max-width: 1300px;
`

const BurgerButton = styled.b`
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

  position: relative;
`

const NavbarMenuItem = styled.div`
  color: white;

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    align-items: center;
    letter-spacing: 2px;
    color: white;

    img {
      height: 12px;
    }
  }

  &:hover {
    ${SubMenu} {
      opacity: 1;
      visibility: visible;
    }
  }
`

const MobileNavbarContainer = styled.div`
  position: absolute;
  top: 120%;
  left: 0;

  padding: 0 20px;
  background: #1b1c30;
  backdrop-filter: blur(15px);
  border-radius: 10px;

  width: 100%;
  min-height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
`
const MobileNavbarWrapper = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 40px;
`

const Header = () => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState<boolean>(false)

  return (
    <StyledHeader>
      <Container>
        <HeaderContainer>
          <Flex width="106px">
            <Logo href="/" />
          </Flex>

          <MainMenu>
            <li className="parent">
              <NavbarMenuItem className={baseDisplay.className}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">
                  Trade <img src={AngleDownIcon.src} alt="" />
                </a>
                <SubMenu>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">
                      BBMXSwap <span style={{ fontSize: '10px' }}>(Coming Soon)</span>
                    </a>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">
                      Futures <span style={{ fontSize: '10px' }}>(Coming Soon)</span>
                    </a>
                  </li>
                </SubMenu>
              </NavbarMenuItem>
            </li>
            <li className="parent">
              <NavbarMenuItem className={baseDisplay.className}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">
                  Earn <img src={AngleDownIcon.src} alt="" />
                </a>
                <SubMenu>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">
                      Farms <span style={{ fontSize: '10px' }}>(Coming Soon)</span>
                    </a>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">
                      Pools <span style={{ fontSize: '10px' }}>(Coming Soon)</span>
                    </a>
                  </li>
                </SubMenu>
              </NavbarMenuItem>
            </li>
            <li className="parent">
              <NavbarMenuItem className={baseDisplay.className}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">
                  Bridge <img src={AngleDownIcon.src} alt="" />
                </a>
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
              </NavbarMenuItem>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className={baseDisplay.className}>
                BBMXStarter
              </a>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className={baseDisplay.className}>
                Governance
              </a>
            </li>
          </MainMenu>

          <HeaderRight>
            <Button
              href="/swap"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Coming Soon"
              className={baseDisplay.className}
            >
              Launch App
            </Button>
          </HeaderRight>

          {/* eslint-disable-next-line no-script-url */}
          <BurgerButton id="menu-toggle" onClick={() => setMobileNavbarOpen(!mobileNavbarOpen)}>
            <img src={BarsIcon.src} style={{ paddingTop: '2px' }} alt="" />
          </BurgerButton>

          {mobileNavbarOpen && (
            <MobileNavbarContainer>
              <MobileNavbarWrapper>
                <MobileNavLinks linkName="Trade">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#">
                    BBMXSwap <span style={{ fontSize: '10px' }}>(Coming Soon)</span>
                  </a>

                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#">
                    Futures <span style={{ fontSize: '10px' }}>(Coming Soon)</span>
                  </a>
                </MobileNavLinks>
                <MobileNavLinks linkName="Earn">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#">
                    Farms <span style={{ fontSize: '10px' }}>(Coming Soon)</span>
                  </a>

                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#">
                    Pools <span style={{ fontSize: '10px' }}>(Coming Soon)</span>
                  </a>
                </MobileNavLinks>
                <MobileNavLinks linkName="Bridge">
                  <a target="_blank" rel="noopener noreferrer" href="https://bridge.base.org/deposit">
                    Base
                  </a>

                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.orbiter.finance/?source=Ethereum&dest=Base"
                  >
                    Orbiter
                  </a>
                </MobileNavLinks>
                <p className={baseDisplay.className}>BBMXStarter</p>
                <p className={baseDisplay.className}>Governance</p>
              </MobileNavbarWrapper>
            </MobileNavbarContainer>
          )}
        </HeaderContainer>
      </Container>
    </StyledHeader>
  )
}

export default Header
