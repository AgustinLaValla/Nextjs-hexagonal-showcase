import React from 'react'
import { Box, Card, CardActionArea, CardContent, Grid, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '@/domain/models';

type Props = {
  todos: Todo[];
  toggleComplete: (todo: Todo) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
}


export const TodoList: React.FC<Props> = ({ todos, removeTodo, toggleComplete }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        {
          todos.map(todo => (
            <Grid
              item
              sm={12}
              md={6}
              lg={4}
              onClick={() => toggleComplete(todo)} key={todo.id}
            >
              <Card sx={{ position: 'relative' }}>

                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" sx={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                      {todo.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <IconButton
                  sx={{ position: 'absolute', top: '4px', right: '8px' }}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    removeTodo(todo.id)
                  }}
                >
                  <DeleteIcon color="warning" />
                </IconButton>

              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}
