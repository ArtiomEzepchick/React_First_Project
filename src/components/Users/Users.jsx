import React, { useState, useEffect, useCallback } from 'react'
import { data, updatedData } from "../../data/data"
import UpdateBtn from "../UpdateBtn/UpdateBtn"
import UserList from "../UserList/UserList"
import Loader from "../Loader/Loader"

const Users = () => {
    const [users, setUsers] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date().toLocaleTimeString())
    const [loading, setLoading] = useState(false)

    const imitateFetchingUsers = data => {
        return new Promise(res => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                res(data)
            }, 1000)
        })
    }

    const updateUsers = useCallback(async data => {
        try {
            const fetchedUsers = await imitateFetchingUsers(data)

            setUsers(fetchedUsers)
            setLastUpdateTime(new Date().toLocaleTimeString())
        } catch (e) {
            console.log(e.message)
        }
    }, [])

    const handleClick = () => {
        if (!isUpdated) {
            updateUsers(updatedData)
            setIsUpdated(true)
            return
        }

        updateUsers(data)
        setIsUpdated(false)
    }

    useEffect(() => {
        updateUsers(data)
    }, [updateUsers])

    return (
        <React.Fragment>
            {loading && <Loader />}
            {!loading && (
                <React.Fragment>
                    <h1>This is the <span className='color-green'>Users</span> page</h1>
                    <UserList users={users}>
                        <UpdateBtn onBtnClick={handleClick} />
                        <h2>Last updated: {lastUpdateTime}</h2>
                    </UserList>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default Users