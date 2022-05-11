import jsSHA from 'jssha';

const getHash = (str) => {
  // eslint-disable-next-line new-cap
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(str);
  const hash = shaObj.getHash('HEX');
  return hash;
};

const SALT = 'meal';

export default function initUsersController(db) {
  const login = async (request, response) => {
    try {
      const { email, password } = request.body;
      const result = await db.User.findOne({
        where: {
          email,
          password: getHash(`${password}-${SALT}`),
        },
      });
      console.log('result', result);
      if (result) {
        response.cookie('user', result.id);
        response.cookie('session', getHash(`${result.id}-${SALT}`));
        if (result.system) {
          response.cookie('system', true);
          response.cookie('session', getHash(`${result.id}-${result.system}-${SALT}`));
          response.send({ login: true, system: true });
          return;
        }
        if (result.postRights) {
          response.cookie('postRights', true);
          response.cookie('session', getHash(`${result.id}-${result.postRights}-${SALT}`));
          response.send({ login: true, postRights: true });
          return;
        }
        response.send({ login: true });
        return;
      }
      response.send({ login: false });
    } catch (error) {
      response.status(500).send();
    }
  };

  const checkLogin = async (request, response) => {
    try {
      const {
        user, session, system, postRights,
      } = request.cookies;

      if (user && session) {
        if (system && getHash(`${user}-${system}-${SALT}`) === session) {
          response.send({ login: true, system: true });
          return;
        }
        if (postRights && getHash(`${user}-${postRights}-${SALT}`) === session) {
          response.send({ login: true, postRights: true });
          return;
        }
        if (getHash(`${user}-${SALT}`) === session) {
          response.send({ login: true });
          return;
        }
      }
      response.clearCookie('user');
      response.clearCookie('session');
      response.clearCookie('system');
      response.clearCookie('postRights');
      response.send(false);
    } catch (error) {
      response.status(500).send();
    }
  };

  const register = async (request, response) => {
    try {
      const result = await db.User.create(request.body);
      if (result) {
        response.send(true);
      }
    } catch (error) {
      console.error(error);
      response.send(false);
    }
  };

  const logout = async (request, response) => {
    try {
      response.clearCookie('user');
      response.clearCookie('session');
      response.clearCookie('system');
      response.clearCookie('postRights');
      response.send(true);
    } catch (error) {
      response.status(500).send();
    }
  };

  const fetchEmail = async (request, response) => {
    try {
      const { user } = request.cookies;
      const result = await db.User.findOne({
        where: {
          id: user,
        },
      });
      response.send(result);
    } catch (error) {
      response.status(500).send();
    }
  };

  const changePassword = async (request, response) => {
    try {
      const { user } = request.cookies;
      const { currentPassword, newPassword } = request.body;

      const passwordCheck = await db.User.findOne({
        where: {
          id: user,
        },
      });
      console.log('passwordCheck', passwordCheck);
      if (passwordCheck.password === getHash(`${currentPassword}-${SALT}`)) {
        await db.User.update({
          password: getHash(`${newPassword}-${SALT}`),
        }, {
          where: {
            id: user,
          },
        });
        response.send(true);
        return;
      }
      response.send(false);
    } catch (error) {
      console.error(error);
      response.send(false);
    }
  };

  const fetchUserDetails = async (request, response) => {
    const { user } = request.cookies;
    try {
      const result = await db.User.findOne({
        where: {
          id: user,
        },
      });
      response.send(result);
    } catch (error) {
      response.status(500).send();
    }
  };

  return {
    login, checkLogin, register, logout, fetchEmail, changePassword, fetchUserDetails,
  };
}
