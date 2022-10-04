import React from 'react';
import "./style/Sidebar.css";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const Home = () => {
    const [page, setPage] = React.useState('home');
    return (
        <>
            <div className="sidebar">
                <Navigation
                    // you can use your own router's api to get pathname
                    activeItemId="/management/members"
                    onSelect={({itemId}) => {
                        setPage(itemId.split('/'));
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
                        title: 'Routines',
                        itemId: '/routines',
                        subNav: [
                        {
                            title: 'View',
                            itemId: '/routines/view',
                        },
                        {
                            title: 'New',
                            itemId: '/routines/new',
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
                <h1>{page.reverse().join(' ').toUpperCase()}</h1>
            </div>
        </>
    );
}

export default Home;