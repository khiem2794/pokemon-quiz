import React from "react"
import { navigate } from "gatsby"
import clsx from "clsx"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import HomeIcon from "@material-ui/icons/Home"
import GitHubIcon from "@material-ui/icons/GitHub"
import KeyboardIcon from "@material-ui/icons/Keyboard"
import { ClickAwayListener, Typography } from "@material-ui/core"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    position: "fixed",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
  },
}))

const Appbar = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={e => navigate("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={e => navigate("/select-team")}>
              <ListItemIcon>
                <KeyboardIcon />
              </ListItemIcon>
              <ListItemText primary="Select team" />
            </ListItem>
            <ListItem
              button
              onClick={e =>
                navigate("https://github.com/ngockhiem27/pokemon-quiz")
              }
            >
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="Github" />
            </ListItem>
            <Divider />

            <main style={{ textAlign: "justify", padding: 3 }}>
              <Typography variant="h5">About project</Typography>
              <Typography paragraph>
                Pick your team of 6 pokemon and answer which pokemons can learn
                the move in the question. This project is built using Gatsby and
                Material-ui, data is pulled from{" "}
                <a href="http://pokeapi.co" target="_blank" rel="noreferrer">
                  pokeapi
                </a>
                . You can contribute to this project via github.
              </Typography>
            </main>
          </List>
        </Drawer>
      </div>
    </ClickAwayListener>
  )
}

export default Appbar
