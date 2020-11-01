import React from 'react'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import history from 'utils/history'

import styles from './UrlTable.module.scss'

const StyledTableCell = ({ children, ...rest }) => {
  return (
    <TableCell {...rest} className={styles.styled_cell}>
      {children}
    </TableCell>
  )
}

const formatDate = dateStr => new Date(dateStr).toLocaleString()

export default function UrlTable({ pages = [], loading, getPage = () => {} }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Page URL</StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Create Date</StyledTableCell>
            <StyledTableCell>Operations</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pages.map(row => (
            <TableRow key={row._id} className={styles.styled_row}>
              <TableCell
                title={row.url}
                className={styles.url_cell}
                component="th"
                scope="row"
              >
                {row.url}
              </TableCell>
              <TableCell>{row._id}</TableCell>
              <TableCell>{formatDate(row.createdAt)}</TableCell>
              <TableCell>
                <div className={styles.tableOperationContainer}>
                  <Button
                    onClick={() => {
                      history.push(`/stats/${row._id}`)
                    }}
                    className={styles.operationItem}
                    variant="contained"
                    size="small"
                    startIcon={<EqualizerIcon />}
                  >
                    Stats
                  </Button>
                  <Button
                    onClick={() => {
                      getPage(row)
                    }}
                    className={styles.operationItem}
                    variant="contained"
                    size="small"
                    startIcon={<CodeIcon />}
                  >
                    Script
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
