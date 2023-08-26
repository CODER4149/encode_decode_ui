import './App.css';
import React from 'react';
import Api from './components/Api';
import Api2 from './components/API2';

function App() {
    return (
        <div>
            <div className='flex w-full bg-sky-950 h-[50px] mx-auto justify-center items-center'>
                <h1 className='font-sans font-bold text-2xl text-white underline'>Encode Decode UI</h1>
            </div>
            <div className='grid grid-flow-col gap-10 grid-cols-4'>
                <div />
                <Api />
                <Api2 />
                <div />
            </div>
        </div>

    );
}




export default App;
