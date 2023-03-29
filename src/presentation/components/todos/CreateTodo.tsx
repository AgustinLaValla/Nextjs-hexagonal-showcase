import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Todo } from '@/domain/models'

type Props = {
  addTodo: (description: string) => Promise<void>
}

export const CreateTodo: React.FC<Props> = ({ addTodo }) => {

  const [showInput, setShowInput] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const onEnter = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (!inputValue) return;
    if (ev.key === 'Enter') {
      addTodo(inputValue).then(() => setInputValue(''))
    }
  }

  React.useEffect(() => {
    const onEscape = (ev: KeyboardEvent) => ev.key === 'Escape' && setShowInput(false)

    window.addEventListener('keyup', onEscape);

    return () => window.removeEventListener('keyup', onEscape);
  }, [])

  if (!showInput) return (
    <Button sx={{ marginBottom: '2rem' }} variant='contained' onClick={() => setShowInput(true)}>
      Add New Todo
    </Button>
  )

  return (
    <Box sx={{ marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
      <TextField
        fullWidth
        style={{ marginRight: '2rem' }}
        onKeyUp={onEnter}
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
      />
      <Button variant='contained' onClick={() => setShowInput(false)}>
        Cancel
      </Button>
    </Box>
  )
}
