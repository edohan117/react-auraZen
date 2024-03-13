import './App.css';
import Customer from './components/Customer'

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

function App() {
  return (
    <div>
      { customer.map(c => {return( <Customer key =  {c.id} id = {c.id} name = {c.name} image = {c.image} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> )})}
    </div>
  );
}

export default App;
