import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import SelectPokemonBox from "../components/select-pokemon-box"
import { Box } from "@material-ui/core"
import { PokemonContext } from "../context/context"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 450,
  },
}))

export default function GenerationPokemonList({ generation }) {
  const classes = useStyles()
  const { pokemonState, addPokemon, removePokemon } = useContext(PokemonContext)

  const pickPokemon = (e, pokemon) => {
    if (pokemonState.team.findIndex(p => p.index === pokemon.index) === -1) {
      if (pokemonState.team.length < 6) addPokemon(pokemon)
    } else {
      removePokemon(pokemon)
    }
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" className={classes.gridList} cols={8}>
        {generation.pokemons.map(pokemon => {
          return (
            <GridListTile cols={1} key={pokemon.index}>
              <Box
                border={3}
                borderColor={
                  pokemonState.team.findIndex(
                    p => p.index === pokemon.index
                  ) !== -1
                    ? "primary.main"
                    : "white"
                }
                onClick={e => pickPokemon(e, pokemon)}
              >
                <SelectPokemonBox pokemonData={{ ...pokemon }} />
              </Box>
            </GridListTile>
          )
        })}
      </GridList>
    </div>
  )
}
