import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Checkbox,
  Input,
  InputLabel,
  FormControl,
  Select,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  IconButton,
  Collapse,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { getData } from "./utils/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [resType, setResType] = React.useState("");
  const [res, setRes] = React.useState([{}]);
  const [output, setOutput] = React.useState([""]);
  const [state, setState] = React.useState<{
    type: string;
    input: string;
    checked: boolean;
  }>({
    type: "people",
    input: "",
    checked: false,
  });

  const nameList = (res: any) => (
    <List component="nav" className={classes.root}>
      {res !== undefined &&
        res.map((element: any, index: any) => (
          <div key={index.toString()}>
            <ListItem button onClick={handleClick}  dense>
              <ListItemText primary={element.name} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText primary={element.hair_color} />
                  <ListItemText primary={element.gender} />
                  <ListItemText primary={element.height} />
                </ListItem>
              </List>
            </Collapse>
          </div>
        ))}
    </List>
  );

  const handleClick = () => {
    setOpen(!open);
  };
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setResType(state.type);
    const res = await getData(state.type, state.input, state.checked);
    setRes(res);
  };

  // React.useEffect(() => {
  //   if (res.length !== 0 && res !== [{}]) {
  //     let data: string[] = [];
  //     for (let i = 0; i < res.length; i++) {
  //       if (Object.values(res[i])[0] !== "") {
  //         data.push(Object.values(res[i])[0] as string);
  //       }
  //     }
  //     setOutput(data);
  //   }
  //   console.log(res);
  // }, [res]);

  return (
    <div className="App">
      <header className="App-header">
        <Box component="span" m={6}>
          <Grid>
            <form onSubmit={handleSubmit}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type-select">Type</InputLabel>
                <Select
                  native
                  value={state.type}
                  onChange={handleChange}
                  inputProps={{
                    name: "type",
                    id: "type-select",
                  }}
                >
                  <option value={"people"}>People</option>
                  <option value={"films "}>Films</option>
                  <option value={"planets "}>Planets</option>
                  <option value={"species "}>Species</option>
                  <option value={"starships "}>Starships</option>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type-select">Search</InputLabel>
                <Input
                  type="string"
                  required
                  value={state.input}
                  inputProps={{
                    name: "input",
                    id: "search-input",
                  }}
                  onChange={handleChange}
                ></Input>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Checkbox
                  checked={state.checked}
                  onChange={handleCheck}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </FormControl>

              <FormControl>
                <Button type="submit">search</Button>
              </FormControl>
            </form>
          </Grid>
        </Box>
      </header>
      <div>
        <ul>{output.length > 0 ? nameList(res) : ""}</ul>
      </div>
    </div>
  );
}

export default App;
