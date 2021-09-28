import { useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import TodoType from '../../types/todo';
import { slugify } from '../../utils/slugify';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  root: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  },
  button: {
    marginTop: 10,
    marginRight: 10,
  },
  textField: {
    width: 200,
  },
});

type Props = {
  todo?: TodoType;
  edit?: Boolean;
  handleTodo: Function;
};

const TodoForm = ({ todo, edit = false, handleTodo }: Props) => {
  const classes = useStyles();

  const router = useRouter();

  const [todoTitle, setTodoTitle] = useState(todo?.todoTitle ?? '');

  const [todoDueDate, setTodoDueDate] = useState(todo?.todoDueDate ?? '');

  const [todoStatus, setTodoStatus] = useState(
    todo?.todoStatus ?? 'unfinished'
  );

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoDueDate(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoStatus(e.target.value);
  };

  const resetForm = () => {
    setTodoDueDate('');
    setTodoStatus('unfinished');
    setTodoTitle('');
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleTodo({
      todoTitle,
      todoDueDate,
      todoStatus,
      slug: edit ? todo?.slug : slugify(todoTitle),
    });
    resetForm();
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <form onSubmit={handleSubmit} id="myForm" name="myForm">
        <Grid container spacing={3}>
          <Grid item md={12}>
            <TextField
              value={todoTitle}
              id="todoTitle"
              fullWidth
              label="Enter Todo Title"
              multiline
              variant="outlined"
              required
              name="todoTitle"
              onChange={handleTitleChange}
            />
          </Grid>
          {edit && (
            <Grid item md={12}>
              <TextField
                id="todoDueDate"
                label="Due Date"
                type="date"
                name="todoDueDate"
                fullWidth
                variant="outlined"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={todoDueDate}
                onChange={handleDateChange}
              />
            </Grid>
          )}
          {edit && (
            <Grid item md={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  row
                  aria-label="status"
                  name="todoStatus"
                  value={todoStatus}
                  onChange={handleStatusChange}
                >
                  <FormControlLabel
                    value="unfinished"
                    control={<Radio />}
                    label="Unfinished"
                  />
                  <FormControlLabel
                    value="done"
                    control={<Radio />}
                    label="Done"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          )}
          <Grid item md={12}>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              {edit ? 'Save' : 'Add'}
            </Button>

            {edit && (
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => router.push('/')}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TodoForm;
