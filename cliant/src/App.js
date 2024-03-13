import './App.css';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles} from '@material-ui/core/styles'

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


const customer = [{
  'id' : 1,
  'image' : 'https://picsum.photos/id/1/200/150',
  'name' : '홍길동',
  'birthday' : '950117',
  'gender' : '남자',
  'job' : '대학생'
},
{
  'id' : 2,
  'image' : 'https://picsum.photos/id/2/200/150',
  'name' : '백재근',
  'birthday' : '950117',
  'gender' : '남자',
  'job' : '백수'
},
{
  'id' : 3,
  'image' : 'https://picsum.photos/id/3/200/150',
  'name' : '이도한',
  'birthday' : '950117',
  'gender' : '남자',
  'job' : '개발자'
}]

function App(props) {
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
          { customer.map(c => {return( <Customer key =  {c.id} id = {c.id} name = {c.name} image = {c.image} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> )})}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
