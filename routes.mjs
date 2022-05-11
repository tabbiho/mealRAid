import { resolve } from 'path';
import multer from 'multer';
import db from './models/index.mjs';

import initUsersController from './controllers/users.mjs';
import initRaidsController from './controllers/raids.mjs';
import initLocationsController from './controllers/locations.mjs';
import initAllergensController from './controllers/allergens.mjs';

const upload = multer({ dest: 'public/uploads/' });

export default function bindRoutes(app) {
  const UsersController = initUsersController(db);
  const RaidsController = initRaidsController(db);
  const LocationsController = initLocationsController(db);
  const AllergensController = initAllergensController(db);

  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.post('/users/login', UsersController.login);
  app.get('/users/checkLogin', UsersController.checkLogin);
  app.post('/users/register', UsersController.register);
  app.get('/users/logout', UsersController.logout);
  app.get('/users/fetchEmail', UsersController.fetchEmail);
  app.post('/users/changePassword', UsersController.changePassword);
  app.get('/users/fetchUserDetails', UsersController.fetchUserDetails);

  app.post('/raids/submit', upload.single('file'), RaidsController.submit);
  app.get('/raids/fetchRaidDetails', RaidsController.fetchRaidDetails);
  app.post('/raids/edit', RaidsController.edit);
  app.get('/raids/remove/:id', RaidsController.remove);
  app.get('/raids/join/:raidId', RaidsController.join);
  app.get('/raids/fetchUserRaids', RaidsController.fetchUserRaids);

  app.get('/locations/index', LocationsController.index);

  app.get('/allergens/index', AllergensController.index);
}
