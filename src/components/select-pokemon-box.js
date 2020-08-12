import React from "react"
import { Box } from "@material-ui/core"

export default function SelectPokemonBox({ pokemonData, isSelected }) {
  return (
    <div>
      {isSelected ? (
        <Box border={1}>
          <img src={pokemonData.sprite} alt={pokemonData.name} />
        </Box>
      ) : (
        <Box>
          <img src={pokemonData.sprite} alt={pokemonData.name} />
        </Box>
      )}
    </div>
  )
}
