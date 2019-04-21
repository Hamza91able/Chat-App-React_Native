
export const fetchChats = () =>
    fetch('http://10.0.2.2:3000/api/chats')
        .then(res => res.json());
