import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "0 50px"
  },
  table: {
    minWidth: 700
  },
  gridContainerHeader: {
    width: "100%",
    marginBottom: "20px"
  },
  textField: {
    width: "100%"
  },
  searchIcon: {
    height: "100%",
    backgroundColor: "#2EB88C",
    padding: "0 20px"
  },
  cursor: {
    cursor: "pointer"
  },
  accordion: {
    width: "100%"
  },
  gridContainerAccordion: {
    width: "100%"
  },
  expand: {
    paddingTop: "20px"
  },
  dot: {
    height: "10px",
    width: "10px",
    backgroundColor: ({ color }) => `2px solid ${color}`,
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "5px"
  }
});

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);
