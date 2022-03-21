import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';

import WaitingPatientItem from './WaitingPatientItem';
import Btn from '../../common/Btn';
import { StateRedux } from '../../../redux/reducers/index';

const WaitingPatientList = () => {
    const [more, setMore] = useState(false);
    const list = useSelector((state: StateRedux) => state.waitingPatients.IDs);
    // console.log('list', list);
    return (
        <div
            style={{
                maxWidth: '36rem',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            <p className="mb-2 fs-18 fw-600 text-dark">Những người kế tiếp</p>
            {list && list.map((id: string, index: number) => {
                if (index < 3) {
                    return (
                        <WaitingPatientItem key={id} id={id} />
                    )
                }
                else return null;
            })}

            <div >
                {list && (list.length > 3) && list.map((id: string, index: number) => {
                    if (index >= 3 && index < 12) {
                        return (
                            <WaitingPatientItem key={id} id={id} />
                        )
                    }
                    else return null;
                })}
            </div>

            {list.length === 0 && <p className="bg-green text-white p-1">Chưa có người trong hàng chờ!</p>}

            {
                list.length > 3 &&
                <Box >
                    <Btn type='button' onClick={() => setMore(!more)} >
                        {more ? 'Ẩn bớt' : `Xem thêm (${list.length - 3})`}
                    </Btn>
                </Box>
            }

        </div>
    );
}

export default WaitingPatientList;
