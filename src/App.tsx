import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card/Card';
import Button from './components/Button/Button';

interface ICard {
  id: number;
  content: string;
}

interface IForm {
  add: string;
}

function App() {
  const [cardsList, setCardsList] = useState<ICard[]>([{id: 1, content: 'text'}]);
  const [form, setForm] = useState<IForm>({
    add: "",
  });
  /*useEffect(() => {
    fetch('http://localhost:7030/notes', {
    method: "POST",
    body: JSON.stringify({
      "id": 0,
      "content": "То, что было введено в поле ввода"
    }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(res => res.status)
  .then(st => console.log(st))
  .catch(e => console.log(e))
}, [])*/

/*useEffect(() => {
  fetch('http://localhost:7030/notes/57', {
    method: "DELETE",
  })
  .then(res => res.status)
  .then(st => console.log(st))
  .catch(e => console.log(e))
}, [])*/

    const updateHandler = () => {
      fetch('http://localhost:7030/notes')
        .then(res => res.json())
        .then(result => {
          setCardsList([...result]);
          console.log('updated');
        })
        .catch(e => console.log(e))
    }
  
    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      fetch('http://localhost:7030/notes', {
        method: "POST",
        body: JSON.stringify({
          "content": form.add
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(res => res.status)
      .then(st => console.log(st))
      .catch(e => console.log(e))

      fetch('http://localhost:7030/notes')
        .then(res => res.json())
        .then(result => setCardsList([...result]))
        .catch(e => console.log(e))
      
      setForm({add: ""});
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
  
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value
      })
    )}

    const handlerDeleteCard = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button: HTMLButtonElement = e.currentTarget;
      fetch('http://localhost:7030/notes/'+button.name, {
        method: "DELETE",
      })
        .then(res => res.status)
        .then(() => {
          fetch('http://localhost:7030/notes')
            .then(res => res.json())
            .then(result => setCardsList([...result]))
        })
        .catch(e => console.log(e))
    }

  useEffect(() => {
    fetch('http://localhost:7030/notes')
    .then(res => res.json())
    .then(result => setCardsList([...result]))
    .catch(e => console.log(e))
  }, [])

  return (
    <>
      <div className='updateCard'>
        <span>Обновить карточки</span>
        {<Button className='update' btnType="button" func={updateHandler} />}
        <form className='form' onSubmit={submitFormHandler}>
          <label>
            <input name='add' type='text' placeholder='Введите текст, чтобы добавить новую карточку' value={form.add} onChange={handleChangeInput} required />
          </label>
          {<Button className='add' btnType="submit" />}
        </form>
      </div>
      <div className='blocks'>
        {cardsList.map(e => <Card key={e.id} cardId={e.id} content={e.content} func={handlerDeleteCard} />)}
      </div>
    </>
  )
}

export default App
