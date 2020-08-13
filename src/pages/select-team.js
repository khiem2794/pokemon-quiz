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
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <GenerationsTabs generations={generations} />
      </Grid>
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <h2>Your pokemons</h2>
        <PokemonTeam onPokemonClick={removePokemon} />
        {pokemonState.team.length > 0 && (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ paddingTop: 25 }}
          >
            <Grid item style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={e => onClick(e)}
                color="primary"
              >
                START QUIZ
              </Button>
            </Grid>
          </Grid>
        )}
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
            id
            index
            name
            types
            sprite2 {
              url
            }
            localImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default SelectTeam
