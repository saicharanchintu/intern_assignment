import React from 'react';
import PerformanceList from '../Components/PerformanceComponent/PerformanceList';

const PerformancePage = () => {
    const internId = 'some-intern-id';
    return (
        <div>
            <h1>Performance Management</h1>
            <PerformanceList internId={internId}/>
        </div>
    );
};

export default PerformancePage;
