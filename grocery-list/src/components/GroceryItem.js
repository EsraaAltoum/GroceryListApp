import * as React from 'react';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import InfoIcon from '@mui/icons-material/Info';
import { Icon } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AddItemForm from './AddItemForm'


class GroceryItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false, //boolean indicating whether item details are shown (open) or hidden (closed)
            purchased: this.props.item.purchased, //boolean indicating whether item has been purchsed or not
            editing: false, //boolean indicating if item is currently being edited or not
        }
      }

    //function that calls the api to submit updates to an item after editing
    editItem = (name, quantity, unit, notes) => {
        this.props.editItem(this.props.item.id, name, quantity, unit, notes)
        this.setState({editing: false})
    }

    render() {
        const {open, purchased, editing} = this.state
        const item = this.props.item

        //defining what data is displayed in item details
        const itemDetails = [
            { icon: <InfoIcon />, label: "Notes: " + (item.notes  && item.notes !== '' ? item.notes : "N/A")},
            { icon: <InfoIcon />, label: "Quantity: " + item.quantity },
            { icon: <InfoIcon />, label: "Unit: " + item.unit },
          ];

        //if item is being edited (which means it cannot be already purchased) show the editing view
        if(editing && !purchased) {
            return <AddItemForm {...{name: item.name, notes: item.notes, quantity: item.quantity, unit: item.unit}} 
                        closeForm={()=>{this.setState({editing: false})}}
                        submitForm={this.editItem}
                        submitText="Update"/>
        }
        //else display the item information
        else {
            return (
                <Box
                sx={{
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open ? 2 : 0,
                }}
            >
                <ListItemButton
                alignItems="flex-start"
                onClick={() => {this.setState({open: !open})}}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                }}
                >
                {//if item has been purchased show a filled checkbox, otherwise show a blank checkbox
                purchased ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>
                }
                <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    }}
                    secondary={open ? "" : item.quantity + " " + item.unit}
                    secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    }}
                />
                <KeyboardArrowDown
                    sx={{
                    opacity: 1,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                    }}
                />
                </ListItemButton>
                {//once item has been clicked, open accordion and show item details
                open &&
                <div>
                    {
                    itemDetails.map((item) => (
                    <ListItemButton key={item.label}>
                        <ListItemIcon sx={{ color: 'inherit' }}>
                        {item.icon}
                        </ListItemIcon>
                        <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
                <ButtonGroup variant="outlined" fullWidth={true}>
                    {//if item hasn't already been purchased, show purchase button
                    !purchased && <Button color="success" onClick={(e) => {
                        this.props.purchaseItem(item.id)
                        this.setState({purchased: true})
                        }}>Purchase</Button>}
                    {//if item hasn't already been purchased, show the edit buton
                    !purchased && <Button color="warning" onClick={()=>{this.setState({editing: true})}}>Edit</Button>}
                    <Button color="error" onClick={() => {this.props.deleteItem(item.id)}}>Remove</Button>
                </ButtonGroup>
                </div>
                }
            </Box>
            );
        }
    }
}

export default GroceryItem;
