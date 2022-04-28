import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import PlayerAudio from './PlayerAudio';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function SongDetail() {
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    fetch('http://localhost:8086/musicdetail/' + id)
      .then((res) => res.json())
      .then((result) => {
        setName(result.name);
        setGenenes(result.generes);
      });
  }, [id]);
  const [isDisabled, setIsDisabled] = useState(true);
  const url = 'http://localhost:8086/files/' + id;
  const [name, setName] = useState('');
  const [generes, setGenenes] = useState('');
  // const [playing, toggle] = useAudio(url);
  const handleClickEnebled = () => {
    if (isDisabled) {
      var con = window.confirm('Are you sure Edit this Song?');
      if (con && isDisabled) {
        setIsDisabled(!isDisabled);
      }
    } else {
      setIsDisabled(!isDisabled);
    }
  };
  var song = new Audio(url);
  console.log(song);

  const handleSubmit = (event) => {
    event.preventDefault();
    var song = new FormData();
    song.append('name', name);
    song.append('generes', generes);
    console.log(song);
    fetch('https://localhost:8086/upload/' + id, {
      method: 'PUT',
      body: song,
    }).then((result) => {
      console.log(result);
      if (result.ok) {
        alert('Update Success');
      }
    });
  };
  return (
    <Container maxWidth='sm'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>
          Song Detail
        </Typography>

        <br></br>
        {/* <div>
          <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
        </div> */}

        <form className={classes.form} onSubmit={handleSubmit}>
          {' '}
          <div>
            {/* <scrip>window.onload = function(){<PlayerAudio />}</scrip> */}
            <PlayerAudio />
            {/* <audio src={url} controls></audio> */}
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                disabled={isDisabled}
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='Name'
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={isDisabled}
                variant='outlined'
                required
                fullWidth
                id='generes'
                label='Generes'
                value={generes}
                onChange={(e) => setGenenes(e.target.value)}
                placeholder='Generes'
              />
            </Grid>
          </Grid>
          <Button
            disabled={isDisabled}
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Save
          </Button>
        </form>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={handleClickEnebled}
        >
          Edit
        </Button>
      </div>
    </Container>
  );
}
// const useAudio = (url) => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//     playing ? audio.play() : audio.pause();
//   }, [playing]);

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };
