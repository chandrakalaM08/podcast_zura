import React from 'react';
import settings from "../../assets/settingsIcon.svg"
import logo from "../../assets/directright.svg"
import logoText from "../../assets/LAMA..svg"
import { Link } from 'react-router-dom';
const LeftSidebar = () => {
    return (
        <div style={{ border: "5px solid green" }}
            className={`bg-purple-100 sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px]
             overflow-y-auto text-center bg-gray-900`}>

            <div>
                <Link to="/">
                    <div className="flex items-center ml-4" >
                        <img src={logo} alt='logo' className="w-8 h-8 mr-2" />
                        <img src={logoText} alt='logo-text' className="h-5" />
                    </div>
                </Link>
            </div>
            <div>
                <p>Podcast Upload Flow</p>
            </div>
            <div>
                <div className='flex w-88 border border-black-700 rounded-8 ml-6'>
                    <button className='h-6 w-6 rounded-full bg-gray-900 text-white'>1</button>
                    <p>Projects</p>
                </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <hr />
            <div className='flex mt-4'>
                <img alt='settings' src={settings} className="w-6 h-6 mr-1" />
                <p className="text-sm font-semibold">Settings</p>
            </div>
        </div >

    );
};

export default LeftSidebar;
