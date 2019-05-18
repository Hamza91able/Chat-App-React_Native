
export const fetchChats = () =>
    fetch('http://10.0.2.2:3000/api/chats')
        .then(res => res.json());

// export const createUser = () =>
//     postMessage('http://10.0.2.2:3000/api/createUser')
//         .then(res => res.json());

export const createUser = (uid, phoneNo) =>
    fetch('http://10.0.2.2:3000/api/createUser', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uid: uid,
            phoneNo: phoneNo,
        }),
    });