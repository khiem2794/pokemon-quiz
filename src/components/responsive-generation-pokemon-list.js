import React from "react"
import { Hidden } from "@material-ui/core"
import GenerationPokemonList from "../components/generation-pokemon-list"

const ResponsiveGenerationPokemonList = ({ generation }) => {
  return (
    <div>
      <Hidden smUp>
        <GenerationPokemonList generation={generation} cols={5} />
      </Hidden>
      <Hidden xsDown mdUp>
        <GenerationPokemonList generation={generation} cols={8} />
      </Hidden>
      <Hidden smDown lgUp>
        <GenerationPokemonList generation={generation} cols={10} />
      </Hidden>
      <Hidden mdDown xlUp>
        <GenerationPokemonList generation={generation} cols={12} />
      </Hidden>
      <Hidden lgDown>
        <GenerationPokemonList generation={generation} cols={15} />
      </Hidden>
    </div>
  )
}

export default ResponsiveGenerationPokemonList
