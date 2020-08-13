import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { getTypeColor } from "../helper/quiz"

import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
} from "@material-ui/core"
import Img from "gatsby-image"

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
            <Img
              alt={pokemonData.name}
              fluid={pokemonData.localImage.childImageSharp.fluid}
              style={{ backgroundColor: "#F2F2F2" }}
            />
            <CardContent
              style={{
                textAlign: "center",
                padding: 0,
              }}
            >
              <Typography variant="h5" component="h3">
                {pokemonData.name.charAt(0).toUpperCase() +
                  pokemonData.name.slice(1)}
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
