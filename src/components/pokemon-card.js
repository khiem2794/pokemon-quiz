import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"
import { getTypeColor } from "../helper/quiz"

import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: 75,
    },
    [theme.breakpoints.up("sm")]: {
      width: 90,
    },
    [theme.breakpoints.up("md")]: {
      width: 125,
    },
    [theme.breakpoints.up("lg")]: {
      width: 150,
    },
    [theme.breakpoints.up("xl")]: {
      width: 200,
    },
  },
}))

const PokemonCard = ({ pokemonData, isSelected }) => {
  const classes = useStyles()

  return (
    <div>
      <Grid
        style={{ border: isSelected ? "3px solid green" : "3px solid white" }}
      >
        <Grid item xs={12} className={classes.root}>
          <Card square={true}>
            <CardActionArea>
              <Grid
                container
                justify="center"
                style={{
                  backgroundColor: "#F2F2F2",
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
                <Typography variant="caption">
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
                      xs={12}
                      sm={12}
                      md={12 / pokemonData.types.length}
                      style={{
                        padding: 3,
                        textAlign: "center",
                        backgroundColor: getTypeColor(t),
                      }}
                    >
                      <Typography variant="caption">
                        {t.toUpperCase()}
                      </Typography>
                    </Grid>
                  )
                })}
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default PokemonCard
