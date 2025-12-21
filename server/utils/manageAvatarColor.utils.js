

const generateAvatarColor = (identifier) => {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
        '#F06292', '#AED581', '#FFD54F', '#4DB6AC'
    ];

    const hash = String(identifier).split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
};

module.exports = {
    generateAvatarColor
}