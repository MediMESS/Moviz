import React, { Component } from "react";
import { IconButton, Grid, Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import "common/Signed.css";
import { MovizCard } from "./components";
import { SearchToolbar } from "components";
import { data } from "./data";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  paper: {
    transition: ".2s transform",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)"
    }
  }
});

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel"
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      products: data
    };
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    if (value === "") {
      // this.setState({products: data})
      return data;
    }
    // fetch('https://moviz-backend.herokuapp.com/', {
    //   method: 'post',
    //   headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify({
    //     input: value
    //   })
    // })
    //   .then(prom => prom.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({products: data});
    //   });

    // this.setState({
    //   products: data.filter(d=>{
    //     return d.title.toLowerCase().includes(value)
    //   })
    // });
    // return this.state.products
    return data.filter(d => {
      return d.title.toLowerCase().includes(value.toLowerCase());
    });
  };
  render() {
    const { classes } = this.props;
    // console.log("THIS PROPS", this.props);

    return (
      <div className={classes.root}>
        <SearchToolbar getSuggestions={this.getSuggestions} options={options} />
        <div className={classes.content}>
          <Grid container spacing={3}>
            {this.state.products.map(product => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={4}
                sm={6}
                xs={12}
                className={classes.paper}
              >
                <MovizCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.pagination}>
          <Typography variant="caption">1-6 of 20</Typography>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
