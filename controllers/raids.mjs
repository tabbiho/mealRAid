export default function initRaidsController(db) {
  const submit = async (request, response) => {
    try {
      console.log(request.file);
      request.body.image = `uploads/${request.file.filename}`;
      request.body.userId = request.cookies.user;
      console.log(request.body);
      const allergens = request.body.allergens.split(',');
      delete request.body.allergens;
      const raidInstance = await db.Raid.create(
        request.body,
      );

      const allergenInstances = await db.Allergen.findAll({
        where: {
          id: allergens,
        },
      });

      const result = await raidInstance.addAllergen(allergenInstances);
      console.log(result);
      response.send(true);
    } catch (error) {
      console.log(error);
      response.status(500).send();
    }
  };

  const fetchRaidDetails = async (request, response) => {
    try {
      const { user } = request.cookies;
      const result = await db.Raid.findAll({ include: [db.Location, db.Allergen, db.User], order: [['createdAt', 'DESC']] });
      response.send({ dataArr: result, user: Number(user) });
    } catch (error) {
      console.log(error);
      response.status(500).send();
    }
  };

  const edit = async (request, response) => {
    try {
      const {
        id, raidName, raidServings, raidBestBy, raidLocation, raidAllergens, raidDetails,
      } = request.body;
      const result = await db.Raid.update({
        name: raidName,
        pax: raidServings,
        locationId: raidLocation,
        detail: raidDetails,
        bestBy: raidBestBy,
      }, {
        where: {
          id,
        },
        returning: true,
      });
      await result[1][0].setAllergens(raidAllergens);
      response.send(true);
    } catch (error) {
      console.log(error);
      response.status(500).send();
    } };

  const remove = async (request, response) => {
    try {
      console.log(request.params);
      const { id } = request.params;
      const result = await db.Raid.findOne({
        where: {
          id,
        },
      });
      await result.setAllergens([]);
      await result.setUsers([]);
      await result.destroy();
      response.send(true);
    } catch (error) {
      console.log(error);
      response.status(500).send();
    }
  };

  const join = async (request, response) => {
    try {
      const { user } = request.cookies;
      const { raidId } = request.params;

      const raidInstance = await db.Raid.findOne({
        where: {
          id: raidId,
        },
        include: [db.User],
      });

      const userInstance = await db.User.findOne({
        where: {
          id: user,
        },
      });
      console.log('yoyo', raidInstance.users);

      const usersInRaidInstance = raidInstance.users.map((x) => x.id);
      if (usersInRaidInstance.includes(Number(user))) {
        await raidInstance.removeUser(userInstance);
        response.send(true);
      } else if (raidInstance.users.length < raidInstance.pax) {
        await raidInstance.addUser(userInstance);
        response.send(true);
      } else {
        response.send(false);
      }
    } catch (error) {
      console.log(error);
      response.status(500).send();
    }
  };

  const fetchUserRaids = async (request, response) => {
    try {
      const { user } = request.cookies;
      const result = await db.User.findOne({
        where: {
          id: user,
        },
        include: [db.Raid],
      });
      const userRaids = await result.getRaids({ include: [db.Location] });
      response.send(userRaids);
    } catch (error) {
      console.log(error);
      response.status(500).send();
    }
  };

  // TODO: create index for homepage
  // clear out form after submit (create modal that clears all fields)
  return {
    submit, fetchRaidDetails, edit, remove, join, fetchUserRaids,
  };
}
