import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Checkbox } from "@mui/material";
import { List } from "@mui/material";
import { Typography } from "@mui/material"
import { Send } from "@mui/icons-material"
import { isHoliday, days } from "../tools/Somedays"

const candidate = Array(14);
for(let i = 0; i < candidate.length; i++){
    candidate[i] = new Date();
    candidate[i].setDate(candidate[i].getDate()+i+1)
    if(isHoliday(candidate[i])){
        candidate[i].setHours(9)
    } else {
        candidate[i].setHours(17)
    }
}

export const Preservation = () => {
    const handleSubmit = () => {
        console.log("送信されました。")
    }
    return(
        <>
        <Typography variant="h4">オンライン自習室予約フォーム</Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
            {candidate.map((cand) => {
                const year = cand.getFullYear();
                const month = cand.getMonth()+1;
                const date = cand.getDate();
                const day = cand.getDay();
                const start = cand.getHours();
                const end = start+2
                const str = `${year}/${month}/${date} (${days[day]}) ${start}:00 ~ ${end}:00`;
                return(
                <ListItem key={date} disablePadding sx={{ml: '35%'}}>
                    <ListItemIcon> <Checkbox /> </ListItemIcon>
                    <ListItemText primary={str} />
                </ListItem>
                )
            })}
        </List>
        <Box margin="0.5em">
            <Button
            color="primary"
            variant="contained"
            endIcon={<Send />}
            onClick={handleSubmit}
            >
            送信
            </Button>
        </Box>
        </>
    )
}