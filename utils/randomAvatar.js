const getAvatar = () => {
    const userAvatars = [
        'https://react.semantic-ui.com/images/avatar/small/lena.png',
        'https://react.semantic-ui.com/images/avatar/small/matthew.png',
        'https://react.semantic-ui.com/images/avatar/small/lindsay.png',
        'https://react.semantic-ui.com/images/avatar/small/mark.png',
    ];

    const random = parseInt(Math.random() * (3 - 0) + 0, 10);

    return userAvatars[random];
};

export default getAvatar;
