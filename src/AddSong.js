import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Loading from './Loading';
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
  const [name, setName] = useState('');
  const [generes, setGeneres] = useState('');
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const file = document.querySelector('input[type="file"]').files[0];
    if (file === undefined || file.type !== 'audio/mpeg') {
      document.getElementById('fileError').innerHTML =
        'Please choose file .mp3 or .mp4!';
    } else {
      document.getElementById('fileError').innerHTML = '';
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
        } else if (result.status === 400) {
          alert('Please choose file mp3');
        } else {
          alert('Could not Upload!');
        }
      });
      setLoading(true);
    }
    // setLoading(false);
  };

  const showfileName = (event) => {
    var file = document.querySelector('input[type="file"]').files[0];
    console.log(file.type);
    if (file !== undefined) {
      document.getElementById('fileError').innerHTML = file.name;
    }
  };
  if (loading === false) {
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <input
                id='file'
                type='file'
                hidden
                accept='.mp3, .mp4'
                onChange={showfileName}
              />
            </Button>
            <p id='fileError' style={{ color: 'red' }}>
              Please choose file .mp3 or .mp4
            </p>
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
  } else {
    return <Loading />;
  }
}
