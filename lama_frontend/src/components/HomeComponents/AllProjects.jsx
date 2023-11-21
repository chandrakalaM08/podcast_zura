import React from 'react'
import plus from "../../assets/Vector.svg"
import Popup from './Popup';
import { Link } from 'react-router-dom';
const AllProjects = ({ togglePopup, showPopup, toggleProjects }) => {
    const cardData = [
        { id: 1, title: 'Card Hope', description: 'Description for Card 1' },
        { id: 2, title: 'Card Soap', description: 'Description for Card 2' },
        { id: 3, title: 'Card Mop', description: 'Description for Card 3' },
        { id: 11, title: 'Sign Card', description: 'Description for Card 1' },
        { id: 21, title: 'Card Kevin Mop', description: 'Description for Card 2' },
        { id: 31, title: 'India CWC Final', description: 'Description for Card 3' },
        { id: 111, title: 'Card 1', description: 'Description for Card 1' },
    ];

    const colors = ["#7E22CE", "#F8A01D", "#6366F1", "#F8A01D", "#7E22CE"]

    const colorMap = {};
    cardData.forEach((card, index) => {
        const colorIndex = index % colors.length;
        colorMap[card.title] = colors[colorIndex];
    });


    const generateProjectThumbnail = (projectName) => {
        const words = projectName.split(' ');
        const initials = words.length >= 2 ?
            words[0][0].toUpperCase() + words[1][0].toUpperCase() :
            words[0][0].toUpperCase() + words[0][1].toUpperCase();

        return initials;
    };


    return (
        <>
            <div className='mt-6 flex justify-between'>
                <h1 className='text-purple-700 text-5xl font-bold	'>
                    Projects
                </h1>
                <div className='w-64  flex items-center justify-center rounded-lg bg-gray-900 px-2 py-2'
                    onClick={togglePopup}>
                    <img src={plus} alt='plus' className='h-6 w-6 mr-2' />
                    <p className='text-white text-xl font-bold text-center font-Roboto'>Create New Project</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg mx-auto my-4">

                {cardData?.map((card, index) => (
                    <Link to="/project">
                        <div key={card.id} className=" flex bg-white p-4 rounded-xl shadow-md border border-gray-300 mt-2 mx-4">
                            <div style={{ background: colorMap[card.title] }} className='w-24 h-24 rounded-lg flex justify-center items-center mr-4'>
                                <p className='text-5xl font-semibold text-white font-Roboto'>{generateProjectThumbnail(card.title)}</p>
                            </div>
                            <div className='mt-4'>
                                <h3 className="text-base font-semibold text-purple-700">{card.title}</h3>
                                <p className="text-xs text-gray-800">{1} Episodes</p>
                                <p className="text-xs text-gray-400 mt-4">Last edited a week ago</p>
                            </div>

                        </div>
                    </Link>

                ))}
                {showPopup && <Popup togglePopup={togglePopup} toggleProjects={toggleProjects} />} {/* Conditionally render Popup based on showPopup state */}

            </div>
        </>

    )
}

export default AllProjects