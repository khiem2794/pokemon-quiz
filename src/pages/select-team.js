import React, { useContext } from "react"
import { graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GenerationsTabs from "../components/generations-tabs"
import PokemonTeam from "../components/pokemon-team"
import { Button, Grid } from "@material-ui/core"
import { PokemonContext } from "../context/context"

const SelectTeam = ({ data }) => {
  const generations = data.allGeneration.edges.map(node => {
    return {
      generation: node.node.generation,
      pokemons: node.node.childrenPokemon.sort((a, b) => {
        return a.index - b.index
      }),
    }
  })
  const { pokemonState, startQuiz, removePokemon } = useContext(PokemonContext)
  const onClick = e => {
    if (pokemonState.team.length > 0) {
      startQuiz()
      navigate("/move-quiz")
    }
  }

  return (
    <Layout>
      <SEO title="Select team" />
      <Grid item xs={12}>
        <GenerationsTabs generations={generations} />
      </Grid>
      <Grid item xs={12}>
        <PokemonTeam onPokemonClick={removePokemon} />
        <Button variant="contained" onClick={e => onClick(e)}>
          START QUIZ
        </Button>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  {
    allGeneration {
      edges {
        node {
          generation
          childrenPokemon {
            name
            index
            sprite
            types {
              type {
                name
              }
            }
          }
        }
      }
    }
  }
`

export default SelectTeam
