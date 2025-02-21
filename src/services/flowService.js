const Astrologer = require("../models/astrologerModel");
const User = require("../models/userModel");

const distributeUserToAstrologer = async (userId) => {
  try {

    let astrologers = await Astrologer.find().sort({ connections: 1 });

    if (astrologers.length === 0) throw new Error("No astrologers available");

    
    const minConnections = astrologers[0].connections;
    let leastBusyAstrologers = astrologers.filter(a => a.connections === minConnections);

   
    let selectedAstrologer = leastBusyAstrologers.length > 0 
      ? leastBusyAstrologers[0] 
      : null;

    
    if (!selectedAstrologer) {
      const topAstrologers = astrologers.filter(a => a.isTopAstrologer);
      if (topAstrologers.length > 0) {
        selectedAstrologer = topAstrologers[0]; 
      }
    }

    if (!selectedAstrologer) throw new Error("No astrologers available");

    
    await User.findByIdAndUpdate(userId, { connectedTo: selectedAstrologer._id });
    await Astrologer.findByIdAndUpdate(selectedAstrologer._id, { $inc: { connections: 1 } });

    return { success: true, astrologer: selectedAstrologer.name };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = { distributeUserToAstrologer };
