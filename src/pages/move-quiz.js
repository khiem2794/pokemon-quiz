import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PokemonTeam from "../components/pokemon-team"
import { Grid } from "@material-ui/core"

const MoveQuiz = () => {
  return (
    <Layout>
      <SEO title="Move quiz" />
      <Grid item xs={12} style={{ textAlign: "center" }}>
        QUESTION 1/12
      </Grid>
      <Grid item xs={12}>
        <PokemonTeam />
      </Grid>
    </Layout>
  )
}

export default MoveQuiz
