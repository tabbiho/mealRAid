export default function initLocationsController(db) {
  const index = async (request, response) => {
    try {
      const result = await db.Location.findAll();
      response.send(result);
    } catch (error) {
      response.status(500).send();
    }
  };

  return {
    index,
  };
}
