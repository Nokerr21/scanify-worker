import React from 'react';
import { QrListItem } from './QrListItem';

function filterResults (results) {
    let filteredResults = [];
    for (var i = 0; i < results.length; ++i) {
        if (i === 0) {
            filteredResults.push(results[i]);
            continue;
        }

        if (results[i].decodedText !== results[i - 1].decodedText) {
            filteredResults.push(results[i]);
        }
    }
    return filteredResults;
}

const QrListPlugin = ({ data, deleteQR, writeTag }) => {
    const results = filterResults(data);
    return (
        <ul className='list'>
            {results.length === 0 && "No QR codes stored"}
            {results.map(result => {
                return (
                    <QrListItem
                        {...result}
                        key={result.id}
                        deleteQR={deleteQR}
                        writeTag={writeTag}
                    />
            )
          })} 
        </ul>
    );
};



export default QrListPlugin;