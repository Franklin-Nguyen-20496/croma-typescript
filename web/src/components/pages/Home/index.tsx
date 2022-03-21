import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';

// import Btn from '../../common/Btn';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Heading
                fontSize={['40px', '80px', '160px', '240px', '320px']}
                textAlign="center"
            >
                CROMA
            </Heading>
        </div>
    );
}

export default Home;
