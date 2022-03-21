'use strict';
const db = require('../model');
const redis = require('../helpers/redis.helper');
const config = require('config')

class WaitingPatientsController {

    async getAll() {
        try {
            const result = await db.waitingPatients.find({ selected: false });
            console.log('result in get waiting patients', result)
            if (result.length !== 0) {
                const list = await result.map(value => {
                    return {
                        score: value.score,
                        value: JSON.parse(JSON.stringify(value.id)),
                    }
                })
                await redis.zAdd('waiting', list, config.redis_option);
                const data = await redis.zRange('waiting', 0, -1);
                console.log('data on redis', data);
                return {
                    message: 'success',
                    data: data.reverse(),
                }
            } else {
                return {
                    message: 'success',
                    data: [],
                };
            }

        } catch (error) {
            console.log(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại!' }
        }
    }

    //patient register
    async checkPhoneNumber(number) {
        try {
            let result = await db.waitingPatients.findOne({ phone: number });
            if (result) {
                return {
                    message: 'Số điện thoại đã đăng ký khám chữa bệnh!',
                }
            }
            else {
                result = await db.patients.findOne({ phone: number });
                if (result) {
                    return {
                        message: 'Số điện thoại đã đăng ký khám chữa bệnh!',
                    }
                }
                else {
                    return {
                        message: 'success',
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async redisGetAll(req, res, next) {
        try {
            const list = await redis.zRange('waiting', 0, -1);
            console.log('list on redis', list);
            if (list.length === 0) {
                next();
            }
            else {
                return res.send({
                    'message': 'success',
                    'data': list,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // get by ID
    async getById(id) {
        try {
            const result = await db.waitingPatients.findOne({ id: id });
            if (result) {
                return {
                    message: 'success',
                    data: result,
                }
            }
            else return { message: 'Error in get waiting patient!!!' }
        } catch (error) {
            console.log(error);
        }
    }

    // change info selected false to true;
    async selected(id) {
        try {
            const result = await db.waitingPatients.findOneAndUpdate({ id: id }, { selected: true }, { new: true });
            console.log('data update waiting patient selected:....', result);
            // reset waiting patient
            const list = await this.resetRedisWaitingPatients();
            return {
                message: 'success',
                item: result,
                list: list,
            }
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, data) {
        try {

            const result = await db.waitingPatients.findOneAndDelete(id);
            console.log('update patient', result);

            if (!result) {
                return { message: 'Bệnh nhân không tồn tại!' }
            }
            else {
                const patient = {
                    ...result, ...data
                };
                console.log('patient', patient);
                const newPatient = await db.patients.create(patient);

                if (!newPatient.id === undefined) {
                    return { message: 'Số điện thoại này đã đăng ký khám chữa bệnh!' };
                }

                redis.zAdd('patient', {
                    score: data.score,
                    value: JSON.stringify(newPatient),
                });
                console.log('newPatient', newPatient);
                return {
                    message: 'success',
                    data: newPatient,
                };
            }

        } catch (error) {
            console.log(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại!' };
        }
    }

    // OK
    async create(values) {
        try {
            const checkPhone = await db.waitingPatients.findOne({ phone: values.phone });
            if (checkPhone) return { message: 'Số điện thoại này đã đăng ký khám chữa bệnh!' }
            else {
                const patient = await db.waitingPatients.create(values);
                const list = await this.resetRedisWaitingPatients();
                return {
                    message: 'success',
                    data: list,
                }
            }
        } catch (error) {
            console.log(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại!' };
        }
    }
    //OK
    async resetRedisWaitingPatients() {
        try {
            await redis.del('waiting');
            const data = await db.waitingPatients.find({ selected: false });
            if (data.length !== 0) {
                await data.forEach(value => {
                    redis.zAdd(
                        'waiting', {
                        score: value.score,
                        value: JSON.parse(JSON.stringify(value.id)),
                    },
                        config.redis_option);
                })
            }
            const result = await redis.zRange('waiting', 0, -1);
            console.log('waiting list on redis', result);
            const newResult = await result.reverse();
            return newResult;
        } catch (error) {
            console.log(error);
        }
    }

    async getByPhone(phone) {
        try {
            const result = await db.waitingPatients.findOne({ phone: phone });
            if (result) {
                return {
                    message: 'success',
                    data: result
                }
            }
            else return { message: 'Số điện thoại này chưa đăng ký khám chữa bệnh.' };
        } catch (error) {
            console.log(error);
        }
    }

    async getBySelected() {
        try {
            const result = await db.waitingPatients.findOne({ selected: true });
            if (result) {
                return {
                    message: 'success',
                    data: result,
                }
            }
            else return { message: 'Error in get selected waiting patient' }
        } catch (error) {
            console.log(error)
        }
    }

    // covert waiting patient to force patient
    async finished(waitingPatient) {
        try {
            const { id, __v, ...data } = waitingPatient;
            const newPatient = await db.waitingPatients.findOneAndDelete({ id: id });
            if (newPatient) {
                const newData = { ...newPatient, ...data };
                const result = await db.patients.create(newData);
                return {
                    message: 'success',
                    data: result,
                }
            }
            else return { message: 'error in get waiting patients in finished action' }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new WaitingPatientsController();    