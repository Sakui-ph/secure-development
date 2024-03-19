import React, { useState, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate, Outlet } from 'react-router-dom';
import { Logout } from '../api/user';

const SessionContext = React.createContext();

export const SessionProvider = () => {
    const navigate = useNavigate();
    const [remainingTime, setRemainingTime] = useState(10);

    const handleIdle = () => {
        setRemainingTime(30);
    };

    const { isIdle } = useIdle({ onIdle: handleIdle, idleTime: 0.3 });

    useEffect(() => {
        let interval;

        if (isIdle) {
            interval = setInterval(() => {
                setRemainingTime(
                    (prevRemainingTime) =>
                        prevRemainingTime > 0 ? prevRemainingTime - 1 : 0, // reduces the second by 1
                );
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isIdle, remainingTime]);

    useEffect(() => {
        if (remainingTime === 0) {
            // alert("Time out!");
            Logout().then(() => {
                console.log('User timed out due to being idle for too long');
                navigate('/');
            });
        }
    }, [remainingTime, navigate]); // this is responsoble for logging user out after timer is down to zero and they have not clicked anything

    return (
        <SessionContext.Provider>
            <Outlet />
        </SessionContext.Provider>
    );
};

function useIdle({ onIdle, idleTime }) {
    const [isIdle, setIsIdle] = useState(null);

    const handleOnIdle = (event) => {
        setIsIdle(true);
        const currentTime = new Date();
        const formattedCurrentTime = currentTime.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        });
        onIdle(); // then call onIdle function
    };

    const handleOnActive = () => {
        setIsIdle(false);
    };

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * idleTime,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        debounce: 500,
    });
    return {
        getRemainingTime,
        getLastActiveTime,
        isIdle,
    };
}

export default useIdle;
