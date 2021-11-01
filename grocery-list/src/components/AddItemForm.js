import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//form for adding/editing a grocery list item
class AddItemForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: this.props.name || "", //item name
            notes: this.props.notes || "", //item notes
            quantity: this.props.quantity || "",//item quantity
            unit: this.props.unit || "" //item unit
        }
      }
    
    render() {
        const {name, notes, quantity, unit} = this.state
        return (
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 },
                padding: "20px"
              }}
            >
                <TextField
                    required
                    id="new-name"
                    label="Name (Required)"
                    fullWidth = {true}
                    defaultValue={name}
                    onChange={(e) => {this.setState({name:e.target.value})}}
                />
                <Grid container columns={2} spacing={2}>
                    <Grid item xs>
                        <TextField
                            required
                            id="new-quantity"
                            label="Quantity (Required)"
                            type="number"
                            fullWidth = {true}
                            defaultValue={quantity}
                            onChange={(e) => {this.setState({quantity:e.target.value})}}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="outlined-required"
                            label="Unit"
                            placeholder="lb, kg, boxes ...etc."
                            fullWidth = {true}
                            defaultValue={unit}
                            onChange={(e) => {this.setState({unit:e.target.value})}}
                        />
                    </Grid>
                </Grid>
                <TextField
                    multiline={true}
                    id="new-notes"
                    label="Notes"
                    placeholder="write down any additional notes"
                    fullWidth = {true}
                    minRows="3"
                    defaultValue={notes}
                    onChange={(e) => {this.setState({notes:e.target.value})}}
                />
                <ButtonGroup fullWidth={true}>
                    <Button color="warning" onClick={this.props.closeForm}>Cancel</Button>
                    <Button color="success" onClick={() => {this.props.submitForm(name, quantity, unit, notes)}}>
                        {this.props.submitText || "Add"}
                    </Button>
                </ButtonGroup>
            </Box>
          );
    }
}

export default AddItemForm;


