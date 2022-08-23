import useNewSubForm from "../hooks/useNewSubForm";
import {Sub} from '../types';


interface FormProps {
  onNewSub: (newSub: Sub) => void
}

const Form = ({onNewSub}: FormProps) => {

  const [inputValues, dispatch] = useNewSubForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNewSub(inputValues)
    handleClear()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    dispatch({
      type: 'change_value',
      payload: {
        inputName: name,
        inputValue: value
      }
    })
  }

  const handleClear = () => {
    dispatch({ type: 'clear'})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputValues.nick} type='text' name='nick' placeholder='nick'/>
        <input onChange={handleChange} value={inputValues.subMonths} type='number' name='subMonths' placeholder='subMonths'/>
        <input onChange={handleChange} value={inputValues.avatar} type='text' name='avatar' placeholder='avatar'/>
        <textarea onChange={handleChange} value={inputValues.description} name='description' placeholder='description'/>
        <button onClick={handleClear} type="button">Clear the form!</button>
        <button type="submit">Save new sub!</button>
      </form>
    </div>
  )
}

export default Form;