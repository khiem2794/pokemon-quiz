import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import SelectPokemonBox from "../components/select-pokemon-box"
import { Box } from "@material-ui/core"
import { PokemonContext } from "../context/context"

const useStyles = makeStyles(theme => ({
  gridList: {
    [theme.breakpoints.only("xs")]: {
      height: 200,
    },
    [theme.breakpoints.only("sm")]: {
      height: 400,
    },
    [theme.breakpoints.only("md")]: {
      height: 420,
    },
    [theme.breakpoints.only("lg")]: {
      height: 430,
    },
    [theme.breakpoints.only("xl")]: {
      height: 440,
    },
  },
}))

export default function GenerationPokemonList({ generation, cols }) {
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
    <GridList
      className={classes.gridList}
      cellHeight="auto"
      cols={cols}
      spacing={0}
    >
      {generation.pokemons.map(pokemon => {
        return (
          <GridListTile cols={1} key={pokemon.index}>
            <Box
              border={3}
              borderColor={
                pokemonState.team.findIndex(p => p.index === pokemon.index) !==
                -1
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
  )
}
