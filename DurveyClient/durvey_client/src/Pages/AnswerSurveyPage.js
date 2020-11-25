import React, {useEffect, useState} from 'react';
import './AnswerSurveyPage.scss';
import {getRequest} from '../Utils/RestManager';
import SurveyItem from '../Component/SurveyItem';
import Modal from '../Component/SurveyModal';

const AnswerSurveyPage = () => {
    const [surveyListState, setSurveyList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const openModal = () => {
      setModalVisible(true)
    }
    const closeModal = () => {
      setModalVisible(false)
    }
    useEffect(()=>{

        const getSurveyList = async() => {
            const surveyListdata = await getRequest('GET', '/survey/surveys');
            setSurveyList(surveyListdata.data.data)

        }
        getSurveyList();
    }, []);
    return (
        <div className='AnswerSurvey'>
            {
                surveyListState.map(survey=>(
                    <SurveyItem
                        onAnswerSurvey={openModal}
                        key={survey.idx}
                        title={survey.title}
                        startDatetime={survey.startDatetime}
                        endDateTime={survey.endDatetime}
                    />
                ))
            }
            {
                modalVisible && <Modal
                visible={modalVisible}
                closable={true}
                maskClosable={true}
                onClose={closeModal}>
                    Hello
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    d
                    <br/>
                    w
                    <br/>
                    e
                    <br/>
                    hello
                </Modal>
            }
        </div>
    )
}

export default AnswerSurveyPage;