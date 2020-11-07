const getQuestionImage = (category) => {
    switch (category) {
        case 'Entertainment: Books':
            return 'Entertainment Books.jpg';
        case 'Entertainment: Film':
            return 'Entertainment Film.jpg';
        case 'Entertainment: Music':
            return 'Entertainment Music.jpg';
        case 'Entertainment: Musicals & Theatres':
            return 'Entertainment Musicals & Theatres.jpg';
        case 'Entertainment: Television':
            return 'Entertainment Television.jpg';
        case 'Entertainment: Video Games':
            return 'Entertainment Video Games.jpg';
        case 'Entertainment: Board Games':
            return 'Entertainment Board Games.jpg';
        case 'Science & Nature':
            return 'Science & Nature.jpg';
        case 'Science: Computers':
            return 'Science Computers.jpg';
        case 'Science: Mathematics':
            return 'Science Mathematics.jpg';
        case 'Mythology':
            return 'Mythology.jpg';
        case 'Sports':
            return 'Sports.jpg';
        case 'Geography':
            return 'Geography.jpg';
        case 'History':
            return 'History.jpg';
        case 'Politics':
            return 'Politics.jpg';
        case 'Art':
            return 'Art.jpg';
        case 'Celebrities':
            return 'Celebrities.jpg';
        case 'Animals':
            return 'Animals.jpg';
        case 'Vehicles':
            return 'Vehicles.jpg';
        case 'Entertainment: Comics':
            return 'Entertainment Comics.jpg';
        case 'Science: Gadgets':
            return 'Science Gadgets.jpg';
        case 'Entertainment: Japanese Anime & Manga':
            return 'Entertainment Japanese Anime & Manga.jpg';
        case 'Entertainment: Cartoon & Animations':
            return 'Entertainment Cartoon & Animations.jpg';
        default:
            return 'General Knowledge.jpg';
    }
};

export default getQuestionImage;
