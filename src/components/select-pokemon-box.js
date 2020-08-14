import React from "react"
import { Box } from "@material-ui/core"
import Img from "gatsby-image"

export default function SelectPokemonBox({ pokemonData }) {
  return (
    <Box>
      {pokemonData.localImage ? (
        <Img
          alt={pokemonData.name}
          fluid={pokemonData.localImage.childImageSharp.fluid}
        />
      ) : (
        <img src={pokemonData.sprite.url} alt={pokemonData.name} />
      )}

      {/* <img src={pokemonData.sprite2.url} alt={pokemonData.name} /> */}
    </Box>
  )
}
