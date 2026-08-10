import { askPortfolioAssistant }
from "../services/aiService.js";

export const chatWithAI = async (
  req,
  res
) => {
  try {
    const { message, history = [] } = req.body;

    const response =
      await askPortfolioAssistant(
        message, history
      );

    res.status(200).json({
      success: true,
      response,
    });

  } catch (error) {
    console.error("Chat Error:", error);
    console.error("Message:", error.message);

    res.status(500).json({
  success: false,
  error: error.message,
});
  }
};
