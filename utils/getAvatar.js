const getAvatar = (gender) => {
    if (gender === 'female') {
        return 'female.png';
    }

    if (gender === 'male') {
        return 'male.png';
    }

    return 'default.png';
};

export default getAvatar;
