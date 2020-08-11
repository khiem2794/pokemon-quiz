import React from "react"

import PokemonContextProvider from "./src/context/context"

export const wrapRootElement = ({ element }) => (
  <PokemonContextProvider>{element}</PokemonContextProvider>
)
