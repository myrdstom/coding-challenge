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
import { colorMapping, columns } from "../utils/enums";
import { StyledTableRow, StyledTableCell, useStyles } from "./tableStyles";

const CustomizedTables = () => {
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

  const handleDotColor = key => {
    return colorMapping[key];
  };

  const getStatusColor = (applications = []) => {
    const test = applications.sort((a, b) => a.id - b.id)[0].new_status.color;
    return colorMapping[test];
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
              {
                columns.map(column =>(
                    <StyledTableCell align="left">
                      {column}
                      <ExpandMoreIcon />
                    </StyledTableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {candidateData.results.map(candidate => (
              <>
                <StyledTableRow key={candidate.id}>
                  <StyledTableCell>
                    <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />
                  </StyledTableCell>
                  <StyledTableCell align="left">{candidate.name}</StyledTableCell>
                  <StyledTableCell align="left">
                    {" "}
                    <span className={classes.dot} style={{ backgroundColor: getStatusColor(candidate.applications) }} />
                    {getStatus(candidate.applications)}
                  </StyledTableCell>
                  <StyledTableCell align="left">{candidate.applications.length}</StyledTableCell>
                  <StyledTableCell align="left">{moment(candidate.profile.updated).fromNow()}</StyledTableCell>
                  <StyledTableCell align="left">
                    {candidate.id === selected ? (
                      <MinusSign
                        onClick={() => setSelected(candidate.id === selected ? null : candidate.id)}
                        className={classes.cursor}
                      />
                    ) : (
                      <PlusSign
                        onClick={() => setSelected(candidate.id === selected ? null : candidate.id)}
                        className={classes.cursor}
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
                          <span
                            className={classes.dot}
                            style={{ backgroundColor: handleDotColor(application.new_status.color) }}
                          />
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
};

export default CustomizedTables;
