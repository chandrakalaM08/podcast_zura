import React, { useEffect, useState } from 'react'
import youtube from "../../assets/youtubeIcon.svg"
import spotify from "../../assets/spotify.svg"
import NoFileScreen from './NoFileScreen'
import CreateFilePopup from './CreateFilePopup'
import { useParams } from 'react-router-dom';
import { fetchProjectFiles } from "../../redux/actions"
import ProjectFilesDisplayScreen from './ProjectFilesDisplayScreen'
import EditTranscription from './EditTranscription'
const ProjectFileUploadScreen = () => {
    console.log("displaying file upload")
    const { id } = useParams()
    const [files, setFiles] = useState([])
    const [showFileUploadPopup, setShowFileUploadPopup] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const toggleEditFileData = () => {
        setShowEdit(!showEdit)
    }



    console.log("inside upload screen id", id)
    const toggleFileUploadPopup = () => {
        setShowFileUploadPopup(!showFileUploadPopup);
    };



    useEffect(() => {
        fetchProjectFiles(id).then((files) => {
            console.log('Project files:', files);
            setFiles(files)
        })
            .catch((error) => {
                console.error('Error fetching project files:', error.message);
                // Handle errors appropriately
            })

    }, [])

    if (showEdit) {
        return <EditTranscription />
    }

    return (
        <div className='w-screen mt-20 ml-14'>
            <h1 className='text-purple-700 text-4xl font-bold ml-80'>
                Upload
            </h1>

            <div style={{ border: "3px solid blue" }} className=" flex ml-80 w-9/12 bg-white p-2 rounded-xl shadow-md border border-gray-300
                 mt-2 mx-4 pr-2">
                <div onClick={toggleFileUploadPopup}
                    className='w-52 h-24 rounded-lg flex justify-center items-center mr-14 border border-gray-300 border-2'>
                    <img src={youtube} alt='' />
                    <div className='mt-4 ml-2'>
                        <h3 className="text-base font-semibold">Upload</h3>
                        <h3 className="text-base font-semibold">Youtube Video</h3>

                    </div>

                </div>
                <div onClick={toggleFileUploadPopup} className='w-52 h-24 rounded-lg flex justify-center items-center mr-14 border border-gray-300 border-2'>
                    <img src={spotify} alt='' />
                    <div className='mt-4 ml-2'>
                        <h3 className="text-base font-semibold">Upload</h3>
                        <h3 className="text-base font-semibold">Youtube Video</h3>

                    </div>

                </div>
                <div onClick={toggleFileUploadPopup} className='w-52 h-24 rounded-lg flex justify-center items-center mr-4 border border-gray-300 border-2'>
                    <img src={youtube} alt='' />
                    <div className='mt-4 ml-2'>
                        <h3 className="text-base font-semibold">Upload</h3>
                        <h3 className="text-base font-semibold">Youtube Video</h3>

                    </div>

                </div>
                {showFileUploadPopup && <CreateFilePopup toggleFileUploadPopup={toggleFileUploadPopup} projectId={id} />}
            </div>
            {files.length === 0 ? <NoFileScreen /> : < ProjectFilesDisplayScreen files={files} toggleEditFileData={toggleEditFileData} />}
        </div>
    )
}

export default ProjectFileUploadScreen