import React, { useContext } from "react"
import SelectPokemonBox from "../components/select-pokemon-box"
import { PokemonContext } from "../context/context"
import { Grid } from "@material-ui/core"

export default function PokemonTeam() {
  const {
    pokemonState: { team },
  } = useContext(PokemonContext)
  return (
    <div>
      <h2>YOUR TEAM</h2>
      <Grid container>
        {team.map(pokemon => {
          return (
            <Grid item xs={2}>
              <SelectPokemonBox
                pokemonData={{ ...pokemon }}
                key={pokemon.index}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
