import {useRef, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import {useFormik} from "formik";
import axios from "axios";
import {TextField} from "@mui/material";
import Aos from "aos";
import "./stye.scss"

const Home = () => {
    const countdownDate = new Date('2024-10-24');
    const [modal, setModal] = useState(false);
    const nodeRef = useRef(null);
    const [alert, setAlert] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Required";
        }

        if (!values.phone) {
            errors.phone = "Required";
        } else if (isNaN(Number(values.phone))) {
            errors.phone = "Required";
        }
        return errors;
    };

    const formOne = useFormik({
        initialValues: {
            name: "",
            phone: "",
        },
        validate,
        onSubmit: (values) => {
            let lead = {
                Name: values.name,
                Phone: values.phone
            };
            setModal(false)
            axios.post(`https://api.sheetbest.com/sheets/210cbf3e-f573-4f51-97dd-eac8f82a7ac3`, lead)
                .then((response) => {
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false)
                    }, 3000);
                    formOne.resetForm();
                    window.location.href = "https://t.me/smmmunira";
                })
        },
    });

    useEffect(() => {
        countdownDate.setHours(20, 0, 0, 0);
        Aos.init({duration: 1000});
        let date = new Date()
        console.log(countdownDate)

        const interval = setInterval(() => setNewTime(), 1000);

        if (seconds < 0) {
            clearInterval(interval)
            //Stop the rerun once state.seconds is less than zero
        }
    }, []);


    const setNewTime = () => {
        if (countdownDate) {
            const currentTime = new Date();
            //get current time now in milliseconds
            const distanceToDate = countdownDate - currentTime;
            //get difference dates in milliseconds
            let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
            // get number of days from the difference in dates
            let hours = Math.floor(
                (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            // get number of minutes from the remaining time after removing hours
            let minutes = Math.floor(
                (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
            );
            let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
            // number of hours from the remaining time after removing seconds

            const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            days = `${days}`;
            if (numbersToAddZeroTo.includes(hours)) {
                hours = `0${hours}`;
            } else if (numbersToAddZeroTo.includes(minutes)) {
                minutes = `0${minutes}`;
            } else if (numbersToAddZeroTo.includes(seconds)) {
                seconds = `0${seconds}`;
            }
            // a logic to add 0 in front of numbers such that 1 will be 01, 2 will be 02, and so on.
            setDays(days)
            setHours(hours)
            setMinutes(minutes)
            setSeconds(seconds)
        }
    };

    return <div className="home-page-wrapper">

        {alert && <div className="alert-box">
            <div className="icon">
                <img src="./images/green.svg" alt=""/>
            </div>
            <div className="text">
                Ma'lumotingiz yuborildi!
            </div>
        </div>}

        <CSSTransition
            in={modal}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div className="modal-sloy">
                <div ref={nodeRef} className="modal-card">
                    <div className="register">
                        <div className="header">
                            <div className="xbtn">
                                <img onClick={() => setModal(false)} src="./images/cancel.png"
                                     alt=""/>
                            </div>
                        </div>
                        <div className="title">
                            Ro'yxatdan o'tish
                        </div>
                        <div className="description">
                            Operatorlar siz bilan aloqaga chiqa olishlari uchun pastdagi maydonlarni to‘g‘ri
                            to‘ldiring!
                        </div>
                        <div className="inputs-box">
                            <TextField error={formOne.errors.name === "Required"}
                                       value={formOne.name}
                                       onChange={formOne.handleChange}
                                       name="name"
                                       sx={{m: 1, minWidth: "100%"}} size="small"
                                       id="outlined-basic"
                                       label="Ism va familiya " variant="outlined" className="textField"/>
                            <TextField
                                error={formOne.errors.phone === "Required"}
                                value={formOne.phone}
                                onChange={formOne.handleChange}
                                name="phone"
                                type="number"
                                sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                label="Telefon raqam " variant="outlined" className="textField"/>

                        </div>

                        <div onClick={() => formOne.handleSubmit()} className="button-register">
                            <div className="button-71">
                                Yuborish
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </CSSTransition>

        <div className="home-page">
            <div className="home-image">
                <div className="header">
                    <div data-aos="zoom-in" className="start-time">
                        <img src="./images/start-date.png" alt=""/>
                        24.10.2024
                    </div>

                    <div data-aos="zoom-in" className="time">
                        <img src="./images/clock.png" alt=""/>
                        20:00
                    </div>
                </div>
                <div className="bottom-side">
                    <div className="left-side">
                        <div data-aos="fade-up" className="bottom-text">
                            MEDIA ORQALI KATTA DAROMAD TOPISH
                        </div>

                        <div data-aos="zoom-in" onClick={() => setModal(true)} className="button-register">
                            <div className="animated-button1">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Vebinarga ro'yxatdan o'tish
                            </div>
                        </div>
                        <div className="text-time">
                            Vebinar boshlanishi uchun qolgan vaqt!
                        </div>
                        <div data-aos="flip-left" className="container">
                            {
                                seconds < 0 ?
                                    <div className='counter-timer'> Vebinar tugadi </div>
                                    :
                                    <div className='counter-container'>

                                        <div className='counter-timer-wrapper'>
                                            <div className='counter-timer'>{days || '00'}</div>
                                            <span>Kun</span>
                                        </div>

                                        <div className='counter-timer-wrapper'>
                                            <div className='counter-timer'>:</div>
                                        </div>

                                        <div className='counter-timer-wrapper'>
                                            <div className='counter-timer'>{hours || '00'}</div>
                                            <span>Soat</span>
                                        </div>

                                        <div className='counter-timer-wrapper'>
                                            <div className='counter-timer'>:</div>
                                        </div>
                                        <div className='counter-timer-wrapper'>
                                            <div className='counter-timer'>{minutes || '00'}</div>
                                            <span>Daqiqa</span>
                                        </div>
                                        <div className='counter-timer-wrapper'>
                                            <div className='counter-timer'>:</div>
                                        </div>
                                        <div className='counter-timer-wrapper'>
                                            <div className='counter-timer'>{seconds || '00'}</div>
                                            <span>Soniya</span>
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>
                    <div className="right-side">
                        <div className="person-circle">
                            <img className="people-image" src="./images/person.png" alt=""/>
                            <a href="https://t.me/manager_munira" target="_blank" className="button">
                                Maneger bilan bog'lanish
                            </a>
                            <img className="black" src="./images/black.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-image-mobile">
                <img className="black2" src="./images/black2.png" alt=""/>
                <div className="header">
                    <div data-aos="zoom-in" className="start-time">
                        <img src="./images/start-date.png" alt=""/>
                        24.10.2024
                    </div>

                    <div data-aos="zoom-in" className="time">
                        <img src="./images/clock.png" alt=""/>
                        20:00
                    </div>
                </div>

                <div className="bottom-side">
                    <div className="person-circle">
                        <div data-aos="fade-up" className="bottom-text">
                            MEDIA ORQALI KATTA DAROMAD TOPISH
                        </div>
                        <img data-aos="zoom-out-up" className="people-image" src="./images/person.png" alt=""/>
                        <div className="button-register">
                            <a onClick={() => setModal(true)} className="animated-button1">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Vebinarga ro'yxatdan o'tish
                            </a>
                        </div>
                        <img className="black" src="./images/black3.png" alt=""/>
                    </div>
                </div>

                <div className="bottom-mobile">
                    <div className="text-time">
                        Vebinar boshlanishi uchun qolgan vaqt!
                    </div>

                    <div data-aos="flip-left" className="container">
                        {
                            seconds < 0 ?
                                <div className='counter-timer'> Vebinar tugadi </div>
                                :
                                <div className='counter-container'>

                                    <div className='counter-timer-wrapper'>
                                        <div className='counter-timer'>{days || '00'}</div>
                                        <span>Kun</span>
                                    </div>

                                    <div className='counter-timer-wrapper'>
                                        <div className='counter-timer'>:</div>
                                    </div>

                                    <div className='counter-timer-wrapper'>
                                        <div className='counter-timer'>{hours || '00'}</div>
                                        <span>Soat</span>
                                    </div>

                                    <div className='counter-timer-wrapper'>
                                        <div className='counter-timer'>:</div>
                                    </div>
                                    <div className='counter-timer-wrapper'>
                                        <div className='counter-timer'>{minutes || '00'}</div>
                                        <span>Daqiqa</span>
                                    </div>
                                    <div className='counter-timer-wrapper'>
                                        <div className='counter-timer'>:</div>
                                    </div>
                                    <div className='counter-timer-wrapper'>
                                        <div className='counter-timer'>{seconds || '00'}</div>
                                        <span>Soniya</span>
                                    </div>
                                </div>
                        }

                    </div>

                    <div className="button-mobile">
                        <a href="https://t.me/manager_munira" target="_blank" className="button">
                            Maneger bilan bog'lanish
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Home