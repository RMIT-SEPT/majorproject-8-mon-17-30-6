import React from 'react';
//mocked services
const mockApiResponse = [
    {
        name: "GYM",
        description: "A gym is a club, building, or large room, usually containing special equipment, where people go to do physical exercise and get fit."
    },
    {
        name: "DENTIST",
        description: "Dentists are doctors who specialize in oral health. Their responsibilities include diagnosing oral diseases, promoting oral health and disease prevention, creating treatment plans to maintain or restore the oral health of their patients, interpreting x-rays and diagnostic tests, ensuring the safe administration of anesthetics, monitoring growth and development of the teeth and jaws and performing surgical procedures on the teeth, bone and soft tissues of the oral cavity."
    },
    {
        name: "HAIRDRESSER",
        description: "A hairdresser is someone who specializes in cutting, colouring and styling hair in order to enhance or maintain a person's appearance. Hairdressers are also referred to as hairstylists.\nHairdressing is a reputable and well-established career that is attractive to many because of its high demand and flexibility of operations. A hairdresser can work as an employee of a salon or as an independent contractor."
    },
    {
        name: "CARER",
        description: "Carers are people who look after someone who needs help with their day-to-day living.\nThere are more than 2.65 million carers in Australia, which means about 1 in 11 people in Australia are carers.\nPeople become carers in different ways. Sometimes they start helping someone out bit by bit. Sometimes it happens suddenly, because of an accident or illness.\nCarers can be any age. Children and young adults (under 25 years of age) are called young carers. "
    }
]
//To view list of services
export default class Services extends React.Component{
    render(){
        return (
            <div>
                Provider content to go here
            </div>
        )
    }
}