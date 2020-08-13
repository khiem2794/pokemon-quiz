import React from "react"
import { getTypeColor } from "../helper/quiz"
import { Typography, Grid, Paper, Hidden } from "@material-ui/core"

export default function PokemonMoveCard({ moveData }) {
  return (
    <Paper square={true} elevation={15}>
      <Grid container>
        <Grid item sm={8}>
          <Grid container>
            <Grid item xs={4}>
              <Paper
                square={true}
                style={{ backgroundColor: getTypeColor(moveData.type) }}
              >
                <Typography variant="h5" component="h5">
                  <b>{moveData.type.toUpperCase()}</b>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper square={true} style={{ backgroundColor: "#dad6d6" }}>
                <Typography variant="h5" component="h5">
                  <b>{moveData.name}</b>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "left", padding: 10 }}>
              <Typography variant="h5" component="h5">
                {moveData.flavorText}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Hidden xsDown>
          <Grid item sm={4} style={{ border: "3px solid black" }}>
            <Grid
              container
              style={{ textAlign: "center", borderBottom: "3px solid black" }}
            >
              <Grid item xs={6}>
                <Typography variant="h5" component="h5">
                  Category
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" component="h5">
                  {moveData.category.toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ borderBottom: "3px solid black" }}>
              <Grid item xs={6}>
                <Typography variant="h5" component="h5">
                  Accuracy
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" component="h5">
                  {moveData.accuracy}
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ borderBottom: "3px solid black" }}>
              <Grid item xs={6}>
                <Typography variant="h5" component="h5">
                  Power
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" component="h5">
                  {moveData.power}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h5" component="h5">
                  PP
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <Typography variant="h5" component="h5">
                  {moveData.pp}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  )
}
