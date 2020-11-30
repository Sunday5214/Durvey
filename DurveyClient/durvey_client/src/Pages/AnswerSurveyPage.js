import React, { useEffect, useState } from 'react';
import './AnswerSurveyPage.scss';
import { getRequest } from '../Utils/RestManager';
import SurveyItem from '../Component/SurveyItem';
import Modal from '../Component/SurveyModal';
import AnswerSurvey from '../Component/AnswerSurvey';

const AnswerSurveyPage = () => {
    const [surveyListState, setSurveyList] = useState([]);
    const [modalVisible, setModalVisible] = useState({ selectedIdx: -1, visible: false })
    const openModal = (surveyIdx) => {
        setModalVisible(
            {
                ...modalVisible, 
                selectedIdx: surveyIdx, 
                visible: true 
            })
    }
    const closeModal = () => {
        setModalVisible(
            {
                ...modalVisible, 
                selectedIdx: -1, 
                visible: false 
            })
    }
    useEffect(() => {

        const getSurveyList = async () => {
            const surveyListdata = await getRequest('GET', '/survey/surveys');
            setSurveyList(surveyListdata.data.data)

        }
        getSurveyList();
    }, []);
    return (
        <div className='AnswerSurvey'>
            {
                surveyListState.map(survey => (
                    <SurveyItem
                        onAnswerSurvey={openModal}
                        key={survey.idx}
                        surveyIdx={survey.idx}
                        title={survey.title}
                        startDatetime={survey.startDatetime}
                        endDateTime={survey.endDatetime}
                    />
                ))
            }
            {
                
                modalVisible.visible && <Modal
                    visible={modalVisible.visible}
                    closable={true}
                    maskClosable={true}
                    onClose={closeModal}>
                    <AnswerSurvey surveyIdx={modalVisible.selectedIdx} surveyTitle={surveyListState.find(survey=>survey.idx===modalVisible.selectedIdx).title}/>
                </Modal>
            }
        </div>
    )
}

export default AnswerSurveyPage;