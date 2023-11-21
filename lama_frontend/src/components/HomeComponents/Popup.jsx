import React, { useState } from 'react';

const Popup = ({ togglePopup, toggleProjects }) => {
    const [projectName, setProjectName] = useState('');
    const [warning, setWarning] = useState('');

    const handleInputChange = (event) => {
        const inputText = event.target.value;
        setProjectName(inputText);

        if (inputText.length === 0) {
            setWarning('Project name can\'t be empty');
        } else if (inputText.length < 4) {
            setWarning('Project name should be at least 4 characters');
        } else {
            setWarning('');
        }
    };

    const createProject = () => {
        //  logic to create a project 

        // Close the popup
        togglePopup();
        toggleProjects()
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 w-3/5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Create Project</h2>
                </div>
                <label className="block text-gray-400">
                    Enter Project Name:
                    <input
                        type='text'
                        placeholder='Type here ...'
                        value={projectName}
                        onChange={handleInputChange}
                        className="block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                    {warning && <p className="text-red-500 text-sm mt-1">{warning}</p>}
                </label>
                <div className="flex justify-end my-4">
                    <button onClick={togglePopup} className="text-red-600 hover:text-gray-900 focus:outline-none mr-4">
                        Cancel
                    </button>
                    <button
                        onClick={createProject}
                        disabled={!projectName || projectName.length < 4}
                        className={`px-4 py-2 rounded bg-purple-700 text-white font-semibold 
                                    ${(!projectName || projectName.length < 4) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
