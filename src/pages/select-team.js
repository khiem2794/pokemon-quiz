import React, { useContext, useState } from "react"
import { graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GenerationsTabs from "../components/generations-tabs"
import PokemonTeam from "../components/pokemon-team"
import {
  Button,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
} from "@material-ui/core"
import { PokemonContext } from "../context/context"

const SelectTeam = ({ data }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false)
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
      setOpenBackdrop(true)
      setTimeout(() => navigate("/move-quiz"), 100)
    }
  }

  return (
    <Layout>
      <SEO title="Select team" />
      <Backdrop open={openBackdrop} style={{ zIndex: 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item xs={12} style={{ textAlign: "center", paddingBottom: 10 }}>
        <Typography variant="h3" component="h3">
          Pick pokemons for your team
        </Typography>
      </Grid>
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <GenerationsTabs generations={generations} />
      </Grid>
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <Grid
          item
          style={{ textAlign: "center", paddingBottom: 15, paddingTop: 15 }}
        >
          <Button
            variant="contained"
            onClick={e => onClick(e)}
            color="primary"
            disabled={pokemonState.team.length === 0}
          >
            START QUIZ
          </Button>
        </Grid>
        <PokemonTeam onPokemonClick={removePokemon} />
        {pokemonState.team.length > 0 && (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ paddingTop: 25 }}
          ></Grid>
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
            sprite {
              url
            }
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
