import { Close, Search } from '@mui/icons-material';
import {Box, InputAdornment, InputBase, styled } from '@mui/material'
import { green, grey } from '@mui/material/colors';
import React, { useState } from 'react'

const SearchArea = styled(Box);


const CustomCloseIcon = (props)=> {
    return (
        <Box
            sx= {{
                position : "absolute",
                right : "0",
                bgcolor : grey[300],
                display : "flex",
                mr : "4px",
                alignItems : "center",
                cursor: "pointer"
            }}
            onClick = {()=>props.setSearchText("")}
        >
            <Close sx={{
                fontSize : "26px"
            }}
            />
        </Box>
    )
}

const SearchIcon = (props)=> {



    return (
        <Box
            sx={{
                bgcolor: green[900],
                display: "flex",
                alignItems: "center",
                width: "45px",
                borderTopRightRadius : "4px",
                borderBottomRightRadius : "4px",
                cursor: "pointer"
            }}
            onClick = {props.setSearchText}
        >
            <Search sx={{
                    color : "white",
                    flexGrow : 1,
                    fontSize : "35px",
                    
            }}
            />
        </Box>
    )
}

const SearchBox=() =>{
    const [searchText, setSearchText] = useState("");
    const placeHolder = "Smartphones, TVs, Shirts, Watches..."
  return (
    <Box
    sx={{
        height : "100%",
        display : "flex",
        alignItem : "center",
    }}
    >
        <Box
            sx={{
                flexGrow : 1,
                display: "flex",
                alignItem: "center",
                margin : "0px 10px",
                py:"15px",
            }}
        >
            <InputBase
                sx={{
                    flexGrow : 1,
                    outlineColor: "black",
                    
                    "& .MuiInputBase-input" : {
                        bgcolor : grey[200],
                        borderRadius: "4px",
                        borderTopRightRadius : "0",
                        borderBottomRightRadius : "0",
                        padding : "5px",
                        fontSize : "22px",
                        pl: "10px",
                        outline : "black",
                        "&:focus" : {
                            boxShadow : "1px 1px 10px 1px darkgreen",
                        },
                    }
                }}
                inputProps = {{
                    "placeHolder" : placeHolder,
                }}
                value= {searchText}
                onChange={(e)=>{setSearchText(e.target.value)}}
                endAdornment = {searchText !=="" && <CustomCloseIcon setSearchText={setSearchText}/>}
            />
            <SearchIcon/>
        </Box>
        
    </Box>
  )
}

export default SearchBox