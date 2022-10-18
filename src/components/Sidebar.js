import React from 'react';
import "./style/Sidebar.css";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

import NewGoal from './goals/NewGoal';
import GoalsView from './goals/GoalsView';

const Home = () => {
    const [page, setPage] = React.useState('home');

    const handlePageChange = (page) => {
        if (page === '/goals/view') {
            return <GoalsView />;
        } else if (page === '/goals/new') {
            return <NewGoal />;
        } else {
            return <div>Not Implemented Yet...</div>;
        }
    };

    return (
        <>
            <div className="sidebar">
                <Navigation
                    // you can use your own router's api to get pathname
                    activeItemId="/management/members"
                    onSelect={({itemId}) => {
                        setPage(itemId);
                    }}
                    items={[
                    {
                        title: 'Home',
                        itemId: '/home',
                    },
                    {
                        title: 'Dashboard',
                        itemId: '/dashboard',
                    },
                    {
                        title: 'Goals',
                        itemId: '/goals',
                        subNav: [
                        {
                            title: 'View',
                            itemId: '/goals/view',
                        },
                        {
                            title: 'New',
                            itemId: '/goals/new',
                        },
                        ],
                    },
                    {
                        title: 'Settings',
                        itemId: '/settings',
                        subNav: [
                        {
                            title: 'Account',
                            itemId: '/settings/account',
                        },
                        ],
                    },
                    ]}
                />
            </div>
            <div className="content">
                {handlePageChange(page)}
            </div>
        </>
    );
}

export default Home;