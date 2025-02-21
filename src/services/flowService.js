const Astrologer = require("../models/astrologerModel");
const User = require("../models/userModel");

const distributeUserToAstrologer = async (userId) => {
  try {
    // Fetch astrologers sorted by connections (ascending)
    let astrologers = await Astrologer.find().sort({ connections: 1 });

    if (astrologers.length === 0) throw new Error("No astrologers available");

    // Step 1: Find astrologers with the least connections
    const minConnections = astrologers[0].connections;
    let leastBusyAstrologers = astrologers.filter(a => a.connections === minConnections);

    // Step 2: If normal astrologers are available, pick the first one
    let selectedAstrologer = leastBusyAstrologers.length > 0 
      ? leastBusyAstrologers[0] 
      : null;

    // Step 3: If no regular astrologers, choose from top astrologers
    if (!selectedAstrologer) {
      const topAstrologers = astrologers.filter(a => a.isTopAstrologer);
      if (topAstrologers.length > 0) {
        selectedAstrologer = topAstrologers[0]; // Pick first top astrologer
      }
    }

    if (!selectedAstrologer) throw new Error("No astrologers available");

    // Assign user to selected astrologer
    await User.findByIdAndUpdate(userId, { connectedTo: selectedAstrologer._id });
    await Astrologer.findByIdAndUpdate(selectedAstrologer._id, { $inc: { connections: 1 } });

    return { success: true, astrologer: selectedAstrologer.name };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = { distributeUserToAstrologer };
