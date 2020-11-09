const getAvatar = () => {
    const userAvatars = [
        'https://react.semantic-ui.com/images/avatar/small/matthew.png',
        'https://react.semantic-ui.com/images/avatar/small/lindsay.png',
    ];

    const random = parseInt(Math.random() * (2 - 0) + 0, 10);

    return userAvatars[random];
};

export default getAvatar;
