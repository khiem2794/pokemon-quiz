import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function PokemonMoveCard({ moveData }) {
  const classes = useStyles()
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {moveData.name}
        </Typography>
        <Typography variant="h5" component="h2">
          TYPE: {moveData.type}
        </Typography>
        <Typography color="textSecondary">POWER: {moveData.power}</Typography>
        <Typography variant="body2" component="p">
          {moveData.flavorText}
        </Typography>
      </CardContent>
    </Card>
  )
}
