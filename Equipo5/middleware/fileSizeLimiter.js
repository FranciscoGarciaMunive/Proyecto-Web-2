const MB = 1; // 5MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req,res,next) => {
    const files = req.files

    const filesOverLimit = []
    //archivos que estan sobre el limite
    Object.keys(files).forEach(key => {
        if(files[key].size > FILE_SIZE_LIMIT){
            filesOverLimit.push(files[key].name)
        }
    })

    if (filesOverLimit.length){
        const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

        const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit
         of ${MB} MB.`.replaceAll("," , ",");

        const message = filesOverLimit.length < 3
            ? sentence.replace("," , "and")
            : sentence.replace(/,(?=[^,]*$)/ , "and");

        return res.status(413).json({ status: "error" , message});
    }

    next()
}

export {fileSizeLimiter} 