import React from "react"
import { Box } from "@material-ui/core"
import Img from "gatsby-image"

export default function SelectPokemonBox({ pokemonData, isSelected }) {
  return (
    <div>
      {isSelected ? (
        <Box border={1}>
          <Img
            alt={pokemonData.name}
            fluid={pokemonData.localImage.childImageSharp.fluid}
          />
          {/* <img src={pokemonData.sprite2.url} alt={pokemonData.name} /> */}
        </Box>
      ) : (
        <Box>
          <Img
            alt={pokemonData.name}
            fluid={pokemonData.localImage.childImageSharp.fluid}
          />
          {/* <img src={pokemonData.sprite2.url} alt={pokemonData.name} /> */}
        </Box>
      )}
    </div>
  )
}
