import React from 'react';

export const Loading = () => {
    return (
        <div className='row justify-content-center d-block mr-2'>
            <p><span className='fa fa-spinner fa-pulse fa-3x fa-fw text-black'></span>Loading...</p>
        </div>
    );
}