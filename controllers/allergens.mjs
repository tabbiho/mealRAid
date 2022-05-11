export default function initAllergensController(db) {
  const index = async (request, response) => {
    try {
      const result = await db.Allergen.findAll();
      response.send(result);
    } catch (error) {
      response.status(500).send();
    }
  };

  return {
    index,
  };
}
