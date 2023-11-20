import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'

const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" component={HomePage} />

        </Routes>
    )
}

export default AllRoutes