const testController = (req,res) => {
    res.status(200).json({ message: "testing is successfull!!" });
 }

module.exports = { testController };