import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

import GroceryItem from './GroceryItem'
import AddItemForm from './AddItemForm'

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import {addItem, getGroceryList, deleteItem, purchaseItem, editItem} from '../api'


//grocery list component
class GroceryList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          isAddingItem: false, //boolean variable to toggle the add item form
          items: [], //list of grocery items
        }
      }
    //when component loads, retrieves grocery list items 
    componentDidMount() {
        getGroceryList()
        .then((data) => {
            this.setState({items: data})
        })
    } 
    
    //closes add item form 
    closeForm = () => {
        this.setState({isAddingItem: false})
    }

    //submits new item form to api and retrieves updated grocery list
    submitForm = async (name, quantity, unit, notes) => {
        await addItem(name, quantity, unit, notes)
        getGroceryList()
        .then((data) => {
            this.setState({
                items: data,
                isAddingItem: false
            })
        })
    }

    //calls the api to delete an item and retrieves updated grocery list
    deleteItem = async (id) => {
        await deleteItem(id)
        getGroceryList()
        .then((data) => {
            this.setState({
                items: data,
            })
        })
    }

    //marks an item as purchased and retrieves updated grocery list
    purchaseItem = async (id) => {
        await purchaseItem(id)
        getGroceryList()
        .then((data) => {
            this.setState({
                items: data,
            })
        })
    }

    //calls the api to edit an item and retrieves updated grocery list
    editItem = async (id, name, quantity, unit, notes) => {
        await editItem(id, name, quantity, unit, notes)
        getGroceryList()
        .then((data) => {
            this.setState({
                items: data,
            })
        })
    }

    render() {
        const items = this.state.items
        return (
            <Box sx={{ display: 'flex' }}>
            <ThemeProvider 
                theme={createTheme({
                components: {
                    MuiListItemButton: {
                    defaultProps: {
                        disableTouchRipple: true,
                    },
                    },
                },
                palette: {
                    mode: 'light',
                    background: { paper: '#e7eff6' },
                },
                })}
            >
                <Paper elevation={0}sx={{ width: '100%'}}>
                    <ListItem>
                    <ListItemText
                        primary="Grocery List"
                        primaryTypographyProps={{
                        fontSize: 30,
                        fontWeight: 'medium',
                        align: "center",
                        }}
                    />
                    </ListItem>
                    <Divider />
                        { 
                        //for each item in grocery list, map a grocery item component and a divider
                        items.map((item) => (
                            <>
                                <GroceryItem item={item} deleteItem={this.deleteItem} purchaseItem={this.purchaseItem} editItem={this.editItem}/>
                                <Divider/>
                            </>
                        ))
                        }
                    { //if add item button is pressed, show the add item form and hide the add item button
                    this.state.isAddingItem && <AddItemForm closeForm={this.closeForm} submitForm={this.submitForm}/>}
                    {!this.state.isAddingItem && 
                        <Button fullWidth={true} onClick={()=>{this.setState({isAddingItem: true})}}>
                            Add Item
                        </Button>
                    }
                    
                </Paper>
            </ThemeProvider>
            </Box>
        );
    }
}

export default GroceryList;
