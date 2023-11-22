import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProjectPage from '../pages/ProjectPage'
import PageNotFound from '../pages/PageNotFound'

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/project/:id' element={<ProjectPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>

    )
}

export default AllRoutes