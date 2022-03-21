
import React from 'react';
import Patient, { patient } from '../../Interfaces/patient.interface';
import {
    Box,
    Avatar,
    Text,
} from '@chakra-ui/react';

type PatientProps = {
    item: Patient;
    name?: boolean;
    score?: boolean;
    position?: boolean;
    disease?: boolean;
    age?: boolean;
    gender?: boolean;
    covid19?: boolean;
    room?: boolean;
}

const Patient = (props: PatientProps) => {
    const {
        item,
        name,
        score,
        disease,
        age,
        gender,
        covid19,
        room,
    } = props;
    return (
        <Box textAlign="center">
            <Avatar w="50%" h="50%" borderRadius="50%" src={item.file} mb={2}>
            </Avatar>
            {name && <Text fontWeight="medium">{item.name}</Text>}
            {gender &&
                <Text>
                    {item.gender && item.gender === 1 ?
                        `Giới tính nam` : 'Giới tính nữ'}
                </Text>
            }
            {score &&
                <Text>
                    {item.score && item.score > 0 ?
                        `Mức độ ${item.score}` : 'Mức độ ...'}
                </Text>
            }
            {room &&
                <Text>
                    {item.room && item.room > 0 ? `Phòng ${item.room}` : 'Chưa có phòng'}
                </Text>
            }

            {age &&
                <Text>
                    {item.age && item.age > 0 ? `Tuổi: ${item.age}` : 'Tuổi: ...'}
                </Text>
            }
            {disease &&
                <Text>
                    {item.disease ? `Bệnh: ${item.disease}` : 'Chưa có bệnh'}
                </Text>
            }
            {covid19 &&
                <Text>
                    {item.covid19 ?
                        'Đã xét nghiệm covid19' :
                        'Chưa xét nghiệm covid19'}
                </Text>
            }
        </Box>
    )
};

export default Patient;
