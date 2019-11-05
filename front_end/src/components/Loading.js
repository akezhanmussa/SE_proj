import React from 'react';

export const Loading = () => {
    return (
        <div className='row justify-content-center'>
            <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span>
            <p>Loading ...</p>
        </div>
    );
}