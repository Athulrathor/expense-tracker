const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadFile = async (file) => {
    try {
        const result = await imagekit.upload({
            file: file.buffer.toString('base64'),
            fileName: file.filename || file.originalname,
            folder: process.env.UPLOAD_DIR,
            useUniqueFileName: true,
            tags: ['user-avatar']
        });

        return {
            url: result.url,
            fileId: result.fileId,
            name: result.name,
            filePath: result.filePath,
            size: result.size,
            thumbnailUrl: result.thumbnailUrl
        };
    } catch (error) {
        console.error('ImageKit upload error:', error);
        throw new Error('Failed to upload image to ImageKit');
    }
}

const deleteFile = async (fileId) => {
    try {
        await imagekit.deleteFile(fileId);

        const image = getFileDetails(fileId);

        await fs.unlink(image.filePath);
        
        return true;
    } catch (error) {
        console.error('ImageKit delete error:', error);
        throw new Error('Failed to delete image from ImageKit');
    }
}

const getFileDetails = async (fileId) => {
    try {
        return await imagekit.getFileDetails(fileId);
    } catch (error) {
        console.error('ImageKit get file error:', error);
        return null;
    }
}

const getTransformedUrl = (url, transformations) => {
    return imagekit.url({
        src: url,
        transformation: [transformations]
    });
}

const getThumbnailUrl = (url, width = 150, height = 150) => {
    return getTransformedUrl(url, {
        width,
        height,
        crop: 'at_max',
        quality: 80
    });
}

module.exports = {
    uploadFile,
    deleteFile,
    getFileDetails,
    getTransformedUrl,
    getThumbnailUrl
};