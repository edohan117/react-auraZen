import './App.css';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles} from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'; 

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

function App(props) {
  const [customers, setCustomers] = useState(""); 

  useEffect(() => { 
    callApi()
      .then(res => setCustomers(res))
      .catch(err => console.log(err));
  }, []);

  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableRow>
          <TableCell>번호</TableCell>
          <TableCell>이미지</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>생년월일</TableCell>
          <TableCell>성별</TableCell>
          <TableCell>직업</TableCell>
        </TableRow>
        <TableBody>
        {customers ? customers.map(c => ( <Customer key={c.id} id={c.id} name={c.name} image={c.image}birthday={c.birthday} gender={c.gender} job={c.job}/>
          )) : ""}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
