import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // 화면 전체 높이
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  table: {
    minWidth: 1080,
  },
});

function App(props) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const body = await response.json();
        setCustomers(body);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const { classes } = props;

  if (loading) {
    return (
      <Paper className={classes.root}>
        <CircularProgress className={classes.progress} />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper className={classes.root}>
        <div>Error: {error}</div>
      </Paper>
    );
  }

  return (
    <Paper>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(customer => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>
                <img src={customer.image} alt={customer.name} />
              </TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.birthday}</TableCell>
              <TableCell>{customer.gender}</TableCell>
              <TableCell>{customer.job}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
