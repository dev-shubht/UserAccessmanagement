const { AppDataSource } = require("../config/database");

const createSoftwareController = async (req, res) => {
  try {
    const softwareRepo = AppDataSource.getRepository("Software");
    const { name, description, accessLevels } = req.body;

    const software = softwareRepo.create({
      name,
      description,
      accessLevels,
    });

    await softwareRepo.save(software);
    res.status(201).json(software);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating software" });
  }
};


const fetchSoftwareController = async (req, res) => {
  try {
    const softwareRepo = AppDataSource.getRepository("Software");
    const all = await softwareRepo.find();
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching software" });
  }
}

module.exports = {
    createSoftwareController,
    fetchSoftwareController
}