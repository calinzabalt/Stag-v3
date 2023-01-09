import * as React from 'react';
import './landingpage.css'
import { useRef, useEffect } from 'react';

import CreateTeam from '../../assets/step-two-resized.png'
import TeamInvitations from '../../assets/step-four.png'
import CreatingProject from '../../assets/step-one - app.png'
import DashboardOverview from '../../assets/dashboard_overview.png'

import logo from "../../assets/stag_logo.png"
import { useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from "../../hooks/useCollection"
import { Link } from 'react-router-dom'

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function Landing(){
    const { addDocument, response } = useFirestore('newsletter');
    const { error, documents } = useCollection('newsletter')

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);    
    const [isSubmittedError, setIsSubmittedError] = useState(false);

    const sectionRef = useRef(null);
    const secondSectionRef = useRef(null);

    const handleClick = () => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleClickSecond = () => {
        secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleSubmit = event => {
        event.preventDefault();
      
        if (documents.some(user => user.email === email)) {
          setIsSubmittedError(true)
          setIsSubmitted(false);
        } else {
          addDocument({ name: name, email: email });
          setName('');
          setEmail('');
          setIsSubmitted(true);
          setIsSubmittedError(false);
        }
      };

    return(
        <>
        <header className="landing_header">
            <div className="header_logo">
                {/* 
                    <a href='/landing'>
                        <img src={logo}/>
                    </a>
                */}
            </div>
        </header>
        <section id="header_section" className="header_section landing">
            <div className="container landing">
                <div className="section_title">
                    <h1>Welcome to stag !</h1>
                </div>
                <div className="section_description">
                    <p>Project management for small business</p>
                </div>
                <div className="call_to_action">
                    <button onClick={handleClick}>
                        Be productive
                    </button>
                </div>
            </div>
        </section>
        <section ref={sectionRef} id="what_we_offer" className="what_we_offer global">
            <div className="container landing">
                <div className='section_title'>
                    <h2>Our Services</h2>
                </div>
                <div className='section_description'>
                    <p>This platform is suitable for small businesses or individuals. 
                        It is free to use and offers a range of features including 
                        creating a team, inviting and accepting invitations to join 
                        the team, creating projects and assigning users to them, 
                        categorizing projects, and providing real-time comments. 
                        Additional functionality will be added in the future 
                        (see more about new updates <button onClick={handleClickSecond}>here</button>).
                    </p>
                </div>
                <div className='boxes'>
                    <div className='box'>
                        <div className='left'>
                            <div className='thumb'>
                                <img src={CreateTeam} />
                            </div>
                        </div>
                        <div className="right">
                            <div className='box_title'>
                                Team Creation
                            </div>
                            <div className='box_description'>
                                <p>Create a team in order to collaborate with 
                                    your colleagues and delegate tasks to 
                                    them effectively.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='left'>
                            <div className='thumb'>
                                <img src={TeamInvitations} />
                            </div>
                        </div>
                        <div className="right">
                            <div className='box_title'>
                                Team Invitation
                            </div>
                            <div className='box_description'>
                                <p>To accept an invitation from your business 
                                    and become assignable, check your invitation 
                                    page located under your profile in the right corner.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='left'>
                            <div className='thumb'>
                                <img src={CreatingProject} />
                            </div>
                        </div>
                        <div className="right">
                            <div className='box_title'>
                                Creating Projects
                            </div>
                            <div className='box_description'>
                                <p>Create a project and assign users to
                                     it to assist in the development 
                                     and growth of your business
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='left'>
                            <div className='thumb'>
                                <img src={DashboardOverview} />
                            </div>
                        </div>
                        <div className="right">
                            <div className='box_title'>
                                Dashboard
                            </div>
                            <div className='box_description' ref={secondSectionRef}>
                                <p>On the dashboard, you can use the filter 
                                    to search for any project. By clicking 
                                    on a specific project, you can view 
                                    more detailed information about it 
                                    and communicate with the users who have 
                                    been assigned to it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="new_releases" className='new_releases global'>
            <div className='container landing'>
                <div className='section_title'>
                    <h2>New Updates</h2>
                </div>
                <div className='section_description'>
                    <p>
                        "We are excited to announce that we will be 
                        releasing several new features in the near future, 
                        including notifications, chat functionality, the ability 
                        to upload files, the option to edit a single project, and more.
                        These updates will enhance the user experience 
                        and provide additional tools for managing 
                        projects and collaborating with team members."
                    </p>
                </div>
                <div className='timeline'>
                    <Timeline position="alternate">
                        <TimelineItem>
                            <TimelineSeparator>
                            <TimelineDot color="secondary" />
                            <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Chat</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                            <TimelineDot color="success" />
                            </TimelineSeparator>
                            <TimelineContent>Notifications</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                            <TimelineDot color="error" />
                            <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Edit Project</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                            <TimelineDot color="primary" />
                            </TimelineSeparator>
                            <TimelineContent>Upload Files</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            </div>
        </section>
        <section id="newsletter" className='newsletter global'>
            <div className='container landing'>
                <div className='section_title'>
                    <h2>Newsletter</h2>
                </div>
                <div className='section_description'>
                    <p>
                        Stay informed about the latest updates that will 
                        improve your experience by subscribing to our 
                        newsletter. We will send you news about new 
                        features and enhancements as they become available.
                    </p>
                </div>
                <div className="newsletter_form">
                    <form onSubmit={handleSubmit}>
                        <div className='item'>
                            <label>Name</label>
                            <input onChange={event => setName(event.target.value)} value={name} type="text" name="name" required/>
                        </div>
                        <div className='item'>
                            <label>Email</label>
                            <input onChange={event => setEmail(event.target.value)} value={email} type="text" name="email" required/>
                        </div>
                        <div className='submit'>
                            <input type="submit" value="Subscribe"/>
                        </div>
                    </form>
                    {isSubmitted && <div className='success_subscribed'>Congratulations, you have successfully subscribed!</div>}
                    {isSubmittedError && <div className='error_subscribed'>Email already exists</div>}
                </div>
            </div>
        </section>
        <footer className='landing_footer'>
            <div className='container landing'>
                <div className='row'>
                    <div className='col'>
                        <ul>
                            <li>
                                <Link to="/terms">Terms and Conditions</Link>
                            </li>
                            <li>
                                <Link to="/privacy">Policy Privacy</Link>
                            </li>
                            <li>
                                <a href='https://anpc.ro/' target="_blank">A.N.P.C</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col'>
                        <h3>"Version Currently in Beta Testing"</h3>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}