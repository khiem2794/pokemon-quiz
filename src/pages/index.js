import React, { useContext } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { PokemonContext } from "../context/context"
import { Grid } from "@material-ui/core"

const IndexPage = () => {
  let playerName = ""
  const { registerPlayer } = useContext(PokemonContext)

  const onClick = e => {
    if (playerName.length > 0) {
      registerPlayer({ name: playerName })
      navigate("/select-team")
    }
  }

  const onChange = e => {
    playerName = e.target.value
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <TextField
                id="standard-basic"
                label="Player Name"
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <Button variant="contained" onClick={e => onClick(e)}>
                PICKING TEAM
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Layout>
  )
}

export default IndexPage
