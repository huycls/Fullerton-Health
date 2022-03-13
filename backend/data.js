const data = {
    users: [
        {
            _id: 1,
            username: "jack",
            password: "123456"   
        }
    ],
    booking: [
        {
            _id: 1,
            _itemid: 5,
            username: "jack",
            status: "Pending Review",
            location: "Ho Chi Minh city",
            time: ["08:00 AM Mar 20","08:35 AM Mar 20","01:00 PM Mar 20"]
        },
        {
            _id: 2,
            _itemid: 5,
            username: "jack",
            status: "Approved",
            location: "Ho Chi Minh city",
            time: ["08:00 AM Mar 21","08:35 AM Mar 21","01:00 PM Mar 21"]
        }
    ]
}

export default data;