const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesServices = require('./services/inMemory/notesService');
const NotesValidator = require('./validator/notes');

const init = async () => {
  const notesServices = new NotesServices();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesServices,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
