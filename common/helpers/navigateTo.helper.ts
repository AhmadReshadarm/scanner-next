import { NextRouter } from "next/router"
import { Page, paths } from "routes/constants"

export const navigateTo = (router: NextRouter, pagePath: Page) => () => {
  router.push(paths[pagePath])
}
