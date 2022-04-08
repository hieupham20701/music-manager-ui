import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserCreate() {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      // file: file,
      name: name,
      generes: generes,
    };
    fetch('http://localhost:8086/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'multipart/form-data; boundary=something',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result['message']);
        if (result['status'] === 'ok') {
          window.location.href = '/';
        }
      });
  };

  // const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [generes, setGeneres] = useState('');

  return (
    <Container maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          SONG
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Name'
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='generes'
                label='Generes'
                onChange={(e) => setGeneres(e.target.value)}
              />
            </Grid>
          </Grid>
          {/* file upload */}
          <Button variant='contained' component='label' id='file'>
            Upload File
            <input type='file' hidden />
          </Button>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
