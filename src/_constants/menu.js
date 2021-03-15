import {
    Home,
    // Box,
    // DollarSign,
    // Clipboard,
    UserPlus,
    // BarChart,
    // Settings,
    // Archive,
    // LogIn,
    LogOut,
    User
} from 'react-feather';

export const MENUITEMS = [
    {path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', active: false },
    {
        title: 'User', icon: UserPlus, type: 'sub', active: false, children:[
            {path: '/users/list-user', title: 'User List', type: 'link'},
            {path: '/users/create-user', title: 'Create User', type: 'link'}
        ]
    },
    { path: '/customers', title: 'Customers', icon: User, type: 'link', active: false },
    { path: '/auth/login', title: 'Logout', icon: LogOut, type: 'link', active: false }
];