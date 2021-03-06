import React, {Component} from 'react'
import AdminService from "../../../services/admin.service"
import UserService from "../../../services/user.service"

import {withRouter} from "react-router-dom"

import Sidebar from "../../layout/Sidebar/Sidebar"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor:  "#1a83ff"
    }
  })


class EditUser extends Component {

    constructor(props){
        super(props)
        this.state={
            userId: this.props.match.params.id,
            firstName:"",
            lastName:"",
            username:"",
            password:"",
            role:""
        }

        if(!UserService.currentUserValue){
            this.props.history.push("/signIn")
            return
        }
        if(UserService.currentUserValue.role !== "ADMIN"){
            this.props.history.push("/401")
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount(){

        let userID = this.state.userId
        AdminService.findUserById(userID)
            .then(result=>{
                this.setState({ firstName: result.data.firstName,
                lastName: result.data.lastName,
                username: result.data.username,
                password: result.data.password,
                role: result.data.role
              })
            })
            .catch(error=>{
                console.log(error)
            })
    }

    handleChange(e){
        var {name, value} = e.target
        this.setState({
          [name]:value
        })
      }

    handleSubmit(e){
        e.preventDefault()
        AdminService.updateUser(this.state)
            .then(result=>{
                this.setState({})
                this.props.history.push("/users")
            })
            .catch(error=>{
                console.log(error)
            })
    }

 

    render(){
        const { classes } = this.props;
        return (
            <div className="container" >
                <Sidebar />
                <div className="content add-content">
                    <form onSubmit={e=>this.handleSubmit(e)} >
                        <div className="element-form">
                            <h1 className="form-title">Update User</h1>
                            <TextField
                                value={this.state.firstName}
                                variant="outlined"
                                margin="normal"
                                required
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                onChange = {e=>this.handleChange(e)}
                            />
                            <TextField
                                variant="outlined"
                                value={this.state.lastName}
                                margin="normal"
                                multiline={true}
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus
                                onChange = {e=>this.handleChange(e)}
                                required
                            />
    
                            <TextField
                                variant="outlined"
                                value={this.state.username}
                                margin="normal"
                                multiline={true}
                                required
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange = {e=>this.handleChange(e)}
                            />
    
    
                        <FormControl id="select" variant="outlined" >
                            <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
                            <Select 
                                value={this.state.role}
                                required
                                label="Role"
                                name="role"
                                onChange = {e=>this.handleChange(e)}
                            >
                                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                                <MenuItem value={"USER"}>USER</MenuItem>
                            </Select>
                            </FormControl>
    
    
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Update User
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    
}

export default withStyles(styles, { withTheme: true })(withRouter(EditUser));
