import React, { useState } from 'react';
import creditCard from '../assets/credit-card.png'
import creditCard2 from '../assets/creditCard.png'

const plans = [
    { name: 'Regular', price: 99.99, unit: '1-50 unit', autoPay: true },
    { name: 'Platinum', price: 129.99, unit: '1-50 unit' },
    { name: 'Enterprize', price: 199.99, unit: '1-50 unit' },
];

const cards = [
    { id: 1, name: 'Juliana Tonu', type: 'Amex', number: '**** **** **** 8565' },
    { id: 2, name: 'Juliana Tonu', type: 'Amex', number: '**** **** **** 8565' },
    { id: 3, name: 'Juliana Tonu', type: 'Amex', number: '**** **** **** 8565' },
];

const ExpendableProfileInfo = () => {

    const [selectedPlan, setSelectedPlan] = useState('Regular');
    const [selectedCard, setSelectedCard] = useState(0);

    const totalCharge = 970;


    // modal 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCard, setNewCard] = useState({
        name: '',
        number: '',
        expiry: '',
        cvc: '',
    });

    return (
        <div className="w-[1290px] items-center mx-auto  text-gray-800 px-6 py-4">


            {/* Plan Selection */}
            <div className="bg-white rounded-lg p-6 mb-7 ">
                <p className="font-medium mb-5">Choose a plan for after 30-days free trial</p>
                <div className="flex gap-4 mb-5 border w-64 py-2 border-gray-200 rounded-md">
                    <button className="bg-[#EFF4FB] px-3 py-1 rounded-md ml-2 text-sm text-blue-500 font-medium ">Monthly</button>
                    <button className="text-sm  font-medium">Annually (save 57%)</button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            onClick={() => setSelectedPlan(plan.name)}
                            className={`border rounded-lg p-4 cursor-pointer ${selectedPlan === plan.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-7">
                                <p className="font-semibold border p-2 border-gray-200 rounded-md bg-[#F4F4F4]">{plan.name}</p>
                                {plan.autoPay && (
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Auto Pay</span>
                                )}
                            </div>
                            <p className="text-5xl font-semibold mt-2">${plan.price.toFixed(2)}<span className="text-base font-normal">/mo</span></p>
                            <p className="text-xs text-gray-600 mt-4">Price for {plan.unit}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-lg p-6 mb-32 ">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-medium">Payment option</p>
                    <button onClick={() => setIsModalOpen(true)} className="text-blue-500 text-sm font-medium border-b">Add new card</button>
                </div>

                <div className="space-y-3">
                    {cards.map((card) => (
                        <div key={card.id} className="flex items-center justify-between py-2 rounded">
                            <div className="flex items-center gap-3 cursor-pointer">
                                <img src={creditCard} alt="card icon" />
                                <span className="text-sm text-gray-700">{card.name} ({card.type} card) {card.number}</span>
                            </div>

                            <button
                                onClick={() => setSelectedCard(card.id)}
                                className={`px-3 py-1 rounded-md text-sm font-medium border transition
                                  ${selectedCard === card.id
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'}`}
                            >
                                Select
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fixed Footer */}
            <div className="fixed w-[1280px] mt-7  bg-white px-6 py-4 flex justify-between items-center border-t border-gray-200 z-50">
                <button className="cursor-pointer px-6 py-2  hover:bg-blue-600 hover:text-white transition text-black border border-[#E0E0E0] rounded-lg font-medium">
                    Exit
                </button>                <div className="flex items-center gap-6">
                    <p className="text-md text-gray-800">Total with card charge: <span className="font-semibold">${totalCharge}</span></p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Pay & add property</button>
                </div>
            </div>


            {isModalOpen && (
                <div className="fixed inset-0  bg-black/40 backdrop-blur-none flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-md  w-[790px] h-[350px]">
                        <div className="flex justify-between items-center mb-4 bg-[#F4F4F4] rounded-md p-2">
                            <h2 className="text-sm font-medium text-gray-500 ">Add new card</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 text-3xl font-light">&times;</button>
                        </div>
                        <div className=" grid grid-cols-2 gap-3 p-6">
                            {/* Name on Card */}
                            <div>
                                <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name on card
                                </label>
                                <input
                                    id="nameOnCard"
                                    type="text"
                                    placeholder="Name on card"
                                    className="w-full border rounded border-gray-200 px-3 py-2"
                                    value={newCard.name}
                                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                                />
                            </div>


                            {/* Debit Card Number */}
                            <div className="mb-8 relative">
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Debit Card Number
                                </label>

                                <input
                                    id="cardNumber"
                                    type="number"
                                    placeholder="0000  0000  0000  0000"
                                    className="w-full border border-gray-200 rounded px-3 py-2 pr-10" // extra padding on right
                                    value={newCard.number}
                                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                                />

                                {/* Card icon on right inside input */}
                                <img
                                    src={creditCard2} // your imported icon
                                    alt="card"
                                    className="absolute right-3 top-9 w-6 h-4 pointer-events-none"
                                />
                            </div>


                            {/* Expire Date */}
                            <div>
                                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                    Expire date (MM/YY)
                                </label>
                                <input
                                    id="expiry"
                                    type="text"
                                    placeholder="MM/YY"
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                    value={newCard.expiry}
                                    onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                />
                            </div>

                            {/* CVC */}
                            <div>
                                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1 ">
                                    CVC
                                </label>
                                <input
                                    id="cvc"
                                    type="number"
                                    placeholder="123"
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                    value={newCard.cvc}
                                    onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                                />
                            </div>
                        </div>


                        <div className="flex justify-end gap-3 mx-4">
                           
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                onClick={() => {
                                    console.log('New card data:', newCard); // You can add to list here
                                    setIsModalOpen(false);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
};


export default ExpendableProfileInfo;