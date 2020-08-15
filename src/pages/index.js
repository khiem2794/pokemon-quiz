import React, { useContext, useEffect, useState } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { PokemonContext } from "../context/context"
import { Grid, Typography, Backdrop, CircularProgress } from "@material-ui/core"

const IndexPage = () => {
  let playerName = ""
  const { registerPlayer, resetState } = useContext(PokemonContext)
  const [openBackdrop, setOpenBackdrop] = useState(false)

  useEffect(() => {
    resetState()
  }, [])

  const onClick = () => {
    if (playerName.length > 0) {
      registerPlayer({ name: playerName })
      setOpenBackdrop(true)
      setTimeout(() => navigate("/select-team"), 100)
    }
  }

  const onChange = e => {
    playerName = e.target.value
  }

  const onKeyDown = e => {
    if (e.key === "Enter") {
      onClick()
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Backdrop open={openBackdrop} style={{ zIndex: 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        xl={4}
        style={{ textAlign: "center", paddingTop: 200 }}
      >
        <Typography variant="h3" style={{ paddingBottom: 15 }}>
          Enter your name
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic"
              label="Player Name"
              onChange={e => onChange(e)}
              onKeyDown={e => onKeyDown(e)}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ padding: 15 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={e => onClick()}
            >
              ACCEPT
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
