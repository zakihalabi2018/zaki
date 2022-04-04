
import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Cree un jeton',
        path: '/Cree_un_jeton',
        icon: < AiIcons.AiTwotoneEdit />,
        cName: 'nav-text'
    },
    {
        title: 'List_jeton',
        path: '/List_jeton',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    
    {
        title: 'Cree_un_jeton_location',
        path: '/Cree_un_jeton_location',
        icon: <AiIcons.AiFillBank />,
        cName: 'nav-text'
    },
    {
        title: 'List_jeton_location',
        path: '/List_jeton_location',
        icon: <AiIcons.AiFillCloud />,
        cName: 'nav-text'
    }

]