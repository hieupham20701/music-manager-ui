import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function UserList() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  useEffect(() => {
    UsersGet();
  }, []);

  const UsersGet = () => {
    fetch('http://localhost:8086/files')
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
    users.isChecked = false;
  };

  const UpdateUser = (id) => {
    window.location = '/update/' + id;
  };

  const UserDelete = (id) => {
    var check = window.confirm('Are you sure delete this song?');
    if (check) {
      var listId = [];
      listId.push(id);
      console.log(typeof id);
      console.log(listId);
      fetch('http://localhost:8086/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listId),
      }).then((result) => {
        console.log(result);
        if (result.ok) {
          alert('The song is deleted');
          UsersGet();
        }
      });
    }
  };

  const handleAllChecked = (event) => {
    const tempUser = users;
    tempUser.forEach((user) => (user.isChecked = event.target.checked));
    setUsers(tempUser);
    setSelectedUser(tempUser.filter((item) => item.isChecked === true));
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var checkbox of checkboxes) {
      checkbox.checked = event.target.checked;
    }
    console.log(tempUser);
  };

  const handleCheckChieldElement = (event) => {
    const tempUser = users;
    let tempSelectedUser = selectedUser;
    tempUser.forEach((user) => {
      if (user.id.toString() === event.target.value) {
        if (!user.isChecked) {
          user.isChecked = event.target.checked;
          tempSelectedUser.push(user);
        } else {
          user.isChecked = event.target.checked;
          tempSelectedUser = tempSelectedUser.filter(
            (item) => item.isChecked === true,
          );
        }
      }
    });
    console.log(tempSelectedUser);
    setUsers(tempUser);
    setSelectedUser(tempSelectedUser);
  };

  const multiDelete = (event) => {
    var checked = window.confirm('Are you sure to delete them');
    if (checked) {
      let deletedUser;
      let deleteTemp = [];
      deletedUser = users.filter((tempUser) => tempUser.isChecked === true);
      deletedUser.forEach((deletedUser) => deleteTemp.push(deletedUser.id));
      fetch('http://localhost:8086/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteTemp),
      }).then((result) => {
        console.log(result);
        if (result.ok) {
          alert('Delete Success');
          UsersGet();
        }
      });
      let remainUsers;
      remainUsers = users.filter((remainUser) => remainUser.isChecked !== true);
      setUsers(remainUsers);
    }
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth='lg'>
        <Paper className={classes.paper}>
          <Box display='flex'>
            <Box flexGrow={1}>
              <Typography
                component='h2'
                variant='h6'
                color='primary'
                gutterBottom
              >
                SONGS
              </Typography>
            </Box>
            <Box>
              <Link to='/create'>
                <Button variant='contained' color='primary'>
                  ADD
                </Button>
              </Link>
            </Box>
            <Box>
              {/* <Link to='/'> */}
              <Button variant='contained' color='primary' onClick={multiDelete}>
                DELETE
              </Button>
              {/* </Link> */}
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {' '}
                    <input
                      type='checkbox'
                      id={`default-checkbox`}
                      onClick={handleAllChecked}
                    ></input>{' '}
                  </TableCell>
                  <TableCell align='left'>Name</TableCell>
                  <TableCell align='center'>Generes</TableCell>
                  <TableCell align='left'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {' '}
                      <input
                        type='checkbox'
                        id={`default-checkbox`}
                        value={user.id}
                        defaultChecked={user.isChecked}
                        onClick={handleCheckChieldElement}
                      ></input>{' '}
                    </TableCell>
                    <TableCell align='left'>{user.name}</TableCell>
                    <TableCell align='center'>{user.generes}</TableCell>
                    <TableCell align='left'>
                      <ButtonGroup
                        color='primary'
                        aria-label='outlined primary button group'
                      >
                        <Button onClick={() => UpdateUser(user.id)}>
                          Edit
                        </Button>
                        <Button onClick={() => UserDelete(user.id)}>
                          DELETE
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
