import { Box, Chip, Drawer, Paper, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import { border } from '@mui/system'
import React, { useEffect, useRef } from 'react'
import classes from "./SearchDrawer.module.css";

const SearchDrawer=(props)=> {

    const searchDrawerRef = useRef(null);
    const showSearchDrawer = props.showSearchDrawer;
    const setShowSearchDrawer = props.setShowSearchDrawer;
    const recentSearchList = props.recentSearchList;

    const handleChipClick = (e)=> {
        console.log("Chip is clicked!");
    }

    useEffect(()=>{
        const removeComponentOnOutsideClick=(event)=>{
            if(searchDrawerRef.current && !searchDrawerRef.current.contains(event.target))
                setShowSearchDrawer(false);
        }

        document.addEventListener("mousedown", removeComponentOnOutsideClick);
        return ()=>{
            document.removeEventListener("mousedown",removeComponentOnOutsideClick)
        }
    },[])

  return (
    <Paper
        ref={searchDrawerRef}
        elevation={6}
        sx= {{
            position: "absolute",
            background : "white",
            width: "100%",
            borderRadius : "2px",
            top: "57px",
            py: "8px",
        }}
        className={classes.animatedDrawer}
    >
        <Box>
            {recentSearchList.map((recentSearch, index)=>
                <Chip 
                label={recentSearch}
                key={index}
                variant='outlined'
                sx={{
                    m: "8px",
                    "&:hover": {
                        background: grey[200],
                    },
                    cursor: "pointer"
                    
                }}
                onClick={handleChipClick}
                
                />
            )}
        </Box>
    </Paper>
  )
}

export default SearchDrawer