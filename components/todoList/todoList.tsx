import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useRouter } from 'next/router';
import TodoType from '../../types/todo';

const useStyles = makeStyles({
  container: {
    padding: 16,
  },
});

type Props = {
  todoList: TodoType[];
  deleteTodo: Function;
  updateTodoStatus: Function;
};

const TodoList = ({ todoList = [], deleteTodo, updateTodoStatus }: Props) => {
  const classes = useStyles();
  const router = useRouter();

  const handleDelete = (todo: TodoType) => {
    const answer = confirm('Are you sure you want to delete this post?');
    if (!answer) return;
    deleteTodo(todo.slug);
  };

  const handleChangeStatus = (todo: TodoType) => {
    todo.todoStatus = todo.todoStatus === 'done' ? 'unfinished' : 'done';
    updateTodoStatus(todo);
  };

  return (
    <Container className={classes.container} maxWidth="md">
      {!todoList.length ? (
        <Typography variant="h6" color="error">
          No Data to display
        </Typography>
      ) : (
        <List>
          {todoList.map((todo) => {
            return (
              <ListItem key={todo.slug} button>
                <ListItemIcon>
                  <IconButton
                    edge="end"
                    aria-label="change status"
                    onClick={() => handleChangeStatus(todo)}
                  >
                    {todo?.todoStatus === 'done' ? (
                      <CheckCircleIcon color="primary" />
                    ) : (
                      <RadioButtonUncheckedIcon color="secondary" />
                    )}
                  </IconButton>
                </ListItemIcon>

                <ListItemText primary={todo?.todoTitle} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => router.push(`/${todo.slug}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(todo)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      )}
    </Container>
  );
};

export default TodoList;
