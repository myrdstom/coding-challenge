import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import {
  Table,
  TableBody,
  TextField,
  Grid,
  Container,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Modal } from "../ui-kit";
import { MinusSign, PlusSign, RightCaret, SearchIcon } from "../ui-kit/icons";
import candidateData from "../data/candidates.json";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
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
  cusrsor: {
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
  }
});

export default function CustomizedTables() {
  const classes = useStyles();

  const getStatus = (applications = []) => {
    return applications.sort((a, b) => a.id - b.id)[0].new_status.label;
  };

  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState({});

  const handleClickApplication = data => {
    setIsOpen(true);
    setSelectedApplicant(data);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedApplicant({});
  };

  return (
    <Container className={classes.root}>
      <div className={classes.gridContainerHeader}>
        <Grid container>
          <Grid item xs={9}>
            {candidateData.count} Candidates
          </Grid>
          <Grid item xs={3}>
            Clear All filters
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10}>
            <TextField
              className={classes.textField}
              id="filled-error-helper-text"
              placeholder="Search by Candidate Or Keyword"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <SearchIcon className={classes.searchIcon} />
          </Grid>
        </Grid>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />
              </StyledTableCell>
              <StyledTableCell align="right">
                Candidate Name
                <ExpandMoreIcon />
              </StyledTableCell>
              <StyledTableCell align="right">
                Status
                <ExpandMoreIcon />
              </StyledTableCell>
              <StyledTableCell align="right">
                # Apps
                <ExpandMoreIcon />
              </StyledTableCell>
              <StyledTableCell align="right">
                Last Action
                <ExpandMoreIcon className={classes.expand} />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidateData.results.map(candidate => (
              <>
                <StyledTableRow key={candidate.id}>
                  <StyledTableCell>
                    <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />
                  </StyledTableCell>
                  <StyledTableCell align="right">{candidate.name}</StyledTableCell>
                  <StyledTableCell align="right">{getStatus(candidate.applications)}</StyledTableCell>
                  <StyledTableCell align="right">{candidate.applications.length}</StyledTableCell>
                  <StyledTableCell align="right">{moment(candidate.profile.updated).fromNow()}</StyledTableCell>
                  <StyledTableCell align="right">
                    {candidate.id === selected ? (
                      <MinusSign
                        onClick={() => setSelected(candidate.id === selected ? null : candidate.id)}
                        className={classes.cusrsor}
                      />
                    ) : (
                      <PlusSign
                        onClick={() => setSelected(candidate.id === selected ? null : candidate.id)}
                        className={classes.cusrsor}
                      />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
                {candidate.id === selected && (
                  <div className={classes.accordion}>
                    {candidate.applications.map(application => (
                      <Grid
                        container
                        spacing={3}
                        onClick={() => handleClickApplication({ ...candidate, application })}
                        className={classes.gridContainerAccordion}
                      >
                        <Grid item xs={4}>
                          <span>{application.role.title}</span>
                        </Grid>
                        <Grid item xs={4}>
                          <span>{application.new_status.label}</span>
                        </Grid>
                        <Grid item xs={4}>
                          <RightCaret />
                        </Grid>
                      </Grid>
                    ))}
                  </div>
                )}
              </>
            ))}
            <Modal.Modal isOpen={isOpen} onClose={handleClose}>
              <Modal.Title>Applicant Name: {selectedApplicant.name}</Modal.Title>
              <Modal.Body>
                <p>Applicant Email: {selectedApplicant.email}</p>
                <p>Title: {selectedApplicant?.application?.role?.title}</p>
                <p>JobBoard Title: {selectedApplicant?.application?.role?.jobboard_title}</p>
                <p>Status: {selectedApplicant?.application?.new_status?.label}</p>
              </Modal.Body>
              <Modal.Actions>
                <button onClick={handleClose}>Close</button>
              </Modal.Actions>
            </Modal.Modal>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
