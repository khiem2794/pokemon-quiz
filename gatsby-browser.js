import React from "react"

import PokemonContextProvider from "./src/context/context"

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles"

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)
theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
}

theme.typography.h4 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.6rem",
  },
}

theme.typography.h5 = {
  fontSize: "1.2 rem",
  "@media (min-width:600px)": {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.4rem",
  },
}

export const wrapRootElement = ({ element }) => (
  <PokemonContextProvider>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </PokemonContextProvider>
)
