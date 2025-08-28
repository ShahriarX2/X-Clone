'use client';

import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });

const SidebarWrapper = () => {
    return <Sidebar />;
};

export default SidebarWrapper;
