import { Typography, Paper } from "@material-ui/core"

export const SideBlock = ({title, children}) => {
    return (
        <Paper>
            <Typography variant="h6">{title}</Typography>
            {children}
        </Paper>
    )
}