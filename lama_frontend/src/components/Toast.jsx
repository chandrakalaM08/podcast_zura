import React from 'react';

const Toast = ({ message, success }) => {
    const toastClasses = success
        ? 'bg-green-500 text-white'
        : 'bg-red-500 text-white';

    return (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 p-8 rounded-md w-72 py-8 text-center">
            <div className={` ${toastClasses} py-4 px-8 rounded-lg font-semibold`}>
                {message}
            </div>
        </div>
    );
};

export default Toast;
