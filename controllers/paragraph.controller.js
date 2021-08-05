const GetTextReading = require('../functionals/GetTextReading');
const Reading = require('../models/ReadingParagraph.models');
module.exports.UploadTextReading = async (req, res) => {
    const { fileNameParagraph, fileNameSelections } = req.query;

    const data = await GetTextReading(fileNameParagraph, fileNameSelections);

    res.json(data);
}

module.exports.Submit = async (req, res) => {
    const { data, name } = req.body;
    if (!data) {
        res.status(500).send('data not found');
        return;
    }
    // const newData = JSON.parse(data);
    const { paragraph, questions } = data;

    Reading.create({ name, paragraph, questions })
        .then(() => res.status(200).json("Create successfully"))
        .catch(err => console.log(err.message))
}

module.exports.GetAllParagraph = async (req, res) => {
    Reading.find({})
        .then((data) => {
            const responeData = data.map(item => ({ id: item._id, name: item.name }));
            res.status(200).json(responeData);
        })
        .catch(err => console.log(err.message))
}
module.exports.GetOneParagraph = async (req, res) => {
    Reading.find({ _id: req.params.id })
        .then((data) => res.status(200).json(data))
        .catch(err => console.log(err.message))
}
module.exports.DeleteOneParagraph = async (req, res) => {
    Reading.deleteOne({ _id: req.params.id })
        .then((data) => res.status(200).json(data))
        .catch(err => console.log(err.message))
}
module.exports.UpdateOneParagraph = async (req, res) => {
    Reading.updateOne({ _id: req.params.id }, { data: req.body.data })
        .then((data) => res.status(200).json(data))
        .catch(err => console.log(err.message))
}
module.exports.UploadTextFile = async (req, res) => {
    console.log(req.files);
    const fileNameParagraph = req.files.paragraph[0].originalname;
    const fileNameSelections = req.files.selections[0].originalname;
    console.log(fileNameParagraph);
    console.log(fileNameSelections);
    return res.redirect(`/paragraph?fileNameParagraph=${fileNameParagraph}&&fileNameSelections=${fileNameSelections}`);

}