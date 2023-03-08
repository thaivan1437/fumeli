import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './logic/action'
import { Container } from '@mui/material'

export default function Home() {
  const counter = useSelector((state) => state.reducerExample)
  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleDecrement = () => {
    dispatch(decrement())
  }

  return (
    <Container>
      <h1 className="test">Counter: {counter.count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </Container>
  )
}
