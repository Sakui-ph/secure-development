import React, { useState } from 'react';
import AdminReply from './AdminReply';

const InquiryList = () => {
    const [inquiries, setInquiries] = useState([
        {
            id: 1,
            name: 'Jollibee Tan',
            phone: '123-456-7890',
            email: 'jo@example.com',
            concern: 'May discount?',
        },
        {
            id: 2,
            name: 'Ayaw na',
            phone: '987-654-3210',
            email: 'ayaw@example.com',
            concern: 'How much if including a massage',
        },
    ]);

    return (
        <div>
            <h2>Inquiry List</h2>
            {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="inquiry">
                    <p>{inquiry.name}</p>
                    <p>{inquiry.phone}</p>
                    <p>{inquiry.email}</p>
                    <p>{inquiry.concern}</p>
                    <AdminReply />
                </div>
            ))}
        </div>
    );
};

export default InquiryList;
