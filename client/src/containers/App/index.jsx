import React, { Component } from 'react';
import { Provider } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { store } from '../../store';

class App extends Component {
  state = { age: 2 };
  render() {
    return (
      <Provider store={store}>
        <div>
          <form>
            <TextField />
            <FormControl>
              <InputLabel htmlFor="age-simple">Lenguaje</InputLabel>
              <Select
                value={this.state.age}
                onChange={this.handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value="">Ninguno</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="python">Python</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={this.handleClick}>Boton</Button>
          </form>
        </div>
      </Provider>
    );
  }
}

export default App;
