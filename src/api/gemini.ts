/* import { GoogleGenerativeAI } from "@google/generative-ai";

// Clave obtenida desde MakerSuite o Google Console con acceso a text-bison
const API_KEY = "AIzaSyDuJxE1osIynfCv-U55M7W0vIV6c_uu_vc";
const genAI = new GoogleGenerativeAI(API_KEY);
genAI.listModels().then((res) => {
  console.log("Modelos disponibles:", res.models);
});
export async function generarCodigoThreeJS(parametros: string[]): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "models/text-bison-001" });

  const prompt = `
Eres un generador de escenas en Three.js. A partir de estos parámetros ingresados por el usuario relacionados con un incendio, crea un código JavaScript básico usando Three.js.

PARÁMETROS:
${parametros.map((p, i) => `(${i + 1}) ${p}`).join("\n")}

REQUISITOS:
- Usar geometrías simples para representar el edificio y el fuego.
- Incluir cámara, escena, renderer y al menos una luz.
- Simula visualmente un incendio en algún punto del edificio.
- Usa colores llamativos para fuego (naranja o rojo) y edificio (gris).
- No incluyas explicación, solo el código JavaScript.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const code = response.text();

    return code;
  } catch (error) {
    console.error("❌ Error en generateContent:", error);
    return "// Error generando código desde Gemini con text-bison-001.";
  }
}
 */