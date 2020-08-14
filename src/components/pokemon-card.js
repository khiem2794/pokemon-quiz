import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"
import { getTypeColor } from "../helper/quiz"

import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
} from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: 150,
    height: "auto",
  },
})

const PokemonCard = ({ pokemonData, isSelected }) => {
  const classes = useStyles()

  return (
    <div>
      <Box border={3} borderColor={isSelected ? "green" : "white"}>
        <Card className={classes.root} square={true}>
          <CardActionArea>
            <Grid
              container
              justify="center"
              style={{
                backgroundColor: "#F2F2F2",
                height: 150,
                textAlign: "center",
              }}
            >
              {pokemonData.localImage ? (
                <Grid item xs={12}>
                  <Img
                    alt={pokemonData.name}
                    fluid={pokemonData.localImage.childImageSharp.fluid}
                  />
                </Grid>
              ) : (
                <img src={pokemonData.sprite.url} alt={pokemonData.name} />
              )}
            </Grid>
            <CardContent
              style={{
                textAlign: "center",
                padding: 0,
              }}
            >
              <Typography>
                <b>
                  {pokemonData.name.charAt(0).toUpperCase() +
                    pokemonData.name.slice(1)}
                </b>
              </Typography>
            </CardContent>
            <Grid container>
              {pokemonData.types.map(t => {
                return (
                  <Grid
                    item
                    key={pokemonData.id + "" + t}
                    xs={12 / pokemonData.types.length}
                    style={{
                      padding: 3,
                      textAlign: "center",
                      backgroundColor: getTypeColor(t),
                    }}
                  >
                    <b>{t.toUpperCase()}</b>
                  </Grid>
                )
              })}
            </Grid>
          </CardActionArea>
        </Card>
      </Box>
    </div>
  )
}

export default PokemonCard
