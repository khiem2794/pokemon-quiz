import React, { useContext } from "react"
import PokemonCard from "../components/pokemon-card"
import { PokemonContext } from "../context/context"
import { Grid } from "@material-ui/core"

export default function PokemonTeam({ onPokemonClick, answers }) {
  const {
    pokemonState: { team },
  } = useContext(PokemonContext)
  return (
    <div>
      <Grid container>
        {team.map(pokemon => {
          return (
            <Grid item xs={6} xm={4} md={4} lg={2} xl={2} key={pokemon.id}>
              <Grid container justify="center" spacing={2}>
                <Grid item onClick={e => onPokemonClick(pokemon)}>
                  <PokemonCard
                    pokemonData={{ ...pokemon }}
                    isSelected={
                      answers !== undefined && answers.includes(pokemon.index)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
