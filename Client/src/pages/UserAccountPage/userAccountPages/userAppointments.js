import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faClock } from '@fortawesome/free-solid-svg-icons';
import {format , addMonths,endOfMonth,startOfMonth,eachDayOfInterval,getDay,isToday} from "date-fns"

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const UserAppointments = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointmentData, setAppointmentData] = useState([]);
    const navigate = useNavigate();

    const firstDayOfMonth = startOfMonth(currentDate);
    const LastDayOfMonth = endOfMonth(currentDate);

    const daysOfMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: LastDayOfMonth
    });

    const handleDayClick = (selectedDate) => {
        setSelectedDay(selectedDate);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.post('http://localhost:4000/user/get-valid-appointments')
            .then(response => {
                response.data.appointments.forEach(appointment => {
                    // Split the date string into an array using '-' as the delimiter
                    const dateParts = appointment.closed_at.split('-');

                    // Construct a new Date object using the date parts
                    appointment.closed_at = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                });

                setAppointmentData(response.data.appointments);
            })
            .catch(error => {
                console.error('Error fetching appointments:', error);
                navigate('/login', { replace: true });
            });
    }, []);

    const startingDay = getDay(firstDayOfMonth);
    const goToNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const goToPreviousMonth = () => {
        setCurrentDate(addMonths(currentDate, -1));
    };

    return (
        <div style={{ height: '800px' }}>
            <div className="text-center shadow" style={{ backgroundColor: '#ADD8E6', borderRadius: '0 0 1.5rem 1.5rem', paddingBottom: '10px', paddingTop: '5px' }}>
                <h2 className="text-center" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>My Appointments</h2>
            </div>
            <div className="container mx-auto p-4">
                <div className="text-center mb-4" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <button onClick={goToPreviousMonth}>◁</button>
                    <h2 style={{ width: '300px' }}>{format(currentDate, 'MMMM yyyy')}</h2>
                    <button onClick={goToNextMonth}>▷</button>
                </div>
                <div className="grid gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                    {WEEKDAYS.map((day) => (
                        <div key={day} className="text-center" style={{ fontWeight: 'bold' }}>
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: startingDay }).map((_, index) => (
                        <div key={`empty-${index}`} className="border rounded p-2 text-center" />
                    ))}
                    {daysOfMonth.map((day, index) => {
                        const isTodayDate = isToday(day);
                        const isSelectedDay = selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
                        const appointmentsForDay = appointmentData.filter(appointment =>
                            format(appointment.closed_at, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                        );
                        return (
                            <div
                                key={index}
                                className="border rounded p-2 text-center"
                                style={{
                                    color: isTodayDate ? 'blue' : '',
                                    backgroundColor: isSelectedDay ? '#ADD8E6' : 'white',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleDayClick(day)}
                            >
                                {format(day, 'd')}
                                {appointmentsForDay.length > 0 && (
                                    <div>
                                        <FontAwesomeIcon icon={faClock} />
                                        {appointmentsForDay.length}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <hr />
            {selectedDay && (
                <div>
                    <h3 className="ml-2">Appointments for {format(selectedDay, 'MMMM d, yyyy')}</h3>
                    <ul>
                        {appointmentData
                            .filter((appointment) => format(appointment.closed_at, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd'))
                            .map((appointment, index) => (
                                <li key={index}>
                                    <div>
                                        {appointment.storename} - {appointment.name} - {appointment.hour}
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserAppointments;
