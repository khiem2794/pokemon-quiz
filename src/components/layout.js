import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Appbar from "./appbar"

const Layout = ({ children }) => {
  return (
    <div>
      <Grid
        container
        style={{
          padding: "5px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        {children}
      </Grid>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
