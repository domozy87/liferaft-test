import React from 'react';

type ThumbT = {
    file: string;
};

const Thumb: React.FC<ThumbT> = ({ file }) => {
    return (
        <img
            src={file}
            alt="Preview"
            className="img-thumbnail mt-2"
            width={200}
        />
    );
};

export default Thumb;