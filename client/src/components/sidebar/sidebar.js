import React from 'react'
import {List, ListItemIcon, ListItemText, ListItem, CardHeader} from '@material-ui/core';
import MovieFilterOutlinedIcon from '@material-ui/icons/MovieFilterOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import SportsBasketballOutlinedIcon from '@material-ui/icons/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import './sidebar.css'
import {useHistory} from 'react-router-dom'

const Sidebar = () => {
    const history = useHistory();
    const home = () => history.push('/')
   
    return(
        <div className='sidebar-container'>
        <CardHeader title="Rooms"/>
            <List >
                <ListItem button onClick={() =>
                    {localStorage.setItem('room','messages')
                    home()}}>
                    <ListItemIcon>
                        <EmojiEmotionsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="General" />
                </ListItem>
                <ListItem button onClick={() =>
                    {localStorage.setItem('room','Education')
                    home()}}>
                    <ListItemIcon >
                        <MenuBookOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Education" />
                </ListItem>
                <ListItem button onClick={() =>
                    {localStorage.setItem('room','Gaming')
                    home()}}>
                    <ListItemIcon>
                        <SportsEsportsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gaming" />
                </ListItem>
                <ListItem button onClick={() =>
                    {localStorage.setItem('room','Sports')
                    home()}}>
                    <ListItemIcon>
                        <SportsBasketballOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sports" />
                </ListItem>
                <ListItem button onClick={() =>
                    {localStorage.setItem('room','Entertainment')
                    home()}}>
                    <ListItemIcon>
                        <MovieFilterOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Entertainment" />
                </ListItem>
                <ListItem button onClick={() =>
                    {localStorage.setItem('room','News')
                    home()}}>
                    <ListItemIcon>
                        <LanguageOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="News" />
                </ListItem>
            </List>
        </div>
        
    )
    
}



export default Sidebar