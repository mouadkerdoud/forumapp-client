import React, { Component } from 'react'
import EventCard from "./EventCard"
import UserService from "../../../services/user.service"

import {User} from "../../../models/user"
import {Attending} from "../../../models/attending"
import Spinner from "../../layout/Spinner/Spinner"


import "./FeedEvents.css"

export default class FeedEvents extends Component {

    constructor(props){
        super(props)
        this.state = {
            events:null,
            attendings: null,
            errorMessage: "",
            currentUser: new User(),
            username: ""
        }

        this.attendEvent = this.attendEvent.bind(this)
        this.deleteAttending = this.deleteAttending.bind(this)
        this.isAttended = this.isAttended.bind(this)
    }

    componentDidMount(){

        UserService.findUserById(UserService.currentUserValue.userId)
            .then(result=>{
                this.setState({
                    currentUser: result.data,
                    username: result.data.username
                })
            })

        UserService.findAllEvents()
            .then(result=>{
                this.setState({events:result.data.reverse()})
            })
            .catch(err=>{
                console.log(err)
            })

        UserService.findAllAttendings()
            .then(result=>{
                this.setState({attendings:result.data})
            })
            .catch(err=>{
                console.log(err)
            })
    }


    deleteAttending(eventId){
        const {attendings, currentUser} = this.state;
        const attendingId = attendings.filter(attending => attending.event.eventId === eventId && attending.user.userId === currentUser.userId)[0].attendingId
        const newAttendingList = attendings.filter(attending => attending.attendingId !== attendingId)
        UserService.deleteAttending(attendingId)
            .then(result=>{
                console.log("Deleted")
                this.setState({
                    attendings: newAttendingList
                })
            })
            .catch(error=>{
                console.log(error)
            })
    }

    attendEvent(eventId){
        const attendingsList = this.state.attendings
        const {events} = this.state
        let chosenEvent={}
        events.forEach(event=>{
            if(event.eventId === eventId) chosenEvent = event 
        })
        let attending = new Attending(this.state.currentUser, chosenEvent)

        UserService.attendEvent(attending)
            .then(data=>{
                attendingsList.push(attending)
                this.setState({attendings: attendingsList })
                console.log("Success!")
            })
            .catch(error=>{
                console.log(error)
            })
    }

    isAttended(eventId){
        const {attendings, username} = this.state

        const attendedEventsByUser = attendings.filter(attendedEvent=>{
            return attendedEvent.user.username === username
        })

       return attendedEventsByUser.some(attendedEventByUser => {
           return attendedEventByUser.event.eventId === eventId
       })
    }

    render() {
        const {events, attendings} = this.state
        if(events && attendings){
            return (
                <div className="events-container">
                    { events.map((event,index)=>{
                        return (
                                <EventCard 
                                    key={index} 
                                    event={event} 
                                    attendEvent={this.attendEvent} 
                                    deleteAttending={this.deleteAttending}
                                    isAttended={this.isAttended(event.eventId)} 
                                />
                            )
                    })}
                 </div>
            )
        }

        else{
            return (
                <div className="user-content-spinner">
                    <Spinner />
                </div>
                )        
            }

    }
}
