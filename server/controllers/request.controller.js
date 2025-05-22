const { AppDataSource } = require("../config/database");

const createRequest = async (req, res) => {
  const { softwareId, accessType, reason } = req.body;
  const userId = req.user.id;

  const requestRepo = AppDataSource.getRepository("Request");
  const userRepo = AppDataSource.getRepository("User");
  const softwareRepo = AppDataSource.getRepository("Software");

  try {
    const user = await userRepo.findOneBy({ id: userId });
    const software = await softwareRepo.findOneBy({ id: softwareId });

    if (!user || !software) {
      return res.status(404).json({ message: "User or Software not found" });
    }

    const newRequest = requestRepo.create({
      user,
      software,
      accessType,
      reason,
      status: "Pending",
    });

    await requestRepo.save(newRequest);
    res.status(201).json(newRequest);
  } catch (err) {
    console.error("Request creation error:", err);
    res.status(500).json({ message: "Server error creating request" });
  }
};

const updateRequestStatus = async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;
  const requestRepo = AppDataSource.getRepository("Request");

  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  if (!["Manager", "Admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: Insufficient role" });
  }

  try {
    const request = await requestRepo.findOneBy({ id: parseInt(requestId) });
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await requestRepo.save(request);

    res.status(200).json({ message: `Request ${status.toLowerCase()}`, request });
  } catch (err) {
    console.error("Approval error:", err);
    res.status(500).json({ message: "Server error updating request" });
  }
};

module.exports = { updateRequestStatus, createRequest };
