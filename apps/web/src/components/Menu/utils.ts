import orderBy from 'lodash/orderBy'
import { ConfigMenuItemsType } from './config/config'

export const getActiveMenuItem = ({
  pathname,
  menuConfig,
}: {
  pathname: string
  menuConfig: ConfigMenuItemsType[]
}) => {
  if (pathname === '/' || !pathname) return menuConfig[0]
  return menuConfig.find((menuItem) => {
    if (menuItem.href === '/') return false
    return pathname.startsWith(menuItem.href) || getActiveSubMenuItem({ menuItem, pathname })
  })
}

export const getActiveSubMenuItem = ({ pathname, menuItem }: { pathname: string; menuItem?: ConfigMenuItemsType }) => {
  const items = menuItem?.items ?? []
  const activeSubMenuItems = items.filter((subMenuItem) => pathname.startsWith(subMenuItem.href)) ?? []

  // Pathname doesn't include any submenu item href - return undefined
  if (!activeSubMenuItems || activeSubMenuItems.length === 0) {
    return undefined
  }

  // Pathname includes one sub menu item href - return it
  if (activeSubMenuItems.length === 1) {
    return activeSubMenuItems[0]
  }

  // Pathname includes multiple sub menu item hrefs - find the most specific match
  const mostSpecificMatch = orderBy(activeSubMenuItems, (subMenuItem) => subMenuItem.href.length, 'desc')[0]

  return mostSpecificMatch
}
