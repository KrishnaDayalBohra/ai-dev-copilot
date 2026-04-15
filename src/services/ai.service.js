export async function askAI(context, question) {
  try {
    // simple intelligent simulation
    const response = `
This project appears to contain the following logic:

${context.slice(0, 1000)}

Based on your question: "${question}",

It seems like:
- The project is structured with multiple files
- It includes business logic and possibly API handling
- The code is being analyzed and explained

(Note: This is a simulated AI response. In production, this would use an LLM like OpenAI or Gemini.)
`;

    return response;

  } catch (err) {
    console.error("AI ERROR:", err);
    throw err;
  }
}