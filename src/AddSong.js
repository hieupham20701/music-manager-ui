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
  // const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [generes, setGeneres] = useState('');
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    // var temp = {
    //   name: name,
    //   generes: generes,
    // };

    var file = document.querySelector('input[type="file"]').files[0];
    console.log(file);
    var newsong = new FormData();
    newsong.append('file', file);
    newsong.append('name', name);
    newsong.append('generes', generes);
    console.log(newsong);
    // console.log(data);
    // console.log(event);
    // console.log(temp);

    fetch('http://localhost:8086/upload', {
      // mode: 'no-cors',
      method: 'POST',
      body: newsong,
    }).then((result) => {
      console.log(result);
      if (result.ok) {
        alert('Upload Succes');
        window.location.href = '/';
      } else {
        alert('Could not Upload');
      }
    });
  };

  return (
    <Container maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          SONG
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
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
          <Button variant='contained' component='label'>
            Upload File
            <input id='file' type='file' hidden />
          </Button>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Add Song
          </Button>
        </form>
      </div>
    </Container>
  );
}
