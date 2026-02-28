const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
  try { 
      const res = await model.generateContent("hello");
      console.log(res.response.text());
  } catch (e) {
      console.log(e);
  }
}
run();
